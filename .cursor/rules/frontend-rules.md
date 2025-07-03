# Frontend Development Rules - React + Vite + TypeScript

## 🎯 Tech Stack
- **React 18+**: Functional components with hooks
- **Vite**: Development server and build tool
- **TypeScript**: Strict mode enabled
- **Tailwind CSS v4**: Utility-first styling
- **Zustand**: State management (when needed)

## 📁 Frontend Structure

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base components (Button, Input, etc.)
│   │   └── features/        # Feature-specific components
│   ├── pages/               # Page components (routes)
│   ├── hooks/               # Custom React hooks
│   ├── stores/              # Zustand stores
│   ├── services/            # API calls & external services
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── styles/              # Global styles & Tailwind config
├── public/                  # Static assets
└── package.json
```

## ⚛️ React Component Rules

### Component Structure
```typescript
// ✅ Good: Function declaration with explicit props interface
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ 
  variant, 
  size = 'md', 
  children, 
  onClick, 
  disabled = false 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
```

### Component Guidelines
- ✅ **Function declarations**: Use `function` keyword, not arrow functions
- ✅ **Props interface**: Always define interface for component props
- ✅ **Default parameters**: Use default parameters instead of defaultProps
- ✅ **Explicit children**: Use `React.ReactNode` for children prop
- ✅ **Memo optimization**: Use `React.memo` for expensive components

```typescript
// ✅ Good: Memoized component
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }: Props) {
  // Expensive calculations here
  return <div>{/* rendered content */}</div>;
});
```

## 🎨 Tailwind CSS v4 Rules

### Styling Approach
- ✅ **Utility-first**: Use Tailwind utilities primarily
- ✅ **Component classes**: Create component classes for repeated patterns
- ✅ **Responsive design**: Mobile-first approach
- ✅ **Dark mode**: Support both light and dark themes

### Class Organization
```typescript
// ✅ Good: Organized class names
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className={`
      // Layout
      flex flex-col
      // Spacing
      p-6 gap-4
      // Styling
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-lg shadow-sm
      // Responsive
      md:p-8 md:gap-6
    `}>
      {children}
    </div>
  );
}
```

### Custom CSS Components
```css
/* Only when Tailwind utilities aren't sufficient */
@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors;
  }
}
```

## 🗄️ State Management with Zustand

### Store Structure
```typescript
interface UserStore {
  // State
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  // Initial state
  user: null,
  isLoading: false,
  error: null,

  // Actions
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.login(credentials);
      set({ user, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  },

  logout: () => {
    set({ user: null });
    // Clear any persisted data
  },

  clearError: () => set({ error: null }),
}));
```

### Store Guidelines
- ✅ **Slice pattern**: Organize stores by feature/domain
- ✅ **Loading states**: Always handle loading states
- ✅ **Error handling**: Proper error state management
- ✅ **Type safety**: Fully typed stores and actions
- ✅ **Persist middleware**: Use for user preferences only

## 🪝 Custom Hooks Rules

### Hook Structure
```typescript
// ✅ Good: Custom hook with proper typing
interface UseApiOptions<T> {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

function useApi<T>(
  url: string, 
  options: UseApiOptions<T> = {}
): {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!options.enabled) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      options.onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [url, options.enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
```

### Hook Guidelines
- ✅ **Descriptive names**: Start with `use` prefix
- ✅ **Return objects**: Return objects instead of arrays for clarity
- ✅ **Dependency arrays**: Careful with useEffect dependencies
- ✅ **Cleanup**: Always cleanup subscriptions/timers

## 🌐 API Integration

### Service Structure
```typescript
// services/authService.ts
class AuthService {
  private baseUrl = import.meta.env.VITE_API_URL;

  async login(credentials: LoginCredentials): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  async logout(): Promise<void> {
    // Logout logic
  }
}

export const authService = new AuthService();
```

## 🔧 Development Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "preview": "vite preview",
    "test": "vitest",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\""
  }
}
```

## ✅ Frontend Checklist

### Before Committing
- [ ] TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Components properly typed
- [ ] Responsive design tested
- [ ] Accessibility considerations
- [ ] Performance optimizations applied

### Code Review Focus
- [ ] Component reusability
- [ ] State management efficiency
- [ ] Proper error boundaries
- [ ] Loading states handled
- [ ] SEO considerations
- [ ] Bundle size impact

## 🚀 Quick Commands

```bash
# Development
npm run dev                  # Start development server
npm run type-check          # Check TypeScript
npm run lint                # Lint code
npm run format              # Format code

# Testing
npm run test                # Run tests
npm run test:watch          # Run tests in watch mode

# Building
npm run build               # Build for production
npm run preview             # Preview production build
```

---

**Remember**: Follow these guidelines for consistent, maintainable React development with modern tooling. 