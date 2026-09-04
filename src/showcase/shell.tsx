import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn, Logo, Text } from "@/design-system";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/colors", label: "Colors" },
  { to: "/typography", label: "Typography" },
  { to: "/components", label: "Components" },
] as const;

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

export function Shell({ children }: { children: ReactNode }) {
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <Logo size="sm" alt="" />
            <span className="font-script text-2xl leading-none">Catch Your Dreamz</span>
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-pill px-3 py-2 font-sans text-[0.65rem] cyd-tracked text-foreground-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none"
                activeProps={{ className: "bg-primary-soft text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggle}
              aria-pressed={dark}
              className="ml-2 rounded-pill border border-border-strong px-4 py-2 font-sans text-[0.6rem] cyd-tracked transition-colors hover:bg-primary-soft focus-visible:ring-2 focus-visible:ring-ring outline-none"
            >
              {dark ? "Sun" : "Moon"}
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
      <footer className="border-t border-border px-6 py-8 text-center">
        <Text tone="muted" size="xs" className="cyd-tracked">
          Chase your dreams and catch the sun
        </Text>
      </footer>
    </div>
  );
}

export function Section({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mb-16", className)}>
      <h2 className="font-display text-3xl font-medium">{title}</h2>
      {description && (
        <Text tone="muted" size="sm" className="mt-2 max-w-2xl">
          {description}
        </Text>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return <span className="font-sans text-[0.65rem] text-foreground-muted">{children}</span>;
}

export function Snippet({ code }: { code: string }) {
  return (
    <details className="mt-4 rounded-sm border border-border bg-surface-muted px-4 py-2">
      <summary className="cursor-pointer font-sans text-[0.6rem] cyd-tracked text-foreground-muted">
        Code
      </summary>
      <pre className="overflow-x-auto pt-3 pb-2 font-mono text-xs text-foreground">{code}</pre>
    </details>
  );
}
