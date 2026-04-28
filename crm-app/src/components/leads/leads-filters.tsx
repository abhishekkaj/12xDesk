"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const STAGES = [
  { label: "All Stages", value: "all" },
  { label: "New Lead", value: "NEW_LEAD" },
  { label: "Requirement Gathered", value: "REQUIREMENT_GATHERED" },
  { label: "Site Visit Scheduled", value: "SITE_VISIT_SCHEDULED" },
  { label: "Site Visit Done", value: "SITE_VISIT_DONE" },
  { label: "Token Negotiation", value: "TOKEN_NEGOTIATION" },
  { label: "Closed Won", value: "CLOSED_WON" },
  { label: "Closed Lost", value: "CLOSED_LOST" },
];

const SOURCES = [
  { label: "All Sources", value: "all" },
  { label: "99acres", value: "99acres" },
  { label: "MagicBricks", value: "MagicBricks" },
  { label: "Housing", value: "Housing" },
  { label: "Facebook", value: "Facebook" },
  { label: "WhatsApp", value: "WhatsApp" },
  { label: "Walk-in", value: "Walk-in" },
  { label: "Referral", value: "Referral" },
];

const REQUIREMENTS = [
  { label: "All Requirements", value: "all" },
  { label: "1BHK", value: "1BHK" },
  { label: "2BHK", value: "2BHK" },
  { label: "3BHK", value: "3BHK" },
  { label: "4BHK", value: "4BHK" },
  { label: "Plot", value: "Plot" },
];

export function LeadsFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    replace(pathname);
  };

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            defaultValue={searchParams.get("query")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 bg-muted/30 border-border/50 focus-visible:ring-primary/20"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 md:flex gap-2">
          <Select
            value={searchParams.get("stage") || "all"}
            onValueChange={(v) => handleFilterChange("stage", v)}
          >
            <SelectTrigger className="w-full md:w-[160px] bg-muted/30 border-border/50 text-xs">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              {STAGES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={searchParams.get("source") || "all"}
            onValueChange={(v) => handleFilterChange("source", v)}
          >
            <SelectTrigger className="w-full md:w-[140px] bg-muted/30 border-border/50 text-xs">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              {SOURCES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={searchParams.get("requirement") || "all"}
            onValueChange={(v) => handleFilterChange("requirement", v)}
          >
            <SelectTrigger className="w-full md:w-[140px] bg-muted/30 border-border/50 text-xs">
              <SelectValue placeholder="Requirement" />
            </SelectTrigger>
            <SelectContent>
              {REQUIREMENTS.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground md:px-2"
            >
              <X className="w-3 h-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mr-1">
            Active Filters:
          </span>
          {searchParams.get("query") && (
            <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20 px-2 py-0">
              "{searchParams.get("query")}"
            </Badge>
          )}
          {searchParams.get("stage") && (
            <Badge variant="secondary" className="text-[10px] bg-violet-500/10 text-violet-400 border-violet-500/20 px-2 py-0">
              Stage: {STAGES.find(s => s.value === searchParams.get("stage"))?.label}
            </Badge>
          )}
          {searchParams.get("source") && (
            <Badge variant="secondary" className="text-[10px] bg-emerald-glow/10 text-emerald-glow border-emerald-glow/20 px-2 py-0">
              Source: {searchParams.get("source")}
            </Badge>
          )}
          {searchParams.get("requirement") && (
            <Badge variant="secondary" className="text-[10px] bg-amber-warm/10 text-amber-warm border-amber-warm/20 px-2 py-0">
              Requirement: {searchParams.get("requirement")}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
