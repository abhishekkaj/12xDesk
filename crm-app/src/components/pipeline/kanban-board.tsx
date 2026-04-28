"use client";

import { useState } from "react";
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  defaultDropAnimationSideEffects
} from "@dnd-kit/core";
import { 
  SortableContext, 
  arrayMove, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { updateLeadStage } from "@/actions/lead-actions";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";

export type Lead = {
  id: string;
  name: string;
  budget: string | null;
  requirement: string | null;
  pipelineStage: string;
  source: string;
};

export type Column = {
  id: string;
  title: string;
  color: string;
  textColor: string;
  bgTint: string;
  borderColor: string;
};

const COLUMNS: Column[] = [
  { id: "NEW_LEAD", title: "New Lead", color: "bg-blue-electric", textColor: "text-blue-electric", bgTint: "bg-blue-electric/5", borderColor: "border-blue-electric/20" },
  { id: "REQUIREMENT_GATHERED", title: "Requirement Gathered", color: "bg-violet-500", textColor: "text-violet-400", bgTint: "bg-violet-500/5", borderColor: "border-violet-500/20" },
  { id: "SITE_VISIT_SCHEDULED", title: "Site Visit Scheduled", color: "bg-amber-warm", textColor: "text-amber-warm", bgTint: "bg-amber-warm/5", borderColor: "border-amber-warm/20" },
  { id: "SITE_VISIT_DONE", title: "Site Visit Done", color: "bg-emerald-glow", textColor: "text-emerald-glow", bgTint: "bg-emerald-glow/5", borderColor: "border-emerald-glow/20" },
  { id: "TOKEN_NEGOTIATION", title: "Negotiation", color: "bg-orange-500", textColor: "text-orange-400", bgTint: "bg-orange-500/5", borderColor: "border-orange-500/20" },
  { id: "CLOSED_WON", title: "Closed Won", color: "bg-emerald-500", textColor: "text-emerald-400", bgTint: "bg-emerald-500/5", borderColor: "border-emerald-500/20" },
  { id: "CLOSED_LOST", title: "Closed Lost", color: "bg-rose-alert", textColor: "text-rose-alert", bgTint: "bg-rose-alert/5", borderColor: "border-rose-alert/20" },
];

export function KanbanBoard({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const lead = leads.find((l) => l.id === active.id);
    if (lead) setActiveLead(lead);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveALead = active.data.current?.type === "Lead";
    const isOverALead = over.data.current?.type === "Lead";
    const isOverAColumn = over.data.current?.type === "Column";

    if (!isActiveALead) return;

    // Dropping a lead over another lead
    if (isActiveALead && isOverALead) {
      setLeads((leads) => {
        const activeIndex = leads.findIndex((t) => t.id === activeId);
        const overIndex = leads.findIndex((t) => t.id === overId);

        if (leads[activeIndex].pipelineStage !== leads[overIndex].pipelineStage) {
          const updatedLeads = [...leads];
          updatedLeads[activeIndex].pipelineStage = leads[overIndex].pipelineStage;
          return arrayMove(updatedLeads, activeIndex, overIndex);
        }

        return arrayMove(leads, activeIndex, overIndex);
      });
    }

    // Dropping a lead over an empty column
    if (isActiveALead && isOverAColumn) {
      setLeads((leads) => {
        const activeIndex = leads.findIndex((t) => t.id === activeId);
        const updatedLeads = [...leads];
        updatedLeads[activeIndex].pipelineStage = overId as string;
        return arrayMove(updatedLeads, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveLead(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const isOverALead = over.data.current?.type === "Lead";
    const isOverAColumn = over.data.current?.type === "Column";

    let newStage = "";
    if (isOverAColumn) {
      newStage = overId;
    } else if (isOverALead) {
      const overLead = leads.find((l) => l.id === overId);
      if (overLead) newStage = overLead.pipelineStage;
    }

    const originalLead = initialLeads.find((l) => l.id === activeId);

    // Only hit the server if the stage actually changed
    if (newStage && originalLead && originalLead.pipelineStage !== newStage) {
      // Optimistic update happens in dragOver, so just call server action here
      try {
        await updateLeadStage(activeId, newStage);
      } catch (error) {
        // Revert state if failed
        setLeads(initialLeads);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            leads={leads.filter((lead) => lead.pipelineStage === col.id)}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{
        sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.4" } } })
      }}>
        {activeLead ? <KanbanCard lead={activeLead} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
