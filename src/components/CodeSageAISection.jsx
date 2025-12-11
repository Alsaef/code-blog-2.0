'use client'
import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useReactToPrint } from "react-to-print";
import { FiFileText } from "react-icons/fi";
import { useDropzone } from 'react-dropzone';

// --- Inline SVG Icons ---
const UploadCloudIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={props.className || "h-12 w-12"}>
    <path d="M4 14.899A7 7 0 0 1 15.77 1.34L16 1.34a6 6 0 0 1 5.92 7.51M21 16H3M16 16L12 12M12 12L8 16"/>
    <path d="M12 12L12 21"/>
    <path d="M21 15v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5"/>
  </svg>
);

const FileTextIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={props.className || "h-5 w-5"}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const RefreshCwIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={props.className || "h-5 w-5"}>
    <path d="M23 4v6h-6"/>
    <path d="M20.49 15.3l-1.63 1.62A7.01 7.01 0 0 1 12 19a7 7 0 0 1-7-7c0-1.85.73-3.6 2.02-4.87l1.63-1.62A9 9 0 0 0 12 3a9 9 0 0 0 9 9"/>
    <path d="M1 20v-6h6"/>
  </svg>
);

const AlertTriangleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={props.className || "h-6 w-6"}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12" y2="17"/>
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={props.className || "h-5 w-5"}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const API_URL = `${process.env.NEXT_PUBLIC_URI_API}/summarize-pdf`;

const CodeSageAISection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ content: () => contentRef.current });

  const onDrop = useCallback((acceptedFiles) => {
    setError(null);
    setSelectedFile(acceptedFiles[0]);
    setSummary('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    disabled: loading
  });

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a PDF file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    setLoading(true);
    setError(null);
    setSummary('');
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success && response.data.summary) {
        setSummary(response.data.summary);
      } else {
        setError('Summarization failed. Please try a different file.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="card shadow-2xl bg-base-200 p-6 rounded-xl">
        <form onSubmit={handleUpload} className="space-y-6">

          {/* Drag and Drop File Upload */}
          <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors duration-200
            ${isDragActive ? "border-indigo-500 bg-indigo-50" : selectedFile ? "border-success bg-base-300" : "border-gray-300 bg-white hover:border-indigo-400"}
          `}>
            <input {...getInputProps()} />
            {selectedFile ? (
              <div className="flex items-center justify-center space-x-2 font-semibold text-success">
                <FileTextIcon className="h-5 w-5" />
                <span>{selectedFile.name}</span>
                <CheckCircleIcon className="h-5 w-5 text-success" />
              </div>
            ) : isDragActive ? (
              <p className="font-semibold text-indigo-600">Drop the PDF here ...</p>
            ) : (
              <div className="flex items-center justify-center space-x-2 font-semibold text-gray-700">
                <UploadCloudIcon className="h-5 w-5" />
                <span>Drag & drop PDF here, or click to select (Max 50MB)</span>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div role="alert" className="alert alert-error flex items-center gap-2">
              <AlertTriangleIcon />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
            disabled={loading || !selectedFile}
          >
            {loading ? (
              <>
                <RefreshCwIcon className="h-5 w-5 animate-spin" />
                Analyzing document...
              </>
            ) : (
              <>
                <FileTextIcon className="h-5 w-5" />
                Get Summary And Answer
              </>
            )}
          </button>
        </form>
      </div>

      {/* Summary Display */}
      {summary && (
        <div>
          <h2 className="text-2xl font-bold mb-3 text-secondary">Generated Summary And Answer</h2>
          <button onClick={reactToPrintFn} className="btn btn-primary my-4 flex items-center gap-2">
            <FiFileText size={20} />
            Convert PDF
          </button>
          <div ref={contentRef} className="p-6 bg-base-200 rounded-xl shadow-xl prose prose-invert max-w-none">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeSageAISection;
