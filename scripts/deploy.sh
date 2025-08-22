#!/bin/bash

# MPC Psychology Center - Production Deployment Script

echo "🚀 Starting MPC Psychology Center deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Run linting
echo "🧹 Running linting..."
npm run lint

# Build the application
echo "🏗️ Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "🎉 Your MPC Psychology Center is ready for deployment!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Deploy to Vercel: vercel --prod"
    echo "2. Deploy to Netlify: netlify deploy --prod"
    echo "3. Deploy to Railway: railway up"
    echo ""
    echo "🔧 Don't forget to:"
    echo "- Set up environment variables"
    echo "- Configure email service (Resend)"
    echo "- Set up custom domain"
    echo "- Configure Google Analytics"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
