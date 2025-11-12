# Kaizen AI Backend

FastAPI backend with LLM-powered agent generation.

## Setup

1. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your API key(s)
   ```

4. **Run server:**
   ```bash
   uvicorn main:app --reload
   ```
   Server runs at: http://localhost:8000

## API Endpoints

### `POST /analyze`
Analyzes company description, identifies problems.

**Request:**
```json
{
  "description": "Tokyo logistics company, 5 trucks, 2 warehouses, using Excel for routing"
}
```

**Response:**
```json
{
  "company_summary": "...",
  "problems": [
    {
      "title": "Inefficient Route Planning",
      "description": "...",
      "impact": "...",
      "cost_per_month": 1200.0
    }
  ]
}
```

### `POST /generate-agents`
Generates custom AI agents for identified problems.

**Request:** (pass the response from `/analyze`)

**Response:**
```json
{
  "agents": [
    {
      "name": "RouteOptimizer",
      "description": "...",
      "capabilities": ["..."],
      "target_problem": "Inefficient Route Planning"
    }
  ]
}
```

### `POST /simulate`
Simulates before/after impact with agents.

**Request:**
```json
{
  "problems": [...],
  "agents": [...]
}
```

**Response:**
```json
{
  "metrics": [
    {
      "metric_name": "Planning Time",
      "before": "3 hours",
      "after": "15 minutes",
      "improvement_percent": 91.7
    }
  ],
  "total_monthly_savings": 4500.0,
  "roi_description": "..."
}
```

## Testing

Test with curl:
```bash
# Test analyze endpoint
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"description": "Tokyo logistics company, 5 trucks, using Excel"}'
```
