import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Divider,
  Field,
  Heading,
  Input,
  Label,
  Logo,
  Text,
  Textarea,
} from "@/design-system";
import { Caption, Shell, Snippet } from "@/showcase/shell";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Components — Catch Your Dreamz Design System" },
      {
        name: "description",
        content:
          "Live buttons, fields, cards, badges, dividers, typography and logo components from the Catch Your Dreamz design system.",
      },
      { property: "og:title", content: "Components — Catch Your Dreamz Design System" },
      { property: "og:description", content: "Every variant and state, rendered live." },
    ],
  }),
  component: Components,
});

function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">{children}</div>
      <Caption>{label}</Caption>
    </div>
  );
}

function Block({ id, title, blurb, children }: { id: string; title: string; blurb: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-border pb-12 mb-12 last:border-0">
      <Heading level={3}>{title}</Heading>
      <Text tone="muted" size="sm" className="mt-1 max-w-2xl">
        {blurb}
      </Text>
      <div className="mt-6 flex flex-col gap-6">{children}</div>
    </section>
  );
}

const ENTRIES = [
  "Button",
  "Input",
  "Textarea",
  "Label",
  "Field",
  "Card",
  "Badge",
  "Divider",
  "Heading",
  "Text",
  "Logo",
] as const;

function Components() {
  const [query, setQuery] = useState("");
  const matches = useMemo(
    () => ENTRIES.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  return (
    <Shell>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Label htmlFor="component-search">Search</Label>
          <Input
            id="component-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter components"
            className="mt-2"
          />
          <nav className="mt-4 flex flex-col">
            {matches.map((name) => (
              <a
                key={name}
                href={`#${name.toLowerCase()}`}
                className="rounded-sm px-3 py-2 font-sans text-sm text-foreground-muted transition-colors hover:bg-surface-muted hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {name}
              </a>
            ))}
            {matches.length === 0 && <Caption>No component matches that name.</Caption>}
          </nav>
        </aside>

        <div>
          <Block
            id="button"
            title="Button"
            blurb="Primary actions. Rich antique-gold pill by default with a falling gold-glitter hover; outline and ghost for secondary weight, link for inline actions."
          >
            <Spec label="variant: primary | outline | ghost | link">
              <Button variant="primary" enableGlitter>
                Add to Cart
              </Button>
              <Button variant="outline" enableSweep>
                Watch Item
              </Button>
              <Button variant="ghost" enableGlitter>
                Keep Browsing
              </Button>
              <Button variant="link" enableSweep>
                Browse Sizes
              </Button>
            </Spec>
            <Spec label="size: sm | md | lg">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </Spec>
            <Spec label="states: default, loading, disabled — focus each with the keyboard to see the ring">
              <Button>Checkout</Button>
              <Button loading>Placing order</Button>
              <Button disabled>Sold out</Button>
              <Button variant="outline" disabled>
                Unavailable
              </Button>
            </Spec>
            <Snippet code={`<Button variant="primary" size="md">Add to cart</Button>`} />
          </Block>

          <Block id="input" title="Input" blurb="Single-line text entry. Pair with Field for a label and message.">
            <Spec label="default, filled, invalid, disabled">
              <Input placeholder="Your name" className="max-w-56" />
              <Input defaultValue="Luna Hart" className="max-w-56" />
              <Input defaultValue="luna@" invalid className="max-w-56" />
              <Input placeholder="Locked" disabled className="max-w-56" />
            </Spec>
            <Snippet code={`<Input placeholder="Your name" />`} />
          </Block>

          <Block id="textarea" title="Textarea" blurb="Multi-line entry for notes and personalised messages.">
            <Spec label="default and invalid">
              <Textarea placeholder="Add a note for the gift card" className="max-w-md" />
              <Textarea defaultValue="" invalid className="max-w-md" />
            </Spec>
            <Snippet code={`<Textarea rows={4} placeholder="Add a note" />`} />
          </Block>

          <Block id="label" title="Label" blurb="Wide-tracked caps label, echoing the ring lettering of the logo.">
            <Spec label="default and required">
              <Label htmlFor="demo-label">Email address</Label>
              <Label htmlFor="demo-label" required>
                Email address
              </Label>
            </Spec>
            <Input id="demo-label" placeholder="you@example.com" className="max-w-64" />
            <Snippet code={`<Label htmlFor="email" required>Email address</Label>`} />
          </Block>

          <Block id="field" title="Field" blurb="Label, control, and hint or error wired together with matching ids.">
            <div className="grid max-w-xl gap-5">
              <Field label="Full name" hint="As it should appear on the gift card." required>
                <Input placeholder="Luna Hart" />
              </Field>
              <Field label="Email" error="Enter a valid email address.">
                <Input defaultValue="luna@" />
              </Field>
            </div>
            <Snippet code={`<Field label="Email" error="Enter a valid email address.">\n  <Input />\n</Field>`} />
          </Block>

          <Block id="card" title="Card" blurb="Surface for grouped content — products, orders, settings.">
            <div className="grid gap-4 md:grid-cols-3">
              {(["elevated", "outline", "ghost"] as const).map((variant) => (
                <div key={variant} className="flex flex-col gap-2">
                  <Card variant={variant}>
                    <CardHeader>
                      <CardTitle>Amethyst Dream</CardTitle>
                      <CardDescription>Raw crystal on a gold-filled chain.</CardDescription>
                    </CardHeader>
                    <CardContent>Hand-wrapped in the studio, one of eight made this month.</CardContent>
                    <CardFooter>
                      <Button size="sm">$96</Button>
                      <Badge tone="neutral">8 left</Badge>
                    </CardFooter>
                  </Card>
                  <Caption>variant="{variant}"</Caption>
                </div>
              ))}
            </div>
            <Snippet
              code={`<Card>\n  <CardHeader><CardTitle>Amethyst Dream</CardTitle></CardHeader>\n  <CardContent>Hand-wrapped in the studio.</CardContent>\n</Card>`}
            />
          </Block>

          <Block id="badge" title="Badge" blurb="Small status and metadata labels.">
            <Spec label="tone, soft (default)">
              <Badge>New moon drop</Badge>
              <Badge tone="neutral">Restocked</Badge>
              <Badge tone="success">Shipped</Badge>
              <Badge tone="warning">Low stock</Badge>
              <Badge tone="danger">Sold out</Badge>
            </Spec>
            <Spec label="solid">
              <Badge solid>Featured</Badge>
              <Badge solid tone="neutral">
                Limited
              </Badge>
              <Badge solid tone="success">
                Delivered
              </Badge>
              <Badge solid tone="warning">
                Backorder
              </Badge>
              <Badge solid tone="danger">
                Cancelled
              </Badge>
            </Spec>
            <Snippet code={`<Badge tone="success">Shipped</Badge>`} />
          </Block>

          <Block
            id="divider"
            title="Divider"
            blurb="Plain hairline, gold ornament, or a labelled rule for section breaks."
          >
            <div className="flex max-w-xl flex-col gap-6">
              <div>
                <Divider />
                <Caption>plain</Caption>
              </div>
              <div>
                <Divider ornament />
                <Caption>ornament</Caption>
              </div>
              <div>
                <Divider ornament label="Catch the sun" />
                <Caption>ornament + label</Caption>
              </div>
            </div>
            <Snippet code={`<Divider ornament label="Catch the sun" />`} />
          </Block>

          <Block
            id="heading"
            title="Heading"
            blurb="Display serif, brand script, or tracked eyebrow — with the semantic level set separately."
          >
            <div className="flex flex-col gap-4">
              <Heading level={2} variant="script">
                Chase your dreams
              </Heading>
              <Heading level={2}>Moonlit Collection</Heading>
              <Heading level={3} variant="eyebrow">
                Handmade in studio
              </Heading>
            </div>
            <Snippet code={`<Heading level={1} variant="script">Chase your dreams</Heading>`} />
          </Block>

          <Block id="text" title="Text" blurb="Body copy at four sizes and three tones.">
            <div className="flex max-w-xl flex-col gap-3">
              <Text size="lg">Charged under the full moon before it ships.</Text>
              <Text>Each piece arrives in gold-foiled paper with an intention card.</Text>
              <Text size="sm" tone="muted">
                Dispatch within three working days.
              </Text>
              <Text size="xs" tone="brand">
                Free shipping over $120
              </Text>
            </div>
            <Snippet code={`<Text tone="muted" size="sm">Dispatch within three working days.</Text>`} />
          </Block>

          <Block id="logo" title="Logo" blurb="The circular brand mark — the one canonical logo.">
            <Spec label="size: sm | md | lg">
              <Logo size="sm" />
              <Logo size="md" />
              <Logo size="lg" />
            </Spec>
            <Snippet code={`<Logo size="lg" />`} />
          </Block>

          <section className="rounded-lg border border-border bg-surface p-8">
            <Heading level={3}>In context</Heading>
            <Text tone="muted" size="sm" className="mt-1">
              A checkout card assembled only from the system.
            </Text>
            <Card className="mt-6 max-w-md">
              <CardHeader>
                <CardTitle>Complete your order</CardTitle>
                <CardDescription>Two pieces from the Moonlit Collection.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <Field label="Email" hint="Order confirmation is sent here." required>
                  <Input placeholder="you@example.com" type="email" />
                </Field>
                <Field label="Gift note">
                  <Textarea rows={3} placeholder="Chase your dreams, always." />
                </Field>
                <Divider ornament />
                <div className="flex items-center justify-between">
                  <Text size="sm" tone="muted">
                    Subtotal
                  </Text>
                  <Text size="sm">$192.00</Text>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Pay now</Button>
                <Button variant="ghost">Cancel</Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </div>
    </Shell>
  );
}
