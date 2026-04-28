import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Column, Lead } from "./kanban-board";
import { KanbanCard } from "./kanban-card";

interface KanbanColumnProps {
  column: Column;
  leads: Lead[];
}

export function KanbanColumn({ column, leads }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="min-w-[280px] w-[280px] lg:flex-1 lg:min-w-[280px] snap-start h-full flex flex-col"
    >
      <Card className={`glass-card border-border/30 ${column.borderColor} h-full flex flex-col flex-1`}>
        <CardHeader className="pb-3 px-4 pt-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
              <CardTitle className="text-sm font-semibold">
                {column.title}
              </CardTitle>
            </div>
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 min-w-[20px] text-center rounded-full bg-muted/50"
            >
              {leads.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4 flex-1 flex flex-col gap-2 min-h-[150px]">
          <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
            {leads.map((lead) => (
              <KanbanCard key={lead.id} lead={lead} />
            ))}
          </SortableContext>
          
          {leads.length === 0 && (
            <div
              className={`border border-dashed ${column.borderColor} rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[120px] transition-colors hover:${column.bgTint}`}
            >
              <div className={`w-8 h-8 rounded-lg ${column.bgTint} flex items-center justify-center mb-3`}>
                <Plus className={`w-4 h-4 ${column.textColor} opacity-50`} />
              </div>
              <p className="text-xs text-muted-foreground">Drop leads here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
