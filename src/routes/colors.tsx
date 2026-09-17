import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@/design-system";
import { Caption, Section, Shell } from "@/showcase/shell";

export const Route = createFileRoute("/colors")({
  head: () => ({
    meta: [
      { title: "Colors — Catch Your Dreamz Design System" },
      {
        name: "description",
        content: "The antique gold scale, ink neutrals and semantic color tokens of Catch Your Dreamz.",
      },
      { property: "og:title", content: "Colors — Catch Your Dreamz Design System" },
      { property: "og:description", content: "Gold, ink and semantic surface tokens." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Colors,
});

const GOLD = [
  ["bg-cyd-gold-50", "Lightest wash"],
  ["bg-cyd-gold-100", "Soft brand tint"],
  ["bg-cyd-gold-200", "Hairline gold"],
  ["bg-cyd-gold-300", "Primary brand gold"],
  ["bg-cyd-gold-400", "Primary hover"],
  ["bg-cyd-gold-500", "Primary hover"],
  ["bg-cyd-gold-600", "Pressed / dark border"],
  ["bg-cyd-gold-700", "Gold text on light"],
] as const;

const INK = [
  ["bg-cyd-ink-900", "Ink, darkest surface"],
  ["bg-cyd-ink-800", "Dark surface"],
  ["bg-cyd-ink-700", "Dark muted surface"],
  ["bg-cyd-ink-500", "Muted text"],
  ["bg-cyd-ink-400", "Muted text on dark"],
  ["bg-cyd-ink-200", "Border"],
  ["bg-cyd-ink-100", "Muted surface"],
  ["bg-cyd-ink-50", "Page background"],
] as const;

const SEMANTIC = [
  ["bg-background", "Page background"],
  ["bg-surface", "Card / control surface"],
  ["bg-surface-muted", "Recessed surface"],
  ["bg-primary", "Primary action"],
  ["bg-primary-soft", "Primary tint"],
  ["bg-border", "Hairline border"],
  ["bg-success", "Success"],
  ["bg-warning", "Warning"],
  ["bg-danger", "Error / destructive"],
] as const;

function Swatches({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map(([cls, role]) => (
        <div key={cls} className="rounded-md border border-border bg-surface p-3">
          <div className={`h-16 w-full rounded-sm border border-border ${cls}`} />
          <p className="mt-3 font-mono text-xs text-foreground">{cls}</p>
          <Caption>{role}</Caption>
        </div>
      ))}
    </div>
  );
}

function Colors() {
  return (
    <Shell>
      <Section
        title="Color"
        description="Reach for a token, never a literal. Toggle the theme in the header to check every swatch in both themes."
      >
        <Text tone="muted" size="sm">
          Semantic tokens first — the gold and ink scales exist to build them.
        </Text>
      </Section>

      <Section title="Semantic" description="What product code should use.">
        <Swatches items={SEMANTIC} />
      </Section>

      <Section title="Foreground pairings" description="Each text token on its intended surface.">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-surface p-5">
            <p className="font-sans text-sm text-foreground">text-foreground on bg-surface</p>
            <Caption>Primary reading pair</Caption>
          </div>
          <div className="rounded-md border border-border bg-surface-muted p-5">
            <p className="font-sans text-sm text-foreground-muted">
              text-foreground-muted on bg-surface-muted
            </p>
            <Caption>Secondary copy</Caption>
          </div>
          <div className="rounded-md border border-border bg-primary p-5">
            <p className="font-sans text-sm text-foreground-onbrand">
              text-foreground-onbrand on bg-primary
            </p>
            <Caption>Gold action</Caption>
          </div>
        </div>
      </Section>

      <Section title="Gold scale" description="The brand hue, sampled from the logo.">
        <Swatches items={GOLD} />
      </Section>

      <Section title="Ink scale" description="Warm neutrals for surfaces, text and borders.">
        <Swatches items={INK} />
      </Section>
    </Shell>
  );
}
