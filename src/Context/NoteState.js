import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "localhost:5000";
  const [notes, setNotes] = useState([]);

  //Get All notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`http://${host}/api/notes/fetchallnotes`, {
      //const response = await fetch(`${host}/api/notes/fetchallnotes}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzNiMjc4ZmU1N2YwZDUzZDMzMTU1In0sImlhdCI6MTY4Njk5MTIwNH0.MqD1ToutFvxAbYdZy4jxLLlEmlpGAqfa1m3yOkPz0Lg",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Adding Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`http://${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzNiMjc4ZmU1N2YwZDUzZDMzMTU1In0sImlhdCI6MTY4Njk5MTIwNH0.MqD1ToutFvxAbYdZy4jxLLlEmlpGAqfa1m3yOkPz0Lg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    //Adding a Note

    let note = json;
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`http://${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzNiMjc4ZmU1N2YwZDUzZDMzMTU1In0sImlhdCI6MTY4Njk5MTIwNH0.MqD1ToutFvxAbYdZy4jxLLlEmlpGAqfa1m3yOkPz0Lg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`http://${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzNiMjc4ZmU1N2YwZDUzZDMzMTU1In0sImlhdCI6MTY4Njk5MTIwNH0.MqD1ToutFvxAbYdZy4jxLLlEmlpGAqfa1m3yOkPz0Lg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client Side.
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
