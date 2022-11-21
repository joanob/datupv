import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { feed } from "../../data/feed";

const NewsCarousel = () => {
  const news = feed.length > 5 ? feed.slice(0, 5) : feed;

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={25}
      loop={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
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
