# SR-MaaS 통합정보시스템 오류 관리 시스템 - 기술 문서

## 프로젝트 개요

AI 기반 시스템 오류 관리 및 분석 플랫폼으로, 고급 멀티모달 AI 기술을 활용한 지능형 문제 해결 도구입니다.

### 주요 기능
- 🤖 **AI 기반 오류 분석**: Qwen2.5-8B 멀티모달 모델을 통한 지능형 분석
- 🎤 **음성 인식**: 한국어 음성을 통한 오류 접수
- 📷 **이미지 분석**: 스크린샷 및 첨부 이미지 자동 분석
- 📊 **실시간 대시보드**: 오류 현황 및 통계 시각화
- 📈 **트렌드 예측**: AI 기반 오류 패턴 분석 및 예측
- 🔍 **고급 분석**: 패턴 분석, 이상 감지, 근본 원인 분석

## 기술 스택

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** - 현대적이고 접근성 좋은 UI 컴포넌트
- **Chart.js** + **React Chart.js 2** - 데이터 시각화
- **TanStack React Query** - 서버 상태 관리
- **React Hook Form** + **Zod** - 폼 관리 및 검증
- **Wouter** - 경량 라우팅

### Backend
- **Node.js** + **Express.js** + **TypeScript**
- **PostgreSQL** + **Drizzle ORM** - 타입 안전 데이터베이스 ORM
- **Multer** - 파일 업로드 처리
- **Express Session** - 세션 기반 인증

### AI & 멀티모달 처리
- **Qwen2.5-8B-Instruct** - 통합 멀티모달 AI 모델
  - 텍스트 생성 및 분석
  - 이미지 분석
  - 음성 인식 (Whisper 백업)
- **Hugging Face Inference API** - AI 모델 추론
- **Web Speech API** - 브라우저 기반 음성 인식

### 개발 도구
- **ESBuild** + **TSX** - 빠른 TypeScript 컴파일
- **Drizzle Kit** - 데이터베이스 마이그레이션 도구
- **PostCSS** + **Autoprefixer** - CSS 처리

## 프로젝트 구조

```
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/     # 재사용 가능한 컴포넌트
│   │   │   └── ui/        # shadcn/ui 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── hooks/         # 커스텀 React 훅
│   │   ├── lib/           # 유틸리티 함수
│   │   └── App.tsx        # 메인 앱 컴포넌트
│   └── index.html
├── server/                 # Express 백엔드
│   ├── index.ts           # 서버 엔트리포인트
│   ├── routes.ts          # API 라우트 정의
│   ├── db.ts              # 데이터베이스 연결
│   ├── storage.ts         # 데이터 접근 레이어
│   ├── qwen.ts            # Qwen AI 모델 통합
│   ├── whisper.ts         # Whisper 음성 인식
│   ├── replitAuth.ts      # Replit 인증
│   ├── offlineAuth.ts     # 오프라인 인증
│   └── vite.ts            # Vite 개발 서버 통합
├── shared/                 # 공유 타입 및 스키마
│   └── schema.ts          # Drizzle 데이터베이스 스키마
├── docs/                   # 추가 문서
├── uploads/                # 파일 업로드 저장소
└── attached_assets/        # 정적 자산
```

## 데이터베이스 스키마

### Users 테이블
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  name VARCHAR,
  email VARCHAR,
  avatar_url TEXT,
  replit_id VARCHAR UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Sessions 테이블 (Replit Auth용)
```sql
CREATE TABLE sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSON NOT NULL,
  expire TIMESTAMP NOT NULL
);
```

