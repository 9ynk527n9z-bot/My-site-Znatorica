export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Даём браузеру начать чтение файла до освобождения blob URL.
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
