from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

def home(_request):
    # Simple health/welcome page for root
    return HttpResponse(
        """
        <html>
          <head><title>SMRU API</title></head>
          <body style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial;">
            <h1>SMRU API is running ✅</h1>
            <p>Useful links:</p>
            <ul>
              <li><a href="/admin/">/admin/</a></li>
              <li><a href="/api/">/api/</a> (API index)</li>
              <li><a href="/api/leadership/">/api/leadership/</a></li>
              <li><a href="/api/jobs/">/api/jobs/</a></li>
              <li><a href="/api/schools/">/api/schools/</a></li>
            </ul>
          </body>
        </html>
        """,
        content_type="text/html"
    )

# SPA fallback view - serves the React app for all non-API routes
def spa_fallback(request, path=None):
    """
    Fallback view for SPA routes. This serves the React app's index.html
    for any route that doesn't match API endpoints, allowing client-side
    routing to work properly.
    """
    try:
        # Try to serve the built React app
        with open(settings.BASE_DIR.parent / 'frontend' / 'my-app' / 'dist' / 'index.html', 'r', encoding='utf-8') as f:
            content = f.read()
        return HttpResponse(content, content_type='text/html')
    except FileNotFoundError:
        # If the built app doesn't exist, serve a simple message
        return HttpResponse(
            """
            <html>
              <head><title>SMRU - Loading...</title></head>
              <body style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial; text-align: center; padding: 50px;">
                <h1>SMRU</h1>
                <p>Please build the frontend application first:</p>
                <p><code>cd frontend/my-app && npm run build</code></p>
                <p>Or run the development server:</p>
                <p><code>cd frontend/my-app && npm run dev</code></p>
              </body>
            </html>
            """,
            content_type='text/html'
        )

urlpatterns = [
    path("", home, name="home"),                     # ✅ root no longer 404s
    path("admin/", admin.site.urls),
    path("api/", include("cms.urls")),               # your API
]

# Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Catch-all pattern for SPA routes - must be last
urlpatterns += [path("<path:path>", spa_fallback, name="spa_fallback")]
