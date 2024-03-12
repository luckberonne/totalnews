import React, { Suspense } from "react";
import New from "./new";
import { GetNoticias } from "@/actions/getActions";
import PaginationSide from "./paginationSide";

export default async function NewsLeftSide({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    limit?: string
  }
}) {
  const search = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || 3
  const offset = (currentPage - 1) * limit

  const { data, totalPages } = await GetNoticias({offset, limit, search})

  return (
    <div className="mt-4 gap-2 grid grid-cols-1">
      <Suspense key={search + currentPage}>
        {data.map((item, index) => (
          <New key={index} item={item} />
        ))}
      </Suspense>

      <PaginationSide totalPages={totalPages} currentPage={currentPage}/>

    </div>

  );
}
