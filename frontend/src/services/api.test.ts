import { describe, it, expect, vi, beforeEach } from "vitest";
import { connectService, analyzeUser, runPipeline } from "./api";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe("connectService", () => {
  it("returns parsed response on success", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, preview: "2 repos · Python" }),
    });

    const result = await connectService("github", "testuser");

    expect(result.success).toBe(true);
    expect(result.preview).toContain("repos");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/connect"),
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });

    await expect(connectService("github", "testuser")).rejects.toThrow("Connect failed: 500");
  });

  it("throws on network error", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    await expect(connectService("github", "testuser")).rejects.toThrow("Network error");
  });
});

describe("analyzeUser", () => {
  it("returns parsed response on success", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ bio: "Tech enthusiast", tags: ["coding"], findings: [], schedule: "night owl" }),
    });

    const result = await analyzeUser({ github: "testuser" });

    expect(result.bio).toBe("Tech enthusiast");
    expect(result.tags).toEqual(["coding"]);
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 502 });

    await expect(analyzeUser({ github: "testuser" })).rejects.toThrow("Analysis failed: 502");
  });
});

describe("runPipeline", () => {
  it("returns parsed response on success", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ venues: [], coaching_a: {}, coaching_b: {}, cross_ref: {} }),
    });

    const result = await runPipeline({
      user_a: { github_username: "user1" },
      user_b: { github_username: "user2" },
      include_venue: false,
    });

    expect(result.venues).toEqual([]);
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });

    await expect(
      runPipeline({
        user_a: { github_username: "user1" },
        user_b: { github_username: "user2" },
        include_venue: false,
      }),
    ).rejects.toThrow("Failed to run pipeline");
  });
});
