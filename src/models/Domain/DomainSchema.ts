/**
 Good explanation of this model file
 https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
*/

import mongoose, { Document, Model, Schema } from "mongoose";

export type DomainType = "open" | "closed";

const DomainSchema: Schema = new Schema({
  domain: { type: String, required: true, unique: true },
  /** Bech32 admin address */
  admin: { type: String, required: true },
  type: { type: String, required: true },
  /** Bech32 broker address */
  broker: String,
  /** Bech32 fee_payer address */
  fee_payer: String,
});

export interface Domain {
  readonly domain: string;
  readonly admin: string;
  readonly type: DomainType;
  readonly broker: string;
  readonly fee_payer: string;
}

export interface DomainDocument extends Domain, Document {}

export interface DomainModel extends Model<DomainDocument> {}

export default mongoose.model<DomainDocument, DomainModel>("Domain", DomainSchema);
