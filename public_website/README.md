# pass Culture Institutional public website

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Clone this repository to your machine using the following command:

```bash
git clone https://github.com/your-username/pass-culture-institutional.git
```

## Start the project

Create a `.env` with correct environment variables from pass Culture [1Password](https://team-passculture.1password.com/) (search "Site institutionnel" in "Tech" section).

Navigate to the project directory and install the dependencies by running the following commands:

```bash
cd pass-culture-institutional
yarn install
yarn dev
```

## Naming Convention

By default, Next.js will take into account any file ending with tsx, ts, jsx or js under the pages folder for the purpose of building pages/API routes and routing.

To have the test files along side the page files, we have put in place the following naming convention:

- For pages: `src/pages/*.page.[tsx, ts, jsx, tx]`
- For tests: `src/pages/*.test.[tsx, ts, jsx, tx]`

This is configured in `next.config.js`:

```
module.exports = {
    // Default value is ['tsx', 'ts', 'jsx', 'js']
    pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
}
```

## Project Scripts

Before you can use the scripts, ensure you have `Yarn` installed on your system.
The project includes several scripts to simplify development and setup:

- `yarn build:` Build the application for production.
- `yarn dev:` Start the Next.js development server.
- `yarn start:` Start the application in production mode.
- `yarn test:` Run tests using Vitest.
- `yarn test:deadcode:` Find unused code using ts-prune.
- `yarn test:lint:` Run the linter to check code quality.
- `yarn test:types:` Check typing.