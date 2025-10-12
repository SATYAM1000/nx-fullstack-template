#!/bin/bash

# Setup script for nx-fullstack-template
# This script renames the workspace scope from @nx-template to your project name

set -e

echo "🚀 Welcome to nx-fullstack-template setup!"
echo ""

# Get the new scope name from user
read -p "Enter your project scope name (e.g., my-app): " NEW_SCOPE

if [ -z "$NEW_SCOPE" ]; then
  echo "❌ Error: Project scope name cannot be empty"
  exit 1
fi

# Remove @ if user added it
NEW_SCOPE=$(echo "$NEW_SCOPE" | sed 's/^@//')

echo ""
echo "📝 Renaming workspace scope from @nx-template to @$NEW_SCOPE..."
echo ""

# Detect OS for sed compatibility
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  find . -type f \( -name "package.json" -o -name "tsconfig.base.json" \) \
    -not -path "*/node_modules/*" \
    -exec sed -i '' "s/@nx-template/@$NEW_SCOPE/g" {} +
else
  # Linux
  find . -type f \( -name "package.json" -o -name "tsconfig.base.json" \) \
    -not -path "*/node_modules/*" \
    -exec sed -i "s/@nx-template/@$NEW_SCOPE/g" {} +
fi

echo "✅ Workspace scope renamed successfully!"
echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete! 🎉"
echo ""
echo "Next steps:"
echo "  1. Copy environment files:"
echo "     cp apps/web/.env.example apps/web/.env.local"
echo "     cp apps/api/.env.example apps/api/.env"
echo ""
echo "  2. Start development:"
echo "     npm run dev"
echo ""
