"use client"

import { useParams } from "next/navigation"
import { ApiAlert } from "./api-alert"
import { useOrigin } from "@/hooks/use-origin"

interface ApiListProps {
  entityName: string
  entityIDName: string
}

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIDName,
}) => {
  const params = useParams()

  const baseUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/api/${params.storeId}`

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIDName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIDName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIDName}}`}
      />
    </>
  )
}
