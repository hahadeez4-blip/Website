const validKeys = ["Test1", "Test2", "Test3"];
const editor = document.getElementById("editor");

// LOADING → SHOW KEY
setTimeout(() => {
  document.getElementById("loader").style.display = "none";
}, 2500);

// KEY SYSTEM
function checkKey() {
  const input = document.getElementById("keyInput").value;

  if (validKeys.includes(input)) {
    document.getElementById("keyScreen").style.display = "none";
    document.getElementById("hub").style.display = "block";
    notify("Access Granted ✅");
  } else {
    notify("Invalid Key ❌");
  }
}

// COPY
function copyScript() {
  navigator.clipboard.writeText(editor.value);
  notify("Copied Script 📋");
}

// DOWNLOAD
function downloadScript() {
  const blob = new Blob([editor.value], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "script.lua";
  a.click();
  notify("Downloaded 📥");
}

// CLEAR
function clearEditor() {
  editor.value = "";
  notify("Cleared 🧹");
}

// NOTIFICATION SYSTEM
function notify(msg) {
  const container = document.getElementById("notifyContainer");

  const div = document.createElement("div");
  div.className = "notify";
  div.innerText = msg;

  container.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
}
