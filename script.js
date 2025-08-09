const URL = "skin-model/";
let model, webcam, labelContainer, maxPredictions;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  webcam = new tmImage.Webcam(300, 225, true);
  await webcam.setup();
  await webcam.play();
  document.getElementById("webcam").appendChild(webcam.canvas);

  labelContainer = document.getElementById("prediction");
  loop();
}

async function loop() {
  webcam.update();
  const prediction = await model.predict(webcam.canvas);
  let top = prediction[0];
  labelContainer.innerText = `Detected: ${top.className} (${(top.probability * 100).toFixed(1)}%)`;
  requestAnimationFrame(loop);
}

init();
