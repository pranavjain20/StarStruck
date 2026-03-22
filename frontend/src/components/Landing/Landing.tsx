import type { CSSProperties } from "react";

const FONT_FAMILY = "'DM Sans', system-ui, -apple-system, sans-serif";
const FONT_MONO = "'JetBrains Mono', 'SF Mono', monospace";

interface LandingProps {
  onCreateProfile: () => void;
  onTryDemo: () => void;
}

export function Landing({ onCreateProfile, onTryDemo }: LandingProps) {
  const page: CSSProperties = {
    minHeight: "100vh",
    background: "#381F7D",
    fontFamily: FONT_FAMILY,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const frame: CSSProperties = {
    width: 390,
    maxWidth: "100vw",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 32px",
    boxSizing: "border-box",
    textAlign: "center",
  };

  const tagline: CSSProperties = {
    fontSize: 17,
    fontWeight: 400,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.6,
    margin: "16px 0 0",
    maxWidth: 300,
  };

  const subtitle: CSSProperties = {
    fontSize: 13,
    fontWeight: 400,
    fontFamily: FONT_MONO,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: 0.5,
    margin: "12px 0 48px",
  };

  const primaryBtn: CSSProperties = {
    width: "100%",
    height: 48,
    borderRadius: 24,
    border: "none",
    background: "#BB97FF",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    fontFamily: FONT_FAMILY,
    letterSpacing: 0.5,
    cursor: "pointer",
    marginBottom: 14,
  };

  const secondaryBtn: CSSProperties = {
    width: "100%",
    height: 48,
    borderRadius: 24,
    border: "1px solid rgba(187,151,255,0.4)",
    background: "transparent",
    color: "#BB97FF",
    fontSize: 15,
    fontWeight: 600,
    fontFamily: FONT_FAMILY,
    letterSpacing: 0.5,
    cursor: "pointer",
  };

  return (
    <div style={page}>
      <div style={frame}>
        <img
          src="/Star (7).png"
          alt="StarStruck"
          style={{ width: 120, height: 120 }}
        />
        <p style={tagline}>
          AI-powered dating profiles built from your real online presence.
        </p>
        <p style={subtitle}>
          connect. analyze. match.
        </p>

        <div style={{ width: "100%", maxWidth: 280 }}>
          <button style={primaryBtn} onClick={onCreateProfile}>
            Create Your Profile
          </button>
          <button style={secondaryBtn} onClick={onTryDemo}>
            Try Demo
          </button>
        </div>

        <p style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.2)",
          marginTop: 32,
        }}>
          No sign-up required
        </p>
      </div>
    </div>
  );
}
