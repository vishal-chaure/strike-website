export type NavigationLink = {
  label: string;
  href: string;
};

/** The links in the top bar, in order. */
export const headerLinks: readonly NavigationLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Books", href: "/#books" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];
