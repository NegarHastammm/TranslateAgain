'use client';

import { useState } from 'react';
import { 
  HiOutlineBookOpen, 
 
  HiChevronRight, 
  HiXMark,
  HiOutlineCalendar,
  HiOutlineLanguage,
  HiDocumentText,
  HiDocumentArrowDown,
  HiMagnifyingGlass,
  HiOutlineAdjustmentsHorizontal
} from 'react-icons/hi2';

import { HiChevronLeft } from 'react-icons/hi2';



interface Book {
  id: string;
  row: number;
  title: string;
  author: string;
  publisher: string;
  deathYear: string;
  publishYear: string;
  language: 'فارسی' | 'عربی' | 'انگلیسی';
  hasText: boolean;
  hasPDF: boolean;
  topic: string;
  coverImage: string;
  description: string;
}

const mockBooks: Book[] = [
  { 
    id: '1', row: 1, title: 'قرآن کریم', author: 'وحی الهی', publisher: 'دارالکتب العلمیه', 
    deathYear: '-', publishYear: '1400', language: 'عربی', hasText: true, hasPDF: true, 
    topic: 'دینی', coverImage: '/quran.jpg',
    description: 'کتاب مقدس مسلمانان با 114 سوره و بیش از 6000 آیه'
  },
  { 
    id: '2', row: 2, title: 'مثنوی معنوی', author: 'مولانا', publisher: 'نشر علم', 
    deathYear: '672', publishYear: '1398', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'ادبی', coverImage: '/masnavi.jpg',
    description: 'اثر عظیم مولانا جلال‌الدین رومی در 6 دفتر و 26500 بیت'
  },
  { 
    id: '3', row: 3, title: 'شاهنامه', author: 'فردوسی', publisher: 'نشر ققنوس', 
    deathYear: '416', publishYear: '1396', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'ادبی', coverImage: '/shahname.jpg',
    description: 'حماسه ملی ایران با داستان‌های افسانه‌ای و تاریخی'
  },
  { 
    id: '4', row: 4, title: 'رباعیات عمر خیام', author: 'عمر خیام', publisher: 'نشر نیلوفر', 
    deathYear: '517', publishYear: '1397', language: 'فارسی', hasText: true, hasPDF: false, 
    topic: 'شاعری', coverImage: '/rubaiyat.jpg',
    description: 'مجموعه رباعیات فلسفی و عاشقانه عمر خیام'
  },
  { 
    id: '5', row: 5, title: 'گلستان سعدی', author: 'سعدی شیرازی', publisher: 'نشر سخن', 
    deathYear: '690', publishYear: '1395', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'ادبی', coverImage: '/golestan.jpg',
    description: 'کتاب اخلاقی و ادبی با داستان‌های پند‌آموز'
  },
  { 
    id: '6', row: 6, title: 'بوستان سعدی', author: 'سعدی شیرازی', publisher: 'نشر سخن', 
    deathYear: '690', publishYear: '1394', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'شاعری', coverImage: '/boestan.jpg',
    description: 'کتاب شاعری و حکمت با مضامین اخلاقی'
  },
  { 
    id: '7', row: 7, title: 'ته‌عماق', author: 'فیودور دستایفسکی', publisher: 'نشر نیلوفر', 
    deathYear: '1881', publishYear: '1392', language: 'فارسی', hasText: true, hasPDF: false, 
    topic: 'رمان', coverImage: '/crime.jpg',
    description: 'داستان روان‌شناختی درباره جنایت و تنزل اخلاقی'
  },
  { 
    id: '8', row: 8, title: 'جنگ و صلح', author: 'لئو تلستوی', publisher: 'نشر ثالث', 
    deathYear: '1910', publishYear: '1390', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'رمان', coverImage: '/war.jpg',
    description: 'حماسه‌ای درباره جنگ‌های ناپلئونی و زندگی خانوادگی'
  },
  { 
    id: '9', row: 9, title: 'کثیر الدعاء', author: 'شیخ عباس قمی', publisher: 'دارالعلم', 
    deathYear: '1359', publishYear: '1399', language: 'عربی', hasText: true, hasPDF: true, 
    topic: 'دینی', coverImage: '/kasirol.jpg',
    description: 'مجموعه‌ای از ادعیه و احکام دینی'
  },
  { 
    id: '10', row: 10, title: 'پیکان خود', author: 'نیما یوشیج', publisher: 'نشر دنیای نو', 
    deathYear: '1350', publishYear: '1393', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'شاعری', coverImage: '/pikan.jpg',
    description: 'مجموعه‌ی شاعری معاصر نیما یوشیج'
  },
  { 
    id: '11', row: 11, title: 'برگزیده‌های حافظ', author: 'حافظ شیرازی', publisher: 'نشر علم', 
    deathYear: '791', publishYear: '1400', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'شاعری', coverImage: '/hafez.jpg',
    description: 'برگزیده‌ای از غزل‌های عرفانی حافظ شیرازی'
  },
  { 
    id: '12', row: 12, title: 'دیوان کامل حافظ', author: 'حافظ شیرازی', publisher: 'نشر قاموس', 
    deathYear: '791', publishYear: '1398', language: 'فارسی', hasText: true, hasPDF: false, 
    topic: 'شاعری', coverImage: '/hafez2.jpg',
    description: 'مجموعه کامل غزل‌های حافظ شیرازی'
  },
  { 
    id: '13', row: 13, title: 'فلسفه اخلاق', author: 'ارسطو', publisher: 'نشر دانشگاهی', 
    deathYear: '322BC', publishYear: '1396', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'فلسفه', coverImage: '/ethics.jpg',
    description: 'رساله‌ای درباره اخلاق و فضیلت'
  },
  { 
    id: '14', row: 14, title: 'تجزیه و تحلیل رمان', author: 'محمد علی سپانلو', publisher: 'نشر مرکز', 
    deathYear: '1388', publishYear: '1397', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'نقد ادبی', coverImage: '/analysis.jpg',
    description: 'کتاب درباره ساختار و تحلیل رمان‌های فارسی'
  },
  { 
    id: '15', row: 15, title: 'تاریخ ایران باستان', author: 'تقی آریانپور', publisher: 'نشر امیرکبیر', 
    deathYear: '1398', publishYear: '1394', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'تاریخ', coverImage: '/history.jpg',
    description: 'بررسی جامع تاریخ ایران از عصر باستان'
  },
  { 
    id: '16', row: 16, title: 'تاریخ تمدن اسلامی', author: 'سیدمحمد علی کیانی', publisher: 'نشر دانشگاهی', 
    deathYear: '1383', publishYear: '1395', language: 'فارسی', hasText: true, hasPDF: false, 
    topic: 'تاریخ', coverImage: '/islamic.jpg',
    description: 'مطالعه تاریخ و تمدن اسلامی'
  },
  { 
    id: '17', row: 17, title: 'اقتصاد سیاسی', author: 'آدام اسمیت', publisher: 'نشر سمت', 
    deathYear: '1790', publishYear: '1393', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'اقتصاد', coverImage: '/economy.jpg',
    description: 'اثر بنیادی در مورد اقتصاد و تقسیم کار'
  },
  { 
    id: '18', row: 18, title: 'سرمایه', author: 'کارل مارکس', publisher: 'نشر مارکس', 
    deathYear: '1883', publishYear: '1391', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'اقتصاد', coverImage: '/capital.jpg',
    description: 'کتاب بنیادی درباره نظام سرمایه‌داری'
  },
  { 
    id: '19', row: 19, title: 'روانشناسی مختصر', author: 'روبرت زیمبارد', publisher: 'نشر رشد', 
    deathYear: '1932', publishYear: '1396', language: 'فارسی', hasText: true, hasPDF: false, 
    topic: 'روانشناسی', coverImage: '/psychology.jpg',
    description: 'کتاب مختصر در موضوع روانشناسی عمومی'
  },
  { 
    id: '20', row: 20, title: 'یوگا و فلسفه هند', author: 'الیاده میرچیا', publisher: 'نشر امکان', 
    deathYear: '1986', publishYear: '1394', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'فلسفه', coverImage: '/yoga.jpg',
    description: 'بررسی فلسفی یوگا و تفکر هندی'
  },
  { 
    id: '21', row: 21, title: 'بیولوژی عمومی', author: 'کمپبل', publisher: 'نشر دانشگاهی', 
    deathYear: '2012', publishYear: '1397', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'علم', coverImage: '/biology.jpg',
    description: 'کتاب جامع درباره مبانی زیست‌شناسی'
  },
  { 
    id: '22', row: 22, title: 'شیمی عضوی', author: 'جراهام سولومن', publisher: 'نشر علم', 
    deathYear: '2011', publishYear: '1395', language: 'فارسی', hasText: true, hasPDF: false, 
    topic: 'علم', coverImage: '/chemistry.jpg',
    description: 'کتاب معتبر در شیمی عضوی'
  },
  { 
    id: '23', row: 23, title: 'فیزیک کوانتومی', author: 'ریچارد فاینمن', publisher: 'نشر آینده', 
    deathYear: '1988', publishYear: '1393', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'علم', coverImage: '/quantum.jpg',
    description: 'معرفی تصویری فیزیک کوانتومی'
  },
  { 
    id: '24', row: 24, title: 'نظریه نسبیت', author: 'آلبرت انیشتین', publisher: 'نشر دانش', 
    deathYear: '1955', publishYear: '1394', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'علم', coverImage: '/relativity.jpg',
    description: 'شرح نسبیت خاص و عام'
  },
  { 
    id: '25', row: 25, title: 'تکامل', author: 'چارلز داروین', publisher: 'نشر علم و معرفت', 
    deathYear: '1882', publishYear: '1396', language: 'فارسی', hasText: true, hasPDF: true, 
    topic: 'علم', coverImage: '/evolution.jpg',
    description: 'نظریه تکامل و انتخاب طبیعی'
  },
];

