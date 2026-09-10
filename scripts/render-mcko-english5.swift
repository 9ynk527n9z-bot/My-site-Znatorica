// Render the authored listening passages with the installed British female voice.
// Usage: render-mcko-english5 input.json output-directory [maximum-count]
import Foundation
import AVFoundation

let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)
let records = try JSONSerialization.jsonObject(with: Data(contentsOf: input)) as! [[String: Any]]
let limit = min(records.count, CommandLine.arguments.count > 3 ? Int(CommandLine.arguments[3])! : records.count)
guard let voice = AVSpeechSynthesisVoice(identifier: "com.apple.ttsbundle.siri_martha_en-GB_compact"), voice.language == "en-GB", voice.gender == .female else {
    fputs("Required installed female en-GB Martha voice is unavailable.\n", stderr)
    exit(1)
}
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
let synthesizer = AVSpeechSynthesizer()
var index = 0
var audioFile: AVAudioFile?
var frames: AVAudioFramePosition = 0
var sampleRate: Double = 0
func renderNext() {
    if index >= limit { exit(0) }
    let utterance = AVSpeechUtterance(string: records[index]["text"] as! String)
    utterance.voice = voice
    utterance.rate = 0.36
    utterance.pitchMultiplier = 1
    utterance.volume = 1
    let destination = output.appendingPathComponent("passage-\(index+1).caf")
    frames = 0
    synthesizer.write(utterance) { buffer in
        guard let pcm = buffer as? AVAudioPCMBuffer else { return }
        if pcm.frameLength == 0 {
            audioFile = nil
            guard frames > 0 else { fputs("Empty recording\n", stderr); exit(2) }
            print("RECORDED \(index+1) \(String(format: "%.2f", Double(frames)/sampleRate)) seconds; voice=\(voice.name) locale=\(voice.language) female=true")
            fflush(stdout)
            index += 1
            DispatchQueue.main.asyncAfter(deadline: .now()+0.15) { renderNext() }
            return
        }
        do {
            if audioFile == nil {
                audioFile = try AVAudioFile(forWriting: destination, settings: pcm.format.settings)
                sampleRate = pcm.format.sampleRate
            }
            try audioFile!.write(from: pcm)
            frames += AVAudioFramePosition(pcm.frameLength)
        } catch { fputs("Audio write error: \(error)\n", stderr); exit(3) }
    }
}
let timeout = Timer.scheduledTimer(withTimeInterval: 300, repeats: false) { _ in fputs("Speech rendering timed out\n", stderr); exit(4) }
renderNext()
RunLoop.main.run()
