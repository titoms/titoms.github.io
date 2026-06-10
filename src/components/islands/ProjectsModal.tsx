import { useState } from "react";
import { projects } from "../../config/constants";
import { ProjectCard } from "../ui";
import CaseStudyModal from "../CaseStudyModal";
import type { Project } from "../../types";

const ProjectsModal = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpen={setSelectedProject}
          />
        ))}
      </div>
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsModal;
