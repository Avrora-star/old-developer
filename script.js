document.querySelectorAll('.main-btn').forEach(btn => {
    const container = btn.closest('.drag-container');
    const progress = container.querySelector('.progress');
    const dragText = container.querySelector('.drag-text');
    
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    const btnWidth = btn.offsetWidth;
    const containerWidth = container.offsetWidth;
    const maxDrag = containerWidth - btnWidth - 10;

    btn.addEventListener('mousedown', startDrag);
    btn.addEventListener('touchstart', startDrag);

    function startDrag(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        currentX = btn.offsetLeft;
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;

        const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const dragX = currentX + (x - startX);

        if (dragX < 0) {
            btn.style.left = '0px';
            progress.style.width = '0%';
        } else if (dragX > maxDrag) {
            btn.style.left = maxDrag + 'px';
            progress.style.width = '100%';
            dragText.textContent = 'Отпустите для перехода';
        } else {
            btn.style.left = dragX + 'px';
            const progressPercent = (dragX / maxDrag) * 100;
            progress.style.width = progressPercent + '%';

            if (progressPercent > 70) {
                dragText.textContent = 'Почти там...';
            } else {
                dragText.textContent = 'Потяните кнопку вправо';
            }
        }
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;

        const finalLeft = parseInt(btn.style.left || '0');
        if (finalLeft >= maxDrag - 10) {
            window.location.href = btn.getAttribute('href');
        } else {
            btn.style.left = '0px';
            progress.style.width = '0px';
            dragText.textContent = 'Потяните кнопку вправо';
        }
    }

    // Добавляем глобальные обработчики с привязкой к текущей кнопке
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
});