import { model, Schema, Document } from 'mongoose';

export interface IDappHackData {
  latestBlockNumber: number;
}

const DappHackSchema = new Schema<IDappHackData>({
  _id: {
    type: String,
  },
  latestBlockNumber: {
    type: Number,
  }
});

export const DappHackModel = model<IDappHackData>('DappHackDB', DappHackSchema);