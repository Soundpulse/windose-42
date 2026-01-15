const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, 'node_modules/pixelarticons/svg');
const outputFile = path.join(__dirname, 'pixelarticons.css');

const files = fs.readdirSync(svgDir);

let css = '.pi { display: inline-block; width: 24px; height: 24px; background-size: contain; background-repeat: no-repeat; background-position: center; vertical-align: middle; image-rendering: pixelated; }\n';

files.forEach(file => {
  if (file.endsWith('.svg')) {
    const iconName = file.replace('.svg', '');
    const svgPath = path.join(svgDir, file);
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // Minimal encoding for data URI, replacing currentColor with white
    const svgContentModified = svgContent.replace(/currentColor/g, 'white');
    const encodedSvg = encodeURIComponent(svgContentModified)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');
      
    css += `.pi-${iconName} { background-image: url("data:image/svg+xml,${encodedSvg}"); }\n`;
  }
});

fs.writeFileSync(outputFile, css);
console.log(`Generated ${outputFile}`);
