/** The company's phone line, written in international form for display. */
export const COMPANY_PHONE_NUMBER = "+234 813 618 7042";

/** The same line without spaces or the plus sign, as WhatsApp expects it. */
const COMPANY_PHONE_DIGITS = COMPANY_PHONE_NUMBER.replace(/\D/g, "");

/**
 * Opens a WhatsApp chat with the company line, using WhatsApp's documented
 * click-to-chat address.
 */
export const COMPANY_WHATSAPP_DESTINATION = `https://wa.me/${COMPANY_PHONE_DIGITS}`;
