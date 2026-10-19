"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { SuccessIcon } from "@healthalyst/icons";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import { Alert, AlertDescription } from "@healthalyst/ui/components/alert";
import { Card } from "@healthalyst/ui/components/card";
import {
  createFormFieldIdentifier,
  DynamicFormFields,
} from "@healthalyst/ui/components/dynamic-form-fields";
import type { FormFieldGroup } from "@healthalyst/ui/lib/form-definition";
import { findFormFieldErrors } from "@healthalyst/ui/lib/form-field-validation";
import {
  MARKETING_ENQUIRY_WEBSITE_FIELD_NAME,
  type MarketingEnquirySubmissionStatus,
  type MarketingEnquirySubmissionResponse,
} from "@healthalyst/ui/lib/marketing-enquiry";

interface MarketingEnquiryFormProperties {
  /** Identifier of the panel, so links can scroll straight to the form. */
  identifier?: string;
  /** Visible heading of the form panel. */
  heading: string;
  /** Short line under the heading. */
  description?: string;
  fieldGroups: readonly FormFieldGroup[];
  /** Values to place in fields before the visitor starts, keyed by field name. */
  defaultValues?: Readonly<Record<string, string>>;
  /** Application endpoint that validates and stores the enquiry. */
  endpoint: string;
  submitLabel: string;
  submittingLabel: string;
  helperText: string;
  /** Heading of the confirmation that replaces the form once it is sent. */
  successHeading: string;
  successMessage: string;
  /** Label of the action that shows an empty form again after sending. */
  resetLabel: string;
  /** Fallback shown when the endpoint cannot be reached or reports no reason. */
  failureMessage: string;
  /** Text shown beside the label of a field that may be left empty. */
  optionalFieldLabel?: string;
}

/** Presentational state of the submit control between clicks. */
type SubmissionState = "idle" | "submitting";

/** Message announced to the visitor after a failed submission attempt. */
interface EnquiryFailure {
  message: string;
}

/** Where focus goes once the form shows why an enquiry was not sent. */
type FocusTarget = { kind: "field"; fieldName: string } | { kind: "failure" };

/** Prefix of the field control identifiers inside the form. */
const FIELD_IDENTIFIER_PREFIX = "enquiry";

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

/**
 * Layout of the card that holds the form: generous padding, room for the
 * sticky header when a link scrolls to it, and the raised shadow used where
 * the card overlaps a brand-coloured page header.
 */
const PANEL_LAYOUT_CLASS_NAME =
  "scroll-mt-28 p-6 shadow-[0_1px_2px_rgba(15,23,20,0.04),0_12px_32px_rgba(15,23,20,0.08)] sm:p-10";

