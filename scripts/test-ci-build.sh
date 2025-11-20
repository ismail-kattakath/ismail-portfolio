#!/bin/bash

# Simulate CI build process
echo "🧪 Testing CI build process locally..."
echo ""

# Step 1: Check Node.js version
echo "📦 Node.js version:"
node --version
echo ""

# Step 2: Check if dependencies are installed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "⚠️  node_modules not found, installing..."
  npm ci
fi
echo ""

# Step 3: Test PDF generation
echo "📄 Testing PDF generation..."
if npm run generate-pdf; then
  echo "✅ PDF generation successful"
  if [ -f "public/resume.pdf" ]; then
    SIZE=$(ls -lh public/resume.pdf | awk '{print $5}')
    echo "✅ PDF file exists: $SIZE"
  else
    echo "❌ PDF file not found after generation"
    exit 1
  fi
else
  echo "❌ PDF generation failed"
  exit 1
fi
echo ""

# Step 4: Test build
echo "🏗️  Testing Next.js build..."
if npm run build; then
  echo "✅ Build successful"
  if [ -d "out" ]; then
    echo "✅ Output directory exists"
    echo "📊 Build size: $(du -sh out | awk '{print $1}')"
  else
    echo "❌ Output directory not found"
    exit 1
  fi
else
  echo "❌ Build failed"
  exit 1
fi

echo ""
echo "✅ All CI steps completed successfully!"
