import { getProjects } from "../../config/projects";
import { ProjectCard } from "../ui";

type ProjectsModalProps = {
  locale?: "en" | "fr" | "es";
};

// Modal flow disabled — cards link directly to /projects/[slug].
// Component kept as a grid wrapper so consumers don't need to change.
const ProjectsModal = ({ locale = "en" }: ProjectsModalProps) => {
  const projects = getProjects(locale);
  return (
    <div className="mt-10 grid gap-7 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} locale={locale} />
      ))}
    </div>
  );
};

export default ProjectsModal;
