"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProperty(formData: FormData) {
  try {
    const projectName = formData.get("projectName") as string;
    const developer = formData.get("developer") as string;
    const location = formData.get("location") as string;
    const configuration = formData.get("configuration") as string;
    const possessionTimeline = formData.get("possessionTimeline") as string;
    const basePrice = formData.get("basePrice") as string;

    if (!projectName || !developer || !location || !configuration) {
      return { success: false, error: "Required fields missing" };
    }

    await prisma.property.create({
      data: {
        projectName,
        developer,
        location,
        configuration,
        possessionTimeline: possessionTimeline || null,
        basePrice: basePrice || null,
      },
    });

    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    console.error("Failed to create property:", error);
    return { success: false, error: "Failed to create property" };
  }
}

export async function updateProperty(id: string, formData: FormData) {
  try {
    const projectName = formData.get("projectName") as string;
    const developer = formData.get("developer") as string;
    const location = formData.get("location") as string;
    const configuration = formData.get("configuration") as string;
    const possessionTimeline = formData.get("possessionTimeline") as string;
    const basePrice = formData.get("basePrice") as string;

    if (!projectName || !developer || !location || !configuration) {
      return { success: false, error: "Required fields missing" };
    }

    await prisma.property.update({
      where: { id },
      data: {
        projectName,
        developer,
        location,
        configuration,
        possessionTimeline: possessionTimeline || null,
        basePrice: basePrice || null,
      },
    });

    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    console.error("Failed to update property:", error);
    return { success: false, error: "Failed to update property" };
  }
}

export async function deleteProperty(id: string) {
  try {
    await prisma.property.delete({
      where: { id },
    });

    revalidatePath("/inventory");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete property:", error);
    return { success: false, error: "Failed to delete property" };
  }
}
