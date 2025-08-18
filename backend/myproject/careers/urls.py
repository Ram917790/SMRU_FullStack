from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobCategoryViewSet, JobViewSet, BenefitViewSet, ApplicationCreateView

router = DefaultRouter()
router.register(r"job-categories", JobCategoryViewSet, basename="job-category")
router.register(r"jobs", JobViewSet, basename="job")
router.register(r"benefits", BenefitViewSet, basename="benefit")

urlpatterns = [
    path("", include(router.urls)),
    path("applications/", ApplicationCreateView.as_view(), name="application-create"),
]
