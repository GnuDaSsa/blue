# AI Music Video Generator - Session Handoff Document

**Date**: 2025-12-02  
**GitHub Repository**: https://github.com/GnuDaSsa/blue  
**Latest Commit**: 955d3e8 - "docs: Update project summary with latest changes"

---

## 🎯 Project Overview

An AI-powered music video generator that transforms song lyrics into animated video scenes using:
- **Gemini 2.5 Flash** (LLM) for storyboard generation
- **Gemini 2.5 Flash Image** (Nano Banana Pro equivalent) for image generation
- **Next.js 15 + React + TypeScript + Tailwind CSS**

**Live URL**: https://3001-i6zvai5y9w9lrmmnqfp62-2e77fc33.sandbox.novita.ai

---

## ✅ Completed Features

### 1. **Core Workflow**
- ✅ Lyrics input with scene count selection (8/12/20/25/32 scenes)
- ✅ Image aspect ratio selection (16:9 landscape / 9:16 portrait)
- ✅ AI storyboard generation with mood analysis
- ✅ Editable storyboard (per-scene editing + full regeneration)
- ✅ 4 protagonist candidates with diverse moods
- ✅ "No protagonist" option (generates unique characters per scene)
- ✅ Real-time scene image generation with SSE streaming
- ✅ Final image gallery with download

### 2. **Character Generation**
- ✅ **4 Mood Variations**: Confident/Cool, Gentle/Soft, Mysterious/Enigmatic, Dynamic/Energetic
- ✅ **Removed "8-head proportion" constraint** for natural character design
- ✅ **Mood-based styling**: LLM analyzes lyrics and adjusts character colors, expressions, fashion
- ✅ **Modern anime quality**: Netflix/Crunchyroll-level artwork
- ✅ **1:1 square aspect ratio** for protagonist images
- ✅ **Selected aspect ratio** (16:9 or 9:16) for scene images

### 3. **Image Quality Improvements**
- ✅ Upgraded to **latest Gemini 2.5 Flash Image model** (`gemini-2.5-flash-image`)
- ✅ Aspect ratio specified in prompts (e.g., "wide horizontal composition" for 16:9)
- ✅ High-quality anime illustration style
- ✅ Character consistency using Img2Img reference

### 4. **User Experience**
- ✅ **Storyboard editing**: Modify description, camera angle, lighting, prompts
- ✅ **Real-time progress**: SSE streaming with live image preview
- ✅ **Cancel button**: Stop generation mid-process
- ✅ **Prompt display**: Hover to see Korean description, click for full English/Korean prompts
- ✅ **Korean translations**: All prompts translated and displayed side-by-side
- ✅ **Responsive UI**: 4-column image grid (adjusts for mobile/tablet/desktop)

### 5. **Download Functionality**
- ✅ **ZIP file download** with all images
- ✅ **ALZip compatibility** (proper UTF-8 encoding)
- ✅ **Includes prompts.txt** with all scene descriptions
- ✅ **Supports Base64 and external URLs**

### 6. **Technical Stability**
- ✅ **SSE buffer management**: Handles incomplete JSON chunks
- ✅ **Error handling**: Retry logic for JSON parsing errors
- ✅ **Connection resilience**: Continues generation even if client disconnects
- ✅ **Session management**: Stores storyboards, edits, and generation state

---

## 🔧 Recent Fixes (This Session)

### Issue 1: **Gemini Image API `outputOptions` Error**
**Problem**: API returned `400 Bad Request` with error: "Unknown name 'outputOptions' at 'generation_config'"

**Solution**: 
- Removed `outputOptions.aspectRatio` parameter
- Now specifies aspect ratio directly in prompts:
  - 16:9: "Create a WIDE HORIZONTAL composition (16:9 aspect ratio, landscape orientation)"
  - 9:16: "Create a TALL VERTICAL composition (9:16 aspect ratio, portrait orientation)"
  - 1:1: "Create a SQUARE composition (1:1 aspect ratio)"

**Commit**: `6abead4` - "fix: Gemini Image API outputOptions 오류 수정"

### Issue 2: **"8-Head Proportion" Still Appearing**
**Problem**: Despite previous removal attempts, LLM still generated "8-head tall" in protagonist prompts

**Solution**:
- Completely removed all ratio specifications from LLM prompts
- Changed focus to: "Focus on visual style, personality, and mood. Natural, balanced proportions."

**Commit**: `781dbd8` - "fix: LLM 프롬프트에서 비율 명세 완전 제거"

---

## 📂 Project Structure

```
/home/user/webapp/
├── app/
│   ├── api/
│   │   ├── generate/route.ts           # Storyboard generation
│   │   ├── generate-protagonist/route.ts  # 4 protagonist candidates
│   │   ├── generate-final/route.ts     # Final scene generation (SSE)
│   │   └── update-storyboard/route.ts  # Save edited storyboard
│   ├── page.tsx                        # Main page (workflow orchestration)
│   └── layout.tsx
├── components/
│   ├── LyricsInput.tsx                 # Lyrics + scene count + ratio selection
│   ├── StoryboardReview.tsx            # Display & edit storyboard
│   ├── ProtagonistSelector.tsx         # Choose protagonist or "no protagonist"
│   ├── LoadingSpinner.tsx              # Real-time progress + image preview
│   └── ImageGallery.tsx                # Final gallery + ZIP download
├── utils/
│   ├── llmService.ts                   # Gemini LLM API calls
│   └── imageService.ts                 # Gemini Image API calls
├── types/
│   └── index.ts                        # TypeScript interfaces
└── .env.local                          # API keys (GEMINI_API_KEY)
```

