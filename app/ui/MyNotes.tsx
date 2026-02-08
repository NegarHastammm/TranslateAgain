'use client';

import { useState } from 'react';
import { HiOutlineDocumentText, HiPlus, HiPrinter, HiTrash, HiPencil, HiBookmark, HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { HiDownload } from "react-icons/hi";
import PdfViewerModal from '@/app/ui/PdfViewerModal';

type TabKey = 'my-notes' | 'saved-pages' | 'saved-texts';

type Note = {
  id: number;
  row: number;
  bookName: string;
  text: string;
};

type SavedPage = {
  id: number;
  fileName: string;
  pageNumber: number;
  previewText?: string;
  createdAt: string;
  highlightText?: string;
};

// داده‌های نمونه متن‌های سیو شده
const savedTextsData = [  { id: 1, bookName: "ریاضیات پایه", page: 45, text: "فرمول مساحت مثلث...", createdAt: "1403/08/15" },
  { id: 2, bookName: "فیزیک دانشگاه", page: 128, text: "قانون دوم نیوتن...", createdAt: "1403/08/16" },
  { id: 3, bookName: "شیمی آلی", page: 89, text: "واکنش‌های آلدئید...", createdAt: "1403/08/17" },
  { id: 4, bookName: "اقتصاد کلان", page: 201, text: "تورم و بیکاری...", createdAt: "1403/08/18" },
  { id: 5, bookName: "برنامه‌نویسی", page: 67, text: "توابع بازگشتی...", createdAt: "1403/08/19" },
];

const SavedTexts = () => {
  const [savedTexts] = useState(savedTextsData);
  const [selectedText, setSelectedText] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTexts = savedTexts.filter(text =>
    text.bookName.includes(searchTerm) || 
    text.text.includes(searchTerm) ||
    text.page.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Search & Add */}
      <div className="flex gap-4 justify-between items-center flex-wrap">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="جستجو در متن‌های ذخیره شده..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button className="bg-green-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-600 shadow-lg hover:shadow-xl transition-all">
          + ذخیره متن جدید
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">نام کتاب</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">صفحه</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">متن ذخیره شده</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTexts.map((text) => (
                <tr key={text.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{text.bookName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{text.page}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate" title={text.text}>
                      {text.text}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => setSelectedText(text)}
                      className="text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      جزئیات
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedText && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedText.bookName}</h3>
              <p className="text-sm text-gray-500">صفحه {selectedText.page} • {selectedText.createdAt}</p>
            </div>
            <div className="p-8">
              <p className="text-lg text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedText.text}</p>
            </div>
            <div className="p-8 pt-0 border-t border-gray-100 flex gap-3 justify-end">
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-xl transition-all">
                ویرایش
              </button>
              <button className="px-6 py-2 text-red-600 hover:text-red-800 bg-red-50 rounded-xl transition-all">
                حذف
              </button>
              <button 
                onClick={() => setSelectedText(null)}
                className="px-8 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const tabs: { key: TabKey; label: string }[] = [
  { key: 'my-notes', label: 'یادداشت‌های من' },
  { key: 'saved-pages', label: 'صفحات ذخیره شده' },
  { key: 'saved-texts', label: 'متن‌های سیو شده' },
];

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('my-notes');
  
  // Notes data
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

  // Saved Pages data
  const [savedPages, setSavedPages] = useState<SavedPage[]>([
    {
      id: 1, fileName: 'React-Advanced.pdf', pageNumber: 42,
      previewText: 'useEffect cleanup و dependency array...', createdAt: '1404/11/18', highlightText: 'useEffect cleanup function',
    },
    {
      id: 2, fileName: 'Nextjs-Docs.pdf', pageNumber: 12,
      previewText: 'Server Components و App Router...', createdAt: '1404/11/17', highlightText: 'Server Components',
    },
    {
      id: 3, fileName: 'TypeScript-Handbook.pdf', pageNumber: 89,
      previewText: 'Advanced types و utility types...', createdAt: '1404/11/16', highlightText: 'Conditional Types',
    },
    {
      id: 4, fileName: 'Tailwind-Guide.pdf', pageNumber: 156,
      previewText: 'Customizing theme و plugins...', createdAt: '1404/11/15', highlightText: 'Tailwind config',
    },
    {
      id: 5, fileName: 'Flutter-Docs.pdf', pageNumber: 234,
      previewText: 'Riverpod state management...', createdAt: '1404/11/14', highlightText: 'Riverpod providers',
    },
    {
      id: 6, fileName: 'Node-BestPractices.pdf', pageNumber: 67,
      previewText: 'Microservices architecture...', createdAt: '1404/11/13', highlightText: 'Event-driven architecture',
    },
    {
      id: 7, fileName: 'Docker-Handbook.pdf', pageNumber: 112,
      previewText: 'Multi-stage builds و optimization...', createdAt: '1404/11/12', highlightText: 'Dockerfile best practices',
    },
    {
      id: 8, fileName: 'Kubernetes-Guide.pdf', pageNumber: 45,
      previewText: 'Helm charts و deployments...', createdAt: '1404/11/11', highlightText: 'K8s deployments',
    },
    {
      id: 9, fileName: 'MongoDB-Advanced.pdf', pageNumber: 78,
      previewText: 'Aggregation pipeline stages...', createdAt: '1404/11/10', highlightText: '$lookup operator',
    },
    {
      id: 10, fileName: 'PostgreSQL-Manual.pdf', pageNumber: 203,
      previewText: 'JSONB queries و full-text search...', createdAt: '1404/11/09', highlightText: 'Full-text search',
    },
    {
      id: 11, fileName: 'Redis-Cookbook.pdf', pageNumber: 91,
      previewText: 'Redis Streams و Pub/Sub...', createdAt: '1404/11/08', highlightText: 'Redis Streams',
    },
    {
      id: 12, fileName: 'AWS-Serverless.pdf', pageNumber: 134,
      previewText: 'Lambda functions و Step Functions...', createdAt: '1404/11/07', highlightText: 'Serverless architecture',
    },
    {
      id: 13, fileName: 'Git-Advanced.pdf', pageNumber: 56,
      previewText: 'Git worktrees و submodules...', createdAt: '1404/11/06', highlightText: 'Git worktrees',
    },
    {
      id: 14, fileName: 'React-Query.pdf', pageNumber: 167,
      previewText: 'Infinite queries و mutations...', createdAt: '1404/11/05', highlightText: 'React Query mutations',
    },
    {
      id: 15, fileName: 'Prisma-Guide.pdf', pageNumber: 89,
      previewText: 'Database migrations و relations...', createdAt: '1404/11/04', highlightText: 'Prisma relations',
    },
  ]);

  

  const [searchSaved, setSearchSaved] = useState('');
  const [currentSavedPage, setCurrentSavedPage] = useState(1);
  const savedPagesPerPage = 6;

  // Modal PDF
  const [openPdf, setOpenPdf] = useState<{
    fileName: string;
    pageNumber: number;
    highlightText?: string;
  } | null>(null);

  // Notes Logic
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

  // Saved Pages Logic
  const filteredSavedPages = savedPages.filter(page =>
    page.fileName.toLowerCase().includes(searchSaved.toLowerCase()) ||
    (page.previewText?.toLowerCase().includes(searchSaved.toLowerCase()) ?? false) ||
    page.pageNumber.toString().includes(searchSaved)
  );

  const indexOfLastSavedPage = currentSavedPage * savedPagesPerPage;
  const indexOfFirstSavedPage = indexOfLastSavedPage - savedPagesPerPage;
  const currentSavedPages = filteredSavedPages.slice(indexOfFirstSavedPage, indexOfLastSavedPage);
  const totalSavedPages = Math.ceil(filteredSavedPages.length / savedPagesPerPage);

  const saveSelectedText = (pageNumber: number, fileName: string) => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) return;

    setSavedPages(prev => [{
      id: Date.now(),
      fileName,
      pageNumber,
      previewText: selection.toString(),
      highlightText: selection.toString(),
      createdAt: new Date().toLocaleDateString('fa-IR'),
    }, ...prev]);
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* PDF Modal */}
      {openPdf && (
        <PdfViewerModal
          fileUrl={`/pdfs/${openPdf.fileName}`}
          pageNumber={openPdf.pageNumber}
          highlightText={openPdf.highlightText}
          onClose={() => setOpenPdf(null)}
        />
      )}

      {/* Header */}


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
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-[#278760] text-white shadow-sm hover:shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* ====== SAVED TEXTS TAB ====== */}
{activeTab === 'saved-texts' && (
  <SavedTexts />
)}
      {/* ====== SAVED PAGES TAB (CARD VIEW) ====== */}
      {activeTab === 'saved-pages' && (
        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          
          {/* Header with Search */}
          <div className="border-b border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#278760]">
                  <HiBookmark className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold text-gray-800">صفحات ذخیره شده</h2>
              </div>

              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="جستجو در صفحات ذخیره شده..."
                  value={searchSaved}
                  onChange={(e) => {
                    setSearchSaved(e.target.value);
                    setCurrentSavedPage(1);
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-12 text-sm focus:border-[#278760] focus:ring-1 focus:ring-[#278740] outline-none transition"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Grid of Cards */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSavedPages.map((page) => (
                <div
                  key={page.id}
                  onClick={() => setOpenPdf({
                    fileName: page.fileName,
                    pageNumber: page.pageNumber,
                    highlightText: page.highlightText,
                  })}
                  className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 hover:border-[#278760] hover:shadow-lg transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#278760]/10 text-[#278760]">
                        <HiBookmark className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-[#278760] transition">
                          {page.fileName}
                        </h3>
                        <p className="text-xs text-gray-500">صفحه {page.pageNumber}</p>
                      </div>
                    </div>
                    <HiArrowTopRightOnSquare className="h-4 w-4 text-gray-400 group-hover:text-[#278760] transition opacity-0 group-hover:opacity-100" />
                  </div>

                  {/* Preview Text */}
                  <p className="text-sm text-gray-700 line-clamp-2 mb-4 leading-relaxed">
                    {page.previewText}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{page.createdAt}</span>
                    <span className="inline-block px-2 py-1 rounded-md bg-[#278760]/10 text-[#278760] text-xs font-medium">
                      مشاهده
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {currentSavedPages.length === 0 && (
              <div className="text-center py-12">
                <HiBookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">هیچ صفحه‌ای پیدا نشد</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalSavedPages > 1 && (
            <div className="px-6 py-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  نمایش {indexOfFirstSavedPage + 1}-{Math.min(indexOfFirstSavedPage + savedPagesPerPage, filteredSavedPages.length)} 
                  از {filteredSavedPages.length} صفحه
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentSavedPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentSavedPage === 1}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap text-sm"
                  >
                    قبل
                  </button>
                  
                  {Array.from({ length: totalSavedPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentSavedPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                        currentSavedPage === page
                          ? 'bg-[#278760] text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentSavedPage(prev => Math.min(prev + 1, totalSavedPages))}
                    disabled={currentSavedPage === totalSavedPages}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap text-sm"
                  >
                    بعد
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ====== MY NOTES TAB ====== */}
      {activeTab === 'my-notes' && (
        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider w-12">ردیف</th>
                  <th className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">نام کتاب</th>
                  <th className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider flex-1 min-w-[200px]">متن نوشته شده</th>
                  <td className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider w-20">عملیات</td>
                </tr>
              </thead>
              
              {/* Search & Add Button Row */}
              <tr className="border-b border-gray-100">
                <td colSpan={4} className="px-4 sm:px-6 py-6">
                  <div className="flex flex-col-reverse sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <input
                        type="text"
                        placeholder="جست و جو..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-12 text-sm focus:border-[#278760] focus:ring-1 focus:ring-[#278740] outline-none transition"
                      />
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <button
                      onClick={() => { setShowModal(true); setEditNote(null); }}
                      className="flex items-center gap-2 rounded-xl bg-[#278760] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#278740] transition-all duration-200 whitespace-nowrap"
                    >
                      <HiPlus className="h-5 w-5" />
                      افزودن یادداشت
                    </button>
                  </div>
                </td>
              </tr>

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
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium w-20">
                      <button
                        onClick={() => setShowNoteCard(showNoteCard === note.id ? null : note.id)}
                        className="text-[#278760] hover:text-[#278740] font-medium transition w-full text-right"
                      >
                        بیشتر
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 sm:px-6 py-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    نمایش {indexOfFirstNote + 1}-{Math.min(indexOfFirstNote + notesPerPage, filteredNotes.length)} 
                    از {filteredNotes.length} یادداشت
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap text-sm"
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
                      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap text-sm"
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

      {/* Add/Edit Note Modal */}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">متن</label>
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

      {/* Note Detail Card */}
      {showNoteCard && notes.find((n) => n.id === showNoteCard) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
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
                ×
              </button>
            </div>

            <div className="prose prose-sm max-w-none mb-8 p-6 bg-gray-50 rounded-xl min-h-[200px]">
              <p>{notes.find((n) => n.id === showNoteCard)?.text}</p>
            </div>

            <div className="flex gap-2 justify-end mb-6 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition">
                <HiDownload className="h-4 w-4" />
                دانلود
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition">
                <HiPrinter className="h-4 w-4" />
                پرینت
              </button>
              <button 
                onClick={() => deleteNote(showNoteCard)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition"
              >
                <HiTrash className="h-4 w-4" />
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
                <HiPencil className="h-4 w-4" />
                ویرایش
              </button>
            </div>

            <button className="w-full px-6 py-3 rounded-xl bg-[#278760] text-white text-sm font-semibold hover:bg-[#278740] transition-all duration-200 shadow-sm">
              ثبت یادداشت
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
