from django import forms
from .models import TireApplication

class TireApplicationForm(forms.ModelForm):
    # Hidden fields for step tracking
    current_step = forms.CharField(widget=forms.HiddenInput(), initial='selection_type')
    
    class Meta:
        model = TireApplication
        fields = [
            'selection_type', 'car_make', 'car_model', 'tire_width', 'tire_profile', 'tire_radius',
            'season', 'winter_type', 'budget', 'priority', 'full_name', 'phone', 'email'
        ]
        widgets = {
            'selection_type': forms.HiddenInput(),
            'car_make': forms.Select(attrs={
                'class': 'form-select',
                'placeholder': 'Выберите марку'
            }),
            'car_model': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Camry, X5, A4...'
            }),
            'tire_width': forms.Select(attrs={
                'class': 'form-select',
                'placeholder': '---'
            }),
            'tire_profile': forms.Select(attrs={
                'class': 'form-select',
                'placeholder': '---'
            }),
            'tire_radius': forms.Select(attrs={
                'class': 'form-select',
                'placeholder': 'R--'
            }),
            'season': forms.HiddenInput(),
            'winter_type': forms.HiddenInput(),
            'budget': forms.HiddenInput(),
            'priority': forms.HiddenInput(),
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Введите ваше полное имя'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '+7 (999) 999-99-99'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'example@email.com'
            })
        }
        labels = {
            'car_make': 'Марка',
            'car_model': 'Модель',
            'tire_width': 'Ширина',
            'tire_profile': 'Профиль',
            'tire_radius': 'Радиус',
            'full_name': 'ФИО',
            'phone': 'Телефон',
            'email': 'Email'
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Car makes choices
        car_makes = [
            ('', 'Выберите марку'),
            ('toyota', 'Toyota'),
            ('bmw', 'BMW'),
            ('mercedes', 'Mercedes'),
            ('audi', 'Audi'),
            ('volkswagen', 'Volkswagen'),
            ('hyundai', 'Hyundai'),
            ('kia', 'Kia'),
            ('lada', 'Лада'),
            ('renault', 'Renault'),
            ('ford', 'Ford'),
            ('other', 'Другая'),
        ]
        self.fields['car_make'].choices = car_makes
        
        # Tire width choices (175 to 245)
        width_choices = [('', '---')] + [(str(i), str(i)) for i in range(175, 250, 10)]
        self.fields['tire_width'].choices = width_choices
        
        # Tire profile choices (40 to 70)
        profile_choices = [('', '---')] + [(str(i), str(i)) for i in range(40, 75, 5)]
        self.fields['tire_profile'].choices = profile_choices
        
        # Tire radius choices (R14 to R20)
        radius_choices = [('', 'R--')] + [(str(i), f'R{i}') for i in range(14, 21)]
        self.fields['tire_radius'].choices = radius_choices
