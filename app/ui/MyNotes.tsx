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
  { id: 3, row: 3, bookName: 'TypeScript Handbook', text: 'انواع interface و generic ها...' },
  { id: 4, row: 4, bookName: 'Tailwind CSS Guide', text: 'Utility-first CSS و responsive design...' },
  { id: 5, row: 5, bookName: 'Flutter Documentation', text: 'Widget tree و state management...' },
  { id: 6, row: 6, bookName: 'Dart Language Tour', text: 'Null safety و async/await...' },
  { id: 7, row: 7, bookName: 'Node.js Best Practices', text: 'Event loop و clustering...' },
  { id: 8, row: 8, bookName: 'GraphQL with Apollo', text: 'Query و mutation و caching...' },
  { id: 9, row: 9, bookName: 'Docker for Developers', text: 'Containerization و Dockerfile...' },
  { id: 10, row: 10, bookName: 'Kubernetes Basics', text: 'Pod و deployment و service...' },
  { id: 11, row: 11, bookName: 'MongoDB Aggregation', text: 'Pipeline stages و $match...' },
  { id: 12, row: 12, bookName: 'PostgreSQL Advanced', text: 'Window functions و CTE...' },
  { id: 13, row: 13, bookName: 'Redis Patterns', text: 'Pub/sub و leaderboards...' },
  { id: 14, row: 14, bookName: 'AWS Lambda', text: 'Serverless و API Gateway...' },
  { id: 15, row: 15, bookName: 'Git Advanced', text: 'Rebase vs merge و cherry-pick...' },
  { id: 16, row: 16, bookName: 'CI/CD with GitHub', text: 'Actions workflow و secrets...' },
  { id: 17, row: 17, bookName: 'Vercel Deployments', text: 'Edge functions و preview...' },
  { id: 18, row: 18, bookName: 'PWA Development', text: 'Service worker و manifest...' },
  { id: 19, row: 19, bookName: 'Web Vitals', text: 'LCP FCP FID و CLS...' },
  { id: 20, row: 20, bookName: 'Performance Optimization', text: 'Code splitting و lazy loading...' },
]);

const [currentPage, setCurrentPage] = useState(1);
const notesPerPage = 11;



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

  const indexOfLastNote = currentPage * notesPerPage;
