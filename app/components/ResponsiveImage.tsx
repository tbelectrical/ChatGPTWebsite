import type { ImgHTMLAttributes } from "react";
import manifest from "../lib/image-manifest.json";

type Entry = { width: number; height: number; variants: { src: string; width: number }[] };
const images: Record<string, Entry> = manifest;

// Native srcset works on Next.js and the Sites runtime without an image API,
// a client effect, or a request-time image transformation.
export function ResponsiveImage({ src, sizes, width, height, loading, decoding = "async", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = typeof src === "string" ? images[src] : undefined;
  const logo = typeof src === "string" && /logo|napit-red-tick/.test(src);
  const fallback = image?.variants.find(variant => variant.width >= (logo ? 320 : 960)) ?? image?.variants.at(-1);
  return <img {...props} src={fallback?.src ?? src}
    srcSet={image?.variants.map(variant => `${variant.src} ${variant.width}w`).join(", ")}
    sizes={image ? sizes ?? (logo ? "160px" : "(max-width: 820px) calc(100vw - 40px), (max-width: 1280px) 45vw, 640px") : sizes}
    width={width ?? image?.width} height={height ?? image?.height}
    loading={loading} decoding={decoding} />;
}
