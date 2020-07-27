window.addEventListener('load', e => {
  const audio = document.getElementById('audio');
  const sampleList = document.getElementById('sample')
  const initButton = document.getElementById('initialise')

  const value = sampleList.options[sampleList.selectedIndex].value
  if (value == 'trap') {
    audio.src = 'music/two_face.mp3'
    audio.play()
  } else if (value == 'reggae') {
    audio.src = 'music/thug_dub.mp3'
    audio.play()
  } else {
    audio.src = 'music/blue_whale.mp3'
    audio.play()
  }

  let sampleQuality = 2048

  const audioContext = new AudioContext()
  const src = audioContext.createMediaElementSource(audio)
  const analyser = audioContext.createAnalyser()

  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  analyser.fftSize = sampleQuality

  sampleList.addEventListener('change', e => {
    const value = sampleList.options[sampleList.selectedIndex].value
    if (value == 'trap') {
      audio.src = 'music/two_face.mp3'
      audio.play()
    } else if (value == 'reggae') {
      audio.src = 'music/thug_dub.mp3'
      audio.play()
    } else {
      audio.src = 'music/blue_whale.mp3'
      audio.play()
    }
  })

  const red = '#db2146';
  const green = '#34eda3'
  const purple = '#cf51ad'
  const blue = '#51B1CF'

  const canvasWidth = canvas.width
  const canvasHeight = canvas.height
  const middleHeight = canvasHeight / 2

  function createBackground() {
    const background = context.createLinearGradient(0, 0, 0, canvasHeight)
    background.addColorStop(0, red)
    background.addColorStop(0.2, blue)
    background.addColorStop(0.8, green)
    background.addColorStop(1, red)

    return background
  }

  function createTopGradient(barHeight) {
    const topGradient = context.createLinearGradient(0, middleHeight - barHeight, 0, middleHeight)
    topGradient.addColorStop(0, red)
    topGradient.addColorStop(0.8, purple)
    topGradient.addColorStop(1, green)

    return topGradient;
  }

  function createBottomGradient(barHeight) {
    const bottomGradient = context.createLinearGradient(0, middleHeight, 0, middleHeight + barHeight)
    bottomGradient.addColorStop(0, green)
    bottomGradient.addColorStop(0.2, purple)
    bottomGradient.addColorStop(1, red)

    return bottomGradient;
  }


  context.fillStyle = createBackground()
  context.fillRect(0, 0, canvasWidth, canvasHeight)


  function initialiseVisualiser() {

    src.connect(analyser)
    analyser.connect(audioContext.destination)


    const bufferLength = analyser.frequencyBinCount

    const dataArray = new Uint8Array(bufferLength)

    let barWidth = (canvasWidth / bufferLength) * 2.5
    let barHeight
    let x = 0;


    function renderFrame() {
      requestAnimationFrame(renderFrame)
      context.clearRect(0, 0, canvas.width, canvas.height);

      x = 0

      analyser.getByteFrequencyData(dataArray)

      context.fillStyle = createBackground()
      context.fillRect(0, 0, canvasWidth, canvasHeight)

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]

        let topGradientStart = middleHeight - barHeight


        context.fillStyle = createTopGradient(barHeight)
        context.fillRect(x, topGradientStart, barWidth, barHeight)

        context.fillStyle = createBottomGradient(barHeight)
        context.fillRect(x, middleHeight, barWidth, barHeight)

        x += barWidth - 1
      }
    }

    renderFrame()

    audio.addEventListener('ended', e => {
      console.log('The audio has ended')
      cancelAnimationFrame(renderFrame)
    })

    audio.addEventListener('pause', e => {
      console.log('The audio has paused')
      cancelAnimationFrame(renderFrame)
    })
  }

  initButton.addEventListener('click', e => {
    initialiseVisualiser()
  })
})
