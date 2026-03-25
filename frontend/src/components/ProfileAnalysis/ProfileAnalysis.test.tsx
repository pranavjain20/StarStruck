import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ProfileAnalysis } from "./ProfileAnalysis";

vi.mock("../../services/api", () => ({
  analyzeUser: vi.fn(),
  API_BASE: "http://test",
}));

import { analyzeUser } from "../../services/api";
const mockAnalyze = vi.mocked(analyzeUser);

beforeEach(() => {
  mockAnalyze.mockReset();
});

describe("ProfileAnalysis", () => {
  it("shows loading state initially", () => {
    mockAnalyze.mockReturnValue(new Promise(() => {})); // never resolves

    render(
      <ProfileAnalysis
        identifiers={{ github: "testuser" }}
        onContinue={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    expect(screen.getByText("Step 3 of 4")).toBeInTheDocument();
  });

  it("calls analyzeUser with identifiers", async () => {
    mockAnalyze.mockResolvedValue({
      bio: "Night owl coder who loves jazz",
      tags: ["tech", "music", "film"],
      findings: [{ label: "Top Language", value: "Python", detail: "Used in 80% of repos" }],
      schedule: "night owl",
      dossier: {},
    });

    render(
      <ProfileAnalysis
        identifiers={{ github: "testuser", instagram: null }}
        onContinue={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(mockAnalyze).toHaveBeenCalledWith({ github: "testuser", instagram: null });
    });

    await waitFor(() => {
      expect(screen.getByText(/Night owl coder/)).toBeInTheDocument();
    });
  });

  it("displays findings from API response", async () => {
    mockAnalyze.mockResolvedValue({
      bio: "Test bio",
      tags: ["coding"],
      findings: [
        { label: "Top Language", value: "Python", detail: "Used in most repos" },
        { label: "Film Taste", value: "Arthouse", detail: "Rates obscure films highly" },
      ],
      schedule: "mixed",
      dossier: {},
    });

    render(
      <ProfileAnalysis
        identifiers={{ github: "testuser" }}
        onContinue={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("Python")).toBeInTheDocument();
      expect(screen.getByText("Arthouse")).toBeInTheDocument();
    });
  });
});
