'use client';
import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationSide({ totalPages }: { totalPages: any }) {
  const router = useRouter(); // Get router instance using the `useRouter` hook

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams!.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams!);
    params.set("page", pageNumber.toString());
    return params.toString();
  }
  
  return router ? (
    <Pagination
      total={totalPages}
      page={currentPage}
      onChange={(page) => {
        router.push(page === 1 ? `${pathname}/` : `${pathname}/?${createPageURL(page)}`);
      }}
    />
  ) : null;
}
