export interface ScenePrompt {
  scene_number: number;
  timestamp: string;
  description: string;
  camera_angle: string;
  lighting: string;
  prompt: string;
}

export interface LLMResponse {
  protagonist_prompt: string;
  scene_prompts: ScenePrompt[];
}

export interface ProtagonistImage {
  id: string;
  url: string;
}

export interface GenerationState {
  status: 'idle' | 'generating_story' | 'storyboard_review' | 'protagonist_selection' | 'generating_scenes' | 'completed' | 'error';
  message: string;
  storyboard?: LLMResponse;
  protagonistImages?: ProtagonistImage[];
  sceneImages?: string[];
  progress?: number;
  totalScenes?: number;
  error?: string;
}
