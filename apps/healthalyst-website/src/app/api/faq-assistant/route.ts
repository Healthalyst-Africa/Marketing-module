import type { MarketingQuestionAssistantResponse } from "@healthalyst/ui/types/marketing-question-assistant";

import { FAQ_ASSISTANT_LIMITS } from "~/features/homepage/config/faq-assistant-content";
import { answerFaqAssistantQuestion } from "~/features/homepage/services/faq-assistant-answer";
import {
  hasExceededFaqAssistantLimit,
  recordFaqAssistantAttempt,
} from "~/features/homepage/utilities/faq-assistant-throttle";
import { readClientAddress } from "~/shared/requests/utilities/read-client-address";

/**
 * Answers one question from the homepage FAQ assistant with Gemini, using
 * only the site's published copy. The API key stays on the server. Questions
 * are not stored or logged.
 */

export const runtime = "nodejs";

const THROTTLE_WAIT_IN_SECONDS = 600;

const THROTTLE_MESSAGE =
  "You have asked several questions in a short time. Please wait a few minutes, or contact our team.";

const INVALID_QUESTION_MESSAGE = `Please write a question between ${FAQ_ASSISTANT_LIMITS.minimumQuestionLength} and ${FAQ_ASSISTANT_LIMITS.maximumQuestionLength} characters.`;

const UNAVAILABLE_MESSAGE =
  "The assistant is not available right now. Please try again later, or contact our team.";

const DECLINED_ANSWER =
  "I cannot help with that here. Our team would be happy to answer your question directly through the contact page.";

function createAssistantResponse(
  assistantResponse: MarketingQuestionAssistantResponse,
  statusCode: number,
  headers?: Record<string, string>
): Response {
  return Response.json(assistantResponse, { status: statusCode, headers });
}

/** The trimmed question, or null when the body is not a usable question. */
async function readQuestion(request: Request): Promise<string | null> {
  try {
    const parsedBody: unknown = await request.json();

    if (typeof parsedBody !== "object" || parsedBody === null) {
      return null;
    }

    const question = (parsedBody as Record<string, unknown>).question;

    if (typeof question !== "string") {
      return null;
    }

    const trimmedQuestion = question.trim();

    return trimmedQuestion.length >=
      FAQ_ASSISTANT_LIMITS.minimumQuestionLength &&
      trimmedQuestion.length <= FAQ_ASSISTANT_LIMITS.maximumQuestionLength
      ? trimmedQuestion
      : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request): Promise<Response> {
  const clientAddress = readClientAddress(request);

  if (hasExceededFaqAssistantLimit(clientAddress)) {
    return createAssistantResponse(
      { status: "throttled", message: THROTTLE_MESSAGE },
      429,
      { "Retry-After": String(THROTTLE_WAIT_IN_SECONDS) }
    );
  }

  const question = await readQuestion(request);

  if (!question) {
    return createAssistantResponse(
      { status: "invalid", message: INVALID_QUESTION_MESSAGE },
      400
    );
  }

  recordFaqAssistantAttempt(clientAddress);

  const answerOutcome = await answerFaqAssistantQuestion(question);

  if (answerOutcome.outcome === "unavailable") {
    return createAssistantResponse(
      { status: "unavailable", message: UNAVAILABLE_MESSAGE },
      503
    );
  }

  return createAssistantResponse(
    {
      status: "answered",
      answer:
        answerOutcome.outcome === "answered"
          ? answerOutcome.answer
          : DECLINED_ANSWER,
    },
    200
  );
}
