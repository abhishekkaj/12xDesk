import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  Calendar, 
  User, 
  MapPin, 
  Target, 
  Wallet 
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LeadTimeline } from "@/components/leads/lead-timeline";

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

export default async function LeadProfilePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      interactions: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!lead) {
    notFound();
  }

  return (
    <div className="page-enter space-y-6 pb-12">
      {/* Back Button & Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10" render={
          <Link href="/leads">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        } />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lead Profile</h1>
          <p className="text-xs text-muted-foreground">Manage deal history and interactions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Lead Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="glass-card border-border/50 shadow-lg overflow-hidden">
            <div className="h-2 bg-primary" />
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{lead.name}</h2>
                  <Badge className={`mt-2 uppercase text-[10px] tracking-widest ${getStageColor(lead.pipelineStage)}`}>
                    {lead.pipelineStage.replace(/_/g, " ")}
                  </Badge>
                </div>
                
                <div className="flex gap-2 w-full pt-2">
                  <Button variant="outline" className="flex-1 gap-2 border-border/50">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 border-whatsapp/20 text-whatsapp bg-whatsapp/5 hover:bg-whatsapp/10">
                    <MessageSquare className="w-4 h-4" />
                    WA
                  </Button>
                </div>
              </div>

              <Separator className="my-6 bg-border/50" />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{lead.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Source</p>
                    <Badge variant="secondary" className="text-[10px] mt-0.5">{lead.source}</Badge>
                  </div>
                </div>

                {lead.requirement && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Requirement</p>
                      <p className="text-sm font-medium">{lead.requirement}</p>
                    </div>
                  </div>
                )}

                {lead.budget && (
                  <div className="flex items-start gap-3">
                    <Wallet className="w-4 h-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Budget</p>
                      <p className="text-sm font-medium text-primary font-bold">{lead.budget}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interaction Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Activity History
            </h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
              {lead.interactions.length} Interactions
            </span>
          </div>
          
          <LeadTimeline leadId={lead.id} initialInteractions={lead.interactions} />
        </div>
      </div>
    </div>
  );
}
