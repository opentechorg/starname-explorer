import Ajv, {JSONSchemaType} from "ajv"

const ajv = new Ajv()

type Columns = "domain" | "owner";
type SortOrder = 1 | -1;

export interface DoaminTablePageReq {
  readonly sorting: { column: Columns; order: SortOrder };
  readonly page: number;
  readonly limit: number;
}

// optional schema type annotation for schema to match MyData type
const schema: JSONSchemaType<DoaminTablePageReq> = {
  type: "object",
  properties: {
    page: {type: "number", minimum: 1, default: 1},
    limit: {type: "number", minimum: 10, maximum: Number(process.env.MAX_RESULTS_PER_PAGE), default: 25},
    sorting: {
      type: "object",
      properties: {
        column: {type: "string", enum: ["domain", "owner"]},
        order: {type: "number", minimum: -1, maximum: 1}
      },
      required: ["column", "order"],
      additionalProperties: false,
    }
  },
  required: ["sorting"],
  additionalProperties: false,
}

export default ajv.compile(schema);