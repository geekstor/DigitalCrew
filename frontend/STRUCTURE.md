# Frontend Structure Guide

This document explains the organized structure of the Kaizen AI frontend.

## Directory Overview

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Main landing page (placeholder)
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # React components
│   │   └── shared/           # Reusable UI components
│   │       ├── Button.tsx    # Button component with variants
│   │       ├── Card.tsx      # Card wrapper component
│   │       └── LoadingSpinner.tsx  # Loading indicator
│   │
│   ├── lib/                  # Utility functions
│   │   └── api.ts           # API client for backend communication
│   │
│   └── types/               # TypeScript definitions
│       └── index.ts         # Core data types (Problem, Agent, etc.)
│
├── public/                  # Static assets
├── .env.local              # Environment variables (not in git)
├── .env.example            # Environment variables template
└── package.json            # Dependencies and scripts
```

## Component Philosophy

### Separation of Concerns

Components are organized by:
1. **Feature** - Each major feature gets its own directory
2. **Shared** - Reusable components that work across features
3. **Pages** - Top-level route components in `app/`

### Current Status

✅ **Core infrastructure ready**:
- TypeScript types defined
- API client configured
- Shared UI components created
- Development environment running

⏸️ **Waiting for UI design**:
- Feature-specific components removed
- Clean slate for design implementation
- Type definitions preserved for reference

## Adding New Components

When UI designs are ready, create feature-specific directories:

```
components/
├── input/          # Company input form
├── analysis/       # Problem display
├── generation/     # Agent generation view
├── simulation/     # Before/after comparison
└── impact/         # Business metrics
```

## Type Definitions

All TypeScript interfaces are in `src/types/index.ts`:

- `Problem` - Discovered operational issues
- `Agent` - AI agent specifications
- `CompanyDescription` - Input data
- `AnalysisResult` - Analysis output
- `SimulationResult` - Before/after metrics
- `ImpactMetrics` - Business value calculations

## API Client

Located in `src/lib/api.ts`, provides methods for:
- `analyzeCompany(description)` - POST /analyze
- `generateAgents(problems)` - POST /generate-agents
- `runSimulation(agents)` - POST /simulate

## Running the Project

```bash
# Development
cd frontend
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start

# Linting
npm run lint
```

## Next Steps

1. **Wait for UI designs** from Sissi
2. **Implement components** based on design specs
3. **Connect to backend** when API is ready
4. **Test integration** with full workflow

## Notes

- All page components are placeholders until design is ready
- API client is configured but backend endpoints need to be implemented
- Tailwind CSS is configured for rapid styling
- TypeScript strict mode is enabled
