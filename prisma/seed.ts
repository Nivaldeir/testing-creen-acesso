import { prisma } from "../src/infra/database/prisma";


async function main() {
  await prisma.lote.createMany({
    data: [
      {
        ativo: true,
        nome: "0017",
        id: 3
      },
      {
        ativo: true,
        nome: "0018",
        id: 6
      },
      {
        ativo: true,
        nome: "0019",
        id: 7
      },
    ]
  })
}

main()