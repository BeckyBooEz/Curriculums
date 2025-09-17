document.addEventListener('DOMContentLoaded', () => {
    const scroller = document.querySelector('.contenido');
    const secciones = [...document.querySelectorAll('.contenido section')];
    const indicadores = document.querySelectorAll('.indicadores button');
    const navButtons = document.querySelectorAll('.perfil-nav button');

    const allButtons = [...indicadores, ...navButtons];

    allButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(btn.dataset.target);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const byTarget = {};
    allButtons.forEach(btn => {
        const key = btn.dataset.target;
        (byTarget[key] ||= []).push(btn);
    });

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const key = `#${entry.target.id}`;
            allButtons.forEach(b => b.classList.remove('activo'));
            (byTarget[key] || []).forEach(b => b.classList.add('activo'));
        });
    }, { root: scroller, threshold: 0.6 });

    secciones.forEach(sec => io.observe(sec));
});