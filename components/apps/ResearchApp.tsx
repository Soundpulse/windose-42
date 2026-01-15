import React, { useState, useEffect } from "react";
import { FileText, X } from "lucide-react";

interface PDFFile {
  id: string;
  name: string;
  path: string;
}

interface ResearchAppProps {
  onOpenLink?: (url: string) => void;
}

const ResearchApp: React.FC<ResearchAppProps> = ({ onOpenLink }) => {
  const [selectedPDF, setSelectedPDF] = useState<PDFFile | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pdfFiles: PDFFile[] = [
    { id: "1", name: "master_thesis.pdf", path: "/research/msc_thesis.pdf" },
    { id: "2", name: "bachelor_thesis.pdf", path: "/research/bsc_thesis.pdf" },
    { id: "3", name: "taktora_rl_spec.pdf", path: "/research/taktora_rl.pdf" },
  ];

  const handlePDFClick = (pdf: PDFFile) => {
    if (isMobile) {
      // Show popup warning on mobile before opening in new tab
      if (onOpenLink) {
        onOpenLink(pdf.path);
      } else {
        window.open(pdf.path, "_blank");
      }
    } else {
      // Show inline viewer on desktop
      setSelectedPDF(pdf);
    }
  };

  const closePDFViewer = () => {
    setSelectedPDF(null);
  };

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* PDF List Sidebar */}
      <div className="w-full md:w-48 lg:w-56 xl:w-64 border-b md:border-b-0 md:border-r border-gray-800 bg-black overflow-y-auto flex-shrink-0">
        <div className="p-3 md:p-4 border-b border-gray-800">
          <h2 className="text-sm font-light text-white tracking-wide mb-1">Research Files</h2>
          <p className="text-[9px] font-mono text-gray-600 tracking-wider">/research/</p>
        </div>

        <div className="p-2">
          {pdfFiles.map((pdf) => (
            <div
              key={pdf.id}
              onClick={() => handlePDFClick(pdf)}
              className={`flex items-center gap-3 p-3 mb-1 cursor-pointer transition-colors ${
                selectedPDF?.id === pdf.id
                  ? "bg-white text-black"
                  : "hover:bg-gray-900 text-gray-300 hover:text-white active:bg-gray-800"
              }`}>
              <FileText size={16} className="flex-shrink-0" />
              <span className="text-xs font-mono truncate">{pdf.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Viewer Area - Only shown on desktop */}
      {!isMobile && (
        <div className="flex-1 flex flex-col bg-black min-w-0 hidden md:flex">
          {selectedPDF ? (
            <>
              {/* PDF Viewer Header */}
              <div className="flex items-center justify-between p-2 md:p-3 border-b border-gray-800 bg-gray-900 flex-shrink-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <FileText size={14} className="text-white flex-shrink-0" />
                  <span className="text-xs md:text-sm font-mono text-white truncate">{selectedPDF.name}</span>
                </div>
                <button
                  onClick={closePDFViewer}
                  className="p-1.5 md:p-1 hover:bg-gray-800 active:bg-gray-700 text-gray-400 hover:text-white transition-colors flex-shrink-0">
                  <X size={18} className="md:w-4 md:h-4" />
                </button>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 overflow-auto bg-gray-900 p-1 md:p-2 lg:p-4 xl:p-6">
                <iframe
                  src={`${selectedPDF.path}#toolbar=1&navpanes=1&scrollbar=1&zoom=page-width`}
                  className="w-full h-full"
                  style={{
                    minHeight: "calc(100vh - 150px)",
                    minWidth: "100%",
                  }}
                  title={selectedPDF.name}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-600 p-4">
              <div className="text-center">
                <FileText size={48} className="mx-auto mb-4 text-gray-700" />
                <p className="text-sm font-mono">Select a PDF to view</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile message */}
      {isMobile && (
        <div className="flex-1 flex items-center justify-center text-gray-600 p-4">
          <div className="text-center">
            <FileText size={48} className="mx-auto mb-4 text-gray-700" />
            <p className="text-sm font-mono mb-2">Tap a PDF to open in new tab</p>
            <p className="text-xs font-mono text-gray-500">PDFs open in browser for better viewing</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchApp;
