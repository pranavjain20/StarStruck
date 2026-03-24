import { COLORS, SURFACE, FONT_MONO } from "../ConnectAccounts/styles";
import type { DateEntry } from "./types";
import { DATES } from "./constants";

export function DatesView({ onSelectDate }: { onSelectDate: (d: DateEntry) => void }) {
  const statusColors = {
    confirmed: COLORS.limeCreem,
    pending: COLORS.brightAmber,
  };

  return (
    <div style={{ padding: "0 16px", flex: 1, overflowY: "auto" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: SURFACE.textPrimary, margin: "0 0 20px 8px" }}>Upcoming Dates</h2>
      {DATES.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: SURFACE.textSecondary, fontSize: 15 }}>
          No dates planned yet
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DATES.map((d, i) => (
            <div
              key={d.name + d.date}
              className="card-enter"
              onClick={() => d.status === "confirmed" && onSelectDate(d)}
              style={{
                background: "#5823A5",
                border: `1px solid ${SURFACE.border}`,
                borderRadius: 20,
                padding: 18,
                display: "flex",
                gap: 14,
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                cursor: d.status === "confirmed" ? "pointer" : "default",
                animationDelay: `${i * 0.06}s`,
                opacity: d.status === "confirmed" ? 1 : 0.7,
              }}
            >
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 3,
                background: statusColors[d.status],
                borderRadius: "20px 0 0 20px",
              }} />
              <img
                src={d.photo}
                alt={d.name}
                style={{ width: 52, height: 52, borderRadius: 26, objectFit: "cover", flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: SURFACE.textPrimary, marginBottom: 3 }}>
                  Date with {d.name}
                </div>
                <div style={{ fontSize: 13, color: SURFACE.textSecondary, marginBottom: 4 }}>
                  {d.place}
                </div>
                <div style={{ fontSize: 12, fontFamily: FONT_MONO, color: SURFACE.textTertiary }}>
                  {d.date}
                </div>
              </div>
              <span style={{
                fontSize: 10,
                fontFamily: FONT_MONO,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: statusColors[d.status],
                background: `${statusColors[d.status]}1A`,
                padding: "4px 10px",
                borderRadius: 10,
                flexShrink: 0,
              }}>
                {d.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
