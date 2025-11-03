/**
 * Brand Identity Layout
 *
 * Layout wrapper for brand identity pages.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Identity | Quickfy",
  description: "Manage your company's visual identity and brand DNA",
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto p-6 max-w-[1800px]">{children}</div>;
}
