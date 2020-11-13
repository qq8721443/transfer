from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, permissions
from .serializers import PostSerializer
from .models import Post

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs): #원래 있던 함수를 오버라이딩함
        instance = self.get_object()
        self.perform_destroy(instance)
        return JsonResponse({'message':'success'}, status=200)

    



