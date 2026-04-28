"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  Phone, 
  Calendar, 
  StickyNote, 
  ArrowRightLeft, 
  Send, 
  Loader2, 
  Clock, 
  ChevronRight 
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { logInteraction } from "@/actions/lead-actions";
import { toast } from "sonner";

type Interaction = {
  id: string;
  type: string;
  notes: string | null;
  createdAt: Date;
};

function getInteractionIcon(type: string) {
  switch (type) {
    case "WHATSAPP": return <MessageSquare className="w-4 h-4 text-emerald-glow" />;
    case "CALL": return <Phone className="w-4 h-4 text-blue-electric" />;
    case "SITE_VISIT": return <Calendar className="w-4 h-4 text-amber-warm" />;
    case "STAGE_CHANGE": return <ArrowRightLeft className="w-4 h-4 text-violet-400" />;
    case "NOTE": return <StickyNote className="w-4 h-4 text-muted-foreground" />;
    default: return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
}

function getInteractionBg(type: string) {
  switch (type) {
    case "WHATSAPP": return "bg-emerald-glow/10 border-emerald-glow/20";
    case "CALL": return "bg-blue-electric/10 border-blue-electric/20";
    case "SITE_VISIT": return "bg-amber-warm/10 border-amber-warm/20";
    case "STAGE_CHANGE": return "bg-violet-500/10 border-violet-500/20";
    case "NOTE": return "bg-muted/50 border-border";
    default: return "bg-muted/50 border-border";
  }
}

export function LeadTimeline({ leadId, initialInteractions }: { leadId: string, initialInteractions: Interaction[] }) {
  const [note, setNote] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleLogNote() {
    if (!note.trim()) return;
    setIsPending(true);
    const result = await logInteraction(leadId, "NOTE", note);
    setIsPending(false);
    if (result.success) {
      setNote("");
      toast.success("Note logged successfully");
    } else {
      toast.error("Failed to log note");
    }
  }

  return (
    <div className="space-y-8">
      {/* Quick Log Form */}
      <Card className="glass-card border-border/50 shadow-sm overflow-hidden">
        <div className="bg-muted/30 px-4 py-2 border-b border-border/50 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Quick Log Activity</span>
          <StickyNote className="w-3 h-3 text-muted-foreground" />
        </div>
        <CardContent className="p-4 space-y-4">
          <Textarea 
            placeholder="Type your notes or update about this lead..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[80px] bg-transparent border-none focus-visible:ring-0 p-0 text-sm resize-none"
          />
          <div className="flex justify-end">
            <Button 
              size="sm" 
              onClick={handleLogNote} 
              disabled={!note.trim() || isPending}
              className="gap-2 rounded-lg"
            >
              {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Log Note
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline List */}
      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border/50 before:via-border/50 before:to-transparent">
        {initialInteractions.length === 0 ? (
          <div className="pl-12 py-4">
            <p className="text-sm text-muted-foreground italic">No history recorded yet. Start by logging a note or making a call.</p>
          </div>
        ) : (
          initialInteractions.map((interaction) => (
            <div key={interaction.id} className="relative flex items-start pl-12 group">
              {/* Dot Icon */}
              <div className={`absolute left-0 flex items-center justify-center w-10 h-10 rounded-full border shadow-sm transition-transform group-hover:scale-110 z-10 bg-background ${getInteractionBg(interaction.type)}`}>
                {getInteractionIcon(interaction.type)}
              </div>
              
              {/* Content Card */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{interaction.type.replace(/_/g, " ")}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {format(new Date(interaction.createdAt), "MMM d, h:mm a")}
                  </span>
                </div>
                {interaction.notes && (
                  <div className="glass-card border-border/30 p-3 rounded-lg bg-muted/20 text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {interaction.notes}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
