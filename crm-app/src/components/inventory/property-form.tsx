"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProperty, updateProperty } from "@/actions/property-actions";
import { toast } from "sonner";
import { Property } from "./property-card";

interface PropertyFormProps {
  property?: Property;
  onSuccess: () => void;
}

export function PropertyForm({ property, onSuccess }: PropertyFormProps) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const result = property 
      ? await updateProperty(property.id, formData)
      : await createProperty(formData);

    setIsPending(false);

    if (result.success) {
      toast.success(property ? "Property Updated" : "Property Created", {
        description: `${formData.get("projectName")} has been saved to your inventory.`,
      });
      onSuccess();
    } else {
      toast.error("Error", {
        description: result.error || "Failed to save property",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6">
      <div className="space-y-2">
        <Label htmlFor="projectName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Project Name *</Label>
        <Input 
          id="projectName" 
          name="projectName" 
          defaultValue={property?.projectName}
          placeholder="e.g. Lodha Belmondo" 
          required 
          className="bg-muted/30 border-border/50 h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="developer" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Developer *</Label>
        <Input 
          id="developer" 
          name="developer" 
          defaultValue={property?.developer}
          placeholder="e.g. Lodha Group" 
          required 
          className="bg-muted/30 border-border/50 h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location *</Label>
        <Input 
          id="location" 
          name="location" 
          defaultValue={property?.location}
          placeholder="e.g. Thane West, Mumbai" 
          required 
          className="bg-muted/30 border-border/50 h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="configuration" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Configuration *</Label>
        <Input 
          id="configuration" 
          name="configuration" 
          defaultValue={property?.configuration}
          placeholder="e.g. 2BHK, 3BHK" 
          required 
          className="bg-muted/30 border-border/50 h-11"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="possessionTimeline" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Possession</Label>
          <Input 
            id="possessionTimeline" 
            name="possessionTimeline" 
            defaultValue={property?.possessionTimeline || ""}
            placeholder="e.g. Dec 2026" 
            className="bg-muted/30 border-border/50 h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="basePrice" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Base Price</Label>
          <Input 
            id="basePrice" 
            name="basePrice" 
            defaultValue={property?.basePrice || ""}
            placeholder="e.g. 85L+" 
            className="bg-muted/30 border-border/50 h-11"
          />
        </div>
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
              Saving...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {property ? "Update Property" : "Add Property"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
