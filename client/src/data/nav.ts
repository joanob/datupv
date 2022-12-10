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
        href: "delegacion/que-es",
      },
      {
        text: "Qué hacemos",
        href: "delegacion/que-hacemos",
      },
      {
        text: "El equipo",
        href: "delegacion/equipo",
      },
    ],
  },
  {
    text: "Asuntos Académicos",
    items: [
      {
        text: "Normativa",
        href: "asuntos-academicos/normativa",
      },
      {
        text: "Mistral",
        href: "asuntos-academicos/mistral",
      },
    ],
  },
  {
    text: "Actividades",
    href: "actividades",
  },
  {
    text: "Guías",
    href: "guias",
  },
  {
    text: "Contacto",
    href: "contacto",
  },
];
