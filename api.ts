export const BASE_URL = "https://cs.axu.sh";
const API_URL = `${BASE_URL}/api`;

export type ISlide = {
  id: string;
  title: string;
  description: string;
  cover: {
    id: string;
    url: string;
  };
  textColor?: string;
};

export type IProject = {
  id: string;
  name: string;
  description: string,
  displayName: string,
  slides: ISlide[];
};

const headers = {
  Authorization: `bearer ${process.env.STRAPI_KEY}`,
};

const get = async (url: string) => {
  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error getting data from ${url}: ${error}`);
  }
};

const getProjects = async () => {
  const project = await get(`${API_URL}/projects?populate=slides.cover`);
  return project.data.map((project: any) => project.attributes);
};

const getProjectById = async (id: string) => {
  return await get(`${API_URL}/projects/${id}?populate=*`);
};

const getProjectByName = async (name: string) => {
  const projects = await get(`${API_URL}/projects?filters[name][$eq]=${name}&populate=slides.cover`)
  if (projects.data.length === 0) {
    return null;
  }
  return projects.data[0].attributes;
};

export { getProjectById, getProjectByName, getProjects };
