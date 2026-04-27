import pytest
from backend.src.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_health():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "resilient"

def test_list_plans():
    response = client.get("/api/v1/plans")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["criticality"] == "Tier-0"

def test_failover_execution():
    failover_payload = {
        "plan_id": "PLAN-AZ-CORE-001",
        "initiator_id": "ADM-01",
        "reason": "Regional Outage UKS",
        "mode": "LIVE"
    }
    response = client.post("/api/v1/failover/execute", json=failover_payload)
    assert response.status_code == 202
    assert response.json()["status"] == "PROCESSING"
