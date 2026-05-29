const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector("#themeToggle");
const quickAdd = document.querySelector("#quickAdd");
const timerButtons = document.querySelectorAll("[data-time]");
const timerMinutes = document.querySelector("#timerMinutes");
const doneCount = document.querySelector("#doneCount");
const noteInput = document.querySelector("#noteInput");
const saveNote = document.querySelector("#saveNote");
const noteOutput = document.querySelector("#noteOutput");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

quickAdd.addEventListener("click", () => {
  const current = Number(doneCount.textContent);
  doneCount.textContent = current + 1;
  quickAdd.animate(
    [
      { transform: "translateY(0)" },
      { transform: "translateY(-3px)" },
      { transform: "translateY(0)" },
    ],
    { duration: 220, easing: "ease-out" },
  );
});

timerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    timerButtons.forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    timerMinutes.textContent = button.dataset.time;
  });
});

saveNote.addEventListener("click", () => {
  const note = noteInput.value.trim();

  if (!note) {
    noteOutput.textContent = "先写下一条笔记，再保存。";
    return;
  }

  noteOutput.textContent = "已保存到本次页面会话。";
  sessionStorage.setItem("pulseboard-note", note);
});

const savedNote = sessionStorage.getItem("pulseboard-note");

if (savedNote) {
  noteInput.value = savedNote;
  noteOutput.textContent = "已恢复上次保存的笔记。";
}
