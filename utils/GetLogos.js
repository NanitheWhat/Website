import fs from 'fs';
import path from 'path';

export function GetLogos() {
  const logoDirectory = path.join(process.cwd(), 'public', 'images', 'logos');
  const logoFilenames = fs.readdirSync(logoDirectory);

  return logoFilenames.map(filename => ({
    src: `/images/logos/${filename}`,
    alt: `Logo ${path.parse(filename).name}`
  }));
}