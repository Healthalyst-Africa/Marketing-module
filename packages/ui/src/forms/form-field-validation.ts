import type {
  FormFieldDefinition,
  FormFieldGroup,
} from "@healthalyst/ui/types/form-definition";

type FormControlElement =
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function isFormControlElement(element: unknown): element is FormControlElement {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  );
}

function describeFieldError(
  field: FormFieldDefinition,
  control: FormControlElement
): string {
  if (control.validity.valueMissing && field.requiredMessage) {
    return field.requiredMessage;
  }

  if (
    control.validity.typeMismatch &&
    field.kind !== "select" &&
    field.kind !== "textarea" &&
    field.formatMessage
  ) {
    return field.formatMessage;
  }

  return control.validationMessage;
}

/**
 * Checks each defined field against its control's constraints, such as
 * `required`, `type` and `maxLength`, and returns a message for every field
 * that fails, in the order the fields are defined. Forms that use it set
 * `noValidate`, so these messages appear beside each field instead of the
 * browser's own pop-ups. A select is checked through the hidden native select
 * that carries its value in the form.
 */
export function findFormFieldErrors(
  formElement: HTMLFormElement,
  fieldGroups: readonly FormFieldGroup[]
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  for (const fieldGroup of fieldGroups) {
    for (const field of fieldGroup.fields) {
      const control = formElement.elements.namedItem(field.name);

      if (isFormControlElement(control) && !control.validity.valid) {
        fieldErrors[field.name] = describeFieldError(field, control);
      }
    }
  }

  return fieldErrors;
}
