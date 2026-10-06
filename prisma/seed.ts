import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedProduct = {
  name: string;
  description: string;
  priceCents: number;
  imageUrl?: string;
};

const IMG = "/menu-illustrations/";

type SeedCategory = {
  name: string;
  slug: string;
  products: SeedProduct[];
};

const kekBatikFlavours: [string, number, number, number, string][] = [
  ["Plain", 2300, 4400, 7900, "kek-batik-plain.svg"],
  ["Ovomaltine", 2700, 5200, 9200, "kek-batik-ovomaltine.svg"],
  ["Mix (plain & ovomaltine)", 2500, 4800, 8600, "kek-batik-mix.svg"],
];

const brownieFlavours: [string, number, number, number, string][] = [
  ["Plain", 3000, 5800, 11000, "brownies-plain.svg"],
  ["Sea salt", 3000, 5900, 11200, "brownies-sea-salt.svg"],
  ["Hazelnut", 3100, 6100, 11800, "brownies-hazelnut.svg"],
  ["Double choc", 3600, 7000, 13400, "brownies-double-choc.svg"],
  ["Dark couverture choc", 3500, 6800, 13000, "brownies-dark-couverture.svg"],
  ["Salted caramel", 3300, 6500, 12000, "brownies-salted-caramel.svg"],
  ["Biscoff", 3500, 6800, 13000, "brownies-biscoff.svg"],
  ["Ovomaltine", 3600, 7100, 13500, "brownies-ovomaltine.svg"],
  ["Signature (salted caramel & hazelnut)", 3400, 6600, 12600, "brownies-signature.svg"],
  ["Mix (sea salt & double choc)", 3000, 5900, 11200, "brownies-mix.svg"],
];

function sizeVariants(
  flavourLabel: string,
  productLabel: string,
  sizes: string[],
  prices: [number, number, number],
  image: string,
): SeedProduct[] {
  return sizes.map((size, i) => ({
    name: `${productLabel} — ${flavourLabel} (${size})`,
    description: `${productLabel}, ${flavourLabel.toLowerCase()}. Size: ${size}.`,
    priceCents: prices[i],
    imageUrl: IMG + image,
  }));
}

const kekBatikSizes = ["Half", '6.5"', '10"'];
const brownieSizes = ["Half", '7"', '10"'];

const menu: SeedCategory[] = [
  {
    name: "Kek Batik",
    slug: "kek-batik",
    products: kekBatikFlavours.flatMap(([flavour, half, mid, whole, img]) =>
      sizeVariants(flavour, "Crunchy Kek Batik", kekBatikSizes, [half, mid, whole], img),
    ),
  },
  {
    name: "Brownies",
    slug: "brownies",
    products: brownieFlavours.flatMap(([flavour, half, mid, whole, img]) =>
      sizeVariants(flavour, "Chewy Fudge Brownies", brownieSizes, [half, mid, whole], img),
    ),
  },
  {
    name: "Congo Bars",
    slug: "congo-bars",
    products: [
      { name: "Congo Bars (Half)", description: "Congo bars, half size (8-inch).", priceCents: 3400, imageUrl: IMG + "congo-bars.svg" },
      { name: "Congo Bars (8\")", description: "Congo bars, 8-inch.", priceCents: 6600, imageUrl: IMG + "congo-bars.svg" },
      { name: "Congo Bars (10\")", description: "Congo bars, 10-inch.", priceCents: 11000, imageUrl: IMG + "congo-bars.svg" },
    ],
  },
  {
    name: "Combos",
    slug: "combos",
    products: [
      {
        name: "Combo: Plain Kek Batik + Plain Brownies",
        description: "Half of half 6.5\" plain kek batik + half 7\" plain brownies.",
        priceCents: 5100,
        imageUrl: IMG + "combo-plain-kek-plain-brownies.svg",
      },
      {
        name: "Combo: Mix Kek Batik + Mix Brownies",
        description: "Half of half 6.5\" mix kek batik + half 7\" mix brownies.",
        priceCents: 5700,
        imageUrl: IMG + "combo-mix-kek-mix-brownies.svg",
      },
      {
        name: "Combo: Plain Kek Batik + Congo Bars",
        description: "Half of 6.5\" plain kek batik + half of 8\" congo bars.",
        priceCents: 5900,
        imageUrl: IMG + "combo-plain-kek-congo.svg",
      },
      {
        name: "Combo: Ovomaltine Kek Batik + Congo Bars",
        description: "Half of 6.5\" ovomaltine kek batik + half of 8\" congo bars.",
        priceCents: 5900,
        imageUrl: IMG + "combo-ovomaltine-kek-congo.svg",
      },
      {
        name: "Combo: Mix Kek Batik + Congo Bars",
        description: "Half of 6.5\" mix kek batik + half of 8\" congo bars.",
        priceCents: 5700,
        imageUrl: IMG + "combo-mix-kek-congo.svg",
      },
      {
        name: "Combo: Plain Brownies + Congo Bars",
        description: "Half of 7\" plain brownies + half of 8\" congo bars.",
        priceCents: 6200,
        imageUrl: IMG + "combo-plain-brownies-congo.svg",
      },
      {
        name: "Combo: Mix Brownies + Congo Bars",
        description: "Half of 7\" mix brownies + half of 8\" congo bars.",
        priceCents: 6600,
        imageUrl: IMG + "combo-mix-brownies-congo.svg",
      },
    ],
  },
  {
    name: "Pudding Cake",
    slug: "pudding-cake",
    products: [
      {
        name: "Caramel Pudding Cake (7\")",
        description: "Caramel pudding cake, 7-inch.",
        priceCents: 6000,
        imageUrl: IMG + "pudding-cake-whole.svg",
      },
      {
        name: "Caramel Pudding Cake (Quarter slice)",
        description: "Caramel pudding cake, quarter slice.",
        priceCents: 1600,
        imageUrl: IMG + "pudding-cake-slice.svg",
      },
    ],
  },
  {
    name: "Add-ons & Extras",
    slug: "add-ons-extras",
    products: [
      {
        name: "Strawberries topping",
        description: "Fresh strawberries add-on, RM10–RM20 depending on size.",
        priceCents: 1000,
        imageUrl: IMG + "addon-strawberries.svg",
      },
      {
        name: "Assorted choc topping",
        description: "Assorted chocolate add-on, RM10–RM15 depending on size.",
        priceCents: 1000,
        imageUrl: IMG + "addon-assorted-choc.svg",
      },
      {
        name: "Upgrade to tower & ribbon",
        description: "Upgrade your brownies to a tower with ribbon, RM5–RM7.",
        priceCents: 500,
        imageUrl: IMG + "addon-tower-ribbon.svg",
      },
      {
        name: "Acrylic topper",
        description: "Acrylic cake topper.",
        priceCents: 300,
        imageUrl: IMG + "addon-acrylic-topper.svg",
      },
      {
        name: "Wish card (long paragraph)",
        description: "Printed wish card with a long paragraph.",
        priceCents: 100,
        imageUrl: IMG + "addon-wish-card.svg",
      },
      {
        name: "Fondant writing (max 6 words)",
        description: "Fondant writing, up to 6 words.",
        priceCents: 100,
        imageUrl: IMG + "addon-fondant-writing.svg",
      },
      {
        name: "Small notes (max 15 words)",
        description: "Small handwritten notes, up to 15 words. FREE.",
        priceCents: 0,
        imageUrl: IMG + "addon-small-notes.svg",
      },
    ],
  },
];

