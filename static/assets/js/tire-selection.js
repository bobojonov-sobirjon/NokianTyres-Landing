// Tire Selection Quiz JavaScript
class TireSelection {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.quizData = {
            selectionType: 'by_car',
            carMake: '',
            carModel: '',
            season: '',
            winterType: '',
            budget: '',
            priority: '',
            fullName: '',
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
                 this.selectCard(e.currentTarget);
             });
         });
         
         // Car make selection
         document.getElementById('carMake').addEventListener('change', (e) => {
             this.updateCarModels(e.target.value);
         });
         
         // Season selection
         document.querySelectorAll('.option-card[data-season]').forEach(card => {
             card.addEventListener('click', (e) => {
                 this.selectSeason(e.currentTarget);
             });
         });
         
         // Winter type selection
         document.querySelectorAll('.option-card[data-winter-type]').forEach(card => {
             card.addEventListener('click', (e) => {
                 this.selectWinterType(e.currentTarget);
             });
         });
         
         // Budget selection
         document.querySelectorAll('.option-card[data-budget]').forEach(card => {
             card.addEventListener('click', (e) => {
                 this.selectBudget(e.currentTarget);
             });
         });
         
         // Priority selection
         document.querySelectorAll('.option-card[data-priority]').forEach(card => {
             card.addEventListener('click', (e) => {
                 this.selectPriority(e.currentTarget);
             });
         });
         
         // Contact method buttons
         document.querySelectorAll('.contact-method-card').forEach(btn => {
             btn.addEventListener('click', (e) => {
                 this.handleContactMethod(e.currentTarget.dataset.method);
             });
         });
     }
    
    selectCard(card) {
        // Remove active class from all cards
        document.querySelectorAll('.selection-card').forEach(c => c.classList.remove('active'));
        
        // Add active class to selected card
        card.classList.add('active');
        
        // Store selection
        this.quizData.selectionType = card.dataset.type;
        
        // Automatically proceed to next step after selection
        setTimeout(() => {
            this.nextStep();
        }, 500); // 0.5 second delay for better UX
    }
    
    selectSeason(card) {
        // Remove selected class from all season cards
        document.querySelectorAll('.option-card[data-season]').forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Store selection
        this.quizData.season = card.dataset.season;
        
        // Show/hide winter type selection based on selection type
        if (this.quizData.season === 'winter') {
            if (this.quizData.selectionType === 'by_car') {
                document.getElementById('winterTypeSelection').classList.remove('hidden');
            } else if (this.quizData.selectionType === 'by_size') {
                document.getElementById('winterTypeSelectionSize').classList.remove('hidden');
            }
            // Reset winter type when season changes to winter
            this.quizData.winterType = '';
        } else {
            document.getElementById('winterTypeSelection').classList.add('hidden');
            document.getElementById('winterTypeSelectionSize').classList.add('hidden');
            this.quizData.winterType = '';
            
            // If not winter, automatically proceed to next step after a short delay
            setTimeout(() => {
                this.nextStep();
            }, 800);
        }
    }
    
         selectWinterType(card) {
         // Remove selected class from all winter type cards
         document.querySelectorAll('.option-card[data-winter-type]').forEach(c => c.classList.remove('selected'));
         
         // Add selected class to clicked card
         card.classList.add('selected');
         
         // Store selection
         this.quizData.winterType = card.dataset.winterType;
         
         // Automatically proceed to next step after winter type selection
         setTimeout(() => {
             this.nextStep();
         }, 800);
     }
    
         selectBudget(card) {
         // Remove selected class from all budget cards
         document.querySelectorAll('.option-card[data-budget]').forEach(c => c.classList.remove('selected'));
         
         // Add selected class to clicked card
         card.classList.add('selected');
         
         // Store selection
         this.quizData.budget = card.dataset.budget;
         
         // Check if both budget and priority are selected, then proceed
         if (this.quizData.budget && this.quizData.priority) {
             setTimeout(() => {
                 this.nextStep();
             }, 800);
         }
     }
    
         selectPriority(card) {
         // Remove selected class from all priority cards
         document.querySelectorAll('.option-card[data-priority]').forEach(c => c.classList.remove('selected'));
         
         // Add selected class to clicked card
         card.classList.add('selected');
         
         // Store selection
         this.quizData.priority = card.dataset.priority;
         
         // Check if both budget and priority are selected, then proceed
         if (this.quizData.budget && this.quizData.priority) {
             setTimeout(() => {
                 this.nextStep();
             }, 800);
         }
     }
    
         nextStep() {
         if (this.validateCurrentStep()) {
             if (this.currentStep < this.totalSteps) {
                 this.currentStep++;
                 this.showStep(this.currentStep);
                 this.updateProgress();
                 this.updateStepIndicator();
             }
         }
     }
    
         previousStep() {
         if (this.currentStep > 1) {
             this.currentStep--;
             this.showStep(this.currentStep);
             this.updateProgress();
             this.updateStepIndicator();
         }
     }
    
         showStep(step) {
         // Hide all steps
         document.querySelectorAll('.quiz-step').forEach(s => s.classList.add('hidden'));
         
         // Show current step based on selection type
         if (step === 2) {
             if (this.quizData.selectionType === 'by_car') {
                 document.getElementById('step2').classList.remove('hidden');
             } else if (this.quizData.selectionType === 'by_size') {
                 document.getElementById('step2Size').classList.remove('hidden');
             }
         } else {
             document.getElementById(`step${step}`).classList.remove('hidden');
         }
         
         // Update application summary when showing the final step
         if (step === this.totalSteps) {
             this.updateApplicationSummary();
         }
     }
    
    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.quizData.selectionType !== '';
            case 2:
                if (this.quizData.selectionType === 'by_car') {
                    const carMake = document.getElementById('carMake').value;
                    const carModel = document.getElementById('carModel').value;
                    const season = this.quizData.season;
                    
                    if (!carMake || !carModel || !season) {
                        alert('Пожалуйста, заполните все поля');
                        return false;
                    }
                    
                    if (season === 'winter' && !this.quizData.winterType) {
                        alert('Пожалуйста, выберите тип зимних шин');
                        return false;
                    }
                    
                    this.quizData.carMake = carMake;
                    this.quizData.carModel = carModel;
                } else if (this.quizData.selectionType === 'by_size') {
                    const tireWidth = document.getElementById('tireWidth').value;
                    const tireProfile = document.getElementById('tireProfile').value;
                    const tireRadius = document.getElementById('tireRadius').value;
                    const season = this.quizData.season;
                    
                    if (!tireWidth || !tireProfile || !tireRadius || !season) {
                        alert('Пожалуйста, заполните все поля');
                        return false;
                    }
                    
                    if (season === 'winter' && !this.quizData.winterType) {
                        alert('Пожалуйста, выберите тип зимних шин');
                        return false;
                    }
                    
                    this.quizData.tireWidth = tireWidth;
                    this.quizData.tireProfile = tireProfile;
                    this.quizData.tireRadius = tireRadius;
                }
                return true;
            case 3:
                if (!this.quizData.budget || !this.quizData.priority) {
                    alert('Пожалуйста, выберите бюджет и приоритет');
                    return false;
                }
                return true;
            case 4:
                const fullName = document.getElementById('fullName').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                
                if (!fullName || !phone) {
                    alert('Пожалуйста, заполните ФИО и телефон');
                    return false;
                }
                
                this.quizData.fullName = fullName;
                this.quizData.phone = phone;
                this.quizData.email = email;
                return true;
            default:
                return true;
        }
    }
    
    updateProgress() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
    }
    
    updateStepIndicator() {
        document.querySelectorAll('.step-dot').forEach((dot, index) => {
            if (index < this.currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    
    

    
    updateApplicationSummary() {
        const summaryContainer = document.getElementById('applicationSummary');
        let summaryHTML = '';
        
        // First row: Car/Size and Season
        if (this.quizData.selectionType === 'by_car') {
            summaryHTML += `
                <div class="summary-row">
                    <div class="summary-item-half">
                        <i class="bi bi-car-front"></i>
                        <span>Автомобиль: ${this.quizData.carMake} ${this.quizData.carModel}</span>
                    </div>
                    <div class="summary-item-half">
                        <i class="bi bi-calendar"></i>
                        <span>Сезон: ${this.getSeasonText(this.quizData.season)}</span>
                    </div>
                </div>
            `;
        } else if (this.quizData.selectionType === 'by_size') {
            summaryHTML += `
                <div class="summary-row">
                    <div class="summary-item-half">
                        <i class="bi bi-rulers"></i>
                        <span>Размер шин: ${this.quizData.tireWidth}/${this.quizData.tireProfile} R${this.quizData.tireRadius}</span>
                    </div>
                    <div class="summary-item-half">
                        <i class="bi bi-calendar"></i>
                        <span>Сезон: ${this.getSeasonText(this.quizData.season)}</span>
                    </div>
                </div>
            `;
        }
        
        // Winter type (if applicable) - full width
        if (this.quizData.season === 'winter' && this.quizData.winterType) {
            summaryHTML += `
                <div class="summary-item">
                    <i class="bi bi-snow"></i>
                    <span>Тип зимних шин: ${this.getWinterTypeText(this.quizData.winterType)}</span>
                </div>
            `;
        }
        
        // Second row: Budget and Priority
        summaryHTML += `
            <div class="summary-row">
                <div class="summary-item-half">
                    <i class="bi bi-cash-coin"></i>
                    <span>Бюджет: ${this.getBudgetText(this.quizData.budget)}</span>
                </div>
                <div class="summary-item-half">
                    <i class="bi bi-bullseye"></i>
                    <span>Приоритет: ${this.getPriorityText(this.quizData.priority)}</span>
                </div>
            </div>
        `;
        
        summaryContainer.innerHTML = summaryHTML;
    }
    
    getSeasonText(season) {
        const seasons = {
            'summer': 'Летние',
            'winter': 'Зимние',
            'all_season': 'Всесезонные'
        };
        return seasons[season] || season;
    }
    
    getWinterTypeText(type) {
        const types = {
            'spikes': 'Шипы',
            'friction': 'Липучка'
        };
        return types[type] || type;
    }
    
    getBudgetText(budget) {
        const budgets = {
            'economy': 'До 15,000₽',
            'optimum': '15-25,000₽',
            'premium': '25,000₽+'
        };
        return budgets[budget] || budget;
    }
    
         getPriorityText(priority) {
         const priorities = {
             'safety': 'Безопасность',
             'comfort': 'Комфорт',
             'sport': 'Спорт',
             'economy': 'Экономия'
         };
         return priorities[priority] || priority;
     }
     
     updateCarModels(carMake) {
         const carModelSelect = document.getElementById('carModel');
         const models = this.getCarModels(carMake);
         
         // Очистить текущие модели
         carModelSelect.innerHTML = '<option value="">Выберите модель</option>';
         
         // Добавить новые модели
         models.forEach(model => {
             const option = document.createElement('option');
             option.value = model.toLowerCase().replace(/\s+/g, '_');
             option.textContent = model;
             carModelSelect.appendChild(option);
         });
         
         // Сбросить значение модели
         carModelSelect.value = '';
     }
     
     getCarModels(carMake) {
         const carModels = {
             'toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Avalon'],
             'bmw': ['X3', 'X5', '3 Series', '5 Series', '7 Series', 'X1', 'X6', 'M3', 'M5'],
             'mercedes': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'A-Class', 'CLA'],
             'audi': ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7', 'Q8', 'RS6', 'TT'],
             'volkswagen': ['Golf', 'Passat', 'Tiguan', 'Atlas', 'Jetta', 'Arteon', 'ID.4', 'Touareg'],
             'hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Accent', 'Veloster', 'Kona'],
             'kia': ['Forte', 'K5', 'Sportage', 'Telluride', 'Sorento', 'Rio', 'Stinger', 'Soul'],
             'lada': ['Granta', 'Vesta', 'Niva', 'Largus', 'XRAY', '4x4', 'Priora', 'Kalina'],
             'renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Koleos', 'Duster', 'Logan', 'Sandero'],
             'ford': ['Focus', 'Fusion', 'Escape', 'Explorer', 'F-150', 'Mustang', 'Edge', 'Expedition'],
             'other': ['Укажите модель']
         };
         
         return carModels[carMake] || ['Укажите модель'];
     }
    
    handleContactMethod(method) {
        const message = this.createContactMessage();
        
        if (method === 'whatsapp') {
            const whatsappUrl = `https://wa.me/998914180518?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        } else if (method === 'telegram') {
            const telegramUrl = `https://t.me/full_stack_dev_111?text=${encodeURIComponent(message)}`;
            window.open(telegramUrl, '_blank');
        }
    }
    
    createContactMessage() {
        let message = `Здравствуйте! Хочу оставить заявку на подбор шин.\n\n`;
        
        if (this.quizData.selectionType === 'by_car') {
            message += `Автомобиль: ${this.quizData.carMake} ${this.quizData.carModel}\n`;
        }
        
        message += `Сезон: ${this.getSeasonText(this.quizData.season)}\n`;
        
        if (this.quizData.season === 'winter' && this.quizData.winterType) {
            message += `Тип зимних шин: ${this.getWinterTypeText(this.quizData.winterType)}\n`;
        }
        
        message += `Бюджет: ${this.getBudgetText(this.quizData.budget)}\n`;
        message += `Приоритет: ${this.getPriorityText(this.quizData.priority)}\n\n`;
        message += `Контактные данные:\n`;
        message += `ФИО: ${this.quizData.fullName}\n`;
        message += `Телефон: ${this.quizData.phone}\n`;
        
        if (this.quizData.email) {
            message += `Email: ${this.quizData.email}\n`;
        }
        
        return message;
    }
    

    
    saveApplicationToDatabase() {
        // Validate form data
        if (!this.validateCurrentStep()) {
            return;
        }
        
        // Prepare data for submission
        const formData = {
            selection_type: this.quizData.selectionType,
            car_make: this.quizData.carMake || '',
            car_model: this.quizData.carModel || '',
            tire_width: this.quizData.tireWidth || null,
            tire_profile: this.quizData.tireProfile || null,
            tire_radius: this.quizData.tireRadius || null,
            season: this.quizData.season,
            winter_type: this.quizData.winterType || '',
            budget: this.quizData.budget,
            priority: this.quizData.priority,
            full_name: this.quizData.fullName,
            phone: this.quizData.phone,
            email: this.quizData.email || ''
        };
        
        // Show loading state
        const submitBtn = document.getElementById('submitApplicationBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Отправка...';
        }
        
        // Send data to backend
        fetch('/save-application/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCSRFToken()
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success message
                alert(data.message);
                
                // Reset form
                this.resetForm();
            } else {
                // Show error message
                alert('Ошибка: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
        })
        .finally(() => {
            // Reset button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Отправить заявку';
            }
        });
    }
    
    getCSRFToken() {
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
    
    resetForm() {
        this.currentStep = 1;
        this.quizData = {
            selectionType: 'by_car',
            carMake: '',
            carModel: '',
            season: '',
            winterType: '',
            budget: '',
            priority: '',
            fullName: '',
            phone: '',
            email: ''
        };
        
                 this.showStep(1);
         this.updateProgress();
         this.updateStepIndicator();
        
        // Сбросить все поля формы
        document.getElementById('carMake').value = '';
        document.getElementById('carModel').innerHTML = '<option value="">Сначала выберите марку</option>';
        document.getElementById('tireWidth').value = '';
        document.getElementById('tireProfile').value = '';
        document.getElementById('tireRadius').value = '';
        document.getElementById('fullName').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        
        // Сбросить все выбранные карточки
        document.querySelectorAll('.selection-card').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        document.getElementById('winterTypeSelection').classList.add('hidden');
        
        // Установить значения по умолчанию
        document.querySelector('.selection-card[data-type="by_car"]').classList.add('active');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    window.tireSelection = new TireSelection();
});
