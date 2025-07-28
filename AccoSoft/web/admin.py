from django.contrib import admin
from .models import Transaction, Employee, Salary
admin.site.register(Transaction)
admin.site.register(Employee)
admin.site.register(Salary)

# Register your models here.
