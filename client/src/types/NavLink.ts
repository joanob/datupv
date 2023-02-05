export type NavLink = {
  texto: string;
  url: string;
  orden: number;
  pagina: string | null;
  subenlaces?: {
    texto: string;
    url: string;
    orden: number;
    unapagina: boolean;
    pagina: string | null;
  }[];
};
