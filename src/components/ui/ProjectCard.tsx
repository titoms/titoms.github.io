import type { CSSProperties } from "react";
import type { ImageAsset, Project } from "../../types";
import { getTechBadgeStyle } from "../../config/techBadges";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Button } from "./Button";
import { useTranslations } from "../../i18n/ui";

type ProjectCardProps = {
  project: Project;
  locale?: string;
};

const imgSrc = (img: ImageAsset | null): string | undefined => {
  if (!img) return undefined;
  return typeof img === "string" ? img : img.src;
};

export const ProjectCard = ({ project, locale = "en" }: ProjectCardProps) => {
  const t = useTranslations(locale);
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const caseStudyHref = `${localePrefix}/projects/${project.slug}/`;
  const liveHref = project.live_link;

  return (
    <Card
      hover
      className="group flex h-full flex-col gap-0 overflow-hidden p-0"
    >
      <a
        href={caseStudyHref}
        className="block"
        aria-label={`Open ${project.name} case study`}
      >
        {project.image ? (
          <div className="project-media-frame overflow-hidden border-b border-border">
            <img
              src={imgSrc(project.image)}
              alt={project.name}
              className="aspect-[1.78] w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="project-media-frame grid aspect-[1.78] w-full place-items-center overflow-hidden border-b border-border">
            <span className="font-mono text-xs font-semibold tracking-[0.18em] text-low">
              screenshot - {project.slug}.app
            </span>
          </div>
        )}
      </a>
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={`${project.slug}-${tag.name}`}
              variant="default"
              className="tech-badge"
              style={getTechBadgeStyle(tag.name) as CSSProperties}
              dot={tag.name.toLowerCase() === "ai"}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-white">
            <a href={caseStudyHref} className="hover:text-accent-300 transition-colors">
              {project.name}
            </a>
          </h3>
          <p className="line-clamp-3 text-[0.95rem] leading-7 text-secondary">{project.description}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <Button href={caseStudyHref} variant="secondary" size="sm">
            {t("common.caseStudy")}
          </Button>
          {liveHref && (
            <Button
              href={liveHref}
              variant="gradient"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("common.testLive")}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
