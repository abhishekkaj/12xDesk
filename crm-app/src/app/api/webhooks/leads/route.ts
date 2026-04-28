import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Automated Lead Ingestion Webhook
 * Accepts POST requests from external sources (Facebook, Google, Zapier, etc.)
 */
export async function POST(req: NextRequest) {
  try {
    // 1. API Key Protection
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.INGESTION_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing API Key" },
        { status: 401 }
      );
    }

    // 2. Parse Payload
    const body = await req.json();
    const { name, phone, source, budget, requirement } = body;

    // 3. Payload Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Bad Request: 'name' and 'phone' are required fields" },
        { status: 400 }
      );
    }

    // 4. Create Lead in Database
    const newLead = await prisma.lead.create({
      data: {
        name,
        phone: String(phone),
        source: source || "Webhook",
        budget: budget || null,
        requirement: requirement || null,
        pipelineStage: "NEW_LEAD", // Hardcoded for instant Kanban ingestion
      },
    });

    // 5. Success Response
    return NextResponse.json(
      { 
        message: "Lead ingested successfully", 
        leadId: newLead.id 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Webhook Ingestion Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
