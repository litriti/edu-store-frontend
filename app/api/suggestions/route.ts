import { type NextRequest, NextResponse } from "next/server"
import type { Product } from "../../lib/types"

// Mock AI suggestions based on user behavior
const mockSuggestions: Product[] = [
  {
    id: "ai-1",
    name: "Advanced React Patterns & Performance",
    description: "Take your React skills to the next level with advanced patterns and optimization techniques",
    longDescription:
      "This advanced React course focuses on performance optimization, advanced patterns like render props, compound components, and custom hooks. Perfect for experienced React developers.",
    price: 1200000,
    originalPrice: 1600000,
    image: "/a.jpg?height=300&width=400",
    category: "Programming",
    rating: 4.9,
    students: 3200,
    duration: "35 hours",
    level: "Advanced",
    instructor: "Sarah Mitchell",
    learningOutcomes: [
      "Master advanced React patterns",
      "Optimize React app performance",
      "Build reusable component libraries",
      "Implement complex state logic",
      "Debug and profile React applications",
    ],
    curriculum: [
      { title: "Advanced Patterns", lessons: 10, duration: "12 hours" },
      { title: "Performance Optimization", lessons: 8, duration: "10 hours" },
      { title: "Testing Strategies", lessons: 6, duration: "8 hours" },
      { title: "Production Best Practices", lessons: 5, duration: "5 hours" },
    ],
    reviews: [
      { author: "James Wilson", rating: 5, comment: "Incredible advanced content!", date: "2024-01-18" },
      { author: "Maria Garcia", rating: 5, comment: "Perfect for senior developers.", date: "2024-01-15" },
    ],
  },
  {
    id: "ai-2",
    name: "Full-Stack JavaScript Development",
    description: "Complete full-stack development with React, Node.js, and MongoDB",
    longDescription:
      "Build complete web applications from frontend to backend using the MERN stack. Includes authentication, database design, and deployment strategies.",
    price: 1350000,
    image: "/a.jpg?height=300&width=400",
    category: "Programming",
    rating: 4.8,
    students: 5600,
    duration: "65 hours",
    level: "Intermediate",
    instructor: "Carlos Rodriguez",
    learningOutcomes: [
      "Build full-stack web applications",
      "Master the MERN stack",
      "Implement user authentication",
      "Design scalable databases",
      "Deploy to cloud platforms",
    ],
    curriculum: [
      { title: "Frontend with React", lessons: 15, duration: "20 hours" },
      { title: "Backend with Node.js", lessons: 12, duration: "18 hours" },
      { title: "Database Design", lessons: 8, duration: "12 hours" },
      { title: "Deployment & DevOps", lessons: 10, duration: "15 hours" },
    ],
    reviews: [
      { author: "Lisa Chen", rating: 5, comment: "Comprehensive full-stack course!", date: "2024-01-16" },
      { author: "Ryan O'Connor", rating: 4, comment: "Great practical projects.", date: "2024-01-12" },
    ],
  },
  {
    id: "ai-3",
    name: "Modern Web Development with Next.js",
    description: "Build production-ready web applications with Next.js and React",
    longDescription:
      "Master Next.js for building fast, SEO-friendly web applications. Covers SSR, SSG, API routes, and deployment with Vercel.",
    price: 1050000,
    image: "/a.jpg?height=300&width=400",
    category: "Programming",
    rating: 4.9,
    students: 4100,
    duration: "40 hours",
    level: "Intermediate",
    instructor: "Emma Thompson",
    learningOutcomes: [
      "Master Next.js framework",
      "Implement SSR and SSG",
      "Build API routes",
      "Optimize for performance and SEO",
      "Deploy with Vercel and other platforms",
    ],
    curriculum: [
      { title: "Next.js Fundamentals", lessons: 12, duration: "15 hours" },
      { title: "Advanced Features", lessons: 10, duration: "12 hours" },
      { title: "Performance & SEO", lessons: 6, duration: "8 hours" },
      { title: "Deployment Strategies", lessons: 4, duration: "5 hours" },
    ],
    reviews: [
      { author: "Daniel Kim", rating: 5, comment: "Best Next.js course out there!", date: "2024-01-14" },
      { author: "Sophie Anderson", rating: 5, comment: "Very up-to-date and practical.", date: "2024-01-10" },
    ],
  },{
    id: "1",
    name: "Complete React Development Course",
    description: "Master React from basics to advanced concepts with hands-on projects",
    longDescription:
      "This comprehensive React course covers everything from basic components to advanced state management, hooks, and modern React patterns. You'll build real-world projects and learn industry best practices.",
    price: 899000,
    originalPrice: 1299000,
    image: "/a.jpg?height=300&width=400",
    category: "Programming",
    rating: 4.8,
    students: 15420,
    duration: "40 hours",
    level: "Intermediate",
    instructor: "John Smith",
    learningOutcomes: [
      "Build modern React applications from scratch",
      "Master React Hooks and Context API",
      "Implement state management with Redux",
      "Create responsive and interactive UIs",
      "Deploy React apps to production",
    ],
    curriculum: [
      { title: "React Fundamentals", lessons: 12, duration: "8 hours" },
      { title: "Advanced React Patterns", lessons: 10, duration: "12 hours" },
      { title: "State Management", lessons: 8, duration: "10 hours" },
      { title: "Testing & Deployment", lessons: 6, duration: "10 hours" },
    ],
    reviews: [
      {
        author: "Alice Johnson",
        rating: 5,
        comment: "Excellent course! Very comprehensive and well-structured.",
        date: "2024-01-15",
      },
      {
        author: "Bob Wilson",
        rating: 4,
        comment: "Great content, learned a lot about React hooks.",
        date: "2024-01-10",
      },
    ],
  },
  {
    id: "2",
    name: "Data Science with Python",
    description: "Learn data analysis, visualization, and machine learning with Python",
    longDescription:
      "Dive deep into data science using Python. This course covers pandas, numpy, matplotlib, seaborn, and scikit-learn. Perfect for beginners and intermediate learners.",
    price: 1200000,
    originalPrice: 1800000,
    image: "/a.jpg?height=300&width=400",
    category: "Data Science",
    rating: 4.7,
    students: 8930,
    duration: "60 hours",
    level: "Beginner",
    instructor: "Dr. Sarah Chen",
    learningOutcomes: [
      "Master Python for data analysis",
      "Create stunning data visualizations",
      "Build machine learning models",
      "Work with real-world datasets",
      "Deploy ML models to production",
    ],
    curriculum: [
      { title: "Python Basics for Data Science", lessons: 15, duration: "15 hours" },
      { title: "Data Analysis with Pandas", lessons: 12, duration: "18 hours" },
      { title: "Data Visualization", lessons: 10, duration: "12 hours" },
      { title: "Machine Learning", lessons: 18, duration: "15 hours" },
    ],
    reviews: [
      { author: "Mike Davis", rating: 5, comment: "Perfect introduction to data science!", date: "2024-01-12" },
      { author: "Emma Brown", rating: 4, comment: "Very practical approach with real projects.", date: "2024-01-08" },
    ],
  },
  {
    id: "3",
    name: "Digital Marketing Masterclass",
    description: "Complete guide to digital marketing including SEO, social media, and PPC",
    longDescription:
      "Master all aspects of digital marketing from SEO and content marketing to social media advertising and email campaigns. Includes real case studies and practical exercises.",
    price: 650000,
    image: "/a.jpg?height=300&width=400",
    category: "Marketing",
    rating: 4.6,
    students: 12500,
    duration: "35 hours",
    level: "Beginner",
    instructor: "Maria Rodriguez",
    learningOutcomes: [
      "Create effective marketing strategies",
      "Master SEO and content marketing",
      "Run successful social media campaigns",
      "Analyze marketing performance",
      "Build customer acquisition funnels",
    ],
    curriculum: [
      { title: "Marketing Fundamentals", lessons: 8, duration: "8 hours" },
      { title: "SEO & Content Marketing", lessons: 12, duration: "12 hours" },
      { title: "Social Media Marketing", lessons: 10, duration: "10 hours" },
      { title: "Analytics & Optimization", lessons: 6, duration: "5 hours" },
    ],
    reviews: [
      {
        author: "Tom Anderson",
        rating: 5,
        comment: "Transformed my marketing approach completely!",
        date: "2024-01-14",
      },
      { author: "Lisa Wang", rating: 4, comment: "Great practical examples and case studies.", date: "2024-01-09" },
    ],
  },
  {
    id: "4",
    name: "Advanced JavaScript & Node.js",
    description: "Deep dive into modern JavaScript and backend development with Node.js",
    longDescription:
      "Master advanced JavaScript concepts, ES6+ features, and build scalable backend applications with Node.js, Express, and MongoDB.",
    price: 1100000,
    originalPrice: 1500000,
    image: "/a.jpg?height=300&width=400",
    category: "Programming",
    rating: 4.9,
    students: 9800,
    duration: "50 hours",
    level: "Advanced",
    instructor: "Alex Thompson",
    learningOutcomes: [
      "Master advanced JavaScript concepts",
      "Build RESTful APIs with Node.js",
      "Work with databases and authentication",
      "Deploy applications to cloud platforms",
      "Implement testing and security best practices",
    ],
    curriculum: [
      { title: "Advanced JavaScript", lessons: 14, duration: "16 hours" },
      { title: "Node.js Fundamentals", lessons: 12, duration: "14 hours" },
      { title: "Database Integration", lessons: 8, duration: "10 hours" },
      { title: "Deployment & Security", lessons: 8, duration: "10 hours" },
    ],
    reviews: [
      { author: "David Kim", rating: 5, comment: "Best JavaScript course I've ever taken!", date: "2024-01-13" },
      { author: "Rachel Green", rating: 5, comment: "Excellent depth and practical examples.", date: "2024-01-11" },
    ],
  },
  {
    id: "5",
    name: "UI/UX Design Fundamentals",
    description: "Learn user interface and user experience design principles and tools",
    longDescription:
      "Comprehensive course covering design thinking, user research, wireframing, prototyping, and using tools like Figma and Adobe XD.",
    price: 750000,
    image: "/a.jpg?height=300&width=400",
    category: "Design",
    rating: 4.5,
    students: 6700,
    duration: "30 hours",
    level: "Beginner",
    instructor: "Jessica Park",
    learningOutcomes: [
      "Understand design thinking process",
      "Create user personas and journey maps",
      "Design wireframes and prototypes",
      "Master Figma and design tools",
      "Conduct usability testing",
    ],
    curriculum: [
      { title: "Design Thinking", lessons: 8, duration: "8 hours" },
      { title: "User Research", lessons: 6, duration: "6 hours" },
      { title: "Wireframing & Prototyping", lessons: 10, duration: "12 hours" },
      { title: "Design Tools", lessons: 6, duration: "4 hours" },
    ],
    reviews: [
      { author: "Chris Lee", rating: 4, comment: "Great introduction to UX design!", date: "2024-01-16" },
      { author: "Anna Martinez", rating: 5, comment: "Very practical and hands-on approach.", date: "2024-01-07" },
    ],
  },
  {
    id: "6",
    name: "Machine Learning with TensorFlow",
    description: "Build and deploy machine learning models using TensorFlow and Keras",
    longDescription:
      "Learn to build neural networks, deep learning models, and deploy ML applications using TensorFlow. Covers computer vision, NLP, and more.",
    price: 1400000,
    image: "/a.jpg?height=300&width=400",
    category: "AI/ML",
    rating: 4.8,
    students: 5200,
    duration: "70 hours",
    level: "Advanced",
    instructor: "Dr. Michael Zhang",
    learningOutcomes: [
      "Build neural networks from scratch",
      "Implement computer vision models",
      "Create NLP applications",
      "Deploy ML models to production",
      "Optimize model performance",
    ],
    curriculum: [
      { title: "TensorFlow Basics", lessons: 10, duration: "15 hours" },
      { title: "Neural Networks", lessons: 15, duration: "20 hours" },
      { title: "Computer Vision", lessons: 12, duration: "18 hours" },
      { title: "NLP & Deployment", lessons: 13, duration: "17 hours" },
    ],
    reviews: [
      { author: "Kevin Wu", rating: 5, comment: "Incredible depth and practical projects!", date: "2024-01-05" },
      { author: "Sophie Turner", rating: 4, comment: "Challenging but very rewarding course.", date: "2024-01-03" },
    ],
  },
  {
    id: "7",
    name: "Business Analytics with Excel",
    description: "Master data analysis and business intelligence using Microsoft Excel",
    longDescription:
      "Learn advanced Excel techniques for business analysis including pivot tables, macros, data visualization, and financial modeling.",
    price: 450000,
    originalPrice: 650000,
    image: "/a.jpg?height=300&width=400",
    category: "Business",
    rating: 4.4,
    students: 18900,
    duration: "25 hours",
    level: "Intermediate",
    instructor: "Robert Johnson",
    learningOutcomes: [
      "Master advanced Excel functions",
      "Create dynamic dashboards",
      "Build financial models",
      "Automate tasks with macros",
      "Analyze business data effectively",
    ],
    curriculum: [
      { title: "Excel Fundamentals", lessons: 8, duration: "6 hours" },
      { title: "Data Analysis Tools", lessons: 10, duration: "8 hours" },
      { title: "Visualization & Dashboards", lessons: 8, duration: "7 hours" },
      { title: "Automation & Macros", lessons: 6, duration: "4 hours" },
    ],
    reviews: [
      { author: "Jennifer Adams", rating: 4, comment: "Very practical for business applications.", date: "2024-01-17" },
      { author: "Mark Thompson", rating: 5, comment: "Excellent Excel training!", date: "2024-01-06" },
    ],
  },
  {
    id: "8",
    name: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile apps using Flutter and Dart",
    longDescription:
      "Complete Flutter development course covering widgets, state management, APIs, and publishing apps to both iOS and Android stores.",
    price: 950000,
    image: "/a.jpg?height=300&width=400",
    category: "Mobile Development",
    rating: 4.7,
    students: 7300,
    duration: "45 hours",
    level: "Intermediate",
    instructor: "Priya Sharma",
    learningOutcomes: [
      "Build beautiful mobile UIs",
      "Implement state management",
      "Integrate with REST APIs",
      "Publish apps to app stores",
      "Handle device features and permissions",
    ],
    curriculum: [
      { title: "Flutter Basics", lessons: 12, duration: "12 hours" },
      { title: "UI Development", lessons: 14, duration: "16 hours" },
      { title: "State Management", lessons: 8, duration: "10 hours" },
      { title: "Publishing & Deployment", lessons: 6, duration: "7 hours" },
    ],
    reviews: [
      { author: "Ahmed Hassan", rating: 5, comment: "Best Flutter course available!", date: "2024-01-04" },
      { author: "Elena Petrov", rating: 4, comment: "Great practical examples and projects.", date: "2024-01-02" },
    ],
  },
]

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams
//   const userId = searchParams.get("userId")

//   // Simulate AI processing delay
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   // In a real application, this would analyze user behavior and preferences
//   // For now, we return mock suggestions
//   return NextResponse.json(mockSuggestions)
// }
export async function POST(request: NextRequest) {
  const body = await request.json()
  const favoriteIds: string[] = body.favoriteIds || []

  // Simulate AI delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Lọc các sản phẩm yêu thích
  const favoriteSuggestions = mockSuggestions.filter((product) =>
    favoriteIds.includes(product.id)
  )

  let result: Product[]

  if (favoriteSuggestions.length >= 3) {
    // Gợi ý 3 ngẫu nhiên từ favorites
    result = getRandomItems(favoriteSuggestions, 3)
  } else {
    // Gợi ý 3 ngẫu nhiên từ toàn bộ sản phẩm
    result = getRandomItems(mockSuggestions, 3)
  }

  return NextResponse.json(result)
}

// Hàm lấy n phần tử ngẫu nhiên từ mảng
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = array.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

