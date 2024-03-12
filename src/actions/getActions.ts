"use server"

import { prisma } from "@/lib/prisma"


export async function GetNoticias({
  search,
  offset = 0,
  limit = 3,
}: {
  search?: string | undefined
  offset?: number
  limit?: number
}) {
  const data = await prisma.noticias.findMany({
    where: { titulo: { contains: search } },
    skip: offset,
    take: limit,
  })

  const totalCount = await prisma.noticias.count({
    where: { titulo: { contains: search } },
  })
  const totalPages = Math.ceil(totalCount / limit)

  return { data, totalCount, totalPages }
}