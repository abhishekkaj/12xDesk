import { KanbanSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pipelineColumns = [
  {
    id: "new-lead",
    title: "New Lead",
    color: "bg-blue-electric",
    textColor: "text-blue-electric",
    bgTint: "bg-blue-electric/5",
    borderColor: "border-blue-electric/20",
    count: 0,
  },
  {
    id: "requirement-gathered",
    title: "Requirement Gathered",
    color: "bg-violet-500",
    textColor: "text-violet-400",
    bgTint: "bg-violet-500/5",
    borderColor: "border-violet-500/20",
    count: 0,
  },
  {
    id: "site-visit-scheduled",
    title: "Site Visit Scheduled",
    color: "bg-amber-warm",
    textColor: "text-amber-warm",
    bgTint: "bg-amber-warm/5",
    borderColor: "border-amber-warm/20",
    count: 0,
  },
  {
    id: "site-visit-done",
    title: "Site Visit Done",
    color: "bg-emerald-glow",
    textColor: "text-emerald-glow",
    bgTint: "bg-emerald-glow/5",
    borderColor: "border-emerald-glow/20",
    count: 0,
  },
  {
    id: "token-negotiation",
    title: "Token / Negotiation",
    color: "bg-orange-500",
    textColor: "text-orange-400",
    bgTint: "bg-orange-500/5",
    borderColor: "border-orange-500/20",
    count: 0,
  },
  {
    id: "closed",
    title: "Closed",
    color: "bg-rose-alert",
    textColor: "text-rose-alert",
    bgTint: "bg-rose-alert/5",
    borderColor: "border-rose-alert/20",
    count: 0,
  },
];

export default function PipelinePage() {
  return (
    <div className="page-enter space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Site Visit Pipeline"
        subtitle="Track leads from inquiry to closing"
        icon={<KanbanSquare className="w-5 h-5 text-primary" />}
        actions={
          <Button
            size="sm"
            id="add-to-pipeline-btn"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add to Pipeline</span>
          </Button>
        }
      />

      {/* Pipeline Summary (Mobile-friendly horizontal scroll) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {pipelineColumns.map((col) => (
          <div
            key={col.id}
            className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-full bg-muted/30 border border-border/30"
          >
            <div className={`w-2 h-2 rounded-full ${col.color}`} />
            <span className="text-xs font-medium text-muted-foreground">
              {col.title}
            </span>
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 min-w-[20px] text-center rounded-full"
            >
              {col.count}
            </Badge>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {pipelineColumns.map((col) => (
          <div
            key={col.id}
            className="min-w-[280px] w-[280px] lg:flex-1 lg:min-w-0 snap-start"
            id={`pipeline-col-${col.id}`}
          >
            <Card className={`glass-card border-border/30 ${col.borderColor} h-full`}>
              <CardHeader className="pb-3 px-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                    <CardTitle className="text-sm font-semibold">
                      {col.title}
                    </CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 min-w-[20px] text-center rounded-full bg-muted/50"
                  >
                    {col.count}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                {/* Empty column state */}
                <div
                  className={`border border-dashed ${col.borderColor} rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[200px] transition-colors hover:${col.bgTint}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${col.bgTint} flex items-center justify-center mb-3`}
                  >
                    <Plus className={`w-4 h-4 ${col.textColor} opacity-50`} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Drop leads here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Mobile hint */}
      <p className="text-center text-xs text-muted-foreground lg:hidden">
        ← Swipe to see all columns →
      </p>
    </div>
  );
}
