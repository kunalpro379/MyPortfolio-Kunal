import { useState, useEffect } from 'react';

const AdvancedTechCircuit = () => {
    const [animate, setAnimate] = useState(false);
    const [activeNodes, setActiveNodes] = useState({});

    useEffect(() => {
        setAnimate(true);

        // Initialize random node activation
        const initialNodes = {};
        for (let i = 1; i <= 8; i++) {
            initialNodes[`node${i}`] = Math.random() > 0.5;
        }
        setActiveNodes(initialNodes);

        // Periodically change active nodes
        const interval = setInterval(() => {
            setActiveNodes(prev => {
                const newState = { ...prev };
                const randomNode = `node${Math.floor(Math.random() * 8) + 1}`;
                newState[randomNode] = !newState[randomNode];
                return newState;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-gray-900">
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {/* Gradients */}
                    <linearGradient id="techGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                    </linearGradient>

                    <linearGradient id="nodeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                    </linearGradient>
                </defs>

                {/* Grid pattern */}
                <g opacity="0.07">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <line
                            key={`h-${i}`}
                            x1="0"
                            y1={i * 25}
                            x2="1000"
                            y2={i * 25}
                            stroke="#60a5fa"
                            strokeWidth="0.5"
                        />
                    ))}
                    {Array.from({ length: 40 }).map((_, i) => (
                        <line
                            key={`v-${i}`}
                            x1={i * 25}
                            y1="0"
                            x2={i * 25}
                            y2="1000"
                            stroke="#60a5fa"
                            strokeWidth="0.5"
                        />
                    ))}
                </g>

                {/* Main circuit elements */}
                <g opacity="0.8">
                    {/* Central hub */}
                    <circle cx="500" cy="500" r="100" stroke="url(#techGlow)" strokeWidth="1.5" fill="none" />
                    <circle cx="500" cy="500" r="50" stroke="url(#techGlow)" strokeWidth="1" fill="none" strokeDasharray="5,3" />
                    <circle cx="500" cy="500" r="15" fill="#60a5fa" opacity="0.7" />

                    {/* Circuit paths */}
                    <path d="M500,400 L500,300 M500,600 L500,700 M400,500 L300,500 M600,500 L700,500
                           M429,429 L358,358 M571,429 L642,358 M429,571 L358,642 M571,571 L642,642"
                        stroke="url(#techGlow)" strokeWidth="1.5" fill="none" />

                    {/* Connection nodes */}
                    <circle cx="500" cy="300" r="5" fill="url(#nodeGlow)" />
                    <circle cx="500" cy="700" r="5" fill="url(#nodeGlow)" />
                    <circle cx="300" cy="500" r="5" fill="url(#nodeGlow)" />
                    <circle cx="700" cy="500" r="5" fill="url(#nodeGlow)" />
                    <circle cx="358" cy="358" r="5" fill="url(#nodeGlow)" />
                    <circle cx="642" cy="358" r="5" fill="url(#nodeGlow)" />
                    <circle cx="358" cy="642" r="5" fill="url(#nodeGlow)" />
                    <circle cx="642" cy="642" r="5" fill="url(#nodeGlow)" />

                    {/* Additional circuit paths */}
                    <path d="M300,500 L250,500 L250,300 L400,300 M700,500 L750,500 L750,700 L600,700
                           M358,358 L300,300 M642,358 L700,300 M358,642 L300,700 M642,642 L700,700"
                        stroke="url(#techGlow)" strokeWidth="1" fill="none" opacity="0.7" />
                </g>

                {/* Data flow animations */}
                <g>
                    {activeNodes.node1 && (
                        <circle cx="500" cy="500" r="3" fill="#60a5fa">
                            <animate attributeName="cx" from="500" to="700" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="cy" from="500" to="500" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="1" to="0.3" dur="3s" repeatCount="indefinite" />
                        </circle>
                    )}

                    {activeNodes.node2 && (
                        <circle cx="500" cy="500" r="3" fill="#60a5fa">
                            <animate attributeName="cx" from="500" to="300" dur="2.5s" repeatCount="indefinite" />
                            <animate attributeName="cy" from="500" to="500" dur="2.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="1" to="0.3" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                    )}

                    {activeNodes.node3 && (
                        <circle cx="500" cy="500" r="3" fill="#10b981">
                            <animate attributeName="cx" from="500" to="500" dur="3.2s" repeatCount="indefinite" />
                            <animate attributeName="cy" from="500" to="300" dur="3.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="1" to="0.3" dur="3.2s" repeatCount="indefinite" />
                        </circle>
                    )}

                    {activeNodes.node4 && (
                        <circle cx="500" cy="500" r="3" fill="#10b981">
                            <animate attributeName="cx" from="500" to="500" dur="3.8s" repeatCount="indefinite" />
                            <animate attributeName="cy" from="500" to="700" dur="3.8s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="1" to="0.3" dur="3.8s" repeatCount="indefinite" />
                        </circle>
                    )}

                    {activeNodes.node5 && (
                        <circle cx="500" cy="500" r="3" fill="#6366f1">
                            <animate attributeName="cx" from="500" to="642" dur="3.4s" repeatCount="indefinite" />
                            <animate attributeName="cy" from="500" to="642" dur="3.4s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="1" to="0.3" dur="3.4s" repeatCount="indefinite" />
                        </circle>
                    )}

                    {activeNodes.node6 && (
                        <circle cx="500" cy="500" r="3" fill="#6366f1">
                            <animate attributeName="cx" from="500" to="358" dur="2.8s" repeatCount="indefinite" />
                            <animate attributeName="cy" from="500" to="358" dur="2.8s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="1" to="0.3" dur="2.8s" repeatCount="indefinite" />
                        </circle>
                    )}
                </g>

                {/* Background orbiting particles */}
                <g opacity="0.6">
                    <circle cx="0" cy="0" r="2" fill="#60a5fa">
                        <animateMotion
                            path="M0,0 m-200,0 a200,200 0 1,0 400,0 a200,200 0 1,0 -400,0"
                            dur="20s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="0" cy="0" r="2" fill="#10b981">
                        <animateMotion
                            path="M0,0 m-200,0 a200,200 0 1,0 400,0 a200,200 0 1,0 -400,0"
                            dur="25s"
                            repeatCount="indefinite"
                            begin="5s"
                        />
                    </circle>
                    <circle cx="0" cy="0" r="2" fill="#6366f1">
                        <animateMotion
                            path="M0,0 m-200,0 a200,200 0 1,0 400,0 a200,200 0 1,0 -400,0"
                            dur="15s"
                            repeatCount="indefinite"
                            begin="10s"
                        />
                    </circle>
                </g>
            </svg>
        </div>
    );
};

export default AdvancedTechCircuit;