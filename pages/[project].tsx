import {
  BASE_URL,
  IProject,
  ISlide,
  getProjectBySlug,
  getProjects,
} from "@/api"
import { Header, default as Layout } from "@/components/Layout"
import clsx from "clsx"
import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { memo, useEffect, useRef, useState } from "react"

export const getStaticPaths: GetStaticPaths = async () => {
  const projects: IProject[] = await getProjects()
  const paths = projects
    .filter((project) => project.slug)
    .map((project) => ({
      params: { project: project.slug },
    }))

  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = (await getProjectBySlug(
    params!.project as string
  )) as IProject
  const projects = await getProjects()
  return { props: { project, projects } }
}

const SlideComponent = ({
  slide,
  prevSlide,
  nextSlide,
}: {
  slide: ISlide
  prevSlide: Function
  nextSlide: Function
}) => {
  // TODO: make add this to strapi instead
  const Media = ({ url }: { url: string }) => {
    if (url.endsWith(".mp4") || url.endsWith(".mov")) {
      return (
        <video
          autoPlay
          playsInline
          controls={false}
          muted
          loop
          className="w-full h-full sm:object-cover"
          src={url}
        />
      )
    } else {
      return <img className="w-full h-full sm:object-cover" src={url} />
    }
  }

  return (
    <div
      className="w-full h-screen relative snap-start max-h-screen overflow-y-hidden"
      onClick={(e) => {
        const clickPosition = e.clientY
        const halfScreenHeight = window.innerHeight / 2
        if (clickPosition <= halfScreenHeight) {
          prevSlide()
        } else {
          nextSlide()
        }
      }}
    >
      <div
        className="z-[-1] absolute top-0 left-0 w-full h-full"
        style={{
          backgroundColor: slide.bgMaskColor,
          opacity: slide.bgMaskOpacity,
        }}
      ></div>
      <div className="z-[-2] hidden sm:block xl:hidden absolute top-0 left-0 w-full h-full">
        {slide.desktopBg?.data?.attributes?.url && (
          <Media url={BASE_URL + slide.desktopBg.data.attributes.url} />
        )}
      </div>
      <div className="z-[-2] block sm:hidden xl:hidden absolute top-0 left-0 w-full h-full">
        {slide.mobileBg?.data?.attributes?.url && (
          <Media url={BASE_URL + slide.mobileBg.data.attributes.url} />
        )}
      </div>
      <div className="z-[-2] hidden sm:hidden xl:block absolute top-0 left-0 w-full h-full">
        {slide.largeDesktopBg?.data?.attributes?.url && (
          <Media url={BASE_URL + slide.largeDesktopBg.data.attributes.url} />
        )}
      </div>
      <div className="px-8 sm:pl-[16.67%] pt-[40%] sm:pt-[16.67%]">
        <p
          className={`text-${slide.textColor} sm:w-3/4 font-favorit font-book sm:text-3xl text-[21px] leading-[135%] tracking-[-0.21px] `}
        >
          {slide.description}
        </p>

        {slide.services && (
          <div className="grid grid-cols-3 mt-10">
            <div className="col-span-1">
              <p
                className={`text-${slide.textColor} sm:w-3/4 font-favorit font-book sm:text-2xl text-[21px] leading-[135%] tracking-[-0.21px]`}
              >
                Services rendered
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-2">
              {slide.services.map((service, index) => (
                <p
                  key={index}
                  className={`text-${slide.textColor} sm:w-3/4 font-favorit font-book sm:text-2xl text-[21px] leading-[135%] tracking-[-0.21px]`}
                >
                  {service}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Slide = memo(SlideComponent, (prevProps, nextProps) => {
  return prevProps.slide.id === nextProps.slide.id
})

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

    let prevSlideNumber = slideNumber
    const handleScroll = () => {
      if (scrollRef.current === null) return
      const currentScrollY = scrollRef.current.scrollTop
      const windowHeight = window.innerHeight
      const newSlideNumber = Math.round(currentScrollY / windowHeight)
      if (newSlideNumber !== prevSlideNumber) {
        setSlideNumber(newSlideNumber)
      }
      prevSlideNumber = newSlideNumber
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
    <Slide
      slide={slide}
      key={index}
      prevSlide={prevSlide}
      nextSlide={() => nextSlide(project)}
    />
  ))

  let bottom = <></>
  if (slideNumber === project.slides.length - 1) {
    const projectIndex = projects.findIndex((p) => p.slug === project.slug)
    const nextProject = projects[(projectIndex + 1) % projects.length]
    const nextProjectName = nextProject.title
    bottom = (
      <div className="flex flex-row justify-between transition-colors">
        <h1
          className={clsx(
            "font-favorit font-book text-[32px]",
            currentSlide.textColor && `text-${currentSlide.textColor}`
          )}
        >
          <Link href="/" className="cursor-[inherit] text-2xl">
            Index
          </Link>
        </h1>
        <h1
          className={clsx(
            "font-favorit font-book text-2xl",
            currentSlide.textColor && `text-${currentSlide.textColor}`
          )}
        >
          <span
            className="cursor-[inherit] text-2xl"
            onClick={() => {
              window.location.href = `/${nextProject.slug}`
            }}
          >
            Next - {nextProjectName}
          </span>
        </h1>
      </div>
    )
  }

  return (
    <Layout
      top={
        <Header
          color={currentSlide.textColor}
          showIndex={slideNumber != project.slides.length - 1}
        />
      }
      bottom={bottom}
      scrollRef={scrollRef}
      cursor={currentSlide.cursor}
      textColor={currentSlide.textColor}
    >
      {slides}
    </Layout>
  )
}

export default ProjectPage