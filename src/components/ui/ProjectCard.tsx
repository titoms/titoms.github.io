import type { ImageAsset, Project } from "../../types";
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
  <Card hover className="flex h-full flex-col gap-5 overflow-hidden p-0">
    <button
      type="button"
      className="block w-full text-left"
      onClick={() => onOpen?.(project)}
      aria-label={`Open ${project.name} case study`}
    >
      {project.image ? (
        <img src={imgSrc(project.image)} alt={project.name} className="aspect-video w-full object-cover" loading="lazy" />
      ) : (
        <div className="grid aspect-video w-full place-items-center bg-surface-deep text-sm text-secondary">
          No image available
        </div>
      )}
    </button>
    <div className="flex flex-1 flex-col gap-4 p-6 pt-0">
      <div className="space-y-3">
        <h3 className="font-display text-2xl font-semibold leading-tight text-white">{project.name}</h3>
        <p className="line-clamp-4 text-sm leading-6 text-secondary">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={`${project.slug}-${tag.name}`} variant="default">
            {tag.name}
          </Badge>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-3">
        {onOpen && (
          <Button variant="secondary" size="sm" onClick={() => onOpen(project)}>
            Case study
          </Button>
        )}
        {project.live_link && (
          <Button href={project.live_link} variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">
            Live project
          </Button>
        )}
      </div>
    </div>
  </Card>
);
