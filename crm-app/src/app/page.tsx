import {
  LayoutDashboard,
  Inbox,
  KanbanSquare,
  Building2,
  MessageSquareShare,
  TrendingUp,
  Users,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const quickStats = [
  {
    label: "Total Leads",
    value: "0",
    change: "—",
    icon: Users,
    color: "text-blue-electric",
    bgColor: "bg-blue-electric/10",
  },
  {
    label: "Site Visits",
    value: "0",
    change: "—",
    icon: CalendarCheck,
    color: "text-emerald-glow",
    bgColor: "bg-emerald-glow/10",
  },
  {
    label: "In Pipeline",
    value: "0",
    change: "—",
    icon: TrendingUp,
    color: "text-amber-warm",
    bgColor: "bg-amber-warm/10",
  },
  {
    label: "Closed Deals",
    value: "0",
    change: "—",
    icon: Building2,
    color: "text-rose-alert",
    bgColor: "bg-rose-alert/10",
  },
];

const quickActions = [
  {
    label: "Leads Inbox",
    description: "View fresh inquiries",
    href: "/leads",
    icon: Inbox,
    color: "from-blue-electric/20 to-blue-electric/5",
  },
  {
    label: "Pipeline",
    description: "Track site visits",
    href: "/pipeline",
    icon: KanbanSquare,
    color: "from-emerald-glow/20 to-emerald-glow/5",
  },
  {
    label: "Inventory",
    description: "Browse properties",
    href: "/inventory",
    icon: Building2,
    color: "from-amber-warm/20 to-amber-warm/5",
  },
  {
    label: "Broadcast",
    description: "WhatsApp brochures",
    href: "/broadcast",
    icon: MessageSquareShare,
    color: "from-whatsapp/20 to-whatsapp/5",
  },
];

export default function DashboardPage() {
  return (
    <div className="page-enter space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Good morning, Abhishek 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s your 12xDesk overview for today
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickStats.map((stat) => (
          <Card
            key={stat.label}
            className="glass-card border-border/50 hover:border-border transition-colors"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                >
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="group glass-card border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <action.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <p className="text-sm font-semibold">{action.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Recent Activity
        </h2>
        <Card className="glass-card border-border/50">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">No activity yet</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Start by adding your first lead or property to see activity here
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
