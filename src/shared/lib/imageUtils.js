// Утилита для правильного формирования путей к изображениям
export const getImagePath = (imagePath) => {
  // Если путь уже содержит базовый путь, возвращаем как есть
  if (imagePath.startsWith('/art-billding/')) {
    return imagePath;
  }
  
  // Если путь начинается с /, добавляем базовый путь
  if (imagePath.startsWith('/')) {
    return `/art-billding${imagePath}`;
  }
  
  // Если путь не начинается с /, добавляем базовый путь и /
  return `/art-billding/${imagePath}`;
};

// Утилита для получения публичного URL изображения
export const getPublicImagePath = (imagePath) => {
  return getImagePath(imagePath);
};
