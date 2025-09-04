(function () {
  function createAd({
    title,
    message,
    buttonText,
    redirectUrl,
    duration = 15,
    noClose = 3,
    position = "center",
  }) {
    // Create overlay
    const adOverlay = document.createElement("div");
    adOverlay.style.position = "fixed";
    adOverlay.style.top = "0";
    adOverlay.style.left = "0";
    adOverlay.style.width = "100vw";
    adOverlay.style.height = "100vh";
    adOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    adOverlay.style.display = "flex";
    adOverlay.style.justifyContent = "center";
    adOverlay.style.alignItems = "center";
    adOverlay.style.zIndex = "2000";

    // Ad container
    const adBox = document.createElement("div");
    adBox.style.background = "linear-gradient(135deg, #1e1e2f, #2a2a3d)";
    adBox.style.color = "#fff";
    adBox.style.padding = "20px";
    adBox.style.borderRadius = "15px";
    adBox.style.maxWidth = "340px";
    adBox.style.textAlign = "center";
    adBox.style.position = "absolute";
    adBox.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    adBox.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
    adBox.style.animation = "fadeInUp 0.5s ease-out";
    adBox.style.cursor = "default";

    // Position
    if (position === "top-left") {
      adBox.style.top = "20px";
      adBox.style.left = "20px";
    } else if (position === "top-right") {
      adBox.style.top = "20px";
      adBox.style.right = "20px";
    } else if (position === "bottom-left") {
      adBox.style.bottom = "20px";
      adBox.style.left = "20px";
    } else if (position === "bottom-right") {
      adBox.style.bottom = "20px";
      adBox.style.right = "20px";
    } else {
      adBox.style.position = "relative"; // center
    }

    // Title + message
    const adContent = document.createElement("div");
    adContent.innerHTML = `
      <h3 style="margin-bottom: 12px; font-size:1.2rem; color:#00ffcc;">${title}</h3>
      <p style="margin-bottom: 15px; line-height:1.4; color:#ddd;">${message}</p>
    `;

    // Countdown
    const countdownDisplay = document.createElement("div");
    countdownDisplay.style.fontSize = "0.95rem";
    countdownDisplay.style.fontWeight = "600";
    countdownDisplay.style.marginBottom = "15px";
    countdownDisplay.style.color = "#ffcc00";
    countdownDisplay.textContent = `Closing in ${duration} s`;

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "10px";
    closeBtn.style.right = "10px";
    closeBtn.style.width = "32px";
    closeBtn.style.height = "32px";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "50%";
    closeBtn.style.background = "#ff4757";
    closeBtn.style.color = "#fff";
    closeBtn.style.fontSize = "20px";
    closeBtn.style.fontWeight = "700";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.display = "none";
    closeBtn.style.boxShadow = "0 3px 6px rgba(0,0,0,0.2)";

    // Button
    const watchBtn = document.createElement("button");
    watchBtn.textContent = buttonText;
    watchBtn.style.background =
      "linear-gradient(90deg, #00ffcc, #00b894)";
    watchBtn.style.color = "#000";
    watchBtn.style.border = "none";
    watchBtn.style.borderRadius = "12px";
    watchBtn.style.padding = "10px 20px";
    watchBtn.style.fontWeight = "700";
    watchBtn.style.cursor = "pointer";
    watchBtn.style.marginTop = "10px";
    watchBtn.style.transition = "all 0.3s ease";
    watchBtn.onmouseover = () =>
      (watchBtn.style.transform = "scale(1.05)");
    watchBtn.onmouseout = () => (watchBtn.style.transform = "scale(1)");

    // Events
    function closeAd() {
      if (document.body.contains(adOverlay)) {
        document.body.removeChild(adOverlay);
      }
      clearInterval(countdownInterval);
    }
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAd();
    });
    watchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(redirectUrl, "_blank", "noopener");
      closeAd();
    });
    adOverlay.addEventListener("click", () => {
      window.open(redirectUrl, "_blank", "noopener");
      closeAd();
    });
    adBox.addEventListener("click", (e) => e.stopPropagation());

    // Append
    adBox.appendChild(adContent);
    adBox.appendChild(countdownDisplay);
    adBox.appendChild(watchBtn);
    adBox.appendChild(closeBtn);
    adOverlay.appendChild(adBox);
    document.body.appendChild(adOverlay);

    // Show close button later
    setTimeout(() => {
      closeBtn.style.display = "block";
    }, noClose * 1000);

    // Countdown
    let secondsLeft = duration;
    const countdownInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft >= 0) {
        countdownDisplay.textContent = `Redirecting in ${secondsLeft} s`;
      }
      if (secondsLeft <= 0) {
        window.open(redirectUrl, "_blank", "noopener");
        closeAd();
      }
    }, 1000);
  }

  // Example: multiple ads with different content
  createAd({
    title: "🎉 Special Offer!",
    message: "Get 100% off your order. Limited time only. Get your free hacking link with intelligent",
    buttonText: "Copy Free Premium hacking link",
    redirectUrl:
      "https://t.me/intelligentverificationlinkbot?start=r08170101305",
    position: "bottom-right",
    duration: 10,
  });

  createAd({
    title: "📢 Join our WhatsApp Group",
    message:
      "Stay updated! Join our WhatsApp group and never miss important updates.",
    buttonText: "Join Now",
    redirectUrl:
      "https://whatsapp.com/channel/0029VbAg5MvBPzjdUwLpRh0J/218",
    position: "top-left",
    duration: 12,
  });
})();
