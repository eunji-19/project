import { Document, Schema, model } from "mongoose";

/**
 * generateClientToken Response Type
 */
export interface ClientToken {
  succeed: boolean;
  token: string;
  appId: string;
  platform: string;
  tokenExpire: number;
}

/**
 * generateToken Response Type
 * {
	"errorCode": 1402,
	"error": "Token Expired error",
	"description": "토큰 기한이 만료되었습니다.",
	"succeed": false,
	"detail": "generateToken jwt expired"
}
 */
export interface TokenFromClientToken {
  succeed: boolean;
  token?: string;
  tokenExpire?: number;
  errorCode?: number;
  error?: string;
  description?: string;
  detail?: string;
}

export interface BrainToken {
  email: string;
  clientToken: string;
  clientToken_expires: number;
  generateToken: string;
  generateToken_expires: number;
  date?: Date;
}

// export const BrainTokenSchema = new Schema(
//   {
//     email: { type: String, required: true },
//     clientToken: { type: String, required: true },
//     clientToken_expires: { type: Number, required: true },
//     generateToken: { type: String, required: true },
//     generateToken_expires: { type: Number, required: true },
//     date: { type: Date, required: true, default: Date.now },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const BrainTokenModel = model<BrainToken & Document>(
//   "BrainToken",
//   BrainTokenSchema
// );
