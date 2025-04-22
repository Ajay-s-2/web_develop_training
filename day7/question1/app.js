const toggleBtn = document.querySelector('.toggle-theme');
    toggleBtn.addEventListener('click', () => {
      document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
    });

    const filters = document.querySelectorAll('.filter');
    const carCards = document.querySelectorAll('.car-card');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    function filterCars() {
      const selectedTypes = [...document.querySelectorAll('[data-type]:checked')].map(cb => cb.dataset.type);
      const selectedCapacities = [...document.querySelectorAll('[data-capacity]:checked')].map(cb => cb.dataset.capacity);
      const maxPrice = parseFloat(priceRange.value);

      carCards.forEach(card => {
        const type = card.dataset.type;
        const capacity = card.dataset.capacity;
        const price = parseFloat(card.dataset.price);

        const show = selectedTypes.includes(type) && selectedCapacities.includes(capacity) && price <= maxPrice;
        card.style.display = show ? '' : 'none';
      });
    }

    filters.forEach(f => f.addEventListener('change', filterCars));
    priceRange.addEventListener('input', () => {
      priceValue.textContent = parseFloat(priceRange.value).toFixed(2);
      filterCars();
    });