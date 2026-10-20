import Link from "next/link";
import { breadcrumbs } from "../lib/seo";
export function PageBreadcrumb({ name, path }: { name: string; path: string }) {
  return <><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / {name}</nav><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbs([{name:"Home",path:"/"},{name,path}]))}} /></>;
}
