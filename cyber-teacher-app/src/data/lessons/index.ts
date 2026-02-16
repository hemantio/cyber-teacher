import { Lesson } from '@/types/lessons';
import { networkBootLesson } from './lesson-01-network-boot';
import { ddosAttackLesson } from './lesson-02-ddos-attack';

export const allLessons: Record<string, Lesson> = {
    'lesson-01': networkBootLesson,
    'lesson-02': ddosAttackLesson,
    // Add more lessons as they are implemented
};

// Fix for ID mismatch if lesson-01-network-boot vs lesson-01
export const getLessonById = (id: string): Lesson | undefined => {
    // Try direct match
    if (allLessons[id]) return allLessons[id];

    // Try prefix match (e.g., 'lesson-01' matches 'lesson-01-network-boot')
    const found = Object.values(allLessons).find(l => l.id === id || l.id.startsWith(id));
    return found;
};
