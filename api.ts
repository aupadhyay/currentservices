const BASE_URL = "https://cs.axu.sh/api";

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
  const project = await get(`${BASE_URL}/projects`);
  console.log("ova here: ", project);
  return project.data;
};

const getProjectById = async (id: string) => {
  return await get(`${BASE_URL}/projects/${id}?populate=*`);
};

const getProjectByName = async (name: string) => {
  const projects = await get(`${BASE_URL}/projects?filters[name][$eq]=${name}&populate=slides.cover`)
  if (projects.data.length === 0) {
    return null;
  }
  return projects.data[0];
};

export { getProjectById, getProjectByName, getProjects };
