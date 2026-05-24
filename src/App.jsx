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

  return (
    <>
      <div className="flex justify-center h-screen w-screen items-center bg-gradient-to-r from-amber-100 to-amber-100">
        <div className="shadow-xl border border-sm  w-[90%] h-[90%] justify-center bg-gradient-to-r from-amber-200 to-yellow-200 relative">
          {/* Header */}
          <div className="shadow-sm ml-2 mt-2 border-none rounded h-[60px] w-[99%] items-center flex p-2 text-xl bg-gradient-to-l from-amber-100 to-yellow-100 justify-between">
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
                  {AllNotes.map((titleList) => (
                    <li
                      onClick={() => getNote(titleList.id)}
                      key={titleList.id}
                      className="flex justify-between items-center p-2 hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 rounded-xl"
                    >
                      <p className="truncate overflow-hidden whitespace-nowrap w-[180px] ">
                        {titleList.title}
                      </p>

                      <button
                        className="hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-[115%]" onClick={() => removeNote(titleList.id)}>
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Input section */}
          <div className="w-[90%] flex justify-between">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className="hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 focus:outline-none ml-3 mt-5 border-none flex justify-center items-center h-[50px] rounded-xl p-2 bg-gradient-to-r from-amber-50 to-yellow-100 hover:scale-105"
              placeholder="title"
            />

            <div className="flex items-center mr-3 mt-2">
              <button
                className="mr-8 h-[40px] w-[80px] border-none bg-gradient-to-r from-amber-200 to-yellow-400 rounded-xl hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105"
                onClick={saveNote}
              >
                save
              </button>
            </div>
          </div>

          {/* Textarea */}
          <div className="flex justify-center items-center">
            <div className="h-[550px] w-[90%] flex">
              <textarea
                type="text"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="type something...."
                className="focus:outline-none ml-3 mt-5  w-[90%] h-[90%] rounded-xl p-4 bg-gradient-to-r from-amber-50 to-yellow-100 hover:scale-[102%] hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
