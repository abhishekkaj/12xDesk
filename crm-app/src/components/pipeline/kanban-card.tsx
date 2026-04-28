import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GripVertical, IndianRupee, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Lead } from "./kanban-board";

interface KanbanCardProps {
  lead: Lead;
  isOverlay?: boolean;
}

export function KanbanCard({ lead, isOverlay }: KanbanCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lead.id,
    data: {
      type: "Lead",
      lead,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 border-2 border-primary/50 border-dashed rounded-lg h-[92px]"
      />
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`relative group cursor-grab active:cursor-grabbing border-border/50 hover:border-primary/50 hover:shadow-sm transition-all ${
        isOverlay ? "shadow-md ring-2 ring-primary/50 cursor-grabbing rotate-2" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link 
              href={`/leads/${lead.id}`} 
              className="text-sm font-medium leading-none truncate mb-1 hover:text-primary hover:underline transition-colors flex items-center gap-1 group/link pointer-events-auto"
              onPointerDown={(e) => e.stopPropagation()}
            >
              {lead.name}
              <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </Link>
            {lead.requirement && (
              <p className="text-xs text-muted-foreground truncate mb-2">
                {lead.requirement}
              </p>
            )}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                {lead.source}
              </Badge>
              {lead.budget && (
                <div className="flex items-center text-[10px] text-muted-foreground font-medium">
                  <IndianRupee className="w-3 h-3 mr-0.5" />
                  {lead.budget}
                </div>
              )}
            </div>
          </div>
          <div className="text-muted-foreground/30 group-hover:text-muted-foreground/70 transition-colors mt-0.5">
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
