import React from 'react';
import { Plus, Search, Filter, Star, Calendar, ChevronRight } from 'lucide-react';

export default function Staff() {
  return (
    <div>
      return (
      <div className="trainer-page-layout">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              <span className="vibrant-text">Elite</span> Trainer Corps
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Performance analytics and resource allocation for Octane Fit City
              training staff.
            </p>
          </div>
          <button
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Plus size={18} /> Onboard Trainer
          </button>
        </div>

        <div className="card-grid" style={{ marginBottom: "2.5rem" }}>
          <div className="card">
            <div className="card-title">Active Trainers</div>
            <div className="card-value">24</div>
            <div
              style={{
                color: "var(--success)",
                fontSize: "0.85rem",
                marginTop: "5px",
              }}
            >
              4 currently in session
            </div>
          </div>
          <div
            className="card"
            style={{ borderLeft: "4px solid var(--accent-secondary)" }}
          >
            <div className="card-title">Retainer Rate</div>
            <div className="card-value">92%</div>
            <div
              style={{
                color: "var(--accent-secondary)",
                fontSize: "0.85rem",
                marginTop: "5px",
              }}
            >
              Client satisfaction focus
            </div>
          </div>
          <div
            className="card"
            style={{ background: "rgba(56, 189, 248, 0.05)" }}
          >
            <div className="card-title">Sessions Today</div>
            <div className="card-value">118</div>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                marginTop: "5px",
              }}
            >
              Peak hours: 6 AM - 10 AM
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>
                Trainer Directory
              </h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  className="search-box"
                  style={{
                    background: "var(--bg-tertiary)",
                    padding: "5px 12px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Search size={14} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Search..."
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "0.75rem",
                      color: "var(--text-primary)",
                      outline: "none",
                    }}
                  />
                </div>
                <button
                  className="btn btn-outline"
                  style={{ padding: "5px", borderRadius: "8px" }}
                >
                  <Filter size={14} />
                </button>
              </div>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Trainer</th>
                    <th>Expertise</th>
                    <th>Clients</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Karan Sharma",
                      major: "Bodybuilding",
                      count: "18",
                      rating: "4.9",
                      initial: "K",
                    },
                    {
                      name: "Meera Iyer",
                      major: "Yoga & Pilates",
                      count: "12",
                      rating: "5.0",
                      initial: "M",
                    },
                    {
                      name: "John Doe",
                      major: "HIIT Specialist",
                      count: "22",
                      rating: "4.7",
                      initial: "J",
                    },
                    {
                      name: "Sarah Khan",
                      major: "Nutritionist",
                      count: "30",
                      rating: "4.8",
                      initial: "S",
                    },
                  ].map((trainer, i) => (
                    <tr key={i}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              background: "var(--bg-tertiary)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "10px",
                              fontWeight: "800",
                            }}
                          >
                            {trainer.initial}
                          </div>
                          <div
                            style={{ fontSize: "0.85rem", fontWeight: "600" }}
                          >
                            {trainer.name}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className="badge badge-trainer"
                          style={{ fontSize: "0.65rem" }}
                        >
                          {trainer.major}
                        </span>
                      </td>
                      <td style={{ fontWeight: "700" }}>{trainer.count}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            color: "#fbbf24",
                            fontWeight: "800",
                          }}
                        >
                          <Star size={12} fill="#fbbf24" /> {trainer.rating}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Calendar size={18} color="var(--accent-primary)" /> Daily
              Schedule
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                {
                  time: "06:00 AM",
                  event: "Morning Power Shred",
                  trainer: "Karan S.",
                  location: "Studio A",
                },
                {
                  time: "07:30 AM",
                  event: "Zen Yoga Flow",
                  trainer: "Meera I.",
                  location: "Rooftop",
                },
                {
                  time: "09:00 AM",
                  event: "Crossfit Intensity",
                  trainer: "John D.",
                  location: "Main Floor",
                },
                {
                  time: "05:00 PM",
                  event: "Weight Loss Seminar",
                  trainer: "Sarah K.",
                  location: "Lounge",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    padding: "12px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderLeft:
                      i === 0 ? "4px solid var(--accent-primary)" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "800",
                        color: "var(--accent-primary)",
                        minWidth: "60px",
                      }}
                    >
                      {item.time}
                    </div>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "0.9rem" }}>
                        {item.event}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {item.trainer} • {item.location}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      );
    </div>
  );
}
