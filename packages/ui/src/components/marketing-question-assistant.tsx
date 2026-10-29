"use client";

import {
  useEffect,
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
  compactPlaceholder,
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
  /**
   * A shorter placeholder for phones, so the empty field stays one line high
   * with the send button centred beside it.
   */
  compactPlaceholder?: string;
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

  const isPhoneWidth = useIsPhoneWidth();
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
          placeholder={
            isPhoneWidth && compactPlaceholder
              ? compactPlaceholder
              : placeholder
          }
          // Phone keyboards show "Send", since Enter sends the question.
          enterKeyHint="send"
          aria-describedby={noticeIdentifier}
          onChange={(changeEvent) => setQuestion(changeEvent.target.value)}
          onKeyDown={handleKeyDown}
          // One line that grows with the question where browsers support
          // content sizing; elsewhere it stays one line and scrolls. The
          // smaller placeholder shares the text's 26 px line so both sit on
          // the send button's centre.
          className="max-h-40 min-h-0 resize-none rounded-2xl pr-12 text-base leading-[26px] placeholder:text-xs placeholder:leading-[26px] sm:placeholder:text-sm [field-sizing:content]"
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
        className="mt-1.5 flex items-start gap-1 text-[10px] leading-[14px] text-muted-foreground sm:gap-1.5 sm:text-xs sm:leading-[18px]"
      >
        {/* Centred on the first line: 10 px on a 14 px line on phones, 12 px
            on an 18 px line from 640 px. */}
        <InformationIcon
          aria-hidden="true"
          className="mt-0.5 size-2.5 shrink-0 sm:mt-[3px] sm:size-3"
        />
        <span className="italic">{notice}</span>
      </p>

      <div aria-live="polite">
        {isAsking && <p className="sr-only">{submittingLabel}</p>}
        {assistantState.status === "answered" && (
          <div className="mt-4 rounded-2xl bg-accent-subtle p-4 sm:mt-6 sm:p-5 md:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground sm:text-[13px]">
              {answerLabel}
            </p>
            <p className="mt-1.5 whitespace-pre-line text-[13px] leading-relaxed text-foreground sm:mt-2 sm:text-base sm:leading-[1.8]">
              {assistantState.answer}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 text-[13px] text-muted-foreground sm:mt-4 sm:gap-x-3 sm:text-[15px]">
              {contactPrompt}
              <MarketingArrowLink
                link={contactLink}
                size={isPhoneWidth ? "small" : "default"}
              />
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

/** Below Tailwind's `sm` breakpoint (640 px). */
const PHONE_WIDTH_QUERY = "(max-width: 639px)";

/**
 * Whether the screen is phone width. False on the server and on the first
 * render, so the page hydrates with the full placeholder before adjusting.
 */
function useIsPhoneWidth(): boolean {
  const [isPhoneWidth, setIsPhoneWidth] = useState(false);

  useEffect(() => {
    const phoneWidthQuery = window.matchMedia(PHONE_WIDTH_QUERY);
    const updatePhoneWidth = () => setIsPhoneWidth(phoneWidthQuery.matches);

    updatePhoneWidth();
    phoneWidthQuery.addEventListener("change", updatePhoneWidth);

    return () =>
      phoneWidthQuery.removeEventListener("change", updatePhoneWidth);
  }, []);

  return isPhoneWidth;
}
