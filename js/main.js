document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const clickBtn = document.querySelector('.btn_cat');
    const counter = document.querySelector('h1');
    const progressLine = document.querySelector('.lvl_info_line');
    const currentLevelSpan = document.querySelector('.lvl_info_prev span');
    const nextLevelSpan = document.querySelector('.lvl_info_next span');
    const currentProgress = document.querySelector('.bottom_progress span:first-child');
    const maxProgress = document.querySelector('.bottom_progress span:last-child');

    // Начальные значения
    let totalClicks = 0; // Общее количество кликов
    let level = 1;
    let baseClickValue = 10; // Начальное значение клика
    let requiredClicks = 1024; // Кликов нужно для следующего уровня

    // Обновление интерфейса
    function updateUI() {
        // Плавное изменение счетчика
        animateValue(counter, parseInt(counter.textContent), totalClicks, 500);

        // Расчет прогресса для текущего уровня
        const progressPercent = Math.min(((totalClicks - getTotalClicksForLevel(level)) / (requiredClicks - getTotalClicksForLevel(level))) * 100, 100);
        progressLine.style.background = `linear-gradient(to right, #FFFFFF ${progressPercent}%, #3B3B3B ${progressPercent}%)`;

        // Обновление текста прогресса
        animateValue(currentProgress, parseInt(currentProgress.textContent), totalClicks - getTotalClicksForLevel(level), 500);
        animateValue(maxProgress, parseInt(maxProgress.textContent), requiredClicks - getTotalClicksForLevel(level), 500);

        // Обновление уровней
        currentLevelSpan.textContent = level;
        nextLevelSpan.textContent = level + 1;
    }

    // Функция для расчета общего количества кликов для уровня
    function getTotalClicksForLevel(lvl) {
        let total = 0;
        for (let i = 1; i < lvl; i++) {
            total += 1024 * Math.pow(2, i - 1);
        }
        return total;
    }

    // Функция для плавной анимации чисел
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Функция для отображения анимации +N при клике
    function showFloatingPlus(x, y, value) {
        const plus = document.createElement('div');
        plus.className = 'floating-plus';
        plus.textContent = `+${value}`;
        plus.style.position = 'absolute';
        plus.style.left = `${x}px`;
        plus.style.top = `${y}px`;
        plus.style.color = '#2563eb'; // Цвет текста
        plus.style.fontSize = '1.5rem'; // Размер шрифта
        plus.style.transition = 'transform 0.8s ease, opacity 0.8s ease'; // Плавный переход
        document.body.appendChild(plus);

        // Анимация
        setTimeout(() => {
            plus.style.transform = 'translateY(-30px)'; // Поднимаем текст
            plus.style.opacity = '0'; // Уменьшаем непрозрачность
        }, 10);

        setTimeout(() => plus.remove(), 800); // Удаляем элемент через 800 мс
    }

    // Обработчик клика
    clickBtn.addEventListener('click', function(e) {
        const clickValue = baseClickValue; // Увеличиваем на 10
        totalClicks += clickValue;

        // Получаем координаты клика для анимации
        const rect = clickBtn.getBoundingClientRect();
        const x = e.clientX - rect.left + rect.width / 2; // Центр кнопки
        const y = e.clientY - rect.top - 10; // Немного выше кнопки
        showFloatingPlus(x, y, clickValue);

        // Проверка на переход на новый уровень
        if (totalClicks >= requiredClicks) {
            level++;
            requiredClicks += 1024 * Math.pow(2, level - 1); // Увеличиваем требуемое количество кликов
            baseClickValue += 1; // Увеличиваем значение клика на 1 с каждым уровнем

            // Анимация перехода уровня
            progressLine.style.transition = 'background 0.5s ease';
            setTimeout(() => {
                progressLine.style.background = '#3B3B3B';
                progressLine.style.transition = 'background 0.1s ease';
                setTimeout(() => {
                    progressLine.style.background = `linear-gradient(to right, #FFFFFF 0%, #3B3B3B 0%)`;
                }, 100);
            }, 500);
        }

        updateUI();
    });

    // Инициализация
    updateUI();
});

// Обработчик для плавных переходов между страницами
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики кликов для всех ссылок в меню
    const menuLinks = document.querySelectorAll('.header a');
    menuLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });

    // Обработчики для кнопки "В главное меню"
    const backLinks = document.querySelectorAll('.top_menu a');
    backLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        });
    });
    
    // Анимация появления страницы
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    }, 50);
});

// Анимация для клика по кнопке кота
document.addEventListener('DOMContentLoaded', function() {
    const clickBtn = document.querySelector('.btn_cat');
    
    if (clickBtn) {
        clickBtn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        clickBtn.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        clickBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Анимация "пульсации" для кнопки кота
        setInterval(() => {
            if (!clickBtn.classList.contains('pulse')) {
                clickBtn.classList.add('pulse');
                setTimeout(() => {
                    clickBtn.classList.remove('pulse');
                }, 1000);
            }
        }, 5000);
    }
});