### Errors 테이블
```sql
CREATE TABLE errors (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  system VARCHAR NOT NULL,
  priority VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'new',
  reporter_id INTEGER REFERENCES users(id),
  browser VARCHAR,
  os VARCHAR,
  attachments TEXT[], -- 파일 경로 배열
  processing_note TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API 엔드포인트

### 인증 API
- `GET /api/auth/user` - 현재 사용자 정보
- `GET /api/login` - Replit 로그인 리다이렉트
- `GET /api/logout` - 로그아웃

### 오류 관리 API
- `GET /api/errors` - 오류 목록 조회
- `POST /api/errors` - 새 오류 생성
- `GET /api/errors/:id` - 특정 오류 조회
- `PATCH /api/errors/:id` - 오류 상태 업데이트

### 통계 API
- `GET /api/stats/errors` - 오류 상태별 통계
- `GET /api/stats/categories` - 카테고리별 통계
- `GET /api/stats/weekly` - 주간 통계

### AI 분석 API
- `POST /api/analyze/image` - 이미지 분석 (Qwen2.5-8B)
- `POST /api/analyze/speech` - 음성 인식 (Whisper)
- `POST /api/analytics/generate-ai-analysis` - AI 기반 트렌드 분석

### 파일 관리 API
- `POST /api/upload` - 파일 업로드

## AI 모델 통합

### Qwen2.5-8B-Instruct 모델
- **용도**: 멀티모달 AI 분석 (텍스트, 이미지, 음성)
- **API**: Hugging Face Inference API
- **기능**:
  - 오류 제목 자동 생성
  - 시스템 카테고리 분류
  - 이미지 내용 분석
  - 트렌드 분석 및 예측

### Whisper 음성 인식
- **용도**: 음성을 텍스트로 변환
- **API**: Hugging Face Inference API
- **모델**: openai/whisper-base
- **언어**: 한국어 지원

## 환경 변수

### 필수 환경 변수
```bash
# 데이터베이스
DATABASE_URL=postgresql://user:password@host:port/database

# AI 모델 API
HUGGINGFACE_API_KEY=your_huggingface_api_key

# 인증 설정
AUTH_MODE=online  # 또는 offline
SESSION_SECRET=your_session_secret

# Replit 인증 (온라인 모드)
REPLIT_CLIENT_ID=your_replit_client_id
REPLIT_CLIENT_SECRET=your_replit_client_secret
```

### 선택적 환경 변수
```bash
# 포트 설정
PORT=5000

# 노드 환경
NODE_ENV=development
```

## 개발 스크립트

### 주요 명령어
```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 데이터베이스 스키마 푸시
npm run db:push

# 데이터베이스 스키마 확인
npm run db:check

# 테스트 데이터 시드
npm run seed
```

## 배포 가이드

### Replit 배포
1. **환경 변수 설정**: Secrets 탭에서 필요한 환경 변수 설정
2. **데이터베이스 연결**: Neon PostgreSQL 데이터베이스 연결
3. **AI API 키**: Hugging Face API 키 설정
4. **Deploy 버튼 클릭**: 자동 배포 실행

### 수동 배포
```bash
# 의존성 설치
npm install

# 데이터베이스 스키마 적용
npm run db:push

# 테스트 데이터 생성 (선택사항)
npm run seed

# 프로덕션 실행
npm start
```

## 성능 최적화

### 프론트엔드
- **코드 분할**: React.lazy를 통한 페이지별 코드 분할
- **이미지 최적화**: 적절한 크기 및 포맷 사용
- **번들 크기**: Vite의 트리 쉐이킹으로 불필요한 코드 제거

### 백엔드
- **데이터베이스 인덱싱**: 자주 조회되는 컬럼에 인덱스 적용
- **캐싱**: React Query를 통한 클라이언트 사이드 캐싱
- **AI API**: 요청 제한 및 에러 핸들링

## 보안

### 인증 및 권한
- **세션 기반 인증**: HTTP-only 쿠키 사용
- **CSRF 보호**: SameSite 쿠키 설정
- **SQL 인젝션 방지**: Drizzle ORM의 파라미터화된 쿼리

### 파일 업로드
- **파일 크기 제한**: 10MB 제한
- **파일 타입 검증**: 이미지 파일만 허용
- **파일명 안전화**: 랜덤 파일명 생성

## 모니터링 및 로깅

### 에러 로깅
- 서버 에러는 콘솔에 상세 로그 출력
- 클라이언트 에러는 Toast 알림으로 사용자에게 표시

### 성능 모니터링
- AI API 응답 시간 추적
- 데이터베이스 쿼리 성능 모니터링

## 향후 개선 사항

### 기능 확장
- [ ] 실시간 알림 시스템 (WebSocket)
- [ ] 모바일 앱 지원
- [ ] 다국어 지원 확장
- [ ] 고급 AI 분석 기능

### 기술적 개선
- [ ] Redis 캐싱 레이어 추가
- [ ] CI/CD 파이프라인 구축
- [ ] 단위 테스트 및 통합 테스트
- [ ] 마이크로서비스 아키텍처 전환

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.