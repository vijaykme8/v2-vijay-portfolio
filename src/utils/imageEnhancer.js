// Image enhancement utilities for high-quality rendering

// Lanczos interpolation for high-quality upscaling
export const lanczosInterpolation = (src, dest, srcWidth, srcHeight, destWidth, destHeight) => {
  const lanczosKernel = (x, a = 3) => {
    if (x === 0) return 1;
    if (x > a || x < -a) return 0;
    const xpi = x * Math.PI;
    return (a * Math.sin(xpi) * Math.sin(xpi / a)) / (xpi * xpi);
  };

  const scaleX = srcWidth / destWidth;
  const scaleY = srcHeight / destHeight;

  for (let y = 0; y < destHeight; y++) {
    for (let x = 0; x < destWidth; x++) {
      const srcX = x * scaleX;
      const srcY = y * scaleY;

      let r = 0, g = 0, b = 0, a = 0, weightSum = 0;

      // Sample from source with Lanczos kernel
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const sampleX = Math.floor(srcX + dx);
          const sampleY = Math.floor(srcY + dy);

          if (sampleX >= 0 && sampleX < srcWidth && sampleY >= 0 && sampleY < srcHeight) {
            const weight = lanczosKernel(dx) * lanczosKernel(dy);
            const idx = (sampleY * srcWidth + sampleX) * 4;

            r += src[idx] * weight;
            g += src[idx + 1] * weight;
            b += src[idx + 2] * weight;
            a += src[idx + 3] * weight;
            weightSum += weight;
          }
        }
      }

      const destIdx = (y * destWidth + x) * 4;
      if (weightSum > 0) {
        dest[destIdx] = r / weightSum;
        dest[destIdx + 1] = g / weightSum;
        dest[destIdx + 2] = b / weightSum;
        dest[destIdx + 3] = a / weightSum;
      }
    }
  }
};

// Bicubic interpolation for smooth scaling
export const bicubicInterpolation = (src, dest, srcWidth, srcHeight, destWidth, destHeight) => {
  const cubic = (t, a, b, c, d) => {
    const t2 = t * t;
    const t3 = t2 * t;
    return 0.5 * (c - a + (2 * a - 5 * b + 4 * c - d + (3 * b - 3 * c + d - a) * t) * t + (b - c + (c - a + a - b) * t) * t2);
  };

  const scaleX = srcWidth / destWidth;
  const scaleY = srcHeight / destHeight;

  for (let y = 0; y < destHeight; y++) {
    for (let x = 0; x < destWidth; x++) {
      const srcX = x * scaleX;
      const srcY = y * scaleY;

      const x1 = Math.floor(srcX);
      const y1 = Math.floor(srcY);
      const x2 = Math.min(x1 + 1, srcWidth - 1);
      const y2 = Math.min(y1 + 1, srcHeight - 1);

      const fx = srcX - x1;
      const fy = srcY - y1;

      let r = 0, g = 0, b = 0, a = 0;

      for (let dy = -1; dy <= 2; dy++) {
        for (let dx = -1; dx <= 2; dx++) {
          const sampleX = Math.max(0, Math.min(srcWidth - 1, x1 + dx));
          const sampleY = Math.max(0, Math.min(srcHeight - 1, y1 + dy));
          const idx = (sampleY * srcWidth + sampleX) * 4;

          const weight = cubic(dx - fx, 0, 1, 0, 0) * cubic(dy - fy, 0, 1, 0, 0);

          r += src[idx] * weight;
          g += src[idx + 1] * weight;
          b += src[idx + 2] * weight;
          a += src[idx + 3] * weight;
        }
      }

      const destIdx = (y * destWidth + x) * 4;
      dest[destIdx] = Math.max(0, Math.min(255, r));
      dest[destIdx + 1] = Math.max(0, Math.min(255, g));
      dest[destIdx + 2] = Math.max(0, Math.min(255, b));
      dest[destIdx + 3] = Math.max(0, Math.min(255, a));
    }
  }
};

