from django.contrib import admin
from .models import Job, Application, JobCategory, Benefit

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display  = ("id", "title", "category", "location", "is_active", "sort_order", "created_at")
    list_filter   = ("is_active", "category", "location")
    search_fields = ("title", "slug", "location")
    ordering      = ("-created_at",)

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    autocomplete_fields = ["job"]  # FK exists and JobAdmin is registered
    list_display = ("id", "job", "full_name", "email", "phone", "status", "created_at")
    list_filter  = ("status", "created_at")
    search_fields = ("full_name", "email", "phone", "message")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)

@admin.register(JobCategory)
class JobCategoryAdmin(admin.ModelAdmin):
    search_fields = ("id",)

@admin.register(Benefit)
class BenefitAdmin(admin.ModelAdmin):
    search_fields = ("id",)
