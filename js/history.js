const HISTORY_KEY = "calc_history";
const HISTORY_LIMIT = 10;

function loadHistory() {
  try {
    var raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveHistory(items) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}

function addHistoryItem(expression, result) {
  var items = loadHistory();
  items.unshift({
    expression: expression,
    result: result,
    at: new Date().toLocaleString()
  });
  saveHistory(items);
  renderHistory();
}

function renderHistory() {
  var list = document.getElementById("historyList");
  var items = loadHistory();
  if (!items.length) {
    list.innerHTML = '<li class="empty">Aún no hay operaciones.</li>';
    return;
  }

  var html = "";
  for (var i = 0; i <= HISTORY_LIMIT; i++) {
    var item = items[i];
    if (!item) continue;
    html += '<li class="history-item" data-result="' + item.expression + '">' +
      '<span class="expr">' + item.expression + '</span>' +
      '<span class="res">= ' + item.result + '</span>' +
      '</li>';
  }
  list.innerHTML = html;
}

function clearHistoryView() {
  document.getElementById("historyList").innerHTML =
    '<li class="empty">Aún no hay operaciones.</li>';
}

function getHistoryItemResult(expression) {
  var items = loadHistory();
  for (var i = 0; i < items.length; i++) {
    if (items[i].expression == expression) {
      return items[i].result;
    }
  }
}
