from rest_framework import serializers
from .models import TeamMember

class TeamMemberSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=True, allow_null=True, required=False)

    class Meta:
        model = TeamMember
        fields = ["id","name","role","department","bio","photo","is_full_time","order"]
