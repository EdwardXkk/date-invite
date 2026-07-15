#!/bin/bash

# Simple HTTP server to test the H5 app locally
# Usage: ./serve.sh

PORT=8080

echo "🚀 Starting local server..."
echo "📍 Open in browser: http://localhost:$PORT"
echo "📱 For iPhone: Use your computer's IP address"
echo "⏸  Press Ctrl+C to stop"
echo ""

# Get local IP for iPhone access
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    IP=$(ip addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '127.0.0.1' | head -n1)
elif [[ "$OSTYPE" == "darwin"* ]]; then
    IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)
fi

if [ ! -z "$IP" ]; then
    echo "📱 iPhone access: http://$IP:$PORT"
    echo "   (Make sure iPhone and computer are on same WiFi)"
    echo ""
fi

# Start server
cd "$(dirname "$0")"

# Try Python 3 first, then Python 2, then Node.js
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer $PORT
elif command -v npx &> /dev/null; then
    npx serve .
else
    echo "❌ No suitable server found. Install Python or Node.js"
    exit 1
fi
