document.addEventListener("DOMContentLoaded", () => {
  /* ================= 1920×1080 스케일 ================= */
  const layout = document.getElementById("layout");

  function fitLayout() {
    const scale = Math.min(
      window.innerWidth / 1920,
      window.innerHeight / 1080,
      1
    );

    layout.style.transform = `scale(${scale})`;
    layout.style.left = `${(window.innerWidth - 1920 * scale) / 2}px`;
    layout.style.top = `${(window.innerHeight - 1080 * scale) / 2}px`;
  }

  window.addEventListener("resize", fitLayout);
  fitLayout();

  /* ================= 시소 ================= */
  const rotateWrap = document.getElementById("rotate-wrap");
  const card = document.getElementById("card");
  const line = document.getElementById("intro-line");

  gsap.set(rotateWrap, { transformOrigin: "50% 100%" });

  /* idle 흔들림 */
  const idle = gsap.to(rotateWrap, {
    rotation: 6,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  /* 클릭 */
  let opened = false;

  card.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    idle.kill();
    card.textContent = "심석용";

    gsap.fromTo(
      card,
      { yPercent: -18, scale: 0.96 },
      { yPercent: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    );

    gsap.to(rotateWrap, {
      rotation: 8,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(rotateWrap, {
          rotation: -3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });

    gsap.to(line, { opacity: 1, duration: 0.6 });
  });
});
