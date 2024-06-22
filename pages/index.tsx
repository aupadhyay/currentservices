import { BASE_URL, IProject, getProjects } from '@/api'
import Layout, { Header } from '@/components/Layout'
import clsx from 'clsx'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import ProjectPage from './[project]'

// TODO: consider making these configurable in Strapi, along with splash screen bg + text. lots of strapi customizability basically
const SPLASH_DURATION = 2100
const SPLASH_FADE_DURATION = 600

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects({ includeMetadata: true })
  return { props: { projects } }
}

function Splash({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={clsx(
        'z-[100] bg-[#FF242F] absolute top-0 bottom-0 w-full h-dvh flex justify-center items-center',
        className
      )}
      style={style}
    >
      <div className="text-center text-white px-16">
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
      window.sessionStorage.getItem('firstLoad') == null
    ) {
      setFirstLoad(true)
      const timer = setTimeout(() => {
        setClearSplash(true)
        window.sessionStorage.setItem('firstLoad', 'false')
        setTimeout(() => {
          setFirstLoad(false)
        }, SPLASH_FADE_DURATION)
      }, SPLASH_DURATION)

      const handleClick = () => {
        clearTimeout(timer)
        setClearSplash(true)
        window.sessionStorage.setItem('firstLoad', 'false')
        setTimeout(() => {
          setFirstLoad(false)
        }, SPLASH_FADE_DURATION)
      }

      window.addEventListener('click', handleClick)

      return () => {
        clearTimeout(timer)
        window.removeEventListener('click', handleClick)
      }
    }
  }, [])

  return (
    <div>
      {firstLoad && (
        <Splash
          style={{
            transition: `opacity ${SPLASH_FADE_DURATION}ms`,
            opacity: clearSplash ? 0 : 1,
          }}
        />
      )}

      <Index projects={projects} />
    </div>
  )
}

export const Index = ({ projects }: { projects: IProject[] }) => {
  const [selected, setSelected] = useState<IProject>(projects[0])
  const textColor = selected.indexTextColor
  const [clicked, setClicked] = useState(false)

  const currPageRef = useRef<HTMLDivElement>(null)
  const nextPageRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const indexTabs = (
    <div
      className={clsx(
        'font-favorit font-book text-[32px] flex sm:flex-row flex-col-reverse'
      )}
    >
      {projects.map((project) => (
        <a
          key={project.slug}
          href={`/${project.slug}`}
          onMouseEnter={() => {
            setSelected(project)
          }}
          onMouseLeave={() => setSelected(projects[0])}
          onClick={(e) => {
            e.preventDefault()
            setClicked(true)
            if (currPageRef.current) {
              currPageRef.current.style.transform = 'translateY(-20%)'
            }
            if (nextPageRef.current) {
              const idx = projects.findIndex((p) => p.slug === project.slug)
              const child = nextPageRef.current.children[idx] as HTMLDivElement
              if (child) {
                child.style.transform = 'translateY(-100dvh)'
              }
            }
            setTimeout(() => {
              window.location.href = `/${project.slug}`
            }, 1200)
          }}
          className={clsx(
            'select-none text-xl w-fit cursor-[inherit] pr-6',
            `text-${textColor}`
          )}
        >
          <span
            className={clsx(
              'w-fit hover:underline underline-offset-10 decoration-2	transition-colors ease-in-out duration-500',
              selected.slug === project.slug &&
                'underline underline-offset-10 decoration-2'
            )}
          >
            {project.title}
          </span>
        </a>
      ))}
    </div>
  )

  const videos = (selected: IProject) => {
    return projects.map((project) => (
      <video
        key={project.slug}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full max-w-none sm:object-cover"
        style={{
          transform: 'translate(-50%, -50%)',
          zIndex: selected.slug === project.slug ? 1 : 0,
        }}
        src={BASE_URL + project.hoverVideo.data.attributes.url}
      />
    ))
  }

  return (
    <Layout
      top={
        <Header
          color={
            clicked ? selected.slides[0].textColor : selected.indexTextColor
          }
          showIndex={clicked}
        />
      }
      bottom={!clicked ? indexTabs : null}
      textColor={
        !clicked ? selected.indexTextColor : selected.slides[0].textColor
      }
      cursor={!clicked ? 'angled' : selected.slides[0].cursor}
      className="overflow-hidden"
    >
      <div
        ref={currPageRef}
        className="w-full snap-start h-full transition-transform ease-in-out duration-[1200ms]"
      >
        <div className="w-full h-full relative overflow-hidden">
          {videos(selected)}
        </div>
      </div>

      <div className="w-full h-full relative">
        <div
          ref={nextPageRef}
          className="w-full h-[100vh] absolute top-0 left-0 transition-transform ease-in-out duration-[1000ms]"
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="w-full h-[100vh] absolute top-0 left-0 transition-transform ease-in-out duration-[1000ms]"
            >
              <ProjectPage
                key={project.slug}
                project={project}
                projects={projects}
                showNav={false}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
