import { useDateTime } from '../hooks/useDateTime'

export function DateTimeClock() {
  const { date, time } = useDateTime()

  return (
    <div className="datetime-clock">
      <span className="clock-time">{time}</span>
      <span className="clock-date">{date}</span>
    </div>
  )
}