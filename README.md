# 💵 Persfin
A personal finance application based on [double-entry accounting](https://en.wikipedia.org/wiki/Double-entry_bookkeeping) principles. Every transaction is recorded from an account to another account, where each account has one of the type: asset, liability, equity, revenue, or expense. This ensures the finances are always balanced and traceable.

The app allows you to track your bank accounts, income, expenses, loans, and investments in a single place. By using proper accounting logic, you can generate accurate projections of your net worth and monitor how your actions affect your financial health over time.

## Features
* Add transactions conisting of multiple entries
* Revert or remove transactions
* Display statistics
* Authentication and persistance through [Firebase](https://firebase.google.com/)

## Tech Stack
- React
- Next.js

## To do
* Add more graphs and other useful statistical tools
* Make it more user friendly

## Build and Deploy
Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build the application for static hosting:
```bash
npm run build
```

Serve the `out` directory with any static file server.

### Environment Configuration
By default, the app builds using the root base path `/`. To host on a subpath, create a `.env` file with:
```
NEXT_PUBLIC_BASE_PATH="/sub-path"
NEXT_PUBLIC_ASSET_PREFIX="/sub-path"
```

You can also have environment-specific files such as `.env.development.local` for local development.

## Live Demo
Try the game here: https://www.joacimandersson.com/persfin/