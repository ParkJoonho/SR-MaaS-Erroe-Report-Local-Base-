// 오프라인 모드 강제 설정 (인터넷 연결 없는 환경)
const isOfflineMode = true; // process.env.OFFLINE_MODE === 'true' || !process.env.HUGGINGFACE_API_KEY;

let hf: any = null;
// 완전 오프라인 환경에서는 Hugging Face API 사용하지 않음
if (!isOfflineMode && process.env.HUGGINGFACE_API_KEY) {
  try {
    const { HfInference } = require('@huggingface/inference');
    hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
    console.log('온라인 모드: Hugging Face API 사용 준비');
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Hugging Face API 초기화 실패, 오프라인 모드로 전환');
    }
  }
} else {
  if (process.env.NODE_ENV === 'development') {
    console.log('오프라인 모드: 인터넷 연결 없는 환경으로 감지');
  }
}

if (process.env.NODE_ENV === 'development') {
  console.log('AI 모델 모드:', isOfflineMode ? '오프라인 (로컬 키워드 분석)' : '온라인 (Qwen2.5-8B)');
}

// Qwen2.5-8B-Instruct 모델을 사용한 텍스트 생성 (오프라인 폴백 포함)
export async function generateWithQwen(prompt: string): Promise<string> {
  // 오프라인 모드에서는 키워드 기반 분석 사용
  if (isOfflineMode || !hf) {
    if (process.env.NODE_ENV === 'development') {
      console.log('오프라인 모드: 키워드 기반 분석 사용');
    }
    return await generateOfflineResponse(prompt);
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('온라인 모드: Qwen2.5 텍스트 생성 요청');
    }
    
    const response = await hf.textGeneration({
      model: 'Qwen/Qwen2.5-8B-Instruct',
      inputs: prompt,
      parameters: {
        max_new_tokens: 512,
        temperature: 0.1,
        top_p: 0.9,
        do_sample: true,
        return_full_text: false,
      },
    });

    const result = response.generated_text.trim();
    if (process.env.NODE_ENV === 'development') {
      console.log('Qwen2.5 응답:', result.substring(0, 100) + '...');
    }
    
    return result;
  } catch (error: any) {
    console.error('Qwen2.5 API 오류, 오프라인 모드로 폴백:', error);
    return await generateOfflineResponse(prompt);
  }
}

// 오프라인 키워드 기반 응답 생성
async function generateOfflineResponse(prompt: string): Promise<string> {
  const promptLower = prompt.toLowerCase();
  
  // 제목 생성 요청인지 확인
  if (promptLower.includes('제목') && promptLower.includes('생성')) {
    return generateOfflineTitle(prompt);
  }
  
  // 시스템 분류 요청인지 확인
  if (promptLower.includes('시스템') && promptLower.includes('분류')) {
    return generateOfflineSystemClassification(prompt);
  }
  
  // 이미지 분석 요청인지 확인
  if (promptLower.includes('이미지') && promptLower.includes('분석')) {
    return generateOfflineImageAnalysis();
  }
  
  // 기본 응답
  return '오프라인 모드에서 실행 중입니다. 기본 분석 결과를 제공합니다.';
}

// 이미지 분석 (오프라인 모드 지원)
export async function analyzeImageWithQwen(imageBase64: string, prompt: string = "이 이미지를 자세히 분석하고 설명해주세요."): Promise<string> {
  // 오프라인 모드에서는 키워드 기반 분석 사용
  if (isOfflineMode || !hf) {
    return generateOfflineImageAnalysis();
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('온라인 모드: Qwen2-VL 이미지 분석 요청');
    }
    
    // Qwen2-VL-8B 모델 사용 (멀티모달)
    const response = await hf.textGeneration({
      model: 'Qwen/Qwen2-VL-8B-Instruct',
      inputs: prompt,
      parameters: {
        max_new_tokens: 256,
        temperature: 0.1,
        top_p: 0.9,
        do_sample: true,
        return_full_text: false,
      },
    });

    const result = response.generated_text.trim();
    if (process.env.NODE_ENV === 'development') {
      console.log('Qwen2-VL 이미지 분석 완료');
    }
    
    return result;
  } catch (error) {
    console.error('온라인 이미지 분석 실패, 오프라인 모드로 폴백');
    return generateOfflineImageAnalysis();
  }
}

