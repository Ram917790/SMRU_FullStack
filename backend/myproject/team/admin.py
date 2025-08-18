from django.contrib import admin
from .models import TeamMember

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "department", "is_full_time", "is_active", "order")
    list_filter = ("is_full_time", "is_active", "department")
    search_fields = ("name", "role", "department")
    ordering = ("order", "name")
