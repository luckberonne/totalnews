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
    orderBy: { fecha_hora: 'desc' },
    skip: offset,
    take: limit,
    select: {
      id: true,
      titulo: true,
      lead: true,
    },
  })

  const totalCount = await prisma.noticias.count({
    where: { titulo: { contains: search } },
  })
  const totalPages = Math.ceil(totalCount / limit)

  return { data, totalCount, totalPages }
}



export async function GetNoticia(idNew: number) {
  const data = await prisma.noticias.findUnique({
    where: { id: idNew }
  })
  return data;
}


export async function GetMiniNoticias() {
  const data = await prisma.miniNoticias.findMany({
    orderBy: { fecha_hora: 'desc' },
    take: 4,
  })
  return data;
}