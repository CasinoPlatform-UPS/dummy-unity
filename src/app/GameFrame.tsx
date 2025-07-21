'use client';
import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const GamePage = () => {
    const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: "/Build/Build.loader.js",
        dataUrl: "/Build/Build.data.unityweb",
        frameworkUrl: "/Build/Build.framework.js.unityweb",
        codeUrl: "/Build/Build.wasm.unityweb",
    });

    const progress = Math.round(loadingProgression * 100);

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center">
            {!isLoaded && (
                <div className="absolute text-white font-bold text-lg">
                    Loading... {progress}%
                </div>
            )}
            <Unity
                unityProvider={unityProvider}
                className="w-full h-full"
                style={{ visibility: isLoaded ? "visible" : "hidden" }}
            />
        </div>
    );
};

export default GamePage;
