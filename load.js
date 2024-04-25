
const canvas = document.querySelector('#unity-canvas');
const fullscreenToggle = document.querySelector('#fullscreen-toggle');

const config = {
  dataUrl: 'dist/InteractivePeriodicTable_NoCompression.data',
  frameworkUrl: 'dist/InteractivePeriodicTable_NoCompression.framework.js',
  codeUrl: 'dist/InteractivePeriodicTable_NoCompression.wasm',
  streamingAssetsUrl: 'StreamingAssets',
  companyName: 'Ankara Atatürk Lisesi',
  productName: 'InteractivePeriodicTable',
  productVersion: '1.0'
};

let scaleToFit;
try { scaleToFit = !!JSON.parse(''); }
catch (_) { scaleToFit = true };

const progressHandler = progress => {
  const percent = progress * 100 + '%';
  canvas.style.background = 'linear-gradient(to right, white, white ' + percent + ', transparent ' + percent + ', transparent) no-repeat center';
  canvas.style.backgroundSize = '100% 1rem';
};

const onResize = () => {
  const container = canvas.parentElement;
  let w;
  let h;

  if (scaleToFit) {
    w = window.innerWidth;
    h = window.innerHeight;
    const r = 720 / 1280;

    if (w * r > window.innerHeight)
      w = Math.min(w, Math.ceil(h / r));
    h = Math.floor(w * r);
  } else {
    w = 1280;
    h = 720;
  }

  container.style.width = canvas.style.width = w + 'px';
  container.style.height = canvas.style.height = h + 'px';
  container.style.top = Math.floor((window.innerHeight - h) / 2) + 'px';
  container.style.left = Math.floor((window.innerWidth - w) / 2) + 'px';

  fullscreenToggle.style.width = (w / 25) + 'px';
  fullscreenToggle.style.height = (w / 25) + 'px';
};

createUnityInstance(canvas, config, progressHandler).then(instance => {
  canvas = instance.Module.canvas;
  onResize();
});
window.addEventListener('resize', onResize);
onResize();

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
  document.getElementsByTagName('head')[0].appendChild(meta);
}

