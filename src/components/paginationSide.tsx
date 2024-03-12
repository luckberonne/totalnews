'use client';
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NewsLeftSide({ totalPages, currentPage }: { totalPages: any, currentPage: any}) {
  const router = useRouter(); // Get router instance using the `useRouter` hook

  // Check if `router` is available (client-side), then render Pagination component
  return router ? (
    <Pagination
      total={totalPages}
      page={currentPage}
      onChange={(page) => router.push(page === 1 ? "/" : `/?page=${page}`)}
    />
  ) : null; // Return null if `router` is not available (server-side)
}
