export type News = {
  title: string;
  subtitle: string;
  imgSrc: string;
  date: string;
  href: string; // without initial /
};

export const feed: News[] = [];
/* 
import imgConcursoHalloween from "../public/img/concurso-chuches-halloween.jfif";

import lake from "../public/img/lake.jpg";

import berkeley from "../public/img/berkeley.png";

export const feed: News[] = [
  {
    title: "Adivina cuántas chuches hay",
    subtitle: "Envía tu respuesta hasta el 3 de noviembre y llévatelas todas",
    imgSrc: imgConcursoHalloween,
    date: "26/10/2022",
    href: "adivina-cuantas-chuches-hay",
  },
  {
    title:
      "Al fondo del lago se ve el atardecer. En primera instancia se ve un árbol con hojas pequeñas",
    subtitle: "Envía tu respuesta hasta el 3 de noviembre y llévatelas todas",
    imgSrc: lake,
    date: "26/10/2022",
    href: "adivina-cuanas-chuches-hay",
  },
  {
    title: "Gente celebrando que han acabado la carrera. ¡Qué suerte!",
    subtitle: "Envía tu respuesta hasta el 3 de noviembre y llévatelas todas",
    imgSrc: berkeley,
    date: "26/10/2022",
    href: "adivina-cuantas-chches-hay",
  },
];
 */
