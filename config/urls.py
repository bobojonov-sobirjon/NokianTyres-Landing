from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
# from django.conf.urls.i18n import i18n_patterns
from django.views.static import serve
# from apps.e_book.views import custom_404

urlpatterns = [
    # path('i18n/', include('django.conf.urls.i18n')),
    path('admin/', admin.site.urls),
    # path('ckeditor/', include('ckeditor_uploader.urls')),
    path('', include('tyres.urls')),
]

handler404 = 'tyres.views.custom_404'

# Static files are now served by whitenoise middleware
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT, }, ), ]

# handler404 = 'apps.e_book.views.custom_404'