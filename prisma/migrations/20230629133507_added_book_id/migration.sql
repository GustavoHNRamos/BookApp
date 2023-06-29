/*
  Warnings:

  - Added the required column `book_id` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "book_id" TEXT NOT NULL,
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
INSERT INTO "new_Book" ("authors", "categories", "date", "desc", "height", "id", "image", "language", "matRating", "pages", "pub", "thickness", "title", "type", "width") SELECT "authors", "categories", "date", "desc", "height", "id", "image", "language", "matRating", "pages", "pub", "thickness", "title", "type", "width" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_book_id_key" ON "Book"("book_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
