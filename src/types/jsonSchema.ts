export type FieldSchema = {
    type: "text" | "email" | "number";
    label: string;
};

export type ObjectSchema = {
    type: "object";
    label: string;
    properties: FormSchema;
}

export type FormSchema = {
    [fieldName: string]: SchemaField;
};

export type SchemaField = FieldSchema | ObjectSchema;


