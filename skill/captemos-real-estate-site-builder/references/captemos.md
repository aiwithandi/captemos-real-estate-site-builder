# CapteMos property-feed connection

The starter expects:

```dotenv
CAPTEMOS_BASE_URL=https://captemos2.vercel.app
CAPTEMOS_API_KEY=<your-private-key>
```

The server requests `GET /api/properties/list` with `Authorization: Bearer <key>`. A valid response contains an `items` array. The adapter validates and normalizes known public fields; missing credentials, a failed request, or an empty valid result uses the bundled demo feed.

`CAPTEMOS_API_KEY` is private. Never rename it to `NEXT_PUBLIC_CAPTEMOS_API_KEY`, pass it into a Client Component, log it, include it in documentation, or show it during a recording.

When a key is provided, verify the homepage source label says `Live CapteMos feed`, open at least one live property, and confirm no credential appears in browser source or network response bodies.
