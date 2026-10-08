"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { Alert, AlertDescription } from "@healthalyst/ui/components/alert";
import { Button } from "@healthalyst/ui/components/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@healthalyst/ui/components/field";
import { Input } from "@healthalyst/ui/components/input";
import { NativeSelect } from "@healthalyst/ui/components/native-select";
import { Textarea } from "@healthalyst/ui/components/textarea";
import {
  MarketingContainer,
  MarketingIntroduction,
  MarketingSection,
  type MarketingSectionContent,
} from "@healthalyst/ui/components/marketing-section";
import {
  MARKETING_ENQUIRY_WEBSITE_FIELD_NAME,
  type MarketingEnquirySubmissionStatus,
  type MarketingEnquirySubmissionResponse,
} from "@healthalyst/ui/lib/marketing-enquiry";

interface EnquiryField {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  options?: readonly string[];
  multiline?: boolean;
  /** Whether the visitor must supply a value before the enquiry can be sent. */
  required?: boolean;
  /** Longest accepted value, applied to the control and reported by the endpoint. */
  maxLength?: number;
}

interface MarketingEnquiryFormProperties {
  heading: string;
  fields: readonly EnquiryField[];
  /** Application endpoint that validates and stores the enquiry. */
  endpoint: string;
  submitLabel: string;
  submittingLabel: string;
  helperText: string;
  successMessage: string;
  /** Fallback shown when the endpoint cannot be reached or reports no reason. */
  failureMessage: string;
}

/** Presentational state of the submit control between clicks. */
type SubmissionState = "idle" | "submitting";

/** Message announced to the visitor after a submission attempt. */
interface EnquiryFeedback {
  outcome: "success" | "failure";
  message: string;
}

const SUBMISSION_STATUSES: readonly string[] = [
  "saved",
  "alreadyReceived",
  "invalid",
  "throttled",
  "unavailable",
  "malformedRequest",
];

function isStringRecord(value: unknown): value is Record<string, string> {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return Object.values(value).every((entry) => typeof entry === "string");
}

/**
 * Reads the endpoint body defensively. An unexpected shape is reported as an
 * unsent enquiry rather than rendered as if it had been accepted.
 */
function readSubmissionResponse(
  body: unknown
): MarketingEnquirySubmissionResponse | null {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const candidate = body as Record<string, unknown>;

  if (
    typeof candidate.status !== "string" ||
    !SUBMISSION_STATUSES.includes(candidate.status)
  ) {
    return null;
  }

  return {
    status: candidate.status as MarketingEnquirySubmissionStatus,
    message:
      typeof candidate.message === "string" ? candidate.message : undefined,
    fieldErrors: isStringRecord(candidate.fieldErrors)
      ? candidate.fieldErrors
      : undefined,
  };
}

async function sendEnquirySubmission(
  endpoint: string,
  fieldValues: Record<string, string>
): Promise<MarketingEnquirySubmissionResponse | null> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fieldValues),
  });

  try {
    return readSubmissionResponse(await response.json());
  } catch {
    return null;
  }
}

