#!/bin/bash
# start.sh for Railway - Flask + React

# Install dependencies
cd ../phonetiquette && pip install -r requirements.txt

# Build React app (if not pre-built)
cd IPA-site || cd build || echo "React build folder not found"
npm ci --only=production --silent || npm install --production --silent
npm run build
cd ../..

# Start Flask server
python app.py