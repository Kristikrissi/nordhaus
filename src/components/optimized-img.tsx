import { useState, type ImgHTMLAttributes } from "react";

/**
 * Web-варианты, которые scripts/optimize-images.ps1 кладёт рядом с
 * оригиналом: 01.jpg -> 01@640.jpg и 01@1280.jpg (для миниатюр главной
 * дополнительно генерируется 01@320.jpg).
 *
 * 320  — миниатюры-полоса под слайдером (~90 CSS px на retina);
 * 640  — сетки в 2-3 колонки (340-520 CSS px, т.е. ровно 2x) и превью;
 * 1280 — крупный показ и лайтбокс (site-shell = 1060 CSS px).
 *
 * Вариант никогда не шире оригинала: разрешение не «дорисовывается»,
 * уменьшается только битрейт. Оригиналы остаются нетронутыми — из них
 * варианты перегенерируются, а не пережимаются повторно.
 */
export const WEB_WIDTHS = [320, 640, 1280] as const;
export type WebWidth = (typeof WEB_WIDTHS)[number];

/** /images/a/01.jpg -> /images/a/01@640.jpg */
export function webVariant(src: string, w: WebWidth): string {
  return src.replace(/\.(jpe?g|png|webp)$/i, `@${w}.$1`);
}

/**
 * Предзагрузка варианта вне потока рендера: слайдер показывает один кадр,
 * но следующий уже лежит в кэше и появляется без белой вспышки.
 */
export function preloadVariant(src: string, w: WebWidth) {
  if (typeof window === "undefined") return;
  new Image().src = webVariant(src, w);
}

type OptimizedImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  /** Ширина web-варианта: 640 для сеток и превью, 1280 для крупного показа. */
  w?: WebWidth;
  /** Первый экран: грузится сразу и с высоким приоритетом. */
  lcp?: boolean;
};

export function OptimizedImg({
  src,
  w = 640,
  lcp = false,
  loading,
  decoding,
  fetchPriority,
  onError,
  ...rest
}: OptimizedImgProps) {
  // Если скрипт оптимизации ещё не запускали, вариант вернёт 404 — тогда
  // показываем оригинал, и страница остаётся рабочей в любом случае.
  const [fallback, setFallback] = useState(false);
  const current = fallback ? src : webVariant(src, w);

  return (
    <img
      {...rest}
      src={current}
      loading={lcp ? "eager" : (loading ?? "lazy")}
      decoding={decoding ?? "async"}
      fetchPriority={lcp ? "high" : (fetchPriority ?? "auto")}
      onError={(event) => {
        if (!fallback) setFallback(true);
        onError?.(event);
      }}
    />
  );
}
