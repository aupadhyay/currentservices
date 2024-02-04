import router from "next/router";
import Layout from "../components/Layout";

export default function Home() {
  const services = [
    "Concepting",
    "Branding",
    "Naming",
    "Positioning",
    "Copywriting",
    "Content",
    "Art Direction",
    "Visual Identity",
    "Digital UX",
    "Packaging",
    "Print",
    "Experiential",
    "Photography",
    "Film/Motion",
    "Coding ",
    "Print ",
    "Spatial",
    "Events",
  ]
  const wordsPerList = 6
  const numColumns = 3

  const handleClickCS = () => {
    // Handle the click event, such as logging or performing other actions
    console.log('Link clicked!');
    router.push('/currentServices');
  };

  const handleClickPage = (word: string) => {
    // Handle the click event, such as logging or performing other actions
    console.log('Link clicked!');
    router.push('/' + word);
  };

  return (
    <Layout
      color="[#FF242F]"
      top={<h1 className="text-white" onClick={handleClickCS}>Current Services</h1>}
      bottom={<h1 className="text-xl text-white">Index</h1>}
    >
      <div className="px-24 py-20">
        <p className="text-white text-2xl w-3/4">
          Current Services is a cross-disciplinary design practice founded in
          2020. Operating as a core group of strategists and designers, we
          employ an array of methodologies — always with the goal of surfacing
          intrinsic traits and igniting meaningful dialogue. To talk to us about
          a collaborative project, please{" "}
          <a
            className="border-b cursor-pointer text-decoration-none"
            href="mailto:about@currentservices.com"
          >
            email us
          </a>
          .
        </p>
        <div className="grid grid-cols-3 mt-20">
          {[...Array(numColumns)].map((_, columnIndex) => (
            <div className="col-span-1" key={columnIndex}>
              {services
                .slice(
                  columnIndex * wordsPerList,
                  (columnIndex + 1) * wordsPerList
                )
                .map((word, index) => (
                  <p className="text-white text-2xl mt-1" key={index}>
                    {word}
                  </p>
                ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
