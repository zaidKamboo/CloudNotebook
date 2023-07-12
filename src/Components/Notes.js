import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/NoteContext";
import AlertContext from "../Context/AlertContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
const Notes = () => {
  let navigate = useNavigate();
  const nc = useContext(NoteContext);
  const { notes, getNotes, editNote } = nc;

  const ac = useContext(AlertContext);
  const { showAlert } = ac;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    getNotes();

    // eslint-disable-next-line
  }, []);

  const ref = useRef("");
  const refClose = useRef("");

  //Updating the selected note.
  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    setNote(note);
    showAlert("Updated note successfully.", "success");
  };
  let token = localStorage.getItem("token");

  return (
    <div className="row my-3">
      <AddNote />
      <button
        type="button"
        className="d-none "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    required
                    minLength={4}
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    required
                    minLength={4}
                    value={note.edescription}
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={(note.etitle.length && note.edescription.length) < 4}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note.
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="container">
          {notes.length === 0 && "No notes here."}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updatenote={updatenote} note={note} />
          );
        })}
      </div>
    </div>
  );
};
export default Notes;
