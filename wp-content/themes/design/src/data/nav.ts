export type Nav = {
  text: string;
  href?: string;
  items?: {
    text: string;
    href: string;
  }[];
};

export const nav: Nav[] = [
  {
    text: "La delegación",
    items: [
      {
        text: "Qué es la delegación",
        href: "#",
      },
      {
        text: "Qué hacemos",
        href: "#",
      },
      {
        text: "El equipo",
        href: "#",
      },
    ],
  },
  {
    text: "Asuntos Académicos",
    items: [
      {
        text: "Normativa",
        href: "#",
      },
      {
        text: "Mistral",
        href: "#",
      },
    ],
  },
  {
    text: "Actividades",
    href: "",
  },
  {
    text: "Guías",
    href: "",
  },
  {
    text: "Contacto",
    href: "",
  },
];
