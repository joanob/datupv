import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { feed } from "../../data/feed";
import { Link } from "react-router-dom";
import AutoEllipsisParagraph from "../../components/AutoEllipsisParagraph";

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
      modules={[Pagination, Navigation, Autoplay]}
      style={{ maxWidth: maxWidth }}
    >
      {news.map((article) => (
        <SwiperSlide key={article.title}>
          <div className="news-slide">
            <Link to={"/noticias/" + article.href}>
              <div className="news-slide-data">
                <p className="news-slide-title">{article.title}</p>
                <p className="news-slide-subtitle">{article.subtitle}</p>

                <p className="news-slide-date">{article.date}</p>
              </div>
              <img src={article.imgSrc} draggable={false} />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const NewsFeed = () => {
  const [page, setPage] = useState(1);

  const newsPerPage = 5;

  const newsInPage = feed.slice((page - 1) * newsPerPage, page * newsPerPage);

  const titleFontSize = 16;
  const subtitleFontSize = 15;

  return (
    <section className="news-feed">
      {newsInPage.map((article) => {
        return (
          <Link to={"/noticias/" + article.href}>
            <article key={article.href}>
              <img src={article.imgSrc} />
              <div className="news-feed-data">
                <AutoEllipsisParagraph
                  className="news-feed-data-title"
                  fontSize={titleFontSize}
                  text={article.title}
                />
                <div></div> {/* 5px margin */}
                <AutoEllipsisParagraph
                  className="news-feed-data-subtitle"
                  fontSize={subtitleFontSize}
                  text={article.subtitle}
                />
                <div></div> {/* 5px margin */}
                <p className="news-feed-data-date">{article.date}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

const Home = () => {
  return (
    <main className="main">
      <NewsCarousel />
      <NewsFeed />
    </main>
  );
};

export default Home;
