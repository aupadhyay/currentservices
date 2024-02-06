import { IProject } from "@/api";
import clsx from "clsx";
import Link from "next/link";

const Index = ({ projects, selected }: { projects: IProject[]; selected?: string }) => {
  return (
    <div className="absolute bottom-20" style={{ display: "flex" }}>
      {projects.map((project) => (
        <Link
          href={`/${project.name.replace(/\s/g, "")}`}
          key={project.name}
          className={clsx("text-xl text-white hover:underline", selected === project.name && "border-b")}
          style={{ marginRight: "50px" }}
        >
          {project.name.charAt(0).toUpperCase() + project.name.slice(1)}
        </Link>
      ))}
    </div>
  )
}

export default Index;
