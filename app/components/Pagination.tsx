import { Button } from "~/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
  showItemCount?: boolean
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className = "",
  showItemCount = false,
}: PaginationProps) {
  const [pages, setPages] = useState<(number | string)[]>([])
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Generate page numbers with ellipsis for large page counts
  useEffect(() => {
    const generatePages = () => {
      if (totalPages <= 7) {
        // If 7 or fewer pages, show all page numbers
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      } else {
        // Complex pagination with ellipsis
        const result: (number | string)[] = []

        // Always include first page
        result.push(1)

        // Calculate start and end of visible pages
        if (currentPage <= 3) {
          // Near the start
          result.push(2, 3, 4, 5, "ellipsis", totalPages)
        } else if (currentPage >= totalPages - 2) {
          // Near the end
          result.push(
            "ellipsis",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          )
        } else {
          // Middle - show current page and neighbors
          result.push(
            "ellipsis",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "ellipsis",
            totalPages
          )
        }

        return result
      }
    }

    setPages(generatePages())
  }, [currentPage, totalPages])

  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Item count display */}
      {showItemCount && totalItems > 0 && (
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Showing {startItem}-{endItem} of {totalItems} items
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-soft-blue-200 dark:border-soft-blue-800 text-slate-600 dark:text-slate-300 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {pages.map((page, i) => {
            if (page === "ellipsis") {
              return (
                <div key={`ellipsis-${i}`} className="flex items-center justify-center h-8 w-8">
                  <MoreHorizontal className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </div>
              )
            }

            const pageNum = page as number
            const isCurrentPage = pageNum === currentPage

            return (
              <Button
                key={pageNum}
                variant={isCurrentPage ? "default" : "outline"}
                size="icon"
                className={`h-8 w-8 ${
                  isCurrentPage
                    ? "bg-soft-blue-500 hover:bg-soft-blue-600 dark:bg-soft-blue-500 dark:hover:bg-soft-blue-400 text-white"
                    : "border-soft-blue-200 dark:border-soft-blue-800 text-slate-600 dark:text-slate-300 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30"
                }`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
                <span className="sr-only">Page {pageNum}</span>
              </Button>
            )
          })}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-soft-blue-200 dark:border-soft-blue-800 text-slate-600 dark:text-slate-300 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  )
}
