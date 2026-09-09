(function init() {
  renderHistory();
  restoreSettings();
  updateDisplay();
  bindKeys();
  bindToolbar();
  bindKeyboard();
  console.log("CalcAIEP ready", calcState);
})();

function bindKeys() {
  document.getElementById("keypad").addEventListener("click", function (event) {
    var btn = event.target.closest("button");
    if (!btn) return;
    playClick();

    if (btn.dataset.digit !== undefined) {
      appendDigit(btn.dataset.digit);
      return;
    }
    if (btn.dataset.operator) {
      setOperator(btn.dataset.operator);
      return;
    }

    switch (btn.dataset.action) {
      case "equals":
        evaluate();
        break;
      case "clear":
        clearAll();
        break;
      case "clear-entry":
        clearEntry();
        break;
      case "backspace":
        backspace();
        break;
    }
  });
}

function bindToolbar() {
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document.getElementById("historyToggle").addEventListener("click", function () {
    document.getElementById("historyPanel").hidden = !document.getElementById("historyPanel").hidden;
  });
  document.getElementById("settingsToggle").addEventListener("click", function () {
    var panel = document.getElementById("settingsPanel");
    panel.hidden = !panel.hidden;
  });
  document.getElementById("helpToggle").addEventListener("click", function () {
    document.getElementById("helpModal").hidden = false;
  });
  document.getElementById("helpClose").addEventListener("click", function () {
    document.getElementById("helpModal").hidden = true;
  });
  document.getElementById("clearHistory").addEventListener("click", function () {
    clearHistoryView();
    showToast("Historial limpio");
  });
  document.getElementById("historyList").addEventListener("click", function (event) {
    var item = event.target.closest(".history-item");
    if (!item) return;
    setFromHistory(item.dataset.result);
  });
  document.getElementById("decimalPlaces").addEventListener("change", function (event) {
    decimal_places = parseInt(event.target.value);
    localStorage.setItem("decimals", decimal_places);
    showToast("Decimales: " + decimal_places);
  });
  document.getElementById("soundEnabled").addEventListener("change", function (event) {
    localStorage.setItem("sound", event.target.checked);
  });
}

function bindKeyboard() {
  document.addEventListener("keydown", function (event) {
    if (event.key >= "0" && event.key <= "9") {
      appendDigit(event.key);
      return;
    }
    if (event.key === ".") {
      appendDigit(".");
      return;
    }
    if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
      setOperator(event.key);
      return;
    }
    if (event.key === "Enter" || event.key === "=") {
      event.preventDefault();
      evaluate();
      return;
    }
    if (event.key === "Escape") {
      clearEntry();
      return;
    }
    if (event.key === "Delete") {
      clearAll();
      return;
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      backspace();
    }
  });
}

function toggleTheme() {
  document.body.classList.toggle("theme-dark");
  var dark = document.body.classList.contains("theme-dark");
  document.getElementById("themeToggle").textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("color-mode", dark ? "dark" : "light");
}

function restoreSettings() {
  var theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("theme-dark");
    document.getElementById("themeToggle").textContent = "☀️";
  }
  var decimals = localStorage.getItem("decimals");
  if (decimals) {
    decimal_places = parseInt(decimals);
    document.getElementById("decimalPlaces").value = decimals;
  }
  var sound = localStorage.getItem("sound");
  document.getElementById("soundEnabled").checked = sound;
}

function playClick() {
  var enabled = document.getElementById("soundEnabled").checked;
  if (!enabled) return;
  var audio = new Audio("assets/click.mp3");
  audio.play();
}

function showToast(message) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 1600);
}

window.addEventListener("load", function () {
  var params = new URLSearchParams(location.search);
  if (params.get("expr")) {
    calcState.current = legacy_eval(params.get("expr"));
    updateDisplay();
  }
});
