"""Package two identical authored readings with a ten-second pause, then encode AAC.
Requires macOS afconvert and CAF recordings from render-mcko-english5.swift (reused for VPR).
Usage: build-vpr-english-audio.py <klass> <recordings-dir> <variant-count>
"""
import array, hashlib, json, subprocess, sys, wave
from pathlib import Path

root = Path(__file__).resolve().parents[1]
klass = sys.argv[1]  # e.g. '3-klass'
recordings = Path(sys.argv[2])
count = int(sys.argv[3])
output = root / 'public/audio/vpr' / klass / 'angliyskiy'
output.mkdir(parents=True, exist_ok=True)
manifest = {
    'voice': 'Martha', 'identifier': 'com.apple.ttsbundle.siri_martha_en-GB_compact',
    'locale': 'en-GB', 'gender': 'female', 'speechRate': 0.36, 'repeatCount': 2, 'pauseSeconds': 10,
    'files': [],
}
for number in range(1, count + 1):
    original = recordings / f'passage-{number}.caf'
    pcm = recordings / f'passage-{number}.wav'
    combined = recordings / f'variant-{number}-twice.wav'
    dest = output / f'variant-{number}.m4a'
    subprocess.run(['/usr/bin/afconvert', '-f', 'WAVE', '-d', 'LEI16@22050', '-c', '1', str(original), str(pcm)], check=True)
    with wave.open(str(pcm), 'rb') as reader:
        channels, width, rate, frames, _, _ = reader.getparams()
        assert channels == 1 and width == 2 and rate == 22050
        data = reader.readframes(frames)
    samples = array.array('h', data)
    peak = max(abs(v) for v in samples)
    assert peak > 500, f'Empty or near-silent recording {number}'
    assert frames / rate > 1, f'Suspiciously short reading {number}'
    silence = lambda seconds: bytes(int(rate * seconds) * width * channels)
    with wave.open(str(combined), 'wb') as writer:
        writer.setparams((channels, width, rate, 0, 'NONE', 'not compressed'))
        writer.writeframes(silence(0.5) + data + silence(10) + data + silence(1))
    subprocess.run(['/usr/bin/afconvert', '-f', 'm4af', '-d', 'aac', '-b', '64000', str(combined), str(dest)], check=True)
    manifest['files'].append({
        'variant': number, 'src': f'/audio/vpr/{klass}/angliyskiy/{dest.name}',
        'passageSeconds': round(frames / rate, 3), 'totalSeconds': round(frames / rate * 2 + 11.5, 3),
        'bytes': dest.stat().st_size, 'peak': peak,
        'audioSha256': hashlib.sha256(dest.read_bytes()).hexdigest(),
    })
    print(f'AUDIO_OK {klass} {number}: {frames/rate:.1f}s per reading; {dest.stat().st_size//1024} KB', flush=True)
manifest_path = root / 'lib/vpr' / f'audio-manifest-{klass}-angliyskiy.json'
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(f'COMPLETE: {count} British female recordings for {klass} angliyskiy, each with two readings and a ten-second pause.')
