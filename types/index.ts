export interface ScenePrompt {
  scene_number: number;
  timestamp: string;
  description: string;
  camera_angle: string;
  lighting: string;
  prompt: string;
}

export interface LLMResponse {
  mood_analysis?: string;
  protagonist_prompt: string;
  protagonist_variations?: string[]; // 4 different mood variations for protagonist
  scene_prompts: ScenePrompt[];
}

export interface ProtagonistImage {
  id: string;
  url: string;
}

export interface SceneImage {
  url: string;
  prompt: string;
  description: string;
  scene_number: number;
}

export interface GenerationState {
  status: 'idle' | 'generating_story' | 'storyboard_review' | 'protagonist_selection' | 'generating_scenes' | 'completed' | 'error';
  message: string;
  storyboard?: LLMResponse;
  protagonistImages?: ProtagonistImage[];
  sceneImages?: string[];
  sceneImagesWithPrompts?: SceneImage[];
  progress?: number;
  totalScenes?: number;
  error?: string;
  cancelGeneration?: boolean;
}
