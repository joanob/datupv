export interface News {
  title: string;
  url: string;
  datetime: number;
  image?: NewsImage;
}

interface NewsImage {
  url: string;
  altText: string | null;
  caption: string | null;
  width: number;
  height: number;
}
