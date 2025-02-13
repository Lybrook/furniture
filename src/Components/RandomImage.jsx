import React, { useState, useEffect } from 'react';

const RandomImage = ({ intervalDuration = 3000 }) => {
  const images = [
    'https://i.pinimg.com/236x/1f/f4/7e/1ff47e64b44d01e67b23cba3cb51ba26.jpg',
    'https://i.pinimg.com/736x/b5/d6/df/b5d6df0d6df1f9d30c6b8b39b1aa374e.jpg',
    'https://i.pinimg.com/236x/9c/9a/92/9c9a92552cad7ab4dcc54cf5424c9650.jpg',
    'https://i.pinimg.com/736x/ee/e0/fe/eee0fe30ad5bdc3b5886ae1aa0db3b0a.jpg',
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const getRandomIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * images.length);
    } while (randomIndex === currentIndex);
    return randomIndex;
  };

  useEffect(() => {
    const preloadImages = () => {
      images.forEach((image) => {
        const img = new Image();
        img.src = image;
      });
    };
    preloadImages();
  }, [images]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const randomIndex = getRandomIndex();
        setCurrentIndex(randomIndex);
        setCurrentImage(images[randomIndex]);
      }, intervalDuration);
      return () => clearInterval(interval);
    }
  }, [currentIndex, images, isPlaying, intervalDuration]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setCurrentImage(images[index]);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="bg-gray-100 h-screen w-full flex flex-col items-center overflow-hidden">
      <div className="w-full h-full">
        <img
          src={currentImage}
          alt="Random display"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/600')}
          className="w-full h-full object-cover shadow-lg transition-opacity duration-1000 ease-in-out"
        />
      </div>
      <div className="flex justify-center mt-4 space-x-2 absolute bottom-4">
        {images.map((_, index) => (
          <span
            key={index}
            aria-selected={currentIndex === index}
            aria-label={`Slide ${index + 1}`}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              currentIndex === index ? 'bg-blue-500 border border-white' : 'bg-gray-400'
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default RandomImage;
