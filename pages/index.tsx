import { BASE_URL, IProject, getProjects } from "@/api"
import Layout, { Header } from "@/components/Layout"
import clsx from "clsx"
import { GetStaticProps } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"

// TODO: consider making these configurable in Strapi, along with splash screen bg + text. lots of strapi customizability basically
const SPLASH_DURATION = 2100
const SPLASH_FADE_DURATION = 600

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects({ includeSlides: false })
  return { props: { projects } }
}

function Splash({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "z-[100] bg-[#FF242F] absolute top-0 bottom-0 w-full h-screen flex justify-center items-center",
        className
      )}
    >
      <div className="text-center text-white">
        &copy; 2024 Current Services &amp; All Parties Mentioned Herein
      </div>
    </div>
  )
}

export default function Home({ projects }: { projects: IProject[] }) {
  const [firstLoad, setFirstLoad] = useState(false)
  const [clearSplash, setClearSplash] = useState(false)

  useEffect(() => {
    if (
      window &&
      window.sessionStorage &&
      window.sessionStorage.getItem("firstLoad") == null
    ) {
      setFirstLoad(true)
      const timer = setTimeout(() => {
        setClearSplash(true)
        window.sessionStorage.setItem("firstLoad", "false")
        setTimeout(() => {
          setFirstLoad(false)
        }, SPLASH_FADE_DURATION)
      }, SPLASH_DURATION)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div>
      {firstLoad && (
        <Splash
          className={
            clearSplash
              ? `ease-in-out opacity-0 transition-opacity duration-[${SPLASH_FADE_DURATION}ms]`
              : ""
          }
        />
      )}

      <Index projects={projects} />
    </div>
  )
}

export const Index = ({ projects }: { projects: IProject[] }) => {
  const [selected, setSelected] = useState<IProject>(projects[0])
  const textColor = selected.indexTextColor

  const indexTabs = (
    <div
      className={clsx(
        "font-favorit font-book text-[32px] flex sm:flex-row flex-col-reverse transition-colors ease-in-out duration-500",
        `text-${textColor}`
      )}
    >
      {projects.map((project) => (
        <Link
          href={`/${project.slug}`}
          key={project.slug}
          onMouseEnter={() => {
            setSelected(project)
          }}
          onMouseLeave={() => setSelected(projects[0])}
          className={clsx(
            "select-none text-xl w-fit cursor-[inherit] px-3",
            `text-${textColor}`
          )}
        >
          <span
            className={clsx(
              "w-fit hover:border-b-2 border-current transition-colors ease-in-out duration-500",
              selected.slug === project.slug && "border-b-2 border-current"
            )}
          >
            {project.title}
          </span>
        </Link>
      ))}
    </div>
  )

  const header = (selected: IProject) => (
    <Header color={selected.indexTextColor} showIndex={true} />
  )

  const videos = (selected: IProject) => {
    return projects.map((project) => (
      <video
        key={project.slug}
        autoPlay
        muted
        loop
        className="absolute top-1/2 left-1/2 min-w-full min-h-full max-w-none"
        style={{
          transform: "translate(-50%, -50%)",
          zIndex: selected.slug === project.slug ? 1 : 0,
        }}
        src={BASE_URL + project.hoverVideo.data.attributes.url}
      />
    ))
  }

  return (
    <Layout top={header(selected)} bottom={indexTabs} cursor="angled">
      <div className="w-full h-full relative overflow-hidden">
        {videos(selected)}
      </div>
    </Layout>
  )
}
