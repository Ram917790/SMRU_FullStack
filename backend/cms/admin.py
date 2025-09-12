# backend/cms/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import LeadershipGroup, Leader, School, Department, Program, JobPosting

# ---------- Admin Site Branding ----------
admin.site.site_header = "SMRU Admin"
admin.site.site_title = "SMRU Admin"
admin.site.index_title = "Content Management"

# ---------- Mixins ----------
class BrandAdminMixin:
    class Media:
        css = {"all": ("admin/custom.css",)}  # optional: backend/static/admin/custom.css

# ---------- Leadership ----------
@admin.register(LeadershipGroup)
class LeadershipGroupAdmin(BrandAdminMixin, admin.ModelAdmin):
    # No 'slug' here because the model doesn't have it
    list_display = ("name", "order", "created_at_display")
    list_editable = ("order",)
    search_fields = ("name",)
    ordering = ("order", "id")
    list_per_page = 25

    def created_at_display(self, obj):
        return getattr(obj, "created_at", None)
    created_at_display.short_description = "Created"

@admin.register(Leader)
class LeaderAdmin(BrandAdminMixin, admin.ModelAdmin):
    list_display = ("name", "role", "group", "thumb", "slug", "order", "is_active_display")
    list_filter = ("group",)
    search_fields = ("name", "role", "slug")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("group__order", "order", "id")
    list_editable = ("order",)
    fieldsets = (
        ("Primary", {"fields": ("name", "role", "group", "slug", "order")}),
        ("Profile", {"fields": ("about", "bio")}),
        ("Photo", {"fields": ("image_url",)}),
    )
    save_on_top = True

    def thumb(self, obj):
        url = getattr(obj, "image_url", "") or ""
        if not url:
            return "-"
        return format_html(
            '<img src="{}" style="height:40px;width:40px;object-fit:cover;border-radius:6px"/>',
            url,
        )
    thumb.short_description = "Photo"

    def is_active_display(self, obj):
        return getattr(obj, "is_active", True)
    is_active_display.boolean = True
    is_active_display.short_description = "Active"

# ---------- Schools / Departments / Programs ----------
class ProgramInline(admin.TabularInline):
    model = Program
    extra = 0
    fields = ("name", "slug", "level", "duration", "fees")
    show_change_link = True
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Department)
class DepartmentAdmin(BrandAdminMixin, admin.ModelAdmin):
    list_display = ("name", "school", "slug", "program_count", "created_at_display")
    list_filter = ("school",)
    search_fields = ("name", "slug", "school__name")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("school__id", "id")
    inlines = (ProgramInline,)
    fieldsets = (
        ("Primary", {"fields": ("school", "name", "slug")}),
        # 🔧 FIX: remove 'description' (model doesn't have it)
        ("About", {"fields": ("about",)}),
    )
    list_per_page = 25

    def program_count(self, obj):
        return Program.objects.filter(department=obj).count()
    program_count.short_description = "Programs"

    def created_at_display(self, obj):
        return getattr(obj, "created_at", None)
    created_at_display.short_description = "Created"

class DepartmentInline(admin.StackedInline):
    model = Department
    extra = 0
    # 🔧 FIX: remove 'description' here as well
    fields = ("name", "slug", "about")
    show_change_link = True
    prepopulated_fields = {"slug": ("name",)}

@admin.register(School)
class SchoolAdmin(BrandAdminMixin, admin.ModelAdmin):
    list_display = ("name", "slug", "dept_count", "created_at_display")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("id",)
    inlines = (DepartmentInline,)
    fieldsets = (
        ("Primary", {"fields": ("name", "slug")}),
        ("About", {"fields": ("about",)}),
    )

    def dept_count(self, obj):
        return Department.objects.filter(school=obj).count()
    dept_count.short_description = "Departments"

    def created_at_display(self, obj):
        return getattr(obj, "created_at", None)
    created_at_display.short_description = "Created"

@admin.register(Program)
class ProgramAdmin(BrandAdminMixin, admin.ModelAdmin):
    list_display = ("name", "department", "level", "duration", "fees", "slug")
    list_filter = ("department__school", "department", "level")
    search_fields = ("name", "slug", "department__name", "department__school__name")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("department__school__id", "department__id", "id")
    fieldsets = (
        ("Primary", {"fields": ("department", "name", "slug")}),
        ("Meta", {"fields": ("level", "duration", "fees")}),
        ("Content", {"fields": ("overview", "eligibility", "outcomes", "accreditation", "specializations")}),
    )

# ---------- Jobs ----------
@admin.action(description="Mark selected jobs as active")
def mark_jobs_active(modeladmin, request, queryset):
    queryset.update(is_active=True)

@admin.action(description="Mark selected jobs as inactive")
def mark_jobs_inactive(modeladmin, request, queryset):
    queryset.update(is_active=False)

@admin.register(JobPosting)
class JobPostingAdmin(BrandAdminMixin, admin.ModelAdmin):
    list_display = ("title", "category_name", "location", "is_active", "created_at")
    list_filter = ("is_active", "category_name", "location")
    search_fields = ("title", "summary", "category_name", "location")
    ordering = ("-created_at", "-id")
    actions = (mark_jobs_active, mark_jobs_inactive)
    fieldsets = (
        ("Primary", {"fields": ("title", "category_name", "location", "is_active")}),
        ("Content", {"fields": ("summary", "details")}),
    )
    save_as = True
    save_on_top = True
