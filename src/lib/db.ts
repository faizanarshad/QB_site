import { prisma } from './prisma'

// Database utility functions
export const db = {
  // Service operations
  services: {
    getAll: () => prisma.service.findMany({
      where: { isActive: true },
      include: {
        features: { orderBy: { order: 'asc' } },
        benefits: { orderBy: { order: 'asc' } },
        stats: { orderBy: { order: 'asc' } },
        projects: { where: { isActive: true } }
      },
      orderBy: { order: 'asc' }
    }),
    
    getById: (id: string) => prisma.service.findUnique({
      where: { id },
      include: {
        features: { orderBy: { order: 'asc' } },
        benefits: { orderBy: { order: 'asc' } },
        stats: { orderBy: { order: 'asc' } },
        projects: { where: { isActive: true } }
      }
    }),
    
    create: (data: any) => prisma.service.create({ data }),
    update: (id: string, data: any) => prisma.service.update({ where: { id }, data }),
    delete: (id: string) => prisma.service.delete({ where: { id } })
  },

  // Project operations
  projects: {
    getAll: () => prisma.project.findMany({
      where: { isActive: true },
      include: { service: true, user: true },
      orderBy: { order: 'asc' }
    }),
    
    getById: (id: string) => prisma.project.findUnique({
      where: { id },
      include: { service: true, user: true }
    }),
    
    getByService: (serviceId: string) => prisma.project.findMany({
      where: { serviceId, isActive: true },
      include: { service: true, user: true },
      orderBy: { order: 'asc' }
    }),
    
    create: (data: any) => prisma.project.create({ data }),
    update: (id: string, data: any) => prisma.project.update({ where: { id }, data }),
    delete: (id: string) => prisma.project.delete({ where: { id } })
  },

  // Testimonial operations
  testimonials: {
    getAll: () => prisma.testimonial.findMany({
      where: { isActive: true },
      include: { user: true },
      orderBy: { order: 'asc' }
    }),
    
    getById: (id: string) => prisma.testimonial.findUnique({
      where: { id },
      include: { user: true }
    }),
    
    create: (data: any) => prisma.testimonial.create({ data }),
    update: (id: string, data: any) => prisma.testimonial.update({ where: { id }, data }),
    delete: (id: string) => prisma.testimonial.delete({ where: { id } })
  },

  // Blog operations
  blogPosts: {
    getAll: () => prisma.blogPost.findMany({
      where: { isPublished: true },
      include: { author: true, comments: { where: { isApproved: true } } },
      orderBy: { publishedAt: 'desc' }
    }),
    
    getById: (id: string) => prisma.blogPost.findUnique({
      where: { id },
      include: { 
        author: true, 
        comments: { 
          where: { isApproved: true },
          include: { user: true },
          orderBy: { createdAt: 'desc' }
        } 
      }
    }),
    
    getBySlug: (slug: string) => prisma.blogPost.findUnique({
      where: { slug },
      include: { 
        author: true, 
        comments: { 
          where: { isApproved: true },
          include: { user: true },
          orderBy: { createdAt: 'desc' }
        } 
      }
    }),
    
    create: (data: any) => prisma.blogPost.create({ data }),
    update: (id: string, data: any) => prisma.blogPost.update({ where: { id }, data }),
    delete: (id: string) => prisma.blogPost.delete({ where: { id } })
  },

  // Contact operations
  contact: {
    submit: (data: any) => prisma.contactSubmission.create({ data }),
    getAll: () => prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    }),
    markAsRead: (id: string) => prisma.contactSubmission.update({
      where: { id },
      data: { isRead: true }
    })
  },

  // Career operations
  career: {
    apply: (data: any) => prisma.careerApplication.create({ data }),
    getAll: () => prisma.careerApplication.findMany({
      orderBy: { createdAt: 'desc' }
    }),
    updateStatus: (id: string, status: string) => prisma.careerApplication.update({
      where: { id },
      data: { status: status as any }
    })
  },

  // Newsletter operations
  newsletter: {
    subscribe: (email: string) => prisma.newsletterSubscription.upsert({
      where: { email },
      update: { isActive: true },
      create: { email, isActive: true }
    }),
    
    unsubscribe: (email: string) => prisma.newsletterSubscription.update({
      where: { email },
      data: { isActive: false }
    })
  },

  // Stats operations
  stats: {
    get: (key: string) => prisma.websiteStat.findUnique({ where: { key } }),
    set: (key: string, value: string) => prisma.websiteStat.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    })
  }
}

