import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as SwiperPagination, Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { feed } from "../../data/feed";
import { Link } from "react-router-dom";
import AutoEllipsisParagraph from "../../components/AutoEllipsisParagraph";
import Pagination from "../../components/Pagination";

import "./home.css";
import SwiperNewsCard from "../../components/SwiperNewsCard";

import NewsFeed from "../../components/NewsFeed";

const NewsCarousel = () => {
  const news = feed.length > 5 ? feed.slice(0, 5) : feed;

  const maxWidth = news.length * 320 + (news.length - 1) * 25;

  const slidesPerView =
    document.body.offsetWidth < 500
      ? 1
      : document.body.offsetWidth > maxWidth
      ? news.length
      : "auto";

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={25}
      centeredSlides={document.body.offsetWidth >= 500}
      loop={slidesPerView === 1}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[SwiperPagination, Navigation, Autoplay]}
      style={{ maxWidth: maxWidth }}
    >
      {news.map((article) => (
        <SwiperSlide key={article.href}>
          <div className="news-slide">
            <Link to={"/noticias/" + article.href}>
              <img src={article.imgSrc} draggable={false} />
              <div className="news-slide-data">
                <AutoEllipsisParagraph
                  className="news-slide-data-title"
                  fontSize={16}
                  text={article.title}
                />
                {/* <p className="news-slide-data-date">{article.date}</p> */}
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const NewsCarouselWithCard = () => {
  const news = feed.length > 5 ? feed.slice(0, 5) : feed;

  const maxWidth = news.length * 320 + (news.length - 1) * 25;

  const slidesPerView =
    document.body.offsetWidth < 500
      ? 1
      : document.body.offsetWidth > maxWidth
      ? news.length
      : "auto";

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={25}
      centeredSlides={document.body.offsetWidth >= 500}
      loop={slidesPerView === 1}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[SwiperPagination, Navigation, Autoplay]}
      style={{ maxWidth: maxWidth }}
    >
      {news.map((article) => (
        <SwiperSlide key={article.href}>
          <SwiperNewsCard article={article} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const Home = () => {
  return (
    <main className="main">
      <h2>Últimas noticias</h2>
      <NewsFeed />
      {/* <NewsCarouselWithCard />
      <div style={{ height: "20px" }}></div> */}
      {/* <NewsFeed /> */}
    </main>
  );
};

export default Home;
