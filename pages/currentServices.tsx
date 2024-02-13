import { IProject, getProjects } from "@/api";
import { GetStaticProps } from "next";
import Link from "next/link";
import router from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects();
  return { props: { projects } };
};

export default function Home({projects}: { projects : IProject[] }) {
  const handleClick = () => {
    // Handle the click event, such as logging or performing other actions
    console.log("Link clicked!");
    router.push("/");
  };

  const handleClickPage = (word: string) => {
    // Handle the click event, such as logging or performing other actions
    const wordWithoutSpace = word.replace(/\s/g, "");
    console.log("Link clicked!");
    router.push(wordWithoutSpace);
  };

  return (
    <div className="w-full px-24 py-20 bg-[#bcbcbc] h-screen relative">
      <div className="absolute top-16">
        <h1 className="text-white" onClick={handleClick}>
          Current Services
        </h1>
      </div>

      <div className="absolute bottom-20" style={{ display: "flex" }}>
        {projects.map((project) => (
          <Link
            href={`/${project.name.replace(/\s/g, "")}`}
            key={project.name}
            className="text-xl text-white hover:underline"
            style={{ marginRight: "50px" }}
          >
            {project.name.charAt(0).toUpperCase() +
              project.name.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}
