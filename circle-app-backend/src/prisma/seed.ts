import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({
    data: [
      {
        username: "rizqi",
        full_name: "Rizqi Kafa",
        email: "rizqi@example.com",
        password:
          "$2a$10$Kc5bTcvJzKPWbuf7nYIJ2.hz1csciqXqwIfJTQvUxLx11jukeEIDa",
      },
      {
        username: "kafa",
        full_name: "Kafa Muntaqa",
        email: "kafa@example.com",
        password:
          "$2a$10$Kc5bTcvJzKPWbuf7nYIJ2.hz1csciqXqwIfJTQvUxLx11jukeEIDa",
      },
    ],
  });

  await prisma.threads.createMany({
    data: [
      {
        content: "King Oyen",
        image: "/uploads/threads/oyen.jpeg",
        created_by: 1,
      },
      {
        content: "Himalaya Cat",
        image: "/uploads/threads/himalaya.png",
        created_by: 1,
      },
      {
        content: "Si Pendek Munchkin",
        image: "/uploads/threads/munchkin.png",
        created_by: 2,
      },
      {
        content:
          "Hewan, hewan apa yang ga pernah salah? Kocheng Ga-Wrong!!! xixixi",
        image: null,
        created_by: 2,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
