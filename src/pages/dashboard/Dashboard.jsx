import React from "react";

export default function Dashboard() {
  const stats = [
    { label: "Check-ins Today", value: "842", trend: "+15%", positive: true },
    { label: "Active Subs", value: "3.2k", trend: "+4%", positive: true },
    { label: "Revenue Node", value: "₹24.8L", trend: "+12%", positive: true },
    { label: "Device Health", value: "98%", trend: "-1%", positive: false },
  ];

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
          Network Pulse
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Real-time monitoring for Octane Fit City infrastructure.
        </p>
      </div>

      <div className="card-grid">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="card-title">{stat.label}</div>
            <div className="card-value">{stat.value}</div>
            {stat.trend && (
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "0.85rem",
                  color: stat.positive ? "var(--success)" : "var(--danger)",
                }}
              >
                {stat.trend} from last month
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
