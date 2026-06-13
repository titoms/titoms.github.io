import { projects } from "../../config/constants";
import { ProjectCard } from "../ui";

// Modal flow disabled — cards link directly to /projects/[slug].
// Component kept as a grid wrapper so consumers don't need to change.
const ProjectsModal = () => {
  return (
    <div className="mt-10 grid gap-7 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
};

export default ProjectsModal;
