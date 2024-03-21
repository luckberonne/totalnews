"use server"

import { prisma } from "@/lib/prisma"


export async function PostNoticias({
  titulo,
  subtitulo,
  lead,
  cuerpo,
  extra,
}: {
  titulo: string
  subtitulo: string
  lead: string
  cuerpo: string
  extra: string
}) {
  const data = await prisma.noticias.create({
    data: {
      titulo,
      subtitulo,
      lead,
      cuerpo,
      extra,
    },
    select: {
      id: true,
      titulo: true,
      lead: true,
    },
  })

  return data
}