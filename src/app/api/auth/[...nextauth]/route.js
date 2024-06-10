import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch('your/endpoint', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        // const email = credentials?.email;
        // const password = credentials?.password;

        // mongoose.connect(process.env.MONGO_URL);
        // const user = await User.findOne({ email });
        // const passwordOk = user && bcrypt.compareSync(password, user.password);

        // if (passwordOk) {
        //   return user;
        // }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
