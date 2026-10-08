document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".tip-card");
    const openButtons = document.querySelectorAll("[data-modal-open]");
    const modals = document.querySelectorAll(".tip-modal");

    cards.forEach((card) => {
        card.addEventListener("click", (event) => {
            if (event.target.closest(".tip-detail-button")) return;

            const modalId = card.dataset.modal;
            openModal(modalId);
        });
    });

    openButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();

            const modalId = button.dataset.modalOpen;
            openModal(modalId);
        });
    });

    modals.forEach((modal) => {
        const closeButton = modal.querySelector(".tip-modal-close");
        const dim = modal.querySelector(".tip-modal-dim");

        if (closeButton) {
            closeButton.addEventListener("click", () => {
                closeModal(modal);
            });
        }

        if (dim) {
            dim.addEventListener("click", () => {
                closeModal(modal);
            });
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        modals.forEach((modal) => {
            if (modal.classList.contains("active")) {
                closeModal(modal);
            }
        });
    });

    function openModal(modalId) {
        const modal = document.getElementById(modalId);

        if (!modal) return;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }
});