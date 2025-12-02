#!/bin/bash

# 🔐 안전한 환경 변수 설정 스크립트
# 이 스크립트는 .env.local 파일을 생성하고 API 키를 안전하게 설정합니다.

echo "🔐 AI Music Video Generator - 환경 변수 설정"
echo "=============================================="
echo ""
echo "⚠️  주의: API 키는 절대 공개하지 마세요!"
echo ""

# .env.local 파일 경로
ENV_FILE=".env.local"

# 기존 파일 백업
if [ -f "$ENV_FILE" ]; then
    echo "📦 기존 .env.local 파일을 백업합니다..."
    cp "$ENV_FILE" "$ENV_FILE.backup.$(date +%Y%m%d_%H%M%S)"
    echo "✅ 백업 완료"
    echo ""
fi

# Gemini API 키 입력
echo "1️⃣  Gemini API 키 설정"
echo "   발급: https://aistudio.google.com/app/apikey"
echo ""
read -p "Gemini API 키를 입력하세요: " GEMINI_KEY

# Nano Banana API 키 입력
echo ""
echo "2️⃣  Nano Banana API 키 설정"
echo "   GenSpark AI 플랫폼에서 발급"
echo ""
read -p "Nano Banana API 키를 입력하세요: " NANOBANANA_KEY

# .env.local 파일 생성
echo ""
echo "📝 .env.local 파일을 생성합니다..."

cat > "$ENV_FILE" << EOF
# AI Music Video Generator - Environment Variables
# Created: $(date)
# ⚠️ DO NOT commit this file to Git!

# Gemini API Key for LLM story generation
# Get your key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=${GEMINI_KEY}

# Nano Banana API Key for image generation
# Get your key from Nano Banana service
NANOBANANA_API_KEY=${NANOBANANA_KEY}
EOF

echo "✅ .env.local 파일이 생성되었습니다!"
echo ""

# 권한 설정 (읽기 전용으로 보호)
chmod 600 "$ENV_FILE"
echo "🔒 파일 권한을 600으로 설정했습니다 (소유자만 읽기/쓰기 가능)"
echo ""

# 검증
echo "🔍 설정 확인:"
if [ ! -z "$GEMINI_KEY" ]; then
    echo "   ✅ Gemini API Key: 설정됨 (${#GEMINI_KEY}자)"
else
    echo "   ❌ Gemini API Key: 미설정"
fi

if [ ! -z "$NANOBANANA_KEY" ]; then
    echo "   ✅ Nano Banana API Key: 설정됨 (${#NANOBANANA_KEY}자)"
else
    echo "   ❌ Nano Banana API Key: 미설정"
fi

echo ""
echo "=============================================="
echo "🎉 설정 완료!"
echo ""
echo "📌 다음 단계:"
echo "   1. 개발 서버 재시작: npm run dev"
echo "   2. 브라우저에서 테스트"
echo ""
echo "⚠️  보안 알림:"
echo "   - .env.local 파일은 이미 .gitignore에 포함되어 있습니다"
echo "   - 절대 이 파일을 Git에 커밋하지 마세요"
echo "   - API 키를 공개적으로 공유하지 마세요"
echo "=============================================="
