
import { Model } from './types';

const CATEGORIES: Model['category'][] = ['General', 'Coding', 'Creative', 'Scientific', 'Analytical'];
const ICONS = ['🤖', '💻', '🎨', '🔬', '📊', '⚡', '🧠', '🌌', '🛠️', '📜'];

export const MODELS: Model[] = Array.from({ length: 150 }, (_, i) => {
  const id = `maguai-${i + 1}`;
  const category = CATEGORIES[i % CATEGORIES.length];
  const icon = ICONS[i % ICONS.length];
  const suffixes = ['Alpha', 'Beta', 'Prime', 'Ultra', 'Nano', 'Quantum', 'Nexus', 'Vertex', 'Core', 'Flow'];
  const name = `Maguai ${suffixes[i % suffixes.length]} ${i + 1}`;
  
  return {
    id,
    name,
    category,
    icon,
    description: `Specialized ${category.toLowerCase()} assistant powered by advanced Maguai architecture.`
  };
});

export const SYSTEM_PROMPT = `You are a helpful and highly intelligent AI assistant. 
Depending on the user's selected Maguai model, maintain a professional and helpful persona.
You are currently powered by gemini-3-pro-preview. 
Always aim for accuracy, clarity, and depth in your responses.`;
