'use client';

import { useState, useEffect } from 'react';
import { HiOutlineDocumentText, HiPlus, HiTrash, HiPencil, HiXMark } from 'react-icons/hi2';
import { HiDownload } from 'react-icons/hi';

interface SavedText {
  id: string;
  row: number;
  bookName: string;
  page: number;
  text: string;
  dateAdded: string;
}

const generateMockTexts = (count: number): SavedText[] => {
  const books = [    'قرآن کریم', 'مثنوی معنوی', 'شاهنامه فردوسی', 'دیوان حافظ', 'گلستان سعدی',
    'بوستان سعدی', 'مخزن الاسرار', 'غزلیات شمس', 'رباعیات خیام', 'کلیله و دمنه',
    'اسرار التوحید', 'کشف المحجوب', 'مصباح الهدایه', 'رساله قشیریه', 'فصوص الحکم'
  ];
  
  const texts = [    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...',
    'بیا تا گل برافشانیم و می در ساغر اندازیم...',
    'رستم بر سر اسب رخش نشست و به سوی دشمن رفت...',
    'هزار گل سرخ در باغ نبات کردم...',
    'بنی آدم اعضای یکدیگرند...',
    'آن نفس‌هایی که میخواهند بلند پرواز کنند...',
    'هر که را سری هست از بی سر نترسد...',
    'زندگی یک سفر پر از درس و عبرت است...',
    'عشق را جز به عشق نتوان شناخت...',
    'دانشمند کسی است که عملش با گفتارش یکی باشد...'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    row: i + 1,
    bookName: books[i % books.length],
    page: Math.floor(Math.random() * 200) + 1,
    text: texts[Math.floor(Math.random() * texts.length)],
    dateAdded: `1404/11/${Math.floor(Math.random() * 20) + 1}`
  }));
};

const mockSavedTexts = generateMockTexts(25); // 25 متن برای تست pagination

