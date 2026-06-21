import type { Metadata } from "next";
import { absoluteUrl, getSiteUrl } from "./siteUrl";

export const DEFAULT_OG_IMAGE = "/images/qbrix-logo.png";

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const imageUrl = absoluteUrl(image);
  const pageUrl = absoluteUrl(path);

  return {
    title,
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "QBrix Solutions",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
