-- Job application storage for the HealthAlyst Africa marketing website.
--
-- Run once against the database named in DATABASE_URL, either through the
-- Neon SQL editor or with:
--
--   psql "$DATABASE_URL" -f db/job-applications.sql
--
-- The application never runs these statements itself. It only inserts rows,
-- so the schema is applied and reviewed by a person. Applicants share their
-- CV and portfolio as links; no files are stored here.

CREATE TABLE IF NOT EXISTS job_applications (
  application_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_slug text NOT NULL,
  role_title text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email_address text NOT NULL,
  phone_number text,
  location text NOT NULL,
  cv_address text NOT NULL,
  portfolio_address text,
  linkedin_address text,
  cover_note text NOT NULL,
  submission_hash text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT job_applications_role_slug_length
    CHECK (char_length(role_slug) BETWEEN 1 AND 80),
  CONSTRAINT job_applications_first_name_length
    CHECK (char_length(first_name) BETWEEN 1 AND 80),
  CONSTRAINT job_applications_last_name_length
    CHECK (char_length(last_name) BETWEEN 1 AND 80),
  CONSTRAINT job_applications_email_address_length
    CHECK (char_length(email_address) BETWEEN 3 AND 254),
  CONSTRAINT job_applications_phone_number_length
    CHECK (phone_number IS NULL OR char_length(phone_number) <= 40),
  CONSTRAINT job_applications_location_length
    CHECK (char_length(location) BETWEEN 1 AND 120),
  CONSTRAINT job_applications_cv_address_length
    CHECK (char_length(cv_address) BETWEEN 1 AND 500),
  CONSTRAINT job_applications_portfolio_address_length
    CHECK (portfolio_address IS NULL OR char_length(portfolio_address) <= 500),
  CONSTRAINT job_applications_linkedin_address_length
    CHECK (linkedin_address IS NULL OR char_length(linkedin_address) <= 500),
  CONSTRAINT job_applications_cover_note_length
    CHECK (char_length(cover_note) BETWEEN 1 AND 3000)
);

-- Newest applications first, per role, when the hiring team reviews them.
CREATE INDEX IF NOT EXISTS job_applications_role_submitted_at_index
  ON job_applications (role_slug, submitted_at DESC);

-- Duplicate detection within a short window, as for contact enquiries.
CREATE INDEX IF NOT EXISTS job_applications_submission_hash_index
  ON job_applications (submission_hash, submitted_at DESC);

-- Applications hold personal data. Agree who may read these rows, how long
-- they are kept after a hiring decision, and how they are deleted before
-- accepting real applications.
