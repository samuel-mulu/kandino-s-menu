# Hotel Menu App 🍽️

A modern, mobile-first hotel menu application built with Next.js, React, and TypeScript. Browse menu items by category, search for specific dishes, view detailed item information, and provide feedback.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/amdeasme7-gmailcoms-projects/v0-hotel-menu-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/ehhScm9h4BS)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Development](#development)

## 🎯 Overview

Hotel Menu App is a responsive web application designed for hotels and restaurants to showcase their menu items. The app provides an intuitive interface for customers to browse menu items organized by meal categories (Breakfast, Lunch, Dinner, and Treats), search for specific dishes, view detailed information including ingredients and nutritional information, and interact with the menu through ratings and feedback.

The application is built with a mobile-first approach, ensuring an excellent user experience across all device sizes.

### Live Demo

Your project is live at: **[https://vercel.com/amdeasme7-gmailcoms-projects/v0-hotel-menu-app](https://vercel.com/amdeasme7-gmailcoms-projects/v0-hotel-menu-app)**

## ✨ Features

### Core Functionality
- **Category Navigation**: Browse menu items by Breakfast, Lunch, Dinner, and Treats
- **Search Functionality**: Real-time search to filter menu items by name
- **Menu Item Details**: Detailed view with images, descriptions, ingredients, calories, and ratings
- **Similar Items**: Discover related menu items in the same category
- **Popular Items**: Highlighted popular dishes with special indicators

### User Experience
- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Dark/Light Theme Support**: Theme provider for customizable appearance
- **Smooth Navigation**: Bottom navigation bar for easy access to different sections
- **Interactive Components**: Star ratings, feedback modals, and smooth animations
- **Image Optimization**: Next.js Image component for optimized image loading

### Additional Pages
- **Contact Page**: Hotel contact information
- **Info Page**: Additional information about the hotel/restaurant

## 🛠️ Technology Stack

### Core Framework
- **Next.js 16.0.7** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5.0** - Type safety and enhanced developer experience

### Styling & UI
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Comprehensive collection of accessible UI components:
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog
  - Dropdown Menu, Select, Tabs, Toast, Tooltip, and more
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme switching functionality
- **tailwindcss-animate** - Animation utilities

### Forms & Validation
- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Resolver for React Hook Form

### Other Libraries
- **date-fns** - Date utility library
- **recharts** - Composable charting library
- **sonner** - Toast notifications
- **cmdk** - Command menu component
- **@vercel/analytics** - Analytics tracking

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0 or higher recommended)
- **pnpm** (package manager - install via `npm install -g pnpm`)

Alternatively, you can use `npm` or `yarn` if preferred.

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hotel-menu-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   or
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```
   or
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
hotel-menu-app/
├── app/                      # Next.js App Router directory
│   ├── contact/             # Contact page
│   │   └── page.tsx
│   ├── info/                # Info page
│   │   └── page.tsx
│   ├── menu/                # Menu routes
│   │   └── [id]/           # Dynamic menu item detail page
│   │       └── page.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── loading.tsx         # Loading UI
│   └── page.tsx            # Home/Menu page
│
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   │   └── button.tsx
│   ├── bottom-nav.tsx      # Bottom navigation bar
│   ├── category-tabs.tsx   # Category filter tabs
│   ├── feedback-modal.tsx  # Feedback form modal
│   ├── header.tsx          # Page header component
│   ├── menu-card.tsx       # Menu item card
│   ├── menu-grid.tsx       # Menu items grid layout
│   ├── mobile-container.tsx # Mobile layout wrapper
│   ├── search-bar.tsx      # Search input component
│   ├── similar-items.tsx   # Similar items carousel
│   ├── star-rating.tsx     # Star rating component
│   └── theme-provider.tsx  # Theme context provider
│
├── lib/                     # Utility libraries
│   ├── data.ts             # Menu data and helper functions
│   └── utils.ts            # Utility functions
│
├── public/                  # Static assets
│   └── [images]            # Menu item images
│
├── styles/                  # Additional styles
│   └── globals.css
│
├── components.json          # shadcn/ui configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 📜 Available Scripts

### Development
```bash
pnpm dev
# or
npm run dev
```
Starts the development server at [http://localhost:3000](http://localhost:3000) with hot reload enabled.

### Build
```bash
pnpm build
# or
npm run build
```
Creates an optimized production build of the application.

### Start (Production)
```bash
pnpm start
# or
npm start
```
Starts the production server (requires a build first).

### Lint
```bash
pnpm lint
# or
npm run lint
```
Runs ESLint to check for code quality issues.

## ⚙️ Configuration

### Next.js Configuration (`next.config.mjs`)

```javascript
{
  typescript: {
    ignoreBuildErrors: true,  // Set to false for strict type checking
  },
  images: {
    unoptimized: true,  // Configure for your image optimization needs
  }
}
```

### TypeScript Configuration

The project uses TypeScript with strict mode enabled. Path aliases are configured:
- `@/*` maps to the root directory

### Environment Variables

Currently, no environment variables are required. If you need to add API endpoints or other configuration, create a `.env.local` file:

```env
# Example
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 🎨 Customization

### Adding Menu Items

Edit `lib/data.ts` to add, modify, or remove menu items:

```typescript
export const menuItems: MenuItem[] = [
  {
    id: "unique-id",
    name: "Item Name",
    price: 25.0,
    rating: 4.5,
    image: "/path-to-image.jpg",
    category: "breakfast" | "lunch" | "dinner" | "treats",
    description: "Item description",
    ingredients: ["ingredient1", "ingredient2"],
    calories: 500,
    isPopular: true  // Optional
  },
  // ... more items
]
```

### Styling

The project uses Tailwind CSS. Modify `app/globals.css` or component files to customize styles.

### Themes

Theme support is implemented using `next-themes`. Configure themes in `components/theme-provider.tsx`.

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your app will be deployed and live!

### Other Platforms

Next.js apps can be deployed on any platform that supports Node.js:
- **Netlify**: Use the Next.js build preset
- **AWS Amplify**: Supports Next.js out of the box
- **Railway/Render**: Follow their Node.js deployment guides
- **Docker**: Create a Dockerfile based on Node.js

### Build for Production

Before deploying, ensure you've built the project:

```bash
pnpm build
pnpm start
```

## 🔧 Development

### Code Style

The project uses:
- ESLint for code linting
- TypeScript for type safety
- Prettier (if configured) for code formatting

### Adding New Features

1. Create components in the `components/` directory
2. Add new routes in the `app/` directory (App Router)
3. Update menu data in `lib/data.ts`
4. Add utilities in `lib/utils.ts`

### Component Structure

Components follow React best practices:
- Use TypeScript for props typing
- Implement client components with `"use client"` directive when needed
- Server components by default (Next.js App Router)
- Accessible UI components from Radix UI

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This project was built with [v0.app](https://v0.app). To continue development:

1. Continue building your app on: **[https://v0.app/chat/ehhScm9h4BS](https://v0.app/chat/ehhScm9h4BS)**
2. Changes made on v0.app will automatically sync to this repository
3. Vercel will deploy the latest version from this repository

## 📝 License

This project is private. All rights reserved.

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.app)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com)

---

**Note**: This repository stays in sync with your deployed chats on [v0.app](https://v0.app). Any changes you make to your deployed app will be automatically pushed to this repository.
