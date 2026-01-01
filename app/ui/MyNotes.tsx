// app/notes/page.tsx
'use client';

import { useState } from 'react';
import { HiOutlineDocumentText, HiPlus, HiPrinter, HiTrash, HiPencil } from 'react-icons/hi2';
import { HiDownload } from "react-icons/hi";

type TabKey = 'my-notes' | 'saved-pages' | 'saved-texts';
type Note = { id: number; row: number; bookName: string; text: string };

const tabs: { key: TabKey; label: string }[] = [
  { key: 'my-notes', label: 'یادداشت‌های من' },
  { key: 'saved-pages', label: 'صفحات ذخیره شده' },
  { key: 'saved-texts', label: 'متن‌های سیو شده' },
];

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('my-notes');
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, row: 1, bookName: 'کتاب React پیشرفته', text: 'یادداشت در مورد useEffect و lifecycle ها...' },
    { id: 2, row: 2, bookName: 'Next.js مستندات', text: 'توضیح SSR و SSG و تفاوت های ISR...' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [showNoteCard, setShowNoteCard] = useState<number | null>(null);
  const [newNote, setNewNote] = useState({ bookName: '', text: '' });

  const filteredNotes = notes.filter(note =>
    note.bookName.includes(searchTerm) || note.text.includes(searchTerm)
  );

  const addNote = () => {
    if (newNote.bookName && newNote.text) {
      setNotes([{ id: Date.now(), row: notes.length + 1, ...newNote }, ...notes]);
      setNewNote({ bookName: '', text: '' });
      setShowModal(false);
    }
  };

  const updateNote = () => {
    if (editNote) {
      setNotes(notes.map(n => n.id === editNote.id ? { ...editNote } : n));
      setShowModal(false);
      setEditNote(null);
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
    setShowNoteCard(null);
  };

  return (
    <main className="flex-1 p-6 lg:p-8">
      {/* هدر بالا */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <HiOutlineDocumentText className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold text-gray-800">یادداشت‌های من</span>
         
        </div>

        <div className="flex items-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
                ${activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-sm hover:shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'my-notes' && (
        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
       

          {/* جدول یادداشت‌ها */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ردیف</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام کتاب</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">متن نوشته شده</th>
                    {/* سرچ و دکمه اضافه */}
          <div className="border-b border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="جست و جو..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-12 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                onClick={() => { setShowModal(true); setEditNote(null); }}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-all duration-200"
              >
                <HiPlus className="h-5 w-5" />
                افزودن یادداشت
              </button>
            </div>
          </div>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
        
                {filteredNotes.map((note) => (
                  <tr key={note.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{note.row}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{note.bookName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={note.text}>
                      {note.text.substring(0, 50)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
    
                      <button
                        onClick={() => setShowNoteCard(showNoteCard === note.id ? null : note.id)}
                        className="text-blue-600 hover:text-blue-900 font-medium transition"
                      >
            بیشتر
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* مودال اضافه/ویرایش یادداشت */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <button
          onClick={() => {
            setShowModal(false);
            setEditNote(null);
            setNewNote({ bookName: '', text: '' });
          }}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition"
        >
          <span className="sr-only">بستن</span>
          ×
        </button>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {editNote ? 'ویرایش یادداشت' : 'افزودن یادداشت جدید'}
            </h3>
            <div className="space-y-4">
        
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام کتاب</label>
                <input
                  type="text"
                  value={editNote?.bookName || newNote.bookName}
                  onChange={(e) => {
                    if (editNote) setEditNote({ ...editNote, bookName: e.target.value });
                    else setNewNote({ ...newNote, bookName: e.target.value });
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">متن یادداشت</label>
                <textarea
                  rows={8}
                  value={editNote?.text || newNote.text}
                  onChange={(e) => {
                    if (editNote) setEditNote({ ...editNote, text: e.target.value });
                    else setNewNote({ ...newNote, text: e.target.value });
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition resize-vertical"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-8">
          
              <button
                onClick={editNote ? updateNote : addNote}
                className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2 font-medium"
              >
                ثبت یادداشت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* کارت جزئیات یادداشت */}
      {showNoteCard && notes.find(n => n.id === showNoteCard) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <button
          onClick={() => {
            setShowModal(false);
            setEditNote(null);
            setNewNote({ bookName: '', text: '' });
          }}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition"
        >
          <span className="sr-only">بستن</span>
          ×
        </button>
              <h3 className="text-xl font-semibold text-gray-900">یادداشت من</h3>
              <div className="flex gap-2">
                <button onClick={() => { setShowNoteCard(null); setShowModal(true); setEditNote(notes.find(n => n.id === showNoteCard)!); }} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                  <HiPencil className="h-5 w-5" />
                </button>
                <button onClick={() => deleteNote(showNoteCard)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition">
                  <HiTrash className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none mb-8 p-4 bg-gray-50 rounded-xl">
              <p>{notes.find(n => n.id === showNoteCard)?.text}</p>
            </div>

            <div className="flex gap-2 justify-end">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition">
                <HiDownload className="h-4 w-4" /> دانلود
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition">
                <HiPrinter className="h-4 w-4" /> پرینت
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
