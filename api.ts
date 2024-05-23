export const BASE_URL = "https://cs.axu.sh"
const API_URL = `${BASE_URL}/api`

export type IMedia = {
  data: {
    id: string
    attributes: {
      name: string
      url: string
    }
  }
}

export type ICursor = "normal" | "angled" | "vertical"

export type IProject = {
  id: string
  slug: string
  title: string
  hoverVideo: IMedia
  indexTextColor: "black" | "white"
  slides: ISlide[]
}

export type ISlide = {
  id: string
  description: string // Slide description. Renders if provided
  textColor: "white" | "black" // Text color for all text
  desktopBg: IMedia // Desktop background
  mobileBg: IMedia // Mobile background
  largeDesktopBg: IMedia //Large Desktop background
  cursor: ICursor // Cursor design
  bgMaskColor: string // Background mask color
  bgMaskOpacity: string // Background mask opacity
  navEnabled: boolean // If scroll & cursor animations are enabled
  services: string[] // Services provided by project, renders separate design if provided
}

// Constants
export const splash = "© 2024 Current Services & All Parties Mentioned Herein"
const aboutDescription =
  "Current  Services is an interdisciplinary design and strategy practice founded in 2020. Operating as a core group that often extends into a broader network, we employ an array of methodologies to support every phase of business building with the goal of bringing change-minded ideas to life. To talk to us about a collaborative project, please email our offices."
const aboutCategories = {
  Idea: ["Research", "Strategy", "Consulting", "IA/UX"],
  Branch: ["Concepting", "Visual Identity", "Naming", "Positioning"],
  Content: ["Print/Packaging", "Digital", "Film/Motion", "Spatial"],
  Growth: [
    "Market Entry",
    "Venture Planning",
    "Capital Strategy",
    "Forecasting",
  ],
}

const headers = {
  Authorization: `bearer ${process.env.STRAPI_KEY}`,
}

const get = async (url: string) => {
  try {
    const response = await fetch(url, { headers })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error getting data from ${url}: ${error}`)
  }
}

const getProjects = async (options: { includeSlides?: boolean } = {}) => {
  const { includeSlides } = options
  const populate = includeSlides ? "slides.cover" : ""
  const project = await get(
    `${API_URL}/projects?populate=hoverVideo&populate=${populate}`
  )
  return project.data.map((project: any) => project.attributes)
}

const getProjectById = async (id: string) => {
  return await get(`${API_URL}/projects/${id}?populate=*`)
}

const getProjectBySlug = async (slug: string) => {
  const projects = await get(
    `${API_URL}/projects?filters[slug][$eq]=${slug}&populate=slides.desktopBg,slides.mobileBg,slides.largeDesktopBg`
  )
  if (projects.data.length === 0) {
    return null
  }
  return projects.data[0].attributes
}

export { getProjectById, getProjectBySlug, getProjects }
