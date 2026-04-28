import { Building2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function InventoryPage() {
  return (
    <div className="page-enter space-y-6">
      <PageHeader
        title="Property Inventory"
        subtitle="Your smart inventory database"
        icon={<Building2 className="w-5 h-5 text-primary" />}
        actions={
          <Button
            size="sm"
            id="add-property-btn"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Property</span>
          </Button>
        }
      />

      <EmptyState
        icon={<Building2 className="w-8 h-8 text-muted-foreground" />}
        title="No properties yet"
        description="Add your project inventory here. Tag properties with type, price, location, and possession date for quick searching."
        action={
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-lg"
            id="add-first-property-btn"
          >
            <Plus className="w-4 h-4" />
            Add First Property
          </Button>
        }
      />
    </div>
  );
}
