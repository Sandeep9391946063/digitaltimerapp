// Write your code here
import './index.css'

import {Component} from 'react'

const initailState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initailState

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimmer = () => {
    this.clearTimerInterval()
    this.setInterval(initailState)
  }

  IncrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSeconds, timerLimitInMinutes} =
      this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.IncrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const StartOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const StartOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            src={StartOrPauseImgUrl}
            alt={StartOrPauseAltText}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>

        <button
          className="timer-controller-btn"
          onClick={this.onResetTimmer}
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
            alt="reset icon"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const totalRemainingTime = timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingTime / 60)
    const seconds = Math.floor(totalRemainingTime % 60)
    const StringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const StringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${StringifiedMinutes}:${StringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labeltext = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="background">
        <h1 className="heading">Digital Timer</h1>.
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timerState">{labeltext}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
