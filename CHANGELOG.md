# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2020-05-26
### Added
- This CHANGELOG file.
- `authorize`, `authenticate`, `logout` middlewares.
- `encrypt` utils.
- `parseBody` function for vanilla http node servers.
- Custom `AuthError`.
- `setCookie` and `getCookie` helpers.
- Unit tests. Still incomplete.
- ESlint

### Changed
- Migrated to TypeScript

### Removed
- `withAuth` HOC
- `login` client function
- `logout` client function
- `auth` function
- `nookies` dependency

[Unreleased]: https://github.com/j0lv3r4/next-authentication/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/j0lv3r4/next-authentication/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/j0lv3r4/next-authentication/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/j0lv3r4/next-authentication/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/j0lv3r4/next-authentication/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/j0lv3r4/next-authentication/releases/tag/v0.1.0

