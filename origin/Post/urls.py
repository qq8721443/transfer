from django.urls import path, include
from .views import PostViewSet

post_list = PostViewSet.as_view({
    'post': 'create',
    'get': 'list'
})
post_detail = PostViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('posts/', post_list, name='post_list'),
    path('posts/<int:pk>/', post_detail, name='post_detail'),
]