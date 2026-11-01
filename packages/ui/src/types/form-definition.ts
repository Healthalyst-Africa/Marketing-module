/** Properties shared by every field a form definition describes. */
interface FormFieldBase {
  /** Control name; also the key of the submitted value and of its error. */
  name: string;
  label: string;
  /** Guidance shown between the label and the control. */
  description?: string;
  /** Whether the visitor must supply a value before the form can be sent. */
  required?: boolean;
  /** Message shown when a required field is left empty. */
  requiredMessage?: string;
  /** Share a row with the neighbouring half-width field on wider screens. */
  width?: "half" | "full";
}

/** A single-line text control; `url` asks for a web address. */
export interface TextFormFieldDefinition extends FormFieldBase {
  kind: "text" | "email" | "tel" | "url";
  autoComplete?: string;
  /** Example value shown inside an empty control. Never a substitute for the label. */
  placeholder?: string;
  maxLength?: number;
  /** Message shown when the value is not in the expected format, such as an email address. */
  formatMessage?: string;
}

/** A multi-line text area. */
export interface TextareaFormFieldDefinition extends FormFieldBase {
  kind: "textarea";
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

/** A choice from a fixed list. Each option is both the submitted value and its label. */
export interface SelectFormFieldDefinition extends FormFieldBase {
  kind: "select";
  /** Text shown in the closed select until the visitor chooses. */
  placeholder: string;
  options: readonly string[];
}

export type FormFieldDefinition =
  | TextFormFieldDefinition
  | TextareaFormFieldDefinition
  | SelectFormFieldDefinition;

/** Related fields presented together, under a visible legend when one is given. */
export interface FormFieldGroup<
  FieldDefinition extends FormFieldDefinition = FormFieldDefinition,
> {
  legend?: string;
  fields: readonly FieldDefinition[];
}
