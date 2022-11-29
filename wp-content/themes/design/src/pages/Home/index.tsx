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
        <SwiperSlide key={article.title}>
          <div className="news-slide">
            <Link to={"/noticias/" + article.href}>
              <div className="news-slide-data">
                <AutoEllipsisParagraph
                  className="news-slide-title"
                  fontSize={16}
                  text={article.title}
                />
                <div></div>
                <AutoEllipsisParagraph
                  className="news-slide-subtitle"
                  fontSize={12}
                  text={article.subtitle}
                />
                <div></div>
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

  let totalPages = Math.floor(feed.length / newsPerPage);

  if (totalPages * newsPerPage < feed.length) {
    totalPages++;
  }

  const newsInPage = feed.slice((page - 1) * newsPerPage, page * newsPerPage);

  const titleFontSize = 16;
  const subtitleFontSize = 15;

  return (
    <section className="news-feed">
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      {newsInPage.map((article) => (
        <Link key={article.href} to={"/noticias/" + article.href}>
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
      ))}
      {newsInPage.length > 4 ? (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      ) : null}
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
