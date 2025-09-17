from django.http import JsonResponse, Http404
from django.views.decorators.http import require_GET
from django.utils.text import slugify

from .models import (
    LeadershipGroup,
    Leader,
    School,
    Department,
    Program,
    JobPosting,
)


def _leader_to_dict(l: Leader) -> dict:
    profile_image_url = ""
    if hasattr(l, "profile_image") and l.profile_image:
        profile_image_url = l.profile_image.url
    
    return {
        "slug": getattr(l, "slug", "") or slugify(getattr(l, "name", "")),
        "name": getattr(l, "name", ""),
        "role": getattr(l, "role", ""),
        "profile_image": profile_image_url,
        "about": getattr(l, "about", "") or "",
        "bio": getattr(l, "about", "") or "",  # Use 'about' field for bio
        "email": getattr(l, "email", "") or "",
        "phone": getattr(l, "phone", "") or "",
        "qualifications": getattr(l, "qualifications", "") or "",
        "experience": getattr(l, "experience", "") or "",
        "viewProfileEnabled": getattr(l, "viewProfileEnabled", True),
    }


def _program_to_dict(p: Program) -> dict:
    return {
        "slug": getattr(p, "slug", "") or slugify(getattr(p, "name", "")),
        "name": getattr(p, "name", ""),
        "level": getattr(p, "level", "") or "",
        "overview": getattr(p, "overview", "") or "",
        "duration": getattr(p, "duration", "") or "",
        "eligibility": getattr(p, "eligibility", "") or "",
        "fees": getattr(p, "fees", "") or "",
        "outcomes": getattr(p, "outcomes", "") or "",
        "specializations": getattr(p, "specializations", []) or [],
        "accreditation": getattr(p, "accreditation", "") or "",
    }


def _department_to_dict(d: Department, include_programs=True) -> dict:
    data = {
        "slug": getattr(d, "slug", "") or slugify(getattr(d, "name", "")),
        "name": getattr(d, "name", ""),
        "about": getattr(d, "about", "") or getattr(d, "summary", "") or "",
        "description": getattr(d, "description", "") or "",
    }
    if include_programs:
        progs = getattr(d, "programs", None)
        if progs is None:  # related_name might not exist
            progs_qs = Program.objects.filter(department=d)
        else:
            progs_qs = d.programs.all()
        data["programs"] = [_program_to_dict(p) for p in progs_qs.order_by("id")]
    return data


def _school_to_dict(s: School, include_depts=True) -> dict:
    data = {
        "slug": getattr(s, "slug", "") or slugify(getattr(s, "name", "")),
        "name": getattr(s, "name", ""),
        "about": getattr(s, "about", "") or getattr(s, "summary", "") or "",
    }
    if include_depts:
        depts = getattr(s, "departments", None)
        if depts is None:  # related_name might not exist
            depts_qs = Department.objects.filter(school=s)
        else:
            depts_qs = s.departments.all()
        data["departments"] = [_department_to_dict(d) for d in depts_qs.order_by("id")]
    return data


def api_index(_request):
    return JsonResponse({
        "endpoints": {
            "leadership": "/api/leadership/",
            "jobs": "/api/jobs/",
            "schools": "/api/schools/",
            "school_detail": "/api/schools/<school_slug>/",
            "department_detail": "/api/schools/<school_slug>/<dept_slug>/",
            "program_detail": "/api/schools/<school_slug>/<dept_slug>/<program_slug>/",
        }
    })


@require_GET
def leadership(_request):
    # groups
    try:
        groups_qs = LeadershipGroup.objects.all()
        if hasattr(LeadershipGroup, "order"):
            groups_qs = groups_qs.order_by("order", "id")
        else:
            groups_qs = groups_qs.order_by("id")
    except Exception:
        groups_qs = LeadershipGroup.objects.all()

    out = []
    for g in groups_qs:
        # leaders for each group
        if hasattr(Leader, "order"):
            leaders_qs = Leader.objects.filter(group=g).order_by("order", "id")
        else:
            leaders_qs = Leader.objects.filter(group=g).order_by("id")
        out.append({
            "group": getattr(g, "name", ""),
            "slug": getattr(g, "slug", "") or slugify(getattr(g, "name", "")),
            "leaders": [_leader_to_dict(l) for l in leaders_qs],
        })
    return JsonResponse({"groups": out})


@require_GET
def jobs(_request):
    qs = JobPosting.objects.all()
    if hasattr(JobPosting, "is_active"):
        qs = qs.filter(is_active=True)
    if hasattr(JobPosting, "created_at"):
        qs = qs.order_by("-created_at", "-id")
    else:
        qs = qs.order_by("-id")

    items = []
    for j in qs:
        items.append({
            "id": j.id,
            "title": getattr(j, "title", ""),
            "location": getattr(j, "location", "") or "",
            "category_name": getattr(j, "category_name", "") or "",
            "summary": getattr(j, "summary", "") or "",
            "details": getattr(j, "details", []) or [],
        })
    return JsonResponse({"items": items})


@require_GET
def schools(_request):
    qs = School.objects.all().order_by("id")
    return JsonResponse({"schools": [_school_to_dict(s) for s in qs]})


@require_GET
def school_detail(_request, school_slug: str):
    try:
        s = School.objects.get(slug=school_slug)
    except School.DoesNotExist:
        raise Http404("School not found")
    return JsonResponse(_school_to_dict(s))


@require_GET
def department_detail(_request, school_slug: str, dept_slug: str):
    try:
        s = School.objects.get(slug=school_slug)
    except School.DoesNotExist:
        raise Http404("School not found")

    # department
    try:
        d = Department.objects.get(school=s, slug=dept_slug)
    except Department.DoesNotExist:
        raise Http404("Department not found")

    data = _department_to_dict(d, include_programs=True)
    data["school"] = {"slug": s.slug, "name": s.name}
    return JsonResponse(data)


@require_GET
def program_detail(_request, school_slug: str, dept_slug: str, program_slug: str):
    try:
        s = School.objects.get(slug=school_slug)
    except School.DoesNotExist:
        raise Http404("School not found")

    try:
        d = Department.objects.get(school=s, slug=dept_slug)
    except Department.DoesNotExist:
        raise Http404("Department not found")

    try:
        p = Program.objects.get(department=d, slug=program_slug)
    except Program.DoesNotExist:
        raise Http404("Program not found")

    data = _program_to_dict(p)
    data["school"] = {"slug": s.slug, "name": s.name}
    data["department"] = {"slug": d.slug, "name": d.name}
    return JsonResponse(data)
