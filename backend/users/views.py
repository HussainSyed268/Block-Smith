from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model
from .serializer import UserCreateSerializer
from django.http import HttpResponse
from backend.db_connection import db, collection
from django.views.decorators.csrf import ensure_csrf_cookie
import json



User = get_user_model()

@ensure_csrf_cookie
def index(request):
    return HttpResponse("Hello, world. You're at the users index.")

@ensure_csrf_cookie
def test(request):
    if request.method == 'POST':
        return HttpResponse("Hello, world. You're at the users test.")
    
@ensure_csrf_cookie
def register(request):
    if request.method == 'POST':
        data = request.body.decode('utf-8')
        data = json.loads(data)  
        print(data) 
        name = data['name']
        phone = data['phone']
        email = data['email']
        password = data['password']
        print(data)
        collection.insert_one({
            "name": name,
            "phone": phone,
            "email": email,
            "password": password
        })
        # user = User.objects.create_user(name, phone, email, password)
        # user.UserCreateSerializer(user)

        return HttpResponse("User created successfully")
    

