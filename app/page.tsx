"use client";

import { useState, useEffect, useRef } from "react";

const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdExample/viewform";

const GREEN = "#22c55e";
const GREEN_DIM = "#16a34a";
const GREEN_10 = "rgba(34,197,94,0.1)";
const GREEN_15 = "rgba(34,197,94,0.15)";
const GREEN_25 = "rgba(34,197,94,0.25)";
const GREEN_30 = "rgba(34,197,94,0.3)";
const GREEN_35 = "rgba(34,197,94,0.35)";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function YoutubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: "var(--surface)" }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}

function YoutubePortrait({ id, title, author }: { id: string; title: string; author?: string }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div style={{ position: "relative", width: "100%", paddingBottom: "177.77%", background: "var(--surface)" }}>
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>
      {author && (
        <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{author}</p>
        </div>
      )}
    </div>
  );
}

const INCLUDED = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    title: "Full income & expense review",
    desc: "Every dollar in, every dollar out — categorized and analyzed.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
      </svg>
    ),
    title: "Investment account analysis",
    desc: "What you own, how it's allocated, and whether it actually fits your goals.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Debt & liability breakdown",
    desc: "Interest rates, payoff order, and a clear strategy for what to tackle first.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
      </svg>
    ),
    title: "Hidden fees audit",
    desc: "Charges you didn't know you were paying — fund expense ratios, advisory fees, account fees.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    title: "Written 12-month game plan",
    desc: "A personalized document you keep — concrete steps, not vague advice.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Retirement calculator + budget template",
    desc: "Tools you can use on your own, long after the session ends.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Apply",
    desc: "Fill out a 3-minute application so Andrew can understand your situation before you speak.",
  },
  {
    n: "02",
    title: "Get approved & book",
    desc: "If it's a good fit, you'll receive a booking link to schedule your 2-hour deep dive.",
  },
  {
    n: "03",
    title: "The audit",
    desc: "Andrew reviews every account, income source, debt, and investment live with you — no prep required.",
  },
  {
    n: "04",
    title: "Your game plan",
    desc: "Within 24 hours you receive your written 12-month plan. No follow-up sessions needed.",
  },
];

const COMPARE = [
  { label: "Cost structure", traditional: "% of assets annually (1–2%+)", fox: "Flat one-time fee" },
  { label: "Incentive", traditional: "Sell products, grow AUM", fox: "Give you a clear plan" },
  { label: "Outcome", traditional: "Ongoing dependency", fox: "Full independence" },
  { label: "Language", traditional: "Often deliberately confusing", fox: "Plain English, always" },
  { label: "Commissions", traditional: "Yes — tied to products sold", fox: "None. Ever." },
];

