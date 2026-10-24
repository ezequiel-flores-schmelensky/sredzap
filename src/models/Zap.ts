import { Schema, model, Document } from 'mongoose';

export interface IZap extends Document {
  userId: string;
  name: string;
  isActive: boolean;
  trigger: {
    app: string; // Ej. 'github'
    event: string; // Ej. 'pull_request_opened'
    repoName: string;
  };
  action: {
    app: string; // Ej. 'github'
    type: string; // Ej. 'create_comment'
    message: string;
  };
}

const zapSchema = new Schema<IZap>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  trigger: { type: Object, required: true },
  action: { type: Object, required: true }
});

export const Zap = model<IZap>('Zap', zapSchema);