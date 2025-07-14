import { TechCategoryCardProps } from "~/interface"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { getBadgeColor } from "~/lib/utils"

export default function TechCategoryCard({
 title,
 icon: Icon,
 items,
 color,
}: TechCategoryCardProps) {
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 dark:border dark:border-slate-800">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <Icon className={`w-5 h-5 mr-3 ${color}`} />
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className={`border-0 px-3 py-1.5 text-sm font-normal rounded-full ${getBadgeColor(color)}`}
            >
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
