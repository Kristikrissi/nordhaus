import { useEffect, useRef } from "react";
import { site } from "@/lib/site-data";

/**
 * Интерактивная карта на JavaScript API Яндекс.Карт.
 * В отличие от iframe-виджета (map-widget/v1), JS API не встраивает
 * в карту рекламный блок чужих организаций.
 *
 * Скрипт API загружается один раз на всю страницу.
 */

/* Минимальные типы API, чтобы не тянуть отдельный пакет типов. */
type YmapsMap = {
  destroy: () => void;
  geoObjects: { add: (obj: unknown) => void };
};
type YmapsApi = {
  ready: (cb: () => void) => void;
  Map: new (
    el: HTMLElement,
    opts: {
      center: [number, number];
      zoom: number;
      controls?: string[];
      /** Убирает кнопку «Открыть в Яндекс.Картах» внутри карты. */
      suppressMapOpenBlock?: boolean;
    },
  ) => YmapsMap;
  Placemark: new (
    coords: [number, number],
    props: Record<string, unknown>,
    opts?: Record<string, unknown>,
  ) => unknown;
};

/** Доступ к API без опоры на слияние глобальных типов. */
function getYmaps(): YmapsApi | undefined {
  return (window as unknown as { ymaps?: YmapsApi })["ymaps"];
}

let initPromise: Promise<void> | null = null;

function loadYmaps(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = new Promise<void>((resolve, reject) => {
    // Скрипт уже вставлен (например, при повторном монтировании).
    const existing = document.querySelector<HTMLScriptElement>("script[data-ymaps]");
    if (existing) {
      if (getYmaps()) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("ymaps load failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(site.mapApiKey)}&lang=ru_RU`;
    s.async = true;
    s.dataset["ymaps"] = "1";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("ymaps load failed"));
    document.head.appendChild(s);
  });
  return initPromise;
}

export function YandexMap({
  center,
  zoom = 16,
  label,
  className,
}: {
  center: [number, number];
  zoom?: number;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadYmaps()
      .then(() => {
        const ymaps = getYmaps();
        if (!ymaps || cancelled || !ref.current) return;
        ymaps.ready(() => {
          if (cancelled || !ref.current) return;
          // Убираем предыдущую карту, если компонент перемонтировался.
          if (cleanupRef.current) cleanupRef.current();
          const map = new ymaps.Map(ref.current, {
            center,
            zoom,
            controls: ["zoomControl"],
            suppressMapOpenBlock: true,
          });
          map.geoObjects.add(
            new ymaps.Placemark(
              center,
              { hintContent: label, balloonContent: label },
              { preset: "islands#redStretchyIcon" },
            ),
          );
          cleanupRef.current = () => {
            map.destroy();
            cleanupRef.current = null;
          };
        });
      })
      .catch(() => {
        // API не загрузился — останется пустой блок, страница работает.
      });
    return () => {
      cancelled = true;
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [center, zoom, label]);

  return <div ref={ref} className={className} />;
}
