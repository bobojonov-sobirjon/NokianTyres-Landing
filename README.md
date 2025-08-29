# Nokian Tyres Landing Page - Россия

Этот проект представляет собой landing page для компании Nokian Tyres, созданный для продажи премиальных автомобильных шин на российском рынке.

## 🚀 Особенности

- **SEO Оптимизация**: Соответствует требованиям Yandex.Direct
- **Responsive Дизайн**: Отлично выглядит на всех устройствах
- **Tire Selection Form**: Подбор шин по автомобилю
- **Portfolio Management**: Показ продукции
- **Contact Forms**: Связь с клиентами
- **Multi-language Support**: Русский и английский языки

## 📱 SEO Оптимизация

### Meta Tags
- Title: "Nokian Tyres - Премиальные шины для легковых автомобилей | Москва, Россия"
- Description: Менее 160 символов
- Keywords: Релевантные ключевые слова на русском языке
- Open Graph и Twitter Cards

### Structured Data
- Schema.org разметка
- Информация об организации
- Контактные данные
- Ссылки на социальные сети

### Technical SEO
- robots.txt
- sitemap.xml
- .htaccess оптимизация
- Alt теги для изображений
- H1-H6 структура

## 🛠️ Технологии

- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend**: Django (Python)
- **Database**: SQLite
- **Static Files**: Django Static Files
- **Deployment**: Gunicorn + Nginx

## 📁 Структура файлов

```
NokianTyres-Landing/
├── config/                 # Django настройки
├── tyres/                  # Основное приложение
├── templates/              # HTML шаблоны
│   ├── index2.html        # Главная landing page
│   ├── tire-selection.html
│   └── 404.html
├── static/                 # Статические файлы
│   ├── assets/            # CSS, JS, изображения
│   └── file/              # Дополнительные ресурсы
├── media/                  # Загруженные пользователем файлы
├── robots.txt             # SEO robots файл
├── sitemap.xml            # SEO sitemap
├── .htaccess              # Apache конфигурация
└── requirements.txt        # Python зависимости
```

## 🚀 Установка

1. **Клонировать репозиторий:**
```bash
git clone https://github.com/your-username/NokianTyres-Landing.git
cd NokianTyres-Landing
```

2. **Создать виртуальное окружение:**
```bash
python -m venv env
source env/bin/activate  # Linux/Mac
env\Scripts\activate     # Windows
```

3. **Установить зависимости:**
```bash
pip install -r requirements.txt
```

4. **Выполнить миграции базы данных:**
```bash
python manage.py migrate
```

5. **Создать суперпользователя:**
```bash
python manage.py createsuperuser
```

6. **Запустить сервер:**
```bash
python manage.py runserver
```

## 📊 Требования Yandex.Direct

### ✅ Выполнено
- [x] Meta description (менее 160 символов)
- [x] Title tag оптимизация
- [x] Keywords на русском языке
- [x] H1-H6 структура
- [x] Alt теги
- [x] Schema markup
- [x] Open Graph теги
- [x] robots.txt
- [x] sitemap.xml

### 🔧 Требуется дополнительно
- [ ] Код Yandex.Метрики
- [ ] Yandex.Webmaster верификация
- [ ] Оптимизация скорости страницы
- [ ] Core Web Vitals

## 🌐 Развертывание

### Production Server
```bash
# Установка Gunicorn
pip install gunicorn

# Запуск сервера
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name nokiantyres.ru;
    
    location /static/ {
        alias /path/to/your/static/;
    }
    
    location /media/ {
        alias /path/to/your/media/;
    }
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📞 Контакты

- **Developer**: Sobir_dev
- **Email**: info@nokiantyres.ru
- **Phone**: +7 (495) 123-45-67
- **Website**: https://nokiantyres.ru

## 📄 Лицензия

Этот проект специально создан для компании Nokian Tyres. Все права защищены.

---

**Примечание**: Этот проект оптимизирован для SEO в соответствии с требованиями Yandex.Direct и предназначен для российского рынка.

