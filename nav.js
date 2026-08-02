(function () {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    function closeNav() {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
        if (event.target.tagName === "A") closeNav();
    });

    document.addEventListener("click", (event) => {
        if (!nav.classList.contains("is-open")) return;
        if (nav.contains(event.target) || toggle.contains(event.target)) return;
        closeNav();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeNav();
    });
})();
