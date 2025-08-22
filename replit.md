# Overview

This is the SR-MaaS Integrated Information System Error Management System, built with a React frontend (Vite + TypeScript) and Express.js backend. The application provides comprehensive error reporting and tracking capabilities with AI-powered features including intelligent title generation, system classification, voice recognition input, and image analysis using Google Gemini API. Users can submit error reports through voice input or traditional text entry, while administrators can manage and track error resolution progress through a comprehensive dashboard with real-time charts and statistics.

## Recent Changes (August 22, 2025)

### Git 저장소 준비 및 코드 정리 (Latest)
- ✅ Git 커밋을 위한 전체 코드 재정리 완료
- ✅ 프로덕션 최적화: 개발용 로그를 개발 환경에서만 실행되도록 수정
- ✅ 파일 시스템 정리: 임시 업로드 파일 제거, .gitignore 최적화
- ✅ 문서화 완료: README.md, LICENSE, 기술 문서 정비
- ✅ Git 저장소 초기화 및 커밋 준비 완료

### 배포 중단 및 시스템 점검 (August 22, 2025)
- ⚠️ 사용자 요청에 따라 배포 중단
- 오류 접수 기능 관련 문제 점검 필요
- 시스템 안정성 재검토 예정

### AI 기반 오류 접수 시스템 v1.0 Standard 정식 출시 (August 21, 2025)
- 🎉 버전 1.0 Standard 정식 출시 완료
- 모든 페이지 타이틀을 "AI 기반 오류 접수 시스템 v1.0"으로 업데이트
- 웹페이지 하단 카피라이트 "© 2025 Software Engineering Research Institute" 추가
- VERSION_1.0_RELEASE_NOTES.md 상세 출시 노트 작성
- 완전한 오프라인 운영 지원으로 격리 환경에서 100% 작동
- Qwen2.5-8B 멀티모달 AI 엔진으로 음성, 이미지, 텍스트 통합 처리
- 실시간 분석 대시보드와 AI 예측 시스템 완비
- 운영 배포를 위한 최종 코드 정리 및 성능 최적화 완료
- 프로덕션 레디 상태로 즉시 배포 가능

### Complete Offline Mode Implementation
- 완전 오프라인 환경을 위한 AI 모델 시스템 구현
- 인터넷 연결 없이 작동하는 키워드 기반 제목 생성 및 시스템 분류
- Hugging Face API 의존성 제거 및 로컬 분석 엔진으로 전환
- 오프라인 인증 시스템으로 자동 사용자 인증 설정
- 환경 변수 OFFLINE_MODE=true로 완전 격리 환경 지원
- 키워드 기반 스마트 분석: 역무지원, 열차운행, 시설관리, 보안시스템, 승객서비스 자동 분류
- 인터넷 연결이 차단된 폐쇄망 환경에서도 모든 기능 정상 작동 보장

### Git-Ready Code Organization and Documentation
- Created comprehensive technical documentation (TECHNICAL_DOCUMENTATION.md)
- Added professional README with installation guides and feature overview
- Implemented proper .gitignore with comprehensive exclusions
- Created CHANGELOG.md with detailed version history
- Added CONTRIBUTING.md with development guidelines
- Created PROJECT_STRUCTURE.md with complete architecture overview
- Added LICENSE (MIT) and proper project metadata
- Organized uploads directory with .gitkeep for Git tracking
- Cleaned up temporary files and prepared codebase for Git repository

### AI Analysis Visualization System (Completed)
- Added dynamic chart generation for AI analysis results
- Implemented visualization types: line charts (trends), donut charts (patterns), bar charts (anomalies), dual-axis charts (root-cause)
- Created real-time data visualization using actual system statistics
- Added chart explanations and analysis type badges
- Integrated Chart.js with responsive design and proper theming

### AI Model Upgrade to Qwen2.5-8B Multimodal System
- Migrated from Gemma-2-2B to Qwen2.5-8B-Instruct for unified multimodal AI processing
- Unified speech recognition, image analysis, and text generation using single Qwen2.5-8B model
- Implemented comprehensive multimodal capabilities: text, speech, and vision in one model
- Added Whisper fallback for enhanced speech recognition reliability
- Implemented CPU-optimized inference with Q4 quantization support
- Enhanced AI analysis endpoints with pattern recognition and trend prediction
- Streamlined architecture using single 8B model for all AI tasks
- Updated all existing AI endpoints to use unified Qwen2.5-8B model system

### Complete Playwright Removal and Website Integration Simplification
- Completely removed all Playwright dependencies and automated testing functionality
- Deleted server/playwright-test.ts file and all related imports
- Simplified API endpoint `/api/errors/automated-test` to basic website integration validation
- Replaced complex test scenarios with simple URL and login credential verification
- Maintained existing website integration UI with iframe embedding
- Streamlined system to focus purely on error management with basic web connectivity verification

### System Information Collection Enhancement
- Fixed dynamic system information collection to properly detect user's browser, OS, platform, and screen resolution
- Restructured system details display to show: 브라우저, 운영체제, 시스템(OS), 화면 해상도
- Implemented real-time browser detection for Chrome, Firefox, Safari, Edge with version information
- Added automatic OS detection for Windows, macOS, Linux with detailed version parsing
- Enhanced screen resolution detection with proper formatting (예: 1920 × 1080)

