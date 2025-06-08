document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // bg-size-[2560px]
    setTimeout(() => {
        body.classList.remove("bg-size-[2560px]");
        body.classList.add("bg-size-[3840px]");
    }, 1500);
    setTimeout(() => {
        body.classList.remove("bg-size-[3840px]");
        body.classList.add("bg-size-[5120px]");
    }, 3000);
    setTimeout(() => {
        body.classList.remove("bg-size-[5120px]");
        body.classList.add("bg-size-[6400px]");
    }, 4500);
    setTimeout(() => {
        body.classList.remove("bg-size-[6400px]");
        body.classList.add("bg-size-[7680px]");
        window.location.href="./gameOver.html";
    }, 6000);
})