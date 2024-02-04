import Link from "@/node_modules/next/link"
import router from "next/router";


export default function Home() {
  const pages = [
    "Artifact", 
    "Mary", 
    "Lumiere", 
    "Market", 
    "Pars Unum"
  ]

  const handleClick = () => {
    // Handle the click event, such as logging or performing other actions
    console.log('Link clicked!');
    router.push('/');
  };
  const handleClickPage = (word: string) => {
    // Handle the click event, such as logging or performing other actions
    const wordWithoutSpace = word.replace(/\s/g, '');
    console.log('Link clicked!');
    router.push('/client/' +  wordWithoutSpace);
  };

  return (
    <div className="w-full px-24 py-20 bg-[#bcbcbc] h-screen relative">
        <div className="absolute top-16">
            <h1 className="text-white" onClick={handleClick}>Current Services</h1>
        </div>

        <div className="absolute bottom-20" style={{ display: 'flex' }}>
        {pages.map((word, index) => (
            <h1 className="text-xl text-white hover:underline" key={index} onClick={() => handleClickPage(word)} style={{ marginRight: '50px'}}>
            {word}
            </h1>
        ))}
        </div>
    </div>
  )
}


