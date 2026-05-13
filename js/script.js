document.addEventListener("DOMContentLoaded", () => {
  const heroImageFrame = document.getElementById("heroImageFrame");
  const heroImage = document.getElementById("heroImage");

  if (!heroImageFrame || !heroImage) {
    return;
  }

  // 1. 画面に入ったらふわっと表示
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroImageFrame.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.25,
    }
  );

  observer.observe(heroImageFrame);

  // 2. スクロールに応じてゆっくり拡大・移動
  const updateScrollAnimation = () => {
    const rect = heroImageFrame.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const progressRaw =
      1 - rect.top / windowHeight;

    const progress = Math.min(
      Math.max(progressRaw, 0),
      1.4
    );

    const imageScale = 1.08 + progress * 0.08;
    const frameTranslateY = progress * -18;

    heroImage.style.transform = `scale(${imageScale})`;
    heroImageFrame.style.translate = `0 ${frameTranslateY}px`;
  };

  window.addEventListener("scroll", updateScrollAnimation);
  updateScrollAnimation();

  // 3. マウス移動でほんの少し傾く
  heroImageFrame.addEventListener("mousemove", (event) => {
    const rect = heroImageFrame.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = ((centerY - y) / centerY) * 4;

    heroImageFrame.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroImageFrame.addEventListener("mouseleave", () => {
    heroImageFrame.style.transform =
      "rotateX(0deg) rotateY(0deg)";
  });
});
