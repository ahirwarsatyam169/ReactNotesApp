import { useState } from "react";
import menu from "./assets/hamburgermenu.png";
import React from "react";
import { useEffect } from "react";

function App() {
  const [AllNotes, setAllNotes] = useState(() => {
    const savednote = localStorage.getItem("notes");
    return savednote ? JSON.parse(savednote) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isMenuOpen, setisMenuOpen] = useState(false);

  //Saving notes to Local Storage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(AllNotes));
  }, [AllNotes]);

  // Saving note
  const saveNote = () => {
    if (title === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
    };
    setTitle("");
    setContent("");
    setAllNotes([...AllNotes, newNote]);
    console.log(newNote);
  };

  // Opening and closing menu
  const menuClick = () => {
    setisMenuOpen(!isMenuOpen);
  };

  // Removing notes from menu
  const removeNote = (id) => {
    const fileteredNotes = AllNotes.filter((note) => note.id !== id);
    setAllNotes(fileteredNotes);
  };

  //RETRIEVING THE NOTE FROM MENU
  const getNote = (id) => {
    const foundNote = AllNotes.find((gNote) => gNote.id === id);

    setTitle(foundNote.title);
    setContent(foundNote.content);
  };

  //New Note button function
  const newNote = () => {
    setTitle("");
    setContent("");
  };

  return (
    <>
      <div className="flex justify-center h-screen w-screen items-center bg-gradient-to-r from-amber-100 to-amber-100">
        <div className="shadow-xl border border-sm w-[90%] h-[90%] justify-center bg-gradient-to-r from-amber-200 to-yellow-200 relative flex flex-col">
          {/* Header */}
          <div className="text-black/75 shadow-sm m-2 border-none rounded h-[60px] md:w-[99%] w-[95%] items-center flex p-2 text-xl bg-gradient-to-l from-amber-100 to-yellow-100 justify-between">
            Notes
            <button onClick={menuClick}>
              <img
                className="h-[20px] hover:scale-[110%] hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300"
                src={menu}
                alt="menu"
              />
            </button>
            {/* Menu */}
            {isMenuOpen && (
              <div className="overflow-auto absolute mt-4 top-[70px] right-0 h-[300px] w-[250px] bg-gradient-to-r from-amber-200 to-yellow-300 z-10 rounded-xl p-2 shadow-xl">
                <ul>
                  <button
                    onClick={() => newNote()}
                    className="hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-[115%] active:scale-95 border rounded-[50px] items-center flex justify-center border-white/50 p-2 m-2 bg-gradient-to-r from-amber-100 to-yellow-300"
                  >
                    New Note
                  </button>
                  {AllNotes.map((titleList) => (
                    <li
                      onClick={() => getNote(titleList.id)}
                      key={titleList.id}
                      className="m-1  border-none active:scale-95 flex justify-between items-center p-2 hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-300"
                    >
                      <p className="text-black/75 truncate overflow-hidden whitespace-nowrap w-[180px] ">
                        {titleList.title}
                      </p>

                      <button
                        className="transition-all duration-300 rounded-xl  active:scale-95 hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-[110%]"
                        onClick={() => removeNote(titleList.id)}
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Input section */}
          <div className="w-[90%] flex justify-between p-2">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className="text-3xl text-black/75 border-none  hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 focus:outline-none ml-[10px] mt-5  flex justify-center items-center h-[50px] md:w-[300px] w-[200px] rounded-xl p-2 bg-gradient-to-r from-amber-50 to-yellow-100 hover:scale-105"
              placeholder="title"
            />

            <div className="flex items-center md:mr-3 mr-[-20px] md:mt-2 mt-4">
              <button
                className="text-black/70 text-xl md:mr-8  h-[40px] md:w-[80px]  w-[90px] border-none bg-gradient-to-r from-amber-200 to-yellow-400 rounded-xl hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={saveNote}
              >
                save
              </button>
            </div>
          </div>

          
          {/* Textarea */}
          <div className="flex justify-center flex-1 min-h-0 pb-4">
            <div className="w-[99%] flex justify-center h-full">
              <textarea
                type="text"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="type something...."
                className="text-2xl border-none focus:outline-none resize-none mt-1 w-[90%] h-full rounded-xl p-4 bg-gradient-to-r from-amber-50 to-yellow-100 hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 text-black/75"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
