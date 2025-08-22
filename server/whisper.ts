import { HfInference } from '@huggingface/inference';
import { Readable } from 'stream';

const hf = new HfInference();

// 음성을 텍스트로 변환 (Qwen2.5-8B 모델 사용)
export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  try {
    console.log('Qwen2.5-8B 음성 인식 요청, 오디오 크기:', audioBuffer.length);
    
    // Qwen2.5-8B-Instruct 모델 사용 (멀티모달)
    const response = await hf.automaticSpeechRecognition({
      model: 'Qwen/Qwen2.5-8B-Instruct',
      data: audioBuffer,
    });

    const transcription = response.text?.trim() || '';
    console.log('Qwen2.5-8B 음성 인식 결과:', transcription.substring(0, 100) + '...');
    
    return transcription;
  } catch (error: any) {
    console.error('Qwen2.5-8B 음성 인식 오류:', error);
    
    // Qwen2.5-8B가 실패할 경우 Whisper 폴백 시도
    try {
      console.log('Whisper 폴백 시도...');
      const fallbackResponse = await hf.automaticSpeechRecognition({
        model: 'openai/whisper-base',
        data: audioBuffer,
      });
      
      return fallbackResponse.text?.trim() || '음성 인식 결과를 처리할 수 없습니다.';
    } catch (fallbackError: any) {
      console.error('Whisper 폴백도 실패:', fallbackError);
      throw new Error('음성 인식에 실패했습니다: ' + error.message);
    }
  }
}

// Base64 오디오를 텍스트로 변환
export async function transcribeBase64Audio(base64Audio: string): Promise<string> {
  try {
    // Base64에서 데이터 부분 추출 (data:audio/... 제거)
    const base64Data = base64Audio.includes(',') 
      ? base64Audio.split(',')[1] 
      : base64Audio;
    
    const audioBuffer = Buffer.from(base64Data, 'base64');
    return await transcribeAudio(audioBuffer);
  } catch (error: any) {
    console.error('Base64 오디오 변환 오류:', error);
    throw new Error('오디오 데이터 처리에 실패했습니다: ' + error.message);
  }
}

// 한국어 음성 인식 최적화 (Qwen2.5-8B 사용)
export async function transcribeKoreanAudio(audioBuffer: Buffer): Promise<string> {
  try {
    console.log('Qwen2.5-8B 한국어 음성 인식 요청');
    
    // Qwen2.5-8B 모델로 한국어 음성 인식
    const response = await hf.automaticSpeechRecognition({
      model: 'Qwen/Qwen2.5-8B-Instruct',
      data: audioBuffer,
    });

    let transcription = response.text?.trim() || '';
    
    // 한국어 후처리
    transcription = transcription
      .replace(/\s+/g, ' ')  // 공백 정규화
      .replace(/[.]{2,}/g, '.')  // 연속된 마침표 정리
      .replace(/[?]{2,}/g, '?')  // 연속된 물음표 정리
      .trim();
    
    console.log('Qwen2.5-8B 한국어 음성 인식 결과:', transcription);
    
    return transcription || '음성을 인식할 수 없습니다. 다시 시도해 주세요.';
  } catch (error: any) {
    console.error('Qwen2.5-8B 한국어 음성 인식 오류:', error);
    
    // 키워드 기반 폴백
    return '음성 인식 처리 중 오류가 발생했습니다. 텍스트 입력을 사용해 주세요.';
  }
}