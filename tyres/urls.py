from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('save-application/', views.save_tire_application, name='save_application'),
    path('tire-selection/', views.tire_selection, name='tire_selection'),
]