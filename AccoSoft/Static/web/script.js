
    let income = 2708;
    let expense = 1000;

    function updateCards() {
      document.getElementById("incomeCard").textContent = "€" + income;
      document.getElementById("expenseCard").textContent = "€" + expense;
      document.getElementById("profitCard").textContent = "€" + (income - expense);
    }

    document.getElementById("transactionForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const desc = document.getElementById("desc").value.trim();
      const amt = parseFloat(document.getElementById("amount").value);
      const type = document.getElementById("type").value;

      if (!desc || isNaN(amt) || amt <= 0) {
        alert("Please enter a valid transaction.");
        return;
      }

      const div = document.createElement("div");
      div.className = "border p-2 my-2";
      div.innerHTML = `<strong>${type.toUpperCase()}</strong>: ${desc} - €${amt}`;
      document.getElementById("transactionList").prepend(div);

      if (type === "income") income += amt;
      else expense += amt;

      updateCards();

      // Reset form
      document.getElementById("transactionForm").reset();
    });

    updateCards();




    // Expenses & Income
    // let totalExpense = 0;
    // let totalIncome = 0;
    // let expenseCount = 0;
    // let incomeCount = 0;

    // function updateTotals() {
    //   document.getElementById('totalExpenses').textContent = `€${totalExpense.toFixed(2)}`;
    //   document.getElementById('totalIncome').textContent = `€${totalIncome.toFixed(2)}`;
    //   const profit = totalIncome - totalExpense;
    //   document.getElementById('totalProfit').textContent = `€${profit.toFixed(2)}`;
    // }

    // document.getElementById('expenseForm').addEventListener('submit', function(e) {
    //   e.preventDefault();

    //   const desc = document.getElementById('expenseDesc').value.trim();
    //   const amount = parseFloat(document.getElementById('expenseAmount').value);

    //   if (!desc || isNaN(amount) || amount <= 0) return alert("Enter valid expense data");

    //   expenseCount++;
    //   totalExpense += amount;

    //   const row = `<tr><td>${expenseCount}</td><td>${desc}</td><td>€${amount.toFixed(2)}</td></tr>`;
    //   document.getElementById('expenseBody').insertAdjacentHTML('beforeend', row);

    //   updateTotals();
    //   this.reset();
    // });

    // document.getElementById('incomeForm').addEventListener('submit', function(e) {
    //   e.preventDefault();

    //   const desc = document.getElementById('incomeDesc').value.trim();
    //   const amount = parseFloat(document.getElementById('incomeAmount').value);

    //   if (!desc || isNaN(amount) || amount <= 0) return alert("Enter valid income data");

    //   incomeCount++;
    //   totalIncome += amount;

    //   const row = `<tr><td>${incomeCount}</td><td>${desc}</td><td>€${amount.toFixed(2)}</td></tr>`;
    //   document.getElementById('incomeBody').insertAdjacentHTML('beforeend', row);

    //   updateTotals();
    //   this.reset();
    // });
  




    // Employees
    let empCount = 0;

    document.getElementById('employeeForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('empName').value.trim();
      const position = document.getElementById('empPosition').value.trim();
      const email = document.getElementById('empEmail').value.trim();

      if (!name || !position || !email) {
        alert("Please fill all fields.");
        return;
      }

      empCount++;

      const row = `<tr>
        <td>${empCount}</td>
        <td>${name}</td>
        <td>${position}</td>
        <td>${email}</td>
      </tr>`;

      document.getElementById('employeeBody').insertAdjacentHTML('beforeend', row);
      document.getElementById('totalEmployees').textContent = empCount;

      this.reset();
    });
  




    // Salaries
    let salaryCount = 0;
    let totalSalaryPaid = 0;

    document.getElementById('salaryForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('empName').value.trim();
      const month = document.getElementById('salaryMonth').value;
      const amount = parseFloat(document.getElementById('salaryAmount').value);

      if (!name || !month || isNaN(amount) || amount <= 0) {
        alert("Please enter valid salary information.");
        return;
      }

      salaryCount++;
      totalSalaryPaid += amount;

      const row = `<tr>
        <td>${salaryCount}</td>
        <td>${name}</td>
        <td>${month}</td>
        <td>€${amount.toFixed(2)}</td>
      </tr>`;

      document.getElementById('salaryBody').insertAdjacentHTML('beforeend', row);
      document.getElementById('totalSalary').textContent = `€${totalSalaryPaid.toFixed(2)}`;

      this.reset();
    });
