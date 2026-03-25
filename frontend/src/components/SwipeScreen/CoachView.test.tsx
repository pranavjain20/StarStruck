import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("../../services/api", () => ({
  API_BASE: "http://test",
}));

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// jsdom doesn't implement scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
});

import { CoachView, CoachChatView } from "./CoachView";
import { MATCHES } from "./constants";

describe("CoachView (match list)", () => {
  it("renders all matches", () => {
    render(<CoachView userName="Alex" analysisData={null} onSelectMatch={vi.fn()} />);

    for (const m of MATCHES) {
      expect(screen.getByText(new RegExp(m.name))).toBeInTheDocument();
    }
  });

  it("shows heading and description", () => {
    render(<CoachView userName="Alex" analysisData={null} onSelectMatch={vi.fn()} />);
    expect(screen.getByText("Dating Coach")).toBeInTheDocument();
    expect(screen.getByText(/personalized advice/)).toBeInTheDocument();
  });

  it("calls onSelectMatch when a match is clicked", async () => {
    const onSelect = vi.fn();
    render(<CoachView userName="Alex" analysisData={null} onSelectMatch={onSelect} />);

    await userEvent.click(screen.getByText(/Luna/));
    expect(onSelect).toHaveBeenCalledWith(MATCHES[0]);
  });
});

describe("CoachChatView", () => {
  const match = MATCHES[0]; // Luna

  it("shows match name in header", () => {
    render(
      <CoachChatView match={match} userName="Alex" analysisData={null} onBack={vi.fn()} />,
    );
    expect(screen.getByText(`Coaching for ${match.name}`)).toBeInTheDocument();
  });

  it("shows suggested questions", () => {
    render(
      <CoachChatView match={match} userName="Alex" analysisData={null} onBack={vi.fn()} />,
    );
    expect(screen.getByText("What should we talk about?")).toBeInTheDocument();
    expect(screen.getByText("Give me a conversation starter")).toBeInTheDocument();
    expect(screen.getByText(`What do ${match.name} and I have in common?`)).toBeInTheDocument();
  });

  it("sends message and displays reply", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reply: "Talk about jazz vinyl collections!" }),
    });

    render(
      <CoachChatView match={match} userName="Alex" analysisData={null} onBack={vi.fn()} />,
    );

    const input = screen.getByPlaceholderText("Ask Cupid...");
    await userEvent.type(input, "What should I wear?");
    await userEvent.click(screen.getByRole("button", { name: "" })); // send button (icon only)

    // User message should appear
    expect(screen.getByText("What should I wear?")).toBeInTheDocument();

    // Wait for reply
    await waitFor(() => {
      expect(screen.getByText("Talk about jazz vinyl collections!")).toBeInTheDocument();
    });
  });

  it("calls onBack when back button clicked", async () => {
    const onBack = vi.fn();
    render(
      <CoachChatView match={match} userName="Alex" analysisData={null} onBack={onBack} />,
    );

    await userEvent.click(screen.getByText("←"));
    expect(onBack).toHaveBeenCalled();
  });

  it("handles API error gracefully", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    render(
      <CoachChatView match={match} userName="Alex" analysisData={null} onBack={vi.fn()} />,
    );

    const input = screen.getByPlaceholderText("Ask Cupid...");
    await userEvent.type(input, "Help me{Enter}");

    await waitFor(() => {
      expect(screen.getByText(/couldn't connect/)).toBeInTheDocument();
    });
  });
});
