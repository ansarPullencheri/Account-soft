from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('incExp', views.incExp, name='incExp'),
    path('employees/', views.employees, name='employees'),
    path('salary/', views.salary, name='salary'),
]