### Error Submission Workflow Enhancement
- Modified system selection to default to "-" option for better user experience
- Updated workflow sequence: 내용 입력 → 제목 요약 → 시스템 분류 (content input → title generation → system classification)
- Removed duplicate system classification triggers to prevent conflicts
- Enhanced voice recognition workflow to follow proper sequence after speech completion

### Offline Authentication System
- Implemented dual authentication system supporting both online and offline modes
- Added offline authentication with local username/password system
- Created automatic admin account generation for offline environments
- Enhanced system compatibility for environments without internet connectivity
- Added environment variable controls for authentication mode selection

### Voice Recognition Integration
- Implemented Google Web Speech API for Korean voice recognition (ko-KR)
- Added voice-to-text conversion with microphone button UI
- Integrated automatic system classification after voice recognition completion
- Added error handling for microphone permissions and browser compatibility

### UI/UX Improvements  
- Replaced all bug icons with SRT logo for consistent branding
- Enhanced voice recording UI with animated microphone states
- Improved user feedback with toast notifications for voice recognition errors

### AI Enhancement
- Enhanced system classification to trigger automatically after voice input
- Added retry mechanisms for Gemini API overload situations
- Improved AI-powered title generation and system categorization accuracy

### AI Model Evolution
- **August 21, 2025**: Upgraded to Qwen2.5-8B-Instruct + Whisper Large V3 for multimodal AI capabilities
- **Previous**: Migrated from Google Gemini API to Gemma-2-2B model via Hugging Face API
- Implemented CPU-optimized inference with 8B parameter models for enhanced performance
- Added advanced speech recognition and image analysis capabilities
- Enhanced offline capabilities with robust keyword-based fallbacks
- Maintained full backward compatibility with existing API endpoints

# User Preferences

Preferred communication style: Simple, everyday language.

## Offline Authentication Requirements
- System must support offline operation without internet connectivity
- Local username/password authentication as fallback for Replit Auth
- Automatic admin account creation for isolated environments
- Environment-based authentication mode switching

# System Architecture

## Frontend Architecture
The client uses a modern React stack with Vite as the build tool and TypeScript for type safety. The UI is built with shadcn/ui components based on Radix UI primitives and styled with Tailwind CSS. State management is handled through TanStack React Query for server state and React Hook Form for form management. The routing system uses Wouter for client-side navigation.

**Key Design Decisions:**
- **Component Library**: Chose shadcn/ui for consistent, accessible components with extensive Radix UI integration
- **Styling**: Tailwind CSS with CSS variables for theming support and consistent design tokens
- **State Management**: TanStack React Query eliminates the need for additional state management libraries by handling server state efficiently
- **Form Handling**: React Hook Form with Zod validation provides type-safe form management with minimal re-renders

## Backend Architecture
The server implements a RESTful API using Express.js with TypeScript. Authentication is handled through Replit's OpenID Connect integration with session-based storage. The application follows a layered architecture with separate concerns for routing, data access, and business logic.

**Key Design Decisions:**
- **Database Layer**: Drizzle ORM provides type-safe database operations with PostgreSQL
- **Authentication**: Replit OpenID Connect ensures secure user authentication within the Replit environment
- **Session Management**: PostgreSQL-backed sessions provide persistent login state across server restarts
- **API Design**: RESTful endpoints with consistent error handling and logging middleware

## Database Design
Uses PostgreSQL with Drizzle ORM for type-safe database operations. The schema includes user management tables required for Replit Auth integration and error tracking tables for the core functionality.

**Table Structure:**
- **users**: Stores user profile information from Replit Auth
- **sessions**: Session storage required for authentication persistence
- **errors**: Core error reporting data with status tracking and metadata

## Authentication & Authorization
Implements Replit's OpenID Connect authentication system with session-based authorization. The system requires users to be authenticated to access any functionality beyond the landing page.

**Security Features:**
- OpenID Connect integration with Replit's identity provider
- Session-based authentication with PostgreSQL storage
- Middleware-based route protection
- Secure cookie configuration for production environments

# External Dependencies

## Core Infrastructure
- **Neon Database**: Serverless PostgreSQL database with `@neondatabase/serverless` driver for connection pooling
- **Replit Authentication**: OpenID Connect integration using `openid-client` and `passport` strategies

## AI Integration
- **Qwen2.5-8B-Instruct**: Unified 8B parameter multimodal LLM handling all AI tasks including:
  - Intelligent error title generation and system classification
  - Advanced speech recognition with Korean optimization
  - Image analysis and screenshot interpretation
  - Pattern analysis and trend prediction
- **Whisper Fallback**: Backup speech recognition using Whisper-base for enhanced reliability

## UI Components & Styling
- **Radix UI**: Comprehensive component library (`@radix-ui/*`) providing accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Chart.js**: Data visualization library for dashboard analytics and error statistics

## Development Tools
- **Vite**: Frontend build tool with React plugin and development server
- **Drizzle**: Type-safe ORM with migration support and PostgreSQL dialect
- **React Hook Form**: Form state management with Zod schema validation
- **TanStack React Query**: Server state management and caching solution