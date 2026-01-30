import React from 'react';

interface ImgWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
}

const ImgWithFallback: React.FC<ImgWithFallbackProps> = ({ src, fallback, alt, ...props }) => {
    const [imgSrc, setImgSrc] = React.useState(src);
    const [hasError, setHasError] = React.useState(false);

    // Reset when src changes
    React.useEffect(() => {
        setImgSrc(src);
        setHasError(false);
    }, [src]);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);

            // Use provided fallback or generate one based on the original URL
            if (fallback) {
                setImgSrc(fallback);
            } else {
                // Default fallback images
                const fallbackImages = [
                    '/images/generated/article_abstract_1.png',
                    '/images/generated/article_abstract_2.png',
                    '/images/generated/article_abstract_3.png',
                    '/images/generated/article_abstract_4.png'
                ];

                // Use a deterministic fallback based on the original src
                const srcHash = (src || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const fallbackIndex = srcHash % fallbackImages.length;

                setImgSrc(fallbackImages[fallbackIndex]);
            }
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            {...props}
        />
    );
};

export default ImgWithFallback;
