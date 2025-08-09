import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Swiper.module.css';

// Import required modules
import { Pagination } from 'swiper/modules';
import LessonCard from '../Collection/LessonCard';

const SwiperLesson = ({lessons = []}) => {
    console.log("pass:",lessons);
    
    const pagination = {
        clickable: true,
        renderBullet: (index: number, className: string) => {
            return `<span class="${className}">${index + 1}</span>`;
        },
    };

    return (
        <Swiper
            freeMode={true}
            slidesPerView={3}
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
        >
            {lessons&& lessons.length>0 &&(
                lessons.map((lesson)=>(
                    <SwiperSlide><LessonCard lesson={lesson}/></SwiperSlide>
                ))
            )}
            
        </Swiper>
    );
};

export default SwiperLesson;