const FAQS = [
  {
    q: "Who is this for?",
    a: "Anyone who feels uncertain, overwhelmed, or just curious about whether they're making the right moves with their money. Most people who book are early in their financial journey — but this is valuable at any stage.",
  },
  {
    q: "Do I need to be good with money already?",
    a: "Not at all. The whole point is to meet you where you are and build a clear picture together. No prior knowledge required.",
  },
  {
    q: "How does the session work?",
    a: "It's a video call. You share what you're comfortable with — accounts, statements, paycheck info — and Andrew reviews everything live with you, asking questions and thinking through your situation in real time.",
  },
  {
    q: "What's in the written plan?",
    a: "Specific next steps tailored to your situation: what to pay off first, where to put extra savings, how to think about investing, and a month-by-month priority list for the next year.",
  },
  {
    q: "Is this real financial advice?",
    a: "Andrew is not a licensed financial advisor. This is educational — he shares frameworks, analysis, and perspective, not professional financial advice in the legal/regulatory sense. See the full disclaimer below.",
  },
  {
    q: "Will you try to sell me anything after?",
    a: "No. There's no upsell, no product pitch, no ongoing subscription. You leave with a plan and total freedom.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Floating apply CTA — appears on scroll */}
      <div
        className="fixed top-4 right-5 sm:right-8 z-50 transition-all duration-300"
        style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
      >
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95 block"
          style={{ background: GREEN, color: "#080909", backdropFilter: "blur(12px)" }}
        >
          Apply Now
        </a>
      </div>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-5 sm:px-8 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${GREEN_15} 0%, transparent 68%)` }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Urgency badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs mb-10"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              animation: "fadeIn 0.6s ease forwards",
            }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: "#ef4444",
                boxShadow: "0 0 6px rgba(239,68,68,0.7)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            Limited spots — only a few openings left this month
          </div>

          {/* Brand wordmark */}
          <h1
            className="font-bold uppercase mb-6"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 5.5rem)",
              letterSpacing: "0.12em",
              color: GREEN,
              animation: "fadeUp 0.7s ease 0.1s forwards",
              opacity: 0,
              lineHeight: 1.05,
            }}
          >
            The Fox Audit
          </h1>

          <p
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10"
            style={{ color: "var(--muted)", animation: "fadeUp 0.7s ease 0.2s forwards", opacity: 0 }}
          >
            A 2-hour deep dive into everything you own, owe, earn, and spend —
            with a written 12-month plan you can implement entirely on your own.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ animation: "fadeUp 0.7s ease 0.3s forwards", opacity: 0 }}
          >
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 text-center"
              style={{ background: GREEN, color: "#080909" }}
            >
              Apply in 3 minutes
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-200 text-center"
              style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = GREEN_30)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="relative max-w-2xl mx-auto mt-12"
          style={{ animation: "fadeUp 0.7s ease 0.45s forwards", opacity: 0 }}
        >
          <div
            className="rounded-2xl p-px"
            style={{ background: "linear-gradient(135deg, var(--border), transparent, var(--border))" }}
          >
            <div className="rounded-2xl px-4 py-5 grid grid-cols-3" style={{ background: "var(--surface)" }}>
              {[
                { value: "2 hrs", label: "Total session" },
                { value: "1×", label: "One-time fee" },
                { value: "12 mo", label: "Written plan" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="px-2 sm:px-6 text-center"
                  style={{ borderRight: i < 2 ? "1px solid var(--border)" : "none" }}
                >
                  <div className="text-xl sm:text-2xl font-semibold mb-0.5" style={{ color: GREEN }}>
                    {s.value}
                  </div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero video */}
      <section className="py-4 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <YoutubeEmbed id="tKIDTpPuBMc" title="Fox Audit — Overview" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              What&apos;s included
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Everything, in one session.
            </h2>
            <p className="mt-4 text-base max-w-md mx-auto" style={{ color: "var(--muted)" }}>
              No follow-up packages. No upsells. Every item below is covered in a single flat fee.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INCLUDED.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div
                  className="h-full p-5 rounded-2xl transition-colors duration-200"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = GREEN_30)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: GREEN_10, color: GREEN }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              The process
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Simple from start to plan.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STEPS.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  className="p-5 rounded-2xl h-full"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <div className="text-3xl font-bold mb-4 leading-none" style={{ color: "var(--border)" }}>
                    {step.n}
                  </div>
                  <h3 className="text-sm font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-8 text-center" delay={0.4}>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: GREEN, color: "#080909" }}
            >
              Start with the application
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              The difference
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Not what you&apos;ve seen before.
            </h2>
            <p className="mt-4 text-base max-w-md mx-auto" style={{ color: "var(--muted)" }}>
              Traditional advisors have financial incentives that don&apos;t align with yours. This does.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <div
                className="grid grid-cols-3 text-xs font-semibold uppercase tracking-wider px-5 py-3"
                style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", color: "var(--muted)" }}
              >
                <span></span>
                <span className="text-center">Traditional</span>
                <span className="text-center" style={{ color: GREEN }}>Fox Audit</span>
              </div>
              {COMPARE.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-5 py-4 text-sm gap-2 items-center"
                  style={{
                    background: i % 2 === 0 ? "var(--background)" : "var(--surface)",
                    borderBottom: i < COMPARE.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <span className="font-medium text-xs" style={{ color: "var(--muted)" }}>{row.label}</span>
                  <span className="text-center text-xs" style={{ color: "var(--muted)" }}>{row.traditional}</span>
                  <span className="text-center text-xs font-semibold" style={{ color: "var(--foreground)" }}>{row.fox}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              Real clients
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Don&apos;t take my word for it.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <AnimatedSection delay={0.05}>
              <YoutubePortrait id="mtsu-6hfwDc" title="Client testimonial 1" />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <YoutubePortrait id="eb2P3yyVRog" title="Client testimonial 2" />
            </AnimatedSection>
          </div>

          {/* Judson text testimonial */}
          <AnimatedSection className="mt-4 max-w-2xl mx-auto" delay={0.25}>
            <div
              className="rounded-2xl p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                &ldquo;I genuinely didn&apos;t know where to start with any of this. Andrew looked at everything — my 401k, my debt, my spending — and just laid it out clearly. I walked away with an actual plan for the first time.&rdquo;
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>— Judson</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quote */}
      <section className="py-10 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div
              className="relative rounded-2xl p-8 sm:p-10 text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl leading-none select-none"
                style={{ color: GREEN, fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </div>
              <p className="text-base sm:text-lg leading-relaxed font-medium">
                Most people who book are just getting started. You don&apos;t need to have it all figured out — that&apos;s exactly why you&apos;re here.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: GREEN, color: "#080909" }}
                >
                  AF
                </div>
                <span className="text-sm font-medium">Andrew Fox</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Before you ask.
            </h2>
          </AnimatedSection>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: "var(--surface)",
                    border: openFaq === i ? `1px solid ${GREEN_35}` : "1px solid var(--border)",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm font-medium pr-4">{faq.q}</span>
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: openFaq === i ? GREEN : "var(--border)",
                        color: openFaq === i ? "#080909" : "var(--muted)",
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                        <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
                      </svg>
                    </span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? "300px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
                    <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{faq.a}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div
              className="relative rounded-3xl p-10 sm:p-14 text-center overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${GREEN_10} 0%, transparent 70%)` }}
              />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                  Stop wondering. Start building.
                </h2>
                <p className="text-base mb-8 max-w-sm mx-auto" style={{ color: "var(--muted)" }}>
                  The application takes 3 minutes. The session takes 2 hours. The plan lasts all year.
                </p>
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: GREEN, color: "#080909" }}
                >
                  Apply Now — Free to Apply
                </a>
                <div className="mt-6 flex items-center justify-center gap-4">
                  {[
                    { label: "Instagram", href: "https://instagram.com/vndrewfox" },
                    { label: "YouTube", href: "https://youtube.com/@vndrewfox" },
                    { label: "TikTok", href: "https://tiktok.com/@vndrewfox" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs transition-colors duration-150"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 sm:px-8 mt-auto" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <span className="text-sm font-semibold">Fox Audit</span>
            <div className="flex items-center gap-5">
              {[
                { label: "Instagram", href: "https://instagram.com/vndrewfox" },
                { label: "YouTube", href: "https://youtube.com/@vndrewfox" },
                { label: "TikTok", href: "https://tiktok.com/@vndrewfox" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors duration-150"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            <p className="font-medium mb-2">Disclaimer</p>
            <p>
              Andrew Fox is not a licensed financial advisor, broker, attorney, or CPA. The content provided through Fox Audit — including sessions, written plans, templates, and any related materials — is for educational and informational purposes only and does not constitute professional financial, investment, legal, or tax advice. Nothing shared should be treated as a personalized recommendation. All financial decisions are made at your own risk. Andrew Fox assumes no liability for any financial outcomes resulting from use of this service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