const indexOfFirstNote = indexOfLastNote - notesPerPage;
const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
const totalPages = Math.ceil(filteredNotes.length / notesPerPage);


  return (
   <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">

      {/* هدر بالا */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#278760]">
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
                  ? 'bg-[#278760] text-white shadow-sm hover:shadow-md'
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
    <th className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
      ردیف
    </th>
    <th className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
      نام کتاب
    </th>
    <th className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider flex-1 min-w-[200px]">
      متن نوشته شده
    </th>
    {/* ستون خالی برای عملیات در آخر */}
 


                    {/* سرچ و دکمه اضافه */}
          <div className="border-b border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="جست و جو..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-12 text-sm focus:border-[#278760] focus:ring-1 focus:ring-[#278740] outline-none transition"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                onClick={() => { setShowModal(true); setEditNote(null); }}
                className="flex items-center gap-2 rounded-xl bg-[#278760] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#278740] transition-all duration-200"
              >
                <HiPlus className="h-5 w-5" />
                افزودن یادداشت
              </button>
            </div>
          </div>
                </tr>
              </thead>
 <tbody className="bg-white divide-y divide-gray-100">
  {currentNotes.map((note) => (
    <tr key={note.id} className="hover:bg-gray-50 transition">
      <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 w-12">
        {note.row}
      </td>
      <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
        {note.bookName}
      </td>
      <td className="px-4 sm:px-6 py-3 text-xs sm:text-sm text-gray-900 flex-1 min-w-[200px]">
        <span className="max-w-[250px] sm:max-w-[400px] truncate block" title={note.text}>
          {note.text.substring(0, 80)}...
        </span>
      </td>
      {/* لینک بیشتر در آخر - پهنای ثابت */}
      <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium w-20">
        <button
          onClick={() => setShowNoteCard(showNoteCard === note.id ? null : note.id)}
          className=" text-[#278760] hover:text-[#278740] font-medium transition w-full text-right"
        >
          بیشتر
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
            {/* Pagination */}
{/* Pagination - نمایش بالا، دکمه‌ها وسط */}
{/* Pagination - نمایش چپ، دکمه‌ها وسط */}
{/* Pagination - نمایش پایین‌تر + قبل/بعد هم‌سطر */}
{totalPages > 1 && (
  <div className="px-4 sm:px-6 py-6 border-t border-gray-100 bg-white">
    <div className="flex items-center justify-between">
      {/* اطلاعات تعداد - چپ */}
      <div className="text-sm text-gray-700">
        نمایش {indexOfFirstNote + 1}-{Math.min(indexOfFirstNote + notesPerPage, filteredNotes.length)} 
        از {filteredNotes.length} یادداشت
      </div>
      
      {/* دکمه‌های pagination - راست */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap"
        >
          قبل
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              currentPage === page
                ? 'bg-[#278760] text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap"
        >
          بعد
        </button>
      </div>
    </div>
  </div>
)}



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
              {editNote ? 'ویرایش یادداشت' : 'یادداشت های من'}
            </h3>
            <div className="space-y-4">
        
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تایتل</label>
                <input
                  type="text"
                  value={editNote?.bookName || newNote.bookName}
                  onChange={(e) => {
                    if (editNote) setEditNote({ ...editNote, bookName: e.target.value });
                    else setNewNote({ ...newNote, bookName: e.target.value });
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#278760] focus:ring-1 focus:ring-[#278740] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">متن </label>
                <textarea
                  rows={8}
                  value={editNote?.text || newNote.text}
                  onChange={(e) => {
                    if (editNote) setEditNote({ ...editNote, text: e.target.value });
                    else setNewNote({ ...newNote, text: e.target.value });
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#278760] focus:ring-1 focus:ring-[#278740] outline-none transition resize-vertical"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-8">
          
              <button
                onClick={editNote ? updateNote : addNote}
                className="px-6 py-2 rounded-xl bg-[#278760] text-white hover:bg-[#278740] transition flex items-center gap-2 font-medium"
              >
                ثبت یادداشت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* کارت جزئیات یادداشت */}
  {/* کارت جزئیات یادداشت - کاملاً طبق درخواست */}
{showNoteCard && notes.find((n) => n.id === showNoteCard) && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
      {/* هدر: عنوان سمت چپ + ضربدر سمت راست */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">یادداشت‌های من</h3>
          <h4 className="text-lg font-medium text-gray-700">
            {notes.find((n) => n.id === showNoteCard)?.bookName}
          </h4>
        </div>
        <button
          onClick={() => setShowNoteCard(null)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition"
        >
          <span className="sr-only">بستن</span>
          ×
        </button>
      </div>

      {/* متن کامل یادداشت */}
      <div className="prose prose-sm max-w-none mb-8 p-6 bg-gray-50 rounded-xl min-h-[200px]">
        <p>{notes.find((n) => n.id === showNoteCard)?.text}</p>
      </div>

      {/* دکمه‌های کوچک: دانلود، پرینت، حذف، ویرایش */}
      <div className="flex gap-2 justify-end mb-6">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          دانلود
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v.01" />
          </svg>
          پرینت
        </button>
        <button 
          onClick={() => deleteNote(showNoteCard)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          حذف
        </button>
        <button
          onClick={() => {
            const current = notes.find((n) => n.id === showNoteCard);
            if (!current) return;
            setEditNote(current);
            setShowNoteCard(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5h3m1.5-3l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          ویرایش
        </button>
      </div>

      {/* دکمه ثبت یادداشت - عرض کامل */}
      <button className="w-full px-6 py-3 rounded-xl bg-[#278760] text-white text-sm font-semibold hover:bg-[#278740] transition-all duration-200 shadow-sm">
        ثبت یادداشت
      </button>
    </div>
  </div>
)}

    </main>
  );
}
