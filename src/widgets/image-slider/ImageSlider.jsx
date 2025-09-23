import React, { useState, useEffect } from 'react';
import { getImagePath } from '../../shared/lib/imageUtils';
import './image-slider.css';

const ImageSlider = ({ images, title, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, autoPlay, interval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!images || images.length === 0) {
    return (
      <div className="image-slider">
        <div className="image-slider__placeholder">
          <div className="image-slider__placeholder-icon">🏢</div>
          <div className="image-slider__placeholder-text">Изображения не найдены</div>
        </div>
      </div>
    );
  }

  return (
    <div className="image-slider">
      <div className="image-slider__container">
        {/* Main Image */}
        <div className="image-slider__main">
          <img
            src={getImagePath(images[currentIndex])}
            alt={`${title} - фото ${currentIndex + 1}`}
            className="image-slider__image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="image-slider__error" style={{display: 'none'}}>
            <div className="image-slider__error-icon">🏢</div>
            <div className="image-slider__error-text">Изображение не найдено</div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                className="image-slider__arrow image-slider__arrow--prev"
                onClick={goToPrevious}
                aria-label="Предыдущее изображение"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="image-slider__arrow image-slider__arrow--next"
                onClick={goToNext}
                aria-label="Следующее изображение"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Play/Pause Button */}
          {images.length > 1 && autoPlay && (
            <button
              className="image-slider__play-pause"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Приостановить' : 'Воспроизвести'}
            >
              {isPlaying ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" />
                </svg>
              )}
            </button>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="image-slider__counter">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="image-slider__thumbnails">
            {images.map((image, index) => (
              <button
                key={index}
                className={`image-slider__thumbnail ${
                  index === currentIndex ? 'image-slider__thumbnail--active' : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Перейти к изображению ${index + 1}`}
              >
                <img
                  src={getImagePath(image)}
                  alt={`${title} - миниатюра ${index + 1}`}
                  className="image-slider__thumbnail-image"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
