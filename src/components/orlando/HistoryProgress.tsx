"use client"
import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import '../../app/history.css'; // <-- Import the CSS here

const HistoryProgress = () => {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    if (swiperRef.current && !swiperInstance.current) {
      swiperInstance.current = new Swiper(swiperRef.current, {
        slidesPerView: 'auto',
        spaceBetween: 40,
        centeredSlides: true,
        loop: false,
        navigation: {
          nextEl: '.history-next',
          prevEl: '.history-prev',
        },
      });
    }
  }, []);

  return (
    <section className="sphistory-section">
      <div className="sphistory-container">
        <div className="sphistory-wrapper">
          <div className="historySwiper sphistory-swiper" ref={swiperRef}>
            <div className="sphistory-swiper-line"></div>
            <div className="swiper-wrapper">
              {['CUANDO IR', 'LLEGADA', 'ALOJAMIENTO', 'MOVILIDAD', 'ENTRADAS', 'EXTRAS'].map((item) => (
                <div className="swiper-slide" key={item}>
                  <div className="sphistory-year-item">{item}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="sphistory-nav-wrapper">
            <div className="sphistory-nav-buttons">
              <div className="history-prev sphistory-nav-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="history-next sphistory-nav-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryProgress;
