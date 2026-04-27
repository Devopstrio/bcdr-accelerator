import React from 'react';

const BCDRHome = () => {
    return (
        <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '40px', minHeight: '100vh' }}>
            <h1 style={{ color: '#38bdf8' }}>BCDR Master Command Center</h1>
            <p style={{ color: '#94a3b8' }}>Global Business Continuity Orchestration</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '40px' }}>
                <div style={{ padding: '20px', backgroundColor: '#1e293b', borderLeft: '4px solid #10b981', borderRadius: '8px' }}>
                    <h3>Region Health: US East</h3>
                    <p style={{ color: '#10b981' }}>● OPERATIONAL</p>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#1e293b', borderLeft: '4px solid #10b981', borderRadius: '8px' }}>
                    <h3>Region Health: US West</h3>
                    <p style={{ color: '#10b981' }}>● OPERATIONAL</p>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#1e293b', borderLeft: '4px solid #f59e0b', borderRadius: '8px' }}>
                    <h3>Drill Status</h3>
                    <p style={{ color: '#f59e0b' }}>Scheduled for Sat (2h)</p>
                </div>
            </div>

            <div style={{ marginTop: '40px', backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px' }}>
                <h2>Active Discovery & Dependency Map</h2>
                <div style={{ height: '300px', border: '1px dashed #475569', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                    <p style={{ color: '#64748b' }}>[Dependency Graph Visualization Engine - Loading...]</p>
                </div>
            </div>
        </div>
    );
};

export default BCDRHome;
