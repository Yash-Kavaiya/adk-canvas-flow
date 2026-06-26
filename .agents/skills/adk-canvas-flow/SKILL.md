```markdown
# adk-canvas-flow Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `adk-canvas-flow` TypeScript codebase. You'll learn about file naming, import/export styles, commit message conventions, and how to write and organize tests. This guide is designed to help contributors maintain consistency and quality throughout the project.

## Coding Conventions

### File Naming
- Use **PascalCase** for all file names.
  - Example: `CanvasNode.ts`, `FlowManager.ts`

### Import Style
- Use **alias imports** for modules.
  - Example:
    ```typescript
    import { FlowNode as Node } from './FlowNode';
    ```

### Export Style
- Use **named exports** for all modules.
  - Example:
    ```typescript
    // In FlowNode.ts
    export function FlowNode() { ... }
    export const NODE_TYPE = 'canvas';
    ```

### Commit Messages
- Use **conventional commit** format.
- Prefix with `fix` for bug fixes.
  - Example: `fix: correct node rendering issue on canvas`
- Average commit message length: ~63 characters.

## Workflows

### Code Contribution
**Trigger:** When adding or updating features, fixing bugs, or refactoring.
**Command:** `/contribute`

1. Create a new branch for your work.
2. Follow coding conventions for file naming, imports, and exports.
3. Write or update tests as needed (see Testing Patterns).
4. Use conventional commit messages (e.g., `fix: ...`).
5. Open a pull request for review.

### Testing
**Trigger:** When adding new code or modifying existing functionality.
**Command:** `/test`

1. Create or update test files using the `*.test.*` pattern.
2. Ensure all tests pass before submitting changes.
3. Use the appropriate testing framework (framework is currently unknown; check project documentation or existing tests for guidance).

## Testing Patterns

- Test files follow the `*.test.*` naming convention.
  - Example: `FlowManager.test.ts`
- Place test files alongside the modules they test or in a dedicated test directory.
- Testing framework is not specified—refer to existing test files for structure and assertions.

## Commands
| Command      | Purpose                                      |
|--------------|----------------------------------------------|
| /contribute  | Start the code contribution workflow         |
| /test        | Run or write tests for your code changes     |
```
