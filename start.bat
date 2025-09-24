@echo off
echo Запуск проекта...
echo.

REM Запускаем сервер отправки писем
start "Mail Server" cmd /k "node mail-server.js"

echo.
echo Сервер писем запущен на http://localhost:3000
echo.

REM Запускаем сайт
start "Vite Dev Server" cmd /k "pnpm run dev"

echo.
echo Сайт запущен на http://localhost:5173
echo.
echo Нажмите любую клавишу для выхода...
pause >nul
