import raw from "@/data/songs.json";

export type Song = { title: string; artist: string; genre: string };

// Tidy small typos in the original list (e.g. 70"s Music, 50' Songs) so genres group cleanly.
export function normalizeGenre(g: string): string {
  const s = g.replace(/"/g, "'").replace(/^(\d0)'?s?\s/, "$1's ").trim();
  if (/^50's/.test(s)) return "50's Songs";
  if (/^60's/.test(s)) return "60's Songs";
  if (/^70's/.test(s)) return "70's Music";
  if (/^80's/.test(s)) return "80's/90's/& Up";
  if (s === "Italian") return "Italian Music";
  return s;
}

export const SONGS: Song[] = (raw as Song[]).map((s) => ({ ...s, genre: normalizeGenre(s.genre) }));
export const GENRES = Array.from(new Set(SONGS.map((s) => s.genre))).sort();

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['’`.,!?&()\-/]/g, " ").replace(/\s+/g, " ").trim();

// "Adams, Bryan" also matches "Bryan Adams".
function artistVariants(a: string): string {
  const m = a.match(/^([^,]+),\s*(.+)$/);
  return m ? `${a} ${m[2]} ${m[1]}` : a;
}

export type Field = "all" | "title" | "artist" | "genre";

export const PAGE_SIZE = 15;

export function getPageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
}

export function searchSongs(query: string, field: Field = "all", songs: Song[] = SONGS): Song[] {
  const q = norm(query);
  if (!q) return [];
  const words = q.split(" ");
  return songs.filter((s) => {
    const hay =
      field === "title" ? norm(s.title)
      : field === "artist" ? norm(artistVariants(s.artist))
      : field === "genre" ? norm(s.genre)
      : norm(`${s.title} ${artistVariants(s.artist)} ${s.genre}`);
    return words.every((w) => hay.includes(w));
  });
}
