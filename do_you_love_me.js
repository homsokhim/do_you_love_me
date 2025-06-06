const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container.yes");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// Mobile-friendly random movement for no button
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let moveTimeout;

const moveNoButton = () => {
  const containerRect = questionContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  
  // Ensure button stays within container bounds
  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;
  
  const newX = Math.floor(Math.random() * maxX);
  const newY = Math.floor(Math.random() * maxY);

  // Use transform for smoother animation
  noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
  noBtn.style.transition = isMobile ? 'transform 0.3s ease-out' : 'none';
  
  // Clear any pending timeout
  if (moveTimeout) clearTimeout(moveTimeout);
  
  // For mobile, add a delay before next possible movement
  if (isMobile) {
    moveTimeout = setTimeout(() => {
      noBtn.style.transition = 'none';
    }, 300);
  }
};

// Use both touch and mouse events for better mobile support
if (isMobile) {
  noBtn.addEventListener('touchstart', moveNoButton, {passive: true});
  noBtn.addEventListener('touchend', (e) => e.preventDefault());
} else {
  noBtn.addEventListener("mouseover", moveNoButton);
}

// Yes button functionality with improved mobile support
yesBtn.addEventListener(isMobile ? 'touchend' : 'click', (e) => {
  if (isMobile) e.preventDefault();
  
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    if (gifResult.tagName === 'VIDEO') {
      gifResult.currentTime = 0;
      gifResult.play();
    }
  }, 3000);
});

// Prevent scrolling when touching the no button on mobile
if (isMobile) {
  noBtn.addEventListener('touchmove', (e) => {
    e.preventDefault();
  }, {passive: false});
}