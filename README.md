# MonoLab Frontend

Modern React application built with Vite, TypeScript, Tailwind CSS v4, and Zustand.

## 🚀 Tech Stack

- **React 18+** - UI Library
- **Vite** - Build Tool & Dev Server
- **TypeScript** - Type Safety
- **Tailwind CSS v4** - Styling
- **Zustand** - State Management

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base components (Button, Input, etc.)
│   └── features/        # Feature-specific components
├── pages/               # Page components (routes)
├── hooks/               # Custom React hooks
├── stores/              # Zustand stores
├── services/            # API calls & external services
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── styles/              # Global styles & Tailwind config
```

## 🛠️ Development

### Prerequisites

- Node.js (v20.19.0 or higher)
- npm

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
npm run type-check   # Check TypeScript types
npm run format       # Format code with Prettier
```

## 📝 Development Guidelines

- Follow the `.cursor/rules/frontend-rules.md` for detailed guidelines
- Use function declarations for components
- Always type your props interfaces
- Prefer Tailwind utilities over custom CSS
- Use Zustand for state management
- Follow the established folder structure

## 🎨 Styling

This project uses **Tailwind CSS v4** with the new Vite plugin integration:

```css
/* src/index.css */
@import "tailwindcss";
```

### Custom Components

Create reusable components in `src/components/ui/`:

```typescript
// Example: Button component
import type { ButtonProps } from '../../types';

function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

## 🗄️ State Management

Using Zustand for simple, type-safe state management:

```typescript
// stores/useUserStore.ts
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: async (credentials) => {
    // Login logic
  },
  logout: () => set({ user: null }),
}));
```

## 🔗 API Integration

API services are organized in `src/services/`:

```typescript
// services/authService.ts
class AuthService {
  private baseUrl = import.meta.env.VITE_API_URL;
  
  async login(credentials: LoginCredentials): Promise<User> {
    // Implementation
  }
}

export const authService = new AuthService();
```

## 🧪 Testing

```bash
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 📦 Building

```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🎯 Next Steps

1. Add React Router for routing
2. Implement authentication flow
3. Add form validation with React Hook Form
4. Set up testing with Vitest
5. Add error boundaries
6. Implement PWA features

---

**Happy coding!** 🚀
