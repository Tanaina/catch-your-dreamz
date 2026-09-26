import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Divider,
  Heading,
  Logo,
  Text,
} from "@/design-system";
import { Shell } from "@/showcase/shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Catch Your Dreamz Design System" },
      {
        name: "description",
        content:
          "Tokens, typography and components for the Catch Your Dreamz brand — gold, ink and script, built for consistent product work.",
      },
      { property: "og:title", content: "Catch Your Dreamz Design System" },
      {
        property: "og:description",
        content: "The gold-and-ink design language behind Catch Your Dreamz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Overview,
});

function Overview() {
  return (
    <Shell>
      <div aria-hidden className="cyd-marble-base" />
      <div aria-hidden className="cyd-marble-depth" />
      <div aria-hidden className="cyd-marble-bloom" />

      <div className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <Logo size="lg" />
          <Heading level={1} variant="script" className="mt-6">
            Catch Your Dreamz
          </Heading>
          <Text tone="muted" className="mt-4 max-w-xl">
            A mystical-elegant design language: antique gold on ink, fine script headlines and delicate line work.
          </Text>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Badge solid>Version 1.0</Badge>
            <Badge tone="neutral">Brand Tokens</Badge>
            <Badge>Components</Badge>
          </div>
        </div>

        <Divider ornament className="my-14" />

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Colors",
              body: "Antique gold scale, ink neutrals and semantic surfaces for light and dark.",
              to: "/colors",
            },
            {
              title: "Typography",
              body: "Cormorant Garamond for display, Great Vibes for the wordmark, Jost for body.",
              to: "/typography",
            },
            {
              title: "Components",
              body: "Buttons, fields, cards, badges, dividers and typography primitives.",
              to: "/components",
            },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
            >
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="font-sans text-[0.6rem] cyd-tracked text-cyd-gold-700 dark:text-cyd-gold-300">
                    Explore
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
