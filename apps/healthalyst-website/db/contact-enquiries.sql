-- Contact enquiry storage for the HealthAlyst Africa marketing website.
--
-- Run once against the database named in DATABASE_URL, either through the
-- Neon SQL editor or with:
--
--   psql "$DATABASE_URL" -f db/contact-enquiries.sql
--
-- The application never runs these statements itself. It only reads and
-- inserts rows, so the schema is applied and reviewed by a person.
--
-- This table stores public marketing enquiries only. Patient records, clinical
-- details and other sensitive health information must never be submitted
-- through the marketing form or written here.

CREATE TABLE IF NOT EXISTS contact_enquiries (
  enquiry_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_type text NOT NULL DEFAULT 'contact',
  first_name text NOT NULL,
  last_name text NOT NULL,
  organisation text NOT NULL,
  email_address text NOT NULL,
  phone_number text,
  institution_type text NOT NULL,
  product_interest text NOT NULL,
  message text NOT NULL,
  submission_hash text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contact_enquiries_type_allowed
    CHECK (enquiry_type IN ('contact', 'partnership')),
  CONSTRAINT contact_enquiries_first_name_length
    CHECK (char_length(first_name) BETWEEN 1 AND 80),
  CONSTRAINT contact_enquiries_last_name_length
    CHECK (char_length(last_name) BETWEEN 1 AND 80),
  CONSTRAINT contact_enquiries_organisation_length
    CHECK (char_length(organisation) BETWEEN 1 AND 160),
  CONSTRAINT contact_enquiries_email_address_length
    CHECK (char_length(email_address) BETWEEN 3 AND 254),
  CONSTRAINT contact_enquiries_phone_number_length
    CHECK (phone_number IS NULL OR char_length(phone_number) <= 40),
  CONSTRAINT contact_enquiries_institution_type_length
    CHECK (char_length(institution_type) BETWEEN 1 AND 120),
  CONSTRAINT contact_enquiries_product_interest_length
    CHECK (char_length(product_interest) BETWEEN 1 AND 160),
  CONSTRAINT contact_enquiries_message_length
    CHECK (char_length(message) BETWEEN 1 AND 5000)
);

-- Newest enquiries first when an operator reviews the table.
CREATE INDEX IF NOT EXISTS contact_enquiries_submitted_at_index
  ON contact_enquiries (submitted_at DESC);

-- Duplicate detection keeps the most recent submission of identical content
-- within a short window instead of blocking a repeat enquiry forever.
CREATE INDEX IF NOT EXISTS contact_enquiries_submission_hash_index
  ON contact_enquiries (submission_hash, submitted_at DESC);

-- Enquiry ownership and retention decisions are company inputs. Agree who may
-- read these rows, how long they are kept, and how they are deleted before
-- accepting real submissions.
