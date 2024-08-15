import prismadb from "@/lib/prismadb"
import { CategoryClient } from "./components/client"
import { CategoryColumn } from "./components/columns"
import { format } from "date-fns"

const DashboardCategoriesPage = async ({
  params,
}: {
  params: { storeId: string }
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "yyyy-MM-dd HH:mm"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  )
}

export default DashboardCategoriesPage