export function MarketingEnquiryForm({
  heading,
  fields,
  endpoint,
  submitLabel,
  submittingLabel,
  helperText,
  successMessage,
  failureMessage,
}: MarketingEnquiryFormProperties) {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<EnquiryFeedback | null>(null);
  const formReference = useRef<HTMLFormElement>(null);
  const feedbackReference = useRef<HTMLDivElement>(null);

  const isSubmitting = submissionState === "submitting";

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const rejectedFieldNames = Object.keys(fieldErrors);

    if (rejectedFieldNames.length > 0) {
      // Submitting disables the fieldset, which drops focus to the document
      // body. Return it to the first rejected field so keyboard and screen
      // reader users land next to the message that explains the failure.
      const firstRejectedFieldName = rejectedFieldNames[0];
      const rejectedField = formReference.current?.elements.namedItem(
        firstRejectedFieldName
      );

      if (rejectedField instanceof HTMLElement) {
        rejectedField.focus();
      }

      return;
    }

    feedbackReference.current?.focus();
  }, [feedback, fieldErrors]);

  function applySubmissionResponse(
    submissionResponse: MarketingEnquirySubmissionResponse,
    formElement: HTMLFormElement
  ) {
    switch (submissionResponse.status) {
      case "saved":
        setFieldErrors({});
        setFeedback({
          outcome: "success",
          message: submissionResponse.message ?? successMessage,
        });
        formElement.reset();
        return;
      case "alreadyReceived":
        setFieldErrors({});
        setFeedback({ outcome: "success", message: successMessage });
        formElement.reset();
        return;
      case "invalid":
        setFieldErrors(submissionResponse.fieldErrors ?? {});
        setFeedback({
          outcome: "failure",
          message: submissionResponse.message ?? failureMessage,
        });
        return;
      case "throttled":
      case "unavailable":
      case "malformedRequest":
        setFeedback({
          outcome: "failure",
          message: submissionResponse.message ?? failureMessage,
        });
    }
  }

  async function handleSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formElement = event.currentTarget;
    const fieldValues: Record<string, string> = {};

    for (const [fieldName, submittedValue] of new FormData(
      formElement
    ).entries()) {
      if (typeof submittedValue === "string") {
        fieldValues[fieldName] = submittedValue;
      }
    }

    setFieldErrors({});
    setFeedback(null);
    setSubmissionState("submitting");

    try {
      const submissionResponse = await sendEnquirySubmission(
        endpoint,
        fieldValues
      );

      if (!submissionResponse) {
        setFeedback({ outcome: "failure", message: failureMessage });
        return;
      }

      applySubmissionResponse(submissionResponse, formElement);
    } catch {
      setFeedback({ outcome: "failure", message: failureMessage });
    } finally {
      setSubmissionState("idle");
    }
  }

  return (
    <div className="rounded-sm border bg-card p-8 md:p-12">
      <h3 className="mb-7 text-xs font-medium tracking-[0.28em] text-muted-foreground">
        {heading}
      </h3>
      <form
        ref={formReference}
        action={endpoint}
        method="post"
        onSubmit={handleSubmission}
        aria-busy={isSubmitting}
      >
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={`enquiry-${MARKETING_ENQUIRY_WEBSITE_FIELD_NAME}`}>
            Website
          </label>
          <input
            id={`enquiry-${MARKETING_ENQUIRY_WEBSITE_FIELD_NAME}`}
            name={MARKETING_ENQUIRY_WEBSITE_FIELD_NAME}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>
        {feedback && (
          <Alert
            ref={feedbackReference}
            tabIndex={-1}
            role={feedback.outcome === "success" ? "status" : "alert"}
            variant={feedback.outcome === "success" ? "default" : "destructive"}
            className="mb-7"
          >
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        )}
        <fieldset
          disabled={isSubmitting}
          aria-describedby="enquiry-helper-text"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <legend className="sr-only">{heading}</legend>
          {fields.map((field, fieldIndex) => {
            const controlIdentifier = `enquiry-${field.name}`;
            const errorIdentifier = `${controlIdentifier}-error`;
            const errorMessage = fieldErrors[field.name];

            return (
              <Field
                key={field.name}
                className={fieldIndex < 2 ? "md:col-span-1" : "md:col-span-2"}
              >
                <FieldLabel htmlFor={controlIdentifier} className="sr-only">
                  {field.label}
                </FieldLabel>
                {field.options ? (
                  <NativeSelect
                    id={controlIdentifier}
                    name={field.name}
                    defaultValue=""
                    required={field.required}
                    aria-invalid={errorMessage ? true : undefined}
                    aria-describedby={
                      errorMessage ? errorIdentifier : undefined
                    }
                    className="h-12"
                  >
                    <option value="" disabled>
                      {field.placeholder}
                    </option>
                    {field.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </NativeSelect>
                ) : field.multiline ? (
                  <Textarea
                    id={controlIdentifier}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    maxLength={field.maxLength}
                    aria-invalid={errorMessage ? true : undefined}
                    aria-describedby={
                      errorMessage ? errorIdentifier : undefined
                    }
                    rows={4}
                    className="min-h-32 aria-invalid:border-destructive"
                  />
                ) : (
                  <Input
                    id={controlIdentifier}
                    name={field.name}
                    type={field.type ?? "text"}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    required={field.required}
                    maxLength={field.maxLength}
                    aria-invalid={errorMessage ? true : undefined}
                    aria-describedby={
                      errorMessage ? errorIdentifier : undefined
                    }
                    className="h-12 aria-invalid:border-destructive"
                  />
                )}
                {errorMessage && (
                  <FieldError id={errorIdentifier}>{errorMessage}</FieldError>
                )}
              </Field>
            );
          })}
          <Button
            disabled={isSubmitting}
            type="submit"
            size="large"
            className="min-h-12 w-full md:col-span-2"
          >
            {isSubmitting ? submittingLabel : submitLabel}
          </Button>
          <p
            id="enquiry-helper-text"
            className="text-center text-sm leading-relaxed text-muted-foreground md:col-span-2"
          >
            {helperText}
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export function MarketingContact({
  content,
  institutions,
  form,
}: {
  content: MarketingSectionContent;
  institutions: readonly {
    name: string;
    product: string;
    description: string;
  }[];
  form: ReactNode;
}) {
  return (
    <MarketingSection id="contact" className="bg-secondary">
      <MarketingContainer className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <MarketingIntroduction content={content} className="lg:grid-cols-1" />
          <dl className="mt-10 divide-y divide-border border-t">
            {institutions.map((institution) => (
              <div key={institution.name} className="py-4">
                <dt className="mb-1 text-sm font-semibold text-primary">
                  {institution.name}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {institution.product}: {institution.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {form}
      </MarketingContainer>
    </MarketingSection>
  );
}
