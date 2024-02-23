export function loadGPT() {
  console.log('load GPT');
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = resolve;
    document.head.appendChild(script);
    script.src = 'https://www.googletagservices.com/tag/js/gpt.js';
  });
}
