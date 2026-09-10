import type { FormSchema } from "../types/jsonSchema";

type DynamicFormProps = {
  schema: FormSchema;
  formData: Record<string, unknown>;
  onChange: (fieldName: string, value: string) => void;
  parentPath?: string;
  errors?: Record<string, string>;
};

function getNestedValue(
  data: Record<string, any>,
  path: string,
) {
  const keys = path.split(".");

  let current: unknown = data;

  for (const key of keys) {
    if ( typeof current !== "object" || current === null) {
      return "";
    }

    current = (current as Record<string, unknown>)[key];
  }

  return typeof current === "string" ? current: "";
}

export default function DynamicForm({
  schema,
  formData,
  onChange,
  parentPath = "",
  errors = {},
}: DynamicFormProps) {
  return (
    <form>
      {Object.entries(schema).map(([fieldName, field]) => {
        const currentPath = parentPath
          ? `${parentPath}.${fieldName}`
          : fieldName;

        if (field.type === "object") {
          return (
            <fieldset key={fieldName}>
              <legend>{field.label}</legend>

              <DynamicForm
                schema={field.properties}
                formData={formData}
                onChange={onChange}
                parentPath={currentPath}
                errors={errors}
              />
            </fieldset>
          );
        }

        return (
          <div key={fieldName}>
            <label htmlFor={currentPath}>
              {field.label}
            </label>

            <input
              id={currentPath}
              name={currentPath}
              type={field.type}
              value={getNestedValue(
                formData,
                currentPath,
              )}
              onChange={(event) =>
                onChange(
                  currentPath,
                  event.target.value,
                )
              }
            />

            {errors[currentPath] && (
              <p className="error" >
                {errors[currentPath]}
              </p>
            )}
          </div>
        );
      })}
    </form>
  );
}