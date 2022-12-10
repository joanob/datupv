export type NavLink = {
  text: string;
  url: string;
  order: number;
  sublinks?: {
    text: string;
    url: string;
    order: number;
    samepage: boolean;
  }[];
};
