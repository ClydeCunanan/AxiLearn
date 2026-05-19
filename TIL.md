5/19/2026

I experienced a bug where next js turbopack was causing issues when used with zodToJson schema. This happens with the modern genai sdk, leading it to not convert the zodschema to json within the responseSchema parameter

Issue: Next.js Turbopack splits code into isolated chunks. This forces the Zod library inside your Server Action and the Zod library inside the Gemini SDK into separate memory spaces. Because they live in different bundles, the SDK's internal instanceof ZodType check fails, causing it to send raw Zod class internals over the network and crash with a 400 error.

fix: gemini advised to use official gemini schema format instead of zod


