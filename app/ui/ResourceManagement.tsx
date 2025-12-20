import React, { useState, useEffect, useCallback } from "react";
import {
  FilePen,
  Trash2,
  Plus,
  X,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Search,
  Library,
  CircleCheck,
  CircleOff,
} from "lucide-react";


// ============= 1. TYPES =============
interface Book {
  id: number;
  title: string;          // نام کتاب
  author: string;         // نام نویسنده
  publisher: string;      // ناشر
 deathYear: string;    // سال وفات
  subject: string;        // موضوع
  libraryDate: string;    // تاریخ انتشار در کتابخانه
  language: string;       // زبان

  // محتوا
  textContents?: string;      // متن
  pdfFileName?: string;       // نام فایل PDF
  contentsType: "text" | "pdf" | "both"; // نوع محتوا

  active: boolean;
  createdAt: string;
}


// چند نمونه‌ی تستی
const mockBooks: Book[] = [
  {
    id: 1,
    title: "مدیریت زمان در سازمان",
    author: "علی رضایی",
    publisher: "نشر سازمانی",
    deathYear: "",
    subject: "مدیریت",
    libraryDate: "1403/01/05",
    language: "فارسی",
    textContents: "فصل‌های آموزشی درباره برنامه‌ریزی، اولویت‌بندی و کنترل زمان.",
    pdfFileName: "",
    contentsType: "text",
    active: true,
    createdAt: "1403/01/05",
  },
  {
    id: 2,
    title: "اصول برنامه‌نویسی مدرن",
    author: "سارا احمدی",
    publisher: "نشر فن‌آوران",
    deathYear: "",
    subject: "فناوری اطلاعات",
    libraryDate: "1403/02/10",
    language: "فارسی",
    textContents: "مبانی OOP، طراحی نرم‌افزار و الگوهای رایج.",
    pdfFileName: "",
    contentsType: "text",
    active: true,
    createdAt: "1403/02/10",
  },
  {
    id: 3,
    title: "مبانی علم داده",
    author: "محمد کریمی",
    publisher: "نشر علم",
    deathYear: "",
    subject: "علم داده",
    libraryDate: "1403/02/20",
    language: "فارسی",
    textContents: "آشنایی با آمار، یادگیری ماشین و پردازش داده‌ها.",
    pdfFileName: "",
    contentsType: "pdf",
    active: true,
    createdAt: "1403/02/20",
  },
  {
    id: 4,
    title: "طراحی رابط کاربری",
    author: "نگار سجادی",
    publisher: "نشر هنر نرم‌افزار",
    deathYear: "",
    subject: "طراحی",
    libraryDate: "1403/03/01",
    language: "عربی",
    textContents: "اصول UX و UI برای وب و موبایل.",
    pdfFileName: "",
    contentsType: "both",
    active: true,
    createdAt: "1403/03/01",
  },
  {
    id: 5,
    title: "مدیریت پروژه چابک",
    author: "حسین مرادی",
    publisher: "نشر مدیریت نوین",
    deathYear: "",
    subject: "مدیریت پروژه",
    libraryDate: "1403/03/10",
    language: "عربی",
    textContents: "اسکرام، کانبان و متدهای چابک در سازمان‌ها.",
    pdfFileName: "",
    contentsType: "text",
    active: false,
    createdAt: "1403/03/10",
  },
  {
    id: 6,
    title: "مقدمه‌ای بر شبکه‌های کامپیوتری",
    author: "لیلا نصیری",
    publisher: "نشر فناوری",
    deathYear: "",
    subject: "شبکه",
    libraryDate: "1403/03/20",
    language: "فارسی",
    textContents: "مفاهیم لایه‌ای، پروتکل‌ها و امنیت شبکه.",
    pdfFileName: "",
    contentsType: "pdf",
    active: true,
    createdAt: "1403/03/20",
  },
  {
    id: 7,
    title: "آشنایی با امنیت اطلاعات",
    author: "امیر حسنی",
    publisher: "نشر ایمن‌افزار",
    deathYear: "",
    subject: "امنیت",
    libraryDate: "1403/04/01",
    language: "انگلیسی",
    textContents: "تهدیدها، آسیب‌پذیری‌ها و راهکارهای امنیتی.",
    pdfFileName: "",
    contentsType: "pdf",
    active: true,
    createdAt: "1403/04/01",
  },
  {
    id: 8,
    title: "تحلیل و طراحی سیستم‌ها",
    author: "زهرا یزدی",
    publisher: "نشر مهندس",
    deathYear: "",
    subject: "تحلیل سیستم",
    libraryDate: "1403/04/10",
    language: "فارسی",
    textContents: "روش‌های مستندسازی و مدل‌سازی فرایندها.",
    pdfFileName: "",
    contentsType: "text",
    active: true,
    createdAt: "1403/04/10",
  },
  {
    id: 9,
    title: "آمار و احتمال مهندسی",
    author: "کامران صادقی",
    publisher: "نشر دانشگاهی",
    deathYear: "",
    subject: "آمار",
    libraryDate: "1403/04/18",
    language: "انگلیسی",
    textContents: "مبانی آمار توصیفی و استنباطی برای مهندسان.",
    pdfFileName: "",
    contentsType: "both",
    active: false,
    createdAt: "1403/04/18",
  },
  {
    id: 10,
    title: "مبانی هوش مصنوعی",
    author: "نرگس پورجعفر",
    publisher: "نشر رایان",
    deathYear: "",
    subject: "هوش مصنوعی",
    libraryDate: "1403/04/25",
    language: "عربی",
    textContents: "جست‌وجو، منطق، یادگیری و کاربردهای هوش مصنوعی.",
    pdfFileName: "",
    contentsType: "text",
    active: true,
    createdAt: "1403/04/25",
  },
];



