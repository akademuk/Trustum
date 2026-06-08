(() => {
    const section = document.querySelector('.calculator');
    if (!section) return;

    const AGREEMENT = 'за домовленістю';
    const PRRO_PRICE = 800;
    const OPERATIONS_TIERS = {
        fop: {
            'single-2': [
                { min: 0, max: 0, price: 1000 },
            ],
            'single-3-5': [
                { min: 0, max: 0, price: 2000 },
                { min: 1, max: 20, price: 5500 },
                { min: 21, max: 50, price: 10500 },
                { min: 51, max: 100, price: 13500 },
                { min: 101, max: 150, price: 16500 },
                { min: 151, max: 250, price: 18000 },
                { min: 251, max: 300, price: 20000 },
            ],
            'single-3-3-vat': [
                { min: 0, max: 0, price: 2800 },
                { min: 1, max: 20, price: 6800 },
                { min: 21, max: 50, price: 11500 },
                { min: 51, max: 100, price: 14500 },
                { min: 101, max: 150, price: 17500 },
                { min: 151, max: 250, price: 20500 },
                { min: 251, max: 300, price: 23500 },
            ],
            'general-vat': [
                { min: 0, max: 0, price: 2800 },
                { min: 1, max: 20, price: 6800 },
                { min: 21, max: 50, price: 11500 },
                { min: 51, max: 100, price: 14500 },
                { min: 101, max: 150, price: 17500 },
                { min: 151, max: 250, price: 20500 },
                { min: 251, max: 300, price: 23500 },
            ],
            'general-no-vat': [
                { min: 0, max: 0, price: 2500 },
                { min: 1, max: 20, price: 5800 },
                { min: 21, max: 50, price: 10500 },
                { min: 51, max: 100, price: 13500 },
                { min: 101, max: 150, price: 16500 },
                { min: 151, max: 250, price: 19500 },
                { min: 251, max: 300, price: 22500 },
            ],
        },
        tov: {
            'single-3-5': [
                { min: 0, max: 0, price: 2800 },
                { min: 1, max: 20, price: 6500 },
                { min: 21, max: 50, price: 11500 },
                { min: 51, max: 100, price: 14500 },
                { min: 101, max: 150, price: 17500 },
                { min: 151, max: 250, price: 19000 },
                { min: 251, max: 300, price: 21000 },
            ],
            'single-3-3-vat': [
                { min: 0, max: 0, price: 3400 },
                { min: 1, max: 20, price: 7800 },
                { min: 21, max: 50, price: 12500 },
                { min: 51, max: 100, price: 15500 },
                { min: 101, max: 150, price: 18500 },
                { min: 151, max: 250, price: 21500 },
                { min: 251, max: 300, price: 24500 },
            ],
            'general-vat': [
                { min: 0, max: 0, price: 3400 },
                { min: 1, max: 20, price: 7800 },
                { min: 21, max: 50, price: 12500 },
                { min: 51, max: 100, price: 15500 },
                { min: 101, max: 150, price: 18500 },
                { min: 151, max: 250, price: 21500 },
                { min: 251, max: 300, price: 24500 },
            ],
            'general-no-vat': [
                { min: 0, max: 0, price: 2800 },
                { min: 1, max: 20, price: 6800 },
                { min: 21, max: 50, price: 11500 },
                { min: 51, max: 100, price: 14500 },
                { min: 101, max: 150, price: 17500 },
                { min: 151, max: 250, price: 20500 },
                { min: 251, max: 300, price: 23500 },
            ],
        },
    };

    const EMPLOYEE_TOTALS = {
        1: 800,
        2: 1500,
        3: 2100,
        4: 2600,
        5: 3000,
        6: 3300,
        7: 3500,
        8: 3600,
        9: 3600,
        10: 4000,
    };

    const calculatorType = section.dataset.calculatorType || 'tabs';
    const isFopOnly = calculatorType === 'fop';

    const priceValueEl = section.querySelector('.calculator__price-value');
    const priceCurrencyEl = section.querySelector('.calculator__price-currency');
    const pricePeriodEl = section.querySelector('.calculator__price-period');
    const form = section.querySelector('.calculator__form');
    const prroGroup = section.querySelector('#calc-prro-group');
    const taxSingle2 = section.querySelector('#calc-tax-single-2');
    const taxSingle35 = section.querySelector('#calc-tax-single-3-5');
    const fopOnlyTaxOptions = section.querySelectorAll('.calculator__tax-option--fop-only');

    const getChecked = (name) => section.querySelector(`input[name="${name}"]:checked`);

    const getLegalForm = () => {
        if (isFopOnly) return 'fop';
        return getChecked('legal_form')?.value || 'fop';
    };

    const getOperationsPrice = (legalForm, taxSystem, count) => {
        const tiers = OPERATIONS_TIERS[legalForm]?.[taxSystem];
        if (!tiers) return null;

        const tier = tiers.find(({ min, max }) => count >= min && count <= max);
        return tier ? tier.price : null;
    };

    const getPaymentsPrice = (count) => {
        if (count <= 0) return 0;
        if (count <= 10) return 800;
        if (count <= 20) return 1500;
        if (count <= 40) return 2000;
        if (count <= 50) return 2500;
        return null;
    };

    const getEmployeesPrice = (count) => {
        if (count <= 0) return 0;
        if (count > 10) return null;
        return EMPLOYEE_TOTALS[count] ?? null;
    };

    const formatPrice = (value) => value.toLocaleString('uk-UA');

    const setPriceDisplay = (value) => {
        const isAgreement = value === AGREEMENT;

        priceValueEl.textContent = isAgreement ? AGREEMENT : formatPrice(value);
        priceCurrencyEl.hidden = isAgreement;
        pricePeriodEl.hidden = isAgreement;
        section.querySelector('.calculator__price').classList.toggle('calculator__price--agreement', isAgreement);
    };

    const getOperationsCount = () => {
        const operationsMode = getChecked('operations_mode')?.value;

        if (operationsMode === 'agreement' || operationsMode === 'over-300') {
            return null;
        }

        const operationsInput = section.querySelector('#calc-operations-count');
        const count = Math.min(300, Math.max(0, parseInt(operationsInput?.value, 10) || 0));

        if (operationsInput && String(count) !== operationsInput.value) {
            operationsInput.value = count;
        }

        return count;
    };

    const getPaymentsCount = () => {
        if (getChecked('client_bank_payments')?.value !== 'yes') {
            return 0;
        }

        const paymentsInput = section.querySelector('#calc-payments-count');
        const count = Math.min(30, Math.max(1, parseInt(paymentsInput?.value, 10) || 1));

        if (paymentsInput) paymentsInput.value = count;

        return count;
    };

    const updateTaxOptions = () => {
        const legalForm = getLegalForm();
        const isFop = legalForm === 'fop';
        const taxSystem = getChecked('tax_system')?.value;

        if (!isFopOnly) {
            fopOnlyTaxOptions.forEach((option) => {
                option.hidden = !isFop;
            });

            if (!isFop && taxSingle2?.checked && taxSingle35) {
                taxSingle35.checked = true;
            }
        }

        if (prroGroup && !isFopOnly) {
            prroGroup.hidden = !(isFop && taxSystem === 'single-2');
        }
    };

    const resetPrroIfNeeded = (taxSystem) => {
        if (taxSystem !== 'single-2') {
            const prroNo = section.querySelector('#calc-prro-no');
            if (prroNo) prroNo.checked = true;
        }
    };

    const calculate = () => {
        updateTaxOptions();

        const legalForm = getLegalForm();
        const taxSystem = getChecked('tax_system')?.value;
        const employeesMode = getChecked('employees')?.value;
        const employeesInput = section.querySelector('#calc-employees-count');
        const prro = getChecked('prro')?.value;

        const operationsCount = getOperationsCount();
        if (operationsCount === null) {
            setPriceDisplay(AGREEMENT);
            return;
        }

        const operationsPrice = getOperationsPrice(legalForm, taxSystem, operationsCount);
        if (operationsPrice === null) {
            setPriceDisplay(AGREEMENT);
            return;
        }

        const paymentsCount = getPaymentsCount();
        const paymentsPrice = getPaymentsPrice(paymentsCount);
        if (paymentsPrice === null) {
            setPriceDisplay(AGREEMENT);
            return;
        }

        let employeesPrice = 0;
        if (employeesMode === 'yes') {
            const employeesCount = Math.min(30, Math.max(1, parseInt(employeesInput?.value, 10) || 1));
            if (employeesInput) employeesInput.value = employeesCount;
            employeesPrice = getEmployeesPrice(employeesCount);
            if (employeesPrice === null) {
                setPriceDisplay(AGREEMENT);
                return;
            }
        }

        let prroPrice = 0;
        if (legalForm === 'fop' && taxSystem === 'single-2' && prro === 'yes') {
            prroPrice = PRRO_PRICE;
        }

        setPriceDisplay(operationsPrice + paymentsPrice + employeesPrice + prroPrice);
    };

    const formatPhone = (value) => {
        let digits = value.replace(/\D/g, '');

        if (digits.startsWith('380')) {
            digits = digits.slice(3);
        } else if (digits.startsWith('80')) {
            digits = digits.slice(2);
        } else if (digits.startsWith('0')) {
            digits = digits.slice(1);
        }

        digits = digits.slice(0, 10);

        let formatted = '+380';
        if (digits.length > 0) formatted += ` ${digits.slice(0, 2)}`;
        if (digits.length > 2) formatted += ` ${digits.slice(2, 5)}`;
        if (digits.length > 5) formatted += ` ${digits.slice(5, 9)}`;

        return formatted;
    };

    const getPhoneDigits = (value) => {
        let digits = value.replace(/\D/g, '');
        if (digits.startsWith('380')) digits = digits.slice(3);
        return digits.slice(0, 10);
    };

    const updateContactFields = () => {
        const method = getChecked('contact_method')?.value || 'email';
        const emailField = section.querySelector('[data-calc-contact="email"]');
        const phoneField = section.querySelector('[data-calc-contact="phone"]');
        const emailInput = section.querySelector('#calc-user-email');
        const phoneInput = section.querySelector('#calc-user-phone');

        const isEmail = method === 'email';

        if (emailField) emailField.hidden = !isEmail;
        if (phoneField) phoneField.hidden = isEmail;

        if (emailInput) {
            emailInput.required = isEmail;
            if (!isEmail) emailInput.setCustomValidity('');
        }

        if (phoneInput) {
            phoneInput.required = !isEmail;
            if (isEmail) phoneInput.setCustomValidity('');
        }
    };

    const clearOperationsMode = () => {
        section.querySelectorAll('input[name="operations_mode"]').forEach((input) => {
            input.checked = false;
        });
    };

    section.addEventListener('change', (event) => {
        const { target } = event;

        if (target.matches('input[name="tax_system"]')) {
            resetPrroIfNeeded(target.value);
        }

        if (target.matches('input[name="operations_mode"]') && target.checked) {
            const operationsInput = section.querySelector('#calc-operations-count');
            if (operationsInput) operationsInput.value = '';
        }

        if (target.matches('input[name="client_bank_payments"]') && target.value === 'yes') {
            const paymentsInput = section.querySelector('#calc-payments-count');
            if (paymentsInput && !paymentsInput.value) paymentsInput.value = 1;
        }

        if (target.matches('input[name="employees"]') && target.value === 'yes') {
            const employeesInput = section.querySelector('#calc-employees-count');
            if (employeesInput && !employeesInput.value) employeesInput.value = 1;
        }

        if (target.matches('input[name="contact_method"]')) {
            updateContactFields();
        }

        calculate();
    });

    section.addEventListener('focusin', (event) => {
        const { target } = event;

        if (target.matches('.calculator__group-field .calculator__input')) {
            const radio = target.closest('.calculator__group-field')?.querySelector('.feedback__radio-input');
            if (radio) radio.checked = true;
            calculate();
        }
    });

    section.addEventListener('input', (event) => {
        const { target } = event;

        if (target.id === 'calc-employees-count') {
            const employeesYes = section.querySelector('#calc-employees-yes');
            if (employeesYes) employeesYes.checked = true;
        }

        if (target.id === 'calc-payments-count') {
            const paymentsYes = section.querySelector('#calc-payments-yes');
            if (paymentsYes) paymentsYes.checked = true;
        }

        if (target.id === 'calc-operations-count') {
            clearOperationsMode();
        }

        if (target.id === 'calc-user-phone') {
            const cursorFromEnd = target.value.length - target.selectionStart;
            target.value = formatPhone(target.value);
            const nextPos = Math.max(0, target.value.length - cursorFromEnd);
            target.setSelectionRange(nextPos, nextPos);
            return;
        }

        calculate();
    });

    form?.addEventListener('submit', (event) => {
        event.preventDefault();

        const method = getChecked('contact_method')?.value;
        const emailInput = section.querySelector('#calc-user-email');
        const phoneInput = section.querySelector('#calc-user-phone');

        if (method === 'email') {
            if (!emailInput?.value.includes('@')) {
                emailInput?.setCustomValidity('Введіть коректний email');
                emailInput?.reportValidity();
                return;
            }
            emailInput.setCustomValidity('');
        }

        if (method === 'phone') {
            const digits = getPhoneDigits(phoneInput?.value || '');
            if (digits.length !== 10) {
                phoneInput?.setCustomValidity('Введіть номер у форматі +380 XX XXX XXXX');
                phoneInput?.reportValidity();
                return;
            }
            phoneInput.setCustomValidity('');
        }

        if (!form.checkValidity()) {
            form.reportValidity();
        }
    });

    updateContactFields();
    calculate();
})();
