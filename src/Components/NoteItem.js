import React, { useContext } from "react";
import NoteContext from "../Context/NoteContext";
import AlertContext from "../Context/AlertContext";

const NoteItem = (props) => {
  const { deleteNote } = useContext(NoteContext);
  const { note, updatenote } = props;
  const ac = useContext(AlertContext);
  const { showAlert } = ac;
  return (
    <div className="col-md-3 noteitem">
      <div className="card my-2 mx-2 body">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h4 className="card-title noteItemTitle">{note.title}</h4>
            <i
              className="far fa-trash-alt mx-2 noteItemIcon"
              onClick={() => {
                deleteNote(note._id);
                showAlert("Deleted note successfully.", "success");
              }}
            ></i>
            <i
              className="far fa-edit mx-2  noteItemIcon"
              onClick={() => {
                updatenote(note);
              }}
            ></i>
          </div>
          <p className="card-text noteItemDescription">{note.description}</p>
        </div>
      </div>
    </div>
  );
};
export default NoteItem;
