export type News = {
  title: string;
  subtitle: string;
  imgSrc: string;
  date: string;
};

export const feed: News[] = [
  {
    title: "Instagram sucks",
    subtitle: "Instagram keeps copying from other apps to maintain its status",
    imgSrc:
      "https://newsfeed.org/wp-content/uploads/Facebook-blueprint-520x245.jpg",
    date: "17/11/2022",
  },
  {
    title: "Twitter se está hundiendo",
    subtitle: "Las acciones de Elon Musk están llevando Twitter a pique",
    imgSrc: "https://smartslider3.com/wp-content/uploads/2019/06/image3.png",
    date: "15/11/2022",
  },
  {
    title: "Cómo poner rumbo a tu vida",
    subtitle: "¿No has estado en ningún laberinto? No sabes lo que te pierdes",
    imgSrc:
      "https://smartslider3.com/wp-content/uploads/slider/cache/dbfa60fb928cbf8bcaa9db0159e4ed89/fullwidthbg3.webp",
    date: "12/10/2022",
  },
];
