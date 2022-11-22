export type News = {
  title: string;
  subtitle: string;
  imgSrc: string;
  date: string;
  href: string; // without initial /
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
    href: "adivina-cuantas-chuches-hay",
  },
  {
    title: "Charla de Quantum Fracture",
    subtitle: "Te traemos las fotos de la charla de Quantum Fracture",
    imgSrc: imgCharlaQuantumFracture,
    date: "25/10/2022",
    href: "charla-quantum-fracture",
  },
  {
    title: "XXXIII Congreso CEET",
    subtitle:
      "Nuestros compañeros Diego Orts y Oxana asistieron al CEET en Zaragoza",
    imgSrc: imgCEETZaragoza,
    date: "13/10/2022",
    href: "congreso-ceet-zaragoza",
  },
  {
    title: "Título extremadamente largo para probar que todo funciona bien",
    subtitle:
      "Nuestros compañeros Diego Orts y Oxana asistieron al CEET en Zaragoza",
    imgSrc: imgCEETZaragoza,
    date: "13/10/2022",
    href: "congreso-cet-zaragoza",
  },
  {
    title:
      "Título y subtítulo extremadamente largos para probar que todo funciona bien",
    subtitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imgSrc: imgCEETZaragoza,
    date: "13/10/2022",
    href: "congreo-ceet-zaragoza",
  },
  {
    title: "Subtítulo extremadamente largo",
    subtitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imgSrc: imgCEETZaragoza,
    date: "13/10/2022",
    href: "congreso-ceet-aragoza",
  },
];
