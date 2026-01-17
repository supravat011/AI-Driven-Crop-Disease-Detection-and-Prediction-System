
import React, { useState, useEffect } from 'react';
import { Save, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const NotesTaking = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('leafcare-notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (err) {
        console.error('Error parsing notes:', err);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('leafcare-notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    setActiveNote(null);
    setTitle('');
    setContent('');
  };

  const selectNote = (note: Note) => {
    setActiveNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const saveNote = () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your note');
      return;
    }

    if (activeNote) {
      // Update existing note
      const updatedNotes = notes.map(note => 
        note.id === activeNote.id 
          ? { ...note, title, content, date: new Date().toISOString() } 
          : note
      );
      setNotes(updatedNotes);
      setActiveNote({ ...activeNote, title, content, date: new Date().toISOString() });
      toast.success('Note updated');
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
      setActiveNote(newNote);
      toast.success('Note created');
    }
  };

  const deleteNote = () => {
    if (!activeNote) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (confirmed) {
      const filteredNotes = notes.filter(note => note.id !== activeNote.id);
      setNotes(filteredNotes);
      setActiveNote(null);
      setTitle('');
      setContent('');
      toast.success('Note deleted');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-4 h-[500px] max-h-[70vh] border border-border rounded-xl overflow-hidden bg-card">
      {/* Notes List Sidebar */}
      <div className="border-r border-border overflow-y-auto">
        <div className="p-4 border-b border-border flex justify-between items-center sticky top-0 bg-card z-10">
          <h3 className="font-medium">My Notes</h3>
          <button 
            onClick={createNewNote}
            className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="Create new note"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="divide-y divide-border">
          {notes.length > 0 ? (
            notes.map(note => (
              <div 
                key={note.id}
                onClick={() => selectNote(note)}
                className={`p-4 cursor-pointer transition-colors hover:bg-muted ${
                  activeNote?.id === note.id ? 'bg-primary/10' : ''
                }`}
              >
                <h4 className="font-medium truncate">{note.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(note.date)}
                </p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {note.content}
                </p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>No notes yet</p>
              <button 
                onClick={createNewNote}
                className="mt-2 text-primary text-sm hover:underline"
              >
                Create your first note
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Note Editor */}
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border flex gap-2 sticky top-0 bg-card z-10">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder:text-muted-foreground"
          />
          
          <div className="flex gap-2">
            {activeNote && (
              <button
                onClick={deleteNote}
                className="p-2 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                aria-label="Delete note"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={saveNote}
              className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Save note"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note content here..."
          className="flex-1 p-4 bg-transparent border-none outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default NotesTaking;
