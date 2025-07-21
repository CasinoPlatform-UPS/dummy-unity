'use client';
import React, { useEffect, useMemo } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useOrientation } from '@/context/orientation';

const GamePage = () => {

    const orientation = useOrientation();
    // const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
    //     loaderUrl: "/Build/Build.loader.js",
    //     dataUrl: "/Build/Build.data.unityweb",
    //     frameworkUrl: "/Build/Build.framework.js.unityweb",
    //     codeUrl: "/Build/Build.wasm.unityweb",
    // });

    const devicePixelRatio = useMemo(() => {
        if (typeof window === 'undefined') return 1;
        const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
        const isHighEnd = deviceMemory ? deviceMemory >= 4 : true;
        return Math.min(window.devicePixelRatio, isHighEnd ? 2 : 1);
    }, []);

    const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
        loaderUrl: "/build2/Build.loader.js",
        dataUrl: "/build2/Build.data.unityweb",
        frameworkUrl: "/build2/Build.framework.js.unityweb",
        codeUrl: "/build2/Build.wasm.unityweb",
    });

    const progress = Math.round(loadingProgression * 100);

    useEffect(() => {

        console.log("orientation is : ", orientation);
        sendMessage('CanVasSwitcher', 'OrentationChanged', 'landscape');

    }, [orientation])


    return (
        // <div className="bg-black w-screen h-screen overflow-hidden relative">
        //     {!isLoaded && (
        //         <div className="absolute text-white font-bold text-lg">
        //             Loading... {progress}%
        //         </div>
        //     )}
        //     <div className='landscape:h-screen landscape:w-screen   portrait:h-[100vw] portrait:w-[100vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90! bg-green-500'>
        //         <Unity
        //             devicePixelRatio={devicePixelRatio}
        //             unityProvider={unityProvider}
        //             className="h-full w-full"
        //             style={{
        //                 visibility: isLoaded ? "visible" : "hidden",
        //                 // transform: orientation === "portrait" ? "rotate(90deg)" : "rotate(0deg)",
        //                 // transformOrigin: "center center",
        //                 // width: orientation === "portrait" ? "100vh" : "100%",
        //                 // height: orientation === "portrait" ? "100vw" : "100%",
        //                 // top: orientation === "portrait" ? "calc(50% - 50vw)" : "0",
        //                 // left: orientation === "portrait" ? "calc(50% - 50vh)" : "0",

        //             }}
        //         />
        //     </div>
        // </div>

        <div className='h-full w-full portrait:h-screen portrait:w-screen overflow-hidden relative'>
            {!isLoaded && (
                <div className="absolute text-white font-bold text-lg">
                    Loading... {progress}%
                </div>
            )}
            <div className='landscape:h-screen landscape:w-screen w-full h-full portrait:w-[100vh] portrait:h-[100vw] portrait:absolute portrait:top-1/2 portrait:left-1/2 portrait:-translate-x-1/2 portrait:-translate-y-1/2 portrait:rotate-90!'>
                <Unity
                    devicePixelRatio={devicePixelRatio}
                    unityProvider={unityProvider}
                    className="h-full w-full"
                    style={{
                        visibility: isLoaded ? "visible" : "hidden",
                        // transform: orientation === "portrait" ? "rotate(90deg)" : "rotate(0deg)",
                        // transformOrigin: "center center",
                        // width: orientation === "portrait" ? "100vh" : "100%",
                        // height: orientation === "portrait" ? "100vw" : "100%",
                        // top: orientation === "portrait" ? "calc(50% - 50vw)" : "0",
                        // left: orientation === "portrait" ? "calc(50% - 50vh)" : "0",

                    }}
                />
            </div>
        </div>

    );
};

export default GamePage;
