import {
  AlertTriangle,
  ArrowLeft,
  ArrowLeftRight,
  Bell,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  Clock,
  Edit,
  Filter,
  History,
  Info,
  Laptop,
  LayoutDashboard,
  List,
  LogOut,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  User,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * The 27 unique icons in the PinjamAset design.
 *
 * The Figma file carries two competing icon sets:
 *   - `Icon/<kebab>`  — 25 icons, 2px stroke. Canonical.
 *   - `Icon / <Title>` — 9 icons, 1.5px stroke. A superseded earlier pass,
 *     but `chevron-up`, `chevron-left`, and `close` exist ONLY there, so it is
 *     not entirely redundant and its unique entries are carried forward here.
 *
 * That gives 25 + 2 unique-from-legacy = 27. Six icons (`check`, `chevron-down`,
 * `chevron-right`, `info`, `plus`, `search`) were duplicated across both sets
 * and are represented once.
 *
 * Three names have no exact Lucide counterpart and use the closest match:
 *   dashboard → LayoutDashboard  (Figma draws a 4-panel grid)
 *   handover  → ArrowLeftRight   (Figma draws two opposing arrows)
 *   more      → MoreHorizontal   (three dots)
 */
export const icons = {
  "alert-triangle": AlertTriangle,
  "arrow-left": ArrowLeft,
  bell: Bell,
  calendar: Calendar,
  camera: Camera,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "clipboard-check": ClipboardCheck,
  clock: Clock,
  dashboard: LayoutDashboard,
  edit: Edit,
  filter: Filter,
  handover: ArrowLeftRight,
  history: History,
  info: Info,
  laptop: Laptop,
  list: List,
  "log-out": LogOut,
  more: MoreHorizontal,
  package: Package,
  plus: Plus,
  search: Search,
  user: User,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export type IconSize = "sm" | "md" | "lg";

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export interface IconProps extends React.ComponentProps<LucideIcon> {
  /** One of the 27 design-system icon names. */
  name: IconName;
  /** Maps to Figma's size/icon/{sm,md,lg} tokens. */
  size?: IconSize;
  /** Accessible label. Without one the icon is hidden from assistive tech. */
  label?: string;
}

export function Icon({ name, size = "md", label, ...props }: IconProps) {
  const Cmp = icons[name];
  const px = sizeMap[size];

  return (
    <Cmp
      width={px}
      height={px}
      strokeWidth={2}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    />
  );
}