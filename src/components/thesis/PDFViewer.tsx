import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Share,
  Bookmark,
  BookmarkCheck,
  X,
  RotateCw,
} from "lucide-react";

interface PDFViewerProps {
  pdfUrl?: string;
  title?: string;
  author?: string;
  publicationDate?: string;
  canDownload?: boolean;
  onClose?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
}

const PDFViewer = ({
  pdfUrl = "https://arxiv.org/pdf/2104.13478.pdf",
  title = "Advanced Deep Learning Techniques for Natural Language Processing",
  author = "Jane Doe",
  publicationDate = "May 2023",
  canDownload = true,
  onClose = () => {},
  onBookmark = () => {},
  onShare = () => {},
}: PDFViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(42);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [rotation, setRotation] = useState(0);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 25);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 25);
    }
  };

  const handleRotate = () => {
    setRotation((rotation + 90) % 360);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark();
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 bg-pink-100 border-b border-pink-200">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-pink-700 hover:bg-pink-200"
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="ml-2">
            <h2 className="text-lg font-semibold text-pink-800 truncate max-w-md">
              {title}
            </h2>
            <p className="text-sm text-pink-600">
              {author} • {publicationDate}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className="text-pink-700 hover:bg-pink-200"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-5 w-5" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isBookmarked ? "Remove bookmark" : "Add bookmark"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onShare}
                  className="text-pink-700 hover:bg-pink-200"
                >
                  <Share className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share thesis</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {canDownload && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download PDF</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div
          ref={pdfContainerRef}
          className="mx-auto bg-white shadow-md rounded-md overflow-hidden"
          style={{
            width: `${zoomLevel}%`,
            maxWidth: "1000px",
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <iframe
            src={`${pdfUrl}#page=${currentPage}`}
            className="w-full h-[calc(100vh-12rem)]"
            title={title}
          />
        </div>
      </div>

      {/* Footer with page controls */}
      <div className="flex items-center justify-between p-3 bg-pink-50 border-t border-pink-200">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomOut}
                  className="text-pink-700 hover:bg-pink-200"
                >
                  <ZoomOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm text-pink-700">{zoomLevel}%</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomIn}
                  className="text-pink-700 hover:bg-pink-200"
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom in</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRotate}
                  className="text-pink-700 hover:bg-pink-200"
                >
                  <RotateCw className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rotate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePreviousPage}
                  disabled={currentPage <= 1}
                  className="text-pink-700 hover:bg-pink-200 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Previous page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm text-pink-700">
            Page {currentPage} of {totalPages}
          </span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="text-pink-700 hover:bg-pink-200 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Next page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
