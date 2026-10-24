# Commercial training localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deliver credible commercial copy and a complete trilingual training catalogue without changing the site's visual architecture.

**Architecture:** Localized training data is rendered by one shared Astro view. Existing locale-aware layouts generate canonical/hreflang metadata; route wrappers provide the 12 stable pages.

**Tech Stack:** Astro 6, TypeScript, Tailwind/CSS variables, Node test runner.

**Spec:** `docs/superpowers/specs/2026-10-24-commercial-training-localization-design.md`

## Global Constraints

- Preserve published URLs and use the existing i18n conventions.
- Public prices: €90/hour, €350 half-day, €600 full day, AI Clarity from €650/day, MVP from €4,500.
- Do not invent legal, certification, partnership, testimonial, or production claims.
- Training durations are indicative proposals.

## Tasks

### Task 1: Trilingual training catalogue

Modify `src/components/pages/TrainingPageView.astro` with typed localized catalogue data, full programme sections, FAQ, Human Coders card, Course/Breadcrumb JSON-LD and locale-aware links. Add route wrappers under `src/pages/formations/`, `src/pages/fr/formations/`, and `src/pages/es/formations/`.

### Task 2: Commercial consistency and navigation

Update service pricing/copy, remove inactive newsletter links/promotions, expose formations in all locale navigation/footer paths, and add the Human Coders reference to About.

### Task 3: MVP article and checks

Update the three localized MVP-cost articles for 2026, remove image prompts, add a stable modified date and explicit assumptions. Add targeted static checks, run tests/build, inspect the diff, then commit and push the current branch according to repository workflow.
