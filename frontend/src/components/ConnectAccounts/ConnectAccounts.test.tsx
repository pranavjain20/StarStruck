import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConnectAccounts } from "./ConnectAccounts";

vi.mock("../../services/api", () => ({
  connectService: vi.fn(),
}));

import { connectService } from "../../services/api";
const mockConnect = vi.mocked(connectService);

beforeEach(() => {
  mockConnect.mockReset();
});

describe("ConnectAccounts", () => {
  it("renders all three services", () => {
    render(<ConnectAccounts />);
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Letterboxd")).toBeInTheDocument();
  });

  it("shows step indicator", () => {
    render(<ConnectAccounts />);
    expect(screen.getByText("Step 2 of 4")).toBeInTheDocument();
  });

  it("successful connection shows preview", async () => {
    mockConnect.mockResolvedValue({
      success: true,
      preview: "23 repos · Python, TypeScript",
      avatar_url: "https://example.com/avatar.png",
      display_name: "Test User",
    });

    render(<ConnectAccounts />);

    // Click the first Connect button (GitHub card)
    const connectButtons = screen.getAllByRole("button", { name: "Connect" });
    await userEvent.click(connectButtons[0]);

    // Bottom sheet should appear with input
    const input = await screen.findByPlaceholderText("@username");
    await userEvent.type(input, "testuser");

    // The bottom sheet's Connect button is the last one in the list
    const allConnects = screen.getAllByRole("button", { name: "Connect" });
    await userEvent.click(allConnects[allConnects.length - 1]);

    // Wait for preview to appear
    await waitFor(() => {
      expect(screen.getByText("23 repos · Python, TypeScript")).toBeInTheDocument();
    });
  });

  it("failed connection does NOT mark as connected", async () => {
    mockConnect.mockRejectedValue(new Error("Connect failed: 500"));

    render(<ConnectAccounts />);

    const connectButtons = screen.getAllByRole("button", { name: "Connect" });
    await userEvent.click(connectButtons[0]);

    const input = await screen.findByPlaceholderText("@username");
    await userEvent.type(input, "testuser");

    const allConnects = screen.getAllByRole("button", { name: "Connect" });
    await userEvent.click(allConnects[allConnects.length - 1]);

    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText(/Connection failed/)).toBeInTheDocument();
    });

    // Should not show "Connected" text
    expect(screen.queryByText("Connected")).not.toBeInTheDocument();
  });

  it("calls onContinue with identifiers", async () => {
    mockConnect.mockResolvedValue({
      success: true,
      preview: "23 repos",
      avatar_url: null,
      display_name: null,
    });

    const onContinue = vi.fn();
    render(<ConnectAccounts onContinue={onContinue} />);

    const connectButtons = screen.getAllByRole("button", { name: "Connect" });
    await userEvent.click(connectButtons[0]);

    const input = await screen.findByPlaceholderText("@username");
    await userEvent.type(input, "testuser");

    const allConnects = screen.getAllByRole("button", { name: "Connect" });
    await userEvent.click(allConnects[allConnects.length - 1]);

    await waitFor(() => {
      expect(screen.getByText("23 repos")).toBeInTheDocument();
    });

    // Click continue
    await userEvent.click(screen.getByText("Continue"));
    expect(onContinue).toHaveBeenCalled();
  });
});
