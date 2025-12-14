document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     1920×1080 스케일
  =============================== */
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

  /* ===============================
     DOM
  =============================== */
  const rotateWrap = document.getElementById("rotate-wrap");
  const card = document.getElementById("card");
  const cardText = card?.querySelector(".card-text");
  const line = document.getElementById("intro-line");
  const meta = document.getElementById("meta-line");

  if (!rotateWrap || !card || !line || !meta || typeof gsap === "undefined") {
    console.warn("필수 요소 또는 GSAP 누락");
    return;
  }

  /* ===============================
     idle 흔들림
  =============================== */
  const idleTl = gsap.timeline({ repeat: -1 });

  function buildIdle() {
    idleTl.clear();
    idleTl
      .to(rotateWrap, {
        rotation: gsap.utils.random(-4, -2),
        duration: gsap.utils.random(1.8, 2.4),
        ease: "sine.inOut",
      })
      .to(rotateWrap, {
        rotation: gsap.utils.random(3, 5),
        duration: gsap.utils.random(2.0, 2.6),
        ease: "sine.inOut",
      })
      .to(rotateWrap, {
        rotation: gsap.utils.random(-1, 1),
        duration: gsap.utils.random(1.2, 1.6),
        ease: "sine.inOut",
        onComplete: buildIdle,
      });
  }
  buildIdle();

  /* ===============================
     타자 효과
  =============================== */
  const URL_SIM = "https://shgmlwl.github.io/-_2023720006-/";
  const URL_SEESAW = "https://shgmlwl.github.io/seesaw/";

  let typingTimer = null;

  function typeLine() {
    const raw = "지금, 심석용의 시소는 어디로 기울고 있는가?";
    line.textContent = "";

    gsap.to(line, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

    let i = 0;
    if (typingTimer) clearInterval(typingTimer);

    typingTimer = setInterval(() => {
      line.textContent += raw[i++];
      if (i >= raw.length) {
        clearInterval(typingTimer);

        line.innerHTML = raw
          .replace(
            "심석용",
            `<a class="intro-link blink" href="${URL_SIM}" target="_blank" rel="noopener noreferrer">심석용</a>`
          )
          .replace(
            "시소",
            `<a class="intro-link blink" href="${URL_SEESAW}" target="_blank" rel="noopener noreferrer">시소</a>`
          );
      }
    }, 45);
  }

  /* ===============================
     클릭 인터랙션
  =============================== */
  let opened = false;

  card.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    // who 깜빡임 제거 + 텍스트 변경
    card.classList.remove("who-blink");
    if (cardText) cardText.textContent = "심석용";
    else card.textContent = "심석용";

    // 카드 쿵
    gsap.fromTo(
      card,
      { yPercent: -18, scale: 0.96 },
      { yPercent: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    );

    // 순간 임펄스
    gsap.to(rotateWrap, {
      rotation: 7,
      duration: 0.7,
      ease: "power2.out",
    });

    // ✅ 문장 + 메타 같이 등장 (who 눌러야)
    gsap.delayedCall(0.25, typeLine);
    gsap.to(meta, { opacity: 1, y: 0, duration: 0.8, delay: 0.25 });
  });
});
