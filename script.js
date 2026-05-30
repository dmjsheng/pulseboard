const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector("#themeToggle");
const quickAdd = document.querySelector("#quickAdd");
const timerButtons = document.querySelectorAll("[data-time]");
const timerMinutes = document.querySelector("#timerMinutes");
const doneCount = document.querySelector("#doneCount");
const noteInput = document.querySelector("#noteInput");
const saveNote = document.querySelector("#saveNote");
const noteOutput = document.querySelector("#noteOutput");

const calendarGrid = document.querySelector("#calendarGrid");
const calendarMonth = document.querySelector("#calendarMonth");
const prevMonth = document.querySelector("#prevMonth");
const nextMonth = document.querySelector("#nextMonth");
const todayButton = document.querySelector("#todayButton");
const selectedDateLabel = document.querySelector("#selectedDateLabel");
const eventForm = document.querySelector("#eventForm");
const eventTime = document.querySelector("#eventTime");
const eventTitle = document.querySelector("#eventTitle");
const eventList = document.querySelector("#eventList");
const emptyEvents = document.querySelector("#emptyEvents");

const today = new Date();
const eventStorageKey = "pulseboard-events";
let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedDate = toDateKey(today);

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

prevMonth.addEventListener("click", () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
  renderCalendar();
});

todayButton.addEventListener("click", () => {
  const currentDate = new Date();

  visibleMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  selectedDate = toDateKey(currentDate);
  renderCalendar();
});

eventForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = eventTitle.value.trim();

  if (!title) {
    eventTitle.focus();
    return;
  }

  const events = getEvents();
  const dateEvents = events[selectedDate] || [];

  dateEvents.push({
    id: createEventId(),
    time: eventTime.value,
    title,
  });

  events[selectedDate] = dateEvents;
  saveEvents(events);
  eventForm.reset();
  renderCalendar();
  renderEvents();
});

function renderCalendar() {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const events = getEvents();

  calendarMonth.textContent = `${year}年 ${month + 1}月`;
  calendarGrid.replaceChildren();

  for (let index = 0; index < firstDay; index += 1) {
    const spacer = document.createElement("span");
    spacer.className = "calendar-spacer";
    calendarGrid.append(spacer);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const dateKey = toDateKey(date);
    const button = document.createElement("button");

    button.type = "button";
    button.className = "day-button";
    button.textContent = day;
    button.setAttribute("aria-label", `${year}年${month + 1}月${day}日`);

    if (dateKey === selectedDate) {
      button.classList.add("is-selected");
    }

    if (dateKey === toDateKey(new Date())) {
      button.classList.add("is-today");
    }

    if (events[dateKey]?.length) {
      button.classList.add("has-event");
    }

    button.addEventListener("click", () => {
      selectedDate = dateKey;
      renderCalendar();
      renderEvents();
    });

    calendarGrid.append(button);
  }

  renderEvents();
}

function renderEvents() {
  const events = getEvents()[selectedDate] || [];
  const selected = parseDateKey(selectedDate);

  selectedDateLabel.textContent = `${selected.getFullYear()}年 ${
    selected.getMonth() + 1
  }月${selected.getDate()}日`;
  eventList.replaceChildren();
  emptyEvents.hidden = events.length > 0;

  events
    .slice()
    .sort((first, second) => first.time.localeCompare(second.time))
    .forEach((item) => {
      const eventItem = document.createElement("li");
      const eventMeta = document.createElement("span");
      const eventText = document.createElement("strong");
      const deleteButton = document.createElement("button");

      eventMeta.textContent = item.time || "全天";
      eventText.textContent = item.title;
      deleteButton.type = "button";
      deleteButton.className = "event-delete";
      deleteButton.textContent = "删除";
      deleteButton.addEventListener("click", () => deleteEvent(item.id));

      eventItem.append(eventMeta, eventText, deleteButton);
      eventList.append(eventItem);
    });
}

function deleteEvent(id) {
  const events = getEvents();
  const nextEvents = (events[selectedDate] || []).filter((item) => item.id !== id);

  if (nextEvents.length) {
    events[selectedDate] = nextEvents;
  } else {
    delete events[selectedDate];
  }

  saveEvents(events);
  renderCalendar();
  renderEvents();
}

function getEvents() {
  try {
    return JSON.parse(localStorage.getItem(eventStorageKey)) || {};
  } catch {
    return {};
  }
}

function saveEvents(events) {
  localStorage.setItem(eventStorageKey, JSON.stringify(events));
}

function createEventId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(year, month - 1, day);
}

renderCalendar();
