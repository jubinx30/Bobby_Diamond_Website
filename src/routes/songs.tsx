import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState } from "react";
import { Search, Mic, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/site/Reveal";
import { GENRES, SONGS, searchSongs, getPageNumbers, PAGE_SIZE, type Field } from "@/lib/songs";
import { EMAIL } from "@/components/site/Layout";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const schema = z.object({
  q: fallback(z.string(), "").default(""),
  field: fallback(z.string(), "all").default("all"),
  page: fallback(z.coerce.number().int().min(1), 1).default(1),
});

export const Route = createFileRoute("/songs")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "Song Finder — Bobby Diamond's Song List" },
      { name: "description", content: "Search Bobby Diamond's repertoire of over 1,200 songs by title, artist or genre." },
      { property: "og:title", content: "Song Finder — Bobby Diamond" },
      { property: "og:description", content: "Check whether your favorite song is in Bobby's repertoire." },
    ],
  }),
  component: SongsPage,
});

const FIELDS: { v: Field; l: string }[] = [
  { v: "all", l: "Everything" }, { v: "title", l: "Song Title" }, { v: "artist", l: "Artist" }, { v: "genre", l: "Genre" },
];

function SongsPage() {
  const { q, field: rawField, page = 1 } = Route.useSearch();
  const field = (FIELDS.some((f) => f.v === rawField) ? rawField : "all") as Field;
  const navigate = useNavigate({ from: "/songs" });
  const [input, setInput] = useState(q);
  const [f, setF] = useState<Field>(field);

  const isFiltered = Boolean(q.trim());
  const results = isFiltered ? searchSongs(q, field) : SONGS;
  const totalSongs = results.length;
  const totalPages = Math.max(1, Math.ceil(totalSongs / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalSongs);
  const currentSongs = results.slice(startIndex, endIndex);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const go = (query: string, fld: Field, targetPage = 1) => {
    setInput(query);
    setF(fld);
    navigate({ search: { q: query, field: fld, page: targetPage } });
  };

  const goToPage = (newPage: number) => {
    navigate({ search: { q, field, page: newPage } });
    const el = document.getElementById("songs-table-container");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <PageHeader title="Is it on the list?">
        Search {SONGS.length.toLocaleString()} songs by title, artist or genre.
      </PageHeader>

      <section className="mx-auto max-w-4xl px-4 md:px-6">
        <form onSubmit={(e) => { e.preventDefault(); go(input, f, 1); }} className="animate-rise rounded-2xl border border-border bg-card/70 p-4 shadow-glow md:p-6" style={{ animationDelay: "300ms" }}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="q">Search songs</label>
            <input id="q" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. Sweet Caroline, Neil Diamond, Motown…" className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:border-primary" />
            <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"><Search className="h-4 w-4" />Search</button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Search by">
            {FIELDS.map((x) => (
              <button type="button" key={x.v} role="radio" aria-checked={f === x.v} onClick={() => setF(x.v)} className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${f === x.v ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary"}`}>{x.l}</button>
            ))}
          </div>
        </form>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center mr-1">Browse genres:</span>
          {GENRES.map((g) => (
            <button key={g} onClick={() => go(g, "genre", 1)} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent">{g}</button>
          ))}
        </div>

        <div className="mt-10" id="songs-table-container">
          {isFiltered && results.length === 0 ? (
            <div className="animate-rise rounded-2xl border border-accent/50 bg-card/60 p-10 text-center">
              <Mic className="mx-auto h-10 w-10 text-accent" />
              <h2 className="mt-4 text-3xl">No Results Found</h2>
              <p className="mt-2 text-muted-foreground">“{q}” isn't in Bobby's repertoire yet. Try another spelling, or <a className="text-primary underline" href={`mailto:${EMAIL}?subject=Song request: ${encodeURIComponent(q)}`}>ask Bobby about it</a>.</p>
              <button
                type="button"
                onClick={() => go("", "all", 1)}
                className="mt-6 rounded-xl border border-primary bg-primary/10 px-5 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                View all songs
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {isFiltered ? (
                    <>
                      <span className="font-semibold text-primary">{totalSongs}</span>{" "}
                      {totalSongs === 1 ? "song" : "songs"} found for “{q}”
                      {" · "}
                      <span>
                        showing {startIndex + 1}–{endIndex}
                      </span>
                    </>
                  ) : (
                    <>
                      Showing <span className="font-semibold text-primary">{startIndex + 1}–{endIndex}</span> of{" "}
                      <span className="font-semibold text-primary">{totalSongs.toLocaleString()}</span> songs in Bobby's repertoire
                    </>
                  )}
                </p>

                {isFiltered && (
                  <button
                    type="button"
                    onClick={() => go("", "all", 1)}
                    className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs text-muted-foreground hover:text-primary underline transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Clear search & view all
                  </button>
                )}
              </div>

              <div className="hidden md:block overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-left">
                  <thead className="bg-secondary text-xs uppercase tracking-[0.15em] text-primary">
                    <tr>
                      <th className="px-5 py-3 w-16 text-center text-muted-foreground">#</th>
                      <th className="px-5 py-3">Song Title</th>
                      <th className="px-5 py-3">Artist</th>
                      <th className="px-5 py-3">Genre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSongs.map((s, i) => (
                      <tr key={`${s.artist}-${s.title}-${startIndex + i}`} className="animate-rise border-t border-border transition-colors hover:bg-card" style={{ animationDelay: `${Math.min(i, 15) * 20}ms` }}>
                        <td className="px-5 py-3 text-center text-xs text-muted-foreground font-mono">
                          {startIndex + i + 1}
                        </td>
                        <td className="px-5 py-3 font-medium">{s.title}</td>
                        <td className="px-5 py-3 text-muted-foreground">{s.artist}</td>
                        <td className="px-5 py-3"><span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-primary">{s.genre}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="space-y-3 md:hidden">
                {currentSongs.map((s, i) => (
                  <li key={`${s.artist}-${s.title}-${startIndex + i}`} className="animate-rise rounded-xl border border-border bg-card/70 p-4" style={{ animationDelay: `${Math.min(i, 15) * 20}ms` }}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold">{s.title}</p>
                      <span className="text-xs font-mono text-muted-foreground">#{startIndex + i + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{s.artist}</p>
                    <span className="mt-2 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs text-primary">{s.genre}</span>
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
                  <div className="text-xs text-muted-foreground order-2 sm:order-1">
                    Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
                    <span className="font-semibold text-foreground">{totalPages}</span> ({totalSongs.toLocaleString()} songs total)
                  </div>

                  <Pagination className="mx-0 w-auto justify-center sm:justify-end order-1 sm:order-2">
                    <PaginationContent className="flex-wrap justify-center gap-1">
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) goToPage(currentPage - 1);
                          }}
                          disabled={currentPage <= 1}
                        >
                          <span className="hidden sm:inline">Previous 15</span>
                          <span className="sm:hidden">Prev</span>
                        </PaginationPrevious>
                      </PaginationItem>

                      {pageNumbers.map((p, idx) =>
                        p === "ellipsis" ? (
                          <PaginationItem key={`ellipsis-${idx}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : (
                          <PaginationItem key={p}>
                            <PaginationLink
                              href="#"
                              isActive={p === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                goToPage(p);
                              }}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) goToPage(currentPage + 1);
                          }}
                          disabled={currentPage >= totalPages}
                        >
                          <span className="hidden sm:inline">Next 15</span>
                          <span className="sm:hidden">Next</span>
                        </PaginationNext>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
