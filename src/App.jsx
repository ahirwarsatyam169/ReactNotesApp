import { useState, useEffect } from "react";
import menu from "./assets/hamburgermenu.png";
import React from "react";

const themes = {
  red: {
    bg: "from-red-300 to-red-400",
    card: "from-red-400 to-red-500",
    header: "from-red-400 to-red-500",
    menu: "from-red-500 to-red-400",
    menuItem: "from-red-600 to-red-400",
    input: "from-red-100 to-red-400",
    textarea: "from-red-100 to-red-200",
    button: "from-red-400 to-red-500",
    inputText: "text-red-500",
    textareaText: "text-red-400",
  },
  yellow: {
    bg: "from-amber-100 to-amber-100",
    card: "from-amber-200 to-yellow-200",
    header: "from-amber-100 to-yellow-100",
    menu: "from-amber-200 to-yellow-300",
    menuItem: "from-amber-100 to-yellow-300",
    input: "from-amber-50 to-yellow-100",
    textarea: "from-amber-50 to-yellow-100",
    button: "from-amber-200 to-yellow-400",
    inputText: "text-black/75",
    textareaText: "text-black/75",
  },
};

function App() {
  const [AllNotes, setAllNotes] = useState(() => {
    const savednote = localStorage.getItem("notes");
    return savednote ? JSON.parse(savednote) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [theme, setTheme] = useState("red");

  const t = themes[theme]; // shorthand so you don't repeat themes[theme] everywhere

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(AllNotes));
  }, [AllNotes]);

  const saveNote = () => {
    if (title === "") return;
    const newNote = { id: Date.now(), title, content };
    setTitle("");
    setContent("");
    setAllNotes([...AllNotes, newNote]);
  };

  const menuClick = () => setisMenuOpen(!isMenuOpen);

  const removeNote = (id) => {
    setAllNotes(AllNotes.filter((note) => note.id !== id));
  };

  const getNote = (id) => {
    const foundNote = AllNotes.find((gNote) => gNote.id === id);
    setTitle(foundNote.title);
    setContent(foundNote.content);
  };

  const newNote = () => {
    setTitle("");
    setContent("");
  };

  return (
    <>
      <div className={`flex justify-center h-screen w-screen items-center bg-gradient-to-r ${t.bg}`}>
        <div className={`shadow-xl shadow-white/50 border border-sm w-[90%] h-[90%] justify-center bg-gradient-to-r ${t.card} relative flex flex-col`}>
          
          {/* Header */}
          <div className={`text-black/75 shadow-sm m-2 border-none rounded h-[60px] md:w-[99%] w-[95%] items-center flex p-2 text-xl bg-gradient-to-l ${t.header} justify-between`}>
            Notes
            <button onClick={menuClick}>
              <img
                className="h-[20px] hover:scale-[110%] hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300"
                src={menu}
                alt="menu"
              />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className={`overflow-auto absolute mt-4 top-[70px] right-0 h-[300px] w-[250px] bg-gradient-to-r ${t.menu} z-10 rounded-xl p-2 shadow-xl`}>
                <ul>
                  {/* New Note button */}
                  <button
                    onClick={() => newNote()}
                    className={`hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-[115%] active:scale-95 border rounded-[50px] items-center flex justify-center border-white/50 p-2 m-2 bg-gradient-to-r ${t.button}`}
                  >
                    New Note
                  </button>

                  {/* Theme toggle buttons */}
                  <div className="flex justify-between m-2">
                    <button
                      onClick={() => setTheme("red")}
                      className={`rounded-[50px] border p-1 border-white/50 bg-gradient-to-r from-red-500 to-red-400 hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-[115%] active:scale-95 ${theme === "red" ? "ring-0.5 ring-white" : ""}`}
                    >
                      Red
                    </button>
                    <button
                      onClick={() => setTheme("yellow")}
                      className={`rounded-[50px] border p-1 border-white/50 bg-gradient-to-r from-amber-200 to-yellow-400 hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-[115%] active:scale-95 ${theme === "yellow" ? "ring-0.5 ring-white" : ""}`}
                    >
                      Yellow
                    </button>
                  </div>

                  {/* Notes list */}
                  {AllNotes.map((titleList) => (
                    <li
                      onClick={() => getNote(titleList.id)}
                      key={titleList.id}
                      className={`m-1 border-none active:scale-95 flex justify-between items-center p-2 hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 rounded-xl bg-gradient-to-r ${t.menuItem}`}
                    >
                      <p className="text-black/75 truncate overflow-hidden whitespace-nowrap w-[180px]">
                        {titleList.title}
                      </p>
                      <button
                        className="transition-all duration-300 rounded-xl active:scale-95 hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] hover:scale-[110%]"
                        onClick={(e) => {
                          e.stopPropagation(); // prevents getNote from firing when deleting
                          removeNote(titleList.id);
                        }}
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
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className={`text-3xl ${t.inputText} border-none hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 focus:outline-none ml-[10px] mt-5 flex justify-center items-center h-[50px] md:w-[300px] w-[200px] rounded-xl p-2 bg-gradient-to-r ${t.input} hover:scale-105`}
              placeholder="title"
            />
            <div className="flex items-center md:mr-3 mr-[-20px] md:mt-2 mt-4">
              <button
                className={`text-black/70 text-xl md:mr-8 h-[40px] md:w-[80px] w-[90px] border-none bg-gradient-to-r ${t.button} rounded-xl hover:shadow-xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 active:scale-95`}
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="type something...."
                className={`text-2xl border-none focus:outline-none resize-none mt-1 w-[90%] h-full rounded-xl p-4 bg-gradient-to-r ${t.textarea} hover:shadow-xl hover:shadow-[0px_0px_40px_rgba(255,255,255,0.5)] transition-all duration-300 ${t.textareaText}`}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
