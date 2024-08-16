import prismadb from "@/lib/prismadb"
import { ColorsClient } from "./components/client"
import { ColorColumn } from "./components/columns"
import { format } from "date-fns"

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedColors: ColorColumn[] = colors.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "yyyy-MM-dd HH:mm"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  )
}

export default ColorsPage
