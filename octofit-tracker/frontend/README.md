
## API configuration

For direct API access from GitHub Codespaces, `VITE_CODESPACE_NAME` must be defined in `octofit-tracker/frontend/.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

Use your Codespace name, or start with `.env.example`. Vite exposes this value through `import.meta.env`; restart the dev server after changing it. Requests then use `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[resource]/`.

If the variable is unset, the client safely uses the relative `/api/[resource]/` path rather than constructing a URL with `undefined`. This fallback expects the API to be available under the same origin.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
