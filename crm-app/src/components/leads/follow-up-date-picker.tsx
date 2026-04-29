"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setFollowUpDate } from "@/actions/lead-actions";

interface FollowUpDatePickerProps {
  leadId: string;
  currentDate?: Date | null;
}

export function FollowUpDatePicker({ leadId, currentDate }: FollowUpDatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(currentDate || undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = async (newDate: Date | undefined) => {
    setDate(newDate);
    setIsOpen(false);
    setIsUpdating(true);

    const response = await setFollowUpDate(leadId, newDate || null);
    
    if (response.success) {
      toast.success("Follow-up Updated", {
        description: newDate 
          ? `Follow-up scheduled for ${format(newDate, "PPP")}`
          : "Follow-up date cleared.",
      });
    } else {
      toast.error("Failed to update", {
        description: response.error || "An error occurred.",
      });
      setDate(currentDate || undefined); // Revert on failure
    }
    
    setIsUpdating(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger render={
        <Button
          variant={"outline"}
          disabled={isUpdating}
          className={cn(
            "w-[240px] justify-start text-left font-normal bg-background border-border/50",
            !date && "text-muted-foreground"
          )}
        />
      }>
        {isUpdating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
        )}
        {date ? format(date, "PPP") : <span>Set Follow-up Date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 glass-card border-border/50" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} // Disable past dates
        />
        {date && (
          <div className="p-2 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
              onClick={() => handleSelect(undefined)}
            >
              Clear Date
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
