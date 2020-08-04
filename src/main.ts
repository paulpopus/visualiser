import './style.scss'

window.addEventListener('load', e => {
  const audio = document.getElementById('audio') as HTMLAudioElement

  const sampleList = document.getElementById('sample') as HTMLSelectElement
  const qualityList = document.getElementById('quality') as HTMLSelectElement
  const styleSelect = document.getElementById('style') as HTMLSelectElement
  const backgroundCheck = document.getElementById('background') as HTMLInputElement

  const initButton = document.getElementById('initialise') as HTMLButtonElement
  const splashScreen = document.querySelector('.splash-screen') as HTMLDivElement
  const topInterface = document.querySelector('.top-interface') as HTMLDivElement
  const bottomInterface = document.querySelector('.bottom-interface') as HTMLDivElement
  const mainContent = document.querySelector('.main-content') as HTMLDivElement

  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const context = canvas.getContext('2d')

  const auxillaryCanvas = document.getElementById('auxillary-canvas') as HTMLCanvasElement
  const auxillaryContext = auxillaryCanvas.getContext('2d')

  const backgroundCanvas = document.getElementById('background-canvas') as HTMLCanvasElement
  const backgroundContext = backgroundCanvas.getContext('2d', { alpha: false })


  /* Functions to help manage the canvases */
  const canvasControls = {
    canvasHeight: 0 as number,
    canvasWidth: 0 as number,
    percentageConstrain: 60, // Adjust this to change the following constraint sizing, lower is smaller graph
    constraints: 0 as number, // Limits the size of resulting graphs
    hasBackground: true,

    initialiseSizes() {
      this.canvasHeight = window.innerHeight
      this.canvasWidth = window.innerWidth

      this.constraints = this.canvasHeight - ((this.canvasHeight / 100) * this.percentageConstrain)

      visualiserRender.canvasHeight = this.canvasHeight
      visualiserRender.canvasWidth = this.canvasWidth
    },

    setCanvasDimensions(canvas: HTMLCanvasElement) {
      canvas.height = this.canvasHeight
      canvas.width = this.canvasWidth
    },

    updateHasBackground(value: Boolean) {
      this.hasBackground = value
    },

    clearCanvas(context: CanvasRenderingContext2D) {
      context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    },

    drawBlackBackground(context: CanvasRenderingContext2D) {
      context.fillStyle = '#000'
      context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
    },

    getFrequencyDataAsPercentage(frequencyData: number) {
      let percentage = Math.round(frequencyData / 255 * 100)

      return ((this.canvasHeight - this.constraints) / 100 * percentage)
    }
  }

  /* Functions to help manage the audio */
  const audioAnalysisControls = {
    audioContext: AudioContext,
    audioSource: MediaElementAudioSourceNode,
    audioAnalyser: {} as any,
    sampleQuality: 1024,
    bufferLength: 0 as number,
    dataArray: {} as Array<number>,

    initialiseAudio() {
      this.audioContext = new AudioContext()
      this.audioSource = this.audioContext.createMediaElementSource(audio)
      this.audioAnalyser = this.audioContext.createAnalyser()

      this.audioAnalyser.fftSize = this.sampleQuality

      this.updateBufferLength()
      this.updateDataArray()

      visualiserRender.updateBarWidth()
    },

    updateBufferLength() {
      this.bufferLength = this.audioAnalyser.frequencyBinCount
    },

    updateDataArray() {
      this.dataArray = new Uint8Array(this.bufferLength)
    },

    connectAudioInterfaces() {
      this.audioSource.connect(this.audioAnalyser)
      this.audioAnalyser.connect(this.audioContext.destination)
    },

    updateSampleQuality(value: Number) {
      this.sampleQuality = value

      this.audioAnalyser.fftSize = this.sampleQuality

      console.log('Quality is: ' + this.audioAnalyser.fftSize)

      this.updateBufferLength()
      this.updateDataArray()

      visualiserRender.updateBarWidth()
    },

    updateFrequencyData() {
      this.audioAnalyser.getByteFrequencyData(this.dataArray)
    }
  }

  const visualiserRender = {
    barWidth: 0 as number,
    barGap: 5 as number,
    canvasHeight: 0 as number,
    canvasWidth: 0 as number,
    middleHeight:  0 as number,
    bottomPadding: 200 as number,

    initialiseRenderer() {
      this.canvasHeight = canvasControls.canvasHeight
      this.canvasWidth = canvasControls.canvasWidth
      this.middleHeight = this.canvasHeight / 2
    },

    updateBarWidth() {
      this.barWidth = (canvasControls.canvasWidth / audioAnalysisControls.bufferLength) * 2.5
    },

    updateBarGap(value: number) {
      this.barGap = value
    },
  }

  const visualiserThemes = {
    colors: {
      ['red' as string]: '#db2146' as string,
      ['green' as string]: '#34eda3' as string,
      ['purple' as string]: '#cf51ad' as string,
      ['blue' as string]: '#51B1CF' as string,
      ['black' as string]: '#000' as string,
      ['XPgreen' as string]: '#A5EF08' as string,
    },
    selectedTheme: {} as any,
    offscreenCanvas: {} as HTMLCanvasElement,
    offscreenContext: {} as CanvasRenderingContext2D,

    createBackgroundContext() {
      const offscreenCanvas = document.createElement('canvas')
      offscreenCanvas.width = canvasControls.canvasWidth
      offscreenCanvas.height = canvasControls.canvasHeight

      const offscreenContext = offscreenCanvas.getContext('2d', { alpha: false })
      offscreenContext.fillStyle = 'yellow'
      offscreenContext.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height)

      this.offscreenCanvas = offscreenCanvas
      this.offscreenContext = offscreenContext
    },

    drawOnBackgroundContext(fillStyle: any) {
      this.offscreenContext.fillStyle = fillStyle
      this.offscreenContext.fillRect(0, 0, canvasControls.canvasWidth, canvasControls.canvasHeight)
    },

    updateSelectedTheme(theme: any) {
      this.selectedTheme = theme
      this.selectedTheme.updateBackground()
    },

    returnThemesAsArray() {
      return Object.keys(this.themes)
    },

    findThemeIndexByName(name: string) {
      const array = this.returnThemesAsArray()

      console.log('array:')
      console.log(array)

      for (let index = 0; index < array.length; index++) {
        const theme = array[index]
        console.log('theme is: ' + theme)
        console.log(typeof theme)

        if(theme == name) {
          console.log(index)
          return index
        } else {
          return null
        }
        /* return theme === name ? index : null */
      }
    },
    findThemeNameByIndex() {
      const array = this.returnThemesAsArray

    },
    themes: {
      hyperBars: {
        getColor(color: string) {
          return visualiserThemes.colors[color]
        },

        getOffscreenContext() {
          return visualiserThemes.offscreenContext
        },

        backgroundGradient() {
          const background = this.getOffscreenContext().createLinearGradient(0, 0, 0, canvasControls.canvasHeight)
          background.addColorStop(0, this.getColor('red'))
          background.addColorStop(0.2, this.getColor('green'))
          background.addColorStop(0.8, this.getColor('green'))
          background.addColorStop(1, this.getColor('red'))

          return background
        },

        topGradient(middleHeight: number, topGradientStart: number) {
          /* Initialise the gradient */
          const topGradient = context.createLinearGradient(0, topGradientStart, 0, middleHeight)

          /* Add color stops */
          topGradient.addColorStop(0, this.getColor('red'))
          topGradient.addColorStop(0.8, this.getColor('purple'))
          topGradient.addColorStop(1, this.getColor('green'))

          return topGradient
        },
        bottomGradient(middleHeight: number, barHeight: number) {
          /* Initialise the gradient */
          const bottomGradient = context.createLinearGradient(0, middleHeight, 0, middleHeight + barHeight)

          /* Add color stops */
          bottomGradient.addColorStop(0, this.getColor('green'))
          bottomGradient.addColorStop(0.2, this.getColor('purple'))
          bottomGradient.addColorStop(1, this.getColor('red'))

          return bottomGradient
        },

        drawTopBars(middleHeight: number, barHeight: number, barWidth: number, xPosition: number) {
          let topGradientStart = middleHeight - barHeight

          context.fillStyle = this.topGradient(middleHeight, topGradientStart)
          context.fillRect(xPosition, topGradientStart, barWidth, barHeight)
        },
        drawBottomBars(middleHeight: number, barHeight: number, barWidth: number, xPosition: number) {
          auxillaryContext.fillStyle = this.bottomGradient(middleHeight, barHeight)
          auxillaryContext.fillRect(xPosition, middleHeight, barWidth, barHeight)
        },

        // Call this command to draw the bars for this theme
        draw(middleHeight: number, barHeight: number, xPosition: number) {
          let barWidth = visualiserRender.barWidth
          barHeight = barHeight / 2

          this.drawTopBars(middleHeight, barHeight, barWidth, xPosition)
          this.drawBottomBars(middleHeight, barHeight, barWidth, xPosition)
        },

        // Initialise the background
        updateBackground() {
          visualiserRender.barGap = 5
          visualiserThemes.drawOnBackgroundContext(this.backgroundGradient())
        },
      },
      redOnRedBars: {
        getColor(color: string) {
          return visualiserThemes.colors[color]
        },

        getOffscreenContext() {
          return visualiserThemes.offscreenContext
        },

        backgroundGradient() {
          const background = this.getOffscreenContext().createLinearGradient(0, 0, 0, canvasControls.canvasHeight)
          background.addColorStop(0, this.getColor('red'))
          background.addColorStop(1, this.getColor('black'))

          return background
        },

        drawBars(middleHeight: number, barHeight: number, barWidth: number, xPosition: number) {
          context.fillStyle = this.getColor('red')
          context.fillRect(xPosition, canvasControls.canvasHeight - barHeight, barWidth, barHeight)
        },

        // Call this command to draw the bars for this theme
        draw(middleHeight: number, barHeight: number, xPosition: number) {
          let barWidth = visualiserRender.barWidth

          this.drawBars(middleHeight, barHeight, barWidth, xPosition)
        },

        // Initialise the background
        updateBackground() {
          visualiserRender.barGap = 5
          visualiserThemes.drawOnBackgroundContext(this.backgroundGradient())
        },
      },
      hyperLine: {
        getColor(color: string) {
          return visualiserThemes.colors[color]
        },

        getOffscreenContext() {
          return visualiserThemes.offscreenContext
        },

        backgroundGradient() {
          const background = this.getOffscreenContext().createLinearGradient(0, 0, 0, canvasControls.canvasHeight)

          background.addColorStop(0, this.getColor('red'))
          background.addColorStop(0.2, this.getColor('green'))
          background.addColorStop(1, this.getColor('green'))

          return background
        },

        drawBars(middleHeight: number, barHeight: number, barWidth: number, xPosition: number) {
          context.fillStyle = `rgb(255, 0, ${255 - barHeight})`
          context.fillRect(xPosition, (canvasControls.canvasHeight - barWidth / 2) - barHeight, barWidth, barWidth / 2)
        },

        // Call this command to draw the bars for this theme
        draw(middleHeight: number, barHeight: number, xPosition: number) {
          let barWidth = visualiserRender.barWidth

          this.drawBars(middleHeight, barHeight, barWidth, xPosition)
        },

        // Initialise the background
        updateBackground() {
          visualiserRender.barGap = -1
          visualiserThemes.drawOnBackgroundContext(this.backgroundGradient())
        },
      },
      windowsXPBars: {
        getColor(color: string) {
          return visualiserThemes.colors[color]
        },

        getOffscreenContext() {
          return visualiserThemes.offscreenContext
        },

        background() {
          return this.getColor('black')
        },

        drawBars(barHeight: number, barWidth: number, xPosition: number) {
          context.fillStyle = this.getColor('XPgreen')
          context.fillRect(xPosition, canvasControls.canvasHeight - barHeight, barWidth, barHeight)
        },

        // Call this command to draw the bars for this theme
        draw(middleHeight: number, barHeight: number, xPosition: number) {
          let barWidth = visualiserRender.barWidth

          this.drawBars(barHeight, barWidth, xPosition)
        },

        // Initialise the background
        updateBackground() {
          visualiserRender.barGap = 1
          visualiserThemes.drawOnBackgroundContext(this.background())
        },
      },
    }
  }

  const cookieControls = {
    has_cookie: false,
    cookie_name: 'visualiser-options',
    cookie: {},
    compareLimit: 5,

    // There's probably a better way to do this
    setCookie(name: String, value: String) {
      const date = new Date()
      // Three day expiration
      date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000))
      const expires = "; expires=" + date.toUTCString()

      document.cookie = name + "=" + (value || "") + expires + "; path=/"
    },

    getCookie(name: string) {
      const cookieName = name + "="
      const cookieArray = document.cookie.split(';')
      for (let index = 0; index < cookieArray.length; index++) {
        let cookieString = cookieArray[index]

        if (cookieString.includes(name)) {
          // Remove white space and get the string after the cookie name
          cookieString = cookieString.trim()
          cookieString = cookieString.slice(cookieName.length, cookieString.length)

          return JSON.parse(cookieString)
        }
      }
    },

    checkForCookie() {
      const cookie = this.getCookie(this.cookie_name)

      if (!(cookie === '')) {
        this.has_cookie = true
      }
    },

    writeCookie() {
      /* console.log(Object.keys(visualiserThemes.themes)) */
      const cookieContent = [
        Object.keys(visualiserThemes.themes)
      ]

      const cookieValue = JSON.stringify(cookieContent)

      this.setCookie(this.cookie_name, cookieValue)

      this.has_cookie = true
    },

    readCookie() {
      const cookie = this.getCookie(this.cookie_name)

      if (cookie) {
        this.cookie = cookie
        visualiserThemes.selectedTheme = this.cookie[0]
      }
    },
  }

  canvasControls.initialiseSizes()

  canvasControls.setCanvasDimensions(backgroundCanvas)
  canvasControls.setCanvasDimensions(auxillaryCanvas)
  canvasControls.setCanvasDimensions(canvas)

  visualiserRender.initialiseRenderer()

  visualiserThemes.createBackgroundContext()

  visualiserThemes.updateSelectedTheme(visualiserThemes.themes['hyperBars'])
  visualiserThemes.selectedTheme.updateBackground()

  backgroundContext.drawImage(visualiserThemes.offscreenCanvas, 0, 0)


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

  backgroundCheck.addEventListener('change', e => {
    backgroundCheck.checked ? canvasControls.updateHasBackground(true) : canvasControls.updateHasBackground(false)
  })

  function initialiseVisualiser() {


    audioAnalysisControls.initialiseAudio()
    audioAnalysisControls.connectAudioInterfaces()


    qualityList.addEventListener('change', e => {
      const value = qualityList.options[qualityList.selectedIndex].value
      if (value == 'extreme') {
        audioAnalysisControls.updateSampleQuality(4096)
      } else if (value == 'high') {
        audioAnalysisControls.updateSampleQuality(2048)
      } else if (value == 'medium') {
        audioAnalysisControls.updateSampleQuality(1024)
      } else if (value == 'low') {
        audioAnalysisControls.updateSampleQuality(512)
      }
    })

    // Dynamic bar height
    let barHeight: number = 0;
    // Position of a bar on the X axis
    let x: number = 0;

    styleSelect.addEventListener('change', e => {
      const value: string = styleSelect.options[styleSelect.selectedIndex].value

      if (value == 'hyperBars') {
        visualiserThemes.updateSelectedTheme(visualiserThemes.themes.hyperBars)
        cookieControls.writeCookie()
      } else if (value == 'redOnRedBars') {
        visualiserThemes.updateSelectedTheme(visualiserThemes.themes.redOnRedBars)
        cookieControls.writeCookie()
      } else if (value == 'hyperLine') {
        visualiserThemes.updateSelectedTheme(visualiserThemes.themes.hyperLine)
        cookieControls.writeCookie()
      } else if (value == 'windowsXPBars') {
        visualiserThemes.updateSelectedTheme(visualiserThemes.themes.windowsXPBars)
      }
    })

    function renderFrame() {
      requestAnimationFrame(renderFrame)

      canvasControls.clearCanvas(context)
      canvasControls.clearCanvas(auxillaryContext)

      // Reset x
      x = 0

      audioAnalysisControls.updateFrequencyData()

      if (canvasControls.hasBackground) {
        backgroundContext.drawImage(visualiserThemes.offscreenCanvas, 0, 0)
      } else {
        canvasControls.drawBlackBackground(backgroundContext)
      }



      for (var i = 0; i < audioAnalysisControls.bufferLength; i++) {
        barHeight = audioAnalysisControls.dataArray[i]
        barHeight = canvasControls.getFrequencyDataAsPercentage(audioAnalysisControls.dataArray[i])

        visualiserThemes.selectedTheme.draw(visualiserRender.middleHeight, barHeight, x)

        x += visualiserRender.barWidth + visualiserRender.barGap
      }
    }

    renderFrame()

/*     function draw() {
      requestAnimationFrame(draw);
      audioAnalysisControls.audioAnalyser.getByteTimeDomainData(audioAnalysisControls.dataArray);

      context.fillStyle = 'black';
      context.fillRect(0, 0, 1920, 1080);

      context.lineWidth = 2;
      context.strokeStyle = 'green';

      const sliceWidth = 1920 * 1.0 / audioAnalysisControls.bufferLength;
      let x = 0;

      context.beginPath();
      for(var i = 0; i < audioAnalysisControls.bufferLength; i++) {
        const v = audioAnalysisControls.dataArray[i]/128.0;
        const y = v * 200;

        if(i === 0)
          context.moveTo(x, y);
        else
          context.lineTo(x, y);

        x += sliceWidth;
      }

      context.lineTo(1920, 1080/2);
      context.stroke();
    };

    draw(); */

    audio.addEventListener('ended', e => {
      console.log('The audio has ended')
    })

    audio.addEventListener('pause', e => {
      console.log('The audio has paused')
    })
  }

  initButton.addEventListener('click', e => {
    splashScreen.classList.add('fading')
    mainContent.classList.remove('hidden')
    setTimeout(function() {
      splashScreen.classList.add('disabled')
    }, 200)
    initButton.disabled = true
    topInterface.classList.add('shown')
    bottomInterface.classList.add('shown')

    cookieControls.checkForCookie()

    initialiseVisualiser()

    /* Run cookies  */
    cookieControls.writeCookie()

/*     const value = sampleList.options[sampleList.selectedIndex].value
    if (value == 'trap') {
      audio.src = 'music/two_face.mp3'
      audio.play()
    } else if (value == 'reggae') {
      audio.src = 'music/thug_dub.mp3'
      audio.play()
    } else {
      audio.src = 'music/blue_whale.mp3'
      audio.play()
    } */
  })
})
