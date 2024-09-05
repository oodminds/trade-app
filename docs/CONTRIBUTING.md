.
├── README.md
├── components.json
├── next.config.mjs
├── postcss.config.mjs
├── tests/
│ ├── integration/
│ └── unit/
├── app/
│ ├── api/
│ │ ├── auth/
│ │ │ └── [...nextauth]/
│ │ │ └── route.ts
│ │ ├── trades/
│ │ │ └── route.ts
│ │ └── users/
│ │ └── route.ts
│ ├── auth/
│ │ ├── login/
│ │ │ └── page.tsx
│ │ └── signup/
│ │ └── page.tsx
│ ├── lib/
│ │ ├── db/
│ │ │ └── cosmosClient.ts
│ │ ├── dbops/
│ │ │ ├── tradeOperations.ts
│ │ │ └── userOperations.ts
│ │ ├── entities/
│ │ │ ├── Trade.ts
│ │ │ └── User.ts
│ │ ├── errors/
│ │ │ ├── errorHandler.ts
│ │ │ └── errorTypes.ts
│ │ ├── models/
│ │ │ ├── Trade.ts
│ │ │ └── User.ts
│ │ ├── services/
│ │ │ ├── tradeService.ts
│ │ │ └── userService.ts
│ │ └── utils/
│ │ ├── logger.ts
│ │ └── validators.ts
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ └── signoutButton.tsx
├── docs/
│ ├── API.md
│ ├── CONTRIBUTING.md
│ ├── FolderStructure.md
│ └── SETUP.md
├── lib/
│ ├── auth.ts
│ └── utils.ts
├── public/
│ ├── next.svg
│ └── vercel.svg
├── package-lock.json
├── package.json
├── tailwind.config.ts
└── tsconfig.json
