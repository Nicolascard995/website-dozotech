
import React from 'react';

interface LogoProps {
    className?: string; // Additional classes for sizing (w-8 h-8 etc)
}

export default function Logo({ className = "w-10 h-10" }: LogoProps) {
    // The user provided SVG has a viewBox of 0 0 1500 1500 but the content is centered around 400-1100.
    // To ensure the logo does not look small ("no quiero que parezca pequeño"), we use a tighter viewBox.
    // Content bounds approx: x=401 to 1078, y=403 to 1078. ~677x675 size.
    // Using viewBox="400 400 680 680" to zoom in heavily on the actual content.

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="400 400 680 680"
            className={className}
            fill="none"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <clipPath id="badf586072">
                    <path d="M 401.535156 403.984375 L 1076.535156 403.984375 L 1076.535156 1078.980469 L 401.535156 1078.980469 Z M 401.535156 403.984375 " clipRule="nonzero" />
                </clipPath>
                <clipPath id="01da054f2a">
                    <path d="M 0.535156 0.984375 L 675.535156 0.984375 L 675.535156 675.980469 L 0.535156 675.980469 Z M 0.535156 0.984375 " clipRule="nonzero" />
                </clipPath>
                <clipPath id="029a57dba9">
                    <rect x="0" width="676" y="0" height="676" />
                </clipPath>
                <clipPath id="b85a6b7ac5">
                    <path d="M 438.179688 449.355469 L 1039.679688 449.355469 L 1039.679688 1050.855469 L 438.179688 1050.855469 Z M 438.179688 449.355469 " clipRule="nonzero" />
                </clipPath>
                <clipPath id="f9b9b23ddf">
                    <path d="M 0.390625 0.355469 L 601.679688 0.355469 L 601.679688 601.644531 L 0.390625 601.644531 Z M 0.390625 0.355469 " clipRule="nonzero" />
                </clipPath>
                <clipPath id="67a8875ffc">
                    <rect x="0" width="602" y="0" height="602" />
                </clipPath>
                <clipPath id="4d12462189">
                    <path d="M 825.210938 449.320312 L 1039.710938 449.320312 L 1039.710938 663.820312 L 825.210938 663.820312 Z M 825.210938 449.320312 " clipRule="nonzero" />
                </clipPath>
            </defs>
            <g clipPath="url(#badf586072)">
                <g transform="matrix(1, 0, 0, 1, 401, 403)">
                    <g clipPath="url(#029a57dba9)">
                        <g clipPath="url(#01da054f2a)">
                            <path fill="var(--color-obsidian)" d="M 0.535156 0.984375 L 675.535156 0.984375 L 675.535156 675.980469 L 0.535156 675.980469 Z M 0.535156 0.984375 " fillOpacity="1" fillRule="nonzero" />
                        </g>
                    </g>
                </g>
            </g>
            <g clipPath="url(#b85a6b7ac5)">
                <g transform="matrix(1, 0, 0, 1, 438, 449)">
                    <g clipPath="url(#67a8875ffc)">
                        <g clipPath="url(#f9b9b23ddf)">
                            <path fill="var(--color-acid-lime)" d="M 601.890625 601.855469 C 601.890625 269.539062 332.496094 0.144531 0.183594 0.144531 L 0.183594 601.855469 Z M 601.890625 601.855469 " fillOpacity="1" fillRule="nonzero" />
                        </g>
                    </g>
                </g>
            </g>
            <g clipPath="url(#4d12462189)">
                <path fill="var(--color-acid-lime)" d="M 825.210938 449.144531 C 825.210938 567.703125 921.324219 663.816406 1039.886719 663.820312 L 1039.886719 449.144531 Z M 825.210938 449.144531 " fillOpacity="1" fillRule="nonzero" />
            </g>
        </svg>
    );
}
