import clsx from "clsx"
import Link from "next/link"
import Layout, { Header } from "../components/Layout"

export default function About() {
  const colophon = ["Colophon"]

  const artifactInfo = [
    "Artifact", 
    "Founders  Maxim Tsiring and Hugh Mo",
    "Strategy Director Hollis De Laney"
  ]

  const lumiereInfo = [
    "Lumiere",
    "Founder Maria Karas",
    "Published by Current Services"
  ]

  const maryGroupInfo = [
    "The Mary Group",
    "Founders  Christopher Adorno", 
    "Maxim Tsiring, Justin Woehler" 
  ]

  const marketInfo = [
    "Market Bar and Cafe",
    "Founder Haskell Wells"
  ]
  
  const parsInfo = [
    "PARS UNUM",
    "Founder Jamme"
  ]

  const typefaces = ["Typefaces"]

  const artifactTypefaces = [
    "Artifact Neue Montreal by",
    "Pangram Pangram Foundry",
    ""
  ]

  const schnyderTypeface = [
    "Schnyder Wide by Commercial", 
    "Type, Founders Grotesk by Klim",
    "Type Foundry"
  ]

  const nueveTypefaces = [
    "Neue Haas Grotesk by",
    "Commercial Type",
    ""
  ]

  const nueveMachinaTypefaces = [
    "Neue Machina by Pangram",
    "Pangram Foundry",
  ]

  const acuminTF = [
    "Acumin by Adobe",
  ]

  const firstCol = [
    colophon,
    artifactInfo,
    lumiereInfo, 
    maryGroupInfo, 
    marketInfo, 
    parsInfo
  ]

  const secondCol = [
    typefaces, 
    artifactTypefaces, 
    schnyderTypeface, 
    nueveTypefaces, 
    nueveMachinaTypefaces, 
    acuminTF
  ]

  const thirdCol = "All images © 2024 by the\
    respective artist(s) as\
    commissioned or in collaboration\
    with Current  Services. Images\
    may not be copied, printed,\
    otherwise disseminated,\
    datamined or used for AI\
    purposes without express\
    written permission."

  return (
    <Layout
      color="[#FF242F]"
      top={
        <Header showIndex={false} showColophon={false} />
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
    {/* <div className="flex justify-center items-center h-full ">
      <div className="flex justify-between w-full px-40">
        <div className="flex-1 px-4">
          {firstCol.map((colArray, colIndex) => (
            <div className="flex-1 px-10 py-5" key={colIndex}>
              {colArray.map((item, itemIndex) => (
                <p className="text-white text-base" key={itemIndex}>
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="flex-1 px-4">
          {secondCol.map((colArray, colIndex) => (
            <div className="flex-1 px-10 py-5" key={colIndex}>
              {colArray.map((item, itemIndex) => (
                <p className="text-white text-base" key={itemIndex}>
                  {item || <br/>}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="flex-1 px-4">
          <p className="text-white text-base my-5">
            {thirdCol}
          </p>
        </div>
      </div>
    </div> */}

<div className="flex justify-center items-center py-28 sm:h-full sm:px-40 py-0">
  <div className="grid grid-cols-1 sm:grid-cols-3">
    <div className="flex-1 px-4 pb-10 sm:pb-0">
      {firstCol.map((colArray, colIndex) => (
        <div className="flex-1 px-10 py-5" key={colIndex}>
          {colArray.map((item, itemIndex) => (
            <p className="text-white text-base" key={itemIndex}>
              {item}
            </p>
          ))}
        </div>
      ))}
    </div>
    <div className="flex-1 px-4 pb-10 sm:pb-0">
      {secondCol.map((colArray, colIndex) => (
        <div className="flex-1 px-10 py-5" key={colIndex}>
          {colArray.map((item, itemIndex) => (
            <p className="text-white text-base" key={itemIndex}>
              {item || <br />}
            </p>
          ))}
        </div>
      ))}
    </div>
    <div className="flex-1 px-4">
      <p className="text-white text-base px-10 py-5">
        {thirdCol}
      </p>
    </div>
  </div>
</div>



    </Layout>
  )
}

