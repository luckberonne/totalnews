'use client';
import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NewsLeftSide({ totalPages }: { totalPages: any }) {
  const router = useRouter(); // Get router instance using the `useRouter` hook

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
  }
  
  // Check if `router` is available (client-side), then render Pagination component
  return router ? (
    <Pagination
      total={totalPages}
      page={currentPage}
      onChange={(page) => {router.push(page === 1 ? "/" : `/?page=${page}`); createPageURL(page)}}
    />
  ) : null; // Return null if `router` is not available (server-side)
}
