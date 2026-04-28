"use client";

import { useState } from "react";
import { MoreVertical, Edit, Trash2, Building2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteProperty } from "@/actions/property-actions";
import { PropertyForm } from "./property-form";
import { Property } from "./property-card";
import { toast } from "sonner";

export function PropertyActions({ property }: { property: Property }) {
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deleteProperty(property.id);
    setIsDeleting(false);
    
    if (result.success) {
      toast.success("Property Deleted", {
        description: `${property.projectName} has been removed from inventory.`,
      });
      setShowDeleteDialog(false);
    } else {
      toast.error("Error", {
        description: result.error || "Failed to delete property",
      });
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" />
        }>
          <MoreVertical className="w-4 h-4" />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 border-border/50 bg-background/95 backdrop-blur-xl">
          <DropdownMenuItem onClick={() => setShowEditDrawer(true)} className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Property
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border/50" />
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)} 
            className="gap-2 text-rose-alert focus:text-rose-alert focus:bg-rose-alert/10"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Sheet */}
      <Sheet open={showEditDrawer} onOpenChange={setShowEditDrawer}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border/50">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle className="flex items-center gap-2 text-xl font-bold">
              <Building2 className="w-5 h-5 text-primary" />
              Edit Property
            </SheetTitle>
            <SheetDescription>
              Update the details for {property.projectName}.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <PropertyForm property={property} onSuccess={() => setShowEditDrawer(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="border-border/50 bg-background/95 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-alert" />
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete <strong>{property.projectName}</strong> from your inventory database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-rose-alert hover:bg-rose-alert/90 text-white rounded-lg shadow-lg shadow-rose-alert/20"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete Property"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
