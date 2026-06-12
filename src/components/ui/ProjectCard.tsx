import type { CSSProperties, KeyboardEvent } from "react";
import type { ImageAsset, Project } from "../../types";
import { getTechBadgeStyle } from "../../config/techBadges";
import { Badge } from "./Badge";
import { Card } from "./Card";

type ProjectCardProps = {
  project: Project;
  onOpen?: (project: Project) => void;
};

const imgSrc = (img: ImageAsset | null): string | undefined => {
  if (!img) return undefined;
  return typeof img === "string" ? img : img.src;
};

export const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
  const openProject = () => onOpen?.(project);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProject();
  };

  return (
    <Card
      hover
      className="group flex h-full cursor-pointer flex-col gap-0 overflow-hidden p-0"
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={openProject}
      onKeyDown={handleKeyDown}
      aria-label={onOpen ? `Open ${project.name} case study` : undefined}
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
          <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-white">{project.name}</h3>
          <p className="line-clamp-3 text-[0.95rem] leading-7 text-secondary">{project.description}</p>
        </div>
      </div>
    </Card>
  );
};
