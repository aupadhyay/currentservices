import React from 'react';
import "./landing.css"; // Importing Tailwind CSS

const aboutCS = "Current Services is a cross-disciplinary design practice founded in 2020. Operating as a core group of strategists and designers, we employ an array of methodologies — always with the goal of surfacing intrinsic traits and igniting meaningful dialogue. To talk to us about a collaborative project, please email us.";
const firstColumn = ['Concepting', 'Branding', 'Naming', 'Positioning', 'Copywriting', 'Content'];
const secondColumn = ['Art Direction', 'Visual Identity', 'Digital UX', 'Packaging', 'Print', 'Experiential'];
const thirdColumn = ['Photography', 'Film/Motion', 'Coding ', 'Print ', 'Spatial', 'Events'];
const wordsPerList = 6;


export default function Home() {
  return (
    <main className="Main">
      <h1 className="">
        {/* Current Services logo doesn't fade in and out like the other components so this probably needs to be different*/}
        Current Services
      </h1>
      <h2 className="font-CS_Favorit text-white w-3/4 flex pl-20 pt-10 pb-10 text-2xl">
        {aboutCS}
      </h2>
      {/* Might need to change depending on how mobile looks*/}
      <div className="container">
        {[firstColumn, secondColumn, thirdColumn].map((column, columnIndex) => (
          <div className="column" key={columnIndex}>
            {column.slice(0, wordsPerList).map((word, index) => (
              <p key={index} className="">
                {word}
              </p>
            ))}
          </div>
        ))}
      </div>
      <h1 className="">
        Index
      </h1>
    </main>
  );
}
