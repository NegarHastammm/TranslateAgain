'use client';

import { useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type Props = {
  fileUrl: string;
  pageNumber: number;
  highlightText?: string;
  onClose: () => void;
};

export default function PdfViewerModal({
  fileUrl,
  pageNumber,
  highlightText,
  onClose,
}: Props) {

  // ✅ Highlight logic
  useEffect(() => {
    if (!highlightText) return;

    const timeout = setTimeout(() => {
      const textSpans = document.querySelectorAll(
        '.react-pdf__Page__textContent span'
      );

      textSpans.forEach((span) => {
        if (
          span.textContent &&
          span.textContent.includes(highlightText)
        ) {
          span.innerHTML = span.textContent.replace(
            highlightText,
            `<mark class="bg-yellow-300 rounded px-1">${highlightText}</mark>`
          );
        }
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [highlightText, pageNumber]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white p-4 shadow-xl">

        {/* Header */}
        <div className="mb-3 flex items-center justify-between border-b pb-2">
          <h3 className="text-sm font-semibold text-gray-800">
            مشاهده PDF – صفحه {pageNumber}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full px-2 py-1 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* PDF */}
        <div className="flex justify-center overflow-auto max-h-[75vh]">
          <Document file={fileUrl}>
            <Page
              pageNumber={pageNumber}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
