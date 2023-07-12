import React, { useContext, useState } from "react";
import NoteContext from "../Context/NoteContext";
import AlertContext from "../Context/AlertContext";

const AddNote = () => {
  const ac = useContext(AlertContext);
  const { showAlert } = ac;

  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Added note successfully.", "success");
  };
  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <>
      <h3 className="my-3">Add a note</h3>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            required
            value={note.title}
            minLength={4}
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            required
            value={note.description}
            minLength={4}
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            value={note.tag}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>

        <button
          disabled={(note.title.length && note.description.length) < 4}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note.
        </button>
      </form>
    </>
  );
};
export default AddNote;
