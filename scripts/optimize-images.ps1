<#
.SYNOPSIS
  Генерирует web-варианты фотографий, не изменяя и не удаляя оригиналы.

.DESCRIPTION
  Для каждого .jpg в public/images создаёт рядом файлы вида
      01.jpg  ->  01@640.jpg   (сетки, превью, миниатюры)
                  01@1280.jpg  (полноэкранный показ, лайтбокс)

  Оригинал остаётся как есть: он источник для перегенерации, варианты —
  производные. Вариант никогда не шире оригинала (апскейл запрещён), поэтому
  качество не «дорисовывается», а только снижается битрейт до q82 — для
  глаз одинаково, вес в 2-4 раза меньше.

  Идемпотентен: вариант новее оригинала пропускается. Ключ -Force
  перегенерирует всё.

.PARAMETER CheckCounts
  Сверяет количество картинок, объявленное в src/lib/site-data.ts
  (pImages / Array.from), с фактическим числом файлов на диске.
  Ловит расхождения вида «код просит 6 фото, а на диске 3» (404) и
  «на диске 53, а код показывает 52» (фото не видно).

.EXAMPLE
  pwsh scripts/optimize-images.ps1 -DryRun
  pwsh scripts/optimize-images.ps1
  pwsh scripts/optimize-images.ps1 -CheckCounts
#>
param(
  [string]$Root = "public/images",
  [int[]]$Ladder = @(320, 640, 1280),
  [int]$Quality = 82,
  # Варианты 320 px нужны только полосам миниатюр и обзору галерей.
  # В остальных папках они просто занимают место.
  [string[]]$ThumbFolders = @("home", "otdelka", "rabota"),
  [switch]$DryRun,
  [switch]$Force,
  [switch]$CheckCounts
)

$ErrorActionPreference = "Stop"

if ($CheckCounts) {
  # --- Сверка объявленного количества картинок с диском -------------------
  $data = Get-Content "src/lib/site-data.ts" -Raw
  $problems = 0

  # Подсчёт картинок на диске: web-варианты (01@640.jpg) не в счёт.
  function Measure-PhotoCount([string]$dir) {
    if (-not (Test-Path $dir)) { return -1 }
    @(Get-ChildItem $dir -File -Filter *.jpg | Where-Object { $_.Name -notmatch '@\d+\.jpg$' }).Count
  }

  # pImages("slug", N) -> public/images/projects/slug/{1..N}.jpg
  foreach ($m in [regex]::Matches($data, 'pImages\(\s*"([^"]+)"\s*,\s*(\d+)\s*\)')) {
    $slug = $m.Groups[1].Value
    $declared = [int]$m.Groups[2].Value
    $dir = Join-Path $Root "projects/$slug"
    $onDisk = Measure-PhotoCount $dir
    if ($onDisk -ne $declared) {
      $problems++
      Write-Host ("  {0,-22} код ждёт {1,3}  на диске {2,3}" -f $slug, $declared, $onDisk) -ForegroundColor Yellow
    }
  }

  # Array.from({ length: N }, (_, i) => `/images/<dir>/${...}.jpg`)
  foreach ($m in [regex]::Matches($data, 'Array\.from\(\{ length: (\d+) \}, \(_, i\) => `/images/([^/]+)/\$\{([^`]+?)\}\.jpg`')) {
    $declared = [int]$m.Groups[1].Value
    $dir = Join-Path $Root $m.Groups[2].Value
    $pad = if ($m.Groups[3].Value -match 'padStart\((\d)') { [int]$Matches[1] } else { 0 }
    $onDisk = Measure-PhotoCount $dir
    # Для дополненных имён (01.jpg) сверяем по числу файлов с нужным форматом.
    $matching = 0
    if (Test-Path $dir) {
      for ($i = 1; $i -le $declared; $i++) {
        $name = if ($pad) { $i.ToString().PadLeft($pad, "0") } else { "$i" }
        if (Test-Path (Join-Path $dir "$name.jpg")) { $matching++ }
      }
    }
    if ($matching -ne $declared -or $onDisk -ne $declared) {
      $problems++
      Write-Host ("  {0,-22} код ждёт {1,3} (найдено {2,3})  на диске {3,3}" -f $m.Groups[2].Value, $declared, $matching, $onDisk) -ForegroundColor Yellow
    }
  }

  if ($problems -eq 0) {
    Write-Host "Количество картинок в коде совпадает с диском." -ForegroundColor Green
  } else {
    Write-Host "`nНайдено расхождений: $problems — поправь числа в src/lib/site-data.ts." -ForegroundColor Red
  }
  exit $problems
}

Add-Type -AssemblyName System.Drawing

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq "image/jpeg" }
if (-not $jpegCodec) { throw "JPEG-кодек не найден." }

$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