// Seed data function
export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...')

    // Create default services
    const services = [
      {
        title: "Artificial Intelligence",
        subtitle: "Intelligent Automation Solutions",
        description: "Transform your business with cutting-edge AI that learns, adapts, and evolves with your needs.",
        icon: "FaRobot",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        order: 1,
        features: [
          "Machine Learning Models",
          "Neural Networks", 
          "Predictive Analytics",
          "Natural Language Processing",
          "Intelligent Automation",
          "AI-Powered Insights"
        ],
        benefits: [
          "Reduce operational costs by 40%",
          "Improve decision accuracy by 85%",
          "Automate repetitive tasks",
          "Real-time data analysis"
        ],
        stats: [
          { key: "accuracy", value: "99.5%" },
          { key: "speed", value: "10x faster" },
          { key: "efficiency", value: "85%" }
        ]
      },
      {
        title: "Computer Vision",
        subtitle: "Advanced Visual Intelligence",
        description: "Unlock the power of visual data with state-of-the-art computer vision solutions.",
        icon: "FaEye",
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        order: 2,
        features: [
          "Object Detection & Recognition",
          "Facial Recognition Systems",
          "Quality Control Automation",
          "Video Analytics",
          "Image Processing",
          "Visual Data Mining"
        ],
        benefits: [
          "99.9% detection accuracy",
          "Real-time processing",
          "24/7 automated monitoring",
          "Quality assurance automation"
        ],
        stats: [
          { key: "accuracy", value: "99.9%" },
          { key: "speed", value: "Real-time" },
          { key: "efficiency", value: "90%" }
        ]
      }
    ]

    for (const serviceData of services) {
      const { features, benefits, stats, ...serviceInfo } = serviceData
      
      const service = await prisma.service.upsert({
        where: { title: serviceInfo.title },
        update: serviceInfo,
        create: serviceInfo
      })

      // Create features
      for (let i = 0; i < features.length; i++) {
        await prisma.serviceFeature.upsert({
          where: { 
            serviceId_name: { 
              serviceId: service.id, 
              name: features[i] 
            } 
          },
          update: { order: i },
          create: {
            name: features[i],
            serviceId: service.id,
            order: i
          }
        })
      }

      // Create benefits
      for (let i = 0; i < benefits.length; i++) {
        await prisma.serviceBenefit.upsert({
          where: { 
            serviceId_name: { 
              serviceId: service.id, 
              name: benefits[i] 
            } 
          },
          update: { order: i },
          create: {
            name: benefits[i],
            serviceId: service.id,
            order: i
          }
        })
      }

      // Create stats
      for (let i = 0; i < stats.length; i++) {
        await prisma.serviceStat.upsert({
          where: { 
            serviceId_key: { 
              serviceId: service.id, 
              key: stats[i].key 
            } 
          },
          update: { value: stats[i].value, order: i },
          create: {
            key: stats[i].key,
            value: stats[i].value,
            serviceId: service.id,
            order: i
          }
        })
      }
    }

    // Create default testimonials
    const testimonials = [
      {
        name: "Sarah Johnson",
        role: "CTO",
        company: "TechCorp",
        industry: "Technology",
        content: "QBrik's AI solutions transformed our operations completely. We've seen a 60% increase in efficiency.",
        rating: 5,
        initials: "SJ",
        order: 1
      },
      {
        name: "Michael Chen",
        role: "CEO",
        company: "InnovateLab",
        industry: "Manufacturing",
        content: "The computer vision system they built for us is incredibly accurate and has revolutionized our quality control.",
        rating: 5,
        initials: "MC",
        order: 2
      },
      {
        name: "Emily Rodriguez",
        role: "Operations Director",
        company: "RetailPlus",
        industry: "Retail",
        content: "Our e-commerce platform built by QBrik has increased our online sales by 150% in just 6 months.",
        rating: 5,
        initials: "ER",
        order: 3
      }
    ]

    for (const testimonialData of testimonials) {
      await prisma.testimonial.upsert({
        where: { 
          name_company: { 
            name: testimonialData.name, 
            company: testimonialData.company 
          } 
        },
        update: testimonialData,
        create: testimonialData
      })
    }

    // Create default job positions
    const jobPositions = [
      {
        title: "Senior Machine Learning Engineer",
        department: "AI & ML",
        location: "Remote / Hybrid",
        type: "Full-time",
        experience: "5+ years",
        description: "Join our AI team to develop cutting-edge machine learning models and algorithms.",
        requirements: [
          "Strong Python programming skills",
          "Experience with TensorFlow/PyTorch",
          "Knowledge of deep learning architectures",
          "Experience with model deployment",
          "Understanding of MLOps practices",
          "Experience with cloud platforms (AWS/Azure/GCP)"
        ],
        order: 1
      },
      {
        title: "Computer Vision Engineer",
        department: "Computer Vision",
        location: "On-site",
        type: "Full-time",
        experience: "3+ years",
        description: "Develop computer vision solutions for industrial and commercial applications.",
        requirements: [
          "Expertise in OpenCV and image processing",
          "Experience with object detection models",
          "Knowledge of deep learning frameworks",
          "Background in computer vision algorithms",
          "Experience with real-time video processing",
          "Understanding of camera calibration and 3D vision"
        ],
        order: 2
      },
      {
        title: "Full-Stack Developer",
        department: "E-commerce",
        location: "Remote",
        type: "Full-time",
        experience: "4+ years",
        description: "Build scalable e-commerce platforms and web applications.",
        requirements: [
          "Proficiency in React/Next.js",
          "Experience with Node.js and databases",
          "Knowledge of cloud platforms (AWS/Azure)",
          "Understanding of e-commerce systems",
          "Experience with payment gateways",
          "Knowledge of SEO and performance optimization"
        ],
        order: 3
      },
      {
        title: "Robotics Engineer",
        department: "Robotics",
        location: "On-site",
        type: "Full-time",
        experience: "4+ years",
        description: "Design and implement robotics automation solutions for manufacturing.",
        requirements: [
          "Experience with industrial robotics",
          "Knowledge of automation systems",
          "Programming skills (Python/C++)",
          "Understanding of IoT and sensors",
          "Experience with ROS (Robot Operating System)",
          "Knowledge of control systems and kinematics"
        ],
        order: 4
      },
      {
        title: "Data Scientist",
        department: "AI & ML",
        location: "Remote / Hybrid",
        type: "Full-time",
        experience: "3+ years",
        description: "Analyze data and develop predictive models for business insights.",
        requirements: [
          "Strong statistical analysis skills",
          "Experience with data visualization",
          "Knowledge of ML algorithms",
          "Proficiency in Python/R",
          "Experience with big data technologies",
          "Understanding of business intelligence tools"
        ],
        order: 5
      },
      {
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        experience: "3+ years",
        description: "Manage infrastructure and deployment pipelines for our applications.",
        requirements: [
          "Experience with Docker and Kubernetes",
          "Knowledge of cloud platforms",
          "CI/CD pipeline expertise",
          "Infrastructure as Code skills",
          "Experience with monitoring and logging",
          "Knowledge of security best practices"
        ],
        order: 6
      }
    ]

    for (const jobData of jobPositions) {
      await prisma.jobPosition.upsert({
        where: { title: jobData.title },
        update: jobData,
        create: jobData
      })
    }

    // Create default website stats
    const websiteStats = [
      { key: "projects_completed", value: "500+" },
      { key: "happy_clients", value: "50+" },
      { key: "client_satisfaction", value: "99%" },
      { key: "support_available", value: "24/7" }
    ]

    for (const stat of websiteStats) {
      await prisma.websiteStat.upsert({
        where: { key: stat.key },
        update: { value: stat.value },
        create: stat
      })
    }

    console.log('✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
} 