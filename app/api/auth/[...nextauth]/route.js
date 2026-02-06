import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // add user ID to session
      session.user.id = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// App Router expects GET and POST exports
export { handler as GET, handler as POST };
