'use client';
import React, { useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useOrientation } from '@/context/orientation';

const GamePage = () => {

    const orientation = useOrientation();
    const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
        loaderUrl: "/Build/Build.loader.js",
        dataUrl: "/Build/Build.data.unityweb",
        frameworkUrl: "/Build/Build.framework.js.unityweb",
        codeUrl: "/Build/Build.wasm.unityweb",
    });

    const progress = Math.round(loadingProgression * 100);

    useEffect(() => {

        console.log("orientation is : ", orientation);
        sendMessage('DeviceManager', 'SetOrientation', orientation);

    }, [orientation])


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
