![prompt chef cover](/prompt-creator-cover.png)

## Public Repository for Prompt Chef tech and styling.

Sensitive files and information is censored for security.

This repository is to show how I _made_ the platform, and not how to _host_ the platform yourself. There is way too much external implementation to include here (such as Redis setup, Firebase setup, cloud config files, etc).

View working site at https://promptchef.oxen.dev

### Points of interest 🌐

Main Site Styles:
`nextjs/styles/globals.css`

Some useful utilities:
`nextjs/utilities/utilities.ts`

Stability.ai APIs:
`firebase/functions/src/apis/stabilityAi.ts`

OpenAI APIs:
`firebase/functions/src/apis/generateTextAsync.ts`

My Implementation of Redis search:
`firebase/functions/src/app/searchRedis.ts`
