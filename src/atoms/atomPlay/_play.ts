/**
 * 音声を再生する
 */
export function play(
  audioContext?: AudioContext,
  audioBuffer?: AudioBuffer,
  volume?: number
) {
  if (!audioContext || !audioBuffer) return;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = volume ?? 1;
  gainNode.connect(audioContext.destination);

  const bufferSource = audioContext.createBufferSource();
  bufferSource.buffer = audioBuffer;
  bufferSource.connect(gainNode);
  bufferSource.start();
}
