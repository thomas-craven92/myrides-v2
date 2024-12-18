export interface EventData {
  name: string
  date: string
  location: string
  description: string
  poster?: string
}

export interface Event extends EventData {
  id?: number
}