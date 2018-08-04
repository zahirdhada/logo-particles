import $ from 'jquery';

const imageDataLoader = async (imgUrl) => {
  const img = document.createElement('img');
  const promise = new Promise((resolve, reject) => {
    $(img).one('load', () => {
      try {
        resolve(handleImageLoad(img));
      } catch (e) {
        reject(e);
      }
    });
    $(img).one('error', (e) => reject(e));
  });
  img.src = imgUrl;
  return promise;
};

const handleImageLoad = (img) => {
  const width = img.naturalWidth;
  const height = img.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  const pixelData = ctx.getImageData(0, 0, width, height).data;

  const pixels = [];
  for (let i = 0, n = pixelData.length; i < n; i += 4) {
    if (pixelData[i + 3] !== 0) {
      const idx = Math.floor(i / 4);
      pixels.push({
        x: idx % width,
        y: Math.floor(idx / width),
        r: pixelData[i],
        g: pixelData[i + 1],
        b: pixelData[i + 2],
        a: pixelData[i + 3],
      });
    }
  }
  return { pixels, width: width, height: height };
};

export default imageDataLoader;
