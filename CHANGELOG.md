# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-08-21

### Added
- **Qwen2.5-8B 멀티모달 AI 시스템**: 기존 Gemini에서 Qwen2.5-8B-Instruct로 완전 전환
- **통합 AI 분석**: 텍스트, 이미지, 음성을 하나의 모델로 처리
- **고급 분석 대시보드**: 트렌드, 패턴, 이상감지, 근본원인 분석
- **시각화 차트 시스템**: AI 분석 결과의 동적 차트 생성
- **이미지 모달 뷰어**: 풀사이즈 이미지 보기 및 갤러리 네비게이션
- **Whisper 음성 인식**: 백업 음성 인식 시스템 추가
- **실시간 시스템 정보**: 브라우저, OS, 화면 해상도 자동 감지
- **오프라인 인증 시스템**: 인터넷 연결 없이도 사용 가능한 로컬 인증

### Enhanced
- **UI/UX 개선**: shadcn/ui 컴포넌트 기반의 현대적 디자인
- **성능 최적화**: React Query를 통한 효율적 데이터 캐싱
- **타입 안전성**: TypeScript + Drizzle ORM으로 완전한 타입 안전성
- **반응형 디자인**: 모바일 및 태블릿 지원 강화

### Changed
- **AI 모델 아키텍처**: Gemini API → Qwen2.5-8B Hugging Face API
- **인증 시스템**: 온라인/오프라인 듀얼 모드 지원
- **데이터베이스**: 세션 기반 인증으로 전환
- **파일 시스템**: 체계적인 컴포넌트 구조 재편

### Fixed
- **음성 인식 안정성**: 에러 핸들링 및 권한 관리 개선
- **이미지 업로드**: 파일 크기 및 타입 검증 강화
- **세션 관리**: PostgreSQL 기반 안정적 세션 저장
- **API 에러 처리**: 일관된 에러 응답 및 로깅

### Security
- **파일 업로드 보안**: 안전한 파일명 생성 및 타입 검증
- **SQL 인젝션 방지**: Drizzle ORM 파라미터화 쿼리
- **세션 보안**: HTTP-only 쿠키 및 CSRF 보호
- **입력 검증**: Zod 스키마 기반 데이터 검증

## [1.5.0] - 2025-08-20

### Added
- **AI 이미지 분석**: 첨부된 스크린샷 자동 분석 기능
- **음성 인식**: 한국어 음성 입력 지원 (ko-KR)
- **실시간 대시보드**: Chart.js 기반 통계 시각화
- **시스템 자동 분류**: AI 기반 오류 카테고리 분류

### Enhanced
- **Gemma-2-2B 모델**: Hugging Face API 통합
- **파일 업로드**: Multer 기반 이미지 업로드 시스템
- **UI 컴포넌트**: shadcn/ui 컴포넌트 라이브러리 적용

## [1.0.0] - 2025-08-15

### Added
- **기본 오류 관리 시스템**: CRUD 기능 구현
- **사용자 인증**: Replit OpenID Connect 통합
- **데이터베이스**: PostgreSQL + Drizzle ORM
- **프론트엔드**: React + TypeScript + Vite
- **백엔드**: Node.js + Express.js

### Features
- 오류 접수 및 관리
- 사용자별 오류 추적
- 기본 통계 대시보드
- 파일 첨부 지원

---

## 향후 계획 (Roadmap)

### v2.1.0 (계획 중)
- [ ] 실시간 알림 시스템 (WebSocket)
- [ ] 모바일 앱 지원
- [ ] 다국어 지원 확장 (영어, 일본어)
- [ ] 고급 사용자 권한 관리

### v2.2.0 (계획 중)
- [ ] API 문서 자동 생성 (Swagger/OpenAPI)
- [ ] 단위 테스트 및 통합 테스트
- [ ] CI/CD 파이프라인
- [ ] 성능 모니터링 대시보드

### v3.0.0 (장기 계획)
- [ ] 마이크로서비스 아키텍처
- [ ] Redis 캐싱 레이어
- [ ] Kubernetes 배포 지원
- [ ] GraphQL API 지원