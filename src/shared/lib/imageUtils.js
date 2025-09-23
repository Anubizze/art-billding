// Утилита для правильного формирования путей к изображениям
export const getImagePath = (imagePath) => {
  // В Vite файлы из папки public доступны напрямую из корня
  // Если путь уже начинается с /, возвращаем как есть
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // Если путь не начинается с /, добавляем /
  return `/${imagePath}`;
};

// Утилита для получения публичного URL изображения
export const getPublicImagePath = (imagePath) => {
  return getImagePath(imagePath);
};
