import { Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CALENDLY_URL } from "../../config/constants";
import { servicePages } from "../../config/services-data";
import { Badge, Button, Card, FAQItem, ProcessStep, SectionHeader } from "../../components/ui";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const ServicePageTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = servicePages.find((s) => s.slug === slug);

  if (!data) return <Navigate to="/services" replace />;

  const primaryHref = data.hero.primaryCtaHref ?? CALENDLY_URL;
  const primaryTarget = primaryHref === CALENDLY_URL ? "_blank" : undefined;
  const primaryRel = primaryHref === CALENDLY_URL ? "noopener noreferrer" : undefined;
  const secondaryHref = data.hero.secondaryCtaHref ?? "/services";
  const secondaryCta = data.hero.secondaryCta ?? "← All services";

  return (
    <>
      <Helmet>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </Helmet>

      {/* 1 — Hero */}
      <section className="glow-bg grid-bg relative overflow-hidden border-b border-border">
        <div className={`${sectionClass} py-24`}>
          <Badge variant="accent">{data.badge}</Badge>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
            {data.hero.h1}
          </h1>
          <p className="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
            {data.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryHref} target={primaryTarget} rel={primaryRel} size="lg">
              {data.hero.primaryCta}
              <span aria-hidden="true"> →</span>
            </Button>
            <Button href={secondaryHref} variant="secondary" size="lg">
              {secondaryCta}
            </Button>
          </div>
        </div>
      </section>

      {/* 2 — Pain points */}
      <section className={sectionClass}>
        <SectionHeader eyebrow="The problem" title="Sound familiar?" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.painPoints.map((point) => (
            <Card key={point} hover className="text-[0.95rem] leading-7 text-secondary">
              {point}
            </Card>
          ))}
        </div>
      </section>

      {/* 3 — What's included */}
      <section className="border-y border-border bg-surface/55">
        <div className={sectionClass}>
          <SectionHeader eyebrow="What you get" title="Everything included." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.included.map((item) => (
              <Card key={item.title} hover>
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-secondary">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Pricing */}
      <section className={sectionClass}>
        <SectionHeader eyebrow="Pricing" title="Clear prices, no surprises." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.pricing.map((row) => (
            <Card key={row.label} glow={row.featured} hover className="flex flex-col gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{row.label}</p>
              <p className="font-display text-3xl font-bold leading-none text-white">{row.price}</p>
              <Button
                href={primaryHref}
                target={primaryTarget}
                rel={primaryRel}
                variant={row.featured ? "primary" : "secondary"}
                size="sm"
                className="mt-auto"
              >
                {data.hero.primaryCta}
              </Button>
            </Card>
          ))}
        </div>
        {data.pricingNote && <p className="mt-6 text-sm leading-7 text-low">{data.pricingNote}</p>}
      </section>

      {/* 5 — Good fit / Not a fit (optional) */}
      {data.goodFit && (
        <section className="border-y border-border bg-surface/55">
          <div className={sectionClass}>
            <SectionHeader eyebrow="Is this right for you?" title="Good fit and not a fit." />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Card>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-positive">Good fit</p>
                <ul className="space-y-3">
                  {data.goodFit.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-secondary">
                      <span className="mt-0.5 shrink-0 text-positive">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              {data.notAFit && (
                <Card>
                  <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-negative">Not a fit</p>
                  <ul className="space-y-3">
                    {data.notAFit.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-6 text-secondary">
                        <span className="mt-0.5 shrink-0 text-negative">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6 — Process steps (optional) */}
      {data.processSteps && (
        <section className={sectionClass}>
          <SectionHeader eyebrow="How it works" title="A clear process." />
          <div className="mt-10">
            {data.processSteps.map((step, index) => (
              <ProcessStep
                key={step.title}
                number={index + 1}
                title={step.title}
                isLast={index === data.processSteps!.length - 1}
              >
                {step.description}
              </ProcessStep>
            ))}
          </div>
        </section>
      )}

      {/* 7 — FAQ */}
      <section className="border-y border-border bg-surface/55">
        <div className={sectionClass}>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeader eyebrow="Questions" title="Common questions answered." />
            <div>
              {data.faqs.map((faq, index) => (
                <FAQItem key={faq.question} question={faq.question} defaultOpen={index === 0}>
                  {faq.answer}
                </FAQItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Final CTA */}
      <section className={sectionClass}>
        <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{data.hero.primaryCta}</p>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">
                Ready to get started?
              </h2>
              <p className="mt-4 max-w-prose text-lg leading-8 text-secondary">{data.hero.subtitle}</p>
            </div>
            <Button href={primaryHref} target={primaryTarget} rel={primaryRel} size="lg">
              {data.hero.primaryCta}
              <span aria-hidden="true"> →</span>
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
};

export default ServicePageTemplate;
