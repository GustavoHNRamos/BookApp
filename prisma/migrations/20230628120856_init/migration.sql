/*
  Warnings:

  - You are about to drop the column `publishedDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `Book` table. All the data in the column will be lost.
  - Added the required column `date` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pub` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "pub" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "matRating" TEXT NOT NULL,
    "categories" TEXT,
    "type" TEXT NOT NULL,
    "height" TEXT,
    "width" TEXT,
    "thickness" TEXT,
    "desc" TEXT NOT NULL
);
INSERT INTO "new_Book" ("authors", "categories", "height", "id", "image", "language", "matRating", "pages", "thickness", "title", "type", "width") SELECT "authors", "categories", "height", "id", "image", "language", "matRating", "pages", "thickness", "title", "type", "width" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
