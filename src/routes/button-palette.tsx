import { createFileRoute } from "@tanstack/react-router";
import { Button, type ButtonVariant, Heading, Text } from "@/design-system";
import { Caption, Section, Shell } from "@/showcase/shell";

export const Route = createFileRoute("/button-palette")({
  head: () => ({
    meta: [
      { title: "Button Palette — Catch Your Dreamz Design System" },
      {
        name: "description",
        content:
          "Every Catch Your Dreamz button variant shown in default, hover, focus, disabled and live-effect states.",
      },
      { property: "og:title", content: "Button Palette — Catch Your Dreamz Design System" },
      {
        property: "og:description",
        content: "Primary, outline, ghost and link button states for choosing the website button style.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ButtonPalette,
});

type PaletteVariant = {
  variant: ButtonVariant;
  label: string;
  use: string;
  hoverClass: string;
};

const PALETTE_VARIANTS: PaletteVariant[] = [
  {
    variant: "primary",
    label: "Primary",
    use: "Dominant action",
    hoverClass: "text-cyd-gold-300",
  },
  {
    variant: "outline",
    label: "Outline",
    use: "Secondary action with ring",
    hoverClass: "border-cta-border text-cyd-gold-300",
  },
  {
    variant: "ghost",
    label: "Ghost",
    use: "Quiet secondary action",
    hoverClass: "text-cyd-gold-300",
  },
  {
    variant: "link",
    label: "Link",
    use: "Inline navigation action",
    hoverClass: "text-cyd-gold-300",
  },
];

function StateButton({ variant, state }: { variant: PaletteVariant; state: "default" | "hover" | "focus" | "disabled" }) {
  const focusClass = "ring-2 ring-ring ring-offset-2 ring-offset-background";

  return (
    <Button
      variant={variant.variant}
      disabled={state === "disabled"}
      className={state === "hover" ? variant.hoverClass : state === "focus" ? focusClass : undefined}
    >
      {state === "default" && variant.label}
      {state === "hover" && "Hover"}
      {state === "focus" && "Focus"}
      {state === "disabled" && "Disabled"}
    </Button>
  );
}

function ButtonPalette() {
  return (
    <Shell>
      <section className="mb-12">
        <Heading level={1}>Visual Effects</Heading>
        <Text tone="muted" className="mt-4 max-w-2xl">
          Compare each button treatment in its resting, hover, keyboard-focus and unavailable states before
          choosing the website style.
        </Text>
      </section>

      <Section title="Button Behaviour" description="A table showing each button variant and their states.">
        <div className="rounded-lg border border-border bg-surface">
          <div className="hidden grid-cols-5 border-b border-border bg-surface-muted md:grid">
            {["Variant", "Default", "Hover", "Focus", "Disabled"].map((h) => (
              <span key={h} className="px-5 py-4 font-sans text-xs cyd-tracked text-foreground-muted">
                {h}
              </span>
            ))}
          </div>
          {PALETTE_VARIANTS.map((variant) => (
            <div
              key={variant.variant}
              className="grid grid-cols-2 gap-4 border-b border-border px-5 py-6 last:border-b-0 sm:grid-cols-4 md:grid-cols-5 md:items-center md:gap-0 md:px-0"
            >
              <div className="col-span-2 sm:col-span-4 md:col-span-1 md:px-5">
                <span className="block font-display text-2xl font-medium text-foreground">{variant.label}</span>
                <Caption>{variant.use}</Caption>
              </div>
              {(["default", "hover", "focus", "disabled"] as const).map((state) => (
                <div key={state} className="flex flex-col items-start gap-2 md:px-5">
                  <span className="font-sans text-[0.6rem] cyd-tracked text-foreground-muted md:hidden">{state}</span>
                  <StateButton variant={variant} state={state} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Live effects"
        description="Options for Buttons that use Live Effects when viewed on web and mobile."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {PALETTE_VARIANTS.map((variant) => (
            <div key={variant.variant} className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-5">
                <Heading level={3}>{variant.label}</Heading>
                <Caption>variant="{variant.variant}"</Caption>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant={variant.variant} enableGlitter>
                  Glitter
                </Button>
                <Button variant={variant.variant} enableSweep>
                  Sweep
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Shell>
  );
}