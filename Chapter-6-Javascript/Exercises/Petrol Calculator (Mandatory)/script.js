// The DOM should be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to all interactive elements which will be used here
    const fuelPriceInput = document.getElementById('cost-per-liter');
    const fuelQuantityInput = document.getElementById('liters');
    const calculateTotalButton = document.getElementById('calculate-btn');
    const calculationResultDisplay = document.getElementById('result');

    // Executes the calculateTotalButton function when the button is clicked
    calculateTotalButton.addEventListener('click', computeFuelCost);

    // A function to validate numeric inputs which will be executed inside the computeFuelCost function
    function isInvalidNumber(value) {
        return isNaN(value) || value < 0;
    }

    // Funciton to calculate and display the total fuel cost
    function computeFuelCost() {
        // Get the values from the input fields and convert them to numbers
        const pricePerLiter = parseFloat(fuelPriceInput.value);
        const litersPurchased = parseFloat(fuelQuantityInput.value);
        
        // Checks the inputs if the value is "Not-a-Number" or NaN, and if the value is below 0
        if (isInvalidNumber(pricePerLiter) || isInvalidNumber(litersPurchased)) {
            calculationResultDisplay.textContent = 'Please enter valid positive numbers';
            return; // Displays the message if the value is anything but a positive number
        }
        
        // Calculates the total amount
        const totalTransactionAmount = pricePerLiter * litersPurchased;
        
        // Show formatted result with 2 decimal places and euro symbol
        calculationResultDisplay.textContent = `Total Cost: €${totalTransactionAmount.toFixed(2)}`;
    }

    // Theme toggle button's functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Checks for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }
    
    // Changes the theme when the button is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        
        // Changes the theme and text when the current theme is the opposite 
        if (isLight) {
            themeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        }
    });
});

