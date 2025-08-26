from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from tyres.models import PortfolioItem
import os

class Command(BaseCommand):
    help = 'Populate portfolio with sample tire data'

    def handle(self, *args, **options):
        # Sample tire data
        sample_tires = [
            {
                'title': 'Nokian Hakkapeliitta R5',
                'description': 'Высококачественные зимние шины с отличным сцеплением на льду и снегу. Идеально подходят для экстремальных зимних условий.',
                'category': 'winter',
                'price': 12500.00,
                'size': '205/55R16',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian Hakkapeliitta 10',
                'description': 'Премиум зимние шины с шипами для максимальной безопасности на зимних дорогах. Отличное торможение и управление.',
                'category': 'winter',
                'price': 15800.00,
                'size': '225/45R17',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian eNTYRE 2.0',
                'description': 'Экологичные летние шины с низким сопротивлением качению. Идеально подходят для городской езды и экономии топлива.',
                'category': 'summer',
                'price': 9800.00,
                'size': '195/65R15',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian WR G4',
                'description': 'Всесезонные шины с отличными характеристиками в любое время года. Универсальное решение для умеренного климата.',
                'category': 'all_season',
                'price': 11200.00,
                'size': '215/55R16',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian Rotiiva AT Plus',
                'description': 'Внедорожные шины для SUV и кроссоверов. Отличная проходимость по бездорожью и комфорт на асфальте.',
                'category': 'suv',
                'price': 18900.00,
                'size': '235/65R17',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian Hakkapeliitta R5 SUV',
                'description': 'Зимние шины специально для внедорожников. Максимальная безопасность и контроль на зимних дорогах.',
                'category': 'suv',
                'price': 22500.00,
                'size': '245/70R17',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian Line',
                'description': 'Экономичные летние шины для легковых автомобилей. Отличное соотношение цена-качество для повседневной езды.',
                'category': 'passenger',
                'price': 7500.00,
                'size': '185/70R14',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian Nordman 7',
                'description': 'Доступные зимние шины для легковых автомобилей. Надежное сцепление на зимних дорогах по доступной цене.',
                'category': 'passenger',
                'price': 8900.00,
                'size': '195/65R15',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian Hakkapeliitta R5 SUV XL',
                'description': 'Усиленные зимние шины для тяжелых внедорожников. Максимальная грузоподъемность и безопасность.',
                'category': 'suv',
                'price': 28900.00,
                'size': '265/70R18',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian eNTYRE 2.0 SUV',
                'description': 'Экологичные летние шины для внедорожников. Низкое сопротивление качению для экономии топлива.',
                'category': 'suv',
                'price': 16800.00,
                'size': '225/65R17',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian WR G4 SUV',
                'description': 'Всесезонные шины для внедорожников. Универсальное решение для любых погодных условий.',
                'category': 'suv',
                'price': 19800.00,
                'size': '235/65R17',
                'brand': 'Nokian',
                'is_featured': True,
            },
            {
                'title': 'Nokian Hakkapeliitta R5 XL',
                'description': 'Усиленные зимние шины для легковых автомобилей. Максимальная безопасность и долговечность.',
                'category': 'passenger',
                'price': 13500.00,
                'size': '205/55R16',
                'brand': 'Nokian',
                'is_featured': True,
            }
        ]

        # Create a default image (placeholder)
        default_image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x00\x00\x02\x00\x01\xe5\x27\xde\xfc\x00\x00\x00\x00IEND\xaeB`\x82'
        default_image = ContentFile(default_image_content, name='default_tire.png')

        created_count = 0
        for tire_data in sample_tires:
            # Check if tire already exists
            if not PortfolioItem.objects.filter(title=tire_data['title']).exists():
                portfolio_item = PortfolioItem(
                    title=tire_data['title'],
                    description=tire_data['description'],
                    category=tire_data['category'],
                    price=tire_data['price'],
                    size=tire_data['size'],
                    brand=tire_data['brand'],
                    is_featured=tire_data['is_featured']
                )
                
                # Save without image first
                portfolio_item.save()
                
                # Add default image
                portfolio_item.image.save('default_tire.png', default_image, save=True)
                
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created: {tire_data["title"]} - {tire_data["category"]}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Skipped (already exists): {tire_data["title"]}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} portfolio items!')
        )
