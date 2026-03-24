import { useState } from "react";
import { COLORS, SURFACE, FONT_FAMILY, FONT_MONO } from "../ConnectAccounts/styles";
import { StarIcon } from "./SwipeCard";
import type { MatchPhase } from "./types";
import { MATCHES, ANALYSIS_MSGS } from "./constants";

export function MatchesView({ initialPlanIdx, onClearInitial }: { initialPlanIdx?: number | null; onClearInitial?: () => void }) {
  const [phase, setPhase] = useState<MatchPhase>(initialPlanIdx != null ? "confirm" : "grid");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(initialPlanIdx ?? null);

  const backToGrid = () => {
    setPhase("grid");
    setSelectedIdx(null);
    onClearInitial?.();
  };
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const selected = selectedIdx !== null ? MATCHES[selectedIdx] : null;

  const handleMatchClick = (idx: number) => {
    setSelectedIdx(idx);
    setPhase("confirm");
  };

  const startPlanning = () => {
    setPhase("analyzing");
    setAnalysisStep(0);
    setAnalysisProgress(0);

    const stepDuration = 2000 / ANALYSIS_MSGS.length;
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev >= ANALYSIS_MSGS.length - 1 ? prev : prev + 1));
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    setTimeout(() => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setPhase("suggestion");
    }, 2500);
  };

  if (phase === "confirm" && selected) {
    return (
      <div className="card-enter" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
        <img
          src={selected.photo}
          alt={selected.name}
          style={{ width: 96, height: 96, borderRadius: 48, objectFit: "cover", marginBottom: 20, border: `2px solid ${COLORS.softPeriwinkle}40` }}
        />
        <div style={{ fontSize: 22, fontWeight: 800, color: SURFACE.textPrimary, marginBottom: 6 }}>
          {selected.name}, {selected.age}
        </div>
        <div style={{ fontSize: 16, color: SURFACE.textSecondary, marginBottom: 28, textAlign: "center" }}>
          Plan a date with {selected.name}?
        </div>
        <button
          onClick={startPlanning}
          style={{
            width: "100%",
            maxWidth: 260,
            height: 48,
            borderRadius: 24,
            border: "none",
            background: COLORS.softPeriwinkle,
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: FONT_FAMILY,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          Plan Date
        </button>
        <button
          onClick={backToGrid}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: SURFACE.textTertiary,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: FONT_FAMILY,
            padding: 8,
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  if (phase === "analyzing") {
    return (
      <div style={{ padding: "0 24px", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <img
          src={selected!.photo}
          alt={selected!.name}
          style={{ width: 72, height: 72, borderRadius: 36, objectFit: "cover", marginBottom: 20, border: `2px solid ${COLORS.softPeriwinkle}40` }}
        />
        <div style={{ fontSize: 18, fontWeight: 700, color: SURFACE.textPrimary, marginBottom: 6 }}>
          Planning a date with {selected!.name}
        </div>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          background: `${COLORS.softPeriwinkle}1A`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px auto",
        }}>
          {[
            <svg key="music" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={COLORS.softPeriwinkle} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
            <svg key="film" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={COLORS.softPeriwinkle} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /><line x1="17" y1="17" x2="22" y2="17" /></svg>,
            <svg key="map" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={COLORS.softPeriwinkle} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
            <svg key="wine" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={COLORS.softPeriwinkle} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8 2h8l-1 9a5 5 0 0 1-10 0L8 2z" /><path d="M12 15v7" /><path d="M8 22h8" /></svg>,
            <StarIcon size={28} color={COLORS.softPeriwinkle} />,
          ][analysisStep % 5]}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: SURFACE.textSecondary, marginBottom: 12, textAlign: "center" }}>
          {ANALYSIS_MSGS[analysisStep]}
        </div>
        <div style={{ width: "100%", maxWidth: 200, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${analysisProgress}%`, borderRadius: 2, background: `linear-gradient(90deg, ${COLORS.softPeriwinkle}, ${COLORS.limeCreem})`, transition: "width 0.1s linear" }} />
        </div>
      </div>
    );
  }

  if (phase === "suggestion" && selected) {
    const s = selected.suggestion;
    return (
      <div className="card-enter" style={{ padding: "0 20px", flex: 1, overflowY: "auto" }}>
        <button
          onClick={backToGrid}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 16px", color: SURFACE.textSecondary, fontSize: 13, fontWeight: 600, fontFamily: FONT_FAMILY }}
        >
          ← Back to matches
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <img src={selected.photo} alt={selected.name} style={{ width: 56, height: 56, borderRadius: 28, objectFit: "cover" }} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: SURFACE.textPrimary }}>{selected.name}, {selected.age}</div>
          </div>
        </div>

        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: SURFACE.textSecondary,
          textTransform: "uppercase",
          fontFamily: FONT_MONO,
          letterSpacing: 1,
          marginBottom: 10,
        }}>
          Shared Interests
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {selected.sharedTags.map((tag) => (
            <span key={tag} style={{
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.softPeriwinkle,
              background: `${COLORS.softPeriwinkle}1A`,
              padding: "5px 12px",
              borderRadius: 20,
              border: `1px solid ${COLORS.softPeriwinkle}30`,
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: SURFACE.textSecondary,
          textTransform: "uppercase",
          fontFamily: FONT_MONO,
          letterSpacing: 1,
          marginBottom: 10,
        }}>
          Date Suggestion
        </div>
        <div style={{
          background: "#5823A5",
          border: `1px solid ${SURFACE.border}`,
          borderRadius: 20,
          padding: 20,
          position: "relative",
          overflow: "hidden",
          marginBottom: 16,
        }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: COLORS.limeCreem, borderRadius: "20px 0 0 20px" }} />
          <div style={{ fontSize: 17, fontWeight: 700, color: SURFACE.textPrimary, marginBottom: 4 }}>{s.place}</div>
          <div style={{ fontSize: 13, color: SURFACE.textSecondary, marginBottom: 6 }}>{s.address}</div>
          <div style={{ fontSize: 12, fontFamily: FONT_MONO, color: COLORS.brightAmber, marginBottom: 12 }}>{s.date}</div>
          <div style={{ fontSize: 14, color: SURFACE.textSecondary, lineHeight: 1.5, fontStyle: "italic" }}>"{s.reason}"</div>
        </div>

        <button
          onClick={() => setPhase("sent")}
          style={{
            width: "100%",
            height: 48,
            borderRadius: 24,
            border: "none",
            background: COLORS.softPeriwinkle,
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: FONT_FAMILY,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          Send Invite
        </button>
      </div>
    );
  }

  if (phase === "sent" && selected) {
    return (
      <div className="card-enter" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
        <div className="check-enter" style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: SURFACE.textPrimary, marginBottom: 8 }}>Invite Sent!</div>
        <div style={{ fontSize: 14, color: SURFACE.textSecondary, textAlign: "center", maxWidth: 260, marginBottom: 28 }}>
          {selected.name} will get your date invite for {selected.suggestion?.place || "your date spot"}
        </div>
        <button
          onClick={backToGrid}
          style={{
            height: 44,
            padding: "0 32px",
            borderRadius: 22,
            border: `1px solid ${COLORS.softPeriwinkle}`,
            background: "transparent",
            color: COLORS.softPeriwinkle,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: FONT_FAMILY,
            cursor: "pointer",
          }}
        >
          Back to Matches
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 16px", flex: 1, overflowY: "auto" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: SURFACE.textPrimary, margin: "0 0 20px 8px" }}>Matches</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {MATCHES.map((m, i) => (
          <div
            key={m.name}
            className="card-enter"
            onClick={() => handleMatchClick(i)}
            style={{
              borderRadius: 20,
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              animationDelay: `${i * 0.06}s`,
            }}
          >
            <img
              src={m.photo}
              alt={m.name}
              style={{ width: "100%", aspectRatio: "3 / 4", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "32px 12px 12px",
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
                {m.name}, {m.age}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
