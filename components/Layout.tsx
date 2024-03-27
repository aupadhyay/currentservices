import { IProject, ISlide, BASE_URL } from "@/api"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"

export function Header({
  color = "white",
  showIndex = true,
  showColophon = false,
}: {
  color?: string
  showIndex?: boolean
  showColophon?: boolean
}) {
  if (!color) {
    color = "white"
  }

  return (
    <div className="flex justify-between w-full">
      <div>
        <h1
          className={clsx(
            "font-favorit font-regular text-[16px] transition-colors ease-in-out duration-500",
            `text-${color}`
          )}
        >
          <Link href="/about" className="tracking-[-0.01em]">Current Services</Link>
        </h1>

      </div>
      {showIndex && (
        <div>
          <h1
            className={clsx(
              "font-favorit font-regular text-[16px] transition-colors ease-in-out duration-500",
              `text-${color}`
            )}
          >
            <Link href="/">Index</Link>
          </h1>
        </div>
      )}
      {showColophon && (
        <div>
          <h1
            className={clsx(
              "font-favorit font-regular text-[16px] transition-colors ease-in-out duration-500",
              `text-${color}`
            )}
          >
            <Link href="/colophon">Colophon</Link>
          </h1>
        </div>
      )}
    </div>
  )
}

export const Index = ({
  projects,
  selected,
  color = "white",
  hoveredProject,
  setHoveredProject,
}: {
  projects: IProject[],
  selected?: string,
  color?: string,
  hoveredProject?: ISlide
  setHoveredProject?: Function
}) => {

  return (
    <div
      className={clsx(
        "font-favorit font-book text-[32px] flex sm:flex-row flex-col-reverse gap-5 transition-colors ease-in-out duration-500",
        `text-${color}`
      )}
    >
      {projects.map((project) => (
        <Link
          href={`/${project.name.replace(/\s/g, "")}`}
          key={project.name}
          onMouseEnter={() => {
            console.log("Hovered Project ID:", hoveredProject);
            setHoveredProject(project.slides[0]);
          }}
          onMouseLeave={() => setHoveredProject(projects[0].slides[0])}
          className={clsx(
            "text-xl hover:border-b-2 border-current transition-colors ease-in-out duration-500 w-fit",
            `text-${color}`, 
            selected === project.name && "border-b-2 border-current"
          )}
        >
          {project.displayName}
        </Link>
      ))}
    </div>
  );
};


export default function Layout({
  color = "None",
  top,
  className = "",
  bottom,
  children,
  scrollRef,
  hoveredProj,
}: {
  color?: string
  top?: React.ReactNode
  className?: string
  background?: string
  bottom?: React.ReactNode
  children?: React.ReactNode
  scrollRef?: React.RefObject<HTMLDivElement>
  hoveredProj?: IProject
}) {
  return (
    <div className={clsx("w-full h-screen relative", `bg-${color}`, className)}>
      <div className="fixed z-20 w-full sm:px-20 px-10 sm:top-20 top-10">
        {top}
      </div>
      <div
        className="w-full h-full snap-y snap-mandatory overflow-y-scroll"
        ref={scrollRef}
      >
        {children}
      </div>

      <div className="fixed sm:bottom-20 z-20 w-full sm:px-20 px-10 bottom-10">
        {bottom}
      </div>
    </div>
  )
}
