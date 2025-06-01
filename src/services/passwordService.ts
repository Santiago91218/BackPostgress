import bcrypt from "bcrypt";

const SALT_ROUNDES: number = 10;

export const hashContrasenia = async (contrasenia: string): Promise<string> => {
  return await bcrypt.hash(contrasenia, SALT_ROUNDES);
};

export const compareContrasenias = async (
  contrasenia: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(contrasenia, hash);
};
