import {
  BASE_URL,
  IProject,
  ISlide,
  getProjectByName,
  getProjects,
} from "@/api"
import Index from "@/components/Index"
import Layout from "@/components/Layout"
import clsx from "clsx"
import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"

export const getStaticPaths: GetStaticPaths = async () => {
  const projects: IProject[] = await getProjects()
  const paths = projects.map((project) => ({
    params: { project: project.name },
  }))

  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = (await getProjectByName(
    params!.project as string
  )) as IProject
  const projects = await getProjects()
  return { props: { project, projects } }
}

const Header = ({ color = "white" }: { color?: string }) => {
  return (
    <div className="flex justify-between w-full">
      <div>
        <h1
          className={clsx('text-xl transition-colors ease-in-out duration-500', `text-${color}`)}
        >
          <Link href="/about">Current Services</Link>
        </h1>
      </div>
      <div>
        <h1 className={clsx('text-xl', `text-${color}`)}>
          <Link href="/">Index</Link>
        </h1>
      </div>
    </div>
  )
}

const Slide = ({
  slide,
  nextSlide,
  bgColor = "white",
}: {
  slide: any
  nextSlide: Function
  bgColor?: string
}) => {
  const coverUrl =
    (slide.cover.data && `${BASE_URL}${slide.cover.data.attributes.url}`) || ""
  return (
    <div
      className="w-full px-24 py-36 h-screen relative"
      style={
        coverUrl
          ? { backgroundImage: `url(${coverUrl})`, backgroundSize: "cover" }
          : { backgroundColor: bgColor }
      }
      onClick={() => nextSlide()}
    >
      <p className={`text-${slide.text_color || "white"} text-2xl w-3/4`}>
        {slide.description}
      </p>
    </div>
  )
}

const ProjectPage = ({
  project,
  projects,
}: {
  project: IProject
  projects: IProject[]
}) => {
  const [slideNumber, setSlideNumber] = useState(0)

  const nextSlide = (currProject: IProject) => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    })
    setSlideNumber((old) =>
      old + 1 > currProject.slides.length - 1 ? old : old + 1
    )
  }

  const prevSlide = () => {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: "smooth",
    })
    setSlideNumber((old) => (old - 1 < 0 ? old : old - 1))
  }

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        nextSlide(project)
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      }
    })
  }, [])

  useEffect(() => {
    setSlideNumber(0)
  }, [project])

  if (!project) {
    return (
      <div className="flex flex-row w-full justify-center text-white">
        <h1>404 - Page Not Found</h1>
      </div>
    )
  }

  const currentSlide = project.slides[slideNumber]

  const slides = project.slides.map((slide: ISlide, index: number) => (
    <Slide slide={slide} key={index} nextSlide={() => nextSlide(project)} />
  ))

  let bottom =
    slideNumber == 0 ? (
      <Index projects={projects} selected={project.name} />
    ) : (
      <></>
    )
  if (slideNumber == project.slides.length - 1) {
    const projectIndex = projects.findIndex((p) => p.name === project.name)
    const nextProject = projects[(projectIndex + 1) % projects.length]
    const nextProjectName =
      nextProject.name.charAt(0).toUpperCase() + nextProject.name.slice(1)
    bottom = (
      <div className="flex flex-row justify-between mb-10">
        <h1 className={`text-xl text-${currentSlide.text_color || "white"}`}>
          <Link href="/">Index</Link>
        </h1>
        <h1 className={`text-xl text-${currentSlide.text_color || "white"}`}>
          <Link href={`/${nextProject.name}`}>Next - {nextProjectName}</Link>
        </h1>
      </div>
    )
  }

  return (
    <Layout
      top={
        <Header color={(currentSlide && currentSlide.text_color) || "white"} />
      }
      bottom={bottom}
    >
      {slides}
    </Layout>
  )
}

export default ProjectPage
