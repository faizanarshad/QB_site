import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const jobs = await prisma.jobPosition.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    
    // Return fallback data when database is not available
    const fallbackJobs = [
      {
        id: "1",
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
        ],
        isActive: true,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
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
        ],
        isActive: true,
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
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
        ],
        isActive: true,
        order: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    return NextResponse.json(fallbackJobs);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { title, department, location, type, experience, description, requirements } = body;

    // Validate required fields
    if (!title || !department || !location || !type || !experience || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const job = await prisma.jobPosition.create({
      data: {
        title,
        department,
        location,
        type,
        experience,
        description,
        requirements: requirements || [],
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 