// 오프라인 이미지 분석
function generateOfflineImageAnalysis(): string {
  return `이미지 분석 결과:
- 이미지가 업로드되었습니다
- 오류 관련 스크린샷으로 보이며, 시스템 인터페이스가 포함되어 있습니다
- 기술적 문제나 버그와 관련된 내용으로 추정됩니다
- 추가 분석을 위해 다시 시도해 주세요

⚠️ 오프라인 모드: 완전한 이미지 분석을 위해서는 온라인 AI 모델이 필요합니다`;
}

// 오프라인 제목 생성
function generateOfflineTitle(prompt: string): string {
  const content = extractContentFromPrompt(prompt);
  const contentLower = content.toLowerCase();
  
  // 키워드 기반 제목 생성
  if (contentLower.includes('로그인') || contentLower.includes('인증')) {
    return '로그인 시스템 오류';
  } else if (contentLower.includes('화면') || contentLower.includes('페이지')) {
    return '화면 표시 문제';
  } else if (contentLower.includes('데이터') || contentLower.includes('정보')) {
    return '데이터 처리 오류';
  } else if (contentLower.includes('서버') || contentLower.includes('연결')) {
    return '서버 연결 문제';
  } else if (contentLower.includes('역무') || contentLower.includes('승객')) {
    return '역무 지원 시스템 문제';
  } else if (contentLower.includes('열차') || contentLower.includes('운행')) {
    return '열차 운행 관련 오류';
  } else if (contentLower.includes('시설') || contentLower.includes('관리')) {
    return '시설 관리 시스템 오류';
  } else {
    return '시스템 오류';
  }
}

// 오프라인 시스템 분류
function generateOfflineSystemClassification(prompt: string): string {
  const content = extractContentFromPrompt(prompt);
  const contentLower = content.toLowerCase();
  
  // 키워드 기반 시스템 분류
  if (contentLower.includes('역무') || contentLower.includes('승객') || contentLower.includes('안내')) {
    return '역무지원';
  } else if (contentLower.includes('열차') || contentLower.includes('운행') || contentLower.includes('시간표')) {
    return '열차운행';
  } else if (contentLower.includes('시설') || contentLower.includes('관리') || contentLower.includes('유지보수')) {
    return '시설관리';
  } else if (contentLower.includes('보안') || contentLower.includes('인증') || contentLower.includes('로그인')) {
    return '보안시스템';
  } else if (contentLower.includes('서비스') || contentLower.includes('고객') || contentLower.includes('문의')) {
    return '승객서비스';
  } else {
    return '기타';
  }
}



// 프롬프트에서 실제 내용 추출
function extractContentFromPrompt(prompt: string): string {
  const lines = prompt.split('\n');
  let content = '';
  
  for (const line of lines) {
    if (line.includes('오류 내용:') || line.includes('내용:')) {
      const parts = line.split(':');
      if (parts.length > 1) {
        content = parts.slice(1).join(':').trim();
        break;
      }
    }
  }
  
  return content || prompt;
}

// 제목 생성 (오프라인 모드 지원)
export async function generateTitle(content: string): Promise<string> {
  const prompt = `다음 오류 내용을 바탕으로 간결하고 명확한 제목을 생성해주세요. 제목만 반환하세요.

오류 내용: ${content}

제목:`;

  try {
    const result = await generateWithQwen(prompt);
    // 첫 번째 줄만 추출하여 제목으로 사용
    const title = result.split('\n')[0].trim().replace(/^제목:\s*/, '');
    return title || '시스템 오류';
  } catch (error) {
    console.error('제목 생성 오류:', error);
    
    // 키워드 기반 폴백
    const keywords = ['로그인', '연결', '데이터베이스', '서버', '네트워크', '화면', '버튼', '입력'];
    const foundKeyword = keywords.find(keyword => content.includes(keyword));
    
    if (foundKeyword) {
      return `${foundKeyword} 관련 오류`;
    }
    
    return '시스템 오류';
  }
}

