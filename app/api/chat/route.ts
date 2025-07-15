import { type NextRequest, NextResponse } from "next/server"
import type { Product } from "../../lib/types"

// Mock products database (in real app, this would be from a database)
const allProducts: Product[] = [
  {
    id: "1",
    name: "Complete React Development Course",
    description: "Master React from basics to advanced concepts with hands-on projects",
    longDescription:
      "This comprehensive React course covers everything from basic components to advanced state management, hooks, and modern React patterns.",
    price: 899000,
    originalPrice: 1299000,
    image: "/placeholder.svg?height=300&width=400",
    category: "Programming",
    rating: 4.8,
    students: 15420,
    duration: "40 hours",
    level: "Intermediate",
  },
  {
    id: "2",
    name: "Data Science with Python",
    description: "Learn data analysis, visualization, and machine learning with Python",
    longDescription:
      "Dive deep into data science using Python. This course covers pandas, numpy, matplotlib, seaborn, and scikit-learn.",
    price: 1200000,
    originalPrice: 1800000,
    image: "/placeholder.svg?height=300&width=400",
    category: "Data Science",
    rating: 4.7,
    students: 8930,
    duration: "60 hours",
    level: "Beginner",
  },
  {
    id: "3",
    name: "Digital Marketing Masterclass",
    description: "Complete guide to digital marketing including SEO, social media, and PPC",
    longDescription:
      "Master all aspects of digital marketing from SEO and content marketing to social media advertising and email campaigns.",
    price: 650000,
    image: "/placeholder.svg?height=300&width=400",
    category: "Marketing",
    rating: 4.6,
    students: 12500,
    duration: "35 hours",
    level: "Beginner",
  },
  {
    id: "english-1",
    name: "American English Conversation Course",
    description: "Learn conversational English with native American speakers",
    longDescription:
      "Master American English pronunciation, idioms, and conversation skills with real native speakers from the US.",
    price: 750000,
    originalPrice: 950000,
    image: "/placeholder.svg?height=300&width=400",
    category: "Language",
    rating: 4.9,
    students: 18500,
    duration: "50 hours",
    level: "Intermediate",
  },
  {
    id: "english-2",
    name: "Business English with American Professionals",
    description: "Professional English communication skills taught by American business experts",
    longDescription:
      "Learn business English, presentation skills, and professional communication from American business professionals.",
    price: 1100000,
    image: "/placeholder.svg?height=300&width=400",
    category: "Language",
    rating: 4.8,
    students: 9200,
    duration: "45 hours",
    level: "Advanced",
  },
  {
    id: "programming-1",
    name: "JavaScript Fundamentals for Beginners",
    description: "Start your programming journey with JavaScript basics",
    longDescription: "Perfect introduction to programming using JavaScript. No prior experience needed.",
    price: 450000,
    originalPrice: 650000,
    image: "/placeholder.svg?height=300&width=400",
    category: "Programming",
    rating: 4.7,
    students: 22000,
    duration: "30 hours",
    level: "Beginner",
  },
  {
    id: "programming-2",
    name: "Python Programming Bootcamp",
    description: "Complete Python programming course from zero to hero",
    longDescription:
      "Comprehensive Python course covering basics to advanced topics including web development and data science.",
    price: 850000,
    image: "/placeholder.svg?height=300&width=400",
    category: "Programming",
    rating: 4.8,
    students: 16800,
    duration: "55 hours",
    level: "Beginner",
  },
]

// AI response logic
function generateAIResponse(message: string): { message: string; products: Product[] } {
  const lowerMessage = message.toLowerCase()

  // English learning queries
  if (lowerMessage.includes("english") && (lowerMessage.includes("american") || lowerMessage.includes("native"))) {
    return {
      message:
        "Great choice! Learning English with native American speakers is an excellent way to master authentic pronunciation and cultural nuances. I've found some perfect courses for you that feature real American instructors and focus on practical conversation skills.",
      products: allProducts.filter((p) => p.category === "Language"),
    }
  }

  // Programming for beginners
  if ((lowerMessage.includes("programming") || lowerMessage.includes("coding")) && lowerMessage.includes("beginner")) {
    return {
      message:
        "Perfect! Starting your programming journey is exciting. I recommend beginning with either JavaScript or Python - both are beginner-friendly and have great career prospects. Here are some excellent beginner courses:",
      products: allProducts.filter((p) => p.category === "Programming" && p.level === "Beginner"),
    }
  }

  // Data science with budget constraint
  if (lowerMessage.includes("data science") && (lowerMessage.includes("under") || lowerMessage.includes("budget"))) {
    const budgetProducts = allProducts.filter((p) => p.category === "Data Science" && p.price < 1000000)
    return {
      message:
        "I understand budget is important! Here are some excellent data science courses that offer great value for money. These courses provide comprehensive content without breaking the bank:",
      products: budgetProducts,
    }
  }

  // React development
  if (lowerMessage.includes("react") && (lowerMessage.includes("advanced") || lowerMessage.includes("development"))) {
    return {
      message:
        "React is an excellent choice for modern web development! Whether you're looking to advance your skills or start fresh, these React courses will take you from fundamentals to building production-ready applications:",
      products: allProducts.filter((p) => p.name.toLowerCase().includes("react")),
    }
  }

  // UI/UX design
  if (lowerMessage.includes("ui") || lowerMessage.includes("ux") || lowerMessage.includes("design")) {
    return {
      message:
        "UI/UX design is a fantastic field with high demand! Design skills are crucial in today's digital world. While I don't have specific UI/UX courses in my current database, I can recommend some related courses that include design principles:",
      products: allProducts.filter((p) => p.category === "Marketing").slice(0, 2),
    }
  }

  // General programming query
  if (lowerMessage.includes("programming") || lowerMessage.includes("coding") || lowerMessage.includes("development")) {
    return {
      message:
        "Programming is a great skill to learn! There are many paths you can take depending on your interests. Here are some popular programming courses to get you started:",
      products: allProducts.filter((p) => p.category === "Programming"),
    }
  }

  // General learning query
  if (lowerMessage.includes("learn") || lowerMessage.includes("course") || lowerMessage.includes("study")) {
    return {
      message:
        "I'd love to help you find the perfect learning path! Based on popular choices and career prospects, here are some highly recommended courses across different fields:",
      products: allProducts.slice(0, 4),
    }
  }

  // Default response
  return {
    message:
      "I'd be happy to help you find the right courses! Could you tell me more about what you're interested in learning? For example, are you looking for:\n\n• Programming/Development courses\n• Language learning (like English)\n• Data Science or Analytics\n• Digital Marketing\n• Design skills\n\nOr feel free to describe your specific goals and I'll recommend the best courses for you!",
    products: [],
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const response = generateAIResponse(message)

    return NextResponse.json(response)
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        message: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        products: [],
      },
      { status: 500 },
    )
  }
}
