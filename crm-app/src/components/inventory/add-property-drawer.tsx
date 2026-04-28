"use client";

import { useState } from "react";
import { Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PropertyForm } from "./property-form";

export function AddPropertyDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger render={
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-lg h-9 shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Property</span>
        </Button>
      } />
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border/50">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold">
            <Building2 className="w-5 h-5 text-primary" />
            New Property
          </SheetTitle>
          <SheetDescription>
            Add a new property to your inventory database.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <PropertyForm onSuccess={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
