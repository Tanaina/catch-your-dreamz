import * as React from "react";
import { cn } from "../lib/cn";

export type MarbleIntensity = "subtle" | "default" | "rich";

const intensityClass: Record<MarbleIntensity, string> = {
  subtle: "cyd-marble-subtle",
  default: "",
  rich: "cyd-marble-rich",
};

export interface MarbleSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Strength of the mineral, vein and gold-fleck formations. */
  intensity?: MarbleIntensity;
  /** Rendered element. Defaults to a `div`. */
  as?: "div" | "section" | "header" | "footer" | "aside" | "main";
}

/**
 * CYD marble surface — warm ivory stone with hazy mineral clouds, thin organic
 * veins and embedded champagne-gold flecks. Works in both Sun and Moon themes.
 */
export const MarbleSurface = React.forwardRef<HTMLDivElement, MarbleSurfaceProps>(
  ({ intensity = "default", as: Tag = "div", className, children, ...rest }, ref) => (
    <Tag ref={ref} className={cn("cyd-marble", intensityClass[intensity], className)} {...rest}>
      {children}
    </Tag>
  ),
);

MarbleSurface.displayName = "MarbleSurface";
