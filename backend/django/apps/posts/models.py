from django.db import models
from apps.users.models import User


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, db_column='author_id')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'posts'
        ordering = ['-created_at']

    def __str__(self):
        return self.title