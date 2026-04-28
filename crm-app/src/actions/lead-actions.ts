"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeadStage(leadId: string, newStage: string) {
  try {
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: { pipelineStage: newStage },
    });

    revalidatePath("/pipeline");
    revalidatePath("/leads"); // Also revalidate leads inbox to keep counts/stages in sync
    
    return { success: true, lead: updatedLead };
  } catch (error) {
    console.error("Failed to update lead stage:", error);
    return { success: false, error: "Failed to update lead stage" };
  }
}