// ============= 2. MOCK API SERVICE =============
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));


class MockApiService {
  private data: Book[] = [...mockBooks];
  private nextId = 11;


  async getAllBooks(): Promise<Book[]> {
    await delay(500);
    return [...this.data];
  }


  async createBook(bookData: Omit<Book, "id" | "createdAt">): Promise<Book> {
    await delay(500);
    const newBook: Book = {
      id: this.nextId++,
      ...bookData,
      createdAt: new Date().toLocaleDateString("fa-IR"),
    };
    this.data.push(newBook);
    return newBook;
  }


  async updateBook(updatedBook: Book): Promise<Book> {
    await delay(500);
    const index = this.data.findIndex((b) => b.id === updatedBook.id);
    if (index !== -1) {
      this.data[index] = updatedBook;
      return updatedBook;
    }
    throw new Error("Book not found");
  }


  async deleteBook(id: number): Promise<void> {
    await delay(500);
    this.data = this.data.filter((b) => b.id !== id);
  }
}


const apiService = new MockApiService();


// ============= 3. SMALL COMPONENTS =============
interface TooltipButtonProps {
  icon: "edit" | "delete";
  label: string;
  onClick: () => void;
}


const TooltipButton: React.FC<TooltipButtonProps> = ({ icon, label, onClick }) => {
  const IconComponent = icon === "edit" ? FilePen : Trash2;
  const baseClasses =
    "p-2 rounded-full transition-all duration-200 active:scale-90 border inline-flex items-center justify-center";
  const editClasses =
    "border-indigo-300 text-indigo-500 hover:bg-indigo-50 hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-100";
  const deleteClasses =
    "border-red-300 text-red-500 hover:bg-red-50 hover:border-red-500 hover:shadow-md hover:shadow-red-100";
  const finalClasses =
    icon === "edit" ? `${baseClasses} ${editClasses}` : `${baseClasses} ${deleteClasses}`;


  return (
    <button onClick={onClick} title={label} className={finalClasses}>
      <IconComponent size={16} />
    </button>
  );
};


interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    onClick={onCancel}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-6 text-center">
        <AlertTriangle size={40} className="text-red-500 mx-auto mb-4 drop-shadow-sm" />
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-medium text:white bg-red-600 rounded-xl shadow-md hover:bg-red-700 transition-all active:scale-95 text-white"
          >
            تأیید حذف
          </button>
        </div>
      </div>
    </div>
  </div>
);


