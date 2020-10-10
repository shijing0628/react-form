import React from 'react'

export const Note = ({ note, toggleImportanceOf }) => {
 const label = note.important ? "make not important" : "make important";
 return (
  <>
   <li>
    {note.content}
    <button className="btn showall" onClick={toggleImportanceOf}>{label}</button>
   </li>
  </>
 )
}






