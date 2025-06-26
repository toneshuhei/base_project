from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.users.urls')),
    path('api/', include('apps.posts.urls')),
]

# Admin site configuration
admin.site.site_header = "Base Project Admin"
admin.site.site_title = "Base Project Admin Portal"
admin.site.index_title = "Welcome to Base Project Administration"