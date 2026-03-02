# Copilot Instructions for naologic-scheduler

## Project Overview
**naologic-scheduler** is an Angular 21 standalone component-based application for scheduling. It uses:
- **Build tool**: Angular CLI 21.2.0 with esbuild and Vite
- **Testing**: Vitest with jsdom
- **Package manager**: npm@10.8.2
- **Styling**: SCSS
- **UI libraries**: @ng-bootstrap/ng-bootstrap 20.0.0, @ng-select/ng-select 21.5.2

## Architecture & Key Files

### Standalone Application Structure
This is a **standalone-first** Angular 21 app (no NgModules):
- **`src/main.ts`**: Bootstrap entry point using `bootstrapApplication()`
- **`src/app/app.ts`**: Root component using signal-based state management
- **`src/app/app.routes.ts`**: Empty routes file (add new routes here, not in a module)
- **`src/app/app.config.ts`**: Application-level configuration, providers (routing, error handling)

### Component Pattern
All components are standalone. Example from `app.ts`:
```typescript
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],  // Explicit imports at component level
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('naologic-scheduler');  // Signal-based state
}
```

**Key pattern**: Components must explicitly declare their dependencies in `imports` array. No lazy loading via route modules.

## Development Workflow

### Essential Commands
- **Start dev server**: `npm start` (serves at `http://localhost:4200` with hot reload)
- **Build**: `npm run build` (production-optimized, outputs to `dist/`)
- **Test**: `npm test` (Vitest runner, see `tsconfig.spec.json`)
- **Watch**: `npm run watch` (development watch mode)

### File Organization
- **Components**: Place in `src/app/` with suffix `.ts` for class, `.html` for template, `.scss` for styles
- **Tests**: Collocate with components as `.spec.ts` files
- **Shared assets**: Use `public/` folder (included in build via `angular.json`)

## TypeScript & Code Standards

### Strict Mode Enabled
- `strict: true` - full type checking
- `noImplicitOverride: true` - must explicitly mark overrides
- `noPropertyAccessFromIndexSignature: true` - prevent unsafe property access
- `strictTemplates: true` - strict template type checking

### Style Language
- **SCSS by default** (configured in `angular.json` `inlineStyleLanguage`)
- Global styles: `src/styles.scss`

## UI Dependencies & Patterns

### Bootstrap Components
- **ng-bootstrap** v20.0.0: Use for Bootstrap-based UI components
- **ng-select**: Use for enhanced dropdown/select components
- **RxJS 7.8.0**: For reactive data streams (combined with Signals where appropriate)

## Testing Setup

### Test Runner: Vitest
- Configuration auto-detected from `angular.json` test builder
- Tests run via `ng test` (not `vitest` directly)
- jsdom environment for DOM testing
- Tests should be in `*.spec.ts` files collocated with components

## Performance & Build Budgets
Production build configuration in `angular.json`:
- **Initial bundle**: 500kB warning, 1MB error
- **Component styles**: 4kB warning per component, 8kB error
- Build uses output hashing for cache busting

## Important Conventions

1. **No NgModules**: All components are standalone. Add new routes directly to `app.routes.ts`.
2. **Signal-based state**: Use `signal()` for component state (as seen in `app.ts`), not class properties.
3. **Imports at component level**: Each component must import its dependencies (not globally in a module).
4. **Component prefix**: Automatically prefixed with `app-` (see `angular.json` prefix setting).
5. **Error handling**: Global error listeners configured via `provideBrowserGlobalErrorListeners()` in `app.config.ts`.
