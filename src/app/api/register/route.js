import { User } from '@/app/models/User';
import mongoose from 'mongoose';

// export async function POST({ req }: any) {
//   const body = await req.json();
//   mongoose.connect(process.env.MONGO_URL as string);

//   const createdUser = await User.create(body);
//   return Response.json(createdUser);
// }

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);

  const createdUser = await User.create(body);

  const createdUser1 = Response.json(createdUser);

  return createdUser1;
}
