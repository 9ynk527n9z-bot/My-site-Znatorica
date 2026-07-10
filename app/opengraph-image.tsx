import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const logoData = readFileSync(join(process.cwd(), 'public', 'logo.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1E1035 0%, #2A1B4D 100%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoBase64} width="280" height="280" style={{ borderRadius: '50%', marginBottom: 24 }} alt="" />
        <div
          style={{
            fontSize: 32,
            color: '#F97316',
            display: 'flex',
          }}
        >
          Учись. Тренируйся. Сдавай.
        </div>
      </div>
    ),
    { ...size }
  );
}
