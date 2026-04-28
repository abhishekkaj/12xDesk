import { Inbox, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { LeadsFilters } from "@/components/leads/leads-filters";
import { LeadsList } from "@/components/leads/leads-list";
import { Prisma } from "@prisma/client";

export default async function LeadsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query as string | undefined;
  const stage = searchParams.stage as string | undefined;
  const source = searchParams.source as string | undefined;
  const requirement = searchParams.requirement as string | undefined;

  const where: Prisma.LeadWhereInput = {
    AND: [
      query ? {
        OR: [
          { name: { contains: query } },
          { phone: { contains: query } },
        ]
      } : {},
      stage ? { pipelineStage: stage } : {},
      source ? { source: source } : {},
      requirement ? { requirement: { contains: requirement } } : {},
    ]
  };

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="page-enter space-y-6 pb-24">
      {/* Page Header */}
      <PageHeader
        title="Leads Inbox"
        subtitle="All fresh inquiries in one place"
        icon={<Inbox className="w-5 h-5 text-primary" />}
        actions={
          <Button
            size="sm"
            id="add-lead-btn"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Lead</span>
          </Button>
        }
      />

      {/* Search & Filter Bar */}
      <Card className="glass-card border-border/50 shadow-sm">
        <CardContent className="p-4">
          <LeadsFilters />
        </CardContent>
      </Card>

      {/* Leads List Wrapper */}
      {leads.length === 0 ? (
        <EmptyState
          icon={<Inbox className="w-8 h-8 text-muted-foreground" />}
          title={query || stage || source || requirement ? "No results found" : "No leads yet"}
          description={query || stage || source || requirement 
            ? "Try adjusting your filters or search query to find what you're looking for." 
            : "Your leads from 99acres, MagicBricks, Housing.com, and other sources will appear here. Add your first lead to get started."}
          action={
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-lg"
              id="add-first-lead-btn"
            >
              <Plus className="w-4 h-4" />
              Add Your First Lead
            </Button>
          }
        />
      ) : (
        <LeadsList leads={leads} />
      )}
    </div>
  );
}

