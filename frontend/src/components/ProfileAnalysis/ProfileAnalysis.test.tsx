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
  it("shows loading state initially in real mode", () => {
    mockAnalyze.mockReturnValue(new Promise(() => {})); // never resolves

    render(
      <ProfileAnalysis
        identifiers={{ github: "testuser" }}
        demoMode={false}
        onContinue={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    expect(screen.getByText("Step 3 of 4")).toBeInTheDocument();
  });

  it("demo mode completes without API call", async () => {
    const onContinue = vi.fn();

    render(
      <ProfileAnalysis
        identifiers={{}}
        demoMode={true}
        onContinue={onContinue}
        onBack={vi.fn()}
      />,
    );

    // In demo mode, analyzing finishes after 3s
    // The analysis should complete and show results
    await waitFor(
      () => {
        expect(screen.getByText("Continue")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Should NOT have called the real API
    expect(mockAnalyze).not.toHaveBeenCalled();
  });

  it("calls analyzeUser with identifiers in real mode", async () => {
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
        demoMode={false}
        onContinue={vi.fn()}
        onBack={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(mockAnalyze).toHaveBeenCalledWith({ github: "testuser", instagram: null });
    });

    // After API response, bio should be displayed
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
        demoMode={false}
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
