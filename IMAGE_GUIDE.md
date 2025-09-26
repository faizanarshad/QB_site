# Image Guide for QBrix Solutions Website

## 📁 Image Directory Structure

Your images are organized in the `public/images/` directory:

```
public/images/
├── hero/          # Hero section and background images
├── services/      # Service-related images and icons
├── team/          # Team member photos
├── portfolio/     # Project screenshots and case studies
├── blog/          # Blog post featured images
└── icons/         # Icons and small graphics
```

## 🖼️ How to Add Images

### 1. **Hero Images** (`/public/images/hero/`)
For background images and hero sections:

```jsx
import Image from "next/image";

// Background image example
<div className="relative h-screen">
  <Image
    src="/images/hero/hero-bg.jpg"
    alt="QBrix Solutions Hero Background"
    fill
    className="object-cover"
    priority
  />
</div>
```

### 2. **Service Icons** (`/public/images/icons/`)
For service icons and small graphics:

```jsx
// Service icon example
<div className="relative w-16 h-16">
  <Image
    src="/images/icons/ai-icon.svg"
    alt="Artificial Intelligence Icon"
    fill
    className="object-contain"
  />
</div>
```

### 3. **Team Photos** (`/public/images/team/`)
For team member profile pictures:

```jsx
// Team photo example
<div className="relative w-32 h-32">
  <Image
    src="/images/team/sarah-chen.jpg"
    alt="Dr. Sarah Chen - CEO"
    fill
    className="object-cover rounded-full"
  />
</div>
```

### 4. **Portfolio Images** (`/public/images/portfolio/`)
For project screenshots and case studies:

```jsx
// Portfolio image example
<div className="relative h-64">
  <Image
    src="/images/portfolio/ai-manufacturing.jpg"
    alt="AI Manufacturing Quality Control Project"
    fill
    className="object-cover rounded-lg"
  />
</div>
```

### 5. **Blog Images** (`/public/images/blog/`)
For blog post featured images:

```jsx
// Blog image example
<div className="relative h-48">
  <Image
    src="/images/blog/ai-future.jpg"
    alt="The Future of AI in Manufacturing"
    fill
    className="object-cover rounded-lg"
  />
</div>
```

## 🎯 Image Best Practices

### **File Formats:**
- **JPG/JPEG**: For photographs and complex images
- **PNG**: For images with transparency
- **SVG**: For icons and simple graphics
- **WebP**: For better compression (modern browsers)

### **Image Sizes:**
- **Hero images**: 1920x1080px or larger
- **Service icons**: 64x64px to 128x128px
- **Team photos**: 400x400px (square)
- **Portfolio images**: 800x600px or similar aspect ratio
- **Blog images**: 1200x630px (social media friendly)

### **Optimization:**
- Compress images before uploading
- Use descriptive file names
- Include meaningful alt text
- Consider using Next.js Image optimization

## 📝 Step-by-Step Instructions

### **Step 1: Prepare Your Images**
1. Resize images to appropriate dimensions
2. Compress them for web use
3. Use descriptive file names (e.g., `ai-manufacturing-project.jpg`)

### **Step 2: Upload Images**
1. Place images in the appropriate folder under `public/images/`
2. Follow the naming convention: `kebab-case.jpg`

### **Step 3: Update Components**
1. Import the Next.js Image component:
   ```jsx
   import Image from "next/image";
   ```

2. Replace emoji icons with Image components:
   ```jsx
   // Before (emoji)
   <div className="text-5xl mb-6">🤖</div>
   
   // After (image)
   <div className="relative w-16 h-16 mb-6">
     <Image
       src="/images/icons/ai-robot.svg"
       alt="AI Robot Icon"
       fill
       className="object-contain"
     />
   </div>
   ```

### **Step 4: Test Your Changes**
1. Save the file
2. Check the website at `http://localhost:3000`
3. Verify images load correctly
4. Test on different screen sizes

## 🔧 Common Image Patterns

### **Responsive Images:**
```jsx
<Image
  src="/images/hero/hero-bg.jpg"
  alt="Hero Background"
  fill
  className="object-cover"
  sizes="100vw"
/>
```

### **Fixed Size Images:**
```jsx
<Image
  src="/images/icons/logo.png"
  alt="QBrix Solutions Logo"
  width={200}
  height={60}
  className="object-contain"
/>
```

### **Circular Images:**
```jsx
<div className="relative w-32 h-32">
  <Image
    src="/images/team/member.jpg"
    alt="Team Member"
    fill
    className="object-cover rounded-full"
  />
</div>
```

## 🎨 Recommended Image Sources

### **Free Stock Photos:**
- [Unsplash](https://unsplash.com) - High-quality photos
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images and illustrations

### **Icons:**
- [Feather Icons](https://feathericons.com) - Simple, clean icons
- [Heroicons](https://heroicons.com) - Beautiful hand-crafted icons
- [Font Awesome](https://fontawesome.com) - Extensive icon library

### **AI/Technology Images:**
Search for keywords like:
- "artificial intelligence"
- "machine learning"
- "computer vision"
- "robotics"
- "automation"
- "data science"

## 🚀 Quick Start Examples

### **Replace Hero Background:**
1. Add your hero image to `public/images/hero/hero-bg.jpg`
2. Update the Hero component to use the image
3. Remove the gradient background

### **Add Service Icons:**
1. Create SVG icons for each service
2. Place them in `public/images/icons/`
3. Update the Services component

### **Add Team Photos:**
1. Add team member photos to `public/images/team/`
2. Update the Team component
3. Ensure photos are professional and consistent

### **Add Portfolio Images:**
1. Add project screenshots to `public/images/portfolio/`
2. Update the Portfolio component
3. Include before/after images for case studies

## 📱 Mobile Optimization

Remember to test images on mobile devices:
- Ensure images scale properly
- Check loading times
- Verify touch interactions work
- Test on different screen sizes

## 🔍 SEO Considerations

- Use descriptive alt text for all images
- Include relevant keywords in file names
- Optimize image file sizes
- Consider using structured data for images

---

**Need Help?** Check the ImageExample component on the home page for live examples! 