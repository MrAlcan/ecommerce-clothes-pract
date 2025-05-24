import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Limpia la tabla (opcional)
  await prisma.product.deleteMany();

  // Inserta datos
  await prisma.product.createMany({
    data: [
        { name: "Polera", category:"Hombres", color:"Negro", price:"27.85" },
        { name: "Camisa", category:"Hombres", color:"Blanca", price:"25.99" },
        { name: "Saco", category:"Hombres", color:"Negro", price:"31.99" },
        { name: "Tenis", category:"Hombres", color:"Blancos", price:"99.99" },
        { name: "Polera", category:"Hombres", color:"Verde", price:"20.99" },
        { name: "Pantalon", category:"Hombres", color:"Azul", price:"17.99" },
        { name: "Sueter", category:"Hombres", color:"Cafe", price:"58.99" },
        { name: "Chompa", category:"Hombres", color:"Gris", price:"60.99" },
        { name: "Tenis", category:"Hombres", color:"Negros", price:"39.99" },
        { name: "Camisa", category:"Hombres", color:"Azul", price:"14.99" },

        { name: "Polera", category:"Mujeres", color:"Negro", price:"27.85" },
        { name: "Camisa", category:"Mujeres", color:"Blanca", price:"25.99" },
        { name: "Saco", category:"Mujeres", color:"Negro", price:"31.99" },
        { name: "Tenis", category:"Mujeres", color:"Blancos", price:"99.99" },
        { name: "Polera", category:"Mujeres", color:"Verde", price:"20.99" },
        { name: "Pantalon", category:"Mujeres", color:"Azul", price:"17.99" },
        { name: "Sueter", category:"Mujeres", color:"Cafe", price:"58.99" },
        { name: "Chompa", category:"Mujeres", color:"Gris", price:"60.99" },
        { name: "Tenis", category:"Mujeres", color:"Negros", price:"39.99" },
        { name: "Camisa", category:"Mujeres", color:"Azul", price:"14.99" },

        { name: "Polera", category:"Niños", color:"Negro", price:"27.85" },
        { name: "Camisa", category:"Niños", color:"Blanca", price:"25.99" },
        { name: "Saco", category:"Niños", color:"Negro", price:"31.99" },
        { name: "Tenis", category:"Niños", color:"Blancos", price:"99.99" },
        { name: "Polera", category:"Niños", color:"Verde", price:"20.99" },
        { name: "Pantalon", category:"Niños", color:"Azul", price:"17.99" },
        { name: "Sueter", category:"Niños", color:"Cafe", price:"58.99" },
        { name: "Chompa", category:"Niños", color:"Gris", price:"60.99" },
        { name: "Tenis", category:"Niños", color:"Negros", price:"39.99" },
        { name: "Camisa", category:"Niños", color:"Azul", price:"14.99" },
        
    ],
    //skipDuplicates: true, // si tu campo email es único
  });

  console.log("Seeding: productos creados ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
