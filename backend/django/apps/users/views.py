from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import User


@require_http_methods(["GET"])
def user_list(request):
    users = User.objects.all().values('id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'date_joined')
    return JsonResponse({'users': list(users)})


@require_http_methods(["GET"])
def user_detail(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_active': user.is_active,
            'is_staff': user.is_staff,
            'date_joined': user.date_joined.isoformat(),
        }
        return JsonResponse({'user': user_data})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)