from django.urls import path
from . import views

urlpatterns = [
    path("", views.api_index, name="api-index"),
    path("leadership/", views.leadership, name="leadership"),
    path("jobs/", views.jobs, name="jobs"),
    path("schools/", views.schools, name="schools"),
    path("schools/<slug:school_slug>/", views.school_detail, name="school-detail"),
    path("schools/<slug:school_slug>/<slug:dept_slug>/", views.department_detail, name="department-detail"),
    path("schools/<slug:school_slug>/<slug:dept_slug>/<slug:program_slug>/", views.program_detail, name="program-detail"),
]