interface FormModalProps {
  title: string;
  initialData: Omit<Book, "id" | "createdAt"> | Book;
  onClose: () => void;
  onSave: (data: Omit<Book, "id" | "createdAt"> | Book) => Promise<void>;
}
const FormModal: React.FC<FormModalProps> = ({
  title,
  initialData,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Omit<Book, "id" | "createdAt"> | Book>(initialData);
  const [saving, setSaving] = useState(false);
const [selectedYear, setSelectedYear] = useState((initialData as Book).deathYear || "");

  const [contentsType, setContentsType] = useState<"text" | "pdf" | "both">(
    (initialData as Book).contentsType || "text"
  );
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfName, setPdfName] = useState((initialData as Book).pdfFileName || "");

  // بازه سال وفات، مثلا ۱۳۰۰ تا ۱۴۲۰
  const years = Array.from({ length: 1420 - 1300 + 1 }, (_, i) => 1300 + i);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
      setPdfFile(file);
      setPdfName(file.name);
      setFormData((prev) => ({ ...prev, pdfFileName: file.name }));
    } else {
      alert("فقط فایل PDF حداکثر 10 مگابایت مجاز است");
      e.target.value = "";
    }
  };


  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // اعتبارسنجی
    if (!formData.title.trim()) {
      alert("نام کتاب الزامی است");
      return;
    }
    if (!formData.author.trim()) {
      alert("نام نویسنده الزامی است");
      return;
    }
    
    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        deathYear: selectedYear,
        contentsType,
        pdfFileName: pdfFile ? pdfFile.name : (formData as Book).pdfFileName || "",
      } as Book;
      
      await onSave(dataToSave);
      onClose();
    } catch (error) {
      console.error("Error saving book:", error);
    } finally {
      setSaving(false);
    }
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-emerald-50 px-6 py-4 border-b border-indigo-100 flex justify-between items-center sticky top-0 z-10 bg-emerald-50/95 backdrop-blur-sm">
          <h3 className="font-bold text-lg text-emerald-800 flex items-center gap-2">
            <Library className="text-emerald-800" size={20} />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-emerald-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-full p-2 transition-colors active:scale-95"
          >
            <X size={20} />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام کتاب <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-emerald-600 focus:border-b-emerald-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام نویسنده <span className="text-red-500">*</span>
              </label>
              <input
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-emerald-500 focus:border-b-emerald-800 text-sm"
              />
            </div>
           <div className="grid grid-cols-2 gap-3">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">سال وفات از</label>
    <select
      value={selectedYear.split(" - ")[0] || ""}
      onChange={(e) => {
        const from = e.target.value;
        const to = selectedYear.split(" - ")[1] || "";
        setSelectedYear(from ? `${from} - ${to}` : "");
      }}
      className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-emerald-500 focus:border-b-emerald-800 text-sm"
    >
      <option value="">انتخاب کنید...</option>
      {years.slice(0, 60).map((year) => (
        <option key={`from-${year}`} value={year.toString()}>
          {year}
        </option>
      ))}
    </select>
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">سال وفات تا</label>
    <select
      value={selectedYear.split(" - ")[1] || ""}
      onChange={(e) => {
        const to = e.target.value;
        const from = selectedYear.split(" - ")[0] || "";
        setSelectedYear(from ? `${from} - ${to}` : "");
      }}
      className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-emerald-500 focus:border-b-emerald-800 text-sm"
    >
      <option value="">انتخاب کنید...</option>
      {years.slice(0, 60).map((year) => (
        <option key={`to-${year}`} value={year.toString()}>
          {year}
        </option>
      ))}
    </select>
  </div>
