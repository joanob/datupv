import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { feed } from "../../data/feed";

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
            <div className="news-slide-data">
              <p className="news-slide-title">{article.title}</p>
              <p className="news-slide-subtitle">{article.subtitle}</p>
              <p className="news-slide-date">{article.date}</p>
            </div>

            <img src={article.imgSrc} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const Home = () => {
  return (
    <main className="main">
      <NewsCarousel />
    </main>
  );
};

export default Home;
