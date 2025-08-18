from django.db import models
from django.utils import timezone
from django.utils.text import slugify

def unique_slugify(instance, value, slug_field_name="slug", max_length=140):
    """
    Create a unique slug by appending -2, -3, ... if needed.
    """
    slug = slugify(value)[:max_length].strip("-")
    ModelClass = instance.__class__
    unique_slug = slug
    counter = 2
    while ModelClass.objects.filter(**{slug_field_name: unique_slug}).exclude(pk=instance.pk).exists():
        suffix = f"-{counter}"
        unique_slug = f"{slug[:max_length - len(suffix)]}{suffix}"
        counter += 1
    return unique_slug

class JobCategory(models.Model):
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Job category"
        verbose_name_plural = "Job categories"
        ordering = ("name",)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Job(models.Model):
    title = models.CharField(max_length=160)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    category = models.ForeignKey(JobCategory, on_delete=models.PROTECT, related_name="jobs")
    location = models.CharField(max_length=160, blank=True)
    description = models.TextField(blank=True)
    details = models.JSONField(blank=True, null=True)  # optional; can store bullet points
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("sort_order", "-created_at")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
class Benefit(models.Model):
    title = models.CharField(max_length=140)
    icon = models.CharField(max_length=60, blank=True)  # optional icon key you map on FE
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("sort_order", "title")

    def __str__(self):
        return self.title


class Application(models.Model):
    # tie to a job (nullable in case it’s general)
    job = models.ForeignKey(Job, on_delete=models.SET_NULL, null=True, blank=True, related_name="applications")
    full_name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    message = models.TextField(blank=True)
    cv_file = models.FileField(upload_to="applications/cv/", blank=True, null=True)  # requires MEDIA settings
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    STATUS_CHOICES = (("new", "New"), ("review", "In review"), ("closed", "Closed"))
    status = models.CharField(max_length=12, choices=STATUS_CHOICES, default="new")

    def __str__(self):
        return f"{self.full_name} ({self.email})"
