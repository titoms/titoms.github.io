import { Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Badge, Button, Card, SectionHeader } from "../../components/ui";
import { blogArticles } from "../../config/blog-data";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

type RelatedService = {
  slug: string;
  title: string;
  description: string;
};

const relatedServices: RelatedService[] = [
  {
    slug: "web-project-coaching",
    title: "Web project coaching",
    description: "Get hands-on guidance on your project or blocker.",
  },
  {
    slug: "full-stack-development-day",
    title: "Development day",
    description: "Book a focused development session.",
  },
  {
    slug: "mvp-bootstrapping-workshop",
    title: "MVP workshop",
    description: "Turn your idea into a realistic build plan.",
  },
];

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/blog" replace />;

  return (
    <>
      <Helmet>
        <title>{article.title} — fullstackchris.dev</title>
        <meta name="description" content={article.description} />
      </Helmet>

      <section className="glow-bg grid-bg relative overflow-hidden border-b border-border">
        <div className={`${sectionClass} py-24`}>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
            {article.comingSoon && <Badge variant="accent">Coming soon</Badge>}
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
            {article.title}
          </h1>
          <p className="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
            {article.description}
          </p>
          <Button href="/blog" variant="ghost" size="sm" className="mt-8" aria-label="Back to all articles">
            <span aria-hidden="true">←</span> All articles
          </Button>
        </div>
      </section>

      {article.comingSoon && (
        <section className={sectionClass}>
          <Card className="mx-auto max-w-3xl p-10 sm:p-14">
            <div className="flex flex-col items-center gap-6 py-10 text-center">
              <Badge variant="accent">Coming soon</Badge>
              <h2 className="font-display text-2xl font-semibold text-white">
                This article is in progress.
              </h2>
              <p className="max-w-prose text-secondary">
                I am working on this article. Subscribe to the AI web development newsletter to get notified when it
                publishes.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/services/ai-web-development-newsletter" variant="primary" size="lg">
                  Join the newsletter
                </Button>
                <Button href="/blog" variant="secondary" size="lg">
                  Back to blog
                </Button>
              </div>
            </div>
          </Card>
        </section>
      )}

      <section className="border-t border-border bg-surface/55">
        <div className={sectionClass}>
          <SectionHeader eyebrow="While you wait" title="Work with me directly." />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {relatedServices.map((service) => (
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
    </>
  );
};

export default BlogArticlePage;
