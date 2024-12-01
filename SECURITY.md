# Security Policy for Proofly

## Overview

This project, **Proofly**, is a versatile receipt generator offering invoice creation, tax calculations, multi-currency support, PDF exports, bulk generation, and barcode integration. The project ensures data security and protects sensitive information during interactions.

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please follow these steps:

1. **Do not disclose the issue publicly.** Instead, contact the repository maintainers directly.
2. Open an issue on the repository or send an email to **kurosen930@gmail.com**.
3. Provide clear steps to reproduce and any potential fixes or patches.

## Code Security

We prioritize secure coding practices to mitigate common vulnerabilities, such as:

- **Injection Attacks**: All input data is sanitized before processing.
- **Cross-Site Scripting (XSS)**: User input is escaped to prevent XSS.
- **Cross-Site Request Forgery (CSRF)**: Security tokens are used to prevent CSRF attacks.

## Dependencies

This project uses third-party libraries. Ensure that these dependencies are up-to-date and monitor for any vulnerabilities.

- Use **npm audit** to check for outdated or insecure dependencies.
- Follow security updates for all dependencies and apply patches as needed.

## Secrets Management

Sensitive information such as API keys and environment variables should not be committed directly to the repository. Instead, store secrets securely using GitHub Secrets, and use environment variables in your codebase.

## Access Control

- Protect sensitive branches (e.g., `main`, `production`) with **branch protection rules**.
- Restrict permissions for collaborators and ensure access to sensitive parts of the project is granted based on the principle of least privilege.

## Secure Deployments

- Use CI/CD tools to ensure all tests pass and security scans are run before deployment.
- Enable HTTPS for all environments to encrypt data during transmission.

## Licensing

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

We thank all contributors and the open-source community for helping make this project more secure.
