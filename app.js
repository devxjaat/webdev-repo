// Navigation
function showSection(sectionId) {
    // Update navigation buttons
    document.querySelectorAll('.nav-links button').forEach(btn => {
      btn.classList.remove('active');
      if (btn.textContent.toLowerCase() === sectionId) {
        btn.classList.add('active');
      }
    });
  
    // Show selected section
    document.querySelectorAll('section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
  }
  
  // Budget Planner
  let budgetItems = [];
  
  function addBudgetItem() {
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
  
    if (category && amount) {
      budgetItems.push({
        id: Date.now(),
        category,
        amount,
        type
      });
  
      updateBudgetUI();
      clearBudgetInputs();
    }
  }
  
  function removeBudgetItem(id) {
    budgetItems = budgetItems.filter(item => item.id !== id);
    updateBudgetUI();
  }
  
  function updateBudgetUI() {
    const totalIncome = budgetItems
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0);
  
    const totalExpenses = budgetItems
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0);
  
    const balance = totalIncome - totalExpenses;
  
    document.getElementById('total-income').textContent = `$${totalIncome}`;
    document.getElementById('total-expenses').textContent = `$${totalExpenses}`;
    document.getElementById('balance').textContent = `$${balance}`;
  
    // Update budget items list
    const budgetList = document.getElementById('budget-items');
    budgetList.innerHTML = budgetItems.map(item => `
      <div class="budget-item ${item.type}">
        <div class="budget-item-info">
          <span class="category">${item.category}</span>
          <span class="amount ${item.type}">${item.type === 'income' ? '+' : '-'}$${item.amount}</span>
        </div>
        <button onclick="removeBudgetItem(${item.id})" class="remove-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    `).join('');
  }
  
  function clearBudgetInputs() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
  }
  
  // Financial Concepts
  const concepts = [
    {
      title: 'Budgeting Basics',
      content: `
        <h3>Understanding Budgeting</h3>
        <p>A budget is a financial plan that helps you track your income and expenses. It's the foundation of good financial health.</p>
        
        <h4>Key Components:</h4>
        <ul>
          <li>Income tracking</li>
          <li>Expense categorization</li>
          <li>Savings goals</li>
          <li>Emergency fund planning</li>
        </ul>
  
        <h4>Benefits of Budgeting:</h4>
        <ul>
          <li>Better spending decisions</li>
          <li>Increased savings</li>
          <li>Reduced financial stress</li>
          <li>Clearer financial goals</li>
        </ul>
      `
    },
    {
      title: 'Saving Strategies',
      content: `
        <h3>Smart Saving Techniques</h3>
        <p>Saving money is a crucial skill that helps you achieve your financial goals and prepare for the future.</p>
  
        <h4>Essential Strategies:</h4>
        <ul>
          <li>Pay yourself first</li>
          <li>Set specific savings goals</li>
          <li>Automate your savings</li>
          <li>Track your progress</li>
        </ul>
  
        <h4>Types of Savings:</h4>
        <ul>
          <li>Emergency fund</li>
          <li>Short-term savings</li>
          <li>Long-term investments</li>
          <li>Retirement savings</li>
        </ul>
      `
    },
    {
      title: 'Understanding Credit',
      content: `
        <h3>Credit Basics</h3>
        <p>Understanding credit is essential for your financial future. Good credit opens doors to better financial opportunities.</p>
  
        <h4>Credit Score Factors:</h4>
        <ul>
          <li>Payment history</li>
          <li>Credit utilization</li>
          <li>Length of credit history</li>
          <li>Types of credit</li>
        </ul>
  
        <h4>Building Good Credit:</h4>
        <ul>
          <li>Pay bills on time</li>
          <li>Keep credit utilization low</li>
          <li>Monitor your credit report</li>
          <li>Use credit responsibly</li>
        </ul>
      `
    }
  ];
  
  function showConcept(index) {
    document.querySelectorAll('.concept-card').forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    
    document.getElementById('concept-details').innerHTML = concepts[index].content;
  }
  
  // Initialize first concept
  showConcept(0);
  
  // Expense Tracker
  let expenses = [];
  let expenseChart;
  
  function addExpense() {
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
  
    if (description && amount && category) {
      expenses.push({
        id: Date.now(),
        description,
        amount,
        category,
        date: new Date().toLocaleDateString()
      });
  
      updateExpenseUI();
      clearExpenseInputs();
    }
  }
  
  function removeExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpenseUI();
  }
  
  function updateExpenseUI() {
    // Update expense list
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = expenses.map(expense => `
      <div class="expense-item">
        <div class="expense-info">
          <span class="description">${expense.description}</span>
          <span class="category">${expense.category}</span>
          <span class="date">${expense.date}</span>
        </div>
        <div class="expense-amount">
          <span class="amount">-$${expense.amount}</span>
          <button onclick="removeExpense(${expense.id})" class="remove-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V <boltAction type="file" filePath="app.js">-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  
    // Update chart
    const ctx = document.getElementById('expense-chart').getContext('2d');
    const categoryTotals = {};
    
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
  
    if (expenseChart) {
      expenseChart.destroy();
    }
  
    expenseChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(categoryTotals),
        datasets: [{
          label: 'Expenses by Category',
          data: Object.values(categoryTotals),
          backgroundColor: [
            '#4F46E5',
            '#7C3AED',
            '#EC4899',
            '#F59E0B',
            '#10B981',
            '#6366F1'
          ]
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `$${value}`
            }
          }
        }
      }
    });
  }
  
  function clearExpenseInputs() {
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-category').value = 'Food';
  }
  
  // Quiz
  const quizQuestions = [
    {
      question: 'What is the purpose of a budget?',
      options: [
        'To track income and expenses',
        'To make you feel guilty about spending',
        'To impress your friends',
        'To make your wallet heavier'
      ],
      correctAnswer: 0
    },
    {
      question: 'Which of these is a good saving strategy?',
      options: [
        'Spend first, save what\'s left',
        'Save first, spend what\'s left',
        'Never save anything',
        'Borrow money to save'
      ],
      correctAnswer: 1
    },
    {
      question: 'What is compound interest?',
      options: [
        'Interest only on the principal amount',
        'Interest that never grows',
        'Interest on both principal and accumulated interest',
        'A type of bank account'
      ],
      correctAnswer: 2
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let quizCompleted = false;
  
  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizCompleted = false;
    showQuestion();
  }
  
  function showQuestion() {
    const question = quizQuestions[currentQuestion];
    const quizContent = document.getElementById('quiz-content');
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  
    document.getElementById('quiz-progress').innerHTML = `
      <div class="quiz-progress">
        <div class="quiz-progress-bar" style="width: ${progress}%"></div>
      </div>
      <p class="text-center mb-4">Question ${currentQuestion + 1} of ${quizQuestions.length}</p>
    `;
  
    quizContent.innerHTML = `
      <h3 class="question">${question.question}</h3>
      <div class="options">
        ${question.options.map((option, index) => `
          <button onclick="checkAnswer(${index})" class="quiz-option">
            ${option}
          </button>
        `).join('')}
      </div>
    `;
  }
  
  function checkAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
  
    options.forEach(option => {
      option.disabled = true;
    });
  
    if (selectedIndex === question.correctAnswer) {
      options[selectedIndex].classList.add('correct');
      score++;
    } else {
      options[selectedIndex].classList.add('incorrect');
      options[question.correctAnswer].classList.add('correct');
    }
  
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizQuestions.length) {
        showQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }
  
  function showResults() {
    const percentage = (score / quizQuestions.length) * 100;
    const quizContent = document.getElementById('quiz-content');
  
    quizContent.innerHTML = `
      <div class="results">
        <h3>Quiz Complete!</h3>
        <p class="score">Your Score: ${percentage}%</p>
        <p>You got ${score} out of ${quizQuestions.length} questions correct!</p>
        <button onclick="startQuiz()" class="restart-btn">Try Again</button>
      </div>
    `;
  
    quizCompleted = true;
  }
  
  // Initialize the quiz when the quiz section is shown
  document.querySelector('[onclick="showSection(\'quiz\')"]').addEventListener('click', () => {
    if (!quizCompleted) {
      startQuiz();
    }
  });