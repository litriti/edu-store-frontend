export interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  students: number
  duration: string
  level?: string
  instructor?: string
  learningOutcomes?: string[]
  curriculum?: {
    title: string
    lessons: number
    duration: string
  }[]
  reviews?: {
    author: string
    rating: number
    comment: string
    date: string
  }[]
}
