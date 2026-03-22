const editor = document.getElementById("editor");
const info = document.getElementById("info");

// AUTO SAVE
setInterval(() => {
  localStorage.setItem("script", editor.value);
}, 1000);

window.onload = () => {
  editor.value = localStorage.getItem("script") || "";
};

// COPY
function copyScript() {
  navigator.clipboard.writeText(editor.value);
  alert("Copied!");
}

// DOWNLOAD
function downloadScript() {
  const blob = new Blob([editor.value], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "script.lua";
  a.click();
}

// CLEAR
function clearEditor() {
  editor.value = "";
}

// FORMAT (basic)
function formatScript() {
  editor.value = editor.value
    .replace(/;/g, ";\n")
    .replace(/end/g, "\nend");
}

// LINE COUNT
function lineCount() {
  const lines = editor.value.split("\n").length;
  info.innerText = "Lines: " + lines;
}

// TEMPLATES
function loadTemplate(type) {
  if (type === "basic") {
    editor.value = `print("Hello Roblox!")`;
  }

  if (type === "medium") {
    editor.value = `local part = Instance.new("Part")
part.Parent = workspace
part.Position = Vector3.new(0,10,0)`;
  }

  if (type === "advanced") {
    editor.value = `local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
  print(player.Name .. " joined")
end)`;
  }
}

// TIPS
function showTips(level) {
  if (level === "basic") {
    info.innerText = "Basic: Use print(), variables, simple events.";
  }

  if (level === "medium") {
    info.innerText = "Medium: Use Instances, services, and connections.";
  }

  if (level === "hard") {
    info.innerText = "Hard: Use modules, remote events, optimization.";
  }

  if (level === "extreme") {
    info.innerText = "Extreme: Systems, frameworks, AI logic, advanced math.";
  }
}
