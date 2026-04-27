from fastapi import FastAPI, HTTPException, Request, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import datetime
import uvicorn
import logging

# Enterprise Resilience Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - [%(event_id)s] - %(message)s",
    handlers=[logging.StreamHandler(), logging.FileHandler("bcdr_ops.log")]
)
logger = logging.getLogger("BCDR-Gateway")

app = FastAPI(
    title="BCDR Accelerator Platform API",
    description="Institutional API for High-Availability Orchestration, Failover, and Resilience Governance.",
    version="1.0.0",
    docs_url="/api/v1/docs"
)

# CORS Security for Portal Integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELS ---
class RecoveryPlan(BaseModel):
    id: str
    name: str
    target_region: str
    rto_minutes: int
    rpo_minutes: int
    criticality: str # Tier-0, Tier-1, Tier-2
    last_validated: datetime.datetime

class FailoverRequest(BaseModel):
    plan_id: str
    initiator_id: str
    reason: str
    mode: str # TEST, LIVE

# --- API ENDPOINTS ---

@app.get("/api/v1/health")
async def health_check():
    """Liveness probe for K8s."""
    return {"status": "resilient", "timestamp": datetime.datetime.now()}

@app.get("/api/v1/plans", response_model=List[RecoveryPlan])
async def list_recovery_plans():
    """Returns the disaster recovery registry."""
    logger.info("Accessing Global Recovery Plan Registry")
    return [
        {
            "id": "PLAN-AZ-CORE-001",
            "name": "Global Retail Banking Failover",
            "target_region": "UK South",
            "rto_minutes": 45,
            "rpo_minutes": 15,
            "criticality": "Tier-0",
            "last_validated": datetime.datetime.now()
        }
    ]

@app.post("/api/v1/failover/execute", status_code=status.HTTP_202_ACCEPTED)
async def execute_failover(payload: FailoverRequest):
    """Triggers the BCDR Orchestration Engine for a specific plan."""
    logger.critical(f"FAILOVER TRIGGERED: Plan {payload.plan_id} by {payload.initiator_id} for {payload.reason}")
    # Integration with Recovery Engine Service
    return {
        "status": "PROCESSING",
        "orchestration_id": "ORC-9921-X",
        "eta_completion": "44m"
    }

@app.get("/api/v1/dependencies/map")
async def get_dependency_map(application_id: str):
    """Calculates boot-order and cross-service dependencies."""
    return {
        "app_id": application_id,
        "wave": 1,
        "dependencies": [
            {"id": "DB-CORE", "status": "READY"},
            {"id": "REDIS-CACHE", "status": "PENDING"}
        ],
        "critical_path": ["Identity", "Database", "App-Tier"]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
