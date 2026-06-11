import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { ProcessItem } from "../../types";

type ProcessStepperProps = {
  steps: ProcessItem[];
};

type StepperState = {
  activeIndex: number;
  completedCount: number;
  shipped: boolean;
};

const ACTIVE_MS = 1150;
const STEP_MS = 1350;
const START_DELAY_MS = 700;
const LOOP_HOLD_MS = 3200;

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ProcessStepper = ({ steps }: ProcessStepperProps) => {
  const [state, setState] = useState<StepperState>({
    activeIndex: -1,
    completedCount: 0,
    shipped: false,
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(media.matches);

    syncPreference();
    media.addEventListener("change", syncPreference);

    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (steps.length === 0) return;

    if (reducedMotion) {
      setState({ activeIndex: -1, completedCount: steps.length, shipped: true });
      return;
    }

    const timeouts: number[] = [];

    const reset = () => {
      setState({ activeIndex: -1, completedCount: 0, shipped: false });
    };

    const runStep = (index: number) => {
      if (index >= steps.length) {
        setState({ activeIndex: -1, completedCount: steps.length, shipped: true });
        timeouts.push(
          window.setTimeout(() => {
            reset();
            timeouts.push(window.setTimeout(() => runStep(0), START_DELAY_MS));
          }, LOOP_HOLD_MS),
        );
        return;
      }

      setState({ activeIndex: index, completedCount: index, shipped: false });
      timeouts.push(
        window.setTimeout(() => {
          setState({ activeIndex: -1, completedCount: index + 1, shipped: false });
        }, ACTIVE_MS),
      );
      timeouts.push(window.setTimeout(() => runStep(index + 1), STEP_MS));
    };

    reset();
    timeouts.push(window.setTimeout(() => runStep(0), START_DELAY_MS));

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [reducedMotion, steps.length]);

  const progress = useMemo(() => {
    if (steps.length <= 1) return "100%";
    if (state.shipped) return "100%";

    const progressIndex =
      state.activeIndex >= 0
        ? state.activeIndex
        : Math.max(0, state.completedCount - 1);

    return `${Math.min(100, (progressIndex / (steps.length - 1)) * 100)}%`;
  }, [state.activeIndex, state.completedCount, state.shipped, steps.length]);

  return (
    <div className="process-stepper-shell mt-10" aria-label="How a session works">
      <div className="process-stepper-track" style={{ "--process-progress": progress } as CSSProperties}>
        {steps.map((step, index) => {
          const isActive = state.activeIndex === index;
          const isDone = state.completedCount > index || state.shipped;

          return (
            <article
              key={step.title}
              className={`process-stepper-card rounded-lg border p-5 transition-[background,border-color,box-shadow,transform] duration-300 ${
                isActive
                  ? "border-accent bg-accent-soft shadow-glow"
                  : isDone
                    ? "border-accent/60 bg-tertiary"
                    : "border-border bg-tertiary"
              }`}
            >
              <div
                className={`grid h-[44px] w-[44px] place-items-center rounded-pill border font-mono text-sm font-medium transition-colors ${
                  isActive || isDone
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-strong bg-raised text-low"
                }`}
              >
                {isDone ? <CheckIcon /> : String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 font-display text-[1.1rem] font-semibold leading-tight text-white">{step.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-7 text-secondary">{step.description}</p>
            </article>
          );
        })}
      </div>
      <div
        className={`mt-5 inline-flex items-center gap-3 rounded-pill border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
          state.shipped
            ? "border-accent bg-accent-soft text-accent"
            : "border-border bg-tertiary text-low"
        }`}
      >
        <span aria-hidden="true">-&gt;</span>
        <span>{state.shipped ? "complete / shipped" : "in progress"}</span>
      </div>
    </div>
  );
};

export default ProcessStepper;
