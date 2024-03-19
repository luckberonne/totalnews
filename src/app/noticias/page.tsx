import React, { Suspense } from "react";
import { GetMiniNoticias, GetNoticias } from "@/actions/getActions";
import New from "../components/new";
import PaginationSide from "../components/paginationSide";
import FastNew from "@/app/components/fastNews";

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
    const limit = Number(searchParams?.limit) || 6
    const offset = (currentPage - 1) * limit

    const { data, totalCount, totalPages } = await GetNoticias({ offset, limit, search })
    const miniNoticias = await GetMiniNoticias()

    return (
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4 mb-4">
            <div className="col-span-3 mt-4 gap-6 grid grid-cols-1">
                <Suspense key={search + currentPage}>
                    {data.map((item, index) => (
                        <New key={index} id={item.id} titulo={item.titulo} lead={item.lead} />
                    ))}
                </Suspense>
                <PaginationSide totalPages={totalPages} />
            </div>
            <div className="my-4 col-span-1 md:col-span-0 items-end hidden md:block">
                {miniNoticias.map((item, index) => (
                    <FastNew key={index} titulo={item.titulo}/>
                ))}
            </div>
        </div>

    );
}
