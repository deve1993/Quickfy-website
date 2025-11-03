/**
 * Font Preview Component
 *
 * Live preview of selected fonts in various contexts (headings, body, code).
 * Shows how fonts look at different sizes and weights.
 */

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FontFamily } from "@/types/brand";
import { cn } from "@/lib/utils";

interface FontPreviewProps {
  /**
   * Heading font
   */
  headingFont: FontFamily;
  /**
   * Body font
   */
  bodyFont: FontFamily;
  /**
   * Monospace font
   */
  monoFont: FontFamily;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Font Preview Component
 */
export function FontPreview({
  headingFont,
  bodyFont,
  monoFont,
  className,
}: FontPreviewProps) {
  const headingFontFamily = `${headingFont.name}, ${headingFont.fallback.join(", ")}`;
  const bodyFontFamily = `${bodyFont.name}, ${bodyFont.fallback.join(", ")}`;
  const monoFontFamily = `${monoFont.name}, ${monoFont.fallback.join(", ")}`;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Heading Font Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm">Heading Font</CardTitle>
              <CardDescription>{headingFont.name}</CardDescription>
            </div>
            <Badge variant="secondary">
              {headingFont.weights.length} weights
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display sizes */}
          <div className="space-y-3">
            <h1
              className="text-5xl font-bold"
              style={{ fontFamily: headingFontFamily }}
            >
              Display Heading
            </h1>
            <h2
              className="text-4xl font-semibold"
              style={{ fontFamily: headingFontFamily }}
            >
              Main Heading
            </h2>
            <h3
              className="text-3xl font-semibold"
              style={{ fontFamily: headingFontFamily }}
            >
              Section Heading
            </h3>
            <h4
              className="text-2xl font-medium"
              style={{ fontFamily: headingFontFamily }}
            >
              Subsection Heading
            </h4>
          </div>

          {/* Weight samples */}
          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground mb-3">Weight Variations</p>
            <div className="grid grid-cols-2 gap-3">
              {headingFont.weights.slice(0, 6).map((weight) => (
                <div
                  key={weight}
                  className="p-3 rounded-lg border bg-muted/30"
                  style={{
                    fontFamily: headingFontFamily,
                    fontWeight: weight,
                  }}
                >
                  <p className="text-xs text-muted-foreground mb-1">
                    Weight {weight}
                  </p>
                  <p className="text-lg">The quick brown fox</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Body Font Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm">Body Font</CardTitle>
              <CardDescription>{bodyFont.name}</CardDescription>
            </div>
            <Badge variant="secondary">
              {bodyFont.weights.length} weights
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Paragraph samples */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Large (18px)</p>
              <p
                className="text-lg leading-relaxed"
                style={{ fontFamily: bodyFontFamily }}
              >
                Typography is the art and technique of arranging type to make written
                language legible, readable, and appealing when displayed. The arrangement
                of type involves selecting typefaces, point sizes, line lengths, and
                spacing.
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Base (16px)</p>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: bodyFontFamily }}
              >
                Good typography establishes a strong visual hierarchy, provides a graphic
                balance to the website, and sets the product&apos;s overall tone. Typography
                should guide and inform users, optimize readability and accessibility,
                and ensure an excellent user experience.
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Small (14px)</p>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: bodyFontFamily }}
              >
                The selection of font, size, letter spacing, line height, and color all
                contribute to the overall aesthetic and usability of a design. When done
                well, typography becomes invisible, allowing content to shine.
              </p>
            </div>
          </div>

          {/* Weight samples */}
          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground mb-3">Weight Variations</p>
            <div className="space-y-2">
              {bodyFont.weights.map((weight) => (
                <p
                  key={weight}
                  className="text-base"
                  style={{
                    fontFamily: bodyFontFamily,
                    fontWeight: weight,
                  }}
                >
                  <span className="text-xs text-muted-foreground mr-3">
                    {weight}
                  </span>
                  The quick brown fox jumps over the lazy dog
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monospace Font Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm">Monospace Font</CardTitle>
              <CardDescription>{monoFont.name}</CardDescription>
            </div>
            <Badge variant="secondary">Code</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Code samples */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Inline Code</p>
              <p className="text-sm">
                Install the package using{" "}
                <code
                  className="px-2 py-1 rounded bg-muted text-sm"
                  style={{ fontFamily: monoFontFamily }}
                >
                  npm install package-name
                </code>
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Code Block</p>
              <pre
                className="p-4 rounded-lg bg-muted text-sm overflow-x-auto"
                style={{ fontFamily: monoFontFamily }}
              >
                <code>{`function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combined Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Combined Preview</CardTitle>
          <CardDescription>
            See how your fonts work together in a real layout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <article className="space-y-4">
            <h1
              className="text-4xl font-bold"
              style={{ fontFamily: headingFontFamily }}
            >
              Building Better User Interfaces
            </h1>

            <p
              className="text-base leading-relaxed text-muted-foreground"
              style={{ fontFamily: bodyFontFamily }}
            >
              Published on January 15, 2025 • 5 min read
            </p>

            <div className="space-y-4" style={{ fontFamily: bodyFontFamily }}>
              <p className="text-base leading-relaxed">
                User interface design is both an art and a science. It requires a deep
                understanding of human psychology, visual design principles, and
                technical implementation. The best interfaces are those that users
                don&apos;t even notice—they just work.
              </p>

              <h2
                className="text-2xl font-semibold mt-6"
                style={{ fontFamily: headingFontFamily }}
              >
                Key Principles
              </h2>

              <p className="text-base leading-relaxed">
                When designing user interfaces, there are several fundamental principles
                to keep in mind. Consistency, clarity, and feedback are essential for
                creating intuitive experiences that users can navigate with ease.
              </p>

              <div className="my-4 p-4 rounded-lg bg-muted">
                <code
                  className="text-sm"
                  style={{ fontFamily: monoFontFamily }}
                >
                  const principles = [&apos;Consistency&apos;, &apos;Clarity&apos;, &apos;Feedback&apos;];
                </code>
              </div>

              <h3
                className="text-xl font-medium mt-4"
                style={{ fontFamily: headingFontFamily }}
              >
                Consistency Matters
              </h3>

              <p className="text-base leading-relaxed">
                Maintaining consistency across your interface helps users build mental
                models and navigate your product more efficiently. This includes
                consistent use of colors, typography, spacing, and interaction patterns.
              </p>
            </div>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
