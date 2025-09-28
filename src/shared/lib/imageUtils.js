// Утилита для правильного формирования путей к изображениям
export const getImagePath = (imagePath) => {
  // Для GitHub Pages и локальной разработки добавляем базовый путь /art-billding/
  // Если путь уже начинается с /art-billding/, возвращаем как есть
  if (imagePath.startsWith('/art-billding/')) {
    return imagePath;
  }
  
  // Если путь начинается с /, добавляем /art-billding
  if (imagePath.startsWith('/')) {
    // URL-кодируем путь для правильной обработки пробелов и специальных символов
    const encodedPath = imagePath.split('/').map(segment => 
      segment ? encodeURIComponent(segment) : segment
    ).join('/');
    const result = `/art-billding${encodedPath}`;
    console.log(`Image path: ${imagePath} -> ${result}`);
    return result;
  }
  
  // Если путь не начинается с /, добавляем /art-billding/
  const encodedPath = imagePath.split('/').map(segment => 
    segment ? encodeURIComponent(segment) : segment
  ).join('/');
  const result = `/art-billding/${encodedPath}`;
  console.log(`Image path: ${imagePath} -> ${result}`);
  return result;
};

// Утилита для получения публичного URL изображения
export const getPublicImagePath = (imagePath) => {
  return getImagePath(imagePath);
};
