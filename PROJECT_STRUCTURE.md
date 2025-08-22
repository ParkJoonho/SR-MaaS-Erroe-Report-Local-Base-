# 프로젝트 구조 (Project Structure)

이 문서는 SR-MaaS 오류 관리 시스템의 전체 프로젝트 구조를 설명합니다.

## 📁 디렉토리 구조

```
sr-maas-error-management/
├── 📁 client/                     # React 프론트엔드
│   ├── 📁 src/
│   │   ├── 📁 components/         # 재사용 가능한 컴포넌트
│   │   │   ├── 📁 ui/            # shadcn/ui 기본 컴포넌트
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── alert-dialog.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   └── ...
│   │   │   ├── dashboard-stats.tsx    # 대시보드 통계 컴포넌트
│   │   │   ├── error-form.tsx         # 오류 등록 폼
│   │   │   └── error-table.tsx        # 오류 목록 테이블
│   │   ├── 📁 pages/              # 페이지 컴포넌트
│   │   │   ├── admin-dashboard.tsx    # 관리자 대시보드
│   │   │   ├── analytics.tsx          # 고급 분석 페이지
│   │   │   ├── error-edit.tsx         # 오류 편집 페이지
│   │   │   ├── error-report.tsx       # 오류 상세 보기
│   │   │   ├── error-submit.tsx       # 오류 접수 페이지
│   │   │   ├── home.tsx               # 홈 페이지
│   │   │   └── not-found.tsx          # 404 페이지
│   │   ├── 📁 hooks/              # 커스텀 React 훅
│   │   │   ├── use-mobile.tsx         # 모바일 감지 훅
│   │   │   ├── use-toast.ts           # 토스트 알림 훅
│   │   │   └── useAuth.ts             # 인증 상태 훅
│   │   ├── 📁 lib/                # 유틸리티 함수
│   │   │   ├── authUtils.ts           # 인증 관련 유틸
│   │   │   ├── queryClient.ts         # React Query 설정
│   │   │   ├── system-info.ts         # 시스템 정보 수집
│   │   │   └── utils.ts               # 공통 유틸리티
│   │   ├── App.tsx                    # 메인 앱 컴포넌트
│   │   ├── main.tsx                   # React 엔트리포인트
│   │   └── index.css                  # 글로벌 스타일
│   └── index.html                     # HTML 템플릿
├── 📁 server/                     # Express 백엔드
│   ├── index.ts                       # 서버 엔트리포인트
│   ├── routes.ts                      # API 라우트 정의
│   ├── db.ts                          # 데이터베이스 연결
│   ├── storage.ts                     # 데이터 접근 레이어
│   ├── qwen.ts                        # Qwen AI 모델 통합
│   ├── whisper.ts                     # Whisper 음성 인식
│   ├── gemini.ts                      # Gemini API (레거시)
│   ├── gemma.ts                       # Gemma 모델 (레거시)
│   ├── replitAuth.ts                  # Replit 인증
│   ├── offlineAuth.ts                 # 오프라인 인증
│   ├── seed.ts                        # 테스트 데이터 생성
│   └── vite.ts                        # Vite 개발 서버 통합
├── 📁 shared/                     # 공유 타입 및 스키마
│   └── schema.ts                      # Drizzle 데이터베이스 스키마
├── 📁 docs/                       # 추가 문서
│   ├── LLM_MODEL_GUIDE.md            # AI 모델 가이드
│   └── OFFLINE_SETUP.md              # 오프라인 설정 가이드
├── 📁 uploads/                    # 파일 업로드 저장소
│   ├── .gitkeep                      # Git 추적용 빈 파일
│   └── attachments-*.png             # 업로드된 이미지들
├── 📁 attached_assets/            # 정적 자산
│   ├── CIBI_basic_*.png              # 프로젝트 이미지
│   └── 시스템상세_*.png              # 시스템 다이어그램
├── 📄 README.md                   # 프로젝트 개요 및 설치 가이드
├── 📄 TECHNICAL_DOCUMENTATION.md  # 상세 기술 문서
├── 📄 CHANGELOG.md               # 변경 사항 로그
├── 📄 CONTRIBUTING.md            # 기여 가이드
├── 📄 LICENSE                    # MIT 라이센스
├── 📄 PROJECT_STRUCTURE.md       # 이 파일
├── 📄 .gitignore                 # Git 무시 파일 목록
├── 📄 .env.example               # 환경 변수 템플릿
├── 📄 package.json               # Node.js 패키지 설정
├── 📄 package-lock.json          # 의존성 락 파일
├── 📄 tsconfig.json              # TypeScript 설정
├── 📄 vite.config.ts             # Vite 빌드 설정
├── 📄 tailwind.config.ts         # Tailwind CSS 설정
├── 📄 postcss.config.js          # PostCSS 설정
├── 📄 drizzle.config.ts          # Drizzle ORM 설정
├── 📄 components.json            # shadcn/ui 설정
└── 📄 replit.md                  # Replit 프로젝트 개요
```

## 🏗 아키텍처 개요

### Frontend (Client)
- **프레임워크**: React 18 + TypeScript
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS + shadcn/ui
- **상태 관리**: TanStack React Query
- **라우팅**: Wouter
- **폼 관리**: React Hook Form + Zod

