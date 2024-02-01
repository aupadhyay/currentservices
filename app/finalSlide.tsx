import Link from "@/node_modules/next/link"

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

  return (
    <div className="w-full px-24 py-20 bg-[#FF242F] h-screen relative">
    <div className="absolute top-16">
        <h1 className="text-white">Current Services</h1>
    </div>

    <div className="px-24 py-20">
      <p className="text-white text-2xl w-3/4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
      aliquip ex ea commodo consequat.
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


    <div className="flex justify-between">
        <div>
          <h1 className="text-xl text-white absolute bottom-20">Index</h1>
        </div>
        <div>
          <h1 className="text-xl text-white absolute bottom-20 pr-100">Next — Mary</h1>
        </div>
      </div>
  </div>
  )
}


