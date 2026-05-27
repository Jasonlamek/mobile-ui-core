# MobiCore MBaaS - Implementation Plan

Building a comprehensive Mobile Backend-as-a-Service (MBaaS) dashboard. This app provides mobile developers with a central hub to manage their app's backend services like database, auth, and analytics.

## Core Features
- **Overview Dashboard**: Real-time stats on DAU, API calls, and error rates.
- **Data Browser**: NoSQL-style document viewer for app data.
- **User Management**: Auth logs and user tables.
- **Edge Functions**: Code editor interface for serverless backend logic.
- **Push Center**: Campaign manager for mobile notifications.

## Technical Stack
- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS (Glassmorphism + Dark Mode)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Components**: Shadcn UI (Button, Card, Input, Tabs, etc.)

## File Structure
- `src/App.tsx`: Layout shell and navigation routing.
- `src/components/Dashboard.tsx`: Analytics and status cards.
- `src/components/Database.tsx`: Data browser interface.
- `src/components/Auth.tsx`: User management.
- `src/components/Functions.tsx`: Serverless function editor.
- `src/components/Notifications.tsx`: Push campaign manager.
- `src/hooks/useMobiData.ts`: Mock data store for the platform.
