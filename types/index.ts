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
  status: 'idle' | 'generating_story' | 'protagonist_selection' | 'generating_scenes' | 'completed' | 'error';
  message: string;
  protagonistImages?: ProtagonistImage[];
  sceneImages?: string[];
  progress?: number;
  error?: string;
}
