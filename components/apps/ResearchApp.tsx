import React, { useState } from "react";
import { FileText, X } from "lucide-react";

interface PDFFile {
  id: string;
  name: string;
  path: string;
}

const ResearchApp: React.FC = () => {
  const [selectedPDF, setSelectedPDF] = useState<PDFFile | null>(null);

  const pdfFiles: PDFFile[] = [
    { id: "1", name: "master_thesis.pdf", path: "/research/msc_thesis.pdf" },
    { id: "2", name: "bachelor_thesis.pdf", path: "/research/bsc_thesis.pdf" },
    { id: "3", name: "taktora_rl_spec.pdf", path: "/research/taktora_rl.pdf" },
  ];

  const handlePDFClick = (pdf: PDFFile) => {
    setSelectedPDF(pdf);
  };

  const closePDFViewer = () => {
    setSelectedPDF(null);
  };

  return (
    <div className="h-full flex">
      {/* PDF List Sidebar */}
      <div className="w-48 md:w-56 lg:w-64 border-r border-gray-800 bg-black overflow-y-auto flex-shrink-0">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-sm font-light text-white tracking-wide mb-1">Research Files</h2>
          <p className="text-[9px] font-mono text-gray-600 tracking-wider">/research/</p>
        </div>

        <div className="p-2">
          {pdfFiles.map((pdf) => (
            <div
              key={pdf.id}
              onClick={() => handlePDFClick(pdf)}
              className={`flex items-center gap-3 p-3 mb-1 cursor-pointer transition-colors ${
                selectedPDF?.id === pdf.id ? "bg-white text-black" : "hover:bg-gray-900 text-gray-300 hover:text-white"
              }`}>
              <FileText size={16} className="flex-shrink-0" />
              <span className="text-xs font-mono truncate">{pdf.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Viewer Area */}
      <div className="flex-1 flex flex-col bg-black min-w-0">
        {selectedPDF ? (
          <>
            {/* PDF Viewer Header */}
            <div className="flex items-center justify-between p-2 md:p-3 border-b border-gray-800 bg-gray-900 flex-shrink-0">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-white" />
                <span className="text-xs md:text-sm font-mono text-white truncate">{selectedPDF.name}</span>
              </div>
              <button
                onClick={closePDFViewer}
                className="p-1 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors flex-shrink-0">
                <X size={16} />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto bg-gray-900 p-2 md:p-4 lg:p-6">
              <embed
                src={selectedPDF.path}
                type="application/pdf"
                className="w-full h-full md:min-h-[900px] lg:min-h-[1000px]"
                style={{ minHeight: "calc(100vh - 200px)" }}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <FileText size={48} className="mx-auto mb-4 text-gray-700" />
              <p className="text-sm font-mono">Select a PDF to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchApp;
