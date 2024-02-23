import { IProject } from "@/api"
import clsx from "clsx"
import Link from "next/link"

export function Header({
  color = "white",
  showIndex = true,
}: {
  color?: string
  showIndex?: boolean
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
          <Link href="/about">Current Services</Link>
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
    </div>
  )
}

export const Index = ({
  projects,
  selected,
}: {
  projects: IProject[]
  selected?: string
}) => {
  return (
    <div className="font-favorit font-book text-[32px] flex flex-row gap-10 transition-colors ease-in-out duration-500">
      {projects.map((project) => (
        <Link
          href={`/${project.name.replace(/\s/g, "")}`}
          key={project.name}
          className={clsx(
            "text-xl text-white hover:border-b transition-colors ease-in-out duration-500",
            selected === project.name && "border-b"
          )}
        >
          {/* {project.name.replace(/\b\w/g, char => char.toUpperCase())} */}
          {project.displayName}
        </Link>
      ))}
    </div>
  )
}

export default function Layout({
  color = "None",
  top,
  className = "",
  bottom,
  children,
  scrollRef,
}: {
  color?: string
  top?: React.ReactNode
  className?: string
  background?: string
  bottom?: React.ReactNode
  children?: React.ReactNode
  scrollRef?: React.RefObject<HTMLDivElement>
}) {
  return (
    <div className={clsx("w-full h-screen relative", `bg-${color}`, className)}>
      <div className="fixed top-20 z-20 w-full px-20">{top}</div>
      <div
        className="w-full h-full snap-y snap-mandatory overflow-y-scroll"
        ref={scrollRef}
      >
        {children}
      </div>

      <div className="fixed bottom-20 z-20 w-full px-20">{bottom}</div>
    </div>
  )
}
