from rest_framework import viewsets, permissions
from .models import TeamMember
from .serializers import TeamMemberSerializer

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.filter(is_active=True).order_by("order","name")
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.AllowAny]
