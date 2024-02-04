import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/utils/db';
import User from '@/models/user';
import bcryptjs from 'bcryptjs';

export const authOptions = {
  secret: `${process.env.NEXTAUTH_SECRET}`,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) {
        token._id = user._id;
        token.fullName = user.fullName;
      }
      if (user?.superUser) token.superUser = user.superUser;
      //   console.log('from jwt',token)
      return token;
    },
    async session({ session, token }) {
      if (token?._id) {
        session.user._id = token._id;
        session.user.fullName = token.fullName;
      }
      if (token?.superUser) session.user.superUser = token.superUser;

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();

        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        const comparePassword = await bcryptjs.compare(
          credentials.password,
          user.password
        );

        if (!comparePassword) {
          throw new Error('Invalid email or password');
        }

        if (user && comparePassword) {
          return {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            image: 'f',
            superUser: user.superUser,
          };
        }

        // throw new Error('Invalid email or password');
        // return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
