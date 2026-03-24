import { useState, useCallback } from "react";
import { COLORS, SURFACE, FONT_FAMILY, FONT_MONO } from "../ConnectAccounts/styles";
import { API_BASE } from "../../services/api";
import type { DateEntry, AnalysisData } from "./types";
import { LockOpenIcon, CupidIcon, SendIcon } from "./icons";
import { SectionLabel, Pill } from "./ui";

export function DateDetailView({ dateEntry, userName, onBack, analysisData }: { dateEntry: DateEntry; userName: string; onBack: () => void; analysisData?: AnalysisData | null }) {
  const match = dateEntry.matchRef;
  const pub = match.publicProfile;
  const priv = match.privateProfile;
  const xref = match.crossref;

  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const chatEndRef = useCallback((node: HTMLDivElement | null) => {
    if (node) node.scrollIntoView({ behavior: "smooth" });
  }, []);

  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMsg = { role: "user" as const, content: text };
    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/coach/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_a_name: userName || "User",
          user_b_name: match.name,
          user_a_dossier: analysisData ? {
            public: {
              vibe: analysisData.bio,
              tags: analysisData.tags,
              schedule_pattern: "flexible",
            },
            private: {
              summary: analysisData.bio,
              traits: analysisData.tags.slice(0, 3),
              interests: analysisData.findings.map(f => f.value),
              deep_cuts: analysisData.findings.map(f => f.detail),
            },
          } : {
            public: {
              vibe: "Curious and creative with eclectic taste",
              tags: ["tech", "music", "film", "culture"],
              schedule_pattern: "flexible",
            },
            private: {
              summary: "Someone exploring new connections and shared interests.",
              traits: ["curious", "creative", "open-minded"],
              interests: ["music", "film", "technology"],
              deep_cuts: ["Always looking for the next great recommendation"],
            },
          },
          user_b_dossier: {
            public: {
              vibe: pub.vibe,
              tags: pub.tags,
              schedule_pattern: pub.schedule,
            },
            private: {
              summary: priv.summary,
              traits: priv.traits,
              interests: priv.interests,
              deep_cuts: priv.deepCuts,
            },
          },
          crossref: {
            shared: xref.shared.map((s) => ({ signal: s.title, detail: s.description, source: "both" })),
            complementary: xref.complementary.map((c) => ({ signal: c.title, detail: c.description, source: "both" })),
            tension_points: xref.tensionPoints.map((t) => ({ signal: t.title, detail: t.description, source: "both" })),
            citations: xref.citations,
          },
          message: text,
          history: newMessages.slice(0, -1).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't connect right now. Try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (showChat) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${SURFACE.border}`,
        }}>
          <button
            onClick={() => setShowChat(false)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: SURFACE.textSecondary, fontSize: 13, fontWeight: 600, fontFamily: FONT_FAMILY }}
          >
            ←
          </button>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            background: `${COLORS.hotFuchsia}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <CupidIcon size={18} color={COLORS.hotFuchsia} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: SURFACE.textPrimary }}>Cupid</div>
            <div style={{ fontSize: 11, fontFamily: FONT_MONO, color: COLORS.hotFuchsia, letterSpacing: 0.5 }}>AI Date Coach</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
          {chatMessages.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <CupidIcon size={40} color={`${COLORS.hotFuchsia}60`} />
              <div style={{ fontSize: 16, fontWeight: 700, color: SURFACE.textPrimary, marginTop: 16, marginBottom: 8 }}>
                Ask Cupid anything
              </div>
              <div style={{ fontSize: 13, color: SURFACE.textSecondary, lineHeight: 1.5, maxWidth: 260, margin: "0 auto 20px" }}>
                Get personalized advice for your date with {match.name}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                {[
                  "What should we talk about?",
                  "Give me a conversation starter",
                  "Any red flags to watch for?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInputValue(q); }}
                    style={{
                      background: `${COLORS.softPeriwinkle}0D`,
                      border: `1px solid ${COLORS.softPeriwinkle}20`,
                      borderRadius: 16,
                      padding: "10px 16px",
                      color: COLORS.softPeriwinkle,
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: FONT_FAMILY,
                      cursor: "pointer",
                      maxWidth: 260,
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {chatMessages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: 10,
              }}
            >
              {msg.role === "assistant" && (
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  background: `${COLORS.hotFuchsia}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginRight: 8,
                  marginTop: 2,
                }}>
                  <CupidIcon size={14} color={COLORS.hotFuchsia} />
                </div>
              )}
              <div style={{
                maxWidth: "75%",
                padding: "12px 16px",
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: msg.role === "user" ? COLORS.softPeriwinkle : "#5823A5",
                color: msg.role === "user" ? "#fff" : SURFACE.textPrimary,
                fontSize: 14,
                lineHeight: 1.5,
                fontFamily: FONT_FAMILY,
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                background: `${COLORS.hotFuchsia}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <CupidIcon size={14} color={COLORS.hotFuchsia} />
              </div>
              <div style={{
                padding: "12px 16px",
                borderRadius: "18px 18px 18px 4px",
                background: "#5823A5",
                color: SURFACE.textTertiary,
                fontSize: 14,
                fontFamily: FONT_MONO,
              }}>
                thinking...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div style={{
          padding: "12px 16px 20px",
          borderTop: `1px solid ${SURFACE.border}`,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}>
          <input
            type="text"
            placeholder="Ask Cupid..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 22,
              border: `1px solid ${SURFACE.border}`,
              background: "#5823A5",
              color: SURFACE.textPrimary,
              fontSize: 14,
              fontFamily: FONT_FAMILY,
              padding: "0 18px",
              outline: "none",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              border: "none",
              background: inputValue.trim() && !isLoading ? COLORS.hotFuchsia : `${COLORS.hotFuchsia}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: inputValue.trim() && !isLoading ? "pointer" : "default",
              flexShrink: 0,
            }}
          >
            <SendIcon size={18} color={inputValue.trim() && !isLoading ? "#fff" : "rgba(255,255,255,0.3)"} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-enter" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 24px" }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 16px", color: SURFACE.textSecondary, fontSize: 13, fontWeight: 600, fontFamily: FONT_FAMILY }}
        >
          ← Back
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
          <img src={match.photo} alt={match.name} style={{ width: 64, height: 64, borderRadius: 32, objectFit: "cover" }} />
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: SURFACE.textPrimary }}>{match.name}, {match.age}</div>
            <div style={{ fontSize: 12, fontFamily: FONT_MONO, color: COLORS.limeCreem, marginTop: 2 }}>
              {dateEntry.place} · {dateEntry.date}
            </div>
          </div>
        </div>

        <SectionLabel text="Public Profile" />
        <div style={{
          background: "#5823A5",
          border: `1px solid ${SURFACE.border}`,
          borderRadius: 20,
          padding: 20,
        }}>
          <div style={{ fontSize: 15, color: SURFACE.textPrimary, fontStyle: "italic", lineHeight: 1.5, marginBottom: 16 }}>
            "{pub.vibe}"
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {pub.tags.map((t) => <Pill key={t} text={t} color={COLORS.softPeriwinkle} />)}
          </div>
          <div style={{ fontSize: 12, fontFamily: FONT_MONO, color: SURFACE.textSecondary }}>
            Schedule: <span style={{ color: COLORS.brightAmber, fontWeight: 600 }}>{pub.schedule}</span>
          </div>
        </div>

        <SectionLabel text="Private Profile \u2014 unlocked" icon={<LockOpenIcon size={12} color={COLORS.limeCreem} />} />
        <div style={{
          background: "#5823A5",
          border: `1px solid ${COLORS.limeCreem}20`,
          borderRadius: 20,
          padding: 20,
        }}>
          <div style={{ fontSize: 14, color: SURFACE.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>{priv.summary}</div>
          <div style={{ fontSize: 11, fontFamily: FONT_MONO, color: SURFACE.textTertiary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Traits</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {priv.traits.map((t) => <Pill key={t} text={t} color={COLORS.limeCreem} />)}
          </div>
          <div style={{ fontSize: 11, fontFamily: FONT_MONO, color: SURFACE.textTertiary, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Interests</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {priv.interests.map((t) => <Pill key={t} text={t} color={COLORS.brightAmber} />)}
          </div>
        </div>

        <SectionLabel text="Shared" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {xref.shared.map((item) => (
            <div key={item.title} style={{ background: `${COLORS.limeCreem}0D`, border: `1px solid ${COLORS.limeCreem}20`, borderRadius: 16, padding: "14px 16px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.limeCreem, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: SURFACE.textSecondary, lineHeight: 1.5 }}>{item.description}</div>
            </div>
          ))}
        </div>

        <SectionLabel text="Complementary" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {xref.complementary.map((item) => (
            <div key={item.title} style={{ background: `${COLORS.brightAmber}0D`, border: `1px solid ${COLORS.brightAmber}20`, borderRadius: 16, padding: "14px 16px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.brightAmber, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: SURFACE.textSecondary, lineHeight: 1.5 }}>{item.description}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowChat(true)}
          style={{
            width: "100%",
            height: 52,
            borderRadius: 26,
            border: "none",
            background: COLORS.hotFuchsia,
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: FONT_FAMILY,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            cursor: "pointer",
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <CupidIcon size={20} color="#fff" />
          Ask Cupid
        </button>
      </div>
    </div>
  );
}
