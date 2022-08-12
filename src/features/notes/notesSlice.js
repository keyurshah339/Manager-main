import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADD_LABEL,
  ADD_NOTE,
  ADD_TO_PINNED,
  DELETE_NOTE,
  FETCH_NOTES_DATA,
  REMOVE_FROM_PINNED,
  REMOVE_LABEL,
  UPDATE_NOTE,
} from "../../services/api";
export const addLabel = createAsyncThunk(
  "/note/addlabel",
  async (labelName, thunkAPI) => {
    try {
      const response = await axios.post(ADD_LABEL, labelName);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchNotesData = createAsyncThunk(
  "/user/fetchnotesdata",
  async (thunkAPI) => {
    try {
      const response = await axios.post(FETCH_NOTES_DATA);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addNote = createAsyncThunk(
  "/note/add",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await axios.post(ADD_NOTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const removeFromPinned = createAsyncThunk(
  "note/removefrompinned",
  async (noteId, thunkAPI) => {
    try {
      const response = await axios.post(REMOVE_FROM_PINNED, noteId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addToPinned = createAsyncThunk(
  "/note/pinnote",
  async (noteId, thunkAPI) => {
    try {
      const response = await axios.post(ADD_TO_PINNED, noteId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateNote = createAsyncThunk(
  "/note/update",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await axios.post(UPDATE_NOTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteNote = createAsyncThunk(
  "/note/delete",
  async (noteId, thunkAPI) => {
    try {
      const response = await axios.post(DELETE_NOTE, noteId);
      return { data: response.data, noteId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeLabel = createAsyncThunk(
  "/label/remove",
  async (labelId, thunkAPI) => {
    try {
      await axios.post(REMOVE_LABEL, labelId);
      return { labelId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const notesSlice = createSlice({
  name: "notesSlice",
  initialState: {
    notesFetchstatus: "idle",
    allNotes: null,
    allNotesBackup: [],
    notes: [],
    pinnedNotes: [],
    labels: null,
    chosenLabels: [],
    chosenLabelsComponent: "createNote",
    error: null,
    status: "idle",
    removePinStatus: "idle",
    pinNoteStatus: "idle",
    editNoteModalStatus: false,
    noteToEdit: null,
    updateNoteStatus: "idle",
    deleteNoteStatus: "idle",
    searchTitle: "",
    updateNoteError: null,
    navbar: false,
  },
  reducers: {
    enableEditModal: (state, action) => {
      state.editNoteModalStatus = true;
      state.noteToEdit = action.payload.note;
      state.chosenLabelsComponent = "editNote";
      state.chosenLabels = [];
    },
    disableEditModal: (state) => {
      state.editNoteModalStatus = false;
      state.noteToEdit = null;
      state.chosenLabelsComponent = "createNote";
      state.chosenLabels = [];
      state.updateNoteStatus = "idle";
    },
    setupNotes: (state, action) => {
      state.labels = action.payload.labels;
    },
    addToChosenLabels: (state, action) => {
      state.chosenLabels.push(action.payload.newChosenLabel);
    },
    removeFromChosenLabels: (state, action) => {
      state.chosenLabels = state.chosenLabels.filter(
        (label) => label._id !== action.payload.removedLabel._id
      );
    },
    resetChosenLabels: (state) => {
      state.chosenLabels = [];
    },
    setUpLabelsInEditComponent: (state, action) => {
      state.chosenLabels = action.payload.labels;
    },
    searchNotes: (state, action) => {
      const { searchTitle } = action.payload;
      state.allNotes = state.allNotesBackup.filter((notes) =>
        notes.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    },
    enableNavbar: (state) => {
      state.navbar = true;
    },
    disableNavbar: (state) => {
      state.navbar = false;
    },
    navbarStatus: (state, action) => {
      const { navbar } = action.payload;
      state.navbar = !navbar;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
    resetNotes: (state) => {
      state.notesFetchstatus = "idle";
      state.allNotes = null;
      state.allNotesBackup = [];
      state.notes = [];
      state.pinnedNotes = [];
      state.labels = null;
      state.chosenLabels = [];
      state.chosenLabelsComponent = "createNote";
      state.error = null;
      state.status = "idle";
      state.removePinStatus = "idle";
      state.pinNoteStatus = "idle";
      state.editNoteModalStatus = false;
      state.noteToEdit = null;
      state.updateNoteStatus = "idle";
      state.deleteNoteStatus = "idle";
      state.searchTitle = "";
      state.updateNoteError = null;
    },
  },

  extraReducers: {
    [addLabel.pending]: (state) => {
      state.addLabelStatus = "Adding Label";
    },
    [addLabel.fulfilled]: (state, action) => {
      state.addLabelStatus = "Label added";
      state.labels.push(action.payload.newLabel);
      state.labels = state.labels
        ?.slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      state.chosenLabels.push(action.payload.newLabel);
    },
    [addLabel.rejected]: (state, action) => {
      state.addLabelStatus = "";
      state.error = action.payload.message;
    },
    [fetchNotesData.pending]: (state) => {
      state.notesFetchstatus = "pending";
    },
    [fetchNotesData.fulfilled]: (state, action) => {
      state.notesFetchstatus = "success";
      const sortedNotes = action.payload.noteData.notes
        ?.slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      state.allNotesBackup = sortedNotes;
      state.allNotes = sortedNotes;
      const sortedLabels = action.payload.noteData.labels
        ?.slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      state.labels = sortedLabels;
    },
    [fetchNotesData.rejected]: (state, action) => {
      state.notesFetchstatus = "idle";
      state.error = action.payload?.message;
    },
    [addNote.pending]: (state) => {
      state.status = "pending";
    },
    [addNote.fulfilled]: (state, action) => {
      state.status = "success";
      state.allNotes.push(action.payload.newSavedNote);
      state.allNotes = state.allNotes
        ?.slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      state.error = null;
      state.allNotesBackup = state.allNotes;
    },
    [addNote.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [removeFromPinned.pending]: (state) => {
      state.removePinStatus = "pending";
    },
    [removeFromPinned.fulfilled]: (state, action) => {
      state.removePinStatus = "success";
      const unPinnedIndex = state.allNotes.findIndex(
        (note) => note._id === action.payload.unPinnedNote._id
      );
      state.allNotes[unPinnedIndex] = action.payload.unPinnedNote;
    },
    [removeFromPinned.rejected]: (state, action) => {
      state.removePinStatus = "failed";
      state.error = action.payload;
    },
    [addToPinned.pending]: (state) => {
      state.pinNoteStatus = "pending";
    },
    [addToPinned.fulfilled]: (state, action) => {
      state.pinNoteStatus = "success";
      const pinnedIndex = state.allNotes.findIndex(
        (note) => note._id === action.payload.pinnedNote._id
      );
      state.allNotes[pinnedIndex] = action.payload.pinnedNote;
    },
    [updateNote.pending]: (state) => {
      state.updateNoteStatus = "pending";
    },
    [updateNote.fulfilled]: (state, action) => {
      state.updateNoteStatus = "success";
      const { updatedNote } = action.payload;
      const updatedNoteIndex = state.allNotes.findIndex(
        (note) => note._id === updatedNote._id
      );
      state.allNotes[updatedNoteIndex] = updatedNote;
    },
    [updateNote.rejected]: (state, action) => {
      state.updateNoteStatus = "failed";
      state.updateNoteError = action.payload;
    },
    [deleteNote.pending]: (state) => {
      state.deleteNoteStatus = "idle";
    },
    [deleteNote.fulfilled]: (state, action) => {
      state.deleteNoteStatus = "success";
      const noteId = action.payload.noteId.noteId;
      state.allNotes = state.allNotes.filter((note) => note._id !== noteId);
      state.allNotesBackup = state.allNotes;
    },
    [deleteNote.rejected]: (state, action) => {
      state.deleteNoteStatus = "failed";
      state.error = action.payload.errorDetail;
    },
    [removeLabel.pending]: (state) => {
      state.removeLabelStatus = "pending";
    },
    [removeLabel.fulfilled]: (state, action) => {
      const { labelId } = action.payload.labelId;
      state.removeLabelStatus = "success";

      state.labels = state.labels.filter((label) => label._id !== labelId);
      state.allNotes = state.allNotes.map((note) => {
        note.labels = note.labels.filter(
          (noteLabel) => noteLabel._id !== labelId
        );
        return note;
      });
    },
    [removeLabel.rejected]: (state, action) => {
      state.removeLabelStatus = "failed";
      state.error = action.payload;
    },
  },
});
export const {
  setupNotes,
  addToChosenLabels,
  removeFromChosenLabels,
  resetChosenLabels,
  enableEditModal,
  disableEditModal,
  setChosenLabelComponent,
  setUpLabelsInEditComponent,
  searchNotes,
  resetNotes,
  enableNavbar,
  disableNavbar,
  navbarStatus,
  resetStatus,
} = notesSlice.actions;
export default notesSlice.reducer;
