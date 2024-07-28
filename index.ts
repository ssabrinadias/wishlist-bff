import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient, User as PrismaUser } from '@prisma/client'

const prisma = new PrismaClient()
type UserWithWishList = PrismaUser & { wishList: boolean | null };


dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", async (request: Request, response: Response) => { 
    const allUsers = await prisma.user.findMany()
    response.status(200).send(allUsers);
}); 

app.get("/", async (request: Request, response: Response) => {
  const allUsers = await prisma.user.findMany()
  response.status(200).send(allUsers);
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  throw new Error(error.message);
});
