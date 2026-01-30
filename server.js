const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  // Health check для Railway
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'healthy', 
      service: 'AI Drone Creator Website',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Отдаём index.html для всех остальных запросов
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Ошибка сервера');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AI Drone Creator Website запущен на порту ${PORT}`);
  console.log(`🌐 Домен: ${process.env.RAILWAY_STATIC_URL || 'localhost'}`);
  console.log(`📅 ${new Date().toISOString()}`);
});

// Keep-alive для Railway
setInterval(() => {
  console.log(`✅ Сервер активен: ${new Date().toISOString()}`);
}, 30000);
