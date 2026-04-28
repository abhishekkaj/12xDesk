"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageSquare, Calendar, CheckSquare, MessageSquareShare, Send, X, ExternalLink, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { logInteraction } from "@/actions/lead-actions";
import { toast } from "sonner";

type Lead = {
  id: string;
  name: string;
  phone: string;
  source: string;
  requirement: string | null;
  budget: string | null;
  pipelineStage: string;
};

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

export function LeadsList({ leads }: { leads: Lead[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [sentIds, setSentIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === leads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(leads.map(l => l.id));
    }
  };

  const startBroadcast = () => {
    if (selectedIds.length === 0) return;
    setIsBroadcastOpen(true);
    setCurrentQueueIndex(0);
    setSentIds([]);
  };

  const selectedLeads = leads.filter(l => selectedIds.includes(l.id));
  const currentLead = selectedLeads[currentQueueIndex];
  const isLastLead = currentQueueIndex === selectedLeads.length - 1;

  const handleSendNext = () => {
    if (!currentLead) return;

    const encodedMessage = encodeURIComponent(broadcastMessage);
    const cleanPhone = currentLead.phone.replace(/\D/g, '');
    const finalPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = `https://wa.me/${finalPhone}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
    
    // Log the interaction
    logInteraction(currentLead.id, "WHATSAPP", broadcastMessage);
    
    setSentIds(prev => [...prev, currentLead.id]);
    
    if (!isLastLead) {
      setCurrentQueueIndex(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Select All Bar */}
      {leads.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/20 rounded-lg border border-border/50">
          <Checkbox 
            checked={selectedIds.length === leads.length && leads.length > 0}
            onCheckedChange={toggleSelectAll}
            id="select-all"
          />
          <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
            Select All ({leads.length} Leads)
          </label>
        </div>
      )}

      {/* Leads Cards */}
      <div className="space-y-3">
        {leads.map((lead) => (
          <Card key={lead.id} className={`glass-card border-border/50 hover:border-border transition-colors group ${selectedIds.includes(lead.id) ? 'border-primary/40 bg-primary/5' : ''}`}>
            <CardContent className="p-4 sm:p-5 flex gap-4 items-start">
              <div className="pt-1">
                <Checkbox 
                  checked={selectedIds.includes(lead.id)}
                  onCheckedChange={() => toggleSelect(lead.id)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <Link href={`/leads/${lead.id}`} className="hover:underline">
                    <h3 className="text-base font-semibold truncate group-hover:text-primary transition-colors">{lead.name}</h3>
                  </Link>
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

              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="border-border/50 gap-1.5 h-9">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="lg:inline">Call</span>
                </Button>
                <Button variant="outline" size="sm" className="border-whatsapp/20 bg-whatsapp/5 text-whatsapp hover:bg-whatsapp/10 hover:text-whatsapp gap-1.5 h-9">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="lg:inline">WhatsApp</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 md:left-[260px] md:right-6 lg:left-[260px] lg:right-8 z-40 animate-in fade-in slide-in-from-bottom-4">
          <Card className="bg-primary border-primary shadow-2xl shadow-primary/30">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{selectedIds.length} Leads Selected</p>
                  <p className="text-[10px] text-white/70">Ready for broadcast</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])} className="text-white hover:bg-white/10 h-9">
                  Cancel
                </Button>
                <Button onClick={startBroadcast} className="bg-white text-primary hover:bg-white/90 gap-2 h-9 font-bold">
                  <MessageSquareShare className="w-4 h-4" />
                  Start Broadcast
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Broadcast Sequential Modal */}
      <Dialog open={isBroadcastOpen} onOpenChange={setIsBroadcastOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border/50 bg-background/95 backdrop-blur-xl">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2 text-primary">
              <MessageSquareShare className="w-5 h-5" />
              Smart Broadcast Queue
            </DialogTitle>
            <DialogDescription>
              Sequence: Sending personalized messages to {selectedLeads.length} leads.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 pt-4 space-y-6">
            {/* Template Section */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Broadcast Message</label>
              <Textarea 
                placeholder="Write your message here..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="min-h-[100px] bg-muted/30 border-border/50 resize-none"
              />
              <p className="text-[10px] text-muted-foreground">Tip: Add emojis to make it friendly! 🏠✨</p>
            </div>

            <Separator className="bg-border/50" />

            {/* Queue Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dispatch Queue</label>
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {currentQueueIndex + 1} / {selectedLeads.length}
                </span>
              </div>
              
              <ScrollArea className="h-[120px] rounded-lg border border-border/50 bg-muted/20 p-2">
                <div className="space-y-2">
                  {selectedLeads.map((lead, idx) => {
                    const isCurrent = idx === currentQueueIndex;
                    const isSent = sentIds.includes(lead.id);
                    return (
                      <div 
                        key={lead.id} 
                        className={`flex items-center justify-between p-2 rounded-md transition-all ${
                          isCurrent ? 'bg-primary/10 border border-primary/20 scale-[1.02]' : 'opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isSent ? 'bg-emerald-glow text-white' : 'bg-muted text-muted-foreground'
                          }`}>
                            {isSent ? <CheckCircle2 className="w-3 h-3" /> : idx + 1}
                          </div>
                          <div>
                            <p className={`text-xs font-medium ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>{lead.name}</p>
                            <p className="text-[10px] text-muted-foreground">{lead.phone}</p>
                          </div>
                        </div>
                        {isCurrent && <Badge className="bg-primary text-[8px] h-4">ACTIVE</Badge>}
                        {isSent && <Badge variant="secondary" className="bg-emerald-glow/20 text-emerald-glow text-[8px] h-4">SENT</Badge>}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Engine Section */}
            <div className="pt-2">
              {currentLead && (
                <Button 
                  onClick={handleSendNext}
                  disabled={!broadcastMessage}
                  className="w-full h-12 bg-whatsapp hover:bg-whatsapp/90 text-white font-bold gap-2 text-lg shadow-lg shadow-whatsapp/20"
                >
                  <Send className="w-5 h-5" />
                  Send to {currentLead.name.split(' ')[0]}
                  <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                </Button>
              )}
              {sentIds.length === selectedLeads.length && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsBroadcastOpen(false);
                    setSelectedIds([]);
                  }}
                  className="w-full h-12 gap-2 border-primary/20 text-primary hover:bg-primary/5"
                >
                  Broadcast Complete! Close Modal
                </Button>
              )}
              <p className="text-center text-[10px] text-muted-foreground mt-3">
                Sequential Dispatching: You'll be redirected to WhatsApp for each lead.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
