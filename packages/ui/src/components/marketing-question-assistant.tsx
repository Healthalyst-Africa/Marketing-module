"use client";

import {
  useId,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { ArrowRightIcon, InformationIcon } from "@healthalyst/icons";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import { MarketingArrowLink } from "@healthalyst/ui/components/marketing-arrow-link";
import { Textarea } from "@healthalyst/ui/primitives/textarea";
import type {
  MarketingQuestionAssistantRequest,
  MarketingQuestionAssistantResponse,
} from "@healthalyst/ui/types/marketing-question-assistant";

type AssistantState =
  | { status: "idle" }
  | { status: "asking" }
  | { status: "answered"; answer: string }
  | { status: "failed"; message: string };

function readAssistantResponse(
  responseBody: unknown
): MarketingQuestionAssistantResponse | null {
  if (typeof responseBody !== "object" || responseBody === null) {
    return null;
  }

  const response = responseBody as Record<string, unknown>;

  if (response.status === "answered" && typeof response.answer === "string") {
    return { status: "answered", answer: response.answer };
  }

  if (
    (response.status === "invalid" ||
      response.status === "throttled" ||
      response.status === "unavailable") &&
    typeof response.message === "string"
  ) {
    return { status: response.status, message: response.message };
  }

  return null;
}

/**
 * A question box for an AI assistant, placed under a list of answers such as
 * an FAQ. Visitors type one question; the answer from `endpoint` appears
 * below it with a way to reach a person. Enter sends the question and
 * Shift+Enter adds a line. The notice beside the field says the answers come
 * from an AI, so nobody mistakes them for a person's reply.
 */
export function MarketingQuestionAssistant({
  endpoint,
  label,
  placeholder,
  submitLabel,
  submittingLabel,
  notice,
  answerLabel,
  failureMessage,
  maximumLength,
  contactPrompt,
  contactLink,
  className,
}: {
  endpoint: string;
  /** Accessible name for the field; the placeholder is not a label. */
  label: string;
  placeholder: string;
  /** Accessible name for the send button. */
  submitLabel: string;
  /** Announced while the answer is on its way. */
  submittingLabel: string;
  /** Says the answers come from an AI and what not to share. */
  notice: ReactNode;
  /** Small heading above an answer. */
  answerLabel: string;
  /** Shown when the request fails without a message from the server. */
  failureMessage: string;
  maximumLength: number;
  /** Text before the contact link under an answer. */
  contactPrompt: string;
  /** A link element whose visible text names where it goes. */
  contactLink: ReactElement<{ className?: string; children?: ReactNode }>;
  className?: string;
}) {
  const fieldIdentifier = useId();
  const noticeIdentifier = useId();
  const [question, setQuestion] = useState("");
  const [assistantState, setAssistantState] = useState<AssistantState>({
    status: "idle",
  });

  const isAsking = assistantState.status === "asking";
  const canAsk = question.trim().length > 0 && !isAsking;

  async function askQuestion() {
    if (!canAsk) {
      return;
    }

    setAssistantState({ status: "asking" });

    const requestBody: MarketingQuestionAssistantRequest = {
      question: question.trim(),
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const assistantResponse = readAssistantResponse(await response.json());

      if (assistantResponse?.status === "answered") {
        setAssistantState({
          status: "answered",
          answer: assistantResponse.answer,
        });
        return;
      }

      setAssistantState({
        status: "failed",
        message: assistantResponse?.message ?? failureMessage,
      });
    } catch {
      setAssistantState({ status: "failed", message: failureMessage });
    }
  }

  function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    void askQuestion();
  }

  function handleKeyDown(keyboardEvent: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      keyboardEvent.key === "Enter" &&
      !keyboardEvent.shiftKey &&
      !keyboardEvent.nativeEvent.isComposing
    ) {
      keyboardEvent.preventDefault();
      void askQuestion();
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor={fieldIdentifier} className="sr-only">
          {label}
        </label>
        <Textarea
          id={fieldIdentifier}
          rows={1}
          value={question}
          maxLength={maximumLength}
          placeholder={placeholder}
          aria-describedby={noticeIdentifier}
          onChange={(changeEvent) => setQuestion(changeEvent.target.value)}
          onKeyDown={handleKeyDown}
          // One line that grows with the question where browsers support
          // content sizing; elsewhere it stays one line and scrolls. The
          // smaller placeholder shares the text's 26 px line so both sit on
          // the send button's centre.
          className="max-h-40 min-h-0 resize-none rounded-2xl pr-12 text-base leading-[26px] placeholder:leading-[26px] [field-sizing:content]"
        />
        <ActionButton
          type="submit"
          size="smallIcon"
          shape="pill"
          disabled={!canAsk}
          isLoading={isAsking}
          // The spinner replaces the arrow; the label names both states.
          loadingText=""
          aria-label={isAsking ? submittingLabel : submitLabel}
          // Centred on the first line, and kept at the bottom as the field grows.
          className="absolute bottom-2.5 right-2.5"
        >
          <ArrowRightIcon aria-hidden="true" />
        </ActionButton>
      </form>
      <p
        id={noticeIdentifier}
        className="mt-1.5 flex items-start gap-1.5 text-xs leading-[18px] text-muted-foreground"
      >
        {/* 12 px text on an 18 px line: a 12 px icon 3 px down sits on the first line. */}
        <InformationIcon
          aria-hidden="true"
          className="mt-[3px] size-3 shrink-0"
        />
        <span className="italic">{notice}</span>
      </p>

      <div aria-live="polite">
        {isAsking && <p className="sr-only">{submittingLabel}</p>}
        {assistantState.status === "answered" && (
          <div className="mt-6 rounded-2xl bg-accent-subtle p-5 md:p-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              {answerLabel}
            </p>
            <p className="mt-2 whitespace-pre-line text-base leading-[1.8] text-foreground">
              {assistantState.answer}
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 text-[15px] text-muted-foreground">
              {contactPrompt}
              <MarketingArrowLink link={contactLink} />
            </p>
          </div>
        )}
        {assistantState.status === "failed" && (
          <p className="mt-6 text-[15px] leading-relaxed text-destructive">
            {assistantState.message}
          </p>
        )}
      </div>
    </div>
  );
}
