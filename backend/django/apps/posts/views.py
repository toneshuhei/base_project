from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Post


@require_http_methods(["GET"])
def post_list(request):
    posts = Post.objects.select_related('author').values(
        'id', 'title', 'content', 'author_id', 'author__username', 'created_at', 'updated_at'
    )
    posts_data = []
    for post in posts:
        posts_data.append({
            'id': post['id'],
            'title': post['title'],
            'content': post['content'],
            'author_id': post['author_id'],
            'author_username': post['author__username'],
            'created_at': post['created_at'].isoformat(),
            'updated_at': post['updated_at'].isoformat(),
        })
    return JsonResponse({'posts': posts_data})


@require_http_methods(["GET"])
def post_detail(request, post_id):
    try:
        post = Post.objects.select_related('author').get(id=post_id)
        post_data = {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'author_id': post.author.id,
            'author_username': post.author.username,
            'created_at': post.created_at.isoformat(),
            'updated_at': post.updated_at.isoformat(),
        }
        return JsonResponse({'post': post_data})
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=404)