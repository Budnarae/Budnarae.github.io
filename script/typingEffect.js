document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("textBlip");

  const container = document.getElementById("dialogue");
  const lines = container.innerHTML.split("\n");
  container.innerHTML = "";

  let lineIndex = 0;

  function typeLine(text, i = 0, callback) {
    function typeChar() {
      if (i < text.length) {
        container.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeChar, 25); // 타이핑 속도 (ms 단위)
      } else {
        audio.pause();
        if (callback) callback();
      }
    }

    audio.play();
    typeChar();
  }

  function typeAllLines() {
    if (lineIndex < lines.length) {
      typeLine(lines[lineIndex], 0, () => {
        lineIndex++;
        container.innerHTML += "<br />";
        setTimeout(typeAllLines, 300); // 줄 간 대기 시간
      });
    }
  }

  typeAllLines();
});
