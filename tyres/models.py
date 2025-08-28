from django.db import models

# Create your models here.

class TireApplication(models.Model):
    SELECTION_TYPE_CHOICES = [
        ('by_size', 'Подбор по размерам'),
        ('by_car', 'Подбор по автомобилю'),
    ]
    
    SEASON_CHOICES = [
        ('summer', 'Летние'),
        ('winter', 'Зимние'),
        ('all_season', 'Всесезонные'),
    ]
    
    WINTER_TYPE_CHOICES = [
        ('spikes', 'Шипы'),
        ('friction', 'Липучка'),
    ]
    
    BUDGET_CHOICES = [
        ('economy', 'До 15,000₽'),
        ('optimum', '15-25,000₽'),
        ('premium', '25,000₽+'),
    ]
    
    PRIORITY_CHOICES = [
        ('safety', 'Безопасность'),
        ('comfort', 'Комфорт'),
        ('sport', 'Спорт'),
        ('economy', 'Экономия'),
    ]
    
    # Selection method
    selection_type = models.CharField(max_length=20, choices=SELECTION_TYPE_CHOICES, verbose_name='Способ подбора', default='by_car')
    
    # Car information (for car-based selection)
    car_make = models.CharField(max_length=100, verbose_name='Марка автомобиля', blank=True, null=True)
    car_model = models.CharField(max_length=100, verbose_name='Модель автомобиля', blank=True, null=True)
    
    # Tire specifications (for size-based selection)
    tire_width = models.IntegerField(verbose_name='Ширина шины (мм)', blank=True, null=True)
    tire_profile = models.IntegerField(verbose_name='Профиль шины (%)', blank=True, null=True)
    tire_radius = models.IntegerField(verbose_name='Радиус шины (дюймы)', blank=True, null=True)
    
    # Tire preferences
    season = models.CharField(max_length=20, choices=SEASON_CHOICES, verbose_name='Сезон использования', default='summer')
    winter_type = models.CharField(max_length=20, choices=WINTER_TYPE_CHOICES, verbose_name='Тип зимних шин', blank=True, null=True)
    
    # User preferences
    budget = models.CharField(max_length=20, choices=BUDGET_CHOICES, verbose_name='Бюджет на комплект', default='optimum')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, verbose_name='Приоритет', default='comfort')
    
    # Contact information
    full_name = models.CharField(max_length=200, verbose_name='ФИО')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    email = models.EmailField(verbose_name='Email')
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    is_processed = models.BooleanField(default=False, verbose_name='Обработано')
    
    class Meta:
        verbose_name = 'Заявка на подбор шин'
        verbose_name_plural = 'Заявки на подбор шин'
        ordering = ['-created_at']
    
    def __str__(self):
        if self.selection_type == 'by_car':
            return f"Заявка по автомобилю {self.car_make} {self.car_model} - {self.get_season_display()}"
        else:
            return f"Заявка по размеру {self.tire_width}/{self.tire_profile}R{self.tire_radius} - {self.get_season_display()}"


class PortfolioItem(models.Model):
    CATEGORY_CHOICES = [
        ('all', 'Все шины'),
        ('summer', 'Летние шины'),
        ('winter', 'Зимние шины'),
        ('all_season', 'Всесезонные'),
        ('suv', 'Внедорожники'),
    ]
    
    title = models.CharField(max_length=200, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name='Категория', default='all')
    image = models.ImageField(upload_to='portfolio/', verbose_name='Изображение')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена', null=True, blank=True)
    size = models.CharField(max_length=50, verbose_name='Размер', null=True, blank=True)
    brand = models.CharField(max_length=100, verbose_name='Бренд', default='Nokian')
    is_featured = models.BooleanField(default=False, verbose_name='Рекомендуемые')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    
    class Meta:
        verbose_name = 'Портфолио'
        verbose_name_plural = 'Портфолио'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.get_category_display()}"
    
    def get_filter_class(self):
        """Return the CSS filter class for isotope filtering"""
        return f"filter-{self.category}"
