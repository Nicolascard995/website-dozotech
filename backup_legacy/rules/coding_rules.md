# Coding Rules & Best Practices

## General Principles
- **Clean Code:** Write readable, maintainable, and well-documented code.
- **Semantic HTML:** Use proper HTML5 tags (`<header>`, `<main>`, `<article>`, `<footer>`, etc.) instead of generic `div`s where possible.
- **Responsiveness:** Ensure the application is fully responsive on mobile, tablet, and desktop devices.
- **Performance:** Optimize images, code splitting, and resource loading.

## Frontend Development

### HTML
- Use proper heading hierarchy (`h1` -> `h6`).
- Ensure accessibility (ARIA labels, alt text for images).

### CSS
- **Methodology:** Use BEM (Block Element Modifier) or a clear utility-first approach if agreed.
- **Variables:** Use CSS variables (`:root`) for colors, spacing, and fonts to ensure consistency (Theme support).
- **Animations:** Use extensive high-quality animations (transitions, keyframes) as per "Dozo Tech" design goals.

### JavaScript
- **ES6+:** Use modern JavaScript features (const/let, arrow functions, async/await, modules).
- **No Global Pollution:** Encapsulate logic in modules or IIFEs.
- **Error Handling:** Implement try/catch blocks and proper input validation.

### Directory Structure
- `css/` - Stylesheets
- `js/` - Logic scripts
- `assets/` - Images, icons, fonts
- `context/` - Project documentation and specs
- `rules/` - Project rules and guidelines

## Design & UI/UX Rules
- **Aesthetics:** Prioritize "Wow Factor". Use glassmorphism, gradients, and modern UI trends.
- **Interactivity:** Elements should feel alive (hover states, micro-interactions).
- **Consistency:** Follow the defined color palette and typography from `context/project_spec.md`.

## Git / Version Control
- Commit messages should be clear and descriptive (e.g., `feat: add navigation sidebar`, `fix: header alignment`).
- Create branches for new features.
