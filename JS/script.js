// Menu hamburger (vira X e abre/fecha o menu no celular)
const menuHamburger = document.querySelector(".menu-hamburger");
const nav = document.getElementById("nav");

function toggleMenu() {
    menuHamburger.classList.toggle("change");
    nav.classList.toggle("open");
}
menuHamburger.addEventListener("click", toggleMenu);
nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
        if (nav.classList.contains("open")) toggleMenu();
    })
);

// Header com fundo ao rolar
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
});

// Destaca no menu a seção visível
const sections = document.querySelectorAll("section[id]");
const navLinks = nav.querySelectorAll("a");
const spy = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((a) =>
                a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
            );
        });
    },
    { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

// Animação de entrada
const revealObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObs.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

// Filtro dos projetos
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".projetos-grid .card");
filters.forEach((btn) =>
    btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        cards.forEach((card) => {
            const show = cat === "all" || card.dataset.cat === cat;
            card.classList.toggle("hide", !show);
            if (show) card.classList.add("visible");
        });
    })
);

// Ano automático no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Lightbox dos painéis
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
const lbCap = lightbox.querySelector("figcaption");
function fecharLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
}
document.querySelectorAll(".zoom").forEach((el) =>
    el.addEventListener("click", () => {
        lbImg.src = el.dataset.full;
        lbImg.alt = el.dataset.title;
        lbCap.textContent = el.dataset.title + " · dados ocultados";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    })
);
lightbox.addEventListener("click", (e) => {
    if (e.target !== lbImg) fecharLightbox();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharLightbox();
});
