import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, organizationName } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const organization = await prisma.organization.create({
      data: {
        name: organizationName,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        organizationId: organization.id,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        organizationId: organization.id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        organizationId: user.organizationId,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
});

export default router;