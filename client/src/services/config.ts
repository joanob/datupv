export const baseURL = "http://" + import.meta.env.VITE_SERVER_URL;

export interface StrapiRes<T> {
  data: {
    attributes: T;
  }[];
}

export interface StrapiImgResponse {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
    };
  };
}
