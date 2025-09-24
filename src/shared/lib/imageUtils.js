// Утилита для правильного формирования путей к изображениям
export const getImagePath = (imagePath) => {
  // Для GitHub Pages и локальной разработки добавляем базовый путь /art-billding/
  // Если путь уже начинается с /art-billding/, возвращаем как есть
  if (imagePath.startsWith('/art-billding/')) {
    return imagePath;
  }
  
  // Если путь начинается с /, добавляем /art-billding
  if (imagePath.startsWith('/')) {
    return `/art-billding${imagePath}`;
  }
  
  // Если путь не начинается с /, добавляем /art-billding/
  return `/art-billding/${imagePath}`;
};

// Утилита для получения публичного URL изображения
export const getPublicImagePath = (imagePath) => {
  return getImagePath(imagePath);
};
