import type { CSSProperties } from "react";
import type { ImageAsset, Project } from "../../types";
import { getTechBadgeStyle } from "../../config/techBadges";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";

type ProjectCardProps = {
  project: Project;
  onOpen?: (project: Project) => void;
};

const imgSrc = (img: ImageAsset | null): string | undefined => {
  if (!img) return undefined;
  return typeof img === 'string' ? img : img.src;
};

export const ProjectCard = ({ project, onOpen }: ProjectCardProps) => (
  <Card hover className="flex h-full flex-col gap-0 p-0">
    <button
      type="button"
      className="block w-full text-left"
      onClick={() => onOpen?.(project)}
      aria-label={`Open ${project.name} case study`}
    >
      {project.image ? (
        <div className="project-media-frame overflow-hidden rounded-t-lg border-b border-border">
          <img
            src={imgSrc(project.image)}
            alt={project.name}
            className="aspect-[1.72] w-full object-cover opacity-90 transition duration-300 hover:scale-[1.02] hover:opacity-100"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="project-media-frame grid aspect-[1.72] w-full place-items-center overflow-hidden rounded-t-lg border-b border-border">
          <span className="font-mono text-xs font-semibold tracking-[0.18em] text-low">
            screenshot · {project.slug}.app
          </span>
        </div>
      )}
    </button>
    <div className="flex flex-1 flex-col gap-4 p-6">
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
        <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-white">{project.name}</h3>
        <p className="line-clamp-3 text-[0.95rem] leading-7 text-secondary">{project.description}</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-3">
        {onOpen && (
          <Button variant="secondary" size="sm" onClick={() => onOpen(project)}>
            Case study
          </Button>
        )}
        {project.live_link && (
          <Button href={project.live_link} variant="secondary" size="sm" target="_blank" rel="noopener noreferrer">
            Live project
          </Button>
        )}
      </div>
    </div>
  </Card>
);
