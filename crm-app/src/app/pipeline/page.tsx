import { KanbanSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { prisma } from "@/lib/prisma";
import { KanbanBoard } from "@/components/pipeline/kanban-board";
import { AddLeadDrawer } from "@/components/leads/add-lead-drawer";

export default async function PipelinePage() {
  const leads = await prisma.lead.findMany({
    select: {
      id: true,
      name: true,
      budget: true,
      requirement: true,
      pipelineStage: true,
      source: true,
    },
    orderBy: { updatedAt: "desc" }
  });

  return (
    <div className="page-enter space-y-6 flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-2rem)]">
      {/* Page Header */}
      <PageHeader
        title="Site Visit Pipeline"
        subtitle="Track leads from inquiry to closing"
        icon={<KanbanSquare className="w-5 h-5 text-primary" />}
        actions={<AddLeadDrawer />}
      />

      {/* Kanban Board Area */}
      <div className="flex-1 overflow-hidden min-h-0">
        <KanbanBoard initialLeads={leads} />
      </div>

      {/* Mobile hint */}
      <p className="text-center text-xs text-muted-foreground lg:hidden pb-16 md:pb-0 shrink-0">
        ← Swipe to see all columns →
      </p>
    </div>
  );
}
