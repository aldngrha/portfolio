import { Button } from "~/components/ui/button"
import { Filter, Grid3X3, List } from "lucide-react"
import { FilterControlsProps } from "~/interface"

export default function FilterControls({
  showFilters,
  setShowFilters,
  selectedCategory,
  selectedStatus,
  viewMode,
  setViewMode,
}: FilterControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowFilters(!showFilters)}
        className="border-soft-blue-200 dark:border-soft-blue-800 text-soft-blue-700 dark:text-soft-blue-400 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
        {(selectedCategory !== "all" || selectedStatus !== "all") && (
          <span className="ml-2 w-2 h-2 bg-soft-blue-500 rounded-full"></span>
        )}
      </Button>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-slate-500 dark:text-slate-400">View:</span>
        <div className="flex bg-white dark:bg-slate-900 rounded-lg border border-soft-blue-200 dark:border-soft-blue-800">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={
              viewMode === "grid"
                ? "bg-soft-blue-500 hover:bg-soft-blue-600 text-white"
                : "text-slate-600 dark:text-slate-300"
            }
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={
              viewMode === "list"
                ? "bg-soft-blue-500 hover:bg-soft-blue-600 text-white"
                : "text-slate-600 dark:text-slate-300"
            }
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
