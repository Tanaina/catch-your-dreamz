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
      {/* 1. Base Alabaster Body (Tile 09 or Tile 15) */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none opacity-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/src/design-system/assets/textures/tile_09.png")`,
        }}
      />

      {/* 2. Top & Side Heavy Gold/Quartz Veins (Tile 02) */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none opacity-65 bg-cover bg-top bg-no-repeat mix-blend-multiply"
        style={{
          backgroundImage: `url("/src/design-system/assets/textures/tile_02.png")`,
          WebkitMaskImage: `radial-gradient(ellipse 65% 55% at 50% 45%, transparent 30%, black 100%)`,
          maskImage: `radial-gradient(ellipse 65% 55% at 50% 45%, transparent 30%, black 100%)`,
        }}
      />

      {/* 3. Bottom Smoky Quartz Drift (Tile 10) */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none opacity-50 bg-cover bg-bottom bg-no-repeat mix-blend-multiply"
        style={{
          backgroundImage: `url("/src/design-system/assets/textures/tile_10.png")`,
          WebkitMaskImage: `linear-gradient(to top, black 15%, transparent 70%)`,
          maskImage: `linear-gradient(to top, black 15%, transparent 70%)`,
        }}
      />

      {/* Page Content */}
      <div className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <Logo size="lg" />
          <Heading level={1} variant="script" className="mt-6">
            Catch Your Dreamz
          </Heading>
          {/* Rest of your route content... */}
        </div>
      </div>
    </Shell>
  );
}
