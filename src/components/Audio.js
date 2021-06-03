class Audio {
  static context = new (window.AudioContext || window.webkitAudioContext)();

  static masterGainNode = Audio.context.createGain();

  static filterGainNode = Audio.context.createGain();
}

export default Audio;
