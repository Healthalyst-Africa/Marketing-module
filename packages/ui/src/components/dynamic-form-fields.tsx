"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@healthalyst/ui/components/field";
import { Input } from "@healthalyst/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@healthalyst/ui/components/select";
import { Textarea } from "@healthalyst/ui/components/textarea";
import type {
  FormFieldDefinition,
  FormFieldGroup,
} from "@healthalyst/ui/lib/form-definition";
import { cn } from "@healthalyst/ui/lib/utilities";

/** Identifier of a field's visible control, used by its label, messages and focus. */
export function createFormFieldIdentifier(
  identifierPrefix: string,
  fieldName: string
): string {
  return `${identifierPrefix}-${fieldName}`;
}

interface DynamicFormFieldsProperties {
  /** Prefix for control identifiers; unique on the page. */
  identifierPrefix: string;
  fieldGroups: readonly FormFieldGroup[];
  /** Values to place in fields before the visitor starts, keyed by field name. */
  defaultValues?: Readonly<Record<string, string>>;
  /** Messages shown beside rejected fields, keyed by field name. */
  fieldErrors?: Readonly<Record<string, string>>;
  disabled?: boolean;
  /** Text shown beside the label of a field that may be left empty. */
  optionalFieldLabel?: string;
  /** Colour of the group legends. */
  legendTone?: "default" | "accent";
  /** Called when the visitor changes a field, for example to clear its message. */
  onFieldChange?: (fieldName: string) => void;
}

function DynamicFormField({
  field,
  controlIdentifier,
  defaultValue,
  errorMessage,
  disabled,
  optionalFieldLabel,
  onFieldChange,
}: {
  field: FormFieldDefinition;
  controlIdentifier: string;
  defaultValue?: string;
  errorMessage?: string;
  disabled: boolean;
  optionalFieldLabel: string;
  onFieldChange?: (fieldName: string) => void;
}) {
  const descriptionIdentifier = `${controlIdentifier}-description`;
  const errorIdentifier = `${controlIdentifier}-error`;
  const describedBy =
    [
      field.description ? descriptionIdentifier : null,
      errorMessage ? errorIdentifier : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;
  const isInvalid = errorMessage ? true : undefined;

  function reportChange() {
    onFieldChange?.(field.name);
  }

  return (
    <Field
      data-invalid={isInvalid}
      className={cn(
        "gap-2",
        field.width === "half" ? "sm:col-span-1" : "sm:col-span-2"
      )}
    >
      <FieldLabel htmlFor={controlIdentifier}>
        {field.label}
        {!field.required && " "}
        {!field.required && (
          <span className="font-normal text-muted-foreground">
            {optionalFieldLabel}
          </span>
        )}
      </FieldLabel>
      {field.description && (
        <FieldDescription id={descriptionIdentifier}>
          {field.description}
        </FieldDescription>
      )}
      {field.kind === "select" ? (
        <Select
          name={field.name}
          required={field.required}
          disabled={disabled}
          defaultValue={defaultValue || undefined}
          onValueChange={reportChange}
        >
          <SelectTrigger
            id={controlIdentifier}
            aria-required={field.required || undefined}
            aria-invalid={isInvalid}
            aria-describedby={describedBy}
            controlSize="large"
          >
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : field.kind === "textarea" ? (
        <Textarea
          id={controlIdentifier}
          name={field.name}
          defaultValue={defaultValue}
          placeholder={field.placeholder}
          required={field.required}
          maxLength={field.maxLength}
          aria-invalid={isInvalid}
          aria-describedby={describedBy}
          rows={field.rows ?? 5}
          onChange={reportChange}
        />
      ) : (
        <Input
          id={controlIdentifier}
          name={field.name}
          type={field.kind}
          autoComplete={field.autoComplete}
          defaultValue={defaultValue}
          placeholder={field.placeholder}
          required={field.required}
          maxLength={field.maxLength}
          aria-invalid={isInvalid}
          aria-describedby={describedBy}
          controlSize="large"
          onChange={reportChange}
        />
      )}
      {errorMessage && (
        <FieldError id={errorIdentifier}>{errorMessage}</FieldError>
      )}
    </Field>
  );
}

/**
 * Renders form fields from a definition: one fieldset per group, with a
 * visible legend when the group has one, and for each field a persistent label, optional guidance, the
 * matching shared control and its error message. The surrounding form owns
 * submission, validation and focus.
 */
export function DynamicFormFields({
  identifierPrefix,
  fieldGroups,
  defaultValues = {},
  fieldErrors = {},
  disabled = false,
  optionalFieldLabel = "Optional",
  legendTone = "default",
  onFieldChange,
}: DynamicFormFieldsProperties) {
  return (
    <>
      {fieldGroups.map((fieldGroup) => (
        <FieldSet
          key={
            fieldGroup.legend ??
            fieldGroup.fields.map((field) => field.name).join(" ")
          }
          disabled={disabled}
          className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2"
        >
          {fieldGroup.legend && (
            <FieldLegend
              tone={legendTone}
              className="float-left mb-1 w-full sm:col-span-2"
            >
              {fieldGroup.legend}
            </FieldLegend>
          )}
          {fieldGroup.fields.map((field) => (
            <DynamicFormField
              key={field.name}
              field={field}
              controlIdentifier={createFormFieldIdentifier(
                identifierPrefix,
                field.name
              )}
              defaultValue={defaultValues[field.name]}
              errorMessage={fieldErrors[field.name]}
              disabled={disabled}
              optionalFieldLabel={optionalFieldLabel}
              onFieldChange={onFieldChange}
            />
          ))}
        </FieldSet>
      ))}
    </>
  );
}
