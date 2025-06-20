import { Card, CardContent } from "~/components/ui/card"
import { categories, statuses } from "~/constants"
import { Button } from "~/components/ui/button"
import { FilterDropdownProps } from "~/interface"

export default function FilterDropdown({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}: FilterDropdownProps) {
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Filter */}
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={
                    selectedCategory === category.value
                      ? "bg-soft-blue-500 hover:bg-soft-blue-600 text-white"
                      : "border-soft-blue-200 dark:border-soft-blue-800 text-slate-600 dark:text-slate-300 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30"
                  }
                >
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Button
                  key={status.value}
                  variant={selectedStatus === status.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status.value)}
                  className={
                    selectedStatus === status.value
                      ? "bg-soft-blue-500 hover:bg-soft-blue-600 text-white"
                      : "border-soft-blue-200 dark:border-soft-blue-800 text-slate-600 dark:text-slate-300 hover:bg-soft-blue-50 dark:hover:bg-soft-blue-900/30"
                  }
                >
                  {status.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
