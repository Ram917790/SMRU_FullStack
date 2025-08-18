# backend/myproject/myproject/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse  # add this

def home(_request):                    # add this
    return HttpResponse("API is running. Try /admin or /api/team-members/")

urlpatterns = [
    path("", home),                    # <-- add this line
    path("admin/", admin.site.urls),
    path("api/", include("team.api_urls")),
    path("api/careers/", include("careers.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
