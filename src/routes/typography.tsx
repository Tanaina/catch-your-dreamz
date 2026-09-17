import { createFileRoute } from "@tanstack/react-router";
import { Divider, Heading, Text } from "@/design-system";
import { Caption, Section, Shell } from "@/showcase/shell";

export const Route = createFileRoute("/typography")({
  head: () => ({
    meta: [
      { title: "Typography — Catch Your Dreamz Design System" },
      {
        name: "description",
        content:
          "Cormorant Garamond, Great Vibes and Jost — the display, script and body faces of Catch Your Dreamz.",
      },
      { property: "og:title", content: "Typography — Catch Your Dreamz Design System" },
      { property: "og:description", content: "Display, script and body type scale." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Typography,
});

function Typography() {
  return (
    <Shell>
      <Section
        title="Typefaces"
        description="Three faces carry the brand: a script for the wordmark, a serif for headlines, a wide-tracked sans for everything else."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-md border border-border bg-surface p-6">
            <p className="font-script text-4xl">Catch Your Dreamz</p>
            <Caption>Great Vibes — font-script — wordmark and hero lines only</Caption>
          </div>
          <div className="rounded-md border border-border bg-surface p-6">
            <p className="font-display text-4xl">Moonlit Collection</p>
            <Caption>Cormorant Garamond 400/500/600 — font-display — headings</Caption>
          </div>
          <div className="rounded-md border border-border bg-surface p-6">
            <p className="font-sans text-lg">Handmade crystal jewellery</p>
            <Caption>Jost 300/400/500 — font-sans — body and UI</Caption>
          </div>
        </div>
      </Section>

      <Divider ornament className="my-12" />

      <Section title="Scale" description="Every heading and text style with the token that produces it.">
        <div className="flex flex-col gap-8 rounded-md border border-border bg-surface p-8">
          <div>
            <Heading level={1} variant="script">
              Chase your dreams
            </Heading>
            <Caption>Heading level=1 variant="script"</Caption>
          </div>
          <div>
            <Heading level={1}>Catch the sun</Heading>
            <Caption>Heading level=1</Caption>
          </div>
          <div>
            <Heading level={2}>New moon arrivals</Heading>
            <Caption>Heading level=2</Caption>
          </div>
          <div>
            <Heading level={3}>Amethyst pendant</Heading>
            <Caption>Heading level=3</Caption>
          </div>
          <div>
            <Heading level={4}>Care instructions</Heading>
            <Caption>Heading level=4</Caption>
          </div>
          <div>
            <Heading level={4} variant="eyebrow">
              Handmade in studio
            </Heading>
            <Caption>Heading variant="eyebrow"</Caption>
          </div>
          <div>
            <Text size="lg">
              Each piece is wrapped by hand, charged under the full moon and sent out in gold-foiled
              paper.
            </Text>
            <Caption>Text size="lg"</Caption>
          </div>
          <div>
            <Text>Every order includes a card naming the crystal and its intention.</Text>
            <Caption>Text size="md"</Caption>
          </div>
          <div>
            <Text size="sm" tone="muted">
              Dispatch within three working days.
            </Text>
            <Caption>Text size="sm" tone="muted"</Caption>
          </div>
          <div>
            <Text size="xs" tone="brand">
              Free shipping over $120
            </Text>
            <Caption>Text size="xs" tone="brand"</Caption>
          </div>
        </div>
      </Section>
    </Shell>
  );
}