export default function SavedTexts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showNoteCard, setShowNoteCard] = useState<string | null>(null);
  const [texts, setTexts] = useState<SavedText[]>(mockSavedTexts);
  const [showModal, setShowModal] = useState(false);
  const [newText, setNewText] = useState({
    bookName: '',
    page: '',
    text: ''
  });
  
  const textsPerPage = 11;

  // Modal Validation
  const isValid = newText.bookName.trim() && newText.page.trim() && newText.text.trim();

  const filteredTexts = texts.filter(text =>
    text.bookName.includes(searchTerm) || 
    text.text.includes(searchTerm) ||
    text.page.toString().includes(searchTerm)
  );

  const indexOfLastText = currentPage * textsPerPage;
  const indexOfFirstText = indexOfLastText - textsPerPage;
  const currentTexts = filteredTexts.slice(indexOfFirstText, indexOfLastText);
  const totalPages = Math.ceil(filteredTexts.length / textsPerPage);

  const addNewText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    const newId = (texts.length + 1).toString();
    const newTextData: SavedText = {
      id: newId,
      row: texts.length + 1,
      bookName: newText.bookName.trim(),
      page: parseInt(newText.page.trim()),
      text: newText.text.trim(),
      dateAdded: '1404/11/20'
    };
    
    setTexts([newTextData, ...texts]);
    setNewText({ bookName: '', page: '', text: '' });
    setShowModal(false);
    setCurrentPage(1);
  };

  const deleteText = (id: string) => {
    setTexts(texts.filter(t => t.id !== id));
    setShowNoteCard(null);
  };

  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                #
              </th>
              <th className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                نام کتاب
              </th>
              <th className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider flex-1 min-w-[200px]">
                متن ذخیره شده
              </th>
              <td className="px-4 sm:px-6 py-2.5 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                عملیات
              </td>
            </tr>
          </thead>
          
          {/* Search & Add Button Row */}
          <tr className="border-b border-gray-100">
            <td colSpan={4} className="px-4 sm:px-6 py-6">
              <div className="flex flex-col-reverse sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="جستجو در کتاب‌ها و متن‌ها..."
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
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#278760] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#278740] transition-all duration-200 whitespace-nowrap flex-shrink-0"
                >
                  <HiPlus className="h-5 w-5" />
                  متن جدید
                </button>
              </div>
            </td>
          </tr>

          <tbody className="bg-white divide-y divide-gray-100">
            {currentTexts.length > 0 ? (
              currentTexts.map((text) => (
                <tr key={text.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 w-12 font-medium">
                    {text.row}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#278760]/10 text-[#278760] text-xs font-bold">
                        ص{text.page}
                      </span>
                      {text.bookName}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{text.dateAdded}</p>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-xs sm:text-sm text-gray-900 flex-1 min-w-[200px]">
                    <span className="max-w-[250px] sm:max-w-[400px] truncate block" title={text.text}>
                      {text.text.substring(0, 80)}...
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium w-20">
                    <button
                      onClick={() => setShowNoteCard(showNoteCard === text.id ? null : text.id)}
                      className="text-[#278760] hover:text-[#278740] font-medium transition w-full text-right"
                    >
                      بیشتر
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <HiOutlineDocumentText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">هیچ متنی یافت نشد</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ Pagination کامل - با قبل/بعد */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-6 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                نمایش {indexOfFirstText + 1}-{Math.min(indexOfFirstText + textsPerPage, filteredTexts.length)} 
                از <strong>{filteredTexts.length}</strong> متن
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
                >
                  قبل
                </button>
                
                {/* صفحات */}
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const pageNum = i + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm ${
                        isActive
                          ? 'bg-[#278760] text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
                >
                  بعد
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Modal متن جدید - کاملاً فعال! */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">متن جدید</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={addNewText} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام کتاب</label>
                <input
                  type="text"
                  value={newText.bookName}
                  onChange={(e) => setNewText({...newText, bookName: e.target.value})}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#278760] focus:ring-1 focus:ring-[#278740] outline-none transition"
                  placeholder="مثال: قرآن کریم"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">شماره صفحه</label>
                <input
                  type="number"
                  value={newText.page}
                  onChange={(e) => setNewText({...newText, page: e.target.value})}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#278760] focus:ring-1 focus:ring-[#278740] outline-none transition"
                  placeholder="123"
                  min={1}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">متن</label>
                <textarea
                  value={newText.text}
                  onChange={(e) => setNewText({...newText, text: e.target.value})}
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#278760] focus:ring-1 focus:ring-[#278740] outline-none transition resize-vertical"
                  placeholder="متن مورد نظر خود را وارد کنید..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium text-white shadow-sm transition-all duration-200 ${
                    isValid
                      ? 'bg-[#278760] hover:bg-[#278740]'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  ذخیره متن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Card */}
      {showNoteCard && texts.find(t => t.id === showNoteCard) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* محتوای کارت مثل قبل */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">متن‌های سیو شده</h3>
                <h4 className="text-lg font-medium text-gray-700">
                  {texts.find(t => t.id === showNoteCard)?.bookName}
                </h4>
                <p className="text-sm text-gray-500">
                  ص{texts.find(t => t.id === showNoteCard)?.page} | {texts.find(t => t.id === showNoteCard)?.dateAdded}
                </p>
              </div>
              <button
                onClick={() => setShowNoteCard(null)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition"
              >
                ×
              </button>
            </div>

            <div className="prose prose-sm max-w-none mb-8 p-6 bg-gray-50 rounded-xl min-h-[200px]">
              <p>{texts.find(t => t.id === showNoteCard)?.text}</p>
            </div>

            <div className="flex gap-2 justify-end mb-6 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition">
                <HiDownload className="h-4 w-4" />
                دانلود
              </button>
              <button 
                onClick={() => deleteText(showNoteCard)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition"
              >
                <HiTrash className="h-4 w-4" />
                حذف
              </button>
            </div>

            <button className="w-full px-6 py-3 rounded-xl bg-[#278760] text-white text-sm font-semibold hover:bg-[#278740] transition-all duration-200 shadow-sm">
              اشتراک‌گذاری
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
