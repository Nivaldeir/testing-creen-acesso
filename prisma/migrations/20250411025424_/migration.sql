/*
  Warnings:

  - You are about to drop the column `active` on the `Boletos` table. All the data in the column will be lost.
  - You are about to drop the column `cod` on the `Boletos` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `Boletos` table. All the data in the column will be lost.
  - You are about to drop the column `loteId` on the `Boletos` table. All the data in the column will be lost.
  - You are about to drop the column `name_drawn` on the `Boletos` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Boletos` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Lote` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `Lote` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Lote` table. All the data in the column will be lost.
  - Added the required column `ativo` to the `Boletos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_lote` to the `Boletos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linha_digitavel` to the `Boletos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_sacado` to the `Boletos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `Boletos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ativo` to the `Lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Lote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Boletos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_sacado" TEXT NOT NULL,
    "id_lote" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "linha_digitavel" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Boletos_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Boletos" ("id") SELECT "id" FROM "Boletos";
DROP TABLE "Boletos";
ALTER TABLE "new_Boletos" RENAME TO "Boletos";
CREATE TABLE "new_Lote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Lote" ("id") SELECT "id" FROM "Lote";
DROP TABLE "Lote";
ALTER TABLE "new_Lote" RENAME TO "Lote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
