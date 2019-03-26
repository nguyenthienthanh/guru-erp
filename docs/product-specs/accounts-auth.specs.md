# Accounts, authentication/authorization core feature

| Issue                                                | Services |
| ---------------------------------------------------- | -------- |
| [#39](https://github.com/targeek/guru-erp/issues/39) | Accounts |

## Overview

### Goals

- Allow users to sign up, sign in, sign out, update account, fetch account.
- Store passwords securely with [bcrypt](https://www.npmjs.com/package/bcrypt).
- User session management.

## Specifications

### Definition

Accounts are used to let users sign in and manage their sessions while using Guru ERP. Each user has
an account no matter how many organizations they belong to.

Each account will be uniq by an email address.
