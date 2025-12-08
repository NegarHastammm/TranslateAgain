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
  Info,
  CircleCheck,
  CircleOff,
} from "lucide-react";

// ================== 1. TYPES & MOCK DATA (20+ items for pagination testing) ==================
interface Profile {
  id: number;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
}

const mockProfiles: Profile[] = [
  { id: 101, name: "پروفایل منابع داخلی", description: "کتاب‌ها و مقالات داخلی سازمان برای استفاده‌ی کارکنان.", active: true, createdAt: "1403/01/05" },
  { id: 102, name: "پروفایل منابع خارجی", description: "مجلات علمی بین‌المللی و پایان‌نامه‌های دانشگاهی.", active: true, createdAt: "1403/01/10" },
  { id: 103, name: "پروفایل منابع آموزشی", description: "ویدئوها و پادکست‌های آموزشی سازمانی.", active: false, createdAt: "1403/01/15" },
  { id: 104, name: "پروفایل کتاب‌های مدیریتی", description: "کتاب‌های مرتبط با مدیریت، رهبری و توسعه فردی.", active: true, createdAt: "1403/01/20" },
  { id: 105, name: "پروفایل کتاب‌های فنی", description: "کتاب‌های تخصصی حوزه IT، برنامه‌نویسی و شبکه.", active: true, createdAt: "1403/01/25" },
  { id: 106, name: "پروفایل مقالات کنفرانسی", description: "مقالات ارائه‌شده در کنفرانس‌های داخلی و خارجی.", active: true, createdAt: "1403/02/01" },
  { id: 107, name: "پروفایل گزارش‌های داخلی", description: "گزارش‌های تحقیقاتی و تحلیلی واحدهای مختلف سازمان.", active: false, createdAt: "1403/02/05" },
  { id: 108, name: "پروفایل پایان‌نامه‌ها", description: "پایان‌نامه‌های منتخب مرتبط با حوزه فعالیت سازمان.", active: true, createdAt: "1403/02/10" },
  { id: 109, name: "پروفایل منابع مالی", description: "کتاب‌ها و گزارش‌های مرتبط با مالی و حسابداری.", active: true, createdAt: "1403/02/15" },
  { id: 110, name: "پروفایل منابع حقوقی", description: "قوانین، مقررات و اسناد حقوقی مورد نیاز.", active: true, createdAt: "1403/02/20" },
  { id: 111, name: "پروفایل منابع بازاریابی", description: "کتاب‌ها و مقالات بازاریابی، برندینگ و فروش.", active: true, createdAt: "1403/02/25" },
  { id: 112, name: "پروفایل منابع انسانی", description: "منابع مرتبط با جذب، آموزش و ارزیابی کارکنان.", active: false, createdAt: "1403/03/01" },
  { id: 113, name: "پروفایل منابع استراتژی", description: "کتاب‌ها و مقالات حوزه برنامه‌ریزی و استراتژی.", active: true, createdAt: "1403/03/05" },
  { id: 114, name: "پروفایل مجلات ماهانه", description: "اشتراک مجلات تخصصی که ماهانه دریافت می‌شود.", active: true, createdAt: "1403/03/10" },
  { id: 115, name: "پروفایل روزنامه‌ها", description: "آرشیو روزنامه‌های مهم کشور.", active: false, createdAt: "1403/03/15" },
  { id: 116, name: "پروفایل کتاب‌های عمومی", description: "کتاب‌های عمومی برای مطالعه آزاد کارکنان.", active: true, createdAt: "1403/03/20" },
  { id: 117, name: "پروفایل منابع دیجیتال", description: "کتاب‌های الکترونیکی، PDF و منابع آنلاین.", active: true, createdAt: "1403/03/25" },
  { id: 118, name: "پروفایل منابع تاریخی", description: "کتاب‌ها و اسناد مرتبط با تاریخچه سازمان و صنعت.", active: true, createdAt: "1403/04/01" },
  { id: 119, name: "پروفایل منابع پژوهشی", description: "پروژه‌ها و طرح‌های پژوهشی انجام‌شده.", active: true, createdAt: "1403/04/05" },
  { id: 120, name: "پروفایل منابع چندرسانه‌ای", description: "فایل‌های صوتی و تصویری شامل وبینارها، سمینارها و دوره‌های ضبط‌شده.", active: true, createdAt: "1403/04/10" },
];

