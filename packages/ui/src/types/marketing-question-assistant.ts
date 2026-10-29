/**
 * The contract between `MarketingQuestionAssistant` and the server route that
 * answers it. The browser posts one question; the route returns one answer or
 * a message to show instead.
 */

/** The body the assistant posts as JSON. */
export interface MarketingQuestionAssistantRequest {
  question: string;
}

/** Every response the route can return. */
export type MarketingQuestionAssistantResponse =
  | { status: "answered"; answer: string }
  | {
      status: "invalid" | "throttled" | "unavailable";
      message: string;
    };
