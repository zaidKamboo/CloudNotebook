const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1 : Get all the notes using : GET "/api/note/fetchallnotes".Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

//Route 2 : Adding a note using : POST "/api/note/addnote".Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title:").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors ,return bad request and the errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        user: req.user,
        title,
        description,
        tag,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);
//Route 3 :Updating a note using : POST:/api/note/updatenote
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    let { title, description, tag } = req.body;
    //Create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Finding the note to be updated and update it.
    let note = await Notes.findById(req.params.id);
    console.log(note);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //Not allowing the unauthenticated user to delete any note || Not allowing one user to delete other user's notes
    if (note.user.toString() !== req.user) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

//Route 4 :Deleting a note using : DELETE:/api/note/deletenote
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //Finding the note to be deleted and udelete it.
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    //Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    //Deleting the desired note.
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note have been deleted ", note: note });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
