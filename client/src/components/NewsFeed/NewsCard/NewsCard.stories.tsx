import { ComponentStory, ComponentMeta } from "@storybook/react";

import NewsCard from ".";

import "../../../styles.css";

import imgBerkeley from "../../../public/img/berkeley.png";
import imgHalloween from "../../../public/img/halloween.jfif";
import SbWrapper from "../../../helpers/SbWrapper";

export default {
  title: "NewsCard",
  component: NewsCard,
} as ComponentMeta<typeof NewsCard>;

export const HorizontalImageWithoutCaption: ComponentStory<typeof NewsCard> =
  () => (
    <SbWrapper>
      <NewsCard
        news={{
          title: "Título de la noticia",
          url: "",
          datetime: 1671114604541,
          image: {
            url: imgBerkeley,
            altText: null,
            caption: null,
            width: 1024,
            height: 441,
          },
        }}
      />
    </SbWrapper>
  );

export const VerticalImageWithoutCaption: ComponentStory<typeof NewsCard> =
  () => (
    <SbWrapper>
      <NewsCard
        news={{
          title: "Título de la noticia",
          url: "",
          datetime: 1671114604541,
          image: {
            url: imgHalloween,
            altText: null,
            caption: null,
            width: 1024,
            height: 1280,
          },
        }}
      />
    </SbWrapper>
  );

export const HorizontalImageWithLargeTitle: ComponentStory<typeof NewsCard> =
  () => (
    <SbWrapper>
      <NewsCard
        news={{
          title:
            "Título de la noticia extremadamente largo para probar si queda bien o hay que hacer algún cambio",
          url: "",
          datetime: 1671114604541,
          image: {
            url: imgBerkeley,
            altText: null,
            caption: null,
            width: 1024,
            height: 441,
          },
        }}
      />
    </SbWrapper>
  );

export const VerticalImageWithLargeTitle: ComponentStory<typeof NewsCard> =
  () => (
    <SbWrapper>
      <NewsCard
        news={{
          title:
            "Título de la noticia extremadamente largo para probar si queda bien o hay que hacer algún cambio",
          url: "",
          datetime: 1671114604541,
          image: {
            url: imgHalloween,
            altText: null,
            caption: null,
            width: 1024,
            height: 1280,
          },
        }}
      />
    </SbWrapper>
  );
