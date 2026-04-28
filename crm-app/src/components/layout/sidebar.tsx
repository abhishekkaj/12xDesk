"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  Building2,
  KanbanSquare,
  MessageSquareShare,
  LayoutDashboard,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Leads",
    href: "/leads",
    icon: Inbox,
  },
  {
    label: "Pipeline",
    href: "/pipeline",
    icon: KanbanSquare,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Building2,
  },
  {
    label: "Broadcast",
    href: "/broadcast",
    icon: MessageSquareShare,
  },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[240px] h-screen bg-sidebar border-r border-sidebar-border fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-electric to-emerald-glow flex items-center justify-center">
          <Building2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-sidebar-foreground">
            12xDesk
          </h1>
          <p className="text-[10px] text-muted-foreground tracking-wider uppercase">
            Real Estate CRM
          </p>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  id={`nav-${item.label.toLowerCase()}`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-[18px] h-[18px] shrink-0 transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-sidebar-foreground"
                    )}
                  />
                  <span>{item.label}</span>
                  {item.label === "Leads" && (
                    <span className="ml-auto text-[10px] font-semibold bg-emerald-glow/20 text-emerald-glow px-1.5 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="lg:hidden">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <Separator className="bg-sidebar-border" />

      {/* User section */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-emerald-glow/60 flex items-center justify-center text-xs font-bold text-white">
            AJ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground truncate">
              Abhishek Jha
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              Channel Partner
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar/95 backdrop-blur-xl border-t border-sidebar-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.slice(0, 5).map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              id={`mobile-nav-${item.label.toLowerCase()}`}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all duration-200 min-w-[52px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground active:text-sidebar-foreground"
              )}
            >
              <div className="relative">
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-all duration-200",
                    isActive && "scale-110"
                  )}
                />
                {item.label === "Leads" && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-glow rounded-full animate-pulse" />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-all duration-200",
                  isActive && "font-semibold"
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-5 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
