import { COLORS, SURFACE, FONT_MONO } from "../ConnectAccounts/styles";
import type { AnalysisData } from "./types";
import { PersonIcon } from "./icons";

export function ProfileView({ userName, userPhoto, analysisData, identifiers }: {
  userName?: string;
  userPhoto?: string | null;
  analysisData?: AnalysisData | null;
  identifiers?: Record<string, string | null>;
}) {
  const findingColors = [COLORS.limeCreem, COLORS.brightAmber, COLORS.softPeriwinkle];

  return (
    <div style={{ padding: "0 24px", flex: 1, overflowY: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
        <div style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          background: `${COLORS.softPeriwinkle}1A`,
          border: `2px solid ${COLORS.softPeriwinkle}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
          overflow: "hidden",
        }}>
          {userPhoto ? (
            <img src={userPhoto} alt={userName || "Profile"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <PersonIcon size={40} color={COLORS.softPeriwinkle} />
          )}
        </div>
        <span style={{ fontSize: 22, fontWeight: 800, color: SURFACE.textPrimary }}>{userName || "Your Profile"}</span>
        <span style={{ fontSize: 13, color: SURFACE.textSecondary, marginTop: 4 }}>StarStruck Member</span>
      </div>

      {analysisData ? (
        <>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            color: SURFACE.textTertiary,
            textTransform: "uppercase",
            fontFamily: FONT_MONO,
            letterSpacing: 1.5,
            marginBottom: 10,
          }}>
            Your Vibe
          </div>
          <div style={{
            background: "#5823A5",
            border: `1px solid ${SURFACE.border}`,
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 15, color: SURFACE.textPrimary, fontStyle: "italic", lineHeight: 1.5 }}>
              &ldquo;{analysisData.bio}&rdquo;
            </div>
          </div>

          {analysisData.findings.length > 0 && (
            <>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: SURFACE.textTertiary,
                textTransform: "uppercase",
                fontFamily: FONT_MONO,
                letterSpacing: 1.5,
                marginBottom: 10,
                marginTop: 4,
              }}>
                Key Findings
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {analysisData.findings.map((f, i) => {
                  const accentColor = findingColors[Math.min(i, findingColors.length - 1)];
                  return (
                    <div
                      key={f.label + i}
                      className="card-enter"
                      style={{
                        background: "#5823A5",
                        border: `1px solid ${SURFACE.border}`,
                        borderRadius: 16,
                        padding: "14px 16px 14px 20px",
                        position: "relative",
                        overflow: "hidden",
                        animationDelay: `${i * 0.05}s`,
                      }}
                    >
                      <div style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        background: accentColor,
                        borderRadius: "16px 0 0 16px",
                      }} />
                      <div style={{
                        fontSize: 10,
                        fontFamily: FONT_MONO,
                        fontWeight: 700,
                        color: accentColor,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        marginBottom: 4,
                      }}>
                        {f.label}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: SURFACE.textPrimary, marginBottom: 4 }}>
                        {f.value}
                      </div>
                      <div style={{ fontSize: 13, color: SURFACE.textSecondary, lineHeight: 1.5 }}>
                        {f.detail}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {analysisData.tags.length > 0 && (
            <>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: SURFACE.textTertiary,
                textTransform: "uppercase",
                fontFamily: FONT_MONO,
                letterSpacing: 1.5,
                marginBottom: 10,
                marginTop: 4,
              }}>
                Vibe Tags
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {analysisData.tags.map((tag) => (
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
            </>
          )}

          {identifiers && Object.entries(identifiers).some(([, v]) => v != null) && (
            <>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: SURFACE.textTertiary,
                textTransform: "uppercase",
                fontFamily: FONT_MONO,
                letterSpacing: 1.5,
                marginBottom: 10,
                marginTop: 4,
              }}>
                Connected Accounts
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {Object.entries(identifiers)
                  .filter(([, v]) => v != null)
                  .map(([service]) => (
                    <span key={service} style={{
                      fontSize: 11,
                      fontFamily: FONT_MONO,
                      fontWeight: 600,
                      color: COLORS.limeCreem,
                      background: `${COLORS.limeCreem}15`,
                      padding: "4px 12px",
                      borderRadius: 10,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}>
                      {service}
                    </span>
                  ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          color: SURFACE.textSecondary,
          fontSize: 14,
          lineHeight: 1.6,
        }}>
          Connect your accounts and run the AI analysis to see your full profile here.
        </div>
      )}
    </div>
  );
}
