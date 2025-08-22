# AI 기반 오류 접수 시스템 v1.0 Standard

## 프로젝트 개요
- **프로젝트명**: SR-MaaS 통합정보시스템 오류 관리 시스템
- **버전**: 1.0 Standard
- **라이센스**: MIT
- **개발 기간**: 2025년 8월

## 주요 기능
- 🤖 AI 기반 오류 제목 자동 생성 (Qwen2.5-8B)
- 🎯 스마트 시스템 분류 (역무지원, 열차운행, 시설관리, 보안시스템, 승객서비스)
- 🎤 음성 인식 오류 접수 (Web Speech API + Whisper 백업)
- 📷 이미지 분석 기반 오류 진단
- 📊 실시간 분석 대시보드 및 통계
- 🌐 완전 오프라인 모드 지원 (격리 환경 100% 작동)
- 📱 반응형 웹 디자인

## 기술 스택

### Frontend
- **React 18** + TypeScript
- **Vite** (빌드 도구)
- **Tailwind CSS** + shadcn/ui 컴포넌트
- **TanStack React Query** (상태 관리)
- **Wouter** (클라이언트 라우팅)

### Backend
- **Node.js** + Express.js
- **PostgreSQL** + Drizzle ORM
- **세션 기반 인증** (Replit Auth + 오프라인 모드)
- **Multer** (파일 업로드)

### AI 엔진
- **Qwen2.5-8B-Instruct** (멀티모달 AI)
- **Whisper Large V3** (음성 인식 백업)
- **오프라인 키워드 분석** (인터넷 연결 불가 환경)

### 인프라
- **Neon PostgreSQL** (서버리스 데이터베이스)
- **Replit** (개발/배포 플랫폼)
- **완전 오프라인 지원** (폐쇄망 환경)

## 프로젝트 구조
```
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/     # UI 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── hooks/          # 커스텀 훅
│   │   └── lib/           # 유틸리티
├── server/                 # Express 백엔드
│   ├── routes.ts          # API 라우트
│   ├── storage.ts         # 데이터베이스 레이어
│   ├── qwen.ts            # AI 모델 통합
│   ├── offlineAuth.ts     # 오프라인 인증
│   └── seed.ts            # 테스트 데이터
├── shared/                 # 공통 스키마
└── docs/                   # 문서
```

## 특별 기능

### 완전 오프라인 모드
- 인터넷 연결이 완전히 차단된 폐쇄망에서 작동
- 키워드 기반 스마트 분석으로 AI 기능 대체
- 로컬 인증 시스템으로 사용자 관리
- 환경변수 `OFFLINE_MODE=true`로 활성화

### AI 멀티모달 분석
- 텍스트, 음성, 이미지를 통합 처리
- 한국어 최적화된 오류 분류
- 실시간 차트 생성 및 트렌드 분석
- 예측 분석 및 패턴 인식

### 사용자 친화적 UI
- 직관적인 오류 접수 워크플로우
- 실시간 피드백 및 진행 상태 표시
- 관리자 대시보드 (실시간 통계)
- 모바일 최적화 반응형 디자인

## 설치 및 실행

### 개발 환경
```bash
npm install
npm run dev
```

### 환경 변수
```env
NODE_ENV=development
DATABASE_URL=your_postgres_url
OFFLINE_MODE=true  # 오프라인 모드
HUGGINGFACE_API_KEY=your_key  # 온라인 모드용
```

### 배포
```bash
npm run build
npm start
```

## 라이센스
MIT License - 자유로운 사용 및 수정 가능

## 개발진
Software Engineering Research Institute
© 2025 All Rights Reserved