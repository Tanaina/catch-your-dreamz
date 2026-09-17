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
        <Heading level={1}>Button palette</Heading>
        <Text tone="muted" className="mt-4 max-w-2xl">
          Compare each button treatment in its resting, hover, keyboard-focus and unavailable states before
          choosing the website style.
        </Text>
      </section>

      <Section title="State matrix" description="Every variant shown with the visible states side by side.">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-muted text-left">
                <th scope="col" className="px-5 py-4 font-sans text-xs cyd-tracked text-foreground-muted">
                  Variant
                </th>
                <th scope="col" className="px-5 py-4 font-sans text-xs cyd-tracked text-foreground-muted">
                  Default
                </th>
                <th scope="col" className="px-5 py-4 font-sans text-xs cyd-tracked text-foreground-muted">
                  Hover
                </th>
                <th scope="col" className="px-5 py-4 font-sans text-xs cyd-tracked text-foreground-muted">
                  Focus
                </th>
                <th scope="col" className="px-5 py-4 font-sans text-xs cyd-tracked text-foreground-muted">
                  Disabled
                </th>
              </tr>
            </thead>
            <tbody>
              {PALETTE_VARIANTS.map((variant) => (
                <tr key={variant.variant} className="border-b border-border last:border-b-0">
                  <th scope="row" className="px-5 py-6 text-left align-middle">
                    <span className="block font-display text-2xl font-medium text-foreground">{variant.label}</span>
                    <Caption>{variant.use}</Caption>
                  </th>
                  <td className="px-5 py-6 align-middle">
                    <StateButton variant={variant} state="default" />
                  </td>
                  <td className="px-5 py-6 align-middle">
                    <StateButton variant={variant} state="hover" />
                  </td>
                  <td className="px-5 py-6 align-middle">
                    <StateButton variant={variant} state="focus" />
                  </td>
                  <td className="px-5 py-6 align-middle">
                    <StateButton variant={variant} state="disabled" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        title="Live effects"
        description="Hover or keyboard-focus each option to compare the fairy-glitter and shimmer-sweep treatments."
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