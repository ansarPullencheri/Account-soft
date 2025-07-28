from django.shortcuts import render, redirect
from .models import Transaction, Employee
from calendar import month_name
from datetime import datetime
from django.db.models import Sum

# Create your views here.
def index(request):
    
    # Get current month
    now = datetime.now()
    current_month = now.month

    # Current month stats
    monthly_income = Transaction.objects.filter(transaction_type='income', date__month=current_month).aggregate(Sum('amount'))['amount__sum'] or 0
    monthly_expense = Transaction.objects.filter(transaction_type='expense', date__month=current_month).aggregate(Sum('amount'))['amount__sum'] or 0
    monthly_profit = monthly_income - monthly_expense

    # All-time stats
    total_income = Transaction.objects.filter(transaction_type='income').aggregate(Sum('amount'))['amount__sum'] or 0
    total_expense = Transaction.objects.filter(transaction_type='expense').aggregate(Sum('amount'))['amount__sum'] or 0
    total_profit = total_income - total_expense

    # Monthly overview (Jan–Dec)
    monthly_data = []
    for i in range(1, 13):
        income = Transaction.objects.filter(transaction_type='income', date__month=i).aggregate(Sum('amount'))['amount__sum'] or 0
        expense = Transaction.objects.filter(transaction_type='expense', date__month=i).aggregate(Sum('amount'))['amount__sum'] or 0
        profit = income - expense
        if income == 0 and expense == 0:
            status = "No Activity"
        elif profit >= 0:
            status = "Profit"
        else:
            status = "Loss"

        monthly_data.append({
            'month': month_name[i],
            'income': income,
            'expense': expense,
            'profit': profit,
            'status': status
        })

    context = {
        'monthly_income': monthly_income,
        'monthly_expense': monthly_expense,
        'monthly_profit': monthly_profit,
        'total_income': total_income,
        'total_expense': total_expense,
        'total_profit': total_profit,
        'monthly_data': monthly_data,
    }



    return render(request,'web/index.html',context)
def incExp(request):
    if request.method == 'POST':
        desc = request.POST.get('desc')
        amount = request.POST.get('amount')
        form_type = request.POST.get('form_type')

        if desc and amount and form_type in ['income', 'expense']:
            Transaction.objects.create(
                description=desc,
                amount=amount,
                transaction_type=form_type
            )
        return redirect('incExp')

    current_month = datetime.now().month

    # Monthly totals
    income_total = Transaction.objects.filter(transaction_type='income', date__month=current_month).aggregate(Sum('amount'))['amount__sum'] or 0
    expense_total = Transaction.objects.filter(transaction_type='expense', date__month=current_month).aggregate(Sum('amount'))['amount__sum'] or 0
    profit = income_total - expense_total

    # Lists
    incomes = Transaction.objects.filter(transaction_type='income', date__month=current_month).order_by('-date')
    expenses = Transaction.objects.filter(transaction_type='expense', date__month=current_month).order_by('-date')

    context = {
        'income_total': income_total,
        'expense_total': expense_total,
        'profit': profit,
        'incomes': incomes,
        'expenses': expenses
    }
    return render(request, 'web/incExp.html', context)

def employees(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        position = request.POST.get('position')
        email = request.POST.get('email')

        # Save to DB
        Employee.objects.create(name=name, position=position, email=email)
        return redirect('employees')

    all_employees = Employee.objects.all()
    total_employees = all_employees.count()

    return render(request, 'web/employees.html', {
        'employees': all_employees,
        'total_employees': total_employees,
    })
def salary(request):
    return render(request,'web/salary.html')