// Advanced sharpening filter
export const advancedSharpening = (imageData, amount = 0.5, radius = 1, threshold = 0) => {
  const { data, width, height } = imageData;
  const result = new Uint8ClampedArray(data.length);
  
  // Create blurred version
  const blur = new Uint8ClampedArray(data.length);
  
  // Gaussian blur
  const gaussianKernel = (sigma) => {
    const size = Math.ceil(sigma * 6);
    const kernel = new Float32Array(size * 2 + 1);
    let sum = 0;
    
    for (let i = -size; i <= size; i++) {
      kernel[i + size] = Math.exp(-(i * i) / (2 * sigma * sigma));
      sum += kernel[i + size];
    }
    
    for (let i = 0; i < kernel.length; i++) {
      kernel[i] /= sum;
    }
    
    return kernel;
  };

  const kernel = gaussianKernel(radius);
  const kernelSize = kernel.length;
  const halfKernel = Math.floor(kernelSize / 2);

  // Horizontal blur
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      
      for (let k = 0; k < kernelSize; k++) {
        const sampleX = Math.max(0, Math.min(width - 1, x + k - halfKernel));
        const idx = (y * width + sampleX) * 4;
        const weight = kernel[k];
        
        r += data[idx] * weight;
        g += data[idx + 1] * weight;
        b += data[idx + 2] * weight;
        a += data[idx + 3] * weight;
      }
      
      const idx = (y * width + x) * 4;
      blur[idx] = r;
      blur[idx + 1] = g;
      blur[idx + 2] = b;
      blur[idx + 3] = a;
    }
  }

  // Vertical blur
  const tempBlur = new Uint8ClampedArray(blur);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      
      for (let k = 0; k < kernelSize; k++) {
        const sampleY = Math.max(0, Math.min(height - 1, y + k - halfKernel));
        const idx = (sampleY * width + x) * 4;
        const weight = kernel[k];
        
        r += tempBlur[idx] * weight;
        g += tempBlur[idx + 1] * weight;
        b += tempBlur[idx + 2] * weight;
        a += tempBlur[idx + 3] * weight;
      }
      
      const idx = (y * width + x) * 4;
      blur[idx] = r;
      blur[idx + 1] = g;
      blur[idx + 2] = b;
      blur[idx + 3] = a;
    }
  }

  // Apply unsharp mask
  for (let i = 0; i < data.length; i += 4) {
    const diff = data[i] - blur[i];
    if (Math.abs(diff) > threshold) {
      result[i] = Math.min(255, Math.max(0, data[i] + diff * amount));
      result[i + 1] = Math.min(255, Math.max(0, data[i + 1] + diff * amount));
      result[i + 2] = Math.min(255, Math.max(0, data[i + 2] + diff * amount));
    } else {
      result[i] = data[i];
      result[i + 1] = data[i + 1];
      result[i + 2] = data[i + 2];
    }
    result[i + 3] = data[i + 3];
  }

  return result;
};

// Main enhancement function
export const enhanceImage = (img, options = {}) => {
  const {
    upscaleFactor = 2,
    sharpening = true,
    interpolation = 'lanczos',
    quality = 0.95
  } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const newWidth = img.width * upscaleFactor;
  const newHeight = img.height * upscaleFactor;

  canvas.width = newWidth;
  canvas.height = newHeight;

  // Enable high-quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Draw original image
  ctx.drawImage(img, 0, 0, newWidth, newHeight);

  if (sharpening) {
    const imageData = ctx.getImageData(0, 0, newWidth, newHeight);
    const enhancedData = advancedSharpening(imageData, 0.3, 1, 5);
    const enhancedImageData = new ImageData(enhancedData, newWidth, newHeight);
    ctx.putImageData(enhancedImageData, 0, 0);
  }

  return canvas;
};

// Quality detection and optimization
export const detectOptimalQuality = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Test device capabilities
  const dpr = window.devicePixelRatio || 1;
  const isRetina = dpr > 1;
  const hasHighPerformance = navigator.hardwareConcurrency > 4;
  
  if (isRetina && hasHighPerformance) {
    return {
      upscaleFactor: 2,
      interpolation: 'lanczos',
      sharpening: true,
      quality: 0.95
    };
  } else if (isRetina) {
    return {
      upscaleFactor: 1.5,
      interpolation: 'bicubic',
      sharpening: true,
      quality: 0.9
    };
  } else {
    return {
      upscaleFactor: 1,
      interpolation: 'bicubic',
      sharpening: false,
      quality: 0.85
    };
  }
}; 