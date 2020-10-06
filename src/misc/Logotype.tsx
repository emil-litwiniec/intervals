import React from 'react';
import './_logotype.scss';

type Props = {
    color?: string;
    className?: string;
};

const Logotype: React.FC<Props> = ({ color = '#f3f3f3', className = '' }) => {
    return (
        <svg
            className={'logotype ' + className}
            viewBox="0 0 155 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0.072 2.376C0.024 2.304 5.58794e-09 2.208 5.58794e-09 2.088C5.58794e-09 1.944 0.012 1.824 0.036 1.728L0.072 1.584C0.072 1.32 0.24 1.188 0.576 1.188L10.044 1.116C10.428 1.116 10.62 1.296 10.62 1.656V1.944C10.62 2.184 10.224 2.724 9.432 3.564C8.664 4.38 8.28 5.076 8.28 5.652V21.06C8.28 21.66 8.664 22.368 9.432 23.184C10.224 24 10.62 24.516 10.62 24.732V25.056C10.62 25.176 10.56 25.296 10.44 25.416C10.32 25.512 10.188 25.56 10.044 25.56H0.576C0.456 25.56 0.336 25.512 0.216 25.416C0.12 25.32 0.072 25.212 0.072 25.092C-0.024 24.756 -0.024 24.492 0.072 24.3C0.096 24.228 0.492 23.796 1.26 23.004C2.028 22.188 2.412 21.516 2.412 20.988V5.76C2.412 5.208 2.028 4.536 1.26 3.744C0.516 2.952 0.12 2.496 0.072 2.376Z"
                fill={color}
            />
            <path
                d="M12.699 12.78C12.483 12.588 12.375 12.36 12.375 12.096C12.375 11.808 12.483 11.556 12.699 11.34C13.083 10.908 14.043 10.44 15.579 9.936C17.139 9.408 18.243 9.12 18.891 9.072C19.299 9.048 19.635 9.312 19.899 9.864C20.163 10.392 20.367 11.064 20.511 11.88C20.943 10.8 21.615 9.996 22.527 9.468C23.463 8.916 24.519 8.64 25.695 8.64C27.159 8.64 28.455 9.12 29.583 10.08C30.735 11.016 31.503 12.492 31.887 14.508C32.223 16.5 32.667 18.816 33.219 21.456C33.387 21.936 33.759 22.536 34.335 23.256C34.911 23.952 35.199 24.444 35.199 24.732V25.056C35.199 25.176 35.139 25.296 35.019 25.416C34.923 25.512 34.803 25.56 34.659 25.56H25.407C25.023 25.56 24.831 25.404 24.831 25.092C24.783 24.756 24.795 24.492 24.867 24.3C24.891 24.228 25.263 23.796 25.983 23.004C26.703 22.188 27.051 21.516 27.027 20.988C27.027 20.148 26.691 17.88 26.019 14.184C25.851 13.248 25.575 12.516 25.191 11.988C24.807 11.46 24.243 11.208 23.499 11.232C22.899 11.232 22.383 11.436 21.951 11.844C21.543 12.252 21.267 12.768 21.123 13.392C20.979 14.016 20.871 14.568 20.799 15.048C20.751 15.504 20.739 15.924 20.763 16.308H20.727V21.06C20.727 21.66 21.099 22.368 21.843 23.184C22.611 24 22.995 24.516 22.995 24.732V25.056C22.995 25.392 22.815 25.56 22.455 25.56H13.059C12.675 25.56 12.483 25.404 12.483 25.092C12.411 24.756 12.435 24.492 12.555 24.3C12.603 24.132 12.831 23.868 13.239 23.508C13.647 23.124 14.007 22.716 14.319 22.284C14.655 21.828 14.811 21.396 14.787 20.988V15.408C14.787 14.76 14.667 14.268 14.427 13.932C14.187 13.596 13.851 13.344 13.419 13.176C13.011 12.984 12.771 12.852 12.699 12.78Z"
                fill={color}
            />
            <path
                d="M36.3406 10.728C35.9806 10.728 35.8006 10.56 35.8006 10.224V9.684C35.8006 9.348 35.9806 9.18 36.3406 9.18C37.1566 9.18 37.8766 8.988 38.5006 8.604C39.1246 8.196 39.6046 7.704 39.9406 7.128C40.3006 6.552 40.6246 5.976 40.9126 5.4C41.2006 4.8 41.5126 4.296 41.8486 3.888C42.2086 3.48 42.5926 3.264 43.0006 3.24H43.0726C43.7686 3.24 44.1166 3.948 44.1166 5.364C44.1166 5.46 44.1046 5.952 44.0806 6.84C44.0806 7.704 44.0806 8.484 44.0806 9.18H47.1046C47.4166 9.18 47.5726 9.348 47.5726 9.684V10.224C47.5726 10.56 47.4166 10.728 47.1046 10.728H44.0086C44.0086 11.856 43.9966 13.38 43.9726 15.3C43.9486 17.22 43.9366 18.36 43.9366 18.72C43.9366 20.328 44.3566 21.132 45.1966 21.132C45.5806 21.132 46.1566 20.952 46.9246 20.592C46.9726 20.568 47.0446 20.556 47.1406 20.556C47.3326 20.556 47.4886 20.652 47.6086 20.844C47.7526 21.036 47.7886 21.228 47.7166 21.42C47.5006 22.452 46.9246 23.4 45.9886 24.264C45.0766 25.128 43.9606 25.56 42.6406 25.56C41.4406 25.56 40.3486 25.14 39.3646 24.3C38.4046 23.46 37.9246 22.38 37.9246 21.06C37.9246 20.436 37.9126 18.792 37.8886 16.128C37.8646 13.464 37.8526 11.664 37.8526 10.728H36.3406Z"
                fill={color}
            />
            <path
                d="M66.0181 19.296C66.0421 19.728 65.9821 20.208 65.8381 20.736C65.6941 21.264 65.4421 21.84 65.0821 22.464C64.7221 23.088 64.2661 23.664 63.7141 24.192C63.1621 24.72 62.4181 25.188 61.4821 25.596C60.5701 25.98 59.5381 26.208 58.3861 26.28C58.3141 26.28 58.2061 26.28 58.0621 26.28C57.9181 26.304 57.8101 26.316 57.7381 26.316C56.7781 26.316 55.8181 26.172 54.8581 25.884C53.9221 25.596 53.0101 25.164 52.1221 24.588C51.2581 24.012 50.5141 23.196 49.8901 22.14C49.2901 21.084 48.9181 19.872 48.7741 18.504C48.5341 16.056 49.1101 13.956 50.5021 12.204C51.8941 10.452 53.7421 9.372 56.0461 8.964C56.5981 8.844 57.2221 8.784 57.9181 8.784C59.7421 8.784 61.3021 9.252 62.5981 10.188C63.8941 11.124 64.7461 12.144 65.1541 13.248C65.3941 13.944 65.2861 14.52 64.8301 14.976C64.3741 15.408 63.6181 15.816 62.5621 16.2C62.2261 16.296 59.9701 17.076 55.7941 18.54C56.2741 19.788 56.9341 20.76 57.7741 21.456C58.6141 22.152 59.5501 22.5 60.5821 22.5C61.6141 22.5 62.5141 22.176 63.2821 21.528C64.0501 20.88 64.4581 20.04 64.5061 19.008C64.5541 18.576 64.8181 18.36 65.2981 18.36C65.7541 18.432 65.9941 18.744 66.0181 19.296ZM56.9461 10.332C55.9861 10.524 55.3741 11.328 55.1101 12.744C54.8461 14.16 54.9421 15.672 55.3981 17.28C55.9021 17.064 57.1381 16.608 59.1061 15.912C59.5621 15.744 59.9101 15.444 60.1501 15.012C60.3901 14.58 60.4621 14.124 60.3661 13.644C60.0781 12.756 59.6581 11.976 59.1061 11.304C58.5541 10.632 57.9541 10.296 57.3061 10.296C57.1381 10.296 57.0181 10.308 56.9461 10.332Z"
                fill={color}
            />
            <path
                d="M79.2695 8.496C79.3175 8.496 79.4015 8.496 79.5215 8.496C79.6655 8.472 79.7735 8.46 79.8455 8.46C81.2855 8.46 82.4975 8.832 83.4815 9.576C84.4655 10.32 84.9455 11.292 84.9215 12.492C84.9215 13.26 84.6575 13.896 84.1295 14.4C83.6255 14.88 83.0015 15.12 82.2575 15.12C81.4175 15.12 80.7695 14.952 80.3135 14.616C79.8575 14.256 79.6295 13.8 79.6295 13.248C79.6295 12.792 79.8095 12.252 80.1695 11.628C80.3615 11.124 80.3495 10.68 80.1335 10.296C79.9175 9.912 79.5335 9.72 78.9815 9.72C78.0455 9.696 77.3135 10.212 76.7855 11.268C76.2815 12.324 76.0055 13.764 75.9575 15.588V21.06C75.9575 21.66 76.3295 22.368 77.0735 23.184C77.8415 24 78.2255 24.516 78.2255 24.732V25.056C78.2255 25.392 78.0455 25.56 77.6855 25.56H68.2895C67.9055 25.56 67.7135 25.404 67.7135 25.092C67.6415 24.756 67.6655 24.492 67.7855 24.3C67.8335 24.132 68.0615 23.868 68.4695 23.508C68.8775 23.124 69.2375 22.716 69.5495 22.284C69.8855 21.828 70.0415 21.396 70.0175 20.988V14.94C70.0175 14.316 69.8855 13.836 69.6215 13.5C69.3815 13.14 69.0575 12.864 68.6495 12.672C68.2415 12.48 68.0015 12.348 67.9295 12.276C67.7135 12.132 67.6055 11.916 67.6055 11.628C67.6055 11.34 67.7135 11.1 67.9295 10.908C68.3135 10.476 69.2855 10.008 70.8455 9.504C72.4055 8.976 73.4975 8.7 74.1215 8.676C74.7215 8.676 75.2135 9.336 75.5975 10.656C76.4375 9.408 77.6615 8.688 79.2695 8.496Z"
                fill={color}
            />
            <path
                d="M88.7397 13.932C88.4037 13.164 87.7917 12.384 86.9037 11.592C85.9917 10.8 85.5357 10.26 85.5357 9.972V9.684C85.5357 9.54 85.5957 9.42 85.7157 9.324C85.8117 9.204 85.9197 9.144 86.0397 9.144H95.5077C95.6517 9.144 95.7837 9.204 95.9037 9.324C96.0237 9.42 96.0837 9.528 96.0837 9.648C96.1557 10.008 96.1557 10.26 96.0837 10.404C96.0357 10.524 95.8917 10.716 95.6517 10.98C95.4117 11.244 95.2077 11.484 95.0397 11.7C94.8957 11.892 94.7757 12.18 94.6797 12.564C94.6077 12.924 94.6797 13.284 94.8957 13.644C96.3117 18.468 97.3557 21.24 98.0277 21.96L101.664 13.644C101.856 13.26 101.892 12.888 101.772 12.528C101.676 12.144 101.556 11.856 101.412 11.664C101.268 11.448 101.076 11.22 100.836 10.98C100.62 10.716 100.488 10.524 100.44 10.404L100.404 9.648C100.428 9.528 100.5 9.42 100.62 9.324C100.764 9.204 100.896 9.144 101.016 9.144H105.732C105.876 9.144 105.996 9.204 106.092 9.324C106.212 9.42 106.272 9.54 106.272 9.684V9.972C106.272 10.26 105.828 10.8 104.94 11.592C104.076 12.384 103.476 13.164 103.14 13.932L100.188 20.556C99.4437 22.356 99.1077 23.7 99.1797 24.588C99.2277 24.876 99.1677 25.104 98.9997 25.272C98.8317 25.416 98.4957 25.512 97.9917 25.56C97.8717 25.584 97.6437 25.596 97.3077 25.596C95.8677 25.596 94.6917 25.176 93.7797 24.336C92.8917 23.496 92.1477 22.308 91.5477 20.772C90.5397 18.516 89.6037 16.236 88.7397 13.932Z"
                fill={color}
            />
            <path
                d="M124.291 23.4C125.035 24.024 124.987 24.588 124.147 25.092C123.331 25.5 122.311 25.704 121.087 25.704C118.927 25.416 117.559 23.844 116.983 20.988C116.983 20.964 116.971 20.892 116.947 20.772C116.803 20.124 116.671 19.608 116.551 19.224C116.431 18.816 116.191 18.384 115.831 17.928C115.471 17.448 115.027 17.196 114.499 17.172H114.355C113.659 17.172 113.119 17.484 112.735 18.108C112.351 18.708 112.207 19.5 112.303 20.484C112.399 21.396 112.795 22.092 113.491 22.572C114.211 23.052 115.039 23.292 115.975 23.292C115.999 23.268 116.047 23.256 116.119 23.256C116.167 23.256 116.263 23.292 116.407 23.364C116.455 23.436 116.479 23.556 116.479 23.724C116.215 24.204 115.711 24.648 114.967 25.056C114.223 25.44 113.299 25.632 112.195 25.632C110.635 25.632 109.255 25.224 108.055 24.408C106.879 23.568 106.255 22.356 106.183 20.772C106.135 19.164 106.747 17.904 108.019 16.992C109.315 16.08 110.767 15.588 112.375 15.516C112.447 15.516 112.543 15.516 112.663 15.516C112.783 15.492 112.879 15.48 112.951 15.48C114.415 15.48 115.555 15.756 116.371 16.308C116.347 16.212 116.311 16.044 116.263 15.804C116.239 15.54 116.215 15.348 116.191 15.228C115.855 12.924 115.459 11.424 115.003 10.728C114.547 10.056 113.995 9.72 113.347 9.72C112.171 9.72 111.787 10.248 112.195 11.304C112.531 11.976 112.699 12.504 112.699 12.888C112.699 13.392 112.435 13.812 111.907 14.148C111.379 14.484 110.767 14.652 110.071 14.652C109.375 14.652 108.763 14.436 108.235 14.004C107.707 13.548 107.443 12.972 107.443 12.276C107.443 11.148 108.031 10.26 109.207 9.612C110.383 8.964 111.823 8.64 113.527 8.64C113.983 8.64 114.319 8.652 114.535 8.676C118.687 8.916 121.135 10.86 121.879 14.508C121.879 14.652 122.227 16.608 122.923 20.376C123.235 21.792 123.691 22.8 124.291 23.4Z"
                fill={color}
            />
            <path
                d="M133.931 21.06C133.931 21.66 134.315 22.368 135.083 23.184C135.851 24 136.235 24.516 136.235 24.732V25.056C136.235 25.176 136.175 25.296 136.055 25.416C135.959 25.512 135.827 25.56 135.659 25.56H126.299C125.915 25.56 125.723 25.404 125.723 25.092C125.651 24.756 125.651 24.492 125.723 24.3C125.747 24.228 126.143 23.796 126.911 23.004C127.703 22.212 128.075 21.54 128.027 20.988V5.832C128.027 5.208 127.895 4.728 127.631 4.392C127.391 4.056 127.055 3.792 126.623 3.6C126.191 3.408 125.939 3.276 125.867 3.204C125.651 3.06 125.543 2.844 125.543 2.556C125.519 2.244 125.639 2.016 125.903 1.872C126.599 1.44 127.595 1.02 128.891 0.611999C130.187 0.204 131.231 0 132.023 0C132.719 0 133.211 0.276 133.499 0.828C133.787 1.356 133.931 2.352 133.931 3.816V21.06Z"
                fill={color}
            />
            <path
                d="M151.286 15.984C151.694 16.2 151.958 16.356 152.078 16.452C152.222 16.524 152.522 16.728 152.978 17.064C153.434 17.4 153.77 17.712 153.986 18C154.202 18.288 154.406 18.684 154.598 19.188C154.814 19.668 154.91 20.184 154.886 20.736C154.862 21.912 154.418 22.908 153.554 23.724C152.69 24.54 151.622 25.128 150.35 25.488C149.078 25.848 147.662 26.04 146.102 26.064C143.75 26.088 141.83 25.704 140.342 24.912C138.854 24.12 138.038 23.256 137.894 22.32C137.798 21.528 137.954 20.844 138.362 20.268C138.77 19.692 139.358 19.308 140.126 19.116C140.414 19.068 140.63 19.044 140.774 19.044C141.494 19.044 142.19 19.224 142.862 19.584C143.534 19.92 143.894 20.28 143.942 20.664C143.99 20.904 143.858 21.216 143.546 21.6C143.234 21.984 143.042 22.332 142.97 22.644C142.778 23.34 142.982 23.904 143.582 24.336C144.182 24.768 144.962 24.984 145.922 24.984C146.882 24.984 147.626 24.768 148.154 24.336C148.706 23.88 148.958 23.316 148.91 22.644C148.886 22.044 148.55 21.468 147.902 20.916C147.254 20.364 146.594 19.92 145.922 19.584C145.802 19.536 145.562 19.428 145.202 19.26C144.866 19.068 144.458 18.852 143.978 18.612C143.522 18.348 143.186 18.156 142.97 18.036C139.97 16.524 138.554 14.784 138.722 12.816C138.89 11.472 139.718 10.392 141.206 9.576C142.718 8.736 144.518 8.316 146.606 8.316H147.29C149.378 8.436 150.938 8.832 151.97 9.504C153.026 10.176 153.578 10.932 153.626 11.772C153.674 12.252 153.506 12.684 153.122 13.068C152.762 13.428 152.246 13.62 151.574 13.644C151.454 13.668 151.274 13.68 151.034 13.68C150.386 13.68 149.786 13.536 149.234 13.248C148.706 12.96 148.406 12.624 148.334 12.24C148.334 12.024 148.49 11.796 148.802 11.556C149.114 11.316 149.282 11.076 149.306 10.836C149.33 10.692 149.282 10.536 149.162 10.368C149.042 10.176 148.79 9.996 148.406 9.828C148.046 9.66 147.59 9.564 147.038 9.54C146.318 9.54 145.658 9.672 145.058 9.936C144.458 10.176 144.158 10.608 144.158 11.232C144.182 11.52 144.338 11.82 144.626 12.132C144.914 12.42 145.166 12.624 145.382 12.744C145.598 12.864 145.934 13.044 146.39 13.284C146.486 13.332 146.87 13.548 147.542 13.932C148.238 14.292 148.934 14.664 149.63 15.048C150.35 15.432 150.902 15.744 151.286 15.984Z"
                fill={color}
            />
        </svg>
    );
};

export default Logotype;