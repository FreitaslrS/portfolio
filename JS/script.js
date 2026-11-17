// Textos gerados pelo script, conforme o idioma da página (<html lang>)
const isEN = document.documentElement.lang.toLowerCase().startsWith("en");
const t = isEN
    ? { hidden: "data hidden", shown: (n) => `${n} project${n === 1 ? "" : "s"} shown` }
    : { hidden: "dados ocultados", shown: (n) => `${n} projeto${n === 1 ? "" : "s"} exibido${n === 1 ? "" : "s"}` };

// Menu hamburger (vira X e abre/fecha o menu no celular)
const menuHamburger = document.querySelector(".menu-hamburger");
const nav = document.getElementById("nav");

function setMenu(open) {
    menuHamburger.classList.toggle("change", open);
    nav.classList.toggle("open", open);
    menuHamburger.setAttribute("aria-expanded", String(open));
    menuHamburger.setAttribute("aria-label", open ? menuHamburger.dataset.labelClose : menuHamburger.dataset.labelOpen);
}
menuHamburger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => setMenu(false))
);

// Header com fundo ao rolar
const header = document.querySelector(".header");
window.addEventListener(
    "scroll",
    () => header.classList.toggle("scrolled", window.scrollY > 20),
    { passive: true }
);

// Destaca no menu a seção visível
const sections = document.querySelectorAll("section[id]");
const navLinks = nav.querySelectorAll("a");
const spy = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((a) => {
                const active = a.getAttribute("href") === "#" + entry.target.id;
                a.classList.toggle("active", active);
                if (active) a.setAttribute("aria-current", "location");
                else a.removeAttribute("aria-current");
            });
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
const filtroStatus = document.getElementById("filtro-status");
filters.forEach((btn) =>
    btn.addEventListener("click", () => {
        filters.forEach((b) => {
            b.classList.toggle("active", b === btn);
            b.setAttribute("aria-pressed", String(b === btn));
        });
        const cat = btn.dataset.filter;
        let count = 0;
        cards.forEach((card) => {
            const show = cat === "all" || card.dataset.cat === cat;
            card.classList.toggle("hide", !show);
            if (show) {
                card.classList.add("visible");
                count++;
            }
        });
        filtroStatus.textContent = t.shown(count);
    })
);

// E-mail montado via JS (o endereço não fica em texto puro no HTML; sem JS o link continua funcionando)
document.querySelectorAll("[data-email-user]").forEach((a) => {
    a.href = "mailto:" + a.dataset.emailUser + "@" + a.dataset.emailDomain;
});

// Ano automático no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Lightbox dos painéis
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
const lbCap = lightbox.querySelector("figcaption");
const lbClose = lightbox.querySelector(".lb-close");
let lbTrigger = null;

function abrirLightbox(el) {
    lbTrigger = el;
    lbImg.src = el.dataset.full;
    lbImg.alt = el.dataset.title;
    lbCap.textContent = el.dataset.title + " · " + t.hidden;
    lightbox.inert = false;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lb-open");
    lbClose.focus();
}
function fecharLightbox() {
    if (!lightbox.classList.contains("open")) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.inert = true;
    document.body.classList.remove("lb-open");
    if (lbTrigger) lbTrigger.focus();
}
document.querySelectorAll(".zoom").forEach((el) =>
    el.addEventListener("click", () => abrirLightbox(el))
);
lightbox.addEventListener("click", (e) => {
    if (e.target !== lbImg) fecharLightbox();
});
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) {
        if (e.key === "Escape" && nav.classList.contains("open")) {
            setMenu(false);
            menuHamburger.focus();
        }
        return;
    }
    if (e.key === "Escape") fecharLightbox();
    // O único elemento focável dentro do lightbox é o botão de fechar
    if (e.key === "Tab") {
        e.preventDefault();
        lbClose.focus();
    }
});
