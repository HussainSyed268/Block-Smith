from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from backend.db_connection import db, collection

class UserAccountManager(BaseUserManager):
    def create_user(self, name, phone, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not phone:
            raise ValueError('Users must have a phone number')
        if not name:
            raise ValueError('Users must have a name')
        user = self.model(
            email=self.normalize_email(email),
            phone=phone,
            name=name
        )
        user.set_password(password)
        collection.insert_one({
            "name": name,
            "phone": phone,
            "email": email,
            "password": password
        })
        return user
    def create_superuser(self, name, phone, email, password=None):
        user = self.create_user(
            email=email,
            phone=phone,
            name=name,
            password=password
        )
        user.is_admin = True
        collection.insert_one({
            "name": name,
            "phone": phone,
            "email": email,
            "password": password
        })
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone']

    def __str__(self):
        return self.email
    
    