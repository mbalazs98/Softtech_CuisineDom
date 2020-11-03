from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from recipes.serializers import UserSerializer
from recipes.serializers import cuisinesSerializer
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from recipes.models import cuisines


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(['GET'])
def get_cuisines(request):
    ret_cuisines = cuisines.objects.all()

    if request.method == 'GET':
        cuisine_serial = cuisinesSerializer(ret_cuisines, many=True)
        return JsonResponse(cuisine_serial.data, safe=False)
