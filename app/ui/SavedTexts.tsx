
// app/notes/saved-texts.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, Edit2, Trash2, Search } from 'lucide-react';

interface SavedText {
  id: string;
  bookName: string;
  page: number;
  text: string;
  dateAdded: string;
}

const mockSavedTexts: SavedText[] = [
  {
    id: '1',
    bookName: 'قرآن کریم',
    page: 5,
    text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيم',
    dateAdded: '1404/11/15',
  },
  {
    id: '2',
    bookName: 'مثنوی معنوی',
    page: 12,
    text: 'آن نفس‌هایی که میخواهند بلند پرواز کنند، باید قلب‌شان پاک باشد',
    dateAdded: '1404/11/10',
  },
  {
    id: '3',
    bookName: 'شاهنامه فردوسی',
    page: 45,
    text: 'رستم بر سر اسب رخش نشست و به سوی دشمن رفت',
    dateAdded: '1404/11/08',
  },
  {
    id: '4',
    bookName: 'دیوان حافظ',
    page: 23,
    text: 'هزار گل سرخ در باغ نبات کردم',
    dateAdded: '1404/11/05',
  },
  {
    id: '5',
    bookName: 'کتاب سخن',
    page: 67,
    text: 'زندگی یک سفر پر از درس و عبرت است',
    dateAdded: '1404/10/28',
  },
  {
    id: '6',
    bookName: 'رباعیات عمر خیام',
    page: 34,
    text: 'خمر نوش و گمان مبر که کار شامت است',
    dateAdded: '1404/10/20',
  },
];

interface EditingText {
  id: string;
  bookName: string;
  page: number;
  text: string;
}

export default function SavedTexts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [editingText, setEditingText] = useState<EditingText | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [texts, setTexts] = useState<SavedText[]>(mockSavedTexts);

  const textsPerPage = 5;

  // جستجو
  const filteredTexts = texts.filter(
    (text) =>
      text.bookName.includes(searchTerm) ||
      text.text.includes(searchTerm) ||
      text.page.toString().includes(searchTerm)
  );

  // Pagination
  const indexOfLastText = currentPage * textsPerPage;
  const indexOfFirstText = indexOfLastText - textsPerPage;
  const currentTexts = filteredTexts.slice(indexOfFirstText, indexOfLastText);
  const totalPages = Math.ceil(filteredTexts.length / textsPerPage);

  // Toggle row expansion
  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  // Edit modal
  const openEditModal = (text: SavedText) => {
    setEditingText({
      id: text.id,
      bookName: text.bookName,
      page: text.page,
      text: text.text,
    });
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingText) return;
    
    setTexts(
      texts.map((t) =>
        t.id === editingText.id
          ? {
              ...t,
              bookName: editingText.bookName,
              page: editingText.page,
              text: editingText.text,
            }
          : t
      )
    );
    
    setIsModalOpen(false);
    setEditingText(null);
  };

  // Delete text
  const handleDelete = (id: string) => {
    setTexts(texts.filter((t) => t.id !== id));
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="جستجو در نام کتاب یا متن..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-900 text-right"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                نام کتاب
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                صفحه
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                متن ذخیره شده
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 w-12">
                بیشتر
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTexts.length > 0 ? (
              currentTexts.map((text) => (
                <tr key={text.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-right text-sm text-gray-800">
                    {text.bookName}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-600">
                    {text.page}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-700">
                    <div className="truncate max-w-xs">
                      {text.text.substring(0, 50)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleRow(text.id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-200 transition-colors"
                      aria-label="بیشتر"
                    >
                      <ChevronDown
                        className={`w-5 h-5 text-gray-600 transition-transform ${
                          expandedRows.has(text.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  متنی یافت نشد
                </td>
              </tr>
            )}

            {/* Expanded Row */}
            {currentTexts.map(
              (text) =>
                expandedRows.has(text.id) && (
                  <tr key={`${text.id}-expanded`} className="bg-gray-50 border-b">
                    <td colSpan={4} className="px-6 py-4">
                      <div className="space-y-4">
                        {/* Text Details Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">نام کتاب</p>
                            <p className="text-sm text-gray-800 font-medium">
                              {text.bookName}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">صفحه</p>
                            <p className="text-sm text-gray-800">{text.page}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">متن کامل</p>
                            <p className="text-sm text-gray-800 leading-relaxed">
                              {text.text}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">تاریخ افزودن</p>
                            <p className="text-sm text-gray-600">{text.dateAdded}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => openEditModal(text)}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-900 text-white rounded-lg hover:bg-emerald-950 transition-colors text-sm font-medium"
                          >
                            <Edit2 className="w-4 h-4" />
                            ویرایش
                          </button>
                          <button
                            onClick={() => handleDelete(text.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                            حذف
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            قبلی
          </button>
          <span className="text-sm text-gray-600">
            صفحه {currentPage} از {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            بعدی
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && editingText && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 text-right">
              ویرایش متن
            </h2>

            {/* Book Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                نام کتاب
              </label>
              <input
                type="text"
                value={editingText.bookName}
                onChange={(e) =>
                  setEditingText({ ...editingText, bookName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 text-right"
              />
            </div>

            {/* Page Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                صفحه
              </label>
              <input
                type="number"
                value={editingText.page}
                onChange={(e) =>
                  setEditingText({
                    ...editingText,
                    page: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-00 text-right"
              />
            </div>

            {/* Text Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-2">
                متن
              </label>
              <textarea
                value={editingText.text}
                onChange={(e) =>
                  setEditingText({ ...editingText, text: e.target.value })
                }
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900 text-right resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                انصراف
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-emerald-900 text-white rounded-lg hover:bg-emerald-950 transition-colors font-medium"
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







