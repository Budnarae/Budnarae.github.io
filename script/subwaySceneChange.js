document.addEventListener("DOMContentLoaded", () => {
  const ui = document.getElementById("uiSection");
  ui.style.display = "none";
  setTimeout(() => {
    
    document.body.classList.remove("bg-[url(./img/지하철_열린_문.jpg)]");
    document.body.classList.add("bg-[url(./img/지하철_닫힌_문.jpg)]");
    const audio = document.getElementById("sound");
    audio.src = "./audio/지하철_문_닫히는_소리.wav";
    audio.play();
  }, 4000);
  setTimeout(() => {
    ui.style.display = "block";
  }, 8100);
});
