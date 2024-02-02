import Link from "@/node_modules/next/link"

export default function Home() {
  const pages = [
    "Artifact", 
    "Mary", 
    "Lumiere", 
    "Market", 
    "Pars Unum"
  ]

  return (
    <div className="w-full px-24 py-20 bg-[#bcbcbc] h-screen relative">
        <div className="absolute top-16">
            <h1 className="text-white">Current Services</h1>
        </div>

        <div className="absolute bottom-20" style={{ display: 'flex' }}>
        {pages.map((word, index) => (
            <h1 className="text-xl text-white hover:underline" key={index} style={{ marginRight: '50px' }}>
            {word}
            </h1>
        ))}
        </div>
    </div>
  )
}