---

## 🔑 Environment Setup

### Required API Keys:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### Running the Project:
```bash
cd /home/user/webapp
npm install
npm run dev
```

**Dev Server**: http://localhost:3001  
**Public URL**: https://3001-i6zvai5y9w9lrmmnqfp62-2e77fc33.sandbox.novita.ai

---

## 🐛 Known Issues & Considerations

### 1. **Aspect Ratio Not Guaranteed**
- **Issue**: Gemini Image API doesn't support `outputOptions.aspectRatio`
- **Workaround**: Aspect ratio specified in prompts (e.g., "wide horizontal composition")
- **Result**: Images generally match requested ratio, but not 100% guaranteed
- **Future**: Monitor Gemini API updates for native aspect ratio support

### 2. **Image Quality Variability**
- **Status**: Using latest Gemini 2.5 Flash Image model
- **Note**: Quality depends on prompt clarity and model capabilities
- **Recommendation**: Continue monitoring for new model releases

### 3. **Generation Time**
- 8 scenes: ~1 minute
- 20 scenes: ~2-3 minutes
- 32 scenes: ~4-5 minutes
- **Note**: Includes 1-second delay between API calls to prevent rate limiting

---

## 🔄 Workflow Summary

1. **User Input** → Lyrics + Scene Count (8/12/20/25/32) + Ratio (16:9/9:16)
2. **LLM Analysis** → Mood analysis + Protagonist prompt + Scene prompts
3. **Storyboard Review** → Edit/regenerate scenes if needed
4. **Protagonist Generation** → 4 mood-based candidates (Confident, Gentle, Mysterious, Dynamic)
5. **Protagonist Selection** → Choose 1 of 4 candidates OR "No protagonist" OR upload custom
6. **Scene Generation** → Real-time SSE streaming with live preview
7. **Final Gallery** → View all scenes + Download ZIP

---

## 📊 Recent Commit History

```
955d3e8 docs: Update project summary with latest changes
6abead4 fix: Gemini Image API outputOptions 오류 수정
781dbd8 fix: LLM 프롬프트에서 비율 명세 완전 제거
308f20d feat: 이미지 비율 선택 및 주인공 무드 다양화
e04952d feat: '주인공 없음' 옵션 및 생성 취소 기능 추가
be24652 feat: 스토리보드 수정 및 재생성 기능 추가
6ac6117 feat: 가사 분위기에 맞춘 캐릭터 스타일 자동 조정
fd4eda9 feat: ZIP 다운로드 수정 및 프롬프트 표시 기능 추가
9f7ff5c feat: 캐릭터 스타일을 멋진 현대 애니메이션 풍으로 대폭 개선
469562f fix: SSE Controller 닫힘 에러 처리 개선
```

---

## 🚀 Next Steps (Future Enhancements)

### Potential Improvements:
1. **Video Generation**: Convert static scenes to animated video
2. **Music Sync**: Sync scene transitions with music timing
3. **Database Integration**: Store user projects and history
4. **User Authentication**: Login system for saved projects
5. **Advanced Editing**: Fine-tune individual character/scene details
6. **Cloud Storage**: Save generated images to cloud storage
7. **Social Sharing**: Direct sharing to social media platforms

### Technical Debt:
- Monitor Gemini API for native aspect ratio support
- Consider alternative image generation models for higher quality
- Implement Redis for session management (currently in-memory)
- Add comprehensive error logging and monitoring

---

## 📝 Testing Checklist

Before deploying or continuing development, test:
- ✅ Lyrics input with all scene count options
- ✅ 16:9 and 9:16 aspect ratio selection
- ✅ Storyboard generation and editing
- ✅ 4 protagonist candidate generation
- ✅ "No protagonist" option
- ✅ Cancel button during generation
- ✅ Real-time SSE progress updates
- ✅ ZIP file download and extraction
- ✅ Prompt display (hover + modal)
- ✅ Responsive design on mobile/tablet/desktop

---

## 🔗 Important Links

- **GitHub Repo**: https://github.com/GnuDaSsa/blue
- **Live Demo**: https://3001-i6zvai5y9w9lrmmnqfp62-2e77fc33.sandbox.novita.ai
- **Gemini API Docs**: https://ai.google.dev/gemini-api/docs

---

## 📌 Session Notes

**All changes committed and pushed to GitHub** ✅  
**Working tree is clean** ✅  
**Ready to resume development** ✅

To continue work:
```bash
git clone https://github.com/GnuDaSsa/blue.git
cd blue
npm install
# Add GEMINI_API_KEY to .env.local
npm run dev
```

---

**End of Session Handoff Document**
