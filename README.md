# NEAR x Privy

A React example using Privy social login and an embedded NEAR wallet. Blockchain
queries and transactions use `near-api-js`; a custom `Signer` delegates signing
to Privy without exporting the wallet's private key.

Use Node.js 22.22.2 or newer. Run `npm ci`, `npm run dev`,
`npm run lint`, `npm test`, or `npm run build`. The build runs the strict
TypeScript check before bundling; use `npm run typecheck` to run it separately.

Set your Privy application ID in `src/App.tsx` and allow your development/deployed
origin in its dashboard. After login, fund the displayed NEAR testnet account to
pay gas. The example selects the user's NEAR wallet explicitly even if other
chain wallets are linked to the same user.

The offline signer test checks the SDK transaction hash and signature. Social
login and on-chain greeting changes require your configured app and funded account.
