'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Orientation = 'portrait' | 'landscape';

const OrientationContext = createContext<Orientation>('landscape');

export const useOrientation = () => useContext(OrientationContext);

export const OrientationProvider = ({ children }: { children: ReactNode }) => {
    const getOrientation = () =>
        window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';

    const [orientation, setOrientation] = useState<Orientation>(
        typeof window !== 'undefined' ? getOrientation() : 'landscape'
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(orientation: portrait)');

        const handleChange = () => {
            setOrientation(mediaQuery.matches ? 'portrait' : 'landscape');
        };

        mediaQuery.addEventListener('change', handleChange);
        handleChange(); // in case it changes on mount

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <OrientationContext.Provider value={orientation}>
            {children}
        </OrientationContext.Provider>
    );
};
