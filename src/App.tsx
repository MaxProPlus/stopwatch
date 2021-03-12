import React from 'react'
import {
  Button,
  Container,
  createMuiTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from '@material-ui/core'

// Установка темы
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

type S = {
  time: number
  idInterval: NodeJS.Timer | null
}

type P = {}

class App extends React.Component<P, S> {
  private readonly freqMs = 200 // частота обновления
  private startTime = 0 // Время запуска таймера
  private stopTime = 0 // Время остановки
  private firstTime = true // Флаг первого нажатия кнопки start

  constructor(props: P) {
    super(props)
    this.state = {
      time: 0,
      idInterval: null,
    }
  }

  componentWillUnmount() {
    this.stop()
  }

  // Перевод миллисекунд в формат h:mm:ss
  formatTime = (ms: number): string => {
    let time = ''
    const hour = Math.floor(ms / 1000 / 60 / 60 % 24)
    const minute = Math.floor(ms / 1000 / 60 % 60)
    const seconds = Math.floor(ms / 1000 % 60)
    // const milliseconds = Math.floor(ms % 1000)
    time += `${hour}:${minute
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    return time
  }

  // Сброс времени
  reset = () => {
    if (this.state.idInterval) {
      this.startTime = Date.now()
    } else {
      this.startTime = 0
    }
    this.stopTime = 0
    this.setState({
      time: 0,
    })
  }

  // Запуск таймера
  start = () => {
    // Если таймер запущен, то выйти
    if (this.state.idInterval) {
      return
    }
    // При первом запуске сбросить таймер
    if (this.firstTime) {
      this.firstTime = false
      this.reset()
    }
    this.startTime = Date.now() - (this.stopTime - this.startTime)
    this.setState({
      idInterval: setInterval(this.fInterval, this.freqMs),
    })
  }

  // Остановить таймер
  stop = () => {
    if (!this.state.idInterval) {
      return
    }
    this.stopTime = Date.now()
    clearInterval(this.state.idInterval)
    this.setState({
      idInterval: null,
    })
  }

  // Функция обновления таймера
  fInterval = () => {
    this.setState({
      time: Date.now() - this.startTime,
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Typography variant="h1" align="center">
            {this.formatTime(this.state.time)}
          </Typography>
          <Grid justify="space-around" container spacing={2}>
            <Grid item>
              {this.state.idInterval ? (
                <Button variant="contained" onClick={this.start}>
                  Start
                </Button>
              ) : (
                <Button variant="outlined" onClick={this.start}>
                  Start
                </Button>
              )}
            </Grid>
            <Grid item>
              {this.state.idInterval ? (
                <Button variant="outlined" onClick={this.stop}>
                  Stop
                </Button>
              ) : (
                <Button variant="contained" onClick={this.stop}>
                  Stop
                </Button>
              )}
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={this.reset}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    )
  }
}

export default App
