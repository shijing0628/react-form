
import React, { useState, useEffect } from 'react';
import './App.css';
import { Note } from './components/Note';
import axios from 'axios';

function App() {

  const [notes, setNotes] = useState([]);

  const [newNote, setNewNote] = useState('write a new note...');
  const [showAll, setShowAll] = useState(true);


  const addNote = (e) => {
    e.preventDefault();
    const newObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(newObj));
    setNewNote('');

  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  const noteToShow = showAll ? notes : notes.filter(note => note.important === true)

  useEffect(() => {
    axios.get('http://localhost:3001/notes').then(res => {
      console.log('promise fulfilled')
      setNotes(res.data)
    })
  }, [])

  return (
    <div className="content">
      <h1>Notes</h1>
      <br></br>
      <div>
        <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {noteToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <br />
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
