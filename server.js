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
