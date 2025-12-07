"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  LibraryBig, 
  Pencil, 
  Trash2, 
  Filter,
  CheckCircle2,
  XCircle,
  X // آیکون بسته شدن
} from 'lucide-react';

// تعریف اینترفیس برای داده‌های کتاب/منبع
interface Resource {
  id: number;
  rowNumber: string;
  bookName: string;
  authorName: string;
  publisher: string;
  deathYear: string; 
  subject: string;
  libraryDate: string;
  language: string;
  contents: string;
  isAvailable: boolean;
}

// داده‌های نمونه (Mock Data)
const initialData: Resource[] = [
  {
    id: 1,
    rowNumber: "۰۰۱",
    bookName: "طراحی سیستم‌های شی‌گرا و الگوهای معماری نرم‌افزارهای توزیع‌شده (عنوان بسیار طولانی برای تست ریسپانسیو بودن کامل)", 
    authorName: "الکساندر شولتز",
    publisher: "نشر علوم",
    deathYear: "---",
    subject: "مهندسی نرم‌افزار",
    libraryDate: "۱۴۰۲/۰۵/۱۰",
    language: "فارسی",
    contents: "CD آموزشی به همراه فصل‌های تکمیلی و توضیحات دقیق فنی و چندین ضمیمه دیگر که باعث طولانی شدن متن می‌شود.",
    isAvailable: true,
  },
  {
    id: 2,
    rowNumber: "۰۰۲",
    bookName: "Clean Code: A Handbook of Agile Software Craftsmanship", 
    authorName: "Robert C. Martin",
    publisher: "Prentice Hall",
    deathYear: "---",
    subject: "برنامه‌نویسی پیشرفته",
    libraryDate: "۱۴۰۲/۰۶/۱۲",
    language: "انگلیسی",
    contents: "PDF ضمیمه، سورس کد و چندین فصل تکمیلی دیگر.",
    isAvailable: true,
  },
  {
  id: 3,
  rowNumber: "۰۰۳",
  bookName: "دیوان حافظ",
  authorName: "خواجه شمس‌الدین محمد حافظ شیرازی",
  publisher: "نشر ققنوس",
  deathYear: "۷۹۲ ه.ق",
  subject: "ادبیات کلاسیک",
  libraryDate: "۱۴۰۱/۱۱/۲۰",
  language: "فارسی",
  isAvailable: false,
  contents: "نسخه چاپی نفیس با جلد سخت و قطع جیبی.",
},
{
  id: 4,
  rowNumber: "۰۰۴",
  bookName: "مبانی داده‌کاوی",
  authorName: "جعفر نژاد قمی",
  publisher: "نشر دانشگاهی",
  deathYear: "---",
  subject: "علوم داده",
  libraryDate: "۱۴۰۳/۰۱/۱۵",
  language: "فارسی",
  contents: "دیتاست کامل برای تمرین به همراه توضیحات مفصل.",
  isAvailable: true,
},
];

// Map of field names to their Persian labels for rendering in the form
const fieldLabels: Record<keyof Omit<Resource, 'id' | 'isAvailable'>, string> = {
  rowNumber: "شماره ردیف",
  bookName: "نام کتاب",
  authorName: "نام نویسنده",
  publisher: "نام ناشر",
  deathYear: "سال وفات/انتشار",
  subject: "موضوع",
  libraryDate: "تاریخ ثبت",
  language: "زبان",
  contents: "محتویات جانبی",
};


// ----------------------------------------------------------------------------------
// Edit Resource Modal Component 
// ----------------------------------------------------------------------------------
interface EditModalProps {
  resource: Resource;
  onClose: () => void;
  onSave: (updatedResource: Resource) => void;
}

