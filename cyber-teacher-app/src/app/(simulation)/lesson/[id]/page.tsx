'use client';

import { LeftPanel } from '@/components/ui/LeftPanel';
import { RightPanel } from '@/components/ui/RightPanel';
import { useEffect, useState } from 'react';
import { useSimulationStore } from '@/store/simulation-store';
import { useParams } from 'next/navigation';
import { getLessonById } from '@/data/lessons';
import { QuizModal } from '@/components/ui/QuizModal';

export default function LessonPage() {
    const params = useParams();
    const id = params.id as string;
    const { setLessonMode, loadLesson, currentLesson } = useSimulationStore();
    const [showQuiz, setShowQuiz] = useState(false);

    useEffect(() => {
        if (id) {
            setLessonMode(id);
            const lesson = getLessonById(id);
            if (lesson) {
                loadLesson(lesson);
            }
        }
    }, [id, setLessonMode, loadLesson]);

    const handleQuizComplete = (score: number) => {
        console.log('Quiz completed with score:', score);
    };

    return (
        <>
            <div className="w-64 flex-shrink-0">
                <LeftPanel />
            </div>
            <div className="flex-1" />
            <div className="w-72 flex-shrink-0">
                <RightPanel onStartQuiz={() => setShowQuiz(true)} />
            </div>

            {currentLesson?.quiz && (
                <QuizModal
                    quiz={currentLesson.quiz}
                    isOpen={showQuiz}
                    onClose={() => setShowQuiz(false)}
                    onComplete={handleQuizComplete}
                />
            )}
        </>
    );
}
