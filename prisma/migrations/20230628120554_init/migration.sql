-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publishedDate" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "matRating" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "height" TEXT,
    "width" TEXT,
    "thickness" TEXT
);
