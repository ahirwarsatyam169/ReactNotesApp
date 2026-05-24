import { useState, useEffect } from "react";
import menu from "./assets/hamburgermenu.png";
import React from "react";

function App() {

  // Loading notes from localStorage
  const [AllNotes, setAllNotes] = useState(() => {

    const savednote = localStorage.getItem("notes");

    return savednote
      ? JSON.parse(savednote)
      : [];

  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isMenuOpen, setisMenuOpen] = useState(false);

  // Saving notes to localStorage
  useEffect(() => {

    localStorage.setItem(
      "notes",
      JSON.stringify(AllNotes)
    );

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
  };

  // Opening and closing menu
  const menuClick = () => {
    setisMenuOpen(!isMenuOpen);
  };

  // Removing notes
  const removeNote = (id) => {

    const fileteredNotes = AllNotes.filter(
      (note) => note.id !== id
    );

    setAllNotes(fileteredNotes);
  };

  // Retrieving notes
  const getNote = (id) => {

    const foundNote = AllNotes.find(
      (gNote) => gNote.id === id
    );

    setTitle(foundNote.title);
    setContent(foundNote.content);
  };

  return (
    <>
      <div className="flex justify-center min-h-screen w-screen items-center bg-gradient-to-r from-amber-100 to-amber-100 p-4">

        {/* Main Card */}
        <div className="shadow-xl rounded-xl w-full max-w-[1200px] min-h-[90vh] bg-gradient-to-r from-amber-200 to-yellow-200 relative p-2">

          {/* Header */}
          <div className="shadow-sm rounded h-[60px] w-full items-center flex p-4 text-xl bg-gradient-to-l from-amber-100 to-yellow-100 justify-between">

            <h1 className="text-xl md:text-2xl font-semibold">
              Notes
            </h1>

            <button onClick={menuClick}>

              <img
                className="h-[20px] hover:scale-[110%] hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] active:scale-95 transition-all duration-300"
                src={menu}
                alt="menu"
              />

            </button>

            {/* Menu */}
            {isMenuOpen && (

              <div className="overflow-auto absolute mt-4 top-[70px] right-2 h-[300px] w-[200px] md:w-[250px] bg-gradient-to-r from-amber-200 to-yellow-300 z-10 rounded-xl p-2 shadow-xl">

                <ul>

                  {AllNotes.map((titleList) => (

                    <li
                      onClick={() => getNote(titleList.id)}
                      key={titleList.id}
                      className="flex justify-between items-center p-2 rounded-lg hover:bg-yellow-200 transition-all duration-200 cursor-pointer"
                    >

                      <p className="truncate overflow-hidden whitespace-nowrap w-[150px] md:w-[180px] text-black/80">
                        {titleList.title}
                      </p>

                      <button
                        onClick={() => removeNote(titleList.id)}
                        className="hover:text-red-500 transition-all duration-200 active:scale-90"
                      >
                        x
                      </button>

                    </li>

                  ))}

                </ul>

              </div>

            )}

          </div>

          {/* Input Section */}
          <div className="w-full flex flex-col md:flex-row justify-between gap-4 p-2 mt-3">

            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className="
              w-full
              md:w-[70%]
              hover:shadow-xl
              hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)]
              transition-all
              duration-300
              focus:outline-none
              rounded-xl
              p-3
              bg-gradient-to-r
              from-amber-50
              to-yellow-100
              hover:scale-[101%]
              "
              placeholder="title"
            />

            <div className="flex items-center justify-end">

              <button
                className="
                h-[45px]
                w-full
                md:w-[100px]
                border-none
                bg-gradient-to-r
                from-amber-200
                to-yellow-400
                rounded-xl
                hover:shadow-xl
                hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)]
                hover:scale-105
                active:scale-95
                active:translate-y-1
                transition-all
                duration-200
                "
                onClick={saveNote}
              >
                save
              </button>

            </div>

          </div>

          {/* Textarea */}
          <div className="flex justify-center items-center p-2">

            <textarea
              type="text"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder="type something...."
              className="
              focus:outline-none
              w-full
              h-[300px]
              md:h-[550px]
              rounded-xl
              p-4
              resize-none
              overflow-auto
              bg-gradient-to-r
              from-amber-50
              to-yellow-100
              hover:scale-[101%]
              hover:shadow-xl
              hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)]
              transition-all
              duration-300
              "
            />

          </div>

        </div>

      </div>
    </>
  );
}

export default App;
