"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function logInteraction(leadId: string, type: string, notes?: string) {
  try {
    await prisma.interaction.create({
      data: {
        leadId,
        type,
        notes: notes || null,
      },
    });
    revalidatePath(`/leads/${leadId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to log interaction:", error);
    return { success: false, error: "Failed to log interaction" };
  }
}

export async function updateLeadStage(leadId: string, newStage: string) {
  try {
    const oldLead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: { pipelineStage: true }
    });

    await prisma.lead.update({
      where: { id: leadId },
      data: { pipelineStage: newStage },
    });

    // Automatically log the stage change
    if (oldLead && oldLead.pipelineStage !== newStage) {
      await logInteraction(
        leadId, 
        "STAGE_CHANGE", 
        `Moved from ${oldLead.pipelineStage.replace(/_/g, " ")} to ${newStage.replace(/_/g, " ")}`
      );
    }

    revalidatePath("/pipeline");
    revalidatePath("/leads");
    revalidatePath(`/leads/${leadId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update lead stage:", error);
    return { success: false, error: "Failed to update lead stage" };
  }
}

export async function createNewLead(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const source = formData.get("source") as string;
    const requirement = formData.get("requirement") as string;
    const budget = formData.get("budget") as string;

    if (!name || !phone) {
      return { success: false, error: "Name and Phone are required" };
    }

    await prisma.lead.create({
      data: {
        name,
        phone,
        source: source || "Direct Call",
        requirement: requirement || null,
        budget: budget || null,
        pipelineStage: "NEW_LEAD",
      },
    });

    revalidatePath("/pipeline");
    revalidatePath("/leads");
    return { success: true };
  } catch (error) {
    console.error("Failed to create lead:", error);
    return { success: false, error: "Failed to create lead" };
  }
}

export async function bulkImportLeads(leads: any[]) {
  try {
    const validLeads = leads
      .filter((lead) => lead.name && lead.phone) // Ensure required fields exist
      .map((lead) => ({
        name: String(lead.name).trim(),
        phone: String(lead.phone).trim(),
        source: lead.source ? String(lead.source).trim() : "CSV Import",
        requirement: lead.requirement ? String(lead.requirement).trim() : null,
        budget: lead.budget ? String(lead.budget).trim() : null,
        pipelineStage: "NEW_LEAD",
      }));

    if (validLeads.length === 0) {
      return { success: false, error: "No valid leads found in the import." };
    }

    const result = await prisma.lead.createMany({
      data: validLeads,
    });

    revalidatePath("/leads");
    revalidatePath("/pipeline");
    
    return { success: true, count: result.count };
  } catch (error) {
    console.error("Bulk import failed:", error);
    return { success: false, error: "Failed to process bulk import" };
  }
}
