export interface News {
  title: string;
  url: string;
  datetime: number;
  image?: NewsImage;
}

interface NewsImage {
  url: string;
  altText: string;
  caption: string;
  width: number;
  height: number;
}
