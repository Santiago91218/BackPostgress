import { Request, Response } from "express";
import {
  compareContrasenias,
  hashContrasenia,
} from "../services/passwordService";
import prisma from "../database/prismaClient";
import { generateToken } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, contrasenia } = req.body;

  try {
    const hashedContrasenia = await hashContrasenia(contrasenia);
    const user = await prisma.usuario.create({
      data: {
        email,
        contrasenia: hashedContrasenia,
      },
    });

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error: any) {
    if (!email) {
      res.status(400).json({ message: "El email es obligatorio" });
    }
    if (!contrasenia) {
      res.status(400).json({ message: "La contraseña es obligatoria" });
    }
    if (error?.code == "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({ message: "El email ingresado ya existe" });
    }
    console.log(error);
    res.status(500).json({ error: "Hubo un error en el registro" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, contrasenia } = req.body;
  try {
    if (!email) {
      res.status(400).json({ message: "El email es obligatorio" });
    }
    if (!contrasenia) {
      res.status(400).json({ message: "La contraseña es obligatoria" });
    }
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    const contraseniaMatch = await compareContrasenias(
      contrasenia,
      user.contrasenia
    );
    if (!contraseniaMatch) {
      res.status(401).json({ error: "Usuario y contraseñas no coinciden" });
    }
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error: any) {
    console.log("Error: ", error);
  }
};
