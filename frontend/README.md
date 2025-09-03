# Dev-Blog Frontend

A modern, responsive frontend for the Dev-Blog platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern UI**: Built with Next.js 14 App Router
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Authentication**: JWT-based user authentication
- **Blog Management**: Create, edit, and delete blog posts
- **Search & Filtering**: Advanced post search and tag filtering
- **Performance**: Optimized with Next.js built-in optimizations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React Context API

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see backend README)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API calls
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## Development

The project uses:
- **App Router**: Next.js 14's new routing system
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: For type safety and better development experience
- **ESLint**: Code quality and consistency

## Building for Production

```bash
npm run build
npm run start
```

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Ensure responsive design works on all screen sizes
4. Test authentication flows thoroughly

