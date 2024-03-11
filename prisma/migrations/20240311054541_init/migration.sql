-- CreateTable
CREATE TABLE "Noticias" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "lead" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "extra" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Noticias_pkey" PRIMARY KEY ("id")
);
