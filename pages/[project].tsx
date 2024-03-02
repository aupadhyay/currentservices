import {
  BASE_URL,
  IProject,
  ISlide,
  getProjectByName,
  getProjects,
} from "@/api"
import { Header, Index, default as Layout } from "@/components/Layout"
import clsx from "clsx"
import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

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

const Slide = ({
  slide,
  prevSlide,
  nextSlide,
  bgColor = "white",
}: {
  slide: any,
  prevSlide: Function,
  nextSlide: Function,
  bgColor?: string
}) => {
  const coverUrl =
    (slide.cover.data && `${BASE_URL}${slide.cover.data.attributes.url}`) || ""

  const isVideo = coverUrl.endsWith(".mp4") || coverUrl.endsWith(".mov")

  return (
    <div
      className="w-full px-24 py-36 h-screen relative snap-start"
      style={
        coverUrl && !isVideo
          ? { backgroundImage: `url(${coverUrl})`, backgroundSize: "cover", backgroundPosition: "center"}
          : { backgroundColor: bgColor }
      }
      onClick={(e) => {
        const clickPosition = e.clientY;
        const halfScreenHeight = window.innerHeight / 2;
        if (clickPosition <= halfScreenHeight) {
          prevSlide();
        } else {
          nextSlide();
        }
      }}
    >
      {isVideo && (
       <div className="absolute top-0 left-0 w-full h-full">
         <video autoPlay muted loop className="w-full h-full sm:object-cover" src={coverUrl} />
       </div> 
      )}
      <p
        className={`text-${
          slide.textColor || "white"
        } sm:w-3/4 font-favorit font-book sm:text-[32px] text-[21px] leading-[135%] tracking-[-0.21px]`}
      >
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
  const scrollRef = useRef<HTMLDivElement>(null)

  const nextSlide = (currProject: IProject) => {
    if (scrollRef.current === null) return
    scrollRef.current.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    })
    setSlideNumber((old) =>
      old + 1 > currProject.slides.length - 1 ? old : old + 1
    )
  }

  const prevSlide = () => {
    if (scrollRef.current === null) return
    scrollRef.current.scrollBy({
      top: -window.innerHeight,
      behavior: "smooth",
    })
    setSlideNumber((old) => (old - 1 < 0 ? old : old - 1))
  }

  useEffect(() => {
    if (scrollRef.current === null) return

    const handleScroll = () => {
      if (scrollRef.current === null) return
      const currentScrollY = scrollRef.current.scrollTop
      const windowHeight = window.innerHeight
      const newSlideNumber = Math.round(currentScrollY / windowHeight)
      setSlideNumber(newSlideNumber)
    }
    scrollRef.current.addEventListener("scroll", handleScroll)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        nextSlide(project)
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [scrollRef])

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
    <Slide slide={slide} key={index} prevSlide={prevSlide} nextSlide={() => nextSlide(project)} />
  ))

  let bottom = <></>
  if (slideNumber === 0) {
    bottom = <Index projects={projects} selected={project.name} color={currentSlide.textColor} />
  } else if (slideNumber === project.slides.length - 1) {
    const projectIndex = projects.findIndex((p) => p.name === project.name)
    const nextProject = projects[(projectIndex + 1) % projects.length]
    const nextProjectName =
      nextProject.name.charAt(0).toUpperCase() + nextProject.name.slice(1)
    bottom = (
      <div className="flex flex-row justify-between transition-colors">
        <h1 className={clsx('font-favorit font-book text-[32px]', currentSlide.textColor && `text-${currentSlide.textColor}`)}>
          <Link href="/">Index</Link>
        </h1>
        <h1 className={clsx('font-favorit font-book text-[32px]', currentSlide.textColor && `text-${currentSlide.textColor}`)}>
          <Link href={`/${nextProject.name}`}>Next - {nextProjectName}</Link>
        </h1>
      </div>
    )
  }

  return (
    <Layout
      top={<Header color={currentSlide.textColor} showIndex={slideNumber != project.slides.length - 1} />}
      bottom={bottom}
      scrollRef={scrollRef}
    >
      {slides}
    </Layout>
  )
}

export default ProjectPage
