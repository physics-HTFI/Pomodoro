/**
 * 音声を再生する
 */
export async function play(
  audioContext?: AudioContext,
  audioBuffer?: AudioBuffer,
) {
  if (!audioContext || !audioBuffer) return;

  await audioContext.resume();

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 1;
  gainNode.connect(audioContext.destination);

  const bufferSource = audioContext.createBufferSource();
  bufferSource.buffer = audioBuffer;
  bufferSource.connect(gainNode);
  bufferSource.start();
}
