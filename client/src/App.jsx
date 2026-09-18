import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lifecycle data ingestion: fetch all notes on initial mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setNotes(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load notes. Is the server running on port 5000?");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await axios.post(API_URL, { title, content });
      setNotes((prev) => [res.data, ...prev]);
      setTitle("");
      setContent("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to create note.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Synchronize local state so the deleted note disappears immediately
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete note.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="app">
      <h1>📝 Notes</h1>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="status">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="status">No notes yet — add one above!</p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small>{formatDate(note.createdAt)}</small>
              <button
                className="delete-btn"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
