import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
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
          background: 'linear-gradient(135deg, #0A0812 0%, #16102A 100%)',
        }}
      >
        <div style={{ fontSize: 120, marginBottom: 20, display: 'flex' }}>🐿️</div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#ffffff',
            display: 'flex',
          }}
        >
          Знаторика
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#F97316',
            marginTop: 16,
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
