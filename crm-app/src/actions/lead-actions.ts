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
