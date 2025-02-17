// Save pricing to localStorage
function savePricing() {
    const perInchPrice = parseFloat(document.getElementById('perInchPrice').value) || 0;
    const pricing = {
        perInchPrice: perInchPrice,
        Option1: { basePrice: parseFloat(document.getElementById('basePriceOption1').value) || 0 },
        Option2: { basePrice: parseFloat(document.getElementById('basePriceOption2').value) || 0 },
        Option3: { basePrice: parseFloat(document.getElementById('basePriceOption3').value) || 0 },
        Option4: { basePrice: parseFloat(document.getElementById('basePriceOption4').value) || 0 },
        Option5: { basePrice: parseFloat(document.getElementById('basePriceOption5').value) || 0 }
    };
    
    localStorage.setItem('pricing', JSON.stringify(pricing));
    document.getElementById('pricingMessage').textContent = 'Pricing saved successfully!';
}

// Calculate quote based on selected options and pricing
function calculateQuote() {
    const pinLength = parseFloat(document.getElementById('pinLength').value) || 0;
    const selectedOptions = Array.from(document.querySelectorAll('input[name="options"]:checked'))
        .map(checkbox => checkbox.value);
    
    const pricing = JSON.parse(localStorage.getItem('pricing')) || { perInchPrice: 0 };
    let totalCost = 0;
    let breakdown = '';

    // Calculate the per-inch cost (applied once to total length)
    const perInchCost = pricing.perInchPrice * pinLength;

    // Calculate the sum of base prices for selected options
    let optionsCost = 0;
    selectedOptions.forEach(option => {
        const optionPricing = pricing[option] || { basePrice: 0 };
        optionsCost += optionPricing.basePrice;
        breakdown += `${option}: $${optionPricing.basePrice.toFixed(2)} (base price)<br>`;
    });

    // Total cost = per-inch cost + sum of base prices
    totalCost = perInchCost + optionsCost;

    const quoteResult = document.getElementById('quoteResult');
    if (selectedOptions.length === 0) {
        quoteResult.textContent = 'Please select at least one option.';
    } else {
        quoteResult.innerHTML = `Total Quote: $${totalCost.toFixed(2)}<br><br>Breakdown:<br>` +
            `Per-inch cost: $${perInchCost.toFixed(2)} (${pricing.perInchPrice.toFixed(2)}/in × ${pinLength} in)<br>` +
            `Options cost: $${optionsCost.toFixed(2)}<br>` +
            breakdown;
    }
}

// Load pricing on pricing page load (if exists)
if (document.getElementById('basePriceOption1')) {
    const pricing = JSON.parse(localStorage.getItem('pricing'));
    if (pricing) {
        document.getElementById('perInchPrice').value = pricing.perInchPrice || 0;
        Object.keys(pricing).forEach(key => {
            if (key.startsWith('Option')) {
                document.getElementById(`basePrice${key}`).value = pricing[key].basePrice;
            }
        });
    }
}
