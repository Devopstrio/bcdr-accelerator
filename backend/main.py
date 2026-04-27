from fastapi import FastAPI, HTTPException
from .orchestrator.engine import BCDROrchestrator, FailoverPlan, RecoveryStep

app = FastAPI(title="BCDR Accelerator API")
orchestrator = BCDROrchestrator()

@app.get("/api/v1/health")
async def health():
    return {"status": "operational"}

@app.post("/api/v1/failover/trigger")
async def trigger_failover(plan: FailoverPlan):
    """Triggers an official failover event."""
    # In production, this would require multi-signature approval
    result = await orchestrator.execute_plan(plan)
    if result["status"] == "FAILED":
        raise HTTPException(status_code=500, detail=result)
    return result

@app.get("/api/v1/plans/sample")
async def get_sample_plan():
    return FailoverPlan(
        app_name="Customer-Portal-Global",
        tier=0,
        steps=[
            RecoveryStep(step_id=1, name="Verify Secondary Connectivity", action="NETWORK_CHECK", target_resource="vnet-secondary"),
            RecoveryStep(step_id=2, name="Promote PostgreSQL Standby", action="DB_PROMOTION", target_resource="psql-global-standby"),
            RecoveryStep(step_id=3, name="Update DNS Traffic Manager", action="DNS_SWAP", target_resource="tm-customer-portal")
        ]
    )
