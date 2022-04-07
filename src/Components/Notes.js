import Note from "./Note";

const Notes = ({ notes, setNotes }) => {
  return (
    <div className="bordered-container">
      <div className="notes-container">
        <span className="add-note primary-btn">Pinned Notes</span>

        <div className="allnotes">
          {notes
            .filter((item) => item.pin)
            .map((item) => {
              return (
                <Note
                  key={item.id}
                  item={item}
                  notes={notes}
                  setNotes={setNotes}
                />
              );
            })}
        </div>
        <span className="add-note primary-btn">Other Notes</span>

        <div className="allnotes">
          {notes
            .filter((item) => !item.pin)
            .map((item) => {
              return (
                <Note
                  key={item.id}
                  item={item}
                  notes={notes}
                  setNotes={setNotes}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
