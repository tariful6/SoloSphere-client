import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slider from './Slider';

import imgBg1 from '../../../assets/images/carousel1.jpg'
import imgBg2 from '../../../assets/images/carousel2.jpg'
import imgBg3 from '../../../assets/images/carousel3.jpg'

const Banner = () => {
    return (
        <div className=' my-'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop = {true}
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide> <Slider image={imgBg1} text='Get Your Web Development Project Done  in minutes'></Slider></SwiperSlide>
                <SwiperSlide> <Slider image={imgBg2} text='Start Your Digital Marketing Project Running'></Slider></SwiperSlide>
                <SwiperSlide> <Slider image={imgBg3} text='Start Your Graphical Project in minutes'></Slider></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;