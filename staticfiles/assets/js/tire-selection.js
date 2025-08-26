class TireSelection {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 4;
        this.selectionType = 'by_car';
        this.applicationData = {
            selection_type: 'by_car',
            car_make: '',
            car_model: '',
            tire_width: '',
            tire_profile: '',
            tire_radius: '',
            season: '',
            winter_type: '',
            budget: '',
            priority: '',
            full_name: '',
            phone: '',
            email: ''
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateProgress();
        this.updateStepIndicator();
    }
    
    bindEvents() {
        // Selection type cards
        document.querySelectorAll('.selection-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectCard(card);
            });
        });
        
        // Season selection
        document.querySelectorAll('[data-season]').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectSeason(card);
            });
        });
        
        // Winter type selection
        document.querySelectorAll('[data-winter-type]').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectWinterType(card);
            });
        });
        
        // Budget selection
        document.querySelectorAll('[data-budget]').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectBudget(card);
            });
        });
        
        // Priority selection
        document.querySelectorAll('[data-priority]').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectPriority(card);
            });
        });
        
        // Navigation buttons
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextStep();
        });
        
        document.getElementById('backBtn').addEventListener('click', () => {
            this.previousStep();
        });
        
        // Car make change
        document.getElementById('carMake').addEventListener('change', (e) => {
            this.applicationData.car_make = e.target.value;
            console.log('Car make updated:', this.applicationData.car_make);
        });
        
        // Contact buttons will be initialized in initializeContactButtons() method
        
        // Back to website buttons
        document.getElementById('backToWebsiteBtn').addEventListener('click', () => {
            this.backToWebsite();
        });
        
        document.getElementById('backToWebsiteBtnStep1').addEventListener('click', () => {
            this.backToWebsite();
        });
        
        document.getElementById('backToWebsiteBtnStep2').addEventListener('click', () => {
            this.backToWebsite();
        });
        
        document.getElementById('backToWebsiteBtnStep2Size').addEventListener('click', () => {
            this.backToWebsite();
        });
        
        document.getElementById('backToWebsiteBtnStep3').addEventListener('click', () => {
            this.backToWebsite();
        });
        
        // Car model change
        document.getElementById('carModel').addEventListener('input', (e) => {
            this.applicationData.car_model = e.target.value;
            console.log('Car model updated:', this.applicationData.car_model);
        });
        
        // Tire size changes
        document.getElementById('tireWidth').addEventListener('change', (e) => {
            this.applicationData.tire_width = e.target.value;
            console.log('Tire width updated:', this.applicationData.tire_width);
        });
        
        document.getElementById('tireProfile').addEventListener('change', (e) => {
            this.applicationData.tire_profile = e.target.value;
            console.log('Tire profile updated:', this.applicationData.tire_profile);
        });
        
        document.getElementById('tireRadius').addEventListener('change', (e) => {
            this.applicationData.tire_radius = e.target.value;
            console.log('Tire radius updated:', this.applicationData.tire_radius);
        });
    }
    
    selectCard(card) {
        // Remove active class from all cards
        document.querySelectorAll('.selection-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // Add active class to selected card
        card.classList.add('active');
        
        // Update selection type
        this.selectionType = card.dataset.type;
        this.applicationData.selection_type = this.selectionType;
        
        console.log('Selection type updated:', this.selectionType);
        console.log('Application data selection_type:', this.applicationData.selection_type);
    }
    
    selectSeason(card) {
        // Remove selected class from all season cards
        document.querySelectorAll('[data-season]').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Update application data
        this.applicationData.season = card.dataset.season;
        
        // Show/hide winter type selection
        this.toggleWinterTypeSelection();
    }
    
    selectWinterType(card) {
        // Remove selected class from all winter type cards
        document.querySelectorAll('[data-winter-type]').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Update application data
        this.applicationData.winter_type = card.dataset.winter_type;
    }
    
    selectBudget(card) {
        // Remove selected class from all budget cards
        document.querySelectorAll('[data-budget]').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Update application data
        this.applicationData.budget = card.dataset.budget;
    }
    
    selectPriority(card) {
        // Remove selected class from all priority cards
        document.querySelectorAll('[data-priority]').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Update application data
        this.applicationData.priority = card.dataset.priority;
    }
    
    toggleWinterTypeSelection() {
        const winterTypeSelection = document.getElementById('winterTypeSelection');
        const winterTypeSelectionSize = document.getElementById('winterTypeSelectionSize');
        
        if (this.applicationData.season === 'winter') {
            winterTypeSelection.classList.remove('hidden');
            winterTypeSelectionSize.classList.remove('hidden');
        } else {
            winterTypeSelection.classList.add('hidden');
            winterTypeSelectionSize.classList.add('hidden');
            this.applicationData.winter_type = '';
        }
    }
    
    nextStep() {
        if (this.canProceedToNextStep()) {
            this.currentStep++;
            this.showCurrentStep();
            this.updateProgress();
            this.updateStepIndicator();
            this.updateNavigationButtons();
        }
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showCurrentStep();
            this.updateProgress();
            this.updateStepIndicator();
            this.updateNavigationButtons();
        }
    }
    
    canProceedToNextStep() {
        console.log('Checking if can proceed to next step. Current step:', this.currentStep);
        console.log('Current application data:', this.applicationData);
        
        switch (this.currentStep) {
            case 1:
                const canProceedStep1 = this.applicationData.selection_type !== '';
                console.log('Step 1 validation:', canProceedStep1);
                return canProceedStep1;
            case 2:
                if (this.applicationData.selection_type === 'by_car') {
                    const canProceedStep2Car = this.applicationData.car_make && this.applicationData.season;
                    console.log('Step 2 (car) validation:', canProceedStep2Car, {
                        car_make: this.applicationData.car_make,
                        season: this.applicationData.season
                    });
                    return canProceedStep2Car;
                } else {
                    const canProceedStep2Size = this.applicationData.tire_width && this.applicationData.tire_profile && 
                           this.applicationData.tire_radius && this.applicationData.season;
                    console.log('Step 2 (size) validation:', canProceedStep2Size, {
                        tire_width: this.applicationData.tire_width,
                        tire_profile: this.applicationData.tire_profile,
                        tire_radius: this.applicationData.tire_radius,
                        season: this.applicationData.season
                    });
                    return canProceedStep2Size;
                }
            case 3:
                const canProceedStep3 = this.applicationData.budget && this.applicationData.priority;
                console.log('Step 3 validation:', canProceedStep3, {
                    budget: this.applicationData.budget,
                    priority: this.applicationData.priority
                });
                return canProceedStep3;
            default:
                return true;
        }
    }
    
    showCurrentStep() {
        console.log('Showing current step:', this.currentStep);
        
        // Hide all steps
        document.querySelectorAll('.form-section, .main-card').forEach(step => {
            step.classList.add('hidden');
        });
        
        // Show current step
        switch (this.currentStep) {
            case 1:
                const step1 = document.getElementById('step1');
                if (step1) {
                    step1.classList.remove('hidden');
                    console.log('Step 1 shown');
                } else {
                    console.error('Step 1 element not found!');
                }
                break;
            case 2:
                if (this.applicationData.selection_type === 'by_car') {
                    const step2 = document.getElementById('step2');
                    if (step2) {
                        step2.classList.remove('hidden');
                        console.log('Step 2 (car) shown');
                    } else {
                        console.error('Step 2 element not found!');
                    }
                } else {
                    const step2Size = document.getElementById('step2Size');
                    if (step2Size) {
                        step2Size.classList.remove('hidden');
                        console.log('Step 2 (size) shown');
                    } else {
                        console.error('Step 2Size element not found!');
                    }
                }
                break;
            case 3:
                const step3 = document.getElementById('step3');
                if (step3) {
                    step3.classList.remove('hidden');
                    console.log('Step 3 shown');
                } else {
                    console.error('Step 3 element not found!');
                }
                break;
            case 4:
                const step4 = document.getElementById('step4');
                if (step4) {
                    step4.classList.remove('hidden');
                    console.log('Step 4 shown');
                    this.updateResults();
                } else {
                    console.error('Step 4 element not found!');
                }
                break;
        }
        
        // Show/hide navigation buttons
        this.updateNavigationButtons();
    }
    
    updateProgress() {
        const progress = (this.currentStep / this.maxSteps) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
    }
    
    updateStepIndicator() {
        const dots = document.querySelectorAll('.step-dot');
        dots.forEach((dot, index) => {
            if (index < this.currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    updateNavigationButtons() {
        const backBtn = document.getElementById('backBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Show/hide back button
        if (this.currentStep === 1) {
            backBtn.style.display = 'none';
        } else {
            backBtn.style.display = 'inline-block';
        }
        
        // Show/hide next button
        if (this.currentStep === this.maxSteps) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'inline-block';
        }
        
        // Update next button text
        if (this.currentStep === this.maxSteps - 1) {
            nextBtn.textContent = 'Подобрать Nokian';
        } else {
            nextBtn.textContent = 'Далее →';
        }
    }
    
    updateResults() {
        // Show results step
        document.getElementById('step4').classList.remove('hidden');
        
        // Update application summary
        this.updateApplicationSummary();
        
        // Initialize contact buttons
        this.initializeContactButtons();
        
        // Update step indicator
        this.currentStep = 4;
        this.updateStepIndicator();
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }
    
    updateApplicationSummary() {
        const summaryContainer = document.getElementById('applicationSummary');
        
        if (!summaryContainer) {
            console.error('Summary container not found!');
            return;
        }
        
        console.log('Updating application summary with data:', this.applicationData);
        
        let summaryHTML = '';
        
        if (this.applicationData.selection_type === 'by_car') {
            console.log('Car-based selection detected');
            if (this.applicationData.car_make && this.applicationData.car_model) {
                summaryHTML += `
                    <div class="summary-item">
                        <i class="bi bi-car-front icon"></i>
                        <span>${this.applicationData.car_make} ${this.applicationData.car_model}</span>
                    </div>
                `;
            }
        } else {
            console.log('Size-based selection detected');
            console.log('Tire data:', {
                width: this.applicationData.tire_width,
                profile: this.applicationData.tire_profile,
                radius: this.applicationData.tire_radius
            });
            if (this.applicationData.tire_width && this.applicationData.tire_profile && this.applicationData.tire_radius) {
                summaryHTML += `
                    <div class="summary-item">
                        <i class="bi bi-rulers icon"></i>
                        <span>${this.applicationData.tire_width}/${this.applicationData.tire_profile}/R${this.applicationData.tire_radius}</span>
                    </div>
                `;
            } else {
                console.log('Missing tire size data');
            }
        }
        
        // Season
        const seasonText = this.getSeasonText(this.applicationData.season);
        const seasonIcon = this.getSeasonIcon(this.applicationData.season);
        summaryHTML += `
            <div class="summary-item">
                <i class="bi ${seasonIcon} icon"></i>
                <span>${seasonText}</span>
            </div>
        `;
        
        // Winter type if applicable
        if (this.applicationData.season === 'winter' && this.applicationData.winter_type) {
            const winterTypeText = this.getWinterTypeText(this.applicationData.winter_type);
            const winterTypeIcon = this.getWinterTypeIcon(this.applicationData.winter_type);
            summaryHTML += `
                <div class="summary-item">
                    <i class="bi ${winterTypeIcon} icon"></i>
                    <span>${winterTypeText}</span>
                </div>
            `;
        }
        
        // Budget
        const budgetText = this.getBudgetText(this.applicationData.budget);
        summaryHTML += `
            <div class="summary-item">
                <i class="bi bi-cash-coin icon"></i>
                <span>${budgetText}</span>
            </div>
        `;
        
        // Priority
        const priorityText = this.getPriorityText(this.applicationData.priority);
        summaryHTML += `
            <div class="summary-item">
                <i class="bi bi-bullseye icon"></i>
                <span>${priorityText}</span>
            </div>
        `;
        
        summaryContainer.innerHTML = summaryHTML;
    }
    
    getSeasonText(season) {
        const seasonMap = {
            'summer': 'Летние',
            'winter': 'Зимние',
            'all_season': 'Всесезонные'
        };
        return seasonMap[season] || season;
    }
    
    getSeasonIcon(season) {
        const iconMap = {
            'summer': 'bi-sun',
            'winter': 'bi-snow',
            'all_season': 'bi-globe'
        };
        return iconMap[season] || 'bi-question';
    }
    
    getWinterTypeText(winterType) {
        const winterTypeMap = {
            'spikes': 'Шипы',
            'friction': 'Липучка'
        };
        return winterTypeMap[winterType] || winterType;
    }
    
    getWinterTypeIcon(winterType) {
        const iconMap = {
            'spikes': 'bi-lightning',
            'friction': 'bi-box'
        };
        return iconMap[winterType] || 'bi-question';
    }
    
    getBudgetText(budget) {
        const budgetMap = {
            'economy': 'До 15,000₽',
            'optimum': '15-25,000₽',
            'premium': '25,000₽+'
        };
        return budgetMap[budget] || budget;
    }
    
    getPriorityText(priority) {
        const priorityMap = {
            'safety': 'Безопасность',
            'comfort': 'Комфорт',
            'sport': 'Спорт',
            'economy': 'Экономия'
        };
        return priorityMap[priority] || priority;
    }
    
    submitApplication(contactType = null) {
        // Validate required fields
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (!fullName) {
            alert('Пожалуйста, введите ваше ФИО');
            return;
        }
        
        if (!phone) {
            alert('Пожалуйста, введите ваш телефон');
            return;
        }
        
        // Add contact type if provided
        if (contactType) {
            this.applicationData.contact_type = contactType;
        }
        
        // Update application data
        this.applicationData.full_name = fullName;
        this.applicationData.phone = phone;
        this.applicationData.email = document.getElementById('email').value.trim();
        
        // Get application summary
        const summary = this.getApplicationSummary();
        
        // Create message text
        const message = this.createMessageText(summary);
        
        // Save application to database first
        this.saveApplicationToDatabase();
        
        // Open WhatsApp or Telegram with pre-filled message
        if (contactType === 'whatsapp') {
            this.openWhatsApp(message);
        } else if (contactType === 'telegram') {
            this.openTelegram(message);
        } else {
            // Show success alert for other cases
            alert('Заявка успешно отправлена!');
            window.location.href = '/';
        }
    }
    
    getApplicationSummary() {
        const summary = {};
        
        // Get car information
        if (this.applicationData.car_make && this.applicationData.car_model) {
            summary.car = `${this.applicationData.car_make} ${this.applicationData.car_model}`;
        }
        
        // Get season information
        if (this.applicationData.season) {
            const seasonMap = {
                'summer': 'Летние',
                'winter': 'Зимние',
                'all_season': 'Всесезонные'
            };
            summary.season = seasonMap[this.applicationData.season] || this.applicationData.season;
        }
        
        // Get budget information
        if (this.applicationData.budget) {
            const budgetMap = {
                'budget_10_15': '10,000-15,000 ₽',
                'budget_15_25': '15,000-25,000 ₽',
                'budget_25_35': '25,000-35,000 ₽',
                'budget_35_50': '35,000-50,000 ₽',
                'budget_50_plus': '50,000+ ₽'
            };
            summary.budget = budgetMap[this.applicationData.budget] || this.applicationData.budget;
        }
        
        // Get priority information
        if (this.applicationData.priority) {
            const priorityMap = {
                'safety': 'Безопасность',
                'comfort': 'Комфорт',
                'sport': 'Спорт',
                'economy': 'Экономия'
            };
            summary.priority = priorityMap[this.applicationData.priority] || this.applicationData.priority;
        }
        
        return summary;
    }
    
    createMessageText(summary) {
        let message = `Здравствуйте! Я хочу заказать шины.\n\n`;
        message += `📋 Данные заявки:\n`;
        
        // Add car information
        if (summary.car) {
            message += `🚗 Автомобиль: ${summary.car}\n`;
        }
        
        // Add season information
        if (summary.season) {
            message += `🌤️ Сезон: ${summary.season}\n`;
        }
        
        // Add budget information
        if (summary.budget) {
            message += `💰 Бюджет: ${summary.budget}\n`;
        }
        
        // Add priority information
        if (summary.priority) {
            message += `🎯 Приоритет: ${summary.priority}\n`;
        }
        
        // Add contact information
        message += `\n👤 Контактные данные:\n`;
        message += `ФИО: ${this.applicationData.full_name}\n`;
        message += `Телефон: ${this.applicationData.phone}\n`;
        
        if (this.applicationData.email) {
            message += `Email: ${this.applicationData.email}\n`;
        }
        
        message += `\nПожалуйста, свяжитесь со мной для уточнения деталей заказа.`;
        
        return message;
    }
    
    openWhatsApp(message) {
        // Replace with your actual WhatsApp number (international format without +)
        const phoneNumber = '998914180518'; // Example: replace with your actual number
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    }
    
    openTelegram(message) {
        // Replace with your actual Telegram username (without @)
        const username = 'full_stack_dev_111'; // Example: replace with your actual username
        const encodedMessage = encodeURIComponent(message);
        const telegramUrl = `https://t.me/${username}?text=${encodedMessage}`;
        window.open(telegramUrl, '_blank');
    }
    
    backToWebsite() {
        // Only save to database if we have contact information
        if (this.applicationData.full_name && this.applicationData.phone) {
            this.saveApplicationToDatabase();
        }
        
        // Then redirect to main page
        window.location.href = '/';
    }
    
    saveApplicationToDatabase() {
        // Prepare data for database
        const applicationData = {
            selection_type: this.applicationData.selection_type,
            car_make: this.applicationData.car_make || '',
            car_model: this.applicationData.car_model || '',
            tire_width: this.applicationData.tire_width || null,
            tire_profile: this.applicationData.tire_profile || null,
            tire_radius: this.applicationData.tire_radius || null,
            season: this.applicationData.season || '',
            winter_type: this.applicationData.winter_type || '',
            budget: this.applicationData.budget || '',
            priority: this.applicationData.priority || '',
            full_name: this.applicationData.full_name || '',
            phone: this.applicationData.phone || '',
            email: this.applicationData.email || ''
        };
        
        // Send AJAX request to save application
        fetch('/save-application/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCSRFToken()
            },
            body: JSON.stringify(applicationData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Application saved successfully:', data.message);
            } else {
                console.error('Error saving application:', data.message);
            }
        })
        .catch(error => {
            console.error('Error saving application:', error);
        });
    }
    
    getCSRFToken() {
        // Get CSRF token from cookie
        const name = 'csrftoken';
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    resetToFirstStep() {
        this.currentStep = 1;
        this.applicationData = {
            selection_type: 'by_car',
            car_make: '',
            car_model: '',
            tire_width: '',
            tire_profile: '',
            tire_radius: '',
            season: '',
            winter_type: '',
            budget: '',
            priority: '',
            full_name: '',
            phone: '',
            email: ''
        };
        
        // Reset UI
        this.showCurrentStep();
        this.updateProgress();
        this.updateStepIndicator();
        this.updateNavigationButtons();
        
        // Reset form selections
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Reset form inputs
        document.getElementById('carMake').value = '';
        document.getElementById('carModel').value = '';
        document.getElementById('tireWidth').value = '';
        document.getElementById('tireProfile').value = '';
        document.getElementById('tireRadius').value = '';
        document.getElementById('fullName').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        
        // Hide winter type selections
        document.getElementById('winterTypeSelection').classList.add('hidden');
        document.getElementById('winterTypeSelectionSize').classList.add('hidden');
    }

    // Initialize contact method buttons
    initializeContactButtons() {
        document.querySelectorAll('.contact-method-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const method = e.currentTarget.dataset.method;
                this.submitApplication(method);
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TireSelection();
});
