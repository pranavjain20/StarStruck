import type { ReactNode } from "react";
import { SURFACE, FONT_MONO } from "../ConnectAccounts/styles";

export function SectionLabel({ text, icon }: { text: string; icon?: ReactNode }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      fontWeight: 700,
      color: SURFACE.textTertiary,
      textTransform: "uppercase",
      fontFamily: FONT_MONO,
      letterSpacing: 1.5,
      marginBottom: 10,
      marginTop: 24,
    }}>
      {icon}
      {text}
    </div>
  );
}

export function Pill({ text, color }: { text: string; color: string }) {
  return (
    <span style={{
      fontSize: 12,
      fontWeight: 600,
      color,
      background: `${color}1A`,
      padding: "5px 12px",
      borderRadius: 20,
      border: `1px solid ${color}30`,
    }}>
      {text}
    </span>
  );
}
