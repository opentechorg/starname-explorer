import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv({ coerceTypes: true });

const ColumnValues = ["domain", "admin"] as const;
type Columns = typeof ColumnValues[number];

type SortOrder = 1 | -1;

export interface DoaminTablePageReq {
  sortColumn: Columns;
  sortOrder: SortOrder;
  page: number;
  limit: number;
  query: string;
}

// optional schema type annotation for schema to match MyData type
const schema: JSONSchemaType<DoaminTablePageReq> = {
  type: "object",
  properties: {
    page: { type: "number", minimum: 1, default: 1 },
    limit: { type: "number", minimum: 10, maximum: 100, default: 25 },
    sortColumn: { type: "string", enum: [...ColumnValues], default: "domain" },
    sortOrder: { type: "number", enum: [-1, 1], default: 1 },
    query: { type: "string", maxLength: 44 },
  },
  required: [],
  additionalProperties: false,
};

export default ajv.compile(schema);
