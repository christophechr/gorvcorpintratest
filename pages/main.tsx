const focusAreas = [
  {
    title: "Patch priorities",
    detail: "14.8 jungle tempo + bot lane scaling.",
  },
  {
    title: "Opponent scout",
    detail: "Review mid-lane roam timings for Game 2.",
  },
  {
    title: "Sponsor deliverables",
    detail: "Capture two hero shots for stage day.",
  },
];

const schedule = [
  {
    time: "10:00",
    title: "VOD review",
    note: "Draft phase focus, 45 min.",
  },
  {
    time: "12:00",
    title: "Scrim block 1",
    note: "Blue side, macro objectives.",
  },
  {
    time: "15:00",
    title: "Scrim block 2",
    note: "Red side, draft adaptations.",
  },
  {
    time: "18:30",
    title: "Sponsor session",
    note: "Studio A, 20 min.",
  },
];

const rosterPulse = [
  { label: "Main roster", value: "5/5 ready" },
  { label: "Academy scrims", value: "2 blocks scheduled" },
  { label: "Travel", value: "Berlin finals in 6 days" },
];

export default function MainPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f1211] text-[#f7f2e8]">
      <div className="pointer-events-none absolute -top-40 -right-24 h-80 w-80 rounded-full bg-[#2f6d5b]/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#cf7c4c]/40 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_45%)]" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:gap-14">
        <header
          className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          style={{ animation: "fadeUp 700ms ease-out both" }}
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#9fb7aa]">
              Rift HQ - Ops Console
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-[#f7f2e8] sm:text-5xl">
              Match day briefing
            </h1>
            <p className="max-w-2xl text-lg text-[#c9c0b6]">
              Today is a heavy prep day. Keep the comms clear, document every
              scrim, and keep eyes on lane priority trends.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="h-12 rounded-full bg-[#2f6d5b] px-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#f7f2e8] shadow-lg shadow-[#2f6d5b]/30 transition hover:-translate-y-0.5 hover:bg-[#275847]">
              Start report
            </button>
            <button className="h-12 rounded-full border border-[#3b4541] px-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#f7f2e8] transition hover:border-[#5a6a63] hover:bg-[#1a1f1d]">
              Open scrim hub
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {rosterPulse.map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#2b312e] bg-[#141816]/80 p-5 shadow-lg shadow-black/30"
                  style={{
                    animation: "fadeUp 700ms ease-out both",
                    animationDelay: `${120 + index * 90}ms`,
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9fb7aa]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[#f7f2e8]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="rounded-3xl border border-[#2b312e] bg-[#141816]/80 p-6 shadow-lg shadow-black/40"
              style={{ animation: "fadeUp 700ms ease-out both", animationDelay: "240ms" }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#f7f2e8]">
                  Focus areas
                </h2>
                <span className="rounded-full bg-[#24312b] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#9fb7aa]">
                  Priority
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {focusAreas.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#2b312e] bg-[#0f1211] p-4"
                  >
                    <h3 className="text-base font-semibold text-[#f7f2e8]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#bfb7ad]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside
            className="rounded-3xl border border-[#2b312e] bg-[#141816]/80 p-6 shadow-lg shadow-black/40"
            style={{ animation: "fadeUp 700ms ease-out both", animationDelay: "320ms" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#f7f2e8]">Today</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9fb7aa]">
                Schedule
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {schedule.map((item) => (
                <div key={item.title} className="rounded-2xl bg-[#0f1211] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#f7f2e8]">
                      {item.title}
                    </p>
                    <span className="text-xs font-semibold text-[#9fb7aa]">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#bfb7ad]">{item.note}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