### Backend (Server)
- **런타임**: Node.js + TypeScript
- **프레임워크**: Express.js
- **데이터베이스**: PostgreSQL + Drizzle ORM
- **인증**: Replit OpenID Connect / 오프라인 인증
- **파일 업로드**: Multer
- **세션**: PostgreSQL 기반 세션 저장

### AI & 멀티모달 처리
- **주 모델**: Qwen2.5-8B-Instruct (Hugging Face API)
- **음성 인식**: Whisper Large V3 (백업)
- **이미지 분석**: Qwen2.5-8B 멀티모달 기능
- **브라우저 음성**: Web Speech API (ko-KR)

## 📊 데이터 플로우

### 1. 오류 접수 플로우
```
사용자 입력 → 음성/텍스트 변환 → AI 분석 → 데이터베이스 저장 → 대시보드 업데이트
```

### 2. 이미지 분석 플로우
```
이미지 업로드 → Multer 처리 → Qwen2.5-8B 분석 → 결과 반환 → UI 표시
```

### 3. 고급 분석 플로우
```
통계 데이터 수집 → AI 패턴 분석 → 시각화 차트 생성 → 인사이트 제공
```

## 🔧 핵심 컴포넌트

### React 컴포넌트 계층구조
```
App
├── Router (wouter)
├── QueryClientProvider (React Query)
├── ThemeProvider (다크/라이트 모드)
├── Toaster (알림 시스템)
└── Pages
    ├── AdminDashboard
    │   ├── DashboardStats
    │   └── ErrorTable
    ├── ErrorSubmit
    │   ├── ErrorForm
    │   └── VoiceRecognition
    ├── Analytics
    │   ├── ChartComponents
    │   └── AIAnalysis
    └── ErrorEdit
        ├── ImageGallery
        └── StatusUpdate
```

### Express 미들웨어 스택
```
Express App
├── CORS 설정
├── JSON Parser
├── Multer (파일 업로드)
├── Session 미들웨어
├── 인증 미들웨어
├── API 라우터
│   ├── /api/auth/*     (인증)
│   ├── /api/errors/*   (오류 관리)
│   ├── /api/stats/*    (통계)
│   ├── /api/analyze/*  (AI 분석)
│   └── /api/upload     (파일 업로드)
├── Vite 개발 서버 (개발 환경)
└── 정적 파일 서빙 (프로덕션)
```

## 🗄 데이터베이스 스키마

### 주요 테이블
1. **users** - 사용자 정보
2. **sessions** - 세션 데이터 (Replit Auth)
3. **errors** - 오류 데이터

### 관계도
```
users (1) ←→ (N) errors
sessions (1) ←→ (1) users
```

## 🚀 빌드 프로세스

### 개발 환경
1. **서버**: `tsx server/index.ts` (TypeScript 실시간 컴파일)
2. **클라이언트**: Vite 개발 서버 (HMR 지원)
3. **동시 실행**: 단일 포트에서 통합 서빙

### 프로덕션 빌드
1. **클라이언트**: `vite build` (정적 파일 생성)
2. **서버**: `esbuild` (번들링 및 최적화)
3. **출력**: `dist/` 디렉토리

## 🔒 보안 레이어

### 인증 & 권한
- 세션 기반 인증 (HTTP-only 쿠키)
- CSRF 보호 (SameSite 설정)
- 미들웨어 기반 권한 검사

### 입력 검증
- Zod 스키마 검증 (프론트엔드 + 백엔드)
- Drizzle ORM (SQL 인젝션 방지)
- 파일 업로드 제한 (크기, 타입)

### 데이터 보호
- 환경 변수를 통한 시크릿 관리
- 안전한 파일명 생성
- 적절한 에러 메시지 (정보 누출 방지)

## 📦 의존성 관리

### 주요 프론트엔드 의존성
- `react` `react-dom` - React 핵심
- `@tanstack/react-query` - 서버 상태 관리
- `@radix-ui/*` - UI 컴포넌트 기초
- `tailwindcss` - 스타일링
- `chart.js` - 데이터 시각화
- `wouter` - 라우팅

### 주요 백엔드 의존성
- `express` - 웹 프레임워크
- `drizzle-orm` - ORM
- `@neondatabase/serverless` - PostgreSQL 드라이버
- `@huggingface/inference` - AI 모델 API
- `multer` - 파일 업로드
- `express-session` - 세션 관리

### 개발 도구
- `typescript` - 타입 안전성
- `vite` - 빌드 도구
- `tsx` - TypeScript 실행
- `drizzle-kit` - 데이터베이스 도구
- `esbuild` - 번들링

## 🔄 상태 관리 전략

### 클라이언트 상태
- **React Query**: 서버 데이터 캐싱 및 동기화
- **React Hook Form**: 폼 상태 관리
- **useState/useContext**: 로컬 컴포넌트 상태

### 서버 상태
- **PostgreSQL**: 영구 데이터 저장
- **Express Session**: 사용자 세션
- **메모리**: 임시 데이터 (개발 환경)

## 📱 반응형 디자인

### 브레이크포인트
- **모바일**: < 768px
- **태블릿**: 768px - 1024px  
- **데스크톱**: > 1024px

### 적응형 UI
- 모바일 우선 설계
- 터치 친화적 인터페이스
- 접근성 고려 (ARIA 속성)

이 구조는 확장 가능하고 유지보수가 용이하도록 설계되었으며, 모던 웹 개발 베스트 프랙티스를 따릅니다.