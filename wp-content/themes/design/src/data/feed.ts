export type News = {
  title: string;
  subtitle: string;
  imgSrc: string;
  date: string;
};

import imgConcursoHalloween from "../public/img/concurso-chuches-halloween.jfif";

import imgCharlaQuantumFracture from "../public/img/charla-quantum-fracture.jfif";

import imgCEETZaragoza from "../public/img/ceet-zaragoza.jfif";

export const feed: News[] = [
  {
    title: "Adivina cuántas chuches hay",
    subtitle: "Envía tu respuesta hasta el 3 de noviembre y llévatelas todas",
    imgSrc: imgConcursoHalloween,
    date: "26/10/2022",
  },
  {
    title: "Charla de Quantum Fracture",
    subtitle: "Te traemos las fotos de la charla de Quantum Fracture",
    imgSrc: imgCharlaQuantumFracture,
    date: "25/10/2022",
  },
  {
    title: "XXXIII Congreso CEET",
    subtitle:
      "Nuestros compañeros Diego Orts y Oxana asistieron al CEET en Zaragoza",
    imgSrc: imgCEETZaragoza,
    date: "13/10/2022",
  },
];
