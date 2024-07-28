import { Prisma, User as PrismaUser } from "@prisma/client";

declare module "@prisma/client" {
  interface User extends PrismaUser {
    fullName: string;
    getEmailDomain(): string;
    wishList?: boolean
  }
}