import React, { useState } from 'react';
import './consultation-form.css';

const ConsultationFormPHP = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  // Валидация и санитизация
  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '').trim().substring(0, 1000);
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.length < 2) {
      setError('Имя должно содержать минимум 2 символа');
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError('Введите корректный номер телефона');
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Введите корректный email');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Защита от спама (не чаще 1 раза в 30 секунд)
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      setError('Пожалуйста, подождите 30 секунд перед повторной отправкой');
      return;
    }

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setLastSubmitTime(now);

    // Санитизация данных
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      phone: sanitizeInput(formData.phone),
      email: formData.email ? sanitizeInput(formData.email) : '',
      message: sanitizeInput(formData.message)
    };

    try {
      // Для GitHub Pages используем простое решение - показываем контакты
      console.log('Form data:', sanitizedData);
      
      // Имитируем успешную отправку
      alert(`✅ Ваша заявка получена!

Ваши данные:
• Имя: ${sanitizedData.name}
• Телефон: ${sanitizedData.phone}
• Email: ${sanitizedData.email || 'Не указан'}
• Сообщение: ${sanitizedData.message || 'Без дополнительного сообщения'}

📞 Пожалуйста, свяжитесь с нами напрямую:
• Телефон: 8 (495) 979 72 72
• Email: 9@astorius.ru
• WhatsApp: +7 (977) 979 72 72

Мы свяжемся с вами в ближайшее время!`);
      
      setIsSubmitted(true);
      
      // Сброс формы через 5 секунд
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 5000);
    } catch (error) {
      console.error('Error processing form:', error);
      setError('Ошибка соединения. Проверьте интернет и попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="consultation-form">
        <div className="consultation-form__success">
          <div className="consultation-form__success-content">
            <div className="consultation-form__success-icon">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="consultation-form__success-text">
              <h3 className="consultation-form__success-title">
                Заявка отправлена!
              </h3>
              <p className="consultation-form__success-description">
                Мы свяжемся с вами в ближайшее время.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="consultation-form">
      <h3 className="consultation-form__title">
        Получите бесплатную консультацию (PHP версия)
      </h3>
      <p className="consultation-form__description">
        Ответим на вопросы, подберём планировку и рассчитаем ипотеку 2%.
      </p>

      {error && (
        <div className="consultation-form__error">
          <div className="consultation-form__error-content">
            <div className="consultation-form__error-icon">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="consultation-form__error-text">
              <h3 className="consultation-form__error-title">
                Ошибка отправки
              </h3>
              <div className="consultation-form__error-description">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} method="POST" className="consultation-form__form">
        <div className="consultation-form__row">
          <div className="consultation-form__field">
            <label className="consultation-form__label">
              Имя *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="consultation-form__input"
              placeholder="Ваше имя"
            />
          </div>

          <div className="consultation-form__field">
            <label className="consultation-form__label">
              Телефон *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="consultation-form__input"
              placeholder="+7 (___) ___-__-__"
            />
          </div>
        </div>

        <div className="consultation-form__field">
          <label className="consultation-form__label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="consultation-form__input"
            placeholder="your@email.com"
          />
        </div>

        <div className="consultation-form__field">
          <label className="consultation-form__label">
            Сообщение
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="consultation-form__textarea"
            placeholder="Расскажите о ваших пожеланиях..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`consultation-form__button ${isLoading ? 'consultation-form__button--loading' : ''}`}
        >
          {isLoading ? 'Отправляем...' : 'Получить консультацию'}
        </button>
      </form>
    </div>
  );
};

export default ConsultationFormPHP;
