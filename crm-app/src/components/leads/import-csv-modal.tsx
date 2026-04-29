"use client";

import { useState, useRef } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { UploadCloud, FileSpreadsheet, Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { bulkImportLeads } from "@/actions/lead-actions";

export function ImportCsvModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file || file.type !== "text/csv") {
      toast.error("Invalid file type", {
        description: "Please upload a valid .csv file.",
      });
      return;
    }

    setIsUploading(true);
    toast.loading("Parsing CSV...");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const { data, errors } = results;

        if (errors.length > 0) {
          console.error("CSV Parsing Errors:", errors);
          toast.dismiss();
          toast.error("Failed to parse CSV", {
            description: "There are formatting issues with your file.",
          });
          setIsUploading(false);
          return;
        }

        toast.dismiss();
        toast.loading(`Importing ${data.length} leads...`);

        const response = await bulkImportLeads(data);

        toast.dismiss();
        if (response.success) {
          toast.success("Import Successful", {
            description: `Successfully added ${response.count} new leads to your pipeline.`,
          });
          setIsOpen(false);
        } else {
          toast.error("Import Failed", {
            description: response.error || "An unknown error occurred.",
          });
        }
        setIsUploading(false);
      },
      error: (error) => {
        console.error("Papa Parse Error:", error);
        toast.dismiss();
        toast.error("Failed to read file");
        setIsUploading(false);
      },
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "name,phone,source,requirement,budget\nJohn Doe,+919876543210,Walk-in,2BHK,80L - 1Cr";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "12xDesk_Import_Template.csv");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        render={<Button variant="outline" className="gap-2 bg-background border-border/50 text-foreground" />}
      >
        <FileSpreadsheet className="w-4 h-4" />
        <span className="hidden sm:inline">Import CSV</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-primary" />
            Bulk Import Leads
          </DialogTitle>
          <DialogDescription>
            Upload a CSV file to add multiple leads to your inbox at once.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 cursor-pointer ${
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-muted/10"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".csv"
              className="hidden"
            />
            {isUploading ? (
              <div className="flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm font-medium text-foreground">Processing File...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UploadCloud className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    CSV files only. First row must be headers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm">
          <button 
            onClick={downloadTemplate}
            className="text-primary hover:underline font-medium flex items-center gap-1.5"
          >
            <Download className="w-3 h-3" />
            Download Sample Template
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
