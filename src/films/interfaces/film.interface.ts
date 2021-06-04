import { Document } from 'mongoose';

export interface Film extends Document {
  readonly name: string;
  readonly watched: boolean;
  readonly genre: string;
  readonly rate: number;
}
