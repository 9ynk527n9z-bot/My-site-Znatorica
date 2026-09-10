"""Package two identical authored readings with a ten-second pause, then encode AAC.
Requires macOS afconvert and CAF recordings from render-mcko-english5.swift.
"""
import array, hashlib, json, subprocess, sys, wave
from pathlib import Path
root = Path(__file__).resolve().parents[1]
recordings = Path(sys.argv[1])
output = root / 'public/audio/mcko/english-5'
output.mkdir(parents=True, exist_ok=True)
texts = json.loads((root / 'lib/mcko/english5/listening.json').read_text())
manifest = {'voice': 'Martha', 'identifier': 'com.apple.ttsbundle.siri_martha_en-GB_compact', 'locale': 'en-GB', 'gender': 'female', 'speechRate': 0.36, 'repeatCount': 2, 'pauseSeconds': 10, 'files': []}
for number, item in enumerate(texts, 1):
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
    assert 30 < frames / rate < 90, f'Unexpected reading duration {number}'
    silence = lambda seconds: bytes(int(rate * seconds) * width * channels)
    with wave.open(str(combined), 'wb') as writer:
        writer.setparams((channels, width, rate, 0, 'NONE', 'not compressed'))
        writer.writeframes(silence(0.5) + data + silence(10) + data + silence(1))
    subprocess.run(['/usr/bin/afconvert', '-f', 'm4af', '-d', 'aac', '-b', '64000', str(combined), str(dest)], check=True)
    manifest['files'].append({'variant': number, 'src': '/audio/mcko/english-5/' + dest.name, 'passageSeconds': round(frames/rate,3), 'totalSeconds': round(frames/rate*2+11.5,3), 'bytes': dest.stat().st_size, 'peak': peak, 'textSha256': hashlib.sha256(item['text'].encode()).hexdigest(), 'audioSha256': hashlib.sha256(dest.read_bytes()).hexdigest()})
    print(f'AUDIO_OK {number}: {frames/rate:.1f}s per reading; {dest.stat().st_size//1024} KB', flush=True)
(root / 'lib/mcko/english5/audio-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n')
print('COMPLETE: 20 British female recordings, each with two readings and a ten-second pause.')
