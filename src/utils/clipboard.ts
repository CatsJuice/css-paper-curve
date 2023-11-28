function copy2clipboardFallback(text: string) {
  const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

function copy2clipboardInModernBrowsers(text: string) {
  navigator.clipboard.writeText(text);
}

export function copy2clipboard(text: string) {
  if (navigator.clipboard) {
    copy2clipboardInModernBrowsers(text);
  } else {
    copy2clipboardFallback(text);
  }
}