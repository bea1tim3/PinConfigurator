// Save pricing to localStorage
function savePricing() {
    const pricing = {
        Option1: {
            basePrice: parseFloat(document.getElementById('basePriceOption1').value) || 0,
            perInchPrice: parseFloat(document.getElementById('perInchPriceOption1').value) || 0
        },
        Option2: {
            basePrice: parseFloat(document.getElementById('basePriceOption2').value) || 0,
            perInchPrice: parseFloat(document.getElementById('perInchPriceOption2').value) || 0
        },
        Option3: {
            basePrice: parseFloat(document.getElementById('basePriceOption3').value) || 0,
            perInchPrice: parseFloat(document.getElementById('perInchPriceOption3').value) || 0
        },
        Option4: {
            basePrice: parseFloat(document.getElementById('basePriceOption4').value) || 0,
            perInchPrice: parseFloat(document.getElementById('perInchPriceOption4').value) || 0
        },
        Option5: {
            basePrice: parseFloat(document.getElementById('basePriceOption5').value) || 0,
            perInchPrice: parseFloat(document.getElementById('perInchPriceOption5').value) || 0
        }
    };
    
    localStorage.setItem('pricing', JSON.stringify(pricing));
    document.getElementById('pricingMessage').textContent = 'Pricing saved successfully!';
}

// Calculate quote based on selected options and pricing
function calculateQuote() {
    const pinLength = parseFloat(document.getElementById('pinLength').value) || 0;
    const selectedOptions = Array.from(document.querySelectorAll('input[name="options"]:checked'))
        .map(checkbox => checkbox.value);
    
    const pricing = JSON.parse(localStorage.getItem('pricing')) || {};
    let totalCost = 0;
    let breakdown = '';

    selectedOptions.forEach(option => {
        const optionPricing = pricing[option] || { basePrice: 0, perInchPrice: 0 };
        const cost = optionPricing.basePrice + (optionPricing.perInchPrice * pinLength);
        totalCost += cost;
        breakdown += `${option}: $${cost.toFixed(2)}<br>`;
    });

    const quoteResult = document.getElementById('quoteResult');
    if (selectedOptions.length === 0) {
        quoteResult.textContent = 'Please select at least one option.';
    } else {
        quoteResult.innerHTML = `Total Quote: $${totalCost.toFixed(2)}<br><br>Breakdown:<br>${breakdown}`;
    }
}

// Load pricing on pricing page load (if exists)
if (document.getElementById('basePriceOption1')) {
    const pricing = JSON.parse(localStorage.getItem('pricing'));
    if (pricing) {
        Object.keys(pricing).forEach(option => {
            document.getElementById(`basePrice${option}`).value = pricing[option].basePrice;
            document.getElementById(`perInchPrice${option}`).value = pricing[option].perInchPrice;
        });
    }
}
