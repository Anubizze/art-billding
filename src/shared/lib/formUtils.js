// Утилита для отправки форм
export const submitForm = async (formData) => {
  // Определяем, находимся ли мы в продакшене (GitHub Pages)
  const isProduction = window.location.hostname === 'anubizze.github.io';
  
  let endpoint;
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };

  if (isProduction) {
    // На GitHub Pages используем Formspree или другой сервис
    // Пока что показываем данные пользователю
    return {
      success: false,
      error: 'Форма временно недоступна. Пожалуйста, свяжитесь с нами напрямую.',
      data: formData
    };
  } else {
    // В разработке используем локальный сервер
    endpoint = 'http://localhost:3000/send-mail-simple.php';
  }

  try {
    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        data: result.data,
        message: result.message
      };
    } else {
      return {
        success: false,
        error: result.error || `Ошибка отправки: ${response.status}`,
        data: formData
      };
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: 'Ошибка сети. Пожалуйста, свяжитесь с нами напрямую.',
      data: formData
    };
  }
};

// Функция для санитизации данных
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Удаляем потенциально опасные символы
    .substring(0, 1000); // Ограничиваем длину
};

// Функция для валидации формы
export const validateFormData = (formData) => {
  const errors = [];

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push('Имя должно содержать минимум 2 символа');
  }

  if (!formData.phone || !/^\+?[0-9\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
    errors.push('Введите корректный номер телефона');
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Введите корректный email');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
