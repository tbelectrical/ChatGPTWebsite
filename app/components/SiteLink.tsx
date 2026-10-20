import type { AnchorHTMLAttributes } from "react";

// Keep navigation native. The hosted runtime's client router can intercept a
// link click and fail before navigating, leaving visitors on the current page.
export function SiteLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} />;
}
