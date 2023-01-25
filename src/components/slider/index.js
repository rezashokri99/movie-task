// swiper css
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import styles from "./slider.module.scss";
import { useEffect, useState } from 'react';
import { getPopularMovies } from '../../helpers/api';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

SwiperCore.use([Navigation, Pagination])

const Slider = () => {
    let [popularMovies, setPopularMovies] = useState([]);
    let [loading, setLoading] = useState(true);


    useEffect(() => {
        const getPopularMoviesFn = async () => {
            setLoading(true);
            try {
                const data = await getPopularMovies()
                setPopularMovies(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }   
        }
        getPopularMoviesFn()
    }, [])




    return (
        <div className={styles.slider_container}>

            {
                loading ?
                    <div className={styles.slide_loader}>
                        <div className={styles.slider_image}></div>
                        <div className={`${styles.slider_content} `}>
                            <div className={styles.slider_badge}></div>
                            <div className={styles.slider_title}></div>
                            <div className={styles.slider_description}>
                                <span className={styles.genre}></span>
                                <span className={styles.genre}></span>
                            </div>
                        </div>
                        <BsChevronLeft className={styles.chevron_left} />
                        <BsChevronRight className={styles.chevron_right} />
                    </div> :
                    popularMovies.length ?
                        <Swiper
                            dir="rtl"
                            loop={true}
                            autoplay={{
                                delay: 4000,
                            }}
                            effect={"coverflow"}
                            navigation={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Autoplay, EffectFade, Navigation, Pagination]}
                        >
                            {
                                popularMovies.map((movie) => (
                                    <SwiperSlide key={movie.id} className={styles.slider}>
                                        <img className={styles.slider_image} src={movie.images[0]} alt={movie.title} />
                                        <div className={`${styles.slider_content} `}>
                                            <h2 className={styles.slider_badge}>new</h2>
                                            <h1 className={styles.slider_title}>{movie.title}</h1>
                                            <div className={styles.slider_description}>
                                                {
                                                    movie.genres?.map((genre) => (
                                                        <span key={genre} className={styles.genre}>{genre}</span>
                                                    ))
                                                }
                                            </div>
                                            {/* <p className="my-8 w-[270px] sm:w-[340px] md:w-[400px] lg:w-[450px] 2xl:w-[500px] text-right text-sm">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد...</p> */}
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper> :
                        <div className={styles.not_found_videos}>
                            There is no popular movie.
                        </div>
            }

        </div>
    );
}

export default Slider;