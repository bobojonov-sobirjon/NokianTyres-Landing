from django.contrib import admin
from .models import TireApplication, PortfolioItem
from django.contrib.auth.models import Group

# @admin.register(TireApplication)
# class TireApplicationAdmin(admin.ModelAdmin):
#     list_display = ['full_name', 'phone', 'email', 'selection_type', 'season', 'budget', 'priority', 'created_at', 'is_processed']
#     list_filter = ['selection_type', 'season', 'budget', 'priority', 'is_processed', 'created_at']
#     search_fields = ['full_name', 'phone', 'email', 'car_make', 'car_model']
#     readonly_fields = ['created_at']
#     list_editable = ['is_processed']

#     fieldsets = (
#         ('Способ подбора', {
#             'fields': ('selection_type',)
#         }),
#         ('Информация об автомобиле', {
#             'fields': ('car_make', 'car_model'),
#             'classes': ('collapse',)
#         }),
#         ('Размер шин', {
#             'fields': ('tire_width', 'tire_profile', 'tire_radius'),
#             'classes': ('collapse',)
#         }),
#         ('Предпочтения', {
#             'fields': ('season', 'winter_type', 'budget', 'priority')
#         }),
#         ('Контактная информация', {
#             'fields': ('full_name', 'phone', 'email')
#         }),
#         ('Статус', {
#             'fields': ('is_processed', 'created_at')
#         }),
#     )


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'brand', 'size', 'price', 'is_featured', 'created_at']
    list_filter = ['category', 'brand', 'is_featured', 'created_at']
    search_fields = ['title', 'description', 'brand']
    list_editable = ['is_featured', 'price']
    readonly_fields = ['created_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'description', 'category', 'image')
        }),
        ('Технические характеристики', {
            'fields': ('brand', 'size', 'price')
        }),
        ('Статус', {
            'fields': ('is_featured', 'created_at')
        }),
    )


# Unregister Group model if it's registered
try:
    admin.site.unregister(Group)
except admin.sites.NotRegistered:
    pass  # Group model is not registered, which is fine