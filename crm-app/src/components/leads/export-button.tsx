"use client";

import { Download } from "lucide-react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ExportLeadsButtonProps {
  leads: any[];
}

export function ExportLeadsButton({ leads }: ExportLeadsButtonProps) {
  const handleExport = () => {
    if (!leads || leads.length === 0) {
      toast.error("Nothing to export", {
        description: "There are no leads matching your current filters.",
      });
      return;
    }

    try {
      // Map leads to a clean format for export
      const exportData = leads.map((lead) => ({
        "Lead Name": lead.name,
        "Phone Number": lead.phone,
        "Pipeline Stage": lead.pipelineStage.replace(/_/g, " "),
        "Source": lead.source || "-",
        "Requirement": lead.requirement || "-",
        "Budget": lead.budget || "-",
        "Created At": new Date(lead.createdAt).toLocaleDateString(),
      }));

      const csvContent = Papa.unparse(exportData);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "12xDesk_Leads_Export.csv");

      toast.success("Export Successful", {
        description: `Exported ${leads.length} leads to CSV.`,
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export Failed", {
        description: "An error occurred while generating the CSV.",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className="bg-background border-border/50 text-foreground hidden sm:flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Export Leads
    </Button>
  );
}
