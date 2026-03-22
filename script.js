function loadModule(type) {
  const content = document.getElementById("content");

  if (type === "ui") {
    content.innerHTML = `
      <h2>UI Demo</h2>
      <p>Preview custom Roblox UI concepts.</p>
      <div class="fake-ui">⚡ Animated UI Panel ⚡</div>
    `;
  }

  if (type === "tools") {
    content.innerHTML = `
      <h2>Tools</h2>
      <button onclick="copyText()">Copy Example Code</button>
    `;
  }

  if (type === "scripts") {
    content.innerHTML = `
      <h2>Scripts</h2>
      <pre id="code">print("Hello Roblox!")</pre>
    `;
  }
}

function copyText() {
  navigator.clipboard.writeText('print("Hello Roblox!")');
  alert("Copied!");
}
