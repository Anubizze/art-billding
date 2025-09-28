// Утилита для правильного формирования путей к изображениям
export const getImagePath = (imagePath) => {
  // Проверяем, находимся ли мы в локальной разработке
  const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  // Для локальной разработки возвращаем путь как есть
  if (isLocalDev) {
    console.log(`Local dev - Image path: ${imagePath}`);
    return imagePath;
  }
  
  // Для GitHub Pages добавляем базовый путь /art-billding/
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
    console.log(`GitHub Pages - Image path: ${imagePath} -> ${result}`);
    return result;
  }
  
  // Если путь не начинается с /, добавляем /art-billding/
  const encodedPath = imagePath.split('/').map(segment => 
    segment ? encodeURIComponent(segment) : segment
  ).join('/');
  const result = `/art-billding/${encodedPath}`;
  console.log(`GitHub Pages - Image path: ${imagePath} -> ${result}`);
  return result;
};

// Утилита для получения публичного URL изображения
export const getPublicImagePath = (imagePath) => {
  return getImagePath(imagePath);
};
