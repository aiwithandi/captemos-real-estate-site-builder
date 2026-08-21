# Supabase lead storage

The schema in `supabase/schema.sql` creates profiles, inquiries, Matchmaker submissions, and an optional property cache. Row Level Security allows public reads only for published profiles and properties; lead records remain owner-only.

Required private configuration for stored forms:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SITE_OWNER_ID=
```

Although the URL and anonymous key may be public, the service-role key and owner ID stay server-only. The API routes require all storage variables together. With none configured, forms return an explicit demo-mode result and store nothing. A partial or invalid configuration fails closed.

Before applying SQL:

1. Verify the exact Supabase project reference.
2. Confirm the project is a development target or approved empty project.
3. Apply `supabase/schema.sql`.
4. Create the owner user and copy its UUID into `SITE_OWNER_ID` privately.
5. Submit clearly labelled test data through both forms.
6. Sign in as the owner and confirm the records are visible.
7. Confirm another authenticated user cannot read those records.

The optional demo seed requires `DEMO_USER_PASSWORD`. Remote hosted seeding is blocked unless `ALLOW_REMOTE_DEMO_SEED=true` is deliberately set after verification. Remove demo users and rotate temporary credentials before production.
