# 🔐 API 키 설정 가이드

## ⚠️ 보안 주의사항

**절대 다음과 같이 하지 마세요:**
- ❌ API 키를 채팅이나 공개 장소에 입력
- ❌ API 키를 Git에 커밋
- ❌ API 키를 스크린샷으로 공유

## ✅ 안전한 설정 방법

### 1️⃣ 로컬 개발 환경

터미널에서 직접 편집:

```bash
cd /home/user/webapp

# nano 에디터 사용 (간단함)
nano .env.local

# 또는 vi 에디터 사용
vi .env.local
```

**편집 내용:**
```env
# Gemini API Key (실제 키로 교체)
GEMINI_API_KEY=여기에_실제_Gemini_API_키를_붙여넣으세요

# Nano Banana API Key (실제 키로 교체)
NANOBANANA_API_KEY=여기에_실제_Nano_Banana_API_키를_붙여넣으세요
```

**저장 방법:**
- nano: `Ctrl + X` → `Y` → `Enter`
- vi: `ESC` → `:wq` → `Enter`

### 2️⃣ Vercel 배포 시

1. Vercel 대시보드 접속
2. 프로젝트 선택
3. **Settings** → **Environment Variables**
4. 다음 변수들 추가:
   - `GEMINI_API_KEY`: 실제 Gemini API 키
   - `NANOBANANA_API_KEY`: 실제 Nano Banana API 키

### 3️⃣ API 키 발급 위치

#### Gemini API Key
- URL: https://aistudio.google.com/app/apikey
- Google 계정으로 로그인
- "Create API Key" 클릭
- 무료 할당량 제공

#### Nano Banana API Key
- GenSpark AI 플랫폼에서 제공
- 계정 설정에서 API 키 확인

## 🔄 설정 후 서버 재시작

환경 변수를 변경한 후에는 **반드시 개발 서버를 재시작**해야 합니다:

```bash
# 1. 현재 실행 중인 서버 확인
ps aux | grep "next dev"

# 2. 프로세스 종료
kill <PID>

# 3. 서버 재시작
cd /home/user/webapp && npm run dev
```

또는 더 간단하게:

```bash
cd /home/user/webapp
# Ctrl+C로 현재 서버 종료 후
npm run dev
```

## ✅ 설정 확인 방법

API 키가 제대로 설정되었는지 확인:

```bash
cd /home/user/webapp
node -e "require('dotenv').config({ path: '.env.local' }); console.log('Gemini:', process.env.GEMINI_API_KEY ? '✅ 설정됨' : '❌ 미설정'); console.log('Nano Banana:', process.env.NANOBANANA_API_KEY ? '✅ 설정됨' : '❌ 미설정');"
```

## 📝 참고사항

- `.env.local` 파일은 이미 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다
- 각 환경(로컬, 개발, 프로덕션)마다 별도의 환경 변수를 사용할 수 있습니다
- Next.js는 자동으로 `.env.local` 파일을 읽어옵니다

## 🆘 문제 해결

### "API Key not configured" 오류
1. `.env.local` 파일이 존재하는지 확인
2. 파일 내용에 API 키가 올바르게 입력되었는지 확인
3. 개발 서버를 재시작했는지 확인

### 환경 변수가 적용되지 않음
1. 파일 이름이 정확히 `.env.local`인지 확인 (점으로 시작)
2. 프로젝트 루트 디렉토리(`/home/user/webapp`)에 있는지 확인
3. Next.js 서버를 완전히 재시작

## 🎯 올바른 워크플로우

```
1. API 키 발급 (Google AI Studio, Nano Banana)
   ↓
2. .env.local 파일 편집 (터미널에서 직접)
   ↓
3. 개발 서버 재시작
   ↓
4. 브라우저에서 테스트
   ↓
5. 정상 작동 확인 ✅
```
