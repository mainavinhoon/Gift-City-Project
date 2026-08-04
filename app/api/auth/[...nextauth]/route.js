import User from "@/models/user";
import Profile from "@/models/profile";
import Event from "@/models/event";
import Post from "@/models/post";

import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { MongodbConnection } from "../../../../lib/mongodb";
export const authOptions = {
  providers: [
    // CredentialsProvider({
    //     // ** The name to display on the sign in form (e.g. 'Sign in with...')
    //     name: 'Credentials',
    //     type: 'credentials',

    //     /*
    //      * As we are using our own Sign-in page, we do not need to change
    //      * username or password attributes manually in following credentials object.
    //      */
    //     credentials: {},

    //   async authorize(credentials) {
    //     const { email, password } = credentials;

    //    try {
    //       await MongodbConnection();
    //       const user = await User.findOne({ email });

    //       if (!user) {
    //         return null;
    //       }

    //       const passwordsMatch = await bcrypt.compare(password, user.password);

    //       if (!passwordsMatch) {
    //         return null;
    //       }

    //       return user;
    //     } catch (error) {
    //       console.log("Error: ", error);
    //     }
    //   },
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // async authorize(credentials) {
      //   console.log("We are here just");
      //   if (!credentials?.email || !credentials?.password) {
      //     throw new Error("Invalid Credentials");
      //   }
      //   await MongodbConnection();

      //   const user = await User.find({
      //     email: credentials.email,
      //   })

      //   if (!user || !user[0]?.password) {
      //     throw new Error("Invalid Credentials");
      //   }
      //   const isCorrectPassword = await bcrypt.compare(
      //     credentials.password,
      //     user[0].password
      //   );
      //   if (!isCorrectPassword) {
      //     console.log()
      //     throw new Error("Invalid Credentials");
      //   }

      //   console.log('user is a :',user)

      //   return user;
      // },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid Credentials");
          }

          await MongodbConnection();

          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );


          if (!user) {
            // Auto-provision guest user if they don't exist yet
            if (credentials.email === "guest@giftcity.com" && credentials.password === "guest123") {
              const hashedPassword = await bcrypt.hash("guest123", 10);
              const newGuest = await User.create({
                username: "Guest Explorer",
                email: "guest@giftcity.com",
                password: hashedPassword,
              });
              
              // Ensure profile exists for guest too
              await Profile.create({
                name: "Guest Explorer",
                email: "guest@giftcity.com",
                location: "GIFT City, Gujarat",
                occupation: "Demo User",
                bio: "I am exploring the GIFT City portal. I can create events, post on the community wall, and interact with the platform!",
                dp: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80"
              });

              // Add a static event
              await Event.create({
                title: 'Global FinTech Summit 2026',
                location: 'GIFT City Club & Resort',
                date: '2026-10-15',
                price: 'Free for Members',
                description: 'The annual global summit bringing together innovators, bankers, and tech leaders to discuss the future of digital finance.',
                category: 'Conference',
                image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
              });

              // Add a static community post
              await Post.create({
                description: 'Just arrived at GIFT City! The infrastructure here is amazing. Can\'t wait to see how the IFSC evolves over the next few years. Does anyone have recommendations for a good coffee place near Tower 1?',
                username: 'guest@giftcity.com',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
                likes: 14,
                comments: 3
              });
              
              return newGuest;
            }

            throw new Error("User not found");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error("Incorrect password");
          }

          // console.log("User found:", user);

          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null on error
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",

    // ** 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
