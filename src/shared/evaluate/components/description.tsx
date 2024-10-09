import { ProjectDataProps } from "@/utils/utils";
import { faBookOpen, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProjectDescription = ({project}: ProjectDataProps) => {
  return (
    <div className="flex flex-col justify-center space-y-4">
      <img
        src={project.image_url}
        width="550"
        height="550"
        alt="Project Image"
        className="mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last lg:aspect-square"
      />
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{project.project_name}</h2>
        <p className="text-muted-foreground text-lg">{project.description}</p>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faUsers}
            className="h-5 w-5 text-muted-foreground"
          />
          <p className="text-muted-foreground">{project.members.join(", ")}</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faBookOpen}
            className="h-5 w-5 text-muted-foreground"
          />
          <p className="text-muted-foreground">Asignatura: {project.subject.subject_name}</p>
        </div>
      </div>
    </div>
  );
};
