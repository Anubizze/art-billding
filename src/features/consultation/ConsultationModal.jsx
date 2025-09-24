import React, { useState } from 'react';
import './consultation-modal.css';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Защита от спама (не чаще 1 раза в 30 секунд)
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      setError('Пожалуйста, подождите 30 секунд перед повторной отправкой');
      return;
    }

    if (!validateForm()) {
      return;
    }

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
      // Отправляем через наш сервер
      const response = await fetch('http://localhost:3000/send-mail-simple.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('Form submitted successfully');
        alert(`✅ Заявка отправлена на 9@astorius.ru!

Ваши данные:
• Имя: ${result.data.name}
• Телефон: ${result.data.phone}
• Email: ${result.data.email}
• Сообщение: ${result.data.message}

Мы свяжемся с вами в ближайшее время!`);
        
        onClose();
      } else {
        throw new Error(result.error || `Ошибка отправки: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending form:', error);
      alert(`❌ Ошибка отправки заявки.

Ваши данные:
• Имя: ${sanitizedData.name}
• Телефон: ${sanitizedData.phone}
• Email: ${sanitizedData.email || 'Не указан'}
• Сообщение: ${sanitizedData.message || 'Без дополнительного сообщения'}

Пожалуйста, свяжитесь с нами напрямую:
📞 Телефон: 8 (495) 979 72 72
📧 Email: 9@astorius.ru`);
      
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="consultation-modal-overlay">
      <div className="consultation-modal">
        <div className="consultation-modal__header">
          <h2 className="consultation-modal__title">Бесплатная консультация</h2>
          <button
            onClick={onClose}
            className="consultation-modal__close"
          >
            <svg className="consultation-modal__close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="consultation-modal__error">
            <div className="consultation-modal__error-content">
              <div className="consultation-modal__error-icon">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="consultation-modal__error-text">
                <p className="consultation-modal__error-description">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} method="POST" className="consultation-modal__form">
          <div className="consultation-modal__field">
            <label className="consultation-modal__label">
              Имя
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="consultation-modal__input"
            />
          </div>

          <div className="consultation-modal__field">
            <label className="consultation-modal__label">
              Телефон
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="consultation-modal__input"
            />
          </div>

          <div className="consultation-modal__field">
            <label className="consultation-modal__label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="consultation-modal__input"
            />
          </div>

          <div className="consultation-modal__field">
            <label className="consultation-modal__label">
              Сообщение
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="consultation-modal__textarea"
            />
          </div>

          <div className="consultation-modal__actions">
            <button
              type="button"
              onClick={onClose}
              className="consultation-modal__button consultation-modal__button--secondary"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="consultation-modal__button consultation-modal__button--primary"
            >
              Отправить заявку
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationModal;
