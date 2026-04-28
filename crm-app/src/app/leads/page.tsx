import { Inbox, Plus, Search, Filter, Phone, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

const sourceFilters = [
  { label: "All", value: "all", active: true },
  { label: "99acres", value: "99acres", active: false },
  { label: "MagicBricks", value: "magicbricks", active: false },
  { label: "Housing", value: "housing", active: false },
  { label: "Referral", value: "referral", active: false },
  { label: "Walk-in", value: "walkin", active: false },
  { label: "WhatsApp", value: "whatsapp", active: false },
];

function getStageColor(stage: string) {
  switch (stage) {
    case "NEW_LEAD": return "bg-blue-electric/10 text-blue-electric border-blue-electric/20";
    case "REQUIREMENT_GATHERED": return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "SITE_VISIT_SCHEDULED": return "bg-amber-warm/10 text-amber-warm border-amber-warm/20";
    case "SITE_VISIT_DONE": return "bg-emerald-glow/10 text-emerald-glow border-emerald-glow/20";
    case "TOKEN_NEGOTIATION": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "CLOSED_WON": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "CLOSED_LOST": return "bg-rose-alert/10 text-rose-alert border-rose-alert/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
}

function getStageLabel(stage: string) {
  return stage.replace(/_/g, " ");
}

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="page-enter space-y-6">
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
      <Card className="glass-card border-border/50">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search by name, phone, or requirement..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                id="leads-search"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 rounded-lg border-border/50"
              id="leads-filter-btn"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Source Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {sourceFilters.map((filter) => (
          <Badge
            key={filter.value}
            variant={filter.active ? "default" : "outline"}
            className={`cursor-pointer shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
              filter.active
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
            }`}
            id={`filter-${filter.value}`}
          >
            {filter.label}
          </Badge>
        ))}
      </div>

      {/* Leads List */}
      {leads.length === 0 ? (
        <EmptyState
          icon={<Inbox className="w-8 h-8 text-muted-foreground" />}
          title="No leads yet"
          description="Your leads from 99acres, MagicBricks, Housing.com, and other sources will appear here. Add your first lead to get started."
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
        <div className="space-y-3">
          {leads.map((lead) => (
            <Card key={lead.id} className="glass-card border-border/50 hover:border-border transition-colors">
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-base font-semibold truncate">{lead.name}</h3>
                    <Badge variant="outline" className={`text-[10px] px-2 py-0 uppercase tracking-wider font-semibold border ${getStageColor(lead.pipelineStage)}`}>
                      {getStageLabel(lead.pipelineStage)}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-muted/50 text-muted-foreground">
                      {lead.source}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{lead.phone}</span>
                    </div>
                    {lead.requirement && (
                      <div className="flex items-center gap-1.5 max-w-[200px] sm:max-w-xs truncate">
                        <span className="truncate">{lead.requirement}</span>
                      </div>
                    )}
                    {lead.budget && (
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground/80">{lead.budget}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none border-border/50 gap-1.5 h-9">
                    <Phone className="w-3.5 h-3.5" />
                    <span className="sm:hidden">Call</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none border-whatsapp/20 bg-whatsapp/5 text-whatsapp hover:bg-whatsapp/10 hover:text-whatsapp gap-1.5 h-9">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="sm:hidden">WhatsApp</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none border-border/50 gap-1.5 h-9">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="sm:hidden">Visit</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
