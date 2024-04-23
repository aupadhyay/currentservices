import clsx from "clsx"
import Link from "next/link"
import Layout, { Header } from "../components/Layout"

export default function About() {
  const serviceTitles = [
    "Idea", 
    "Brand", 
    "Content",
    "Growth"
  ]

  const services = [
    "Research",
    "Strategy", 
    "Consulting",
    "IA/UX",
    "Concepting",
    "Visual Identity",
    "Naming",
    "Positioning",
    "Print/Packaging",
    "Digital",
    "Film/Motion",
    "Spatial",
    "Market Entry", 
    "Venture Planning",
    "Capital Strategy", 
    "Forecasting"
  ]
  const wordsPerTitleList = 1
  const wordsPerList = 4
  const numColumns = 4

  return (
    <Layout
      color="[#FF242F]"
      top={
        <Header showIndex={false} showColophon={true} />
      }
      cursor='angled'
      bottom={
        <div>
          <h1
            className={clsx(
              "font-favorit font-regular text-[32px] text-white transition-colors ease-in-out duration-500",
            )}
          >
            <Link href="/" className="cursor-[inherit]">Index</Link>
          </h1>
        </div>
      }
    >
      <div className="px-10 sm:px-48 py-32">
        <p className="hidden sm:block text-white text-2xl w-3/4">
        Current Services is an interdisciplinary design and strategy practice founded in 2020. 
        Operating as a core group that often extends into a broader network, we employ an array 
        of methodologies to support every phase of business building with the goal of bringing 
        change-minded ideas to life. To talk to us about a collaborative project, please{" "}
          <a
            className="border-b cursor-pointer text-decoration-none"
            href="mailto:studio@currentservices.com"
          >
            email
          </a>
            &nbsp;our offices.
        </p>

        <p className="block sm:hidden text-white text-2xl sm:text-3xl w-3/4">
        Current Services is an interdisciplinary design and strategy practice founded in 2020. 
        Operating as a core group that often extends into a broader network, we employ an array 
        of methodologies to support every phase of business building with the goal of bringing 
        change-minded ideas to life. <br/><br/>To talk to us about a collaborative project, please{" "}
          <a
            className="border-b cursor-pointer text-decoration-none"
            href="mailto:studio@currentservices.com"
          >
            email
          </a>
            &nbsp;our offices.
        </p>

        {/*Desktop*/}
        <div className="grid grid-cols-1 sm:grid-cols-4 mt-14">
          {[...Array(numColumns)].map((_, columnIndex) => (
            <div className="col-span-1" key={columnIndex}>
              {serviceTitles
                .slice(
                  columnIndex * wordsPerTitleList,
                  (columnIndex + 1) * wordsPerTitleList
                )
                .map((word, index) => (
                  <p className="text-white text-xl mt-1 hidden sm:block" key={index}>
                    {word}
                  </p>
                ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 mt-6">
          {[...Array(numColumns)].map((_, columnIndex) => (
            <div className="col-span-1" key={columnIndex}>
              {services
                .slice(
                  columnIndex * wordsPerList,
                  (columnIndex + 1) * wordsPerList
                )
                .map((word, index) => (
                  <p className="text-white text-xl mt-1 hidden sm:block" key={index}>
                    {word}
                  </p>
                ))}
            </div>
          ))}
        </div>
        {/*Mobile*/}
      <div className="grid grid-cols-1 sm:grid-cols-4 mt-16 sm:mt-0">
          {[...Array(numColumns)].map((_, columnIndex) => (
            <div className="col-span-1" key={columnIndex}>
              {serviceTitles
                .slice(
                  columnIndex * wordsPerTitleList,
                  (columnIndex + 1) * wordsPerTitleList
                )
                .map((word, index) => (
                  <p className="text-white text-xl block sm:hidden mt-1 sm:mt-0" key={index}>
                    {word}
                  </p>
                ))}
              {services
                .slice(
                  columnIndex * wordsPerList,
                  (columnIndex + 1) * wordsPerList
                )
                .map((word, index) => (
                  <p className="text-white text-xl pl-20 block sm:hidden mt-1 sm:mt-0" key={index}>
                    {word}
                  </p>
                ))}
                <br/>
            </div>
          ))}
        </div>
       
      </div>
    </Layout>
  )
}
