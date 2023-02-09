import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, dropDups: true, required: true },
  name: { type: String, required: true },
  pincode: { type: Number, required: true },
});

export interface User extends mongoose.Document {
  _id: string;
  email: string;
  name: string;
  pincode: number;
}
