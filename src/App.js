import React, { useState } from 'react';
import './App.css';
import { Note } from './components/Note';
function App() {

  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      date: '2019-05-30T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      date: '2019-05-30T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      date: '2019-05-30T19:20:14.298Z',
      important: true
    }
  ]);

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

  return (
    <div class="content">
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
