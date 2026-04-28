"use client";

import { useState } from "react";
import { Plus, UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewLead } from "@/actions/lead-actions";
import { toast } from "sonner";

export function AddLeadDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const result = await createNewLead(formData);

    setIsPending(false);

    if (result.success) {
      toast.success("Lead Created", {
        description: "The new lead has been added to your inbox.",
      });
      setIsOpen(false);
    } else {
      toast.error("Error", {
        description: result.error || "Failed to create lead",
      });
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger render={
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-lg h-9 shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Lead</span>
        </Button>
      } />
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border/50">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold">
            <UserPlus className="w-5 h-5 text-primary" />
            Add New Lead
          </SheetTitle>
          <SheetDescription>
            Enter the details of the walk-in or direct call lead.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 pt-2 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lead Name *</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="e.g. Rahul Sharma" 
              required 
              className="bg-muted/30 border-border/50 h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number *</Label>
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              placeholder="e.g. 9876543210" 
              required 
              className="bg-muted/30 border-border/50 h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lead Source</Label>
            <Select name="source" defaultValue="Walk-in">
              <SelectTrigger className="bg-muted/30 border-border/50 h-11">
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Walk-in">Walk-in</SelectItem>
                <SelectItem value="Direct Call">Direct Call</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirement" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Requirement</Label>
            <Select name="requirement" defaultValue="2BHK">
              <SelectTrigger className="bg-muted/30 border-border/50 h-11">
                <SelectValue placeholder="Select Requirement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1BHK">1BHK</SelectItem>
                <SelectItem value="2BHK">2BHK</SelectItem>
                <SelectItem value="3BHK">3BHK</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Plot">Plot</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Budget Range</Label>
            <Input 
              id="budget" 
              name="budget" 
              placeholder="e.g. 60L - 80L" 
              className="bg-muted/30 border-border/50 h-11"
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-xl shadow-lg shadow-primary/20"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Lead...
                </>
              ) : (
                "Save Lead"
              )}
            </Button>
            <p className="text-center text-[10px] text-muted-foreground mt-3 uppercase tracking-tighter font-bold">
              Instant Ingestion to Pipeline & Inbox
            </p>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
