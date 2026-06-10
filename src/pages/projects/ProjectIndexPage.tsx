import { Helmet } from "react-helmet-async";
import { CALENDLY_URL, projects } from "../../config/constants";
import { Badge, Button, Card, SectionHeader } from "../../components/ui";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const ProjectIndexPage = () => (
  <>
    <Helmet>
      <title>Projects — fullstackchris.dev</title>
      <meta
        name="description"
        content="Full-stack web project case studies: scheduling systems, music games, transit geography games and prediction platforms built with React, Node.js and TypeScript."
      />
    </Helmet>

    <section className="glow-bg grid-bg relative overflow-hidden border-b border-border">
      <div className={`${sectionClass} py-24`}>
        <Badge variant="accent">Case studies</Badge>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
          Projects built for real problems.
        </h1>
        <p className="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
          Each case study covers the problem, architecture, technical challenges, results and lessons learned.
        </p>
        <div className="mt-8">
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Start a similar project
            <span aria-hidden="true"> →</span>
          </Button>
        </div>
      </div>
    </section>

    <section className={sectionClass}>
      <SectionHeader
        eyebrow="Portfolio"
        title="Shipped products with real case studies."
        description="Open each project to read the full architecture, challenges and results."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.slug} hover className="flex h-full flex-col gap-4">
            {project.image && (
              <div className="overflow-hidden rounded-md border border-border">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-48 w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag.name} variant="default">
                  {tag.name}
                </Badge>
              ))}
            </div>
            <h3 className="font-display text-[1.25rem] font-semibold leading-tight text-white">
              {project.name}
            </h3>
            <p className="text-[0.95rem] leading-7 text-secondary">{project.description}</p>
            <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border pt-4">
              <Button href={`/projects/${project.slug}`} variant="primary" size="sm">
                View case study
              </Button>
              {project.live_link && (
                <Button
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                >
                  Live site
                </Button>
              )}
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
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Work with me</p>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">
                Want to build a product like this?
              </h2>
              <p className="mt-4 max-w-prose text-lg leading-8 text-secondary">
                Book an MVP workshop to define the scope, or request a custom quote for a full build.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button href="/services/mvp-bootstrapping-workshop" variant="primary" size="lg">
                MVP Workshop
              </Button>
              <Button
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
              >
                Book a call
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </>
);

export default ProjectIndexPage;