</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">موضوع</label>
              <input
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-emerald-500 focus:border-b-emerald-800 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تاریخ انتشار در کتابخانه
              </label>
              <input
                name="libraryDate"
                type="text"
                value={formData.libraryDate}
                onChange={handleChange}
                placeholder="1403/01/05"
                className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-emerald-500 focus:border-emerald-800 text-sm"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">زبان</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-emerald-500 focus:border-emerald-800 text-sm"
              >
                <option value="">انتخاب کنید...</option>
                <option value="فارسی">فارسی</option>
                <option value="عربی">عربی</option>
                <option value="انگلیسی">انگلیسی</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع محتوا <span className="text-red-500">*</span>
              </label>
              <select
                value={contentsType}
                onChange={(e) =>
                  setContentsType(e.target.value as "text" | "pdf" | "both")
                }
                className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-emerald-500 focus:border-emerald-800 text-sm"
              >
                <option value="text">حتما دارای متن</option>
                <option value="pdf">حتما دارای PDF</option>
                <option value="both">متن و PDF</option>
              </select>
            </div>
          </div>

          {/* محتویات */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              بارگزاری متن و PDF
            </label>

            {/* متن در حالت text یا both */}
            {(contentsType === "text" || contentsType === "both") && (
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  متن
                </label>
                <textarea
                  name="textContents"
                  rows={4}
                  value={(formData as Book).textContents || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-emerald-500 focus:border-emerald-800 text-sm resize-vertical"
                  placeholder="توضیحات محتویات کتاب را بنویسید..."
                />
              </div>
            )}

            {/* PDF در حالت pdf یا both */}
            {(contentsType === "pdf" || contentsType === "both") && (
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-b-emerald-900 transition-all bg-gray-50">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-2xl flex items-center justify-center">
                    <span className="text-emerald-900 font-semibold text-sm">PDF</span>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer mx-auto max-w-md"
                    />
                  </div>
                  {pdfFile || pdfName ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                      <p className="text-sm font-medium text-green-800 mb-1">
                        ✅ فایل انتخاب شد:
                      </p>
                      <p className="text-xs text-green-700 bg-white px-3 py-1 rounded-lg inline-block max-w-full truncate">
                        {pdfName}
                      </p>
                      {pdfFile && (
                        <p className="text-xs text-green-600 mt-1">
                          {Math.round(pdfFile.size / 1024)} KB
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      فایل PDF را انتخاب کنید (حداکثر 10 مگابایت)
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>


          <div className="flex items-center gap-2 pt-2">
            <input
              id="active"
              name="active"
              type="checkbox"
              checked={formData.active}
              onChange={handleChange}
              className="h-5 w-5 rounded text-emerald-700 border-gray-300 focus:ring-emerald-900"
            />
            <label
              htmlFor="active"
              className="text-sm font-medium text-gray-700 select-none flex items-center gap-1"
            >
              <CircleCheck size={16} className="text-emerald-500 inline-block" />
              فعال بودن کتاب
            </label>
          </div>


          <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white/80 backdrop-blur-sm z-10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
              disabled={saving}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-emerald-700 rounded-xl shadow-md shadow-indigo-200 hover:bg-emerald-900 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
              disabled={saving}
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
              {saving ? "در حال ذخیره..." : "ذخیره کتاب"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ============= 4. MAIN COMPONENT =============
export default function BooksTable() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const pageSize = 5;


  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllBooks();
      setBooks(response);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);


  const filteredBooks = books.filter((book) => {
    const q = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.publisher.toLowerCase().includes(q) ||
      book.subject.toLowerCase().includes(q) ||
      book.language.toLowerCase().includes(q)
    );
  });


  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize));
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  const handleCreate = useCallback(
    async (data: Omit<Book, "id" | "createdAt"> | Book) => {
      await apiService.createBook(data as Omit<Book, "id" | "createdAt">);
      fetchBooks();
      setCurrentPage(1);
    },
    [fetchBooks]
  );


  const handleEdit = useCallback(
    async (data: Omit<Book, "id" | "createdAt"> | Book) => {
      await apiService.updateBook(data as Book);
      fetchBooks();
    },
    [fetchBooks]
  );


  const handleDeleteConfirmed = useCallback(async () => {
    if (confirmDeleteId !== null) {
      await apiService.deleteBook(confirmDeleteId);
      setConfirmDeleteId(null);
      fetchBooks();
      setCurrentPage(1);
    }
  }, [confirmDeleteId, fetchBooks]);


  const handleCloseModal = (refresh = true) => {
    setShowCreateModal(false);
    setEditingBook(null);
    setExpandedId(null);
    if (refresh) fetchBooks();
  };


  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8"
      dir="rtl"
    >
      {confirmDeleteId !== null && (
        <ConfirmationModal
          title="تأیید حذف کتاب"
          message="آیا مطمئن هستید که می‌خواهید این کتاب را حذف کنید؟"
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}


      {showCreateModal && (
        <FormModal
          title="افزودن کتاب جدید"
          initialData={{
            title: "",
            author: "",
            publisher: "",
            deathYear: "",
            subject: "",
            libraryDate: "",
            language: "",
            textContents: "",
            pdfFileName: "",
            contentsType: "text",
            active: true,
          }}
          onClose={() => handleCloseModal()}
          onSave={handleCreate}
        />
      )}


      {editingBook && (
        <FormModal
          title={`ویرایش کتاب: ${editingBook.title}`}
          initialData={editingBook}
          onClose={() => handleCloseModal()}
          onSave={handleEdit}
        />
      )}


      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-2xl text-[#278760] shadow-lg">
                <Library size={26} />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#151515] leading-tight">
                  مدیریت منابع
                </h1>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-grow">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000000] pointer-events-none"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="جستجو در نام کتاب، نویسنده، ناشر..."
                  className="w-full rounded-2xl border border-gray-200 shadow-sm pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-900 focus:border-b-emerald-400 transition-all bg-white/50 backdrop-blur-sm placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#278760] to-emerald-900 text-white hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 flex items-center justify-center gap-2 text-sm font-semibold whitespace-nowrap min-h-[44px]"
              >
                <Plus size={20} />
                افزودن کتاب جدید
              </button>
            </div>
          </div>
        </div>


        {/* Table */}
        <div className="bg-white/70 backdrop-blur rounded-3xl shadow-2xl border border-slate-100/50 overflow-hidden">
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="w-full lg:table-fixed text-xs sm:text-sm">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 sm:px-6 font-bold text-gray-700 whitespace-nowrap">
                    ردیف
                  </th>
                  <th className="py-3 px-4 sm:px-6 font-bold text-gray-700 whitespace-nowrap">
                    نام کتاب
                  </th>
                  <th className="py-3 px-4 sm:px-6 font-bold text-gray-700 whitespace-nowrap">
                    نام نویسنده
                  </th>
                  <th className="hidden md:table-cell py-3 px-4 sm:px-6 font-bold text-gray-700 whitespace-nowrap">
                    ناشر
                  </th>
                  <th className="hidden lg:table-cell py-3 px-4 sm:px-6 font-bold text-gray-700 whitespace-nowrap">
                    سال وفات
                  </th>
                  <th className="hidden md:table-cell py-3 px-4 sm:px-6 font-bold text-gray-700 whitespace-nowrap">
                    موضوع
                  </th>
                 <th className="hidden lg:table-cell py-3 px-4 sm:px-6 font-bold text-gray-700">
                    تاریخ انتشار در کتابخانه
                  </th>
                  <th className="hidden lg:table-cell py-3 px-4 sm:px-6 font-bold text-gray-700 text-center">
                    زبان
                  </th>
                  <th className="hidden lg:table-cell py-3 px-4 sm:px-6 font-bold text-gray-700 whitespace-nowrap">
                    محتویات دارای
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-center font-bold text-gray-700 whitespace-nowrap">
                    وضعیت
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-center font-bold text-gray-700 whitespace-nowrap">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedBooks.length > 0 ? (
                  paginatedBooks.map((b, index) => (
                    <tr key={b.id} className="hover:bg-gray-50/50 transition-all group">
                      <td className="py-3 px-4 sm:px-6 text-gray-700 text-center">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="py-3 px-4 sm:px-6 font-semibold text-gray-800">
                        {b.title}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-gray-700">{b.author}</td>
                      <td className="hidden md:table-cell py-3 px-4 sm:px-6 text-gray-600">
                        {b.publisher || "---"}
                      </td>
                      <td className="hidden lg:table-cell py-3 px-4 sm:px-6 text-gray-600">
                        {b.deathYear || "---"}
                      </td>
                      <td className="hidden md:table-cell py-3 px-4 sm:px-6 text-gray-600">
                        {b.subject || "---"}
                      </td>
                      <td
                        className="hidden lg:table-cell py-3 px-4 sm:px-6 text-gray-500 font-mono"
                        dir="ltr"
                      >
                        {b.libraryDate || "---"}
                      </td>
<td className="hidden lg:table-cell py-3 px-4 sm:px-6 text-gray-600 text-center">
  {b.language === "فارسی" && "فارسی"}
  {b.language === "عربی" && "عربی"}
  {b.language === "انگلیسی" && "انگلیسی"}
  {!b.language && "---"}
</td>

                  
                        {/* نمایش محتویات بر اساس نوع */}
<td className="hidden lg:table-cell py-3 px-4 sm:px-6 text-gray-600 text-center">
  {b.contentsType === "text" && "متن"}
  {b.contentsType === "pdf" && "PDF"}
  {b.contentsType === "both" && "متن و PDF"}
  {!b.contentsType && "---"}
</td>


                      <td className="py-3 px-4 sm:px-6 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                            b.active
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {b.active ? (
                            <>
                              <CircleCheck size={14} /> فعال
                            </>
                          ) : (
                            <>
                              <CircleOff size={14} /> غیرفعال
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <TooltipButton
                            icon="edit"
                            label="ویرایش"
                            onClick={() => setEditingBook(b)}
                          />
                          <TooltipButton
                            icon="delete"
                            label="حذف"
                            onClick={() => setConfirmDeleteId(b.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="py-16 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-4">
                        <Library size={48} className="text-gray-300" />
                        <div className="text-lg font-medium text-gray-500">
                          هیچ کتابی وجود ندارد
                        </div>
                        <button
                          onClick={() => setShowCreateModal(true)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white text-sm rounded-xl hover:bg-emerald-900 transition-all shadow-md"
                        >
                          <Plus size={16} />
                          افزودن اولین کتاب
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>


          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm text-gray-600 text-center">
                  نمایش{" "}
                  <strong>{(currentPage - 1) * pageSize + 1}</strong>–
                  <strong>{Math.min(currentPage * pageSize, filteredBooks.length)}</strong>{" "}
                  از <strong>{filteredBooks.length}</strong> کتاب
                </span>
                <div className="flex items-center gap-2 justify-center">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all min-h-[44px] flex items-center justify-center"
                  >
                    قبلی
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-xl">
                    صفحه {currentPage} از {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all min-h-[44px] flex items-center justify-center"
                  >
                    بعدی
                  </button>
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
