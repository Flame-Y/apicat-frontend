import localFont from 'next/font/local';

export const novecento = localFont({
    src: [
        {
            path: '../fonts/Novecento-Wide-Medium-2.otf',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../fonts/Novecento-Wide-Bold-2.otf',
            weight: '700',
            style: 'bold'
        }
    ],
    variable: '--font-novecento'
});
