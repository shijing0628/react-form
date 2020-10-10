
import React, { useState, useEffect } from 'react';
import './App.css';
import { Note } from './components/Note';
import axios from 'axios';
import noteService from './service/notes'

function App() {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('write a new note...');
  const [showAll, setShowAll] = useState(true);

  // update each item important or not ,also update into database
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: !note.important };

    noteService.update(id, changeNote).then(res => {
      setNotes(notes.map(note => note.id !== id ? note : res.data))
    }).catch(err => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id));
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

    noteService.create(newObj).then(res => {
      setNotes(notes.concat(res));
      setNewNote('');
    }).catch(err => {
      alert(`failed to create note: ${err}`)
    })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }



  const noteToShow = showAll ? notes : notes.filter(note => note.important === true)

  useEffect(() => {
    noteService.getAll().then(res => {
      console.log('promise fulfilled')
      setNotes(res.data)
    }).catch(err => {
      alert('fail');
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
        <input value={newNote} onChange={handleNoteChange} placeholder='write a new note...' />
        <button className="btn" type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
