import React, { Suspense } from "react";
import { GetNoticias } from "@/actions/getActions";
import New from "../components/new";
import PaginationSide from "../components/paginationSide";
import NewsRightSide from "@/components/newsRightSide";

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

    const { data, totalCount, totalPages } = await GetNoticias({ offset, limit, search })

    return (
    <div className="gap-8 grid grid-cols-4 mb-4">
      <div className="col-span-3 mt-4 gap-2 grid grid-cols-1">
                <Suspense key={search + currentPage}>
                    {data.map((item, index) => (
                        <New key={index} item={item} />
                    ))}
                </Suspense>
                <PaginationSide totalPages={totalPages} />
      </div>
      <div className="col-span-1 items-end">
        <NewsRightSide />
      </div>
    </div>

    );
}
