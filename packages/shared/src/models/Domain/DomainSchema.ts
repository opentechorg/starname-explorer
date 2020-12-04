/**
 Good explanation of this model file
 https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
*/

import mongoose, { Document, FilterQuery, Model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import { Starname } from "../Starname/StarnameSchema";

export type DomainType = "open" | "closed";

const DomainSchema: Schema = new Schema(
  {
    domain: { type: String, required: true, unique: true },
    /** Bech32 admin address */
    admin: { type: String, required: true },
    type: { type: String, required: true },
    /** Bech32 broker address */
    broker: { type: String },
    /** Bech32 fee_payer address */
    fee_payer: { type: String },
    valid_until: { type: Number },
  },
  { toJSON: { virtuals: true }, timestamps: true },
);

DomainSchema.plugin(mongoosePaginate);

DomainSchema.virtual("starnames", {
  ref: "Starname",
  localField: "domain",
  foreignField: "domain",
});

export interface Domain {
  readonly _id: string;
  readonly domain: string;
  readonly admin: string;
  readonly type: DomainType;
  readonly broker: string;
  readonly fee_payer: string;
  readonly starnames?: Starname[];
  readonly valid_until?: number;
}

export interface DomainDocument extends Omit<Domain, "_id">, Document {}

export interface DomainPopulatedDocument extends DomainDocument {
  starnames: Starname[];
}

// Static methods
DomainSchema.statics.findWithPages = function (
  query?: FilterQuery<DomainDocument>,
  options?: mongoose.PaginateOptions,
) {
  return this.paginate(query, options);
};

export interface DomainModel extends Model<DomainDocument> {
  findWithPages(
    query?: FilterQuery<DomainDocument>,
    options?: mongoose.PaginateOptions,
  ): Promise<mongoose.PaginateResult<Domain>>;
}

export const DomainSchemaModel = mongoose.model<DomainDocument, DomainModel>("Domain", DomainSchema);
