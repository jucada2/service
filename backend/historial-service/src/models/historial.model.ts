import { Document, Schema, model } from "mongoose";

export interface IHistorial extends Document {
  user_id: string;
  videos: {
    video_id: string;
    watched_at: Date;
  }[];
}

const HistorialSchema = new Schema<IHistorial>({
  user_id: { type: String, required: true },
  videos: [
    {
      video_id: { type: String, required: true },
      watched_at: { type: Date, required: true },
    },
  ],
});

export const Historial = model<IHistorial>("Historial", HistorialSchema);