const EditResourceModal: React.FC<EditModalProps> = ({ resource, onClose, onSave }) => {
  const [formData, setFormData] = useState<Resource>(resource);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle checkbox separately
    const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex justify-between items-center sticky top-0">
          <h3 className="font-bold text-lg text-indigo-900 flex items-center gap-2">
            <Pencil size={20} />
            ویرایش منبع: {resource.bookName}
          </h3>
          <button 
            onClick={onClose}
            className="text-indigo-400 hover:text-indigo-600 hover:bg-indigo-100 rounded-full p-2 transition-colors active:scale-95"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Loop through all fields for input generation */}
            {(Object.keys(formData) as (keyof Resource)[]).filter(key => key !== 'id').map((key) => {
              if (key === 'isAvailable') {
                return (
                  <div key={key} className="col-span-1 sm:col-span-2 flex items-center space-x-3 space-x-reverse mt-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <input
                      id="isAvailable"
                      name="isAvailable"
                      type="checkbox"
                      checked={formData.isAvailable}
                      onChange={handleChange}
                      className="h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700 select-none">
                      منبع در حال حاضر **موجود** است (وضعیت امانت)
                    </label>
                  </div>
                );
              }
              
              const label = fieldLabels[key as keyof typeof fieldLabels];
              const isTextArea = key === 'contents';

              return (
                <div key={key} className={key === 'contents' ? 'sm:col-span-2' : 'sm:col-span-1'}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  {isTextArea ? (
                    <textarea
                      id={key}
                      name={key}
                      rows={3}
                      value={formData[key] as string}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  ) : (
                    <input
                      id={key}
                      name={key}
                      type="text"
                      value={formData[key] as string}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </form>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
          >
            انصراف
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-1"
          >
            <Pencil size={18} />
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------------------
export default function ResourceManagement() {
  const [resources, setResources] = useState<Resource[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for content viewing modal
  const [selectedContent, setSelectedContent] = useState<{title: string, value: string} | null>(null);

  // State for editing modal
  const [isEditing, setIsEditing] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // State for mobile view detection (md breakpoint is 768px in Tailwind)
  const [isMobileView, setIsMobileView] = useState(false);

  // Effect to check screen size and set isMobileView
  useEffect(() => {
    const checkMobile = () => {
        // We consider anything below the 'md' breakpoint (768px) as mobile view for card layout
        setIsMobileView(window.innerWidth < 768);
    };

    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  // Filtered resources based on search term
  const filteredResources = resources.filter(resource =>
    resource.bookName.includes(searchTerm) ||
    resource.authorName.includes(searchTerm) ||
    resource.rowNumber.includes(searchTerm)
  );

  // --- Handlers ---
  
  // Handle content cell click (for long text)
  const handleCellClick = (title: string, value: string) => {
    setSelectedContent({ title, value });
  };
  
  // Handle delete (simple confirmation)
  const handleDelete = (id: number) => {
    // IMPORTANT: Custom modal UI should be used instead of window.confirm in production
    if (window.confirm("آیا از حذف این منبع مطمئن هستید؟")) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  // Handle edit button click
  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setIsEditing(true);
  };

  // Handle saving the edited resource
  const handleSaveEdit = useCallback((updatedResource: Resource) => {
    setResources(resources.map(r => 
      r.id === updatedResource.id ? updatedResource : r
    ));
    setIsEditing(false);
    setEditingResource(null);
  }, [resources]);


  // Columns mapping for Card View in mobile (also used for table headers)
  const columnTitles: Record<keyof Omit<Resource, 'id' | 'isAvailable'>, string> = {
    rowNumber: "شماره",
    bookName: "نام کتاب",
    authorName: "نویسنده",
    publisher: "ناشر",
    deathYear: "وفات",
    subject: "موضوع",
    libraryDate: "تاریخ",
    language: "زبان",
    contents: "محتویات",
  };
  
  // Helper function to render status badge
  const renderStatusBadge = (isAvailable: boolean) => {
      return isAvailable ? (
          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-xl w-fit border border-green-100">
              <CheckCircle2 size={14} />
              <span className="text-[10px] font-medium whitespace-nowrap">موجود</span>
          </div>
      ) : (
          <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-xl w-fit border border-red-100">
              <XCircle size={14} />
              <span className="text-[10px] font-medium whitespace-nowrap">امانت</span>
          </div>
      );
  };

  // Helper function to render action buttons
  const renderActions = (item: Resource) => (
      <div className="flex items-center justify-start md:justify-center gap-2">
          <button 
              onClick={() => handleEdit(item)}
              className="p-1.5 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100 active:scale-95" 
              title="ویرایش"
          >
              <Pencil size={16} />
          </button>
          <button 
              onClick={() => handleDelete(item.id)}
              className="p-1.5 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-100 active:scale-95" 
              title="حذف"
          >
              <Trash2 size={16} />
          </button>
      </div>
  );


  // ----------------------------------------------------------------------------------
  // TABLE VIEW (For md and larger screens) - With fixed column widths for better layout
  // ----------------------------------------------------------------------------------
  const TableView = () => (
      // min-w-[1200px] ensures the table always has enough space, triggering overflow-x-auto if needed
      <table className="min-w-[1200px] w-full text-right border-collapse table-fixed">
          <thead>
              {/* حذف فضای خالی اطراف تگ tr برای رفع خطای Whitespace text nodes */}
              <tr className="bg-gray-100/80 text-gray-600 text-xs font-bold uppercase tracking-wider">
                  <th className="px-2 py-4 first:rounded-tr-2xl w-[5%]">شماره</th>
                  <th className="px-2 py-4 w-[25%]">نام کتاب</th>
                  <th className="px-2 py-4 w-[10%]">نویسنده</th>
                  <th className="px-2 py-4 w-[10%]">ناشر</th>
                  <th className="px-2 py-4 w-[7%]">وفات</th>
                  <th className="px-2 py-4 w-[8%]">موضوع</th>
                  <th className="px-2 py-4 w-[8%]">تاریخ</th>
                  <th className="px-2 py-4 w-[5%]">زبان</th>
                  <th className="px-2 py-4 w-[15%]">محتویات</th>
                  <th className="px-2 py-4 w-[3%]">وضعیت</th>
                  <th className="px-4 py-4 text-center last:rounded-tl-2xl w-[4%]">عملیات</th>
              </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
              {filteredResources.length > 0 ? (
                  // استفاده از پرانتز برای map برای اطمینان از اینکه بلافاصله JSX برگردانده می‌شود
                  filteredResources.map((item) => (
                      <tr key={item.id} className="group hover:bg-indigo-50/30 transition-colors duration-200">
                          {/* 1. شماره ردیف - فشرده‌سازی برای حذف Whitespace text nodes */}
                          <td className="px-2 py-5 text-gray-500 font-mono text-sm truncate cursor-pointer hover:text-indigo-600 align-top" onClick={() => handleCellClick("شماره ردیف", item.rowNumber)}><div className="py-1">{item.rowNumber}</div></td>
                          {/* 2. نام کتاب */}
                          <td className="px-2 py-5 font-bold text-gray-800 truncate cursor-pointer hover:text-indigo-600 align-top" onClick={() => handleCellClick("نام کتاب", item.bookName)}><div className="py-1">{item.bookName}</div></td>
                          {/* 3. نویسنده */}
                          <td className="px-2 py-5 text-gray-600 truncate cursor-pointer hover:text-indigo-600 align-top" onClick={() => handleCellClick("نام نویسنده", item.authorName)}><div className="py-1">{item.authorName}</div></td>
                          {/* 4. ناشر */}
                          <td className="px-2 py-5 text-gray-600 truncate cursor-pointer hover:text-indigo-600 align-top" onClick={() => handleCellClick("ناشر", item.publisher)}><span className="bg-gray-100 px-2 py-1 rounded-lg text-xs border border-gray-200 truncate inline-block w-fit">{item.publisher}</span></td>
                          {/* 5. وفات */}
                          <td className="px-2 py-5 text-gray-500 text-sm truncate cursor-pointer hover:text-indigo-600 align-top" onClick={() => handleCellClick("سال وفات", item.deathYear)}><div className="py-1">{item.deathYear}</div></td>
                          {/* 6. موضوع */}
                          <td className="px-2 py-5 text-gray-600 truncate cursor-pointer hover:text-indigo-600 align-top" onClick={() => handleCellClick("موضوع", item.subject)}><div className="py-1">{item.subject}</div></td>
                          {/* 7. تاریخ */}
                          <td className="px-2 py-5 text-gray-500 text-sm truncate cursor-pointer hover:text-indigo-600 align-top" dir="ltr" onClick={() => handleCellClick("تاریخ ثبت در کتابخانه", item.libraryDate)}><div className="py-1">{item.libraryDate}</div></td>
                          {/* 8. زبان */}
                          <td className="px-2 py-5 text-gray-600 truncate cursor-pointer hover:text-indigo-600 align-top" onClick={() => handleCellClick("زبان", item.language)}><div className="py-1">{item.language}</div></td>
                          {/* 9. محتویات */}
                          <td className="px-2 py-5 text-gray-500 text-sm truncate max-w-[150px] cursor-pointer hover:text-indigo-600 align-top" onClick={() => handleCellClick("محتویات", item.contents)}><div className="py-1">{item.contents}</div></td>
                          {/* 10. وضعیت */}
                          <td className="px-2 py-5 align-top"><div className="py-1">{renderStatusBadge(item.isAvailable)}</div></td>
                          {/* 11. عملیات */}
                          <td className="px-4 py-5 text-center align-top"><div className="py-1">{renderActions(item)}</div></td>
                      </tr>
                  ))
              ) : (
                  // سطر "موردی یافت نشد"
                  <tr>
                      <td colSpan={11} className="px-6 py-12 text-center text-gray-400">
                          <Search size={40} className="text-gray-300 mb-2 mx-auto" />
                          <span>موردی یافت نشد</span>
                      </td>
                  </tr>
              )}
          </tbody>
      </table>
  );

  // ----------------------------------------------------------------------------------
  // CARD VIEW (For xs/sm screens) - Fully stacked and flowing
  // ----------------------------------------------------------------------------------
  const CardView = () => (
    <div className="space-y-4">
        {filteredResources.length > 0 ? (
            filteredResources.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 space-y-3">
                    
                    {/* Header: Title and Row Number */}
                    <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                        <h2 className="text-base font-bold text-indigo-700 max-w-[80%] overflow-hidden overflow-ellipsis whitespace-nowrap" onClick={() => handleCellClick("نام کتاب", item.bookName)}>
                            {item.bookName}
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap mr-2 font-mono">
                            {item.rowNumber}
                        </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                        {/* Author */}
                        <div className="col-span-2 sm:col-span-1">
                            <span className="text-gray-400 block mb-0.5">{columnTitles.authorName}</span>
                            <span className="text-gray-700 font-medium" onClick={() => handleCellClick("نام نویسنده", item.authorName)}>{item.authorName}</span>
                        </div>
                        {/* Publisher */}
                        <div className="col-span-2 sm:col-span-1">
                            <span className="text-gray-400 block mb-0.5">{columnTitles.publisher}</span>
                            <span className="text-gray-700 font-medium">{item.publisher}</span>
                        </div>
                        {/* Subject */}
                        <div className="col-span-1">
                            <span className="text-gray-400 block mb-0.5">{columnTitles.subject}</span>
                            <span className="text-gray-700 text-xs bg-indigo-50 px-2 py-0.5 rounded-lg w-fit block">{item.subject}</span>
                        </div>
                        {/* Date */}
                        <div className="col-span-1">
                            <span className="text-gray-400 block mb-0.5">{columnTitles.libraryDate}</span>
                            <span className="text-gray-700 font-mono text-xs" dir="ltr">{item.libraryDate}</span>
                        </div>
                    </div>

                    {/* Status & Actions Footer */}
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-3">
                        <div>
                            <span className="text-gray-500 text-xs block mb-1">وضعیت:</span>
                            {renderStatusBadge(item.isAvailable)}
                        </div>
                        {renderActions(item)}
                    </div>

                    {/* Contents (Clickable) */}
                    <div className="pt-3 border-t border-gray-100" onClick={() => handleCellClick("محتویات جانبی", item.contents)}>
                        <span className="text-gray-400 text-xs block mb-1">{columnTitles.contents}</span>
                        <p className="text-gray-600 text-sm italic overflow-hidden overflow-ellipsis max-w-full">
                            {item.contents}
                        </p>
                    </div>

                </div>
            ))
        ) : (
            <div className="px-6 py-12 text-center text-gray-400 flex flex-col items-center justify-center gap-2 bg-white rounded-2xl shadow-md border border-gray-100">
                <Search size={40} className="text-gray-300 mb-2" />
                <span>موردی یافت نشد</span>
            </div>
        )}
    </div>
  );
  // ----------------------------------------------------------------------------------


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans" dir="rtl">
      {/* استایل فونت فارسی */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap');
        body { font-family: 'Vazirmatn', sans-serif; }
      `}</style>

      {/* --- Modals --- */}
      
      {/* 1. Content Viewer Modal */}
      {selectedContent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all animate-in fade-in duration-200"
          onClick={() => setSelectedContent(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex justify-between items-center">
              <h3 className="font-bold text-indigo-900">{selectedContent.title}</h3>
              <button 
                onClick={() => setSelectedContent(null)}
                className="text-indigo-400 hover:text-indigo-600 hover:bg-indigo-100 rounded-full p-2 transition-colors active:scale-95"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-justify">
                {selectedContent.value}
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-3 text-left">
              <button 
                onClick={() => setSelectedContent(null)}
                className="text-sm text-gray-500 hover:text-gray-800 font-medium"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Edit Resource Modal */}
      {isEditing && editingResource && (
        <EditResourceModal 
          resource={editingResource} 
          onClose={() => setIsEditing(false)} 
          onSave={handleSaveEdit}
        />
      )}

      {/* --- Main Layout --- */}
      <div className="w-full max-w-[1400px] mx-auto bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col">
        
        {/* ==================== بخش بالایی (Header) ==================== */}
        <div className="bg-white p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600 shadow-sm">
              <LibraryBig size={32} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">مدیریت منابع</h1>
              <p className="text-sm text-gray-400 mt-1">لیست تمامی کتاب‌ها و منابع موجود</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            
            {/* نوار جست‌وجو */}
            <div className="relative group w-full sm:w-60 md:w-80"> 
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="جستجو در منابع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-2xl py-3 pr-12 pl-4 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm text-sm"
              />
            </div>

            {/* دکمه افزودن */}
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-200 active:scale-95 text-sm">
              <Plus size={20} />
              <span className="font-medium whitespace-nowrap">افزودن منبع جدید</span>
            </button>
          </div>
        </div>

        {/* ==================== بخش اصلی (Body/Table/Card) ==================== */}
        <div className="p-4 md:p-8 bg-gray-50/50 flex-grow">
          
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col">
            
            {/* هدر بالای جدول/کارت‌ها */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Filter size={16} />
                <span>نمایش {filteredResources.length} مورد</span>
              </div>
              <div className="hidden sm:flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
            </div>

            <div className="w-full p-4 md:p-0">
              {/* Conditional Rendering: Table vs Card View */}
              {isMobileView ? (
                  <div className="md:hidden">
                      <CardView />
                  </div>
              ) : (
                  <div className="hidden md:block overflow-x-auto"> {/* اعمال overflow-x-auto برای جلوگیری از به‌هم ریختگی در عرض‌های میانی */}
                      <TableView />
                  </div>
              )}
            </div>

            {/* صفحه‌بندی (Pagination) پایین جدول */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm text-gray-500">
                نمایش ۱ تا {filteredResources.length} مورد از {resources.length} ورودی
              </span>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50">قبلی</button>
                <button className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700">۱</button>
                <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">۲</button>
                <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">۳</button>
                <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">بعدی</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}