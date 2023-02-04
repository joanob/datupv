export type NavLink = {
  texto: string;
  url: string;
  orden: number;
  subenlaces?: {
    texto: string;
    url: string;
    orden: number;
    unapagina: boolean;
  }[];
};
