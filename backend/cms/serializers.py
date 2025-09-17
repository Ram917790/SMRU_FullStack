from rest_framework import serializers
from . import models

class LeaderSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)
    
    class Meta:
        model = models.Leader
        fields = ["id", "name", "role", "about", "profile_image", "email", "phone", "qualifications", "experience", "viewProfileEnabled", "slug", "order"]

class LeadershipGroupSerializer(serializers.ModelSerializer):
    leaders = LeaderSerializer(many=True, read_only=True)
    
    class Meta:
        model = models.LeadershipGroup
        fields = ["id", "name", "description", "order", "leaders"]

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Program
        fields = ["id","name","slug","degree","duration","mode","summary","order"]

class DepartmentSerializer(serializers.ModelSerializer):
    programs = ProgramSerializer(many=True, read_only=True)
    class Meta:
        model = models.Department
        fields = ["id","name","slug","summary","order","programs"]

class SchoolListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.School
        fields = ["id","name","slug","tagline","summary","icon_url","order"]

class SchoolDetailSerializer(serializers.ModelSerializer):
    departments = DepartmentSerializer(many=True, read_only=True)
    class Meta:
        model = models.School
        fields = ["id","name","slug","tagline","summary","icon_url","order","departments"]

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Job
        fields = ["id","title","category","employment_type","location","description_short","description","apply_url","posted_on","is_active","order"]
