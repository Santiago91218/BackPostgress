/*
  Warnings:

  - Made the column `contrasenia` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "contrasenia" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