// ================== 2. MOCK API SERVICE ==================
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

class MockApiService {
  private data: Profile[] = [...mockProfiles];
  private nextId = 121;

  async getAllResourceProfiles(): Promise<Profile[]> {
    await delay(500);
    return [...this.data];
  }

  async createResourceProfile(profileData: Omit<Profile, "id" | "createdAt">): Promise<Profile> {
    await delay(500);
    const newProfile: Profile = {
      id: this.nextId++,
      ...profileData,
      createdAt: new Date().toLocaleDateString("fa-IR"),
    };
    this.data.push(newProfile);
    return newProfile;
  }

  async updateResourceProfile(updatedProfile: Profile): Promise<Profile> {
    await delay(500);
    const index = this.data.findIndex((p) => p.id === updatedProfile.id);
    if (index !== -1) {
      this.data[index] = updatedProfile;
      return updatedProfile;
    }
    throw new Error("Profile not found");
  }

  async deleteResourceProfile(id: number): Promise<void> {
    await delay(500);
    this.data = this.data.filter((p) => p.id !== id);
  }
}

const apiService = new MockApiService();

// ================== 3. SMALL REUSABLE COMPONENTS ==================
interface TooltipButtonProps {
  icon: "edit" | "delete";
  label: string;
  onClick: () => void;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({ icon, label, onClick }) => {
  const IconComponent = icon === "edit" ? FilePen : Trash2;
  const baseClasses = "p-2 rounded-full transition-all duration-200 active:scale-90 border inline-flex items-center justify-center";
  const editClasses = "border-indigo-300 text-indigo-500 hover:bg-indigo-50 hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-100";
  const deleteClasses = "border-red-300 text-red-500 hover:bg-red-50 hover:border-red-500 hover:shadow-md hover:shadow-red-100";
  const finalClasses = icon === "edit" ? `${baseClasses} ${editClasses}` : `${baseClasses} ${deleteClasses}`;

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

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onCancel}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
      <div className="p-6 text-center">
        <AlertTriangle size={40} className="text-red-500 mx-auto mb-4 drop-shadow-sm" />
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{message}</p>
        <div className="flex justify-center gap-3">
          <button onClick={onCancel} className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-all active:scale-95">
            انصراف
          </button>
          <button onClick={onConfirm} className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-xl shadow-md hover:bg-red-700 transition-all active:scale-95">
            تأیید حذف
          </button>
        </div>
      </div>
    </div>
  </div>
);

interface FormModalProps {
  title: string;
  initialData: Omit<Profile, "id" | "createdAt"> | Profile;
  onClose: () => void;
  onSave: (data: Omit<Profile, "id" | "createdAt"> | Profile) => Promise<void>;
}

