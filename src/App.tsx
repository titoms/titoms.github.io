import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ServicesIndexPage from "./pages/services/ServicesIndexPage";
import ServicePageTemplate from "./pages/services/ServicePageTemplate";
import CaseStudyModal from "./components/CaseStudyModal";
import {
  Badge,
  Button,
  Card,
  FAQItem,
  PricingCard,
  ProcessStep,
  ProjectCard,
  SectionHeader,
  ServiceCard,
} from "./components/ui";
import {
  CALENDLY_URL,
  buildStats,
  faqs,
  feedbackCards,
  footerGroups,
  heroStats,
  navLinks,
  newsletterIssue,
  pricingPlans,
  processSteps,
  projects,
  serviceOffers,
  technologies,
  workModes,
} from "./config/constants";
import type { Project } from "./types";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-[68px] max-w-site items-center justify-between px-6 sm:px-8 lg:px-10">
        <a
          href="#home"
          className="flex items-center gap-3 font-mono text-[0.98rem] font-semibold tracking-normal text-white"
          onClick={handleNavClick}
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-accent bg-brand/10 text-accent">
            CC
          </span>
          <span>fullstackchris.dev</span>
        </a>

        <div className="hidden items-center gap-7 min-[901px]:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href ?? `/#${link.id}`}
              className="text-[0.92rem] font-medium text-secondary transition-colors hover:text-white"
            >
              {link.title}
            </a>
          ))}
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="sm">
            Book a call
            <span aria-hidden="true">-&gt;</span>
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-border bg-tertiary text-white min-[901px]:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="font-mono text-lg leading-none">{isOpen ? "x" : "="}</span>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-primary/95 px-6 py-5 backdrop-blur-xl min-[901px]:hidden">
          <div className="mx-auto flex max-w-site flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href ?? `/#${link.id}`}
                className="rounded-md px-3 py-2 font-display text-xl font-semibold text-white hover:bg-tertiary"
                onClick={handleNavClick}
              >
                {link.title}
              </a>
            ))}
            <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>
              Book a call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => (
  <section id="home" className="glow-bg grid-bg relative overflow-hidden border-b border-border">
    <div className="relative z-10 mx-auto grid min-h-[calc(100vh-68px)] w-full max-w-site items-center gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
      <div className="max-w-4xl">
        <h1 className="max-w-5xl font-display text-[clamp(2.75rem,7vw,5.8rem)] font-bold leading-[0.98] tracking-normal text-white">
          Full-stack web development, AI workflows and technical coaching for builders
        </h1>
        <p className="mt-7 max-w-prose text-[clamp(1.05rem,1.7vw,1.28rem)] leading-8 text-secondary">
          I help founders, freelancers and small teams clarify, build and launch web projects using React, Node.js,
          TypeScript and practical AI-assisted development workflows.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Book a project call
            <span aria-hidden="true">-&gt;</span>
          </Button>
          <Button href="#services" variant="secondary" size="lg">
            Explore services
          </Button>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <Card key={stat.label} className="bg-surface/70 p-5">
              <p className="font-display text-2xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-accent">{stat.label}</p>
              <p className="mt-3 text-sm leading-6 text-secondary">{stat.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
        <div className="absolute inset-6 rounded-xl border border-accent/30 bg-brand/10 blur-3xl" aria-hidden="true" />
        <Card glow className="relative overflow-hidden p-0">
          <div className="border-b border-border bg-surface px-5 py-3 font-mono text-xs text-low">
            project-clarity.ts
          </div>
          <div className="space-y-4 p-6 font-mono text-sm leading-7 text-secondary">
            <p>
              <span className="text-accent">const</span> offer ={" "}
              <span className="text-positive">"clarify -&gt; build -&gt; launch"</span>;
            </p>
            <p>
              <span className="text-accent">stack</span>: React + Node.js + TypeScript
            </p>
            <p>
              <span className="text-accent">focus</span>: MVP scope, AI workflows, product UI, APIs
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {["Coaching", "Development", "MVP Workshop", "Custom build"].map((item) => (
                <span key={item} className="rounded-md border border-border bg-inset px-3 py-2 text-white">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const WorkModesSection = () => (
  <section id="about" className={sectionClass}>
    <SectionHeader
      eyebrow="Three ways to work"
      title="Get the level of help your project actually needs."
      description="Some projects need an explanation. Some need hands on delivery. Some need a product plan before anyone writes code."
    />
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {workModes.map((mode) => (
        <Card key={mode.title} hover className="flex h-full flex-col gap-4">
          <span className="font-mono text-sm text-accent">{mode.title.toLowerCase()}</span>
          <h3 className="font-display text-2xl font-semibold text-white">{mode.title}</h3>
          <p className="text-[0.95rem] leading-7 text-secondary">{mode.description}</p>
          <p className="mt-auto border-t border-border pt-4 text-sm font-medium text-white">{mode.outcome}</p>
        </Card>
      ))}
    </div>
  </section>
);

const BuildMosaicSection = () => (
  <section className="border-y border-border bg-surface/55">
    <div className={sectionClass}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <SectionHeader
          eyebrow="What gets built here"
          title="Practical web product work, not vague consulting."
          description="The site is organized around concrete outcomes: clear scope, useful UI, reliable APIs and AI workflows that help rather than distract."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {buildStats.map((stat, index) => (
            <Card
              key={stat.label}
              className={index === 0 ? "sm:row-span-2 sm:flex sm:flex-col sm:justify-end" : undefined}
              hover
            >
              <p className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-none text-white">
                {stat.value}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">{stat.label}</h3>
              <p className="mt-3 text-sm leading-6 text-secondary">{stat.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className={sectionClass}>
    <SectionHeader
      eyebrow="Five services"
      title="Productized help from one hour to a custom MVP."
      description="Prices are visible early so the next step is concrete. Newsletter, coaching and day-rate offers remain no-backend static CTAs for now."
    />
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {serviceOffers.map((service) => (
        <ServiceCard
          key={service.title}
          title={service.title}
          description={service.description}
          price={service.price}
          priceUnit={service.priceUnit}
          badge={service.badge}
          featured={service.featured}
          ctaHref={CALENDLY_URL}
          ctaLabel={service.title.includes("Newsletter") ? "Join the list" : "Book a call"}
          ctaVariant={service.featured ? "primary" : "secondary"}
        />
      ))}
    </div>
  </section>
);

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="border-y border-border bg-surface/55">
      <div className={sectionClass}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Recent projects"
            title="Project proof from real product surfaces."
            description="Open a case study preview to inspect the problem, architecture, results and gallery without leaving the homepage."
          />
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
            Start a similar project
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={setSelectedProject} />
          ))}
        </div>
      </div>
      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

const ProcessAndTechSection = () => {
  const techNames = useMemo(
    () => ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Docker", "Cloudflare", "OpenAI API", ...technologies.map((tech) => tech.name)],
    [],
  );
  const uniqueTech = Array.from(new Set(techNames));

  return (
    <section className={sectionClass}>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            eyebrow="How we work"
            title="A simple process for reducing ambiguity."
            description="The work is framed so each session, sprint or build has a practical definition of done."
          />
          <div className="mt-10">
            {processSteps.map((step, index) => (
              <ProcessStep key={step.title} number={index + 1} title={step.title} isLast={index === processSteps.length - 1}>
                {step.description}
              </ProcessStep>
            ))}
          </div>
        </div>
        <div id="blog" className="lg:pt-16">
          <SectionHeader
            eyebrow="Tech stack"
            title="Modern web tools with teaching clarity."
            description="The stack stays practical: enough structure for production, enough explanation for founders and learners to follow the decisions."
          />
          <Card className="mt-10">
            <div className="flex flex-wrap gap-3">
              {uniqueTech.map((tech) => (
                <Badge key={tech} variant={tech.includes("AI") || tech.includes("OpenAI") ? "accent" : "default"} dot>
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => (
  <section className="border-y border-border bg-surface/55">
    <div className={sectionClass}>
      <SectionHeader
        eyebrow="Pick your plan"
        title="Choose the smallest useful engagement."
        description="Start with clarity when scope is fuzzy, book delivery when the task is defined, or plan the MVP before committing to a larger build."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.title}
            title={plan.title}
            description={plan.description}
            price={plan.price}
            period={plan.period}
            features={plan.features}
            featured={plan.featured}
            ctaLabel="Book a call"
            ctaHref={CALENDLY_URL}
          />
        ))}
      </div>
    </div>
  </section>
);

const NewsletterSection = () => (
  <section className={sectionClass}>
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div>
        <SectionHeader
          eyebrow="Newsletter"
          title="AI web development notes without the weekly noise."
          description="A future paid newsletter for developers, founders and freelancers who want practical signal on coding tools, agents, prompts and product workflows."
        />
        <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            className="min-h-[52px] flex-1 rounded-md border border-strong bg-inset px-4 text-[0.95rem] text-white outline-none transition focus:border-accent focus:ring-4 focus:ring-brand/10"
          />
          <Button type="submit">Preview signup</Button>
        </form>
      </div>
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border bg-surface px-5 py-3 font-mono text-xs text-low">
          june-issue-preview.md
        </div>
        <ol className="space-y-3 p-6 font-mono text-sm leading-7 text-secondary">
          {newsletterIssue.map((item, index) => (
            <li key={item}>
              <span className="mr-4 text-low">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  </section>
);

const FeedbackAndFAQSection = () => (
  <section className="border-y border-border bg-surface/55">
    <div className={sectionClass}>
      <SectionHeader
        eyebrow="Real feedback"
        title="Proof slots are ready for the next client stories."
        description="Testimonials are intentionally marked as placeholders until real quotes can replace them."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {feedbackCards.map((card) => (
          <Card key={card.designation} className="flex h-full flex-col gap-5">
            <p className="text-[0.98rem] leading-7 text-secondary">"{card.testimonial}"</p>
            <div className="mt-auto border-t border-border pt-4">
              <p className="font-display text-lg font-semibold text-white">{card.name}</p>
              <p className="text-sm text-low">
                {card.designation} / {card.company}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="Questions"
          title="Common decisions before booking."
          description="The right service depends mostly on whether you need clarity, implementation, or a scoped MVP plan."
        />
        <div>
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} question={faq.question} defaultOpen={index === 0}>
              {faq.answer}
            </FAQItem>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FinalCTASection = () => (
  <section id="contact" className={sectionClass}>
    <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Book a call</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight text-white">
            Bring me your idea, blocker or product goal.
          </h2>
          <p className="mt-5 max-w-prose text-lg leading-8 text-secondary">
            We will clarify what should happen next: coaching, a focused development block, an MVP workshop or a custom
            build proposal.
          </p>
        </div>
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
          Book a call
          <span aria-hidden="true">-&gt;</span>
        </Button>
      </div>
    </Card>
  </section>
);

const SiteFooter = () => (
  <footer className="border-t border-border bg-surface">
    <div className="mx-auto max-w-site px-6 py-14 sm:px-8 lg:px-10">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-low">{group.title}</h3>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={`${group.title}-${link.title}`}>
                  <a className="text-sm text-secondary transition-colors hover:text-white" href={link.href ?? `#${link.id}`}>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-low sm:flex-row sm:items-center sm:justify-between">
        <p>Christophe Crognier / fullstackchris.dev</p>
        <p>Developer execution + teaching clarity + AI-assisted workflows.</p>
      </div>
    </div>
  </footer>
);

const HomePage = () => (
  <>
    <Hero />
    <WorkModesSection />
    <BuildMosaicSection />
    <ServicesSection />
    <ProjectsSection />
    <ProcessAndTechSection />
    <PricingSection />
    <NewsletterSection />
    <FeedbackAndFAQSection />
    <FinalCTASection />
  </>
);

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <div className="min-h-screen bg-primary text-white">
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesIndexPage />} />
          <Route path="/services/:slug" element={<ServicePageTemplate />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  </BrowserRouter>
);

export default App;