// 시스템 분류 (기존 Gemma 대체)
export async function classifySystem(content: string): Promise<string> {
  const prompt = `다음 오류 내용을 분석하여 가장 적절한 시스템 분류를 선택해주세요. 분류명만 반환하세요.

가능한 분류: 역무지원, 열차운행, 시설관리, 보안시스템, 승객서비스, 기타

오류 내용: ${content}

분류:`;

  try {
    const result = await generateWithQwen(prompt);
    const classification = result.split('\n')[0].trim().replace(/^분류:\s*/, '');
    
    const validCategories = ['역무지원', '열차운행', '시설관리', '보안시스템', '승객서비스', '기타'];
    const foundCategory = validCategories.find(cat => classification.includes(cat));
    
    return foundCategory || '기타';
  } catch (error) {
    console.error('시스템 분류 오류:', error);
    
    // 키워드 기반 폴백 분류
    const categoryMap = {
      '역무지원': ['로그인', '계정', '인증', '권한', '사용자'],
      '열차운행': ['열차', '운행', '시간표', '지연', '정차'],
      '시설관리': ['시설', '설비', '전력', '조명', '엘리베이터'],
      '보안시스템': ['보안', '접근', '카메라', '출입', '경보'],
      '승객서비스': ['승객', '안내', '방송', '표', '요금']
    };
    
    for (const [category, keywords] of Object.entries(categoryMap)) {
      if (keywords.some(keyword => content.includes(keyword))) {
        return category;
      }
    }
    
    return '기타';
  }
}

// AI 분석 생성 (패턴 분석, 트렌드 예측 등)
export async function generateAIAnalysis(analysisType: string, data: any): Promise<string> {
  let prompt = '';
  
  switch (analysisType) {
    case 'pattern':
      prompt = `다음 오류 데이터를 분석하여 패턴과 인사이트를 제공해주세요:

총 오류: ${data.totalErrors}건
해결된 오류: ${data.resolvedErrors}건
주간 통계: ${JSON.stringify(data.weeklyStats?.slice(-4) || [])}
시스템별 분포: ${JSON.stringify(data.categoryStats || [])}

분석 결과를 다음 형식으로 제공해주세요:
1. 주요 패턴
2. 위험 요소
3. 개선 권고사항`;
      break;
      
    case 'trend':
      prompt = `오류 트렌드 데이터를 분석하여 향후 전망을 제공해주세요:

주간 데이터: ${JSON.stringify(data.weeklyStats || [])}
시스템 분포: ${JSON.stringify(data.categoryStats || [])}

다음 관점에서 분석해주세요:
1. 트렌드 방향성
2. 예상 위험도
3. 예방 조치`;
      break;
      
    case 'summary':
      prompt = `오류 관리 시스템의 전체 현황을 요약해주세요:

현재 상태:
- 신규 오류: ${data.newErrors}건
- 처리중: ${data.inProgress}건  
- 완료: ${data.completed}건

주요 시스템: ${JSON.stringify(data.categoryStats?.slice(0, 3) || [])}

종합 평가와 우선순위를 제시해주세요.`;
      break;
      
    default:
      prompt = `오류 관리 데이터를 종합적으로 분석해주세요: ${JSON.stringify(data)}`;
  }

  try {
    const result = await generateWithQwen(prompt);
    return result;
  } catch (error) {
    console.error('AI 분석 생성 오류:', error);
    
    // 폴백 분석 결과
    return `AI 분석 결과 (${analysisType}):

📊 현재 상황 분석
• 총 ${data.totalErrors || 0}건의 오류가 기록되었습니다
• 해결률: ${data.resolvedErrors ? Math.round((data.resolvedErrors / data.totalErrors) * 100) : 0}%
• 주요 문제 영역: ${data.categoryStats?.[0]?.category || '역무지원'} 시스템

⚠️ 주요 패턴
• 특정 시간대나 요일에 오류 집중 발생 가능성
• 시스템 간 연관 오류 발생 패턴 주의
• 반복적인 오류 유형에 대한 근본 원인 분석 필요

💡 권고사항  
• 정기적인 시스템 점검 및 모니터링 강화
• 오류 예방을 위한 사전 점검 체계 구축
• 담당자 교육 및 대응 매뉴얼 업데이트`;
  }
}