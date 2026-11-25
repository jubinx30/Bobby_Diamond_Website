import { describe, it, expect } from "vitest";
import { searchSongs, SONGS, PAGE_SIZE, getPageNumbers } from "./songs";

describe("song finder", () => {
  it("finds a song by title", () => {
    expect(searchSongs("96 tears", "title")[0]?.artist).toBe("? & The Mysterians");
  });
  it("finds all songs by an artist, first-last order works", () => {
    const r = searchSongs("john denver", "artist");
    expect(r.length).toBeGreaterThanOrEqual(3);
    expect(r.every((s) => s.artist === "Denver, John")).toBe(true);
  });
  it("returns every song in a genre", () => {
    expect(searchSongs("disco", "genre").length).toBe(SONGS.filter((s) => s.genre === "Disco Music").length);
  });
  it("returns no results for songs not in the list", () => {
    expect(searchSongs("zzqx nonexistent")).toEqual([]);
  });
  it("has PAGE_SIZE set to 15", () => {
    expect(PAGE_SIZE).toBe(15);
  });
  it("generates correct pagination ranges and ellipses", () => {
    // 5 pages or less shows all pages without ellipsis
    expect(getPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);

    // Near start of a large list
    expect(getPageNumbers(2, 20)).toEqual([1, 2, 3, 4, 5, "ellipsis", 20]);

    // In middle of a large list
    expect(getPageNumbers(10, 20)).toEqual([1, "ellipsis", 9, 10, 11, "ellipsis", 20]);

    // Near end of a large list
    expect(getPageNumbers(19, 20)).toEqual([1, "ellipsis", 16, 17, 18, 19, 20]);
  });
});
