'use client';

import { useState, useEffect } from 'react';
import { geminiService } from '@/lib/gemini-service';
import { soundManager, SoundCategory, SoundSettings } from '@/lib/sound-engine';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
    const [apiKey, setApiKey] = useState('');
    const [hasApiKey, setHasApiKey] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);
    const [soundSettings, setSoundSettings] = useState<SoundSettings | null>(null);
    const [activeTab, setActiveTab] = useState<'ai' | 'sound' | 'about'>('ai');
    const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

    // Load initial settings
    useEffect(() => {
        setHasApiKey(geminiService.hasApiKey());
        setSoundSettings(soundManager.getSettings());
    }, [isOpen]);

    const handleSaveApiKey = () => {
        if (apiKey.trim()) {
            geminiService.setApiKey(apiKey.trim());
            setHasApiKey(true);
            setApiKey('');
            setTestStatus('idle');
        }
    };

    const handleClearApiKey = () => {
        geminiService.clearApiKey();
        setHasApiKey(false);
        setTestStatus('idle');
    };

    const handleTestApiKey = async () => {
        setTestStatus('testing');
        try {
            const response = await geminiService.answerQuestion('Hello, can you confirm you are working?');
            if (response && response.length > 0) {
                setTestStatus('success');
            } else {
                setTestStatus('error');
            }
        } catch {
            setTestStatus('error');
        }
    };

    const handleVolumeChange = (category: SoundCategory, volume: number) => {
        soundManager.setVolume(category, volume);
        setSoundSettings(soundManager.getSettings());
    };

    const handleToggleSound = (category: SoundCategory) => {
        if (!soundSettings) return;
        const enabled = !soundSettings[category].enabled;
        soundManager.setEnabled(category, enabled);
        setSoundSettings(soundManager.getSettings());
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className="relative w-full max-w-lg max-h-[80vh] mx-4 rounded-2xl overflow-hidden flex flex-col"
                style={{
                    background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(34, 211, 238, 0.1)'
                }}
            >
                {/* Header */}
                <div
                    className="px-6 py-4 border-b flex items-center justify-between"
                    style={{ borderColor: 'rgba(34, 211, 238, 0.2)' }}
                >
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        ⚙️ Settings
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-700"
                        style={{ color: '#64748B' }}
                    >
                        ✕
                    </button>
                </div>

                {/* Tabs */}
                <div
                    className="px-6 py-2 border-b flex gap-2"
                    style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}
                >
                    {[
                        { id: 'ai' as const, label: '🤖 AI', icon: '🤖' },
                        { id: 'sound' as const, label: '🔊 Sound', icon: '🔊' },
                        { id: 'about' as const, label: 'ℹ️ About', icon: 'ℹ️' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'text-cyan-400'
                                : 'text-slate-400 hover:text-white'
                                }`}
                            style={activeTab === tab.id ? {
                                background: 'rgba(34, 211, 238, 0.1)',
                            } : {}}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* AI Tab */}
                    {activeTab === 'ai' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-white mb-2">Gemini API Key</h3>
                                <p className="text-xs text-slate-400 mb-4">
                                    Connect your Google Gemini API key for AI-powered explanations and coaching.
                                    Get your free API key at{' '}
                                    <a
                                        href="https://aistudio.google.com/apikey"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cyan-400 hover:underline"
                                    >
                                        Google AI Studio
                                    </a>
                                </p>

                                {hasApiKey ? (
                                    <div className="space-y-3">
                                        <div
                                            className="flex items-center gap-2 px-4 py-3 rounded-lg"
                                            style={{
                                                background: 'rgba(34, 197, 94, 0.1)',
                                                border: '1px solid rgba(34, 197, 94, 0.3)'
                                            }}
                                        >
                                            <span className="text-green-400">✓</span>
                                            <span className="text-sm text-green-400">API Key configured</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleTestApiKey}
                                                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                                style={{
                                                    background: 'rgba(59, 130, 246, 0.2)',
                                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                                    color: '#60A5FA'
                                                }}
                                            >
                                                {testStatus === 'testing' ? '⏳ Testing...' :
                                                    testStatus === 'success' ? '✓ Working!' :
                                                        testStatus === 'error' ? '✗ Failed' :
                                                            '🧪 Test Connection'}
                                            </button>
                                            <button
                                                onClick={handleClearApiKey}
                                                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                                style={{
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                                    color: '#EF4444'
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <input
                                                type={showApiKey ? 'text' : 'password'}
                                                value={apiKey}
                                                onChange={(e) => setApiKey(e.target.value)}
                                                placeholder="Enter your Gemini API key..."
                                                className="w-full px-4 py-3 pr-10 rounded-lg text-sm outline-none"
                                                style={{
                                                    background: '#0F172A',
                                                    border: '1px solid rgba(71, 85, 105, 0.5)',
                                                    color: '#E2E8F0'
                                                }}
                                            />
                                            <button
                                                onClick={() => setShowApiKey(!showApiKey)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                            >
                                                {showApiKey ? '👁️' : '👁️‍🗨️'}
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleSaveApiKey}
                                            disabled={!apiKey.trim()}
                                            className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                                            style={{
                                                background: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
                                                color: '#0F172A'
                                            }}
                                        >
                                            Save API Key
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div
                                className="p-4 rounded-lg"
                                style={{
                                    background: 'rgba(34, 211, 238, 0.05)',
                                    border: '1px solid rgba(34, 211, 238, 0.1)'
                                }}
                            >
                                <p className="text-xs text-slate-400">
                                    💡 <strong className="text-slate-300">Tip:</strong> Even without an API key,
                                    the app provides built-in explanations for all cybersecurity concepts.
                                    The AI enhances the experience with personalized responses.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Sound Tab */}
                    {activeTab === 'sound' && soundSettings && (
                        <div className="space-y-6">
                            {([
                                { category: 'sfx' as SoundCategory, label: 'Sound Effects', icon: '🔔' },
                                { category: 'music' as SoundCategory, label: 'Background Music', icon: '🎵' },
                                { category: 'ambience' as SoundCategory, label: 'Ambience', icon: '🌊' },
                                { category: 'voice' as SoundCategory, label: 'Voice/Narration', icon: '🎙️' },
                            ]).map(({ category, label, icon }) => (
                                <div key={category} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-white flex items-center gap-2">
                                            <span>{icon}</span>
                                            {label}
                                        </label>
                                        <button
                                            onClick={() => handleToggleSound(category)}
                                            className={`w-10 h-6 rounded-full transition-all ${soundSettings[category].enabled ? 'bg-cyan-500' : 'bg-slate-600'
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full bg-white transition-transform ${soundSettings[category].enabled ? 'translate-x-5' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={soundSettings[category].volume * 100}
                                            onChange={(e) => handleVolumeChange(category, Number(e.target.value) / 100)}
                                            disabled={!soundSettings[category].enabled}
                                            className="flex-1 h-2 rounded-full appearance-none cursor-pointer disabled:opacity-30"
                                            style={{
                                                background: `linear-gradient(to right, #22D3EE ${soundSettings[category].volume * 100}%, #334155 ${soundSettings[category].volume * 100}%)`
                                            }}
                                        />
                                        <span className="text-xs text-slate-400 w-10 text-right">
                                            {Math.round(soundSettings[category].volume * 100)}%
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <div
                                className="p-4 rounded-lg"
                                style={{
                                    background: 'rgba(34, 211, 238, 0.05)',
                                    border: '1px solid rgba(34, 211, 238, 0.1)'
                                }}
                            >
                                <p className="text-xs text-slate-400">
                                    🔊 <strong className="text-slate-300">Note:</strong> Sound uses synthesized tones
                                    that work without external audio files. Click anywhere to enable audio.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* About Tab */}
                    {activeTab === 'about' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    style={{
                                        background: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 50%, #8B5CF6 100%)',
                                        boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)'
                                    }}
                                >
                                    <span className="text-2xl">🛡️</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">CyberGuard</h3>
                                <p className="text-sm text-slate-400">Interactive Cybersecurity Education</p>
                                <p className="text-xs text-slate-500 mt-1">Version 0.1.0</p>
                            </div>

                            <div className="space-y-3">
                                <div
                                    className="p-3 rounded-lg flex items-center justify-between"
                                    style={{ background: 'rgba(30, 41, 59, 0.5)' }}
                                >
                                    <span className="text-sm text-slate-300">📚 Lessons</span>
                                    <span className="text-sm font-bold text-cyan-400">7</span>
                                </div>
                                <div
                                    className="p-3 rounded-lg flex items-center justify-between"
                                    style={{ background: 'rgba(30, 41, 59, 0.5)' }}
                                >
                                    <span className="text-sm text-slate-300">⚔️ Attack Types</span>
                                    <span className="text-sm font-bold text-red-400">8</span>
                                </div>
                                <div
                                    className="p-3 rounded-lg flex items-center justify-between"
                                    style={{ background: 'rgba(30, 41, 59, 0.5)' }}
                                >
                                    <span className="text-sm text-slate-300">🛡️ Defense Tools</span>
                                    <span className="text-sm font-bold text-green-400">6</span>
                                </div>
                            </div>

                            <div className="text-center pt-4">
                                <p className="text-xs text-slate-500">
                                    Created by <span className="text-cyan-400">Hemant</span> • 2024
                                </p>
                                <p className="text-xs text-slate-600 mt-1">
                                    Built with Next.js, React, TypeScript, and Canvas 2D
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="px-6 py-4 border-t flex justify-end"
                    style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}
                >
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                            background: 'rgba(71, 85, 105, 0.3)',
                            color: '#94A3B8'
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
