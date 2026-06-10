import { Helmet } from "react-helmet-async";
import { CALENDLY_URL } from "../../config/constants";
import { servicePages } from "../../config/services-data";
import { Badge, Button, Card, SectionHeader } from "../../components/ui";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const ServicesIndexPage = () => (
  <>
    <Helmet>
      <title>Services — fullstackchris.dev</title>
      <meta
        name="description"
        content="Web development coaching, focused development days, MVP workshops and custom MVP builds. Five productized services for founders, freelancers and small teams."
      />
    </Helmet>

    <section className="glow-bg grid-bg relative overflow-hidden border-b border-border">
      <div className={`${sectionClass} py-24`}>
        <Badge variant="accent">All services</Badge>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
          Five ways to work together — from one hour to a full MVP.
        </h1>
        <p className="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
          Choose the level of engagement that matches your current need. Start small with a coaching session or
          newsletter, scale up to a development day or MVP build.
        </p>
        <div className="mt-8">
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Not sure where to start? Book a call
            <span aria-hidden="true"> →</span>
          </Button>
        </div>
      </div>
    </section>

    <section className={sectionClass}>
      <SectionHeader
        eyebrow="Services"
        title="Pick the right engagement for your project."
        description="Prices are visible up front. Each service has a dedicated page with full details, pricing and FAQ."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {servicePages.map((service) => (
          <Card key={service.slug} hover className="flex h-full flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <Badge variant="accent">{service.badge}</Badge>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-white">
                {service.hero.h1.length > 60 ? service.hero.h1.slice(0, 57) + "…" : service.hero.h1}
              </h3>
              <p className="text-[0.95rem] leading-7 text-secondary">{service.hero.subtitle}</p>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-4">
              <Button href={`/services/${service.slug}`} variant="primary" size="sm">
                Learn more
              </Button>
              <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm">
                Book a call
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>

    <section className="border-t border-border bg-surface/55">
      <div className={sectionClass}>
        <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Not sure?</p>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">
                Bring me your idea, blocker or product goal.
              </h2>
              <p className="mt-4 max-w-prose text-lg leading-8 text-secondary">
                We will clarify what should happen next: coaching, a focused development block, an MVP workshop or a
                custom build proposal.
              </p>
            </div>
            <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
              Book a call
              <span aria-hidden="true"> →</span>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  </>
);

export default ServicesIndexPage;
