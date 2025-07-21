'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const GamePage = () => {
    const unityContainerRef = useRef<HTMLDivElement>(null);
    const gameWrapperRef = useRef<HTMLDivElement>(null);

    const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
        loaderUrl: "/build4/Build.loader.js",
        dataUrl: "/build4/Build.data.unityweb",
        frameworkUrl: "/build4/Build.framework.js.unityweb",
        codeUrl: "/build4/Build.wasm.unityweb",
    });

    useEffect(() => {
        const handleOrientationChange = () => {
            const isPortrait = window.innerHeight > window.innerWidth;
            const container = unityContainerRef.current;
            const wrapper = gameWrapperRef.current;

            if (!container || !wrapper) return;

            if (isPortrait) {
                // Portrait mode adjustments
                wrapper.style.width = `${window.innerHeight}px`;
                wrapper.style.height = `${window.innerWidth}px`;
                wrapper.style.transform = 'rotate(90deg) translateY(-100%)';
                wrapper.style.transformOrigin = 'top left';
                wrapper.style.position = 'absolute';
                wrapper.style.top = '0';
                wrapper.style.left = '0';

                // Set canvas dimensions
                container.style.width = `${window.innerHeight}px`;
                container.style.height = `${window.innerWidth}px`;

                // Notify Unity
                sendMessage('CanvasSwitcher', 'OnOrientationChanged', 'potrait');
            } else {
                // Landscape mode
                wrapper.style.width = '100%';
                wrapper.style.height = '100%';
                wrapper.style.transform = 'none';

                container.style.width = '100%';
                container.style.height = '100%';

                sendMessage('CanvasSwitcher', 'OnOrientationChanged', 'potrait');
            }
        };

        // Initial setup
        handleOrientationChange();

        // Add event listeners
        window.addEventListener('resize', handleOrientationChange);
        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleOrientationChange);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, [sendMessage]);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
            {!isLoaded && (
                <div className="absolute text-white font-bold text-lg">
                    Loading... {Math.round(loadingProgression * 100)}%
                </div>
            )}

            <div
                ref={gameWrapperRef}
                className="absolute top-0 left-0"
            >
                <div ref={unityContainerRef} className="w-full h-full">
                    <Unity
                        unityProvider={unityProvider}
                        className="w-full h-full"
                        style={{
                            visibility: isLoaded ? "visible" : "hidden",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default GamePage;