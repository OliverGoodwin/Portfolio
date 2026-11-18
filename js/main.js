document.addEventListener('DOMContentLoaded', () => {
    // Carousel Scroll
    const track = document.getElementById('projects-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (track && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = track.querySelector('.project-card');
            return card ? card.offsetWidth + 24 : 350;
        };

        const updateButtonStates = () => {
            const tolerance = 5;
            prevBtn.disabled = track.scrollLeft <= tolerance;
            nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - tolerance;
        };

        prevBtn.addEventListener('click', () => {
            track.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        track.addEventListener('scroll', updateButtonStates);
        window.addEventListener('resize', updateButtonStates);
        updateButtonStates();
    }


    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalCounter = document.getElementById('modal-counter');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');

    let currentImages = [];
    let currentIndex = 0;

    const updateModalImage = () => {
        if (currentImages.length > 0) {
            const currentItem = currentImages[currentIndex];
            modalImg.src = currentItem.url;
            modalCaption.textContent = currentItem.caption || '';
            modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
            modalPrev.disabled = currentIndex === 0;
            modalNext.disabled = currentIndex === currentImages.length - 1;
        }
    };

    document.querySelectorAll('.gallery-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            try {
                currentImages = JSON.parse(trigger.getAttribute('data-images'));
                currentIndex = 0;
                if (currentImages && currentImages.length > 0) {
                    updateModalImage();
                    modal.classList.add('active');
                }
            } catch (e) {
                console.error("Invalid image array format", e);
            }
        });
    });

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            modalImg.src = '';
        }
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    if (modalPrev) {
        modalPrev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateModalImage();
            }
        });
    }

    if (modalNext) {
        modalNext.addEventListener('click', () => {
            if (currentIndex < currentImages.length - 1) {
                currentIndex++;
                updateModalImage();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!modal || !modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateModalImage();
        }
        if (e.key === 'ArrowRight' && currentIndex < currentImages.length - 1) {
            currentIndex++;
            updateModalImage();
        }
    });
});