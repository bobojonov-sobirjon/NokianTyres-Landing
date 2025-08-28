from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .forms import TireApplicationForm
from .models import TireApplication, PortfolioItem
import json

def index(request):
    """Main index page view"""
    # Get portfolio items from database grouped by category
    portfolio_items = PortfolioItem.objects.all().order_by('-created_at')
    
    # Get unique categories for filtering
    categories = PortfolioItem.CATEGORY_CHOICES
    
    # Group items by category for easier template handling
    portfolio_by_category = {}
    for category_code, category_name in categories:
        portfolio_by_category[category_code] = portfolio_items.filter(category=category_code)
    
    context = {
        'portfolio_items': portfolio_items,
        'portfolio_by_category': portfolio_by_category,
        'categories': categories,
    }
    
    return render(request, 'index2.html', context)

def tire_selection(request):
    """Tire selection page"""
    return render(request, 'tire-selection.html')

@csrf_exempt
def save_tire_application(request):
    """Save tire application via AJAX"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Validate required fields
            if not data.get('full_name') or not data.get('phone'):
                return JsonResponse({
                    'success': False,
                    'message': 'ФИО и телефон обязательны для заполнения'
                })
            
            # Create new application
            application = TireApplication(
                selection_type=data.get('selection_type', 'by_car'),
                car_make=data.get('car_make', ''),
                car_model=data.get('car_model', ''),
                tire_width=data.get('tire_width'),
                tire_profile=data.get('tire_profile'),
                tire_radius=data.get('tire_radius'),
                season=data.get('season', 'summer'),
                winter_type=data.get('winter_type', ''),
                budget=data.get('budget', 'optimum'),
                priority=data.get('priority', 'comfort'),
                full_name=data.get('full_name', ''),
                phone=data.get('phone', ''),
                email=data.get('email', '')
            )
            
            # Convert string values to integers for numeric fields
            if application.tire_width and str(application.tire_width).isdigit():
                application.tire_width = int(application.tire_width)
            if application.tire_profile and str(application.tire_profile).isdigit():
                application.tire_profile = int(application.tire_profile)
            if application.tire_radius and str(application.tire_radius).isdigit():
                application.tire_radius = int(application.tire_radius)
            
            application.save()
            
            return JsonResponse({
                'success': True,
                'message': 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
                'application_id': application.id
            })
            
        except Exception as e:
            print(f"Error saving application: {str(e)}")  # Debug logging
            return JsonResponse({
                'success': False,
                'message': f'Ошибка при сохранении: {str(e)}'
            })
    
    return JsonResponse({
        'success': False,
        'message': 'Метод не поддерживается'
    })

def custom_404(request, exception):
    """Custom 404 error page view"""
    return render(request, '404.html', status=404)

