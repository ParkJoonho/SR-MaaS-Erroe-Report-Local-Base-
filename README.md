# SR-MaaS 통합정보시스템 오류 관리 시스템

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

AI 기반 시스템 오류 관리 및 분석 플랫폼으로, 고급 멀티모달 AI 기술을 활용한 지능형 문제 해결 도구입니다.

## 🚀 주요 기능

### 🤖 AI 기반 오류 분석
- **Qwen2.5-8B 멀티모달 모델** 통합
- 오류 제목 자동 생성
- 시스템 카테고리 자동 분류
- 이미지 내용 분석 및 설명

### 🎤 음성 인식 지원
- 한국어 음성을 통한 오류 접수
- Web Speech API + Whisper 백업
- 실시간 음성-텍스트 변환

### 📊 실시간 대시보드
- 오류 현황 실시간 모니터링
- 카테고리별 통계 시각화
- 해결률 및 트렌드 분석

### 📈 고급 분석 기능
- AI 기반 트렌드 예측
- 패턴 분석 및 이상 감지
- 근본 원인 분석
- 시각화 차트 자동 생성

### 📷 이미지 분석
- 스크린샷 자동 분석
- 이미지 모달 뷰어
- 멀티 이미지 갤러리 지원

## 🛠 기술 스택

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** - 모던 UI 컴포넌트
- **Chart.js** - 데이터 시각화
- **TanStack React Query** - 서버 상태 관리
- **Wouter** - 경량 라우팅

### Backend
- **Node.js** + **Express.js** + **TypeScript**
- **PostgreSQL** + **Drizzle ORM** - 타입 안전 데이터베이스
- **Multer** - 파일 업로드 처리
- **Express Session** - 세션 기반 인증

### AI & 멀티모달 처리
- **Qwen2.5-8B-Instruct** - 통합 멀티모달 AI 모델
- **Whisper** - 음성 인식 백업
- **Hugging Face Inference API** - AI 모델 추론

## 📋 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd sr-maas-error-management
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
```bash
cp .env.example .env
```

#### 필수 환경 변수
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

### 4. 데이터베이스 설정
```bash
# 스키마 동기화
npm run db:push

# 테스트 데이터 생성 (선택사항)
npm run seed
```

### 5. 애플리케이션 실행
```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start
```

## 🔐 인증 시스템

### 온라인 모드 (기본)
- Replit OpenID Connect 인증
- 자동 사용자 계정 생성
- 세션 기반 로그인 상태 유지

### 오프라인 모드
오프라인 환경에서 사용 시 환경 변수 설정:
```bash
AUTH_MODE=offline
```

#### 기본 관리자 계정
- **사용자명**: `admin`
- **비밀번호**: `admin123!`

## 📡 API 엔드포인트

### 인증 API
```
GET  /api/auth/user         # 현재 사용자 정보
GET  /api/login            # Replit 로그인 리다이렉트
GET  /api/logout           # 로그아웃
POST /api/offline/login    # 오프라인 로그인
```

### 오류 관리 API
```
GET    /api/errors         # 오류 목록 조회
POST   /api/errors         # 새 오류 생성
GET    /api/errors/:id     # 특정 오류 조회
PATCH  /api/errors/:id     # 오류 상태 업데이트
DELETE /api/errors/:id     # 오류 삭제
```

### AI 분석 API
```
POST /api/analyze/image                      # 이미지 분석
POST /api/analyze/speech                     # 음성 인식
POST /api/analytics/generate-ai-analysis     # AI 트렌드 분석
POST /api/errors/generate-title              # 제목 자동 생성
POST /api/errors/analyze-system              # 시스템 분류
```

### 통계 API
```
GET /api/stats/errors      # 오류 상태별 통계
GET /api/stats/categories  # 카테고리별 통계
GET /api/stats/weekly      # 주간 통계
```

## 🎯 사용 가이드

### 오류 접수
1. **음성 접수**: 마이크 버튼을 클릭하여 음성으로 오류 내용 입력
2. **텍스트 입력**: 직접 오류 내용 작성
3. **이미지 첨부**: 스크린샷 또는 관련 이미지 업로드
4. **AI 자동 분석**: 제목 및 시스템 카테고리 자동 생성

### 대시보드 활용
- **실시간 통계**: 오류 발생 현황 모니터링
- **차트 분석**: 트렌드 및 패턴 분석
- **상태 관리**: 인라인 편집을 통한 오류 상태 업데이트

### 고급 분석
- **트렌드 분석**: AI 기반 오류 발생 패턴 예측
- **이상 감지**: 비정상적인 오류 증가 패턴 탐지
- **근본 원인 분석**: 시스템별 문제점 분석
- **시각화**: 자동 생성되는 분석 차트

## 🔧 개발 스크립트

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

# TypeScript 타입 체크
npm run type-check
```

## 🌐 배포

### Replit 배포
1. **환경 변수 설정**: Secrets 탭에서 필요한 환경 변수 설정
2. **데이터베이스 연결**: Neon PostgreSQL 데이터베이스 연결
3. **AI API 키**: Hugging Face API 키 설정
4. **Deploy 버튼 클릭**: 자동 배포 실행

### 수동 배포
```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env

# 데이터베이스 스키마 적용
npm run db:push

# 프로덕션 빌드
npm run build

# 서버 시작
npm start
```

## 📱 브라우저 지원

- **Chrome/Edge**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **모바일**: iOS Safari 14+, Chrome Mobile 88+

## 🔒 보안

### 인증 및 권한
- 세션 기반 인증 (HTTP-only 쿠키)
- CSRF 보호 (SameSite 쿠키)
- SQL 인젝션 방지 (Drizzle ORM)

### 파일 업로드
- 파일 크기 제한 (10MB)
- 파일 타입 검증 (이미지만)
- 안전한 파일명 생성

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 🤝 기여

기여를 환영합니다! 다음 절차를 따라주세요:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해 주세요.

## 📚 추가 문서

- [기술 문서](./TECHNICAL_DOCUMENTATION.md)
- [빌드 노트](./BUILD_NOTES.md)
- [버전 히스토리](./VERSION_HISTORY.md)
- [배포 가이드](./DEPLOYMENT_GUIDE.md)