# HighQualityBicubic при рисовании по прямоугольнику иногда добавляет светлую
# кромку с права/снизу — TextureWrapMode.Clamp убирает этот эффект.
function Resize-ToJpeg {
  param([System.Drawing.Image]$Src, [int]$TargetWidth, [string]$OutPath)

  $srcW = $Src.Width
  $srcH = $Src.Height
  # Апскейл запрещён: вариант не шире оригинала.
  $w = [Math]::Min($TargetWidth, $srcW)
  $h = [Math]::Max(1, [int][Math]::Round($srcH * ($w / $srcW)))

  $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  try {
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $attr = New-Object System.Drawing.Imaging.ImageAttributes
    $attr.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($Src, $rect, 0, 0, $srcW, $srcH, [System.Drawing.GraphicsUnit]::Pixel, $attr)
    $attr.Dispose()
    $bmp.Save($OutPath, $jpegCodec, $encParams)
  } finally {
    $g.Dispose()
    $bmp.Dispose()
  }
}

# --- WinRT/WIC: форматы, которые GDI+ не читает (WebP внутри .jpg) ---------
# GDI+ понимает JPEG, PNG, BMP и GIF. WebP декодирует WIC — при условии, что
# в системе есть расширение WebpImageExtension (в Windows 10/11 ставится
# из Store, на машинах без него остаётся резервная копия оригинала).
$winrtReady = $false
try {
  Add-Type -AssemblyName System.Runtime.WindowsRuntime -ErrorAction Stop
  $null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
  $null = [Windows.Storage.StorageFolder, Windows.Storage, ContentType = WindowsRuntime]
  $null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
  $null = [Windows.Graphics.Imaging.BitmapEncoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
  $null = [Windows.Graphics.Imaging.BitmapTransform, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
  $asTaskOp = ([System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq "AsTask" -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
  $asTaskAct = ([System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq "AsTask" -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq "IAsyncAction" })[0]
  $winrtReady = [bool]$asTaskOp -and [bool]$asTaskAct
} catch {
  $winrtReady = $false
}

function Invoke-AwaitOp {
  param($Operation, [Type]$ResultType)
  $task = $asTaskOp.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
  $task.Wait(-1) | Out-Null
  return $task.Result
}

function Invoke-AwaitAction {
  param($Operation)
  $task = $asTaskAct.Invoke($null, @($Operation))
  $task.Wait(-1) | Out-Null
}

# Качество JPEG здесь не настраивается: BitmapPropertySet из PowerShell не
# принимает ключ ImageQuality, поэтому WIC пишет со своим значением по
# умолчанию (0.9). Для WebP-исходников это всё равно в разы меньше оригинала.
function Resize-ToJpegWinRT {
  param([string]$SourcePath, [int]$TargetWidth, [string]$OutPath)

  $srcFile = Invoke-AwaitOp ([Windows.Storage.StorageFile]::GetFileFromPathAsync($SourcePath)) ([Windows.Storage.StorageFile])
  $inStream = Invoke-AwaitOp ($srcFile.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  try {
    $decoder = Invoke-AwaitOp ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($inStream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    # Апскейл запрещён и здесь: вариант не шире оригинала.
    $w = [Math]::Min($TargetWidth, $decoder.PixelWidth)
    $h = [Math]::Max(1, [int][Math]::Round($decoder.PixelHeight * ($w / $decoder.PixelWidth)))

    $transform = New-Object Windows.Graphics.Imaging.BitmapTransform
    $transform.ScaledWidth = [uint32]$w
    $transform.ScaledHeight = [uint32]$h
    $transform.InterpolationMode = [Windows.Graphics.Imaging.BitmapInterpolationMode]::Fant
    $pixels = Invoke-AwaitOp ($decoder.GetPixelDataAsync(
        [Windows.Graphics.Imaging.BitmapPixelFormat]::Bgra8,
        [Windows.Graphics.Imaging.BitmapAlphaMode]::Premultiplied,
        $transform,
        [Windows.Graphics.Imaging.ExifOrientationMode]::RespectExifOrientation,
        [Windows.Graphics.Imaging.ColorManagementMode]::DoNotColorManage)) ([Windows.Graphics.Imaging.PixelDataProvider])

    $folder = Invoke-AwaitOp ([Windows.Storage.StorageFolder]::GetFolderFromPathAsync((Split-Path $OutPath))) ([Windows.Storage.StorageFolder])
    $outFile = Invoke-AwaitOp ($folder.CreateFileAsync((Split-Path $OutPath -Leaf), [Windows.Storage.CreationCollisionOption]::ReplaceExisting)) ([Windows.Storage.StorageFile])
    $outStream = Invoke-AwaitOp ($outFile.OpenAsync([Windows.Storage.FileAccessMode]::ReadWrite)) ([Windows.Storage.Streams.IRandomAccessStream])
    try {
      $encoder = Invoke-AwaitOp ([Windows.Graphics.Imaging.BitmapEncoder]::CreateAsync([Windows.Graphics.Imaging.BitmapEncoder]::JpegEncoderId, $outStream)) ([Windows.Graphics.Imaging.BitmapEncoder])
      $encoder.SetPixelData(
        [Windows.Graphics.Imaging.BitmapPixelFormat]::Bgra8,
        [Windows.Graphics.Imaging.BitmapAlphaMode]::Premultiplied,
        [uint32]$w, [uint32]$h, 96, 96, $pixels.DetachPixelData())
      Invoke-AwaitAction ($encoder.FlushAsync())
    } finally {
      $outStream.Dispose()
    }
  } finally {
    $inStream.Dispose()
  }
}

$files = Get-ChildItem -Recurse -File -Path $Root -Filter *.jpg |
  Where-Object { $_.Name -notmatch '@\d+\.jpg$' } |
  Sort-Object FullName

$made = 0; $skipped = 0; $copied = 0; $viaWic = 0
$beforeBytes = 0L; $afterBytes = 0L

Write-Host ("Обрабатываю {0} файлов, лестница {1} px, качество q{2}{3}" -f `
  $files.Count, ($Ladder -join "/"), $Quality, $(if ($DryRun) { "  [только отчёт]" } else { "" }))

$index = 0
foreach ($f in $files) {
  $index++
  if ($index % 50 -eq 0) { Write-Host ("  ... {0}/{1}" -f $index, $files.Count) }

  $base = [System.IO.Path]::GetFileNameWithoutExtension($f.FullName)
  $dir = $f.DirectoryName
  # 320 px генерируем только там, где он реально используется.
  $fileLadder = if ($ThumbFolders -contains $f.Directory.Name) {
    $Ladder
  } else {
    @($Ladder | Where-Object { $_ -ne 320 })
  }

  try {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    try {
      $beforeBytes += $f.Length
      foreach ($w in $fileLadder) {
        $out = Join-Path $dir "$base@$w.jpg"
        $outInfo = Get-Item $out -ErrorAction SilentlyContinue
        # Вариант актуален, если он новее оригинала.
        if (-not $Force -and $outInfo -and $outInfo.LastWriteTime -gt $f.LastWriteTime) {
          $skipped++
          $afterBytes += $outInfo.Length
          continue
        }
        if ($DryRun) {
          $made++
          continue
        }
        Resize-ToJpeg -Src $img -TargetWidth $w -OutPath $out
        $afterBytes += (Get-Item $out).Length
        $made++
      }
    } finally {
      $img.Dispose()
    }
  } catch {
    # GDI+ не читает файл: внутри .jpg может лежать WebP (RIFF). Пробуем WIC —
    # он декодирует WebP, если в системе есть WebpImageExtension.
    $done = $false
    if ($winrtReady) {
      try {
        $beforeBytes += $f.Length
        foreach ($w in $fileLadder) {
          $out = Join-Path $dir "$base@$w.jpg"
          $outInfo = Get-Item $out -ErrorAction SilentlyContinue
          if (-not $Force -and $outInfo -and $outInfo.LastWriteTime -gt $f.LastWriteTime) {
            $skipped++
            $afterBytes += $outInfo.Length
            continue
          }
          if ($DryRun) { $made++; continue }
          Resize-ToJpegWinRT -SourcePath $f.FullName -TargetWidth $w -OutPath $out
          $afterBytes += (Get-Item $out).Length
          $made++
        }
        $done = $true
        $viaWic++
      } catch {
        Write-Host ("  WIC не справился с {0}: {1}" -f $f.Name, $_.Exception.Message) -ForegroundColor DarkYellow
      }
    }
    if (-not $done) {
      # Последний резерв: копия оригинала, чтобы страница не получила 404.
      foreach ($w in $fileLadder) {
        $out = Join-Path $dir "$base@$w.jpg"
        if (-not (Test-Path $out)) { Copy-Item $f.FullName $out }
      }
      $copied++
      Write-Host ("  КОПИЯ {0}: формат не декодируется — варианты скопированы как есть" -f $f.Name) -ForegroundColor DarkYellow
    }
  }
}

Write-Host ""
if ($DryRun) {
  Write-Host ("Будет создано вариантов: {0}" -f $made) -ForegroundColor Green
} else {
  Write-Host ("Создано вариантов: {0}   пропущено (актуальны): {1}   через WIC (WebP): {2}   скопировано без пересчёта: {3}" -f `
    $made, $skipped, $viaWic, $copied) -ForegroundColor Green
  if (-not $winrtReady) {
    Write-Host "WIC недоступен — файлы в формате WebP будут только скопированы." -ForegroundColor DarkYellow
  }
  $mb = { param($b) [Math]::Round($b / 1MB, 1) }
  Write-Host ("Оригиналы: {0} MB   web-варианты суммарно: {1} MB" -f (& $mb $beforeBytes), (& $mb $afterBytes))
  Write-Host ""
  Write-Host "Страница должна грузить web-варианты (@640 / @1280), оригиналы остаются исходниками."
}