const orderingPostBody = `All cakes are baked on a pre-order basis. Kindly place your order at least 2 days in advance to avoid disappointment.

- Cut-off time is 10am for next-day pickup/delivery. You can still check with us for any urgent slot (extra charge RM10/cake for last-minute orders).
- Full payment secures your slot; otherwise the slot goes to the next customer in line.
- Refunds are only made for incorrect orders (lesser value) or spoiled cakes.

Self pickup: Wakaf Siku, Kota Bharu. Time slots: 10am-12pm / 6pm-8pm.

Delivery (Kota Bharu area): via Grab Express, slots 10am-12pm / 6pm-8pm. We shall not be held responsible for any delay/damage caused by the third party.

Postage (J&T Express): Semenanjung RM8, Sabah & Sarawak RM14. For 2 cakes and above, we will check the additional fee first. Parcels usually arrive in 1-2 days (min 4-5 days for East Malaysia). Post-out days are updated regularly on our Instagram story.

Check our IG story for extra bakes available!`;

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  let sortOrder = 0;
  for (const [index, category] of menu.entries()) {
    const created = await prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        sortOrder: index + 1,
      },
    });

    for (const product of category.products) {
      sortOrder += 1;
      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          priceCents: product.priceCents,
          imageUrl: product.imageUrl ?? "",
          available: true,
          sortOrder,
          categoryId: created.id,
        },
      });
    }
  }

  await prisma.post.upsert({
    where: { id: 1 },
    update: {
      title: "How to order — pre-order, pickup, delivery & postage",
      body: orderingPostBody,
      published: true,
    },
    create: {
      id: 1,
      title: "How to order — pre-order, pickup, delivery & postage",
      body: orderingPostBody,
      published: true,
    },
  });

  const defaults: [string, string][] = [
    ["whatsapp_number", "194712426295357"],
    [
      "business_hours",
      "Pre-order basis. Order 2 days ahead; cut-off 10am for next-day. Pickup/delivery slots: 10am-12pm / 6pm-8pm.",
    ],
    [
      "about_text",
      "Bymamito is a homemade bakery in Wakaf Siku, Kota Bharu — crunchy kek batik, chewy fudge brownies, congo bars and caramel pudding cakes, baked to order.",
    ],
    ["instagram_url", "https://www.instagram.com/bymamito/"],
  ];

  for (const [key, value] of defaults) {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  const counts = {
    categories: await prisma.category.count(),
    products: await prisma.product.count(),
  };
  console.log(`Seed complete: ${counts.categories} categories, ${counts.products} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
