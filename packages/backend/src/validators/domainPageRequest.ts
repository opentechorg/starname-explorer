import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

type Columns = "domain" | "owner";
type SortOrder = 1 | -1;

export interface DoaminTablePageReq {
  sortColumn: Columns;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

// optional schema type annotation for schema to match MyData type
const schema: JSONSchemaType<DoaminTablePageReq> = {
  type: "object",
  properties: {
    page: { type: "number", minimum: 1, default: 1 },
    limit: { type: "number", minimum: 10, maximum: 100, default: 25 },
    sortColumn: { type: "string", enum: ["domain", "owner"] },
    sortOrder: { type: "number", enum: [-1, 1] },
  },
  required: [],
  additionalProperties: false,
};

export default ajv.compile(schema);
