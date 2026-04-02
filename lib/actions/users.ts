"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Create a new user
 */
export async function createUser(data: {
  name: string;
  last_name: string;
  email: string;
  password: string;
  rol?: string;
}) {
  try {
    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        password: hashedPassword,
        rol: data.rol || "USUARIO",
      },
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true,
        rol: true,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Usuario creado correctamente",
      user,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al crear usuario",
    };
  }
}

/**
 * Update an existing user
 */
export async function updateUser(
  id: string,
  data: {
    name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    rol?: string;
    isActive?: boolean;
  },
) {
  try {
    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.last_name !== undefined) updateData.last_name = data.last_name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.rol !== undefined) updateData.rol = data.rol;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.password !== undefined) {
      updateData.password = await hashPassword(data.password);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Usuario actualizado correctamente",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al actualizar usuario",
    };
  }
}

/**
 * Delete a user
 */
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Usuario eliminado correctamente",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al eliminar usuario",
    };
  }
}

/**
 * Get a user by ID
 */
export async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true,
        rol: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Usuario no encontrado",
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Error getting user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al obtener usuario",
    };
  }
}

/**
 * List all users
 */
export async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true,
        rol: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      users,
    };
  } catch (error) {
    console.error("Error listing users:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al listar usuarios",
    };
  }
}

/**
 * Authenticate a user by email and password
 */
export async function authenticateUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true,
        rol: true,
        password: true,
        isActive: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Credenciales incorrectas",
      };
    }

    if (!user.isActive) {
      return {
        success: false,
        message: "Usuario inactivo",
      };
    }

    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
      return {
        success: false,
        message: "Credenciales incorrectas",
      };
    }

    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Error authenticating user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error al autenticar usuario",
    };
  }
}
