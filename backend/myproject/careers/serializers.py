from rest_framework import serializers
from .models import Job, JobCategory, Benefit, Application

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = "__all__"

class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefit
        fields = "__all__"

# Full Job detail
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"

# Lightweight list serializer (safe: use "__all__"; or list only a few)
class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ["id", "title", "slug", "category", "location", "is_active", "sort_order", "created_at", "updated_at"]

# READ applications
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"

# CREATE applications (can be the same as above)
class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"
