Kaizen AI

AI agents that discover operational inefficiencies and build custom solutions on-the-fly

Hackathon Project | Built in 4 hours

## Overview
Kaizen AI analyzes company operations through natural language and automatically:

Discovers hidden inefficiencies in workflows
Generates custom AI agents tailored to fix specific problems
Simulates before/after improvements with measurable business impact

Key Innovation: An LLM dynamically builds agents for each discovered problem - no pre-built catalog, every solution is custom-generated.

## Features

Natural Language Input: Describe your company in plain text
Automated Analysis: AI identifies optimization opportunities
Dynamic Agent Generation: LLM creates custom agents in real-time
Visual Simulation: Before/after comparison showing agents at work
Impact Metrics: ROI calculations and business value quantification

## Architecture
Company Description → Problem Analysis → LLM Agent Generation → Simulation → Impact Report
Backend API

POST /analyze - Discovers problems from company description
POST /generate-agents - LLM builds custom agent specifications
POST /simulate - Runs before/after comparison with generated agents

Frontend Flow

Input Page (company description)
Analysis Page (discovered problems)
Generation Page (watch agents being built)
Simulation Page (before/after comparison)
Impact Page (business metrics & ROI)

## Quick Start
Backend Setup
bashcd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
Frontend Setup
bashcd frontend
npm install
npm start
Environment Variables
bash# Create .env file in backend/
ANTHROPIC_API_KEY=your_key_here
# or
OPENAI_API_KEY=your_key_here
```

---

## Team

| Role | Member(s) | Responsibilities |
|------|-----------|------------------|
| **Frontend Dev** | Yuki & Jonathan | React app, API integration, UI flow |
| **UI/UX Design** | Sissi | Design system, agent generation visuals |
| **Backend + AI** | Valli | FastAPI, LLM integration, agent generation logic |

---

## Tech Stack

**Frontend**
- React
- CSS/Tailwind
- Fetch API

**Backend**
- Python 3.9+
- FastAPI
- Claude API / OpenAI API

**Deployment**
- Frontend: Vercel/Netlify
- Backend: Render/Railway

---

## Development Timeline

### Hour 1: Foundation
- Backend: FastAPI setup + analyze endpoint
- Frontend: React setup + input page
- Design: System definition + icons

### Hour 2: Core Features
- Backend: LLM agent generation logic
- Frontend: Analysis results page
- Design: Problem cards + generation animation

### Hour 3: Integration
- Backend: Simulation endpoint
- Frontend: Agent generation view + simulation
- Design: Visual implementation

### Hour 4: Polish
- All: Bug fixes, demo video, documentation

---

## Demo Flow

**Example Input:**
```
"Tokyo logistics company, 5 trucks, 2 warehouses, 
using Excel for routing, high fuel costs"
System Output:

Problems Found: Route inefficiency ($1.2K/month), Fuel waste ($2.1K/month)
Agents Generated: Custom RouteOptimizer + FuelManager agents
Impact: 47% fuel savings, 3hrs → 15min planning time

## Success Criteria
Must Have:

- Problem discovery from text input
- LLM generates custom agent specs
- Visual agent generation process
- Before/after simulation
- Business impact metrics

Nice to Have:

Stream generation in real-time
Show generated agent code
Multiple demo scenarios
Export results

## Judging Alignment

Technical: Dynamic LLM-based agent generation vs static templates
Business: Truly custom solutions, scales to any industry
Creative: AI building AI - self-service problem → solution pipeline
Beautiful: Clear visualization of generation process

## License
MIT

## Contributing
This is a hackathon project. Feel free to fork and experiment!

Built with love by Team Kaizen