export default function OnlineStudy() {
  const [showFilter, setShowFilter] = useState(false);
  const [showDetail, setShowDetail] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [filters, setFilters] = useState({
    title: '', author: '', publisher: '', deathYearFrom: '', deathYearTo: '',
    publishYearFrom: '', publishYearTo: '', topic: '', language: '',
    hasText: false, hasPDF: false
  });

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.includes(searchQuery) || book.author.includes(searchQuery);
    const matchesTitle = !filters.title || book.title.includes(filters.title);
    const matchesAuthor = !filters.author || book.author.includes(filters.author);
    const matchesPublisher = !filters.publisher || book.publisher.includes(filters.publisher);
    const matchesLanguage = !filters.language || book.language === filters.language;
    const matchesTopic = !filters.topic || book.topic.includes(filters.topic);
    const matchesText = !filters.hasText || book.hasText;
    const matchesPDF = !filters.hasPDF || book.hasPDF;

    return matchesSearch && matchesTitle && matchesAuthor && matchesPublisher && 
           matchesLanguage && matchesTopic && matchesText && matchesPDF;
  });

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterApply = () => {
    setCurrentPage(1);
    setShowFilter(false);
  };

  const handleResetFilters = () => {
    setFilters({
      title: '', author: '', publisher: '', deathYearFrom: '', deathYearTo: '',
      publishYearFrom: '', publishYearTo: '', topic: '', language: '',
      hasText: false, hasPDF: false
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* هدر */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#278760]/10">
            <HiOutlineBookOpen className="h-6 w-6 text-[#278760]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">مطالعه آنلاین</h2>
        </div>
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-[#278760]/30 hover:bg-[#278760]/5 transition-all text-gray-700 font-medium text-sm"
        >
          <HiOutlineAdjustmentsHorizontal className="h-5 w-5 text-[#278760]" />
          فیلتر هوشمند
        </button>
      </div>

      {/* سرچ و اطلاعات */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-gray-100 bg-gray-50">
        <div className="flex-1 relative">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در نام کتاب یا نویسنده..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#278760] focus:outline-none transition-all text-sm"
          />
        </div>
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {filteredBooks.length} کتاب
        </span>
      </div>

      {/* جدول */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-4 text-right text-sm font-semibold text-gray-900 w-12">ردیف</th>
              <th className="px-4 sm:px-6 py-4 text-right text-sm font-semibold text-gray-900">کتاب</th>
              <th className="px-4 sm:px-6 py-4 text-right text-sm font-semibold text-gray-900">نویسنده</th>
              <th className="px-4 sm:px-6 py-4 text-right text-sm font-semibold text-gray-900">ناشر</th>
              <th className="px-4 sm:px-6 py-4 text-right text-sm font-semibold text-gray-900 w-28"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedBooks.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-12">
                  {book.row}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-3">
                    
                    <div>
                      <div className="font-semibold text-gray-900 leading-tight">{book.title}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <HiOutlineCalendar className="h-3 w-3" />
                        {book.publishYear}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{book.author}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{book.publisher}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium w-28">
                  <button
                    onClick={() => setShowDetail(book)}
                    className="flex items-center gap-1 text-[#278760] hover:text-[#278740] transition-all font-medium hover:underline"
                  >
                    بررسی بیشتر
                    <HiChevronRight className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 p-6 border-t border-gray-100">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-gray-700"
          >
            <HiChevronRight className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                currentPage === page
                  ? 'bg-[#278760] text-white'
                  : 'border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-gray-700"
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* مودال جزئیات کتاب */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            {/* هدر مودال */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
              
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">{showDetail.title}</h2>
                  <p className="text-lg text-gray-600 mt-1">{showDetail.author}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetail(null)}
                className="p-2 rounded-2xl hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-900"
              >
                <HiXMark className="h-6 w-6" />
              </button>
            </div>

            {/* محتوای مودال */}
            <div className="space-y-6 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineCalendar className="h-5 w-5 text-[#278760]" />
                    اطلاعات کتاب
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">ناشر:</span>
                      <span className="font-medium">{showDetail.publisher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">سال وفات:</span>
                      <span>{showDetail.deathYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">سال انتشار:</span>
                      <span>{showDetail.publishYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">زبان:</span>
                      <span className="px-3 py-1 bg-[#278760]/10 text-[#278760] rounded-full text-xs font-medium">
                        {showDetail.language}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">موضوع:</span>
                      <span className="font-medium">{showDetail.topic}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineLanguage className="h-5 w-5 text-[#278760]" />
                    دسترسی‌ها
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {showDetail.hasText && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-sm font-medium text-green-800">
                        <HiDocumentText className="h-4 w-4" />
                        متن کامل
                      </div>
                    )}
                    {showDetail.hasPDF && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-sm font-medium text-blue-800">
                        <HiDocumentArrowDown className="h-4 w-4" />
                        دانلود PDF
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">درباره کتاب</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{showDetail.description}</p>
              </div>
            </div>

            {/* دکمه‌های پایین */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
              <button
                onClick={() => setShowDetail(null)}
                className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:shadow-sm transition-all"
              >
                بستن
              </button>
              <button className="flex-1 px-6 py-3 rounded-xl bg-[#278760] text-white font-semibold shadow-sm hover:bg-[#278740] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                شروع مطالعه
                <HiOutlineBookOpen className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال فیلتر هوشمند */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">فیلتر هوشمند</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="p-2 rounded-2xl hover:bg-gray-100 transition-all"
              >
                <HiXMark className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-5 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="نام کتاب"
                  value={filters.title}
                  onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#278760] focus:outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="نام نویسنده"
                  value={filters.author}
                  onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#278760] focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="نام ناشر"
                  value={filters.publisher}
                  onChange={(e) => setFilters({ ...filters, publisher: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#278760] focus:outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="موضوع"
                  value={filters.topic}
                  onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#278760] focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <select
                  value={filters.language}
                  onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#278760] focus:outline-none text-sm"
                >
                  <option value="">زبان</option>
                  <option value="فارسی">فارسی</option>
                  <option value="عربی">عربی</option>
                  <option value="انگلیسی">انگلیسی</option>
                </select>

                <input
                  type="number"
                  placeholder="سال وفات از"
                  value={filters.deathYearFrom}
                  onChange={(e) => setFilters({ ...filters, deathYearFrom: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#278760] focus:outline-none text-sm"
                />

                <input
                  type="number"
                  placeholder="سال وفات تا"
                  value={filters.deathYearTo}
                  onChange={(e) => setFilters({ ...filters, deathYearTo: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#278760] focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="سال انتشار از"
                  value={filters.publishYearFrom}
                  onChange={(e) => setFilters({ ...filters, publishYearFrom: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#278760] focus:outline-none text-sm"
                />
                <input
                  type="number"
                  placeholder="سال انتشار تا"
                  value={filters.publishYearTo}
                  onChange={(e) => setFilters({ ...filters, publishYearTo: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#278760] focus:outline-none text-sm"
                />
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasText}
                    onChange={(e) => setFilters({ ...filters, hasText: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-200 text-[#278760] focus:ring-[#278760]"
                  />
                  <span className="text-sm text-gray-700">حتماً دارای متن</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasPDF}
                    onChange={(e) => setFilters({ ...filters, hasPDF: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-200 text-[#278760] focus:ring-[#278760]"
                  />
                  <span className="text-sm text-gray-700">حتماً دارای PDF</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                حذف فیلترها
              </button>
              <button
                onClick={handleFilterApply}
                className="flex-1 px-6 py-3 rounded-xl bg-[#278760] text-white font-semibold hover:bg-[#278740] transition-all"
              >
                اعمال فیلتر
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
