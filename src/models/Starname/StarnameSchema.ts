/**
 Good explanation of this model file
 https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
*/
import mongoose, { Document, DocumentQuery, Model, Schema } from "mongoose";

import { Domain } from "../Domain/DomainSchema";

const StarnameSchema: Schema = new Schema(
  {
    domain: { type: String, required: true },
    name: { type: String },
    owner: { type: String, required: true },
    broker: { type: String },
    metadata_uri: { type: String },
    valid_until: { type: Number },
  },
  { toJSON: { virtuals: true } },
);

StarnameSchema.virtual("domainRef", {
  ref: "Domain", // The model to use
  localField: "domain", // Find people where `localField`
  foreignField: "domain", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true,
});

export interface Starname {
  readonly domain: string;
  readonly name?: string;
  readonly owner: string;
  readonly broker?: string;
  readonly metadata_uri?: string;
  readonly domainRef?: Domain;
  readonly valid_until?: number;
}

export interface StarnameDocument extends Starname, Document {}

// Export this for strong typing
export interface StarnamePopulatedDocument extends StarnameDocument {
  domainRef: Domain;
}

StarnameSchema.statics.findAndPopulate = function (id?: string) {
  if (id) {
    return this.findById(id).populate("domainRef");
  } else {
    return this.find().populate("domainRef");
  }
};

// For model
export interface StarnameModel extends Model<StarnameDocument> {
  findAndPopulate(id?: string): DocumentQuery<StarnamePopulatedDocument[], StarnamePopulatedDocument>;
}

export default mongoose.model<StarnameDocument, StarnameModel>("Starname", StarnameSchema);
