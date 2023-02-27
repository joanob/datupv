export interface TextComponent {
  id: number;
  __component: "posts.texto";
  texto: string;
}

export interface ImageWithTextComponent {
  id: number;
  __component: "posts.imagen-con-texto";
  alineacion: "texto-derecha" | "texto-izquierda";
  texto: string;
  imagen: { url: string };
}

export interface HeaderComponent {
  id: number;
  __component: "posts.encabezado";
  tipo: "primario" | "secundario" | "terciario";
  texto: string;
}
