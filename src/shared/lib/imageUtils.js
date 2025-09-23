// Утилита для правильного формирования путей к изображениям
export const getImagePath = (imagePath) => {
  // Для GitHub Pages добавляем базовый путь /art-billding/
  // Если путь уже начинается с /, заменяем на /art-billding/
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
