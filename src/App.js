
import React, { useState, useEffect } from 'react';
import './App.css';
import { Note } from './components/Note';
import axios from 'axios';

function App() {

  const [notes, setNotes] = useState([]);

  const [newNote, setNewNote] = useState('write a new note...');
  const [showAll, setShowAll] = useState(true);

  // update each item important or not ,also update into database
  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: !note.important };

    axios.put(url, changeNote).then(res => {
      setNotes(notes.map(note => note.id !== id ? note : res.data))
    })
  }
  const addNote = (e) => {
    e.preventDefault();
    const newObj = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    axios.post('http://localhost:3001/notes', newObj).then(res => {
      setNotes(notes.concat(res));
      setNewNote('');
    })
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
      <h1>My Daily Notes</h1>
      <br></br>
      <div>
        <button className="btn" onClick={() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {noteToShow.map(note =>
          <Note key={note.id} note={note} toggleImportanceOf={() => { toggleImportanceOf(note.id) }} />
        )}
      </ul>
      <br />
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button className="btn" type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
