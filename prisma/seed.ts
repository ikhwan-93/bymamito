import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Cakes", slug: "cakes", sortOrder: 1 },
    { name: "Cookies", slug: "cookies", sortOrder: 2 },
    { name: "Pastries", slug: "pastries", sortOrder: 3 },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  const cakes = await prisma.category.findUnique({ where: { slug: "cakes" } });
  if (cakes) {
    await prisma.product.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: "Chocolate Fudge Cake",
        description: "Rich, moist chocolate cake.",
        priceCents: 4500,
        available: true,
        categoryId: cakes.id,
      },
    });
  }

  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Welcome to Bymamito",
      body: "Fresh homemade bakes, made with love.",
      published: true,
    },
  });

  const defaults: [string, string][] = [
    ["whatsapp_number", "194712426295357"],
    ["business_hours", "Open daily, 9am - 6pm"],
    ["about_text", "Bymamito is a homemade bakery."],
    ["instagram_url", "https://www.instagram.com/bymamito/"],
  ];

  for (const [key, value] of defaults) {
    await prisma.setting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
