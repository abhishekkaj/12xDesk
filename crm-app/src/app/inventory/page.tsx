import { Building2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/inventory/property-card";
import { AddPropertyDrawer } from "@/components/inventory/add-property-drawer";

export default async function InventoryPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="page-enter space-y-6 pb-20">
      <PageHeader
        title="Property Inventory"
        subtitle="Your smart inventory database"
        icon={<Building2 className="w-5 h-5 text-primary" />}
        actions={<AddPropertyDrawer />}
      />

      {properties.length === 0 ? (
        <EmptyState
          icon={<Building2 className="w-8 h-8 text-muted-foreground" />}
          title="No properties yet"
          description="Add your project inventory here. Tag properties with type, price, location, and possession date for quick searching."
          action={<AddPropertyDrawer />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
