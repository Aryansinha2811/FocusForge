import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface Note {
    id: string;
    title: string;
    content: string;
    color: string;
    date: string;
}

const COLORS = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-purple-300',
    'bg-orange-300',
];

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>(() => {
        const saved = localStorage.getItem('focusforge_notes');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return [];
            }
        }
        return [];
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [currentNote, setCurrentNote] = useState({
        title: '',
        content: '',
        color: COLORS[0]
    });

    useEffect(() => {
        localStorage.setItem('focusforge_notes', JSON.stringify(notes));
    }, [notes]);

    const handleSaveNote = () => {
        if (!currentNote.title.trim() && !currentNote.content.trim()) return;

        if (editingNoteId) {
            setNotes(notes.map(note => 
                note.id === editingNoteId 
                    ? { ...note, ...currentNote, date: new Date().toISOString() }
                    : note
            ));
        } else {
            const newNote: Note = {
                id: Date.now().toString(),
                ...currentNote,
                date: new Date().toISOString()
            };
            setNotes([newNote, ...notes]);
        }

        closeModal();
    };

    const editNote = (note: Note) => {
        setCurrentNote({ title: note.title, content: note.content, color: note.color });
        setEditingNoteId(note.id);
        setShowModal(true);
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingNoteId(null);
        setCurrentNote({ title: '', content: '', color: COLORS[0] });
    };

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <h1 className="text-5xl font-hero font-bold mb-2">Notes</h1>
                    <p className="text-gray-600 font-paragraph text-lg">
                        Capture your thoughts and ideas
                    </p>
                </div>
                <Button
                    onClick={() => setShowModal(true)}
                    variant="default"
                    size="default"
                    className="font-button bg-pink-300 hover:bg-pink-400"
                >
                    <Plus size={20} className="mr-2" />
                    New Note
                </Button>
            </div>

            {/* Toolbar */}
            <div className="bg-white border-4 border-black rounded-base shadow-base p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search size={20} className="text-black" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-4 border-black rounded-base pl-12 pr-4 py-3 font-base font-bold focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                    />
                </div>
                <div className="font-heading font-bold text-black border-2 border-black rounded-base px-4 py-2 bg-yellow-300">
                    {filteredNotes.length} {filteredNotes.length === 1 ? 'Note' : 'Notes'}
                </div>
            </div>

            {/* Notes Grid */}
            {filteredNotes.length === 0 ? (
                <div className="bg-white border-4 border-black rounded-base shadow-base p-16 text-center">
                    <p className="text-black font-heading font-bold text-2xl mb-6">
                        {searchQuery ? "No notes found matching your search." : "It's empty here. Start writing something!"}
                    </p>
                    {!searchQuery && (
                        <Button
                            onClick={() => setShowModal(true)}
                            variant="default"
                            className="font-button bg-pink-300 shadow-base border-2 hover:translate-y-1 transition-transform"
                        >
                            <Plus size={20} className="mr-2" />
                            Create First Note
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map(note => (
                        <div
                            key={note.id}
                            className={`${note.color} border-4 border-black rounded-base shadow-base p-6 hover:-translate-y-2 transition-transform duration-200 flex flex-col h-72`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-heading font-bold truncate pr-2">
                                    {note.title || "Untitled"}
                                </h3>
                            </div>
                            
                            <p className="text-black font-paragraph whitespace-pre-wrap flex-grow overflow-hidden text-ellipsis line-clamp-5 text-lg">
                                {note.content}
                            </p>

                            <div className="mt-4 pt-4 border-t-4 border-black flex justify-between items-center">
                                <span className="text-sm font-base font-bold text-black bg-white/50 px-2 py-1 border-2 border-black rounded-base">
                                    {new Date(note.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); editNote(note); }}
                                        className="p-2 border-2 border-black rounded-base bg-white hover:translate-x-1 hover:translate-y-1 transition-all"
                                        title="Edit note"
                                    >
                                        <Edit size={18} className="text-blue-600" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                                        className="p-2 border-2 border-black rounded-base bg-white hover:translate-x-1 hover:translate-y-1 transition-all"
                                        title="Delete note"
                                    >
                                        <Trash2 size={18} className="text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Note Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white border-4 border-black rounded-base shadow-dark max-w-2xl w-full p-8 flex flex-col max-h-[90vh]">
                        <h2 className="text-4xl font-hero font-bold mb-8">
                            {editingNoteId ? 'Edit Note' : 'Create Note'}
                        </h2>

                        <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                            <div>
                                <label className="block font-heading font-bold mb-2 text-xl">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={currentNote.title}
                                    onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                                    className="w-full border-4 border-black rounded-base px-4 py-3 font-base text-lg font-bold focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all bg-gray-50"
                                    placeholder="Give it a catchy title..."
                                />
                            </div>

                            <div className="flex-grow flex flex-col">
                                <label className="block font-heading font-bold mb-2 text-xl">
                                    Content
                                </label>
                                <textarea
                                    value={currentNote.content}
                                    onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                                    className="w-full border-4 border-black rounded-base px-4 py-3 font-paragraph text-lg focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all resize-none flex-grow min-h-[250px] bg-gray-50"
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            <div>
                                <label className="block font-heading font-bold mb-3 text-xl">
                                    Color Theme
                                </label>
                                <div className="flex flex-wrap gap-4 bg-gray-100 p-4 border-4 border-black rounded-base">
                                    {COLORS.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setCurrentNote({ ...currentNote, color })}
                                            className={`w-12 h-12 rounded-full border-4 border-black transition-transform hover:scale-110 ${color} ${
                                                currentNote.color === color ? 'ring-4 ring-black ring-offset-2 scale-110' : ''
                                            }`}
                                            aria-label={`Select color ${color}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8 pt-6 border-t-4 border-black">
                            <Button
                                onClick={handleSaveNote}
                                variant="default"
                                size="lg"
                                className="flex-1 bg-green-300 font-button text-xl py-6"
                            >
                                {editingNoteId ? 'Save Changes' : 'Create Note'}
                            </Button>
                            <Button
                                onClick={closeModal}
                                variant="neutral"
                                size="lg"
                                className="flex-1 font-button text-xl py-6 bg-gray-200"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}