import { Helmet } from "react-helmet-async";
import { Badge, Button, Card, SectionHeader } from "../../components/ui";
import { blogArticles } from "../../config/blog-data";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

const BlogIndexPage = () => (
  <>
    <Helmet>
      <title>Blog — fullstackchris.dev</title>
      <meta
        name="description"
        content="Practical articles on AI-assisted web development, MVP building, React and Node.js for founders and developers."
      />
    </Helmet>

    <section className="glow-bg grid-bg relative overflow-hidden border-b border-border">
      <div className={`${sectionClass} py-24`}>
        <Badge variant="accent">Blog</Badge>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
          AI and web development resources for builders.
        </h1>
        <p className="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
          Practical articles on AI-assisted development, MVP building, React, Node.js and TypeScript for founders,
          freelancers and developers.
        </p>
      </div>
    </section>

    <section className={sectionClass}>
      <SectionHeader
        eyebrow="Articles"
        title="Coming soon."
        description="These articles are in progress. Subscribe to the newsletter to get notified when they publish."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {blogArticles.map((article) => (
          <Card key={article.slug} hover className="flex h-full flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
              {article.comingSoon && <Badge variant="accent">Coming soon</Badge>}
            </div>
            <h3 className="font-display text-[1.15rem] font-semibold leading-tight text-white">
              {article.title}
            </h3>
            <p className="text-[0.95rem] leading-7 text-secondary">{article.description}</p>
            <div className="mt-auto border-t border-border pt-4">
              <Button href={`/blog/${article.slug}`} variant="ghost" size="sm">
                Read article
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
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Get notified</p>
              <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">
                New articles in your inbox.
              </h2>
              <p className="mt-4 max-w-prose text-lg leading-8 text-secondary">
                The AI web development newsletter covers tools, workflows and product ideas for developers and founders.
              </p>
            </div>
            <Button href="/services/ai-web-development-newsletter" variant="primary" size="lg">
              Join the newsletter
            </Button>
          </div>
        </Card>
      </div>
    </section>
  </>
);

export default BlogIndexPage;
