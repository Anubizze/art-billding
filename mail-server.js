import { createServer } from 'http';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { exec } from 'child_process';
import nodemailer from 'nodemailer';

const PORT = 3000;

// Настройка Nodemailer для отправки писем
const transporter = nodemailer.createTransport({
    host: 'smtp.astorius.ru',
    port: 587,
    secure: false,
    auth: {
        user: '9@astorius.ru',
        pass: 'YOUR_APP_PASSWORD' // Замените на пароль приложения
    }
});

// Счетчик запросов по IP для rate limiting
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 минута
const MAX_REQUESTS_PER_WINDOW = 10; // максимум 10 запросов в минуту

const server = createServer((req, res) => {
    // Rate limiting
    const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;
    const now = Date.now();
    
    if (!requestCounts.has(clientIP)) {
        requestCounts.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    } else {
        const clientData = requestCounts.get(clientIP);
        if (now > clientData.resetTime) {
            clientData.count = 1;
            clientData.resetTime = now + RATE_LIMIT_WINDOW;
        } else {
            clientData.count++;
            if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
                console.log(`🚨 Rate limit exceeded for IP: ${clientIP}`);
                res.writeHead(429, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Слишком много запросов. Попробуйте позже.' }));
                return;
            }
        }
    }
    
    // Устанавливаем CORS заголовки (ограниченные)
    const origin = req.headers.origin;
    if (origin && origin.startsWith('http://localhost:517')) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 часа
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    let url = req.url;
    
    // Убираем query параметры
    if (url.includes('?')) {
        url = url.split('?')[0];
    }
    
    // Обработка отправки писем
    if (url === '/send-mail-simple.php' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                
                // Валидация
                if (!data.name || !data.phone) {
                    console.log(`❌ Неполные данные от IP: ${clientIP}`);
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'Неполные данные' }));
                    return;
                }
                
                // Проверка на подозрительные символы
                const suspiciousPatterns = /<script|javascript:|on\w+\s*=|eval\(|alert\(/i;
                const allData = JSON.stringify(data);
                if (suspiciousPatterns.test(allData)) {
                    console.log(`🚨 Подозрительные данные от IP: ${clientIP}`, data);
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'Недопустимые данные' }));
                    return;
                }
                
                // Ограничение длины данных
                if (data.name.length > 100 || data.phone.length > 20 || 
                    (data.email && data.email.length > 100) || 
                    (data.message && data.message.length > 2000)) {
                    console.log(`❌ Слишком длинные данные от IP: ${clientIP}`);
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'Слишком длинные данные' }));
                    return;
                }
                
                // Логируем заявку в консоль
                console.log('Новая заявка:', {
                    name: data.name,
                    phone: data.phone,
                    email: data.email || 'Не указан',
                    message: data.message || 'Не указано',
                    date: new Date().toLocaleString('ru-RU')
                });
                
                // Отправляем письмо
                const mailOptions = {
                    from: '9@astorius.ru',
                    to: '9@astorius.ru',
                    subject: 'Новая заявка с сайта',
                    text: `
Новая заявка с сайта:
Дата: ${new Date().toLocaleString('ru-RU')}

Имя: ${data.name}
Телефон: ${data.phone}
Email: ${data.email || 'Не указан'}
Сообщение: ${data.message || 'Не указано'}

IP: ${req.connection.remoteAddress}
User-Agent: ${req.headers['user-agent'] || 'Не указан'}
`,
                    html: `
<h2>Новая заявка с сайта</h2>
<p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
<p><strong>Имя:</strong> ${data.name}</p>
<p><strong>Телефон:</strong> ${data.phone}</p>
<p><strong>Email:</strong> ${data.email || 'Не указан'}</p>
<p><strong>Сообщение:</strong> ${data.message || 'Не указано'}</p>
<hr>
<p><small>IP: ${req.connection.remoteAddress}</small></p>
<p><small>User-Agent: ${req.headers['user-agent'] || 'Не указан'}</small></p>
`
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('❌ Ошибка отправки письма:', error.message);
                    } else {
                        console.log('✅ Письмо отправлено на 9@astorius.ru');
                    }
                });
                
                // Возвращаем успешный ответ
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
                    data: {
                        id: Date.now(),
                        name: data.name,
                        phone: data.phone,
                        email: data.email || '',
                        message: data.message || ''
                    }
                }));
                
            } catch (error) {
                console.error('Ошибка обработки запроса:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Ошибка сервера' }));
            }
        });
        
        return;
    }
    
    // Статические файлы
    let filePath = `.${url}`;
    if (url === '/') {
        filePath = './index.html';
    }
    
    if (!existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Файл не найден');
        return;
    }
    
    try {
        const content = readFileSync(filePath);
        let contentType = 'text/plain';
        
        if (url.endsWith('.html')) contentType = 'text/html';
        else if (url.endsWith('.css')) contentType = 'text/css';
        else if (url.endsWith('.js')) contentType = 'application/javascript';
        else if (url.endsWith('.json')) contentType = 'application/json';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Ошибка чтения файла');
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Простой сервер запущен на http://localhost:${PORT}`);
    console.log(`📧 Отправка писем: http://localhost:${PORT}/send-mail-simple.php`);
    console.log(`📝 Тест формы: http://localhost:${PORT}/test-mail-form.html`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ Порт ${PORT} уже занят. Попробуйте другой порт.`);
    } else {
        console.log(`❌ Ошибка сервера: ${err.message}`);
    }
});