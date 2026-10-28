/** A footer or navigation destination; omit `destination` while the page is unpublished. */
export interface SiteLink {
  label: string;
  destination?: string;
}

/** A header navigation entry: a page or a section anchor on a page. */
export interface NavigationLink {
  label: string;
  destination: string;
}
