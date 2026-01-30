const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  console.log(`📨 Запрос: ${req.method} ${req.url}`);
  
  // Обработка /health
  if (req.url === '/health' || req.url === '/health/') {
    res.writeHead(200, { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
      status: 'healthy',
      service: 'AI Drone Creator Website',
      timestamp: new Date().toISOString(),
      port: PORT,
      environment: process.env.NODE_ENV || 'production'
    }));
    return;
  }
  
  // Обработка корня /
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
      } else {
        res.writeHead(200, { 
          'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(content);
      }
    });
    return;
  }
  
  // Любой другой запрос → 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    error: 'Not Found',
    message: 'Страница не найдена',
    available: ['/', '/health', '/index.html']
  }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AI Drone Creator Website запущен`);
  console.log(`🌐 Порт: ${PORT}`);
  console.log(`✅ Готов к работе!`);
  console.log(`📅 ${new Date().toISOString()}`);
  console.log(`🔗 Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`🔗 Главная: http://0.0.0.0:${PORT}/`);
});

// Keep-alive логи
setInterval(() => {
  console.log(`✅ Сервер активен: ${new Date().toISOString()}`);
}, 30000);

// Обработка SIGTERM для Railway
process.on('SIGTERM', () => {
  console.log('🛑 Получен SIGTERM, останавливаю сервер...');
  server.close(() => {
    console.log('✅ Сервер остановлен');
    process.exit(0);
  });
});
