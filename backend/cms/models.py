from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# ---------- ABOUT → Leadership (dynamic) ----------
class LeadershipGroup(TimeStampedModel):
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("order", "id")

    def __str__(self):
        return self.name


class Leader(TimeStampedModel):
    group = models.ForeignKey(
        LeadershipGroup, related_name="leaders", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=140)
    role = models.CharField(max_length=140, blank=True)
    about = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='leadership/', blank=True, null=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    qualifications = models.TextField(blank=True, help_text="Educational qualifications and certifications")
    experience = models.TextField(blank=True, help_text="Professional experience and achievements")
    viewProfileEnabled = models.BooleanField(default=True, help_text="Show 'View Profile' button on frontend")
    slug = models.SlugField(max_length=160, blank=True, unique=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("group", "order", "name")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


# ---------- SCHOOLS → Departments → Programs (dynamic) ----------
class School(TimeStampedModel):
    name = models.CharField(max_length=160, unique=True)
    about = models.TextField(blank=True)
    slug = models.SlugField(max_length=180, blank=True, unique=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("order", "name")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Department(TimeStampedModel):
    school = models.ForeignKey(
        School, related_name="departments", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=160)
    about = models.TextField(blank=True)
    slug = models.SlugField(max_length=180, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("school", "slug")
        ordering = ("school", "order", "name")

    def __str__(self):
        return f"{self.school} • {self.name}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Program(TimeStampedModel):
    department = models.ForeignKey(
        Department, related_name="programs", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200)
    level = models.CharField(max_length=120, blank=True)
    overview = models.TextField(blank=True)
    duration = models.CharField(max_length=120, blank=True)
    eligibility = models.TextField(blank=True)
    fees = models.CharField(max_length=120, blank=True)
    outcomes = models.TextField(blank=True)
    specializations = models.TextField(
        blank=True, help_text="Comma-separated list (e.g., Neuro, Ortho, ...)"
    )
    accreditation = models.TextField(blank=True)
    slug = models.SlugField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("department", "slug")
        ordering = ("department", "order", "name")

    def __str__(self):
        return f"{self.department} • {self.name}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


# ---------- CAREERS → Job Openings (dynamic) ----------
class JobPosting(TimeStampedModel):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=120, blank=True)
    category_name = models.CharField(max_length=120, blank=True)
    summary = models.TextField(blank=True)
    details = models.TextField(blank=True, help_text="One bullet per line.")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("-is_active", "order", "-created_at")

    def __str__(self):
        return self.title
