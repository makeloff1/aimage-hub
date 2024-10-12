import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "PasswordAuthentication",
      credentials: {
        loginId: { label: "LoginId", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        // ここをDBにてユーザ照会
        const user = await mockGetUserFromCredentials(credentials);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

// ひとまず mock response
const mockGetUserFromCredentials = async (
  credentials: Record<"loginId" | "password", string>
) => {
  return {
    id: "xxx",
    token: "tokenA",
    loginType: "local" as "local" | "google",
    defaultLanguage: "jp" as "jp" | "en",
    loginId: "hogefuga1",
    displayName: "hogehoge",
    mail: "hoge@example.com",
    role: "user" as "user" | "admin" | "maintainer",
  };
};

export { handler as GET, handler as POST };
