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

(function () {
    function fallbackCopy(text) {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        let ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        return ok;
    }

    document.addEventListener("click", (event) => {
        const btn = event.target.closest(".pix-copy-btn");
        if (!btn) return;

        const key = btn.dataset.pixKey;
        if (!key) return;

        const showCopied = () => {
            const original = btn.dataset.originalLabel || btn.textContent;
            btn.dataset.originalLabel = original;
            btn.textContent = "Chave copiada!";
            btn.classList.add("is-copied");
            clearTimeout(btn._pixCopyTimeout);
            btn._pixCopyTimeout = setTimeout(() => {
                btn.textContent = original;
                btn.classList.remove("is-copied");
            }, 2000);
        };

        // Try the synchronous method first: it runs inside the click's user-gesture
        // window, which async Clipboard API calls can lose while awaiting a promise.
        if (fallbackCopy(key)) {
            showCopied();
        } else if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(key).then(showCopied).catch(() => {});
        }
    });
})();
