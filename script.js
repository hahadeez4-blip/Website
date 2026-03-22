const editor = document.getElementById("editor");

// Copy
function copyScript() {
  navigator.clipboard.writeText(editor.value);
  alert("Copied!");
}

// Download
function downloadScript() {
  const blob = new Blob([editor.value], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "script.lua";
  a.click();
}

// Clear
function clearEditor() {
  editor.value = "";
}

// Templates
function loadTemplate(type) {
  if (type === "basic") {
    editor.value = `print("Hello Roblox!")`;
  }

  if (type === "gui") {
    editor.value = `local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")`;
  }

  if (type === "tool") {
    editor.value = `local tool = script.Parent

tool.Activated:Connect(function()
  print("Tool used!")
end)`;
  }
}
