import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      loginType: "local" | "google";
      defaultLanguage: "jp" | "en";
      loginId: string;
      displayName: string;
      mail: string;
      role: "user" | "admin" | "maintainer";
    };
  }
  interface User {
    id: string;
    token: string;
    loginType: "local" | "google";
    defaultLanguage: "jp" | "en";
    loginId: string;
    displayName: string;
    mail: string;
    role: "user" | "admin" | "maintainer";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      token: string;
      loginType: "local" | "google";
      defaultLanguage: "jp" | "en";
      loginId: string;
      displayName: string;
      mail: string;
      role: "user" | "admin" | "maintainer";
    };
  }
}
