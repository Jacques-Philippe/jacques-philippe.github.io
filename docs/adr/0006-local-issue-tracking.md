# Planned work is tracked as local Markdown issues, not GitHub Issues

Work items live as Markdown files under `docs/issues/`, named `NNNN-slug.md`
with a zero-padded sequential number (pick the next by scanning both
`docs/issues/` and `docs/issues/done/` for the highest). An open issue sits in
`docs/issues/`; when finished it is `git mv`d into `docs/issues/done/`, keeping
its number and filename. Location is the single source of truth — no index
file, no `status` frontmatter, no intermediate-state directories. A
work-in-progress issue simply stays in `docs/issues/` until done.

Frontmatter is `title`, `created`, and optional `blocked-by: [N, ...]`. The body
has a **Problem / outcome** section (what "done" looks like) and a **Notes**
section (updated as work happens). Issues cross-reference ADRs and glossary
terms by relative path and each other by number.

Chosen over GitHub Issues so the backlog is versioned with the code, reviewable
in the same diffs, and usable offline by an agent without network or API
access. The cost is losing GitHub's search, labels, and web UI — acceptable for
a solo portfolio project.
