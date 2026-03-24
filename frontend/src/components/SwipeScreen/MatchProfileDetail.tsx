import { COLORS, SURFACE, FONT_FAMILY, FONT_MONO } from "../ConnectAccounts/styles";
import type { MatchProfile } from "./types";
import { LockOpenIcon } from "./icons";
import { SectionLabel, Pill } from "./ui";

export function MatchProfileDetail({ match, onPlanDate, onBack }: { match: MatchProfile; onPlanDate: () => void; onBack: () => void }) {
  const pub = match.publicProfile;
  const priv = match.privateProfile;
  const xref = match.crossref;

  return (
    <div className="card-enter" style={{ flex: 1, overflowY: "auto", padding: "0 20px 24px" }}>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 16px", color: SURFACE.textSecondary, fontSize: 13, fontWeight: 600, fontFamily: FONT_FAMILY }}
      >
        ← Back
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <img src={match.photo} alt={match.name} style={{ width: 64, height: 64, borderRadius: 32, objectFit: "cover" }} />
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: SURFACE.textPrimary }}>{match.name}, {match.age}</div>
        </div>
      </div>

      <button
        onClick={onPlanDate}
        style={{
          width: "100%",
          height: 52,
          borderRadius: 26,
          border: "none",
          background: COLORS.softPeriwinkle,
          color: "#fff",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: FONT_FAMILY,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          cursor: "pointer",
          marginBottom: 8,
        }}
      >
        Plan a Date
      </button>

      <SectionLabel text="Public Profile" />
      <div style={{
        background: "#5823A5",
        border: `1px solid ${SURFACE.border}`,
        borderRadius: 20,
        padding: 20,
      }}>
        <div style={{ fontSize: 15, color: SURFACE.textPrimary, fontStyle: "italic", lineHeight: 1.5, marginBottom: 16 }}>
          &ldquo;{pub.vibe}&rdquo;
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {pub.tags.map((t) => <Pill key={t} text={t} color={COLORS.softPeriwinkle} />)}
        </div>
        <div style={{ fontSize: 12, fontFamily: FONT_MONO, color: SURFACE.textSecondary }}>
          Schedule: <span style={{ color: COLORS.brightAmber, fontWeight: 600 }}>{pub.schedule}</span>
        </div>
      </div>

      <SectionLabel text="Private Profile — unlocked" icon={<LockOpenIcon size={12} color={COLORS.limeCreem} />} />
      <div style={{
        background: "#5823A5",
        border: `1px solid ${COLORS.limeCreem}20`,
        borderRadius: 20,
        padding: 20,
      }}>
        <div style={{ fontSize: 14, color: SURFACE.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
          {priv.summary}
        </div>

        <div style={{ fontSize: 11, fontFamily: FONT_MONO, color: SURFACE.textTertiary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Traits</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {priv.traits.map((t) => <Pill key={t} text={t} color={COLORS.limeCreem} />)}
        </div>

        <div style={{ fontSize: 11, fontFamily: FONT_MONO, color: SURFACE.textTertiary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Interests</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {priv.interests.map((t) => <Pill key={t} text={t} color={COLORS.brightAmber} />)}
        </div>

        <div style={{ fontSize: 11, fontFamily: FONT_MONO, color: SURFACE.textTertiary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Deep Cuts</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {priv.deepCuts.map((cut) => (
            <div key={cut} style={{
              fontSize: 13,
              color: SURFACE.textSecondary,
              background: `${COLORS.softPeriwinkle}0D`,
              padding: "10px 14px",
              borderRadius: 12,
              lineHeight: 1.4,
            }}>
              {cut}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontFamily: FONT_MONO, color: SURFACE.textTertiary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Data Sources</div>
        <div style={{ display: "flex", gap: 8 }}>
          {priv.dataSources.map((src) => (
            <span key={src} style={{
              fontSize: 11,
              fontFamily: FONT_MONO,
              fontWeight: 600,
              color: COLORS.softPeriwinkle,
              background: `${COLORS.softPeriwinkle}15`,
              padding: "4px 12px",
              borderRadius: 10,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              {src}
            </span>
          ))}
        </div>
      </div>

      <SectionLabel text="Shared" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {xref.shared.map((item) => (
          <div key={item.title} style={{
            background: `${COLORS.limeCreem}0D`,
            border: `1px solid ${COLORS.limeCreem}20`,
            borderRadius: 16,
            padding: "14px 16px",
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.limeCreem, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: SURFACE.textSecondary, lineHeight: 1.5 }}>{item.description}</div>
          </div>
        ))}
      </div>

      <SectionLabel text="Complementary" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {xref.complementary.map((item) => (
          <div key={item.title} style={{
            background: `${COLORS.brightAmber}0D`,
            border: `1px solid ${COLORS.brightAmber}20`,
            borderRadius: 16,
            padding: "14px 16px",
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.brightAmber, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: SURFACE.textSecondary, lineHeight: 1.5 }}>{item.description}</div>
          </div>
        ))}
      </div>

      <SectionLabel text="Tension Points" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {xref.tensionPoints.map((item) => (
          <div key={item.title} style={{
            background: `${COLORS.hotFuchsia}0D`,
            border: `1px solid ${COLORS.hotFuchsia}20`,
            borderRadius: 16,
            padding: "14px 16px",
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.hotFuchsia, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: SURFACE.textSecondary, lineHeight: 1.5 }}>{item.description}</div>
          </div>
        ))}
      </div>

      <SectionLabel text="Citations" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {xref.citations.map((cite) => (
          <div key={cite} style={{
            fontSize: 12,
            fontFamily: FONT_MONO,
            color: SURFACE.textTertiary,
            background: `${COLORS.softPeriwinkle}0D`,
            padding: "10px 14px",
            borderRadius: 12,
            borderLeft: `3px solid ${COLORS.softPeriwinkle}40`,
            lineHeight: 1.4,
          }}>
            {cite}
          </div>
        ))}
      </div>
    </div>
  );
}
