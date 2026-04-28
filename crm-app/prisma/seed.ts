import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding 12xDesk CRM database...\n");

  // ─── Clean existing data ─────────────────────────────────────
  await prisma.interaction.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users ───────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("password123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Abhishek Jha",
      email: "admin@12xdesk.com",
      password: hashedPassword,
    },
  });

  console.log(`✅ Created admin user: ${admin.email}`);

  // ─── Properties ──────────────────────────────────────────────
  const properties = await Promise.all([
    prisma.property.create({
      data: {
        projectName: "Lodha Crown Thane",
        developer: "Lodha Group",
        location: "Majiwada, Thane West",
        configuration: "2BHK, 3BHK",
        possessionTimeline: "Q4 2027",
        basePrice: "1.2 Cr onwards",
      },
    }),
    prisma.property.create({
      data: {
        projectName: "Runwal Gardens",
        developer: "Runwal Group",
        location: "Dombivli East",
        configuration: "1BHK, 2BHK",
        possessionTimeline: "Q2 2026",
        basePrice: "55L onwards",
      },
    }),
    prisma.property.create({
      data: {
        projectName: "Oberoi Sky City",
        developer: "Oberoi Realty",
        location: "Borivali East",
        configuration: "2BHK, 3BHK, 4BHK",
        possessionTimeline: "Ready to Move",
        basePrice: "1.8 Cr onwards",
      },
    }),
    prisma.property.create({
      data: {
        projectName: "Sunteck Maxx World",
        developer: "Sunteck Realty",
        location: "Naigaon East, Mira Road",
        configuration: "1BHK, 2BHK",
        possessionTimeline: "Q1 2028",
        basePrice: "42L onwards",
      },
    }),
    prisma.property.create({
      data: {
        projectName: "Dosti West County",
        developer: "Dosti Realty",
        location: "Balkum, Thane West",
        configuration: "1BHK, 2BHK, 3BHK",
        possessionTimeline: "Q3 2027",
        basePrice: "70L onwards",
      },
    }),
  ]);

  console.log(`✅ Created ${properties.length} properties`);

  // ─── Leads ───────────────────────────────────────────────────
  const leadsData = [
    // 5 NEW_LEAD
    {
      name: "Rajesh Sharma",
      phone: "+919820145678",
      source: "99acres",
      budget: "80L - 1.2Cr",
      requirement: "2BHK in Thane West",
      pipelineStage: "NEW_LEAD",
    },
    {
      name: "Priya Mehta",
      phone: "+919876543210",
      source: "MagicBricks",
      budget: "50L - 75L",
      requirement: "1BHK near station",
      pipelineStage: "NEW_LEAD",
    },
    {
      name: "Amit Patel",
      phone: "+919823456789",
      source: "Facebook",
      budget: "1Cr - 1.5Cr",
      requirement: "3BHK with parking",
      pipelineStage: "NEW_LEAD",
    },
    {
      name: "Sunita Desai",
      phone: "+919834567890",
      source: "WhatsApp",
      budget: "40L - 60L",
      requirement: "1BHK in Mira Road",
      pipelineStage: "NEW_LEAD",
    },
    {
      name: "Vikram Joshi",
      phone: "+919845678901",
      source: "Walk-in",
      budget: "90L - 1.3Cr",
      requirement: "2BHK ready possession",
      pipelineStage: "NEW_LEAD",
    },

    // 3 REQUIREMENT_GATHERED
    {
      name: "Deepak Gupta",
      phone: "+919856789012",
      source: "Housing.com",
      budget: "60L - 80L",
      requirement: "2BHK in Dombivli",
      pipelineStage: "REQUIREMENT_GATHERED",
    },
    {
      name: "Sneha Kulkarni",
      phone: "+919867890123",
      source: "Referral",
      budget: "1.5Cr - 2Cr",
      requirement: "3BHK luxury in Borivali",
      pipelineStage: "REQUIREMENT_GATHERED",
    },
    {
      name: "Ramesh Iyer",
      phone: "+919878901234",
      source: "99acres",
      budget: "45L - 55L",
      requirement: "1BHK investment",
      pipelineStage: "REQUIREMENT_GATHERED",
    },

    // 3 SITE_VISIT_SCHEDULED
    {
      name: "Kavita Nair",
      phone: "+919889012345",
      source: "MagicBricks",
      budget: "70L - 1Cr",
      requirement: "2BHK in Thane",
      pipelineStage: "SITE_VISIT_SCHEDULED",
    },
    {
      name: "Arjun Singh",
      phone: "+919890123456",
      source: "Facebook",
      budget: "1.2Cr - 1.8Cr",
      requirement: "3BHK with garden view",
      pipelineStage: "SITE_VISIT_SCHEDULED",
    },
    {
      name: "Meera Reddy",
      phone: "+919801234567",
      source: "WhatsApp",
      budget: "55L - 70L",
      requirement: "2BHK near school",
      pipelineStage: "SITE_VISIT_SCHEDULED",
    },

    // 2 SITE_VISIT_DONE
    {
      name: "Nikhil Kapoor",
      phone: "+919812345678",
      source: "Walk-in",
      budget: "1Cr - 1.4Cr",
      requirement: "2BHK premium flat",
      pipelineStage: "SITE_VISIT_DONE",
    },
    {
      name: "Pooja Thakur",
      phone: "+919823456701",
      source: "Referral",
      budget: "80L - 1.1Cr",
      requirement: "2BHK with vastu",
      pipelineStage: "SITE_VISIT_DONE",
    },

    // 1 TOKEN_NEGOTIATION
    {
      name: "Suresh Menon",
      phone: "+919834567012",
      source: "99acres",
      budget: "1.1Cr - 1.3Cr",
      requirement: "2BHK high floor",
      pipelineStage: "TOKEN_NEGOTIATION",
    },

    // 1 CLOSED_WON
    {
      name: "Anita Chopra",
      phone: "+919845670123",
      source: "Housing.com",
      budget: "75L",
      requirement: "2BHK in Dombivli East",
      pipelineStage: "CLOSED_WON",
    },
  ];

  const leads = await Promise.all(
    leadsData.map((data) => prisma.lead.create({ data }))
  );

  console.log(`✅ Created ${leads.length} leads`);

  // ─── Interactions ────────────────────────────────────────────
  // Attach interactions to leads that are further in the pipeline
  const interactions = await Promise.all([
    // Rajesh (NEW_LEAD) got an initial WhatsApp
    prisma.interaction.create({
      data: {
        leadId: leads[0].id,
        type: "WHATSAPP",
        notes: "Sent Lodha Crown brochure. Interested in 2BHK.",
      },
    }),

    // Kavita (SITE_VISIT_SCHEDULED) - multiple interactions
    prisma.interaction.create({
      data: {
        leadId: leads[8].id,
        type: "CALL",
        notes: "Discussed budget and preferences. Prefers east-facing.",
      },
    }),
    prisma.interaction.create({
      data: {
        leadId: leads[8].id,
        type: "WHATSAPP",
        notes: "Shared location map and site visit details for Saturday.",
      },
    }),

    // Nikhil (SITE_VISIT_DONE) - visited and interested
    prisma.interaction.create({
      data: {
        leadId: leads[11].id,
        type: "SITE_VISIT",
        notes: "Visited Oberoi Sky City. Liked 15th floor 2BHK. Wants to bring family next week.",
      },
    }),
    prisma.interaction.create({
      data: {
        leadId: leads[11].id,
        type: "CALL",
        notes: "Follow-up call. Discussing loan options with HDFC.",
      },
    }),

    // Suresh (TOKEN_NEGOTIATION) - heavy engagement
    prisma.interaction.create({
      data: {
        leadId: leads[13].id,
        type: "WHATSAPP",
        notes: "Sent cost sheet and payment plan for Lodha Crown 2BHK.",
      },
    }),
    prisma.interaction.create({
      data: {
        leadId: leads[13].id,
        type: "CALL",
        notes: "Negotiating price. Asking for 5L discount. Developer offered 2L.",
      },
    }),
    prisma.interaction.create({
      data: {
        leadId: leads[13].id,
        type: "SITE_VISIT",
        notes: "Second visit with wife. Finalized unit 1502. Token amount discussed.",
      },
    }),

    // Anita (CLOSED_WON) - completed deal
    prisma.interaction.create({
      data: {
        leadId: leads[14].id,
        type: "WHATSAPP",
        notes: "Initial inquiry for Runwal Gardens. Sent floor plans.",
      },
    }),
    prisma.interaction.create({
      data: {
        leadId: leads[14].id,
        type: "SITE_VISIT",
        notes: "Visited Runwal Gardens. Booked 2BHK on 8th floor.",
      },
    }),
    prisma.interaction.create({
      data: {
        leadId: leads[14].id,
        type: "CALL",
        notes: "Token of 2L paid. Agreement signing scheduled for next week.",
      },
    }),
  ]);

  console.log(`✅ Created ${interactions.length} interactions`);
  console.log("\n🎉 Seed complete! Database is ready.\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
