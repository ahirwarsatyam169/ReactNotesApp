/* 1. Create notes
    2. update notes
    3. delete notes
    4. view notes */
/* 1 component for creating/ updating note
    2 component for viewing notes
    3 component for single note */

import { useState } from "react";
import menu from "./assets/hamburgermenu.png";
import React from "react";

function App() {
  const [AllNotes, setAllNotes] = useState([]); // stores all notes
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isMenuOpen, setisMenuOpen] = useState(false);

  //Saving note
  const saveNote = () => {
    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
    };

    setAllNotes([...AllNotes, newNote]);
    console.log(newNote);
  };

  const menuClick = () => {
    setisMenuOpen(!isMenuOpen);
  };


  return (
    <>
      <div className="flex justify-center h-screen w-screen items-center bg-gradient-to-r from-amber-100 to-amber-100 relative ">
        <div className="shadow-xl border border-sm rounded-xl w-[90%] h-[90%] justify-center bg-gradient-to-r from-amber-200 to-yellow-200 relative">
          <div className="shadow-sm ml-2 mt-2 border-none rounded h-[60px] w-[99%] items-center flex p-2 text-xl  bg-gradient-to-l from-amber-100 to-yellow-100 flex justify-between ">
            Notes
            <button onClick={menuClick}>
              <img className="h-[20px]" src={menu} alt="menu" />
            </button>

            
            {isMenuOpen && (
              <div className="absolute mt-4  top-[70px] right-0 h-[300px] w-[250px] bg-gradient-to-r from-amber-200 to-yellow-300 z-10 rounded-xl p-4 shadow-xl">
                <ul className="text-white space-y-3">
                  <li>First Note</li> 
                  <li>Second Note</li>
                  <li>Third Note</li>
                </ul>
              </div>
            )}
                      

          </div>
          
          <div className="w-[90%] flex justify-between">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className="focus:outline-none focus:border-blue-500 ml-3 mt-5 border-none flex justify-center items-center h-[50px] rounded-xl p-2 bg-gradient-to-r from-amber-50 to-yellow-100"
              placeholder="title"
            />
            <div className="flex items-center mr-3 mt-2">
              <button
                className="mr-8 h-[40px] w-[80px] border-none bg-gradient-to-r from-amber-200 to-yellow-400 rounded-xl"
                onClick={saveNote}
              >
                save
              </button>
              <button className="mr-4 h-[40px] w-[80px] border-none bg-gradient-to-r from-amber-200 to-yellow-400 rounded-xl">
                delete
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="h-[550px] w-[90%] flex">
              <textarea
                type="text"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="type something...."
                className="focus:outline-none ml-3 mt-5 border-none w-[90%] h-[90%] rounded-xl p-4 bg-gradient-to-r from-amber-50 to-yellow-100  "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
