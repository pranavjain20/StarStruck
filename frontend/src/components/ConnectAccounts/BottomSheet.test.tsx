import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BottomSheet } from "./BottomSheet";

describe("BottomSheet", () => {
  const defaultProps = {
    serviceName: "GitHub",
    brandColor: "#333",
    onClose: vi.fn(),
    onSubmit: vi.fn(),
  };

  it("renders with service name", () => {
    render(<BottomSheet {...defaultProps} />);
    expect(screen.getByText("Connect GitHub")).toBeInTheDocument();
  });

  it("connect button is disabled when input is empty", () => {
    render(<BottomSheet {...defaultProps} />);
    const button = screen.getByRole("button", { name: "Connect" });
    expect(button).toBeDisabled();
  });

  it("calls onSubmit with trimmed value", async () => {
    const onSubmit = vi.fn();
    render(<BottomSheet {...defaultProps} onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("@username");
    await userEvent.type(input, "  testuser  ");
    await userEvent.click(screen.getByRole("button", { name: "Connect" }));

    expect(onSubmit).toHaveBeenCalledWith("testuser");
  });

  it("calls onClose when cancel clicked", async () => {
    const onClose = vi.fn();
    render(<BottomSheet {...defaultProps} onClose={onClose} />);

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("submits on Enter key", async () => {
    const onSubmit = vi.fn();
    render(<BottomSheet {...defaultProps} onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("@username");
    await userEvent.type(input, "testuser{Enter}");

    expect(onSubmit).toHaveBeenCalledWith("testuser");
  });
});
