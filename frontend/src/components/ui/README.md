# UI Components

This directory contains reusable UI components for the Dev-Blog application. All components are built with TypeScript, Tailwind CSS, and follow modern React patterns.

## Components

### Core Components

#### Button
A versatile button component with multiple variants and states.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean

#### Input
Enhanced input component with validation states, password visibility toggle, and error handling.

```tsx
import { Input } from '@/components/ui';

<Input
  name="email"
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  required
/>
```

**Features:**
- Password visibility toggle
- Error states with icons
- Focus states
- Disabled states
- Textarea support

#### Card
Flexible card component with hover effects and interactive states.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui';

<Card hover interactive onClick={handleClick}>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Loading Components

#### LoadingSpinner
Simple loading spinner with customizable size and text.

```tsx
import { LoadingSpinner } from '@/components/ui';

<LoadingSpinner size="lg" text="Loading posts..." />
```

#### LoadingOverlay
Overlay component that shows loading state over existing content.

```tsx
import { LoadingOverlay } from '@/components/ui';

<LoadingOverlay isLoading={loading} text="Saving...">
  <YourContent />
</LoadingOverlay>
```

#### Skeleton
Skeleton loading components for different content types.

```tsx
import { PostCardSkeleton, PostListSkeleton } from '@/components/ui';

<PostListSkeleton />
```

**Available Skeletons:**
- `PostCardSkeleton`
- `PostListSkeleton`
- `PostViewSkeleton`
- `FormSkeleton`

### Error Components

#### ErrorMessage
Styled error message component with different variants.

```tsx
import { ErrorMessage } from '@/components/ui';

<ErrorMessage
  message="Something went wrong"
  variant="error"
  dismissible
  onDismiss={handleDismiss}
/>
```

#### ErrorBoundary
React error boundary component for catching and handling errors.

```tsx
import { ErrorBoundary } from '@/components/ui';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Feedback Components

#### Toast
Toast notification system with context provider.

```tsx
import { ToastProvider, useToastNotifications } from '@/components/ui';

// Wrap your app
<ToastProvider>
  <App />
</ToastProvider>

// Use in components
const { success, error, warning, info } = useToastNotifications();

success('Post created successfully!');
```

#### EmptyState
Component for displaying empty states with optional actions.

```tsx
import { EmptyState } from '@/components/ui';

<EmptyState
  title="No posts found"
  description="Create your first post to get started"
  action={{
    label: 'Create Post',
    onClick: handleCreatePost
  }}
/>
```

## Styling

### CSS Classes

The components use Tailwind CSS with custom utility classes:

- `.line-clamp-1`, `.line-clamp-2`, `.line-clamp-3`, `.line-clamp-4` - Text truncation
- `.hover-lift` - Lift effect on hover
- `.hover-scale` - Scale effect on hover
- `.hover-glow` - Glow effect on hover
- `.focus-ring` - Consistent focus styles
- `.transition-smooth` - Smooth transitions
- `.glass` - Glass morphism effect
- `.gradient-text` - Gradient text effect

### Color System

The components use a consistent color system:

- **Primary**: Blue tones for main actions
- **Secondary**: Gray tones for secondary actions
- **Success**: Green tones for success states
- **Warning**: Yellow tones for warnings
- **Error**: Red tones for errors
- **Accent**: Purple tones for highlights

### Responsive Design

All components are built with mobile-first responsive design:

- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Flexible layouts that adapt to screen size
- Touch-friendly interactions on mobile
- Optimized typography scaling

## Usage Guidelines

1. **Import from index**: Always import from `@/components/ui` for consistency
2. **Use TypeScript**: All components are fully typed
3. **Accessibility**: Components include proper ARIA attributes
4. **Performance**: Components use React.memo where appropriate
5. **Consistency**: Follow the established patterns for new components

## Customization

Components can be customized using:

1. **Props**: Built-in customization options
2. **className**: Additional Tailwind classes
3. **CSS Variables**: For theme customization
4. **Tailwind Config**: For global design system changes

## Examples

### Form with Validation
```tsx
import { Input, Button, ErrorMessage } from '@/components/ui';

const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});

return (
  <form>
    <Input
      name="title"
      label="Post Title"
      value={formData.title}
      onChange={handleChange}
      error={errors.title}
      required
    />
    {errors.general && (
      <ErrorMessage message={errors.general} />
    )}
    <Button type="submit" loading={isSubmitting}>
      Create Post
    </Button>
  </form>
);
```

### Loading States
```tsx
import { LoadingOverlay, PostListSkeleton } from '@/components/ui';

return (
  <LoadingOverlay isLoading={loading} text="Loading posts...">
    {posts.length === 0 ? (
      <PostListSkeleton />
    ) : (
      <PostList posts={posts} />
    )}
  </LoadingOverlay>
);
```

### Error Handling
```tsx
import { ErrorBoundary, ErrorMessage } from '@/components/ui';

return (
  <ErrorBoundary>
    {error && (
      <ErrorMessage
        message={error}
        variant="error"
        dismissible
        onDismiss={() => setError(null)}
      />
    )}
    <YourContent />
  </ErrorBoundary>
);
```
