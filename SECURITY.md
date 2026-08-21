# Security policy

## Supported version

Security fixes are applied to the latest version on the default branch.

## Reporting a vulnerability

Please use GitHub’s **Security → Report a vulnerability** flow. Do not include secrets, customer records, or an active exploit in a public issue.

## Secret handling

- Never commit `.env.local` or any other `.env.*` file.
- Keep `CAPTEMOS_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `SITE_OWNER_ID` server-only.
- Never prefix private values with `NEXT_PUBLIC_`.
- Use separate development and production credentials.
- Rotate any credential that appears in a screen recording, terminal log, issue, commit, or deployment output.
- Run a secret scan before every public push.

## Production checklist

The starter includes validation, an origin check, a honeypot, payload limits, and a lightweight request throttle. Before accepting public traffic, also enable durable platform-level rate limiting or bot protection, review Supabase RLS, use a verified `SITE_OWNER_ID`, and test lead access with a non-owner account.
