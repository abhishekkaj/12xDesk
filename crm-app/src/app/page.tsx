import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  Building2,
  Inbox,
  KanbanSquare,
  MessageSquareShare
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PipelineChart } from "@/components/dashboard/pipeline-chart";

export default async function HomePage() {
  // 1. Fetch Aggregated Data
  const [
    activeLeadsCount,
    siteVisitsCount,
    inventoryCount,
    closedWonCount,
    leadsByStage
  ] = await Promise.all([
    // Active Leads (Exclude CLOSED_WON and CLOSED_LOST)
    prisma.lead.count({
      where: {
        pipelineStage: {
          notIn: ["CLOSED_WON", "CLOSED_LOST"]
        }
      }
    }),
    // Upcoming Site Visits
    prisma.lead.count({
      where: {
        pipelineStage: "SITE_VISIT_SCHEDULED"
      }
    }),
    // Total Inventory
    prisma.property.count(),
    // Closed Won Deals
    prisma.lead.count({
      where: {
        pipelineStage: "CLOSED_WON"
      }
    }),
    // Pipeline Distribution for Chart
    prisma.lead.groupBy({
      by: ["pipelineStage"],
      _count: {
        id: true
      }
    })
  ]);

  const kpis = [
    {
      label: "Active Leads",
      value: activeLeadsCount,
      icon: Users,
      color: "text-blue-electric",
      bgColor: "bg-blue-electric/10",
    },
    {
      label: "Site Visits",
      value: siteVisitsCount,
      icon: CalendarCheck,
      color: "text-emerald-glow",
      bgColor: "bg-emerald-glow/10",
    },
    {
      label: "Total Inventory",
      value: inventoryCount,
      icon: Building2,
      color: "text-amber-warm",
      bgColor: "bg-amber-warm/10",
    },
    {
      label: "Closed Deals",
      value: closedWonCount,
      icon: TrendingUp,
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

  return (
    <div className="page-enter space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              12xDesk Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, Abhishek. Here&apos;s your overview.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="glass-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-9 h-9 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold tracking-tight">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium uppercase tracking-wider">
                {kpi.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Chart */}
        <Card className="lg:col-span-2 glass-card border-border/50 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-primary" />
              Sales Pipeline Health
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <PipelineChart data={leadsByStage.map(item => ({
                stage: item.pipelineStage.replace(/_/g, " "),
                count: item._count.id
              }))} />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Card className="group glass-card border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                      <action.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{action.label}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-tight">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
