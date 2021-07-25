const start = () => {
  const handsfree = new Handsfree({
    hands: {
      enabled: true,
      // The maximum number of hands to detect [0 - 4]
      maxNumHands: 4,

      // Minimum confidence [0 - 1] for a hand to be considered detected
      minDetectionConfidence: 0.8,

      // Minimum confidence [0 - 1] for the landmark tracker to be considered detected
      // Higher values are more robust at the expense of higher latency
      minTrackingConfidence: 0.75,
    },
    // Set this to your where you moved the models into
    assetsPath: '/PUBLIC/assets',
  });
  handsfree.useGesture({
    name: 'fuckyou',
    algorithm: 'fingerpose',
    models: 'hands',
    confidence: '9',
    description: [
      ['addCurl', 'Thumb', 'HalfCurl', 1],
      ['addDirection', 'Thumb', 'VerticalUp', 1],
      ['addCurl', 'Index', 'FullCurl', 1],
      ['addDirection', 'Index', 'VerticalUp', 1],
      ['addCurl', 'Middle', 'NoCurl', 1],
      ['addDirection', 'Middle', 'VerticalUp', 1],
      ['addCurl', 'Ring', 'FullCurl', 1],
      ['addDirection', 'Ring', 'VerticalUp', 1],
      ['addCurl', 'Pinky', 'FullCurl', 1],
      ['addDirection', 'Pinky', 'DiagonalUpRight', 1],
      ['addDirection', 'Pinky', 'DiagonalUpLeft', 1],
      ['addDirection', 'Thumb', 'VerticalDown', 1],
      ['addDirection', 'Index', 'VerticalDown', 1],
      ['addDirection', 'Middle', 'VerticalDown', 1],
      ['addDirection', 'Ring', 'VerticalDown', 1],
      ['addDirection', 'Pinky', 'DiagonalDownRight', 1],
      ['addDirection', 'Pinky', 'DiagonalDownLeft', 1],
      ['setWeight', 'Middle', 2],
    ],
  });
  handsfree.disablePlugins('browser');
  handsfree.disablePlugins('core');
  handsfree.plugin.palmPointers.disable();
  handsfree.start();
  document.querySelector('video').style =
    'position: fixed; top: 25px; right: 25px;';
  setInterval(() => {
    if (handsfree.data.hands?.landmarks?.flat().length > 0) {
      console.log(handsfree.data.hands);
      const canvas = document.createElement('canvas');
      canvas.width = handsfree.data.hands.image.width;
      canvas.height = handsfree.data.hands.image.height;
      const ctx = canvas.getContext('2d');
      ctx.scale(0.5, 0.5);
      ctx.drawImage(handsfree.data.hands.image, 0, 0);
      document
        .querySelector('#app')
        .insertBefore(canvas, document.querySelector('#app').firstChild);
    }
  }, 1000);
};

start();

// const createImage = async () => {
//   const formData = new FormData();
//   formData.append('file');

//   const res = await fetch('http://i.zephyr/fuck', {
//     method: 'post',
//     body: formData,
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   const { file } = await res.json();
//   return file;
// };
