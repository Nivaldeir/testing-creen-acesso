/*
  Warnings:

  - You are about to drop the column `cod` on the `Boletos` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Boletos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_drawn" TEXT NOT NULL,
    "loteId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Boletos_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Boletos" ("active", "create_at", "id", "loteId", "name_drawn", "price") SELECT "active", "create_at", "id", "loteId", "name_drawn", "price" FROM "Boletos";
DROP TABLE "Boletos";
ALTER TABLE "new_Boletos" RENAME TO "Boletos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
