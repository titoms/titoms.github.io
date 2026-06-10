import { Helmet } from "react-helmet-async";
import { CALENDLY_URL } from "../../config/constants";
import { Badge, Button, Card, SectionHeader } from "../../components/ui";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const callSteps = [
  {
    label: "01",
    title: "Describe your situation",
    description: "What you are building, where you are stuck, or what outcome you need.",
  },
  {
    label: "02",
    title: "I clarify and ask questions",
    description: "I will ask about scope, stack, timeline and budget to understand what makes sense.",
  },
  {
    label: "03",
    title: "We define the next step",
    description:
      "You leave with a clear recommendation: coaching, a development block, a workshop or a custom quote.",
  },
];

const serviceLinks = [
  {
    slug: "ai-web-development-newsletter",
    title: "AI newsletter",
    description: "Monthly practical briefing on AI coding tools and web development workflows.",
  },
  {
    slug: "web-project-coaching",
    title: "Web project coaching",
    description: "One-on-one technical guidance for blocked projects and messy codebases.",
  },
  {
    slug: "full-stack-development-day",
    title: "Development day",
    description: "Focused half-day or full-day delivery on a scoped bug, feature or task.",
  },
  {
    slug: "mvp-bootstrapping-workshop",
    title: "MVP workshop",
    description: "Turn your product idea into a realistic scope, roadmap and build plan.",
  },
  {
    slug: "mvp-development",
    title: "Custom MVP",
    description: "Full-stack React and Node.js MVP from product scope to production deployment.",
  },
];

const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact — fullstackchris.dev</title>
      <meta
        name="description"
        content="Book a free 30-minute discovery call with Christophe Crognier, full-stack web developer and web project coach. Discuss your project, blocker or product goal."
      />
    </Helmet>

    <section className="glow-bg grid-bg relative overflow-hidden border-b border-border">
      <div className={`${sectionClass} py-24`}>
        <Badge variant="accent">Contact</Badge>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
          Let's talk about your project.
        </h1>
        <p className="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
          Book a free 30-minute discovery call. We will identify what you need and whether I can help.
        </p>
        <div className="mt-8">
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Book a free discovery call
            <span aria-hidden="true"> →</span>
          </Button>
        </div>
      </div>
    </section>

    <section className={sectionClass}>
      <SectionHeader
        eyebrow="What to expect"
        title="A focused 30-minute conversation."
        description="Bring your project, your blocker or your product idea. We will determine the right next step together."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {callSteps.map((step) => (
          <Card key={step.label} hover>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{step.label}</p>
            <h3 className="mt-3 font-display text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-secondary">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>

    <section className="border-y border-border bg-surface/55">
      <div className={sectionClass}>
        <SectionHeader
          eyebrow="Already know what you need?"
          title="Go straight to the right service."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceLinks.map((service) => (
            <Card key={service.slug} hover className="flex flex-col gap-3">
              <h3 className="font-display text-lg font-semibold text-white">{service.title}</h3>
              <p className="text-sm leading-6 text-secondary">{service.description}</p>
              <Button
                href={`/services/${service.slug}`}
                variant="secondary"
                size="sm"
                className="mt-auto w-fit"
              >
                Learn more
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className={sectionClass}>
      <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Ready to book?</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">
              30 minutes. No commitment.
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-8 text-secondary">
              Most people walk away with a clearer picture of what to build and how much it will cost.
            </p>
          </div>
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Book a call
            <span aria-hidden="true"> →</span>
          </Button>
        </div>
      </Card>
    </section>
  </>
);

export default ContactPage;
