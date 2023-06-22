# Cypress Quick Start Guide

This repository contains tests written using Cypress, a powerful end-to-end testing framework for web applications. This guide will help you quickly set up and run the Cypress tests in this repository.

## Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your system:

-   Node.js (v18.13.0 or higher)
-   npm (v8.19.3 or higher)
-   pnpm (v7 or higher)

## 🎉 Getting Started

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/tammarut/my-cypress-tutorial.git
    ```
2. Navigate to the repository's root directory:
    ```bash
    cd https://github.com/tammarut/my-cypress-tutorial.git
    ```
3. Install the project dependencies:

    ```bash
    pnpm install
    ```

4. Start the Cypress Test Runner:

    ```bash
    pnpm run cypress:open

    # or
    npx cypress open
    ```

5. The Cypress Test Runner will open, displaying a list of available test files. Click on a test file to run the tests within it.

    - By default, the tests are run in the Chrome browser.
    - You can select a different browser or run tests in headless mode from the Cypress Test Runner.

## 🧪 Writing and Running Tests

To write and run your own tests:

1. Create a new Cypress test file in the `cypress/e2e` directory.
2. Write your tests using the Cypress API and assertions.
3. Save the file.
4. Re-run the Cypress Test Runner:

    ```bash
    npm run cypress:open
    ```

    You will see your newly created test file in the list. Click on it to run the tests within it.

## Additional Configuration

-   The Cypress configuration file (`cypress.config.ts`) is located in the project root directory. You can modify it to customize various Cypress settings.
-   The `cypress/e2e/examples` directory contains example test files that can serve as a reference for writing your own tests.

## Reporting Issues

If you encounter any issues or have questions about this repository, please feel free to [open an issue](https://github.com/your-repository-url/issues). We appreciate your feedback and contributions!

## Contributing

We welcome contributions to this repository. If you'd like to contribute, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
