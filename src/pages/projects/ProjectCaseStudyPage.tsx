import { Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CALENDLY_URL, projects } from "../../config/constants";
import { Badge, Button, Card, SectionHeader } from "../../components/ui";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const ProjectCaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  const { caseStudy } = project;

  return (
    <>
      <Helmet>
        <title>{project.name} — Case Study — fullstackchris.dev</title>
        <meta name="description" content={caseStudy.tagline} />
      </Helmet>

      {/* 1 — Hero */}
      <section className="glow-bg grid-bg relative overflow-hidden border-b border-border">
        <div className={`${sectionClass} py-24`}>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag.name} variant="default">
                {tag.name}
              </Badge>
            ))}
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
            {project.name}
          </h1>
          <p className="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
            {caseStudy.tagline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {project.live_link && (
              <Button
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                View live site
                <span aria-hidden="true"> →</span>
              </Button>
            )}
            <Button
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              Source code
            </Button>
            <Button href="/projects" variant="ghost" size="lg">
              ← All projects
            </Button>
          </div>
        </div>
      </section>

      {/* 2 — Problem */}
      <section className={sectionClass}>
        <SectionHeader eyebrow="The problem" title="What needed solving." />
        <Card className="mt-10 max-w-3xl text-[1rem] leading-8 text-secondary">
          {caseStudy.problem}
        </Card>
      </section>

      {/* 3 — Context */}
      <section className="border-y border-border bg-surface/55">
        <div className={sectionClass}>
          <SectionHeader eyebrow="Context" title="Who it was built for." />
          <Card className="mt-10 max-w-3xl text-[1rem] leading-8 text-secondary">
            {caseStudy.context}
          </Card>
        </div>
      </section>

      {/* 4 — Technical challenges */}
      <section className={sectionClass}>
        <SectionHeader eyebrow="Technical challenges" title="The hard parts." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {caseStudy.technicalChallenges.map((challenge, index) => (
            <Card key={index} hover>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                Challenge {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-[0.95rem] leading-7 text-secondary">{challenge}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 5 — Architecture */}
      <section className="border-y border-border bg-surface/55">
        <div className={sectionClass}>
          <SectionHeader eyebrow="Architecture" title="How it was designed." />
          <Card className="mt-10 max-w-3xl text-[1rem] leading-8 text-secondary">
            {caseStudy.architecture}
          </Card>
        </div>
      </section>

      {/* 6 — Implementation */}
      <section className={sectionClass}>
        <SectionHeader eyebrow="Implementation" title="What was actually built." />
        <Card className="mt-10 max-w-3xl text-[1rem] leading-8 text-secondary">
          {caseStudy.implementation}
        </Card>
      </section>

      {/* 7 — Results */}
      <section className="border-y border-border bg-surface/55">
        <div className={sectionClass}>
          <SectionHeader eyebrow="Results" title="What it achieved." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudy.results.map((result, index) => (
              <Card key={index} glow={index === 0} hover>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-positive">
                  Result {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[0.95rem] leading-7 text-secondary">{result}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Lessons learned */}
      <section className={sectionClass}>
        <SectionHeader eyebrow="Lessons learned" title="What this project taught." />
        <div className="mt-10 max-w-3xl space-y-5">
          {caseStudy.lessonsLearned.map((lesson, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="mt-1 shrink-0 font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[0.95rem] leading-7 text-secondary">{lesson}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9 — Image gallery (optional) */}
      {project.images.length > 0 && (
        <section className="border-y border-border bg-surface/55">
          <div className={sectionClass}>
            <SectionHeader eyebrow="Gallery" title="Screenshots." />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.images.map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-border"
                >
                  <img
                    src={img}
                    alt={`${project.name} screenshot ${index + 1}`}
                    className="h-56 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10 — Final CTA */}
      <section className={sectionClass}>
        <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                Work with me
              </p>
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
      </section>
    </>
  );
};

export default ProjectCaseStudyPage;
