import { PrismaClient } from "../generated/prisma";
import { ITalle } from "../models/ITalle";

const prisma = new PrismaClient();

export const getAllTallesService = async () => {
  return prisma.talle.findMany();
};

export const getTalleByIdService = async (id: number) => {
  return prisma.talle.findUnique({
    where: { id },
  });
};

export const postTalleService = async (talle: ITalle) => {
  return prisma.talle.create({
    data: { ...talle },
  });
};

export const putTalleService = async (id: number, newTalle: ITalle) => {
  return prisma.talle.update({
    where: { id },
    data: { ...newTalle },
  });
};

export const deleteTalleService = async (id: number) => {
  return prisma.talle.delete({
    where: { id },
  });
};
