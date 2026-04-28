import { MessageSquareShare } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function BroadcastPage() {
  return (
    <div className="page-enter space-y-6">
      <PageHeader
        title="WhatsApp Broadcast"
        subtitle="Send property brochures via WhatsApp"
        icon={<MessageSquareShare className="w-5 h-5 text-emerald-glow" />}
        actions={
          <Button
            size="sm"
            id="create-broadcast-btn"
            className="bg-whatsapp hover:bg-whatsapp/90 text-white gap-1.5 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Broadcast</span>
          </Button>
        }
      />

      <EmptyState
        icon={
          <MessageSquareShare className="w-8 h-8 text-muted-foreground" />
        }
        title="No broadcasts yet"
        description="Select a property, auto-generate a message with project details, and share via WhatsApp in one tap."
        action={
          <Button
            className="bg-whatsapp hover:bg-whatsapp/90 text-white gap-1.5 rounded-lg"
            id="create-first-broadcast-btn"
          >
            <MessageSquareShare className="w-4 h-4" />
            Create First Broadcast
          </Button>
        }
      />
    </div>
  );
}
