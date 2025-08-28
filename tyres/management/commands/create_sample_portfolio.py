from django.core.management.base import BaseCommand
from tyres.models import PortfolioItem
from django.core.files.base import ContentFile
import os
from django.conf import settings

class Command(BaseCommand):
    help = 'Create sample portfolio items for testing'

    def handle(self, *args, **options):
        # First, let's clear existing portfolio items to avoid duplicates
        PortfolioItem.objects.all().delete()
        self.stdout.write('Cleared existing portfolio items')
        
        # Sample portfolio items data with real image mappings
        sample_items = [
            {
                'title': 'Летние шины для легковых автомобилей',
                'description': 'Высококачественные летние шины с отличным сцеплением на сухой и мокрой дороге',
                'category': 'summer',
                'brand': 'Nokian',
                'size': '205/55R16',
                'price': 8500.00,
                'is_featured': True,
                'image_file': 'portfolio-1.webp'
            },
            {
                'title': 'Зимние шины с шипами',
                'description': 'Надежные зимние шины с металлическими шипами для максимального сцепления на льду',
                'category': 'winter',
                'brand': 'Nokian',
                'size': '225/45R17',
                'price': 12000.00,
                'is_featured': True,
                'image_file': 'NT-Winter-tire-maintenance-01.webp'
            },
            {
                'title': 'Всесезонные шины',
                'description': 'Универсальные шины для круглогодичного использования в умеренном климате',
                'category': 'all_season',
                'brand': 'Nokian',
                'size': '215/60R16',
                'price': 9500.00,
                'is_featured': False,
                'image_file': 'portfolio-2.webp'
            },
            {
                'title': 'Шины для внедорожников',
                'description': 'Прочные шины для внедорожников с агрессивным протектором',
                'category': 'suv',
                'brand': 'Nokian',
                'size': '265/70R17',
                'price': 18000.00,
                'is_featured': True,
                'image_file': 'Nokian_Tyres_Hakka_Blue_3_SUV_30.jpg'
            },
            {
                'title': 'Летние шины премиум класса',
                'description': 'Премиальные летние шины для спортивных автомобилей',
                'category': 'summer',
                'brand': 'Nokian',
                'size': '245/40R18',
                'price': 15000.00,
                'is_featured': True,
                'image_file': 'portfolio-4.webp'
            },
            {
                'title': 'Зимние шины липучка',
                'description': 'Зимние шины без шипов с мягким составом для отличного сцепления',
                'category': 'winter',
                'brand': 'Nokian',
                'size': '195/65R15',
                'price': 7500.00,
                'is_featured': False,
                'image_file': 'DSC08999.webp'
            },
            {
                'title': 'Всесезонные шины для кроссоверов',
                'description': 'Универсальные шины для кроссоверов с повышенной проходимостью',
                'category': 'all_season',
                'brand': 'Nokian',
                'size': '225/65R17',
                'price': 11000.00,
                'is_featured': False,
                'image_file': 'portfolio-5.webp'
            },
            {
                'title': 'Шины для тяжелых внедорожников',
                'description': 'Специализированные шины для тяжелых внедорожников и пикапов',
                'category': 'suv',
                'brand': 'Nokian',
                'size': '285/75R18',
                'price': 22000.00,
                'is_featured': True,
                'image_file': 'Nokian_Tyres_Hakka_Black_3_SUV_80.jpg'
            },
            {
                'title': 'Спортивные летние шины',
                'description': 'Высокопроизводительные шины для спортивного вождения',
                'category': 'summer',
                'brand': 'Nokian',
                'size': '255/35R19',
                'price': 18000.00,
                'is_featured': True,
                'image_file': 'portfolio-6.webp'
            },
            {
                'title': 'Зимние шины для грузовиков',
                'description': 'Надежные зимние шины для коммерческого транспорта',
                'category': 'winter',
                'brand': 'Nokian',
                'size': '225/75R16',
                'price': 14000.00,
                'is_featured': False,
                'image_file': 'DSC08379.webp'
            },
            {
                'title': 'Всесезонные шины для легковушек',
                'description': 'Универсальные шины для городских автомобилей',
                'category': 'all_season',
                'brand': 'Nokian',
                'size': '195/65R15',
                'price': 8000.00,
                'is_featured': False,
                'image_file': 'portfolio-7.webp'
            },
            {
                'title': 'Шины для пикапов',
                'description': 'Прочные шины для пикапов и легких грузовиков',
                'category': 'suv',
                'brand': 'Nokian',
                'size': '275/65R18',
                'price': 20000.00,
                'is_featured': True,
                'image_file': 'portfolio-8.webp'
            },
        ]

        created_count = 0
        for item_data in sample_items:
            try:
                # Get the image file path
                image_file = item_data.pop('image_file')  # Remove from dict
                image_path = os.path.join(settings.MEDIA_ROOT, 'portfolio', image_file)
                
                # Check if image file exists
                if not os.path.exists(image_path):
                    self.stdout.write(
                        self.style.WARNING(f'Image file not found: {image_file}')
                    )
                    continue
                
                # Create portfolio item
                portfolio_item = PortfolioItem.objects.create(
                    title=item_data['title'],
                    description=item_data['description'],
                    category=item_data['category'],
                    brand=item_data['brand'],
                    size=item_data['size'],
                    price=item_data['price'],
                    is_featured=item_data['is_featured'],
                )
                
                # Copy the real image file
                with open(image_path, 'rb') as f:
                    portfolio_item.image.save(
                        image_file,
                        ContentFile(f.read()),
                        save=True
                    )
                
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created portfolio item: {item_data["title"]} with image {image_file}')
                )
                
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Error creating item {item_data["title"]}: {str(e)}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} portfolio items')
        )
