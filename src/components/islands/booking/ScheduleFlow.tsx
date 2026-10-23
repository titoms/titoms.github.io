import { useCallback, useEffect, useMemo, useState } from "react";
import { getBookingService } from "../../../config/bookingServices";
import { clearSchedule, detectTimezone, getDraft, patchDraft } from "./draft";

interface Slot {
  time: string;
  available: boolean;
}
interface SlotGroup {
  name: string;
  slots: Slot[];
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const GROUP_LABELS: Record<string, string> = { morning: "Morning", afternoon: "Afternoon", evening: "Evening" };

const toISODate = (y: number, m: number, d: number): string =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const ScheduleFlow = ({ serviceId }: { serviceId: string }) => {
  const service = getBookingService(serviceId);
  const today = new Date();
  const [month, setMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [days, setDays] = useState<Record<string, boolean> | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(getDraft().date ?? null);
  const [groups, setGroups] = useState<SlotGroup[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tz = useMemo(() => getDraft().tz || detectTimezone(), []);

  const monthParam = `${month.y}-${String(month.m + 1).padStart(2, "0")}`;

  // Month availability
  useEffect(() => {
    let cancelled = false;
    setDays(null);
    setError(null);
    fetch(`/api/booking/availability?month=${monthParam}&serviceId=${serviceId}`)
      .then((r) => r.json())
      .then((b) => { if (!cancelled) setDays(b.success ? b.days : {}); })
      .catch(() => { if (!cancelled) setError("Calendar is unavailable right now. Please try again."); });
    return () => { cancelled = true; };
  }, [monthParam, serviceId]);

  // Day slots
  const loadSlots = useCallback(
    (date: string) => {
      setSlotsLoading(true);
      setGroups(null);
      fetch(`/api/booking/availability?date=${date}&serviceId=${serviceId}`)
        .then((r) => r.json())
        .then((b) => { setGroups(b.success ? b.groups : []); setSlotsLoading(false); })
        .catch(() => { setError("Could not load slots. Please try again."); setSlotsLoading(false); });
    },
    [serviceId],
  );

  useEffect(() => {
    if (selectedDate) loadSlots(selectedDate);
  }, [selectedDate, loadSlots]);

  if (!service || service.priceCents === null) {
    return (
      <div className="card">
        <div className="empty-state">
          <h4 className="t-h4">Pick a service first</h4>
          <p>Go back and choose the service you want to book.</p>
          <a href="/booking/" className="btn btn-primary btn-sm">All services</a>
        </div>
      </div>
    );
  }

  const selectSlot = async (time: string) => {
    if (!selectedDate) return;
    setError(null);

    // If we already hold this exact slot, just advance.
    const draft = getDraft();
    if (
      draft.date === selectedDate &&
      draft.slot === time &&
      draft.holdExpiresAt &&
      new Date(draft.holdExpiresAt).getTime() > Date.now() + 60_000
    ) {
      window.location.href = "/booking/details/";
      return;
    }

    clearSchedule();
    patchDraft({ date: selectedDate, slot: time, serviceId, tz });

    // Reserve server-side before moving on.
    try {
      const res = await fetch("/api/booking/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, date: selectedDate, time, timezone: tz }),
      });
      const body = await res.json();
      if (!res.ok || !body.success) {
        setError(body.message ?? "That slot was just taken. Pick another.");
        loadSlots(selectedDate);
        return;
      }
      patchDraft({ holdId: body.holdId, holdExpiresAt: body.expiresAt });
      window.location.href = "/booking/details/";
    } catch {
      setError("Network error. Please try again.");
    }
  };

  const firstDow = new Date(month.y, month.m, 1).getDay(); // 0=Sun
  const leadSpaces = (firstDow + 6) % 7; // Monday-first grid
  const daysInMonth = new Date(month.y, month.m + 1, 0).getDate();
  const todayISO = toISODate(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => setMonth(({ y, m }) => (m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 }));
  const nextMonth = () => setMonth(({ y, m }) => (m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 }));

  return (
    <>
      {error && <div className="error-banner" role="alert">{error}</div>}
      <div className="sched-grid">
        <div className="sched-main">
          <div className="card tz-bar">
            <div className="tz-select">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>
              Times shown in <strong>{tz.replace("_", " ")}</strong>
            </div>
            <span className="t-small">Converted automatically — slots are booked in Europe/Paris</span>
          </div>

          <div className="card cal-card">
            <div className="cal-head">
              <h4>{MONTHS[month.m]} {month.y}</h4>
              <div className="cal-nav">
                <button type="button" aria-label="Previous month" onClick={prevMonth}>←</button>
                <button type="button" aria-label="Next month" onClick={nextMonth}>→</button>
              </div>
            </div>

            {!days && <div className="skeleton" style={{ height: 260 }} />}
            {days && (
              <div className="cal-grid">
                {DOW.map((d) => <div key={d} className="cal-dow">{d}</div>)}
                {Array.from({ length: leadSpaces }).map((_, i) => <div key={`e${i}`} className="cal-day empty" />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dateStr = toISODate(month.y, month.m, i + 1);
                  const avail = days[dateStr] === true;
                  const isSel = selectedDate === dateStr;
                  return (
                    <div
                      key={dateStr}
                      role={avail ? "button" : undefined}
                      tabIndex={avail ? 0 : undefined}
                      aria-disabled={!avail}
                      className={[
                        "cal-day",
                        avail ? "avail" : "unavail",
                        dateStr === todayISO ? "today" : "",
                        isSel ? "selected" : "",
                      ].join(" ").trim()}
                      onClick={() => avail && setSelectedDate(dateStr)}
                      onKeyDown={(e) => { if (avail && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setSelectedDate(dateStr); } }}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="cal-legend">
              <div className="lg"><span className="sw av" />Available</div>
              <div className="lg"><span className="sw un" />Unavailable</div>
              <div className="lg"><span className="sw sel" />Selected</div>
            </div>
          </div>

          <div className="card slots-card">
            <div className="slots-head">
              <h4 className="t-h4">Available times</h4>
              <span className="t-small">{selectedDate ?? "Select a date"}</span>
            </div>

            {slotsLoading && <div className="skeleton" style={{ height: 220 }} />}

            {!slotsLoading && groups && groups.every((g) => g.slots.every((s) => !s.available)) && (
              <div className="empty-state">
                <div className="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
                <h4 className="t-h4">No open slots this day</h4>
                <p>Try another date on the calendar — new slots open up regularly.</p>
              </div>
            )}

            {!slotsLoading && groups && !groups.every((g) => g.slots.every((s) => !s.available)) && (
              <div className="slot-groups">
                {groups.map((group) => {
                  if (group.slots.every((s) => !s.available)) return null;
                  return (
                    <div key={group.name} className="slot-group">
                      <h5>{GROUP_LABELS[group.name]}</h5>
                      <div className="slot-grid">
                        {group.slots.map((slot, i) => (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={!slot.available}
                            style={{ animationDelay: `${i * 0.04}s` }}
                            className={`slot-btn${getDraft().date === selectedDate && getDraft().slot === slot.time ? " selected" : ""}${slot.available ? "" : " unavail"}`}
                            onClick={() => selectSlot(slot.time)}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <aside className="card summary-card">
          <h4 className="t-h4">Your booking</h4>
          <div className="svc-line">
            <div>
              <h4>{service.title}</h4>
              <span className="t-small">{service.durationLabel}</span>
            </div>
            <span className="price-tag">€{Math.round(service.priceCents / 100)}</span>
          </div>
          <div className="summary-row"><span>Date</span><strong>{selectedDate ?? "Select a date"}</strong></div>
          <div className="summary-row"><span>Time</span><strong>{getDraft().slot ?? "—"}</strong></div>
          <div className="summary-row"><span>Timezone</span><strong>{tz}</strong></div>
          <div className="summary-total"><span>Total</span><span>€{Math.round(service.priceCents / 100)}</span></div>
          <a className="btn btn-primary btn-lg" href="/booking/details/" style={{ width: "100%" }}>
            Continue <span className="arrow">→</span>
          </a>
          <p className="t-small" style={{ textAlign: "center" }}>You won't be charged yet.</p>
        </aside>
      </div>
    </>
  );
};

export default ScheduleFlow;
