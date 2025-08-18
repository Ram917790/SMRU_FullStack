from rest_framework import viewsets, generics, filters
from rest_framework.permissions import AllowAny
from .models import JobCategory, Job, Benefit, Application
from .serializers import (
    JobCategorySerializer, JobListSerializer, BenefitSerializer, ApplicationCreateSerializer
)
from rest_framework import viewsets, generics, permissions
from .models import Job, JobCategory, Benefit, Application
from .serializers import (
    JobCategorySerializer,
    JobSerializer,
    JobListSerializer,
    BenefitSerializer,
    ApplicationSerializer,       # now exists
    ApplicationCreateSerializer, # now exists
)

class JobCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobCategory.objects.all()
    serializer_class = JobCategorySerializer
    permission_classes = [AllowAny]

class JobViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = JobListSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering = ["-created_at"]

    def get_queryset(self):
        qs = Job.objects.filter(is_active=True).select_related("category")
        cat = self.request.query_params.get("category")
        if cat:
            qs = qs.filter(category__name__iexact=cat)
        return qs

class BenefitViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Benefit.objects.all()
    serializer_class = BenefitSerializer
    permission_classes = [AllowAny]

class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationCreateSerializer
    permission_classes = [AllowAny]
    parser_classes = []  # DRF will auto include MultiPart/JSON; left empty to use defaults
from rest_framework import viewsets, mixins, generics, parsers
from .models import JobCategory, Job, Benefit, Application
from .serializers import (
    JobCategorySerializer, JobSerializer,
    BenefitSerializer, ApplicationSerializer
)

class BenefitViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Benefit.objects.all().order_by("sort_order", "title")
    serializer_class = BenefitSerializer

class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    parser_classes = (parsers.MultiPartParser, parsers.FormParser,)  # allow file upload

from .serializers import (
    JobCategorySerializer,
    JobSerializer,
    BenefitSerializer,
    ApplicationSerializer,
     JobListSerializer,   
)
