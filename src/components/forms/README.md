# Small Engine Repair Onboarding Form

A comprehensive, multi-step onboarding form for small engine repair services, built with React Hook Form, TypeScript, and Tailwind CSS.

## Features

- **Multi-step form** with progress indicator
- **Form validation** using Zod schema validation
- **Responsive design** that works on all device sizes
- **Accessible** form controls with proper ARIA attributes
- **Animated transitions** between form steps
- **Form persistence** with auto-save functionality
- **Dynamic fields** with conditional logic
- **Input masking** for phone numbers, dates, etc.
- **Comprehensive error handling** with user-friendly messages
- **Loading states** for form submission
- **Tested** with unit and integration tests

## Components

### Main Components

- `OnboardingForm` - The main form component that orchestrates the multi-step flow
- `FormStepper` - Displays the progress through form steps
- `LoadingOverlay` - Shows a loading state during form submission

### Form Sections

1. **Contact Information**
   - Name, email, phone
   - Mailing address
   - Billing address (optional)
   - Preferred contact method

2. **Equipment Information**
   - Equipment type (with "Other" option)
   - Make/Brand
   - Model number
   - Serial number
   - Year of manufacture

3. **Problem Description**
   - Detailed problem description
   - When the problem started
   - Recent maintenance history
   - Last service date

4. **Service Details**
   - Service type (in-shop or mobile)
   - Preferred service date/time
   - Equipment location
   - Special instructions

5. **Agreements**
   - Diagnostic fee acknowledgment
   - Service authorization
   - Terms and conditions acceptance

## Hooks

- `useOnboardingForm` - Manages form state and submission
- `useFormField` - Simplifies field registration and validation
- `useMultiStepForm` - Handles multi-step form navigation
- `useFormPersistence` - Saves form data to localStorage

## Utilities

- **Form Validation** - Comprehensive validation schemas with Zod
- **Error Handling** - Consistent error messages and display
- **Input Masking** - For phone numbers, dates, etc.
- **Form Persistence** - Auto-save and resume functionality
- **Field Arrays** - For dynamic form sections

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn
- Supabase account (for backend)

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

Update the environment variables in `.env.local` with your Supabase credentials.

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

### Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

Run end-to-end tests with Playwright:

```bash
npm run test:e2e
# or
yarn test:e2e
```

## Form Submission Flow

1. User fills out the form step by step
2. Form data is validated at each step
3. On submission:
   - Show loading state
   - Send data to the API endpoint
   - Handle success/error responses
   - Redirect to thank you page on success
   - Show error message and allow retry on failure

## Form State Management

The form uses React Hook Form for state management with the following key features:

- **Form Context** - Shared state across form components
- **Controlled Components** - For complex form controls
- **Optimized Rerenders** - With proper memoization
- **Dependent Fields** - With proper subscription management

## Accessibility

The form includes the following accessibility features:

- Semantic HTML5 elements
- Proper ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management
- Error messages associated with form controls
- Sufficient color contrast

## Browser Support

The form is tested and works in:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome for Android

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT

## Acknowledgements

- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Heroicons](https://heroicons.com/)
