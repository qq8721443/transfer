from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=40)
    content = models.TextField()
    image = models.ImageField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_dt = models.DateTimeField(auto_now_add = True)