const FormModal: React.FC<FormModalProps> = ({ title, initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Profile, "id" | "createdAt"> | Profile>(initialData);
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-emerald-50 px-6 py-4 border-b border-indigo-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-emerald-800 flex items-center gap-2">
            <Library className="text-emerald-800" size={20} />
            {title}
          </h3>
          <button onClick={onClose} className="text-emerald-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-full p-2 transition-colors active:scale-95">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">نام پروفایل</label>
            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
            <textarea id="description" name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input id="active" name="active" type="checkbox" checked={formData.active} onChange={handleChange} className="h-5 w-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500" />
            <label htmlFor="active" className="text-sm font-medium text-gray-700 select-none flex items-center gap-1">
              <CircleCheck size={16} className="text-emerald-500 inline-block" />
              فعال بودن پروفایل
            </label>
          </div>
          <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-all active:scale-95" disabled={saving}>
              انصراف
            </button>
            <button type="submit" onClick={() => handleSubmit()} className="px-6 py-2.5 text-sm font-medium text-white bg-emerald-700 rounded-xl shadow-md shadow-indigo-200 hover:bg-emerald-900 transition-all active:scale-95 flex items-center gap-2" disabled={saving}>
              {saving ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
              {saving ? "در حال ذخیره..." : "ذخیره پروفایل"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TableSkeleton: React.FC = () => (
  <div className="divide-y divide-gray-100 animate-pulse">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-4 gap-2 sm:gap-0">
        <div className="h-4 bg-gray-200 rounded w-full sm:w-1/5" />
        <div className="h-4 bg-gray-200 rounded w-full sm:w-2/5" />
        <div className="h-4 bg-gray-200 rounded w-16 sm:w-1/6" />
        <div className="h-4 bg-gray-200 rounded w-12 sm:w-1/12" />
      </div>
    ))}
  </div>
);

// ================== 4. MAIN COMPONENT (Fully Responsive) ==================
export default function ResourceProfile() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const pageSize = 5;

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllResourceProfiles();
      setProfiles(response);
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const filteredProfiles = profiles.filter((profile) => {
    const q = searchTerm.toLowerCase();
    return profile.name.toLowerCase().includes(q) || profile.description.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / pageSize));
  const paginatedProfiles = filteredProfiles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreate = useCallback(async (data: Omit<Profile, "id" | "createdAt"> | Profile) => {
    await apiService.createResourceProfile(data as Omit<Profile, "id" | "createdAt">);
    fetchProfiles();
    setCurrentPage(1);
  }, [fetchProfiles]);

  const handleEdit = useCallback(async (data: Omit<Profile, "id" | "createdAt"> | Profile) => {
    await apiService.updateResourceProfile(data as Profile);
    fetchProfiles();
  }, [fetchProfiles]);

  const handleDeleteConfirmed = useCallback(async () => {
    if (confirmDeleteId !== null) {
      await apiService.deleteResourceProfile(confirmDeleteId);
      setConfirmDeleteId(null);
      fetchProfiles();
      setCurrentPage(1);
    }
  }, [confirmDeleteId, fetchProfiles]);

  const handleCloseModal = (refresh = true) => {
    setShowCreateModal(false);
    setEditingProfile(null);
    setExpandedId(null);
    if (refresh) fetchProfiles();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8" dir="rtl">
     
      {/* Modals */}
      {confirmDeleteId !== null && (
        <ConfirmationModal
          title="تأیید حذف پروفایل"
          message="آیا مطمئن هستید که می‌خواهید این پروفایل را حذف کنید؟ این عمل غیرقابل بازگشت است."
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
      {showCreateModal && (
        <FormModal title="ایجاد پروفایل منابع جدید" initialData={{ name: "", description: "", active: true }} onClose={() => handleCloseModal()} onSave={handleCreate} />
      )}
      {editingProfile && (
        <FormModal title={`ویرایش پروفایل: ${editingProfile.name}`} initialData={editingProfile} onClose={() => handleCloseModal()} onSave={handleEdit} />
      )}

      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header - Fully Responsive */}
        <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-2xl text-[#278760] shadow-lg">
                <Library size={26} />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#151515] leading-tight">مدیریت منابع</h1>
               
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000000] pointer-events-none" size={18} />
                <input
                  type="text"
                  placeholder="جستجو..."
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
               افزودن منبع جدید
              </button>
            </div>
          </div>
        </div>

        {/* Table Container - Fully Responsive */}
        <div className="bg-white/70 backdrop-blur rounded-3xl shadow-2xl border border-slate-100/50 overflow-hidden">
          {loading ? (
            <div className="p-6 sm:p-8">
              <TableSkeleton />
              <p className="text-center text-gray-500 mt-8 flex items-center justify-center gap-2 text-sm sm:text-base">
                <Loader2 size={20} className="animate-spin" />
                در حال بارگذاری پروفایل‌ها...
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 sm:px-6 font-bold text-gray-700 text-xs sm:text-sm tracking-wide">نام پروفایل</th>
                      <th className="hidden md:table-cell py-4 px-6 w-96 font-bold text-gray-700 text-xs sm:text-sm tracking-wide">توضیحات</th>
                      <th className="hidden lg:table-cell py-4 px-6 font-bold text-gray-700 text-xs sm:text-sm tracking-wide">تاریخ ایجاد</th>
                      <th className="hidden xl:table-cell py-4 px-6 text-center font-bold text-gray-700 text-xs sm:text-sm tracking-wide">وضعیت</th>
                      <th className="py-4 px-4 sm:px-6 text-center font-bold text-gray-700 text-xs sm:text-sm tracking-wide">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedProfiles.length > 0 ? (
                      paginatedProfiles.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/50 transition-all group">
                          {/* Mobile: Name + Short Description Card Style */}
                          <td className="py-4 px-4 sm:px-6 border-b md:border-b-0 md:border-r">
                            <div className="md:hidden space-y-2">
                              <div className="font-semibold text-gray-800 text-sm">{p.name}</div>
                              <div
                                className="text-gray-600 text-xs cursor-pointer leading-relaxed"
                                onClick={() => setExpandedId((prev) => prev === p.id ? null : p.id)}
                              >
                                {expandedId === p.id ? (
                                  <span>{p.description}</span>
                                ) : (
                                  <span className="truncate block max-h-12 overflow-hidden">
                                    {p.description?.slice(0, 80) || "---"}
                                    {p.description && p.description.length > 80 && "..."}
                                  </span>
                                )}
                                {p.description && p.description.length > 80 && (
                                  <span className="text-emerald-900 text-xs block mt-1">
                                    {expandedId === p.id ? "کمتر نمایش بده" : "نمایش کامل"}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="hidden md:block font-semibold text-gray-800">{p.name}</div>
                          </td>

                          {/* Desktop Description */}
                          <td className="hidden md:table-cell py-4 px-6 max-w-md">
                            <div
                              className="text-gray-600 cursor-pointer leading-relaxed max-w-md"
                              onClick={() => setExpandedId((prev) => prev === p.id ? null : p.id)}
                            >
                              {expandedId === p.id ? (
                                <span>{p.description}</span>
                              ) : (
                                <span className="block truncate">{p.description || "---"}</span>
                              )}
                              {p.description && p.description.length > 60 && (
                                <span className="block mt-1 text-emerald-900 text-xs">
                                  {expandedId === p.id ? "کمتر" : "نمایش کامل"}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Date */}
                          <td className="hidden lg:table-cell py-4 px-6 text-gray-500 text-xs font-mono" dir="ltr">
                            {p.createdAt}
                          </td>

                          {/* Status */}
                          <td className="hidden xl:table-cell py-4 px-6 text-center">
                            <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                              p.active
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}>
                              {p.active ? <CircleCheck size={14} /> : <CircleOff size={14} />}
                              {p.active ? "فعال" : "غیرفعال"}
                            </span>
                          </td>

                          {/* Actions - Always visible */}
                          <td className="py-4 px-4 sm:px-6 text-center border-t md:border-t-0">
                            <div className="flex justify-center items-center gap-2">
                              <TooltipButton icon="edit" label="ویرایش" onClick={() => setEditingProfile(p)} />
                              <TooltipButton icon="delete" label="حذف" onClick={() => setConfirmDeleteId(p.id)} />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-gray-400">
                          <div className="flex flex-col items-center gap-4">
                            <Library size={48} className="text-gray-300" />
                            {searchTerm ? (
                              <>
                                <div className="text-lg font-medium text-gray-500">نتیجه‌ای یافت نشد</div>
                                <span className="text-sm text-gray-400 text-center max-w-md">
                                  عبارت جستجو را تغییر دهید یا ساده‌تر امتحان کنید.
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="text-lg font-medium text-gray-500">هیچ پروفایلی وجود ندارد</div>
                                <button
                                  onClick={() => setShowCreateModal(true)}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 transition-all shadow-md"
                                >
                                  <Plus size={16} />
                                  ایجاد اولین پروفایل
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination - Fully Responsive */}
              {totalPages > 1 && (
                <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-0">
                    <span className="text-sm text-gray-600 order-2 xs:order-1">
                      نمایش <strong>{((currentPage - 1) * pageSize) + 1}</strong>–<strong>{Math.min(currentPage * pageSize, filteredProfiles.length)}</strong> 
                      از <strong>{filteredProfiles.length}</strong> پروفایل
                    </span>
                    <div className="flex items-center gap-2 order-1 xs:order-2 justify-center xs:justify-end">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
