// "use client";

// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// interface KostImageSwiperMobileProps {
//   images: string[];
//   onClickImage?: (index: number) => void;
// }

// export default function KostImageSwiperMobile({
//   images,
//   onClickImage,
// }: KostImageSwiperMobileProps) {
//   const sliderRef = useRef<HTMLDivElement | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [sliderInstanceRef, setSliderInstanceRef] = useState<any>(null);

//   useEffect(() => {
//     if (!sliderRef.current) return;

//     const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
//       initial: 0,
//       slideChanged(slider) {
//         setActiveIndex(slider.track.details.rel);
//       },
//     });

//     ref(sliderRef.current);
//     setSliderInstanceRef(instanceRef);

//     return () => {
//       instanceRef?.destroy();
//     };
//   }, [images]);

//   return (
//     <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
//       <div ref={sliderRef} className="keen-slider h-full">
//         {images.map((src, idx) => (
//           <div
//             key={idx}
//             className="keen-slider__slide relative"
//             onClick={() => onClickImage?.(idx)}
//           >
//             <Image
//               src={src}
//               alt={`Kost ${idx + 1}`}
//               fill
//               className="object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded">
//         {activeIndex + 1} / {images.length}
//       </div>
//     </div>
//   );
// }
