-- BCDR Accelerator Enterprise Resilience Schema
-- Version: 1.0.0
-- Target: PostgreSQL

CREATE TABLE IF NOT EXISTS tenants (
    tenant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
    app_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(tenant_id),
    name VARCHAR(255) NOT NULL,
    criticality VARCHAR(50) DEFAULT 'Tier-1',
    primary_region VARCHAR(100),
    secondary_region VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS dependencies (
    dep_id BIGSERIAL PRIMARY KEY,
    parent_app_id UUID REFERENCES applications(app_id),
    child_app_id UUID REFERENCES applications(app_id),
    dependency_type VARCHAR(100), -- Hard, Soft, Async
    boot_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS recovery_plans (
    plan_id VARCHAR(100) PRIMARY KEY,
    app_id UUID REFERENCES applications(app_id),
    rto_target_minutes INTEGER,
    rpo_target_minutes INTEGER,
    is_validated BOOLEAN DEFAULT FALSE,
    last_drill_at TIMESTAMP WITH TIME ZONE,
    plan_metadata JSONB
);

CREATE TABLE IF NOT EXISTS failover_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id VARCHAR(100) REFERENCES recovery_plans(plan_id),
    initiated_by VARCHAR(255),
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS', -- SUCCESS, FAILED, HALTED
    actual_rto_minutes INTEGER,
    audit_log_url TEXT
);

CREATE TABLE IF NOT EXISTS drill_history (
    drill_id BIGSERIAL PRIMARY KEY,
    plan_id VARCHAR(100) REFERENCES recovery_plans(plan_id),
    performed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    result VARCHAR(100),
    readiness_score FLOAT
);

CREATE INDEX idx_app_criticality ON applications(criticality);
CREATE INDEX idx_plan_validation ON recovery_plans(is_validated);
CREATE INDEX idx_event_status ON failover_events(status);
