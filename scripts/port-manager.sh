#!/bin/bash

# Port Manager Script for NestJS Application
# Usage: ./scripts/port-manager.sh [check|kill] [port]

DEFAULT_PORT=5002

check_port() {
    local port=${1:-$DEFAULT_PORT}
    echo "🔍 Checking port $port..."
    
    if lsof -ti:$port > /dev/null 2>&1; then
        local pid=$(lsof -ti:$port)
        echo "❌ Port $port is in use by process $pid"
        echo "   Process details:"
        ps -p $pid -o pid,ppid,command
        return 1
    else
        echo "✅ Port $port is available"
        return 0
    fi
}

kill_port() {
    local port=${1:-$DEFAULT_PORT}
    echo "🔄 Killing process on port $port..."
    
    if lsof -ti:$port > /dev/null 2>&1; then
        local pid=$(lsof -ti:$port)
        echo "   Killing process $pid..."
        kill -9 $pid
        echo "✅ Process killed successfully"
    else
        echo "ℹ️  No process found on port $port"
    fi
}

case "${1:-check}" in
    "check")
        check_port $2
        ;;
    "kill")
        kill_port $2
        ;;
    *)
        echo "Usage: $0 [check|kill] [port]"
        echo "  check [port] - Check if port is available (default: $DEFAULT_PORT)"
        echo "  kill [port]  - Kill process on port (default: $DEFAULT_PORT)"
        echo ""
        echo "Examples:"
        echo "  $0 check        # Check default port $DEFAULT_PORT"
        echo "  $0 check 5003  # Check port 5003"
        echo "  $0 kill        # Kill process on default port $DEFAULT_PORT"
        echo "  $0 kill 5003   # Kill process on port 5003"
        ;;
esac
