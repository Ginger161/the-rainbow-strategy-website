"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, FileText } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Suppress unneeded text/annotation layers for a clean reader look, or import their CSS
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface DocumentReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  documentUrl: string; // The URL to the PDF
}

export default function DocumentReaderModal({ isOpen, onClose, documentTitle, documentUrl }: DocumentReaderModalProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = useCallback((offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPage = prevPageNumber + offset;
      if (numPages && (newPage < 1 || newPage > numPages)) return prevPageNumber;
      return newPage;
    });
  }, [numPages]);

  const previousPage = useCallback(() => {
    changePage(-1);
  }, [changePage]);

  const nextPage = useCallback(() => {
    changePage(1);
  }, [changePage]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-0 md:p-8">
        
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-6xl h-full max-h-[100vh] md:max-h-[90vh] bg-slate-50 md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative"
        >
          {/* Top Header */}
          <div className="flex justify-between items-center px-4 md:px-8 py-4 bg-white border-b border-slate-200 z-10 shrink-0 pointer-events-auto">
            <div className="flex items-center gap-4 truncate pr-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 hidden md:flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase">Document Reader</span>
                <span className="text-sm md:text-lg font-bold text-slate-900 truncate">{documentTitle}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors shrink-0 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* PDF Canvas area */}
          <div className="flex-grow overflow-y-auto flex justify-center p-0 md:p-6 min-h-0 bg-slate-100/50 relative touch-pan-y">
            
            {/* The Document */}
            {documentUrl ? (
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(event, info) => {
                  if (info.offset.x > 100) previousPage();
                  if (info.offset.x < -100) nextPage();
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden bg-white flex h-fit mb-24 md:rounded-lg cursor-grab active:cursor-grabbing"
              >
                <Document
                  file={documentUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<div className="animate-pulse text-slate-400 font-medium p-12">Loading document...</div>}
                  error={<div className="text-red-500 font-medium p-12 text-center max-w-md">Could not load the PDF. Please check the document URL or your connection.</div>}
                >
                  <Page 
                    pageNumber={pageNumber} 
                    width={windowWidth > 768 ? 800 : windowWidth}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="max-w-full pointer-events-none" 
                  />
                </Document>
              </motion.div>
            ) : (
              <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden bg-white w-full max-w-3xl aspect-[1/1.4] flex flex-col items-center justify-center p-12 text-center border border-slate-200 mb-24">
                 <FileText className="w-16 h-16 text-slate-200 mb-6" />
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">No Document Source Available</h3>
                 <p className="text-slate-500">The PDF URL for this document has not been configured yet.</p>
              </div>
            )}

            {/* Bottom Toolbar Container */}
            <div className="absolute bottom-6 left-0 right-0 z-20 pointer-events-none px-4">
              <div className="flex items-center justify-between w-full max-w-[280px] px-4 py-2 bg-slate-900 text-white rounded-full mx-auto shadow-lg border border-slate-700/50 pointer-events-auto">
                <button 
                  onClick={previousPage}
                  disabled={pageNumber <= 1}
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors shrink-0"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-5 h-5 shrink-0" />
                </button>
                
                <span className="text-[10px] md:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis px-2 text-center flex-grow">
                  Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </span>
                
                <button 
                  onClick={nextPage}
                  disabled={!numPages || pageNumber >= numPages}
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors shrink-0"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-5 h-5 shrink-0" />
                </button>
                
                <div className="w-px h-6 bg-slate-700 mx-1 shrink-0"></div>
                
                <a 
                  href={documentUrl} 
                  download 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-slate-800 hover:text-blue-400 transition-colors shrink-0"
                  aria-label="Download File"
                >
                  <Download className="w-5 h-5 shrink-0" />
                </a>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
