/**
 * Copy and limits for the AI question box under the homepage FAQ. The copy is
 * a draft awaiting approval.
 */
export const FAQ_ASSISTANT_CONTENT = {
  endpoint: "/api/faq-assistant",
  label: "Ask a question about Healthalyst Africa",
  placeholder:
    "Not satisfied? Ask me anything about Healthalyst, I’d be happy to help.",
  /** The placeholder on phones, short enough for one line. */
  compactPlaceholder: "Ask me anything about Healthalyst",
  submitLabel: "Send question",
  submittingLabel: "Finding an answer…",
  notice:
    "Answers come from an AI assistant that uses our published information, and may be incomplete. Please do not share patient information.",
  answerLabel: "AI assistant",
  contactPrompt: "Need more detail?",
  contactLabel: "Contact our team",
  failureMessage:
    "The assistant could not answer just now. Please try again, or contact our team.",
} as const;

export const FAQ_ASSISTANT_LIMITS = {
  minimumQuestionLength: 3,
  maximumQuestionLength: 500,
  /**
   * Longest reply the model may write, in tokens, including any thinking.
   * The instructions keep the visible answer to a few sentences.
   */
  maximumAnswerTokens: 1_024,
  /** How long to wait for each model before trying the next one. */
  answerTimeoutInMilliseconds: 12_000,
} as const;
