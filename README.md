# Budget Tracker with Gamification

A modern budget tracking application with gamification features, team collaboration, and premium tiers built with React, TypeScript, and Supabase.

## Features

- **Budget Tracking**: Track income and expenses with categorization
- **Gamification**: Earn points and level up by maintaining good financial habits
- **Team Access**: Collaborate with team members on shared budgets
- **Premium Tiers**: Multiple subscription levels with increasing benefits
- **Real-time Sync**: All data synced in real-time with Supabase

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Supabase (Database, Auth, Real-time)
- **Database**: PostgreSQL with Row Level Security

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (already configured)

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
npm install
```

3. Environment variables are already configured in `.env`

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Database Setup

The database schema is managed through Supabase migrations located in `supabase/migrations/`. The schema includes:

- User profiles and authentication
- Budget entries with categories
- Gamification system (points, levels, achievements)
- Team access and ownership
- Premium tier management

## Project Structure

```
├── src/
│   ├── components/       # React components
│   ├── contexts/         # React contexts (Auth, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and Supabase client
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── supabase/
│   └── migrations/      # Database migrations
└── dist/                # Production build output
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Private project - All rights reserved