export function MarketingEnquiryForm({
  identifier,
  heading,
  description,
  fieldGroups,
  defaultValues = {},
  endpoint,
  submitLabel,
  submittingLabel,
  helperText,
  successHeading,
  successMessage,
  resetLabel,
  failureMessage,
  optionalFieldLabel = "Optional",
}: MarketingEnquiryFormProperties) {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState<EnquiryFailure | null>(null);
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const failureReference = useRef<HTMLDivElement>(null);
  const confirmationReference = useRef<HTMLHeadingElement>(null);
  const pendingFocusReference = useRef<FocusTarget | null>(null);
  const isSubmitting = submissionState === "submitting";

  useEffect(() => {
    if (sentMessage) {
      confirmationReference.current?.focus();
    }
  }, [sentMessage]);

  // Runs after every render, and acts only when a submission asked for focus.
  // Submitting disables the fieldsets, which drops focus to the document body,
  // so focus returns to the first rejected field, or to the failure notice, and
  // keyboard and screen reader users land next to the explanation.
  useEffect(() => {
    const focusTarget = pendingFocusReference.current;

    if (!focusTarget) {
      return;
    }

    pendingFocusReference.current = null;

    const rejectedControl =
      focusTarget.kind === "field"
        ? document.getElementById(
            createFormFieldIdentifier(
              FIELD_IDENTIFIER_PREFIX,
              focusTarget.fieldName
            )
          )
        : null;

    if (rejectedControl) {
      rejectedControl.focus();
      return;
    }

    failureReference.current?.focus();
  });

  function showFieldErrors(rejectedFields: Record<string, string>) {
    const [firstRejectedFieldName] = Object.keys(rejectedFields);

    pendingFocusReference.current = firstRejectedFieldName
      ? { kind: "field", fieldName: firstRejectedFieldName }
      : { kind: "failure" };
    setFieldErrors(rejectedFields);
  }

  function showFailure(message: string) {
    pendingFocusReference.current = { kind: "failure" };
    setFailure({ message });
  }

  function clearFieldError(fieldName: string) {
    setFieldErrors((currentErrors) =>
      fieldName in currentErrors
        ? Object.fromEntries(
            Object.entries(currentErrors).filter(
              ([rejectedFieldName]) => rejectedFieldName !== fieldName
            )
          )
        : currentErrors
    );
  }

  function applySubmissionResponse(
    submissionResponse: MarketingEnquirySubmissionResponse
  ) {
    switch (submissionResponse.status) {
      case "saved":
        setFieldErrors({});
        setSentMessage(submissionResponse.message ?? successMessage);
        return;
      case "alreadyReceived":
        setFieldErrors({});
        setSentMessage(successMessage);
        return;
      case "invalid":
        setFailure({ message: submissionResponse.message ?? failureMessage });
        showFieldErrors(submissionResponse.fieldErrors ?? {});
        return;
      case "throttled":
      case "unavailable":
      case "malformedRequest":
        showFailure(submissionResponse.message ?? failureMessage);
    }
  }

  async function handleSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const rejectedFields = findFormFieldErrors(
      event.currentTarget,
      fieldGroups
    );

    if (Object.keys(rejectedFields).length > 0) {
      setFailure(null);
      showFieldErrors(rejectedFields);
      return;
    }

    const fieldValues: Record<string, string> = {};

    for (const [fieldName, submittedValue] of new FormData(
      event.currentTarget
    ).entries()) {
      if (typeof submittedValue === "string") {
        fieldValues[fieldName] = submittedValue;
      }
    }

    setFieldErrors({});
    setFailure(null);
    setSubmissionState("submitting");

    try {
      const submissionResponse = await sendEnquirySubmission(
        endpoint,
        fieldValues
      );

      if (!submissionResponse) {
        showFailure(failureMessage);
        return;
      }

      applySubmissionResponse(submissionResponse);
    } catch {
      showFailure(failureMessage);
    } finally {
      setSubmissionState("idle");
    }
  }

  if (sentMessage) {
    return (
      <Card id={identifier} className={PANEL_LAYOUT_CLASS_NAME}>
        <div role="status" className="flex flex-col items-start gap-5 py-6">
          <SuccessIcon
            aria-hidden="true"
            className="size-10 text-accent"
            strokeWidth={1.5}
          />
          <h2
            ref={confirmationReference}
            tabIndex={-1}
            className="text-2xl font-semibold tracking-[-0.02em] text-foreground focus:outline-none"
          >
            {successHeading}
          </h2>
          <p className="max-w-[48ch] text-base leading-relaxed text-muted-foreground">
            {sentMessage}
          </p>
          <ActionButton
            type="button"
            variant="outline"
            size="large"
            shape="pill"
            onClick={() => setSentMessage(null)}
          >
            {resetLabel}
          </ActionButton>
        </div>
      </Card>
    );
  }

  return (
    <Card id={identifier} className={PANEL_LAYOUT_CLASS_NAME}>
      <h2
        id="enquiry-form-heading"
        className="text-2xl font-semibold tracking-[-0.02em] text-foreground md:text-[28px]"
      >
        {heading}
      </h2>
      {description && (
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      <form
        action={endpoint}
        method="post"
        noValidate
        onSubmit={handleSubmission}
        aria-labelledby="enquiry-form-heading"
        aria-describedby="enquiry-helper-text"
        aria-busy={isSubmitting}
        className="mt-8 flex flex-col gap-10"
      >
        <div className="sr-only" aria-hidden="true">
          <label
            htmlFor={createFormFieldIdentifier(
              FIELD_IDENTIFIER_PREFIX,
              MARKETING_ENQUIRY_WEBSITE_FIELD_NAME
            )}
          >
            Website
          </label>
          <input
            id={createFormFieldIdentifier(
              FIELD_IDENTIFIER_PREFIX,
              MARKETING_ENQUIRY_WEBSITE_FIELD_NAME
            )}
            name={MARKETING_ENQUIRY_WEBSITE_FIELD_NAME}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>
        {failure && (
          <Alert
            ref={failureReference}
            tabIndex={-1}
            role="alert"
            variant="destructive"
          >
            <AlertDescription>{failure.message}</AlertDescription>
          </Alert>
        )}
        <DynamicFormFields
          identifierPrefix={FIELD_IDENTIFIER_PREFIX}
          fieldGroups={fieldGroups}
          defaultValues={defaultValues}
          fieldErrors={fieldErrors}
          disabled={isSubmitting}
          optionalFieldLabel={optionalFieldLabel}
          onFieldChange={clearFieldError}
        />
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            id="enquiry-helper-text"
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {helperText}
          </p>
          <ActionButton
            type="submit"
            size="extraLarge"
            shape="pill"
            isLoading={isSubmitting}
            loadingText={submittingLabel}
            className="w-full shrink-0 sm:w-auto"
          >
            {submitLabel}
          </ActionButton>
        </div>
      </form>
    </Card>
  );
}
