import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Раздаем статические файлы
app.use(express.static(__dirname));

// Все запросы направляем на index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 AI Drone Creator Website запущен на порту ${PORT}`);
  console.log(`🌐 Ссылка: http://localhost:${PORT}`);
});
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Раздаем статические файлы
app.use(express.static(__dirname));

// Все запросы направляем на index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// Health check endpoint для Railway
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'AI Drone Creator Website',
    timestamp: new Date().toISOString()
  });
});

// Запуск сервера
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AI Drone Creator Website запущен`);
  console.log(`🌐 Порт: ${PORT}`);
  console.log(`📅 Время запуска: ${new Date().toISOString()}`);
  console.log(`✅ Готов к работе!`);
});

// Keep-alive для Railway
setInterval(() => {
  console.log(`🟢 Сервер активен: ${new Date().toISOString()}`);
}, 30000); // Каждые 30 секунд

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Получен SIGTERM, останавливаю сервер...');
  server.close(() => {
    console.log('✅ Сервер остановлен');
    process.exit(0);
  });
});
