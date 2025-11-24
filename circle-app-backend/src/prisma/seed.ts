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
        photo_profile: "profile1.jpg",
      },
      {
        username: "kafa",
        full_name: "Kafa Muntaqa",
        email: "kafa@example.com",
        password:
          "$2a$10$Kc5bTcvJzKPWbuf7nYIJ2.hz1csciqXqwIfJTQvUxLx11jukeEIDa",
        photo_profile: "profile2.jpg",
      },
      {
        username: "muntaqa",
        full_name: "Muntaqa Rizqi",
        email: "muntaqa@example.com",
        password:
          "$2a$10$Kc5bTcvJzKPWbuf7nYIJ2.hz1csciqXqwIfJTQvUxLx11jukeEIDa",
        photo_profile: "profile2.jpg",
      },
    ],
  });

  await prisma.threads.createMany({
    data: [
      {
        content: "King Oyen",
        image: "oyen.jpeg",
        created_by: 1,
      },
      {
        content: "Himalaya Cat",
        image: "himalaya.png",
        created_by: 1,
      },
      {
        content: "Si Pendek Munchkin",
        image: "munchkin.png",
        created_by: 2,
      },
      {
        content:
          "Hewan, hewan apa yang ga pernah salah? Kocheng Ga-Wrong!!! xixixi",
        image: "",
        created_by: 2,
      },
      {
        content: "Hewan apa yang kalau di injek ga marah? Kera-mik!!! xixixi",
        image: "",
        created_by: 3,
      },
      {
        content: "Sayur apa yang selalu dingin? Kembang COLD!!! xixixi",
        image: "",
        created_by: 3,
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
