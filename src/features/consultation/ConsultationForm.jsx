import React, { useState } from 'react';
import { getImagePath } from '../../shared/lib/imageUtils';
import './consultation-form.css';

const ConsultationForm = () => {
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
        
        setIsSubmitted(true);
        
        // Сброс формы через 5 секунд
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', phone: '', email: '', message: '' });
        }, 5000);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="consultation-form__success">
        <div className="consultation-form__success-icon">✓</div>
        <h3 className="consultation-form__success-title">
          Заявка отправлена!
        </h3>
        <p className="consultation-form__success-description">
          Наш менеджер свяжется с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <div className="consultation-form">
      <h3 className="consultation-form__title">
        Получите бесплатную консультацию
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
          className="btn-primary consultation-form__submit"
        >
          {isLoading ? (
            <>
              <svg className="consultation-form__spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Отправляем...
            </>
          ) : (
            'Получить консультацию'
          )}
        </button>

        <p className="consultation-form__disclaimer">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </p>
      </form>

      {/* Контактные кнопки */}
      <div className="consultation-form__contacts">
        <p className="consultation-form__contacts-description">Или свяжитесь с нами напрямую:</p>
        <div className="consultation-form__contacts-buttons">
          {/* Телефон */}
          <a
            href="tel:+79779797272"
            className="consultation-form__contact-button consultation-form__contact-button--phone"
            title="Позвонить"
          >
            <svg className="consultation-form__contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/79779797272"
            target="_blank"
            rel="noopener noreferrer"
            className="consultation-form__contact-button consultation-form__contact-button--whatsapp"
            title="WhatsApp"
          >
            <svg className="consultation-form__contact-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </a>

          {/* MAX */}
          <a
            href="tel:+79779797272"
            className="consultation-form__contact-button consultation-form__contact-button--max"
            title="MAX - Позвонить"
          >
            <img 
              src={getImagePath("/max.webp")} 
              alt="MAX" 
              className="consultation-form__contact-icon consultation-form__contact-icon--max"
            />
          </a>
        </div>
        <p className="consultation-form__phone-number">8 977 979 72 72</p>
      </div>
    </div>
  );
};

export default ConsultationForm;
