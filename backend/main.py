from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json
from dotenv import load_dotenv
import anthropic
import openai

# Load environment variables
load_dotenv()

app = FastAPI(title="Kaizen AI API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI clients
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY") # we're not using anthropic rn
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

anthropic_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None
openai_client = openai.OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None


# Request/Response Models
class CompanyInput(BaseModel):
    description: str


class Problem(BaseModel):
    title: str
    description: str
    impact: str
    cost_per_month: float


class AnalysisResponse(BaseModel):
    problems: List[Problem]
    company_summary: str


class Agent(BaseModel):
    name: str
    description: str
    capabilities: List[str]
    target_problem: str


class GenerateAgentsResponse(BaseModel):
    agents: List[Agent]


class SimulationMetric(BaseModel):
    metric_name: str
    before: str
    after: str
    improvement_percent: float


class SimulationResponse(BaseModel):
    metrics: List[SimulationMetric]
    total_monthly_savings: float
    roi_description: str


# Helper function to call LLM
def call_llm(prompt: str, system_prompt: str = "") -> str:
    """Call available LLM (Anthropic preferred, fallback to OpenAI)"""

    if anthropic_client:
        try:
            message = anthropic_client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=4096,
                system=system_prompt if system_prompt else "You are a business analyst AI.",
                messages=[{"role": "user", "content": prompt}]
            )
            return message.content[0].text
        except Exception as e:
            print(f"Anthropic API error: {e}")
            if not openai_client:
                raise HTTPException(status_code=500, detail=f"LLM API error: {str(e)}")

    if openai_client:
        try:
            messages = []
            if system_prompt:
                messages.append({"role": "system", "content": system_prompt})
            messages.append({"role": "user", "content": prompt})

            response = openai_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=4096
            )
            return response.choices[0].message.content
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

    raise HTTPException(status_code=500, detail="No LLM API key configured")


# Endpoints
@app.get("/")
def read_root():
    return {
        "message": "Kaizen AI API",
        "version": "1.0",
        "endpoints": ["/analyze", "/generate-agents", "/simulate"]
    }


@app.post("/analyze", response_model=AnalysisResponse)
def analyze_company(input_data: CompanyInput):
    """
    Analyzes company description and identifies operational inefficiencies.
    """

    system_prompt = """You are an expert business operations analyst. Your job is to identify
    operational inefficiencies, bottlenecks, and improvement opportunities in companies."""

    prompt = f"""Analyze this company description and identify 2-4 specific operational problems
    that could be improved with AI automation or optimization.

Company Description:
{input_data.description}

For each problem, provide:
1. A clear title
2. Detailed description of the issue
3. Business impact explanation
4. Estimated monthly cost (in dollars)

Also provide a brief company summary.

Respond in this EXACT JSON format (no markdown, just raw JSON):
{{
    "company_summary": "brief summary here",
    "problems": [
        {{
            "title": "Problem Title",
            "description": "Detailed description",
            "impact": "Business impact explanation",
            "cost_per_month": 1200.00
        }}
    ]
}}"""

    try:
        response_text = call_llm(prompt, system_prompt)

        # Parse JSON response
        # Clean markdown if present
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()

        data = json.loads(response_text)
        return AnalysisResponse(**data)

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse LLM response: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate-agents", response_model=GenerateAgentsResponse)
def generate_agents(analysis: AnalysisResponse):
    """
    Generates custom AI agents tailored to solve identified problems.
    This is the core innovation: LLM dynamically creates agents.
    """

    system_prompt = """You are an AI architect that designs custom AI agents. For each business
    problem, you create a specialized agent with specific capabilities to solve that problem."""

    problems_text = "\n\n".join([
        f"Problem {i+1}: {p.title}\n{p.description}\nImpact: {p.impact}"
        for i, p in enumerate(analysis.problems)
    ])

    prompt = f"""Design custom AI agents to solve these business problems. Each agent should be
    specifically tailored to its target problem.

PROBLEMS:
{problems_text}

For each problem, create one specialized agent with:
1. A descriptive name (e.g., "RouteOptimizer", "InventoryPredictor")
2. Clear description of what it does
3. 3-5 specific capabilities
4. Which problem it targets

Respond in this EXACT JSON format (no markdown, just raw JSON):
{{
    "agents": [
        {{
            "name": "AgentName",
            "description": "What this agent does",
            "capabilities": ["capability 1", "capability 2", "capability 3"],
            "target_problem": "Problem Title it solves"
        }}
    ]
}}"""

    try:
        response_text = call_llm(prompt, system_prompt)

        # Parse JSON response
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()

        data = json.loads(response_text)
        return GenerateAgentsResponse(**data)

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse LLM response: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/simulate", response_model=SimulationResponse)
def simulate_impact(combined_data: dict):
    """
    Simulates before/after scenarios with the generated agents.
    Shows measurable business impact.
    """

    # Extract problems and agents from combined data
    problems = combined_data.get("problems", [])
    agents = combined_data.get("agents", [])

    system_prompt = """You are a business impact analyst. You calculate the measurable improvements
    that AI agents would bring to business operations."""

    problems_text = "\n".join([f"- {p.get('title')}: {p.get('impact')}" for p in problems])
    agents_text = "\n".join([f"- {a.get('name')}: {a.get('description')}" for a in agents])

    prompt = f"""Calculate the business impact of implementing these AI agents to solve the problems.

PROBLEMS:
{problems_text}

AGENTS:
{agents_text}

Provide:
1. 3-5 key metrics showing before/after comparison
2. Percentage improvement for each
3. Total monthly savings estimate
4. ROI description

Respond in this EXACT JSON format (no markdown, just raw JSON):
{{
    "metrics": [
        {{
            "metric_name": "Planning Time",
            "before": "3 hours/day",
            "after": "15 minutes/day",
            "improvement_percent": 91.7
        }}
    ],
    "total_monthly_savings": 4500.00,
    "roi_description": "Brief explanation of overall ROI and payback period"
}}"""

    try:
        response_text = call_llm(prompt, system_prompt)

        # Parse JSON response
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()

        data = json.loads(response_text)
        return SimulationResponse(**data)

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse LLM response: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
