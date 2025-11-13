'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LaptopMockupProps {
  laptopImageSrc: string;
  mobileImageSrc: string;
  alt?: string;
  className?: string;
}

export function LaptopMockup({
  laptopImageSrc,
  mobileImageSrc,
  alt = 'QuickFy App Interface',
  className
}: LaptopMockupProps) {
  return (
    <div className={cn('relative w-full', className)} style={{ aspectRatio: '1 / 1' }}>
      {/* SVG Background - Laptop + Smartphone */}
      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          {/* Gradients for laptop */}
          <linearGradient id="laptopGrad1" x1="298.3894" y1="406.7729" x2="298.3894" y2="414.0747" gradientUnits="userSpaceOnUse">
            <stop offset="0.3564" stopColor="#808185"/>
            <stop offset="0.5045" stopColor="#78797D"/>
            <stop offset="0.5443" stopColor="#7A7B7F"/>
            <stop offset="1" stopColor="#0D0C11"/>
          </linearGradient>
          <linearGradient id="laptopGrad2" x1="298.3894" y1="107.435" x2="298.3894" y2="388.3585" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0E0E0E"/>
            <stop offset="0.0092" stopColor="#373737"/>
            <stop offset="0.0982" stopColor="#3E3E3E"/>
            <stop offset="0.1202" stopColor="#949494"/>
            <stop offset="0.1722" stopColor="#3E3E3E"/>
            <stop offset="0.2384" stopColor="#1F1F1F"/>
            <stop offset="0.4063" stopColor="#3E3E3E"/>
            <stop offset="0.4336" stopColor="#808080"/>
            <stop offset="0.4621" stopColor="#3E3E3E"/>
            <stop offset="0.5727" stopColor="#3E3E3E"/>
            <stop offset="0.5998" stopColor="#646464"/>
            <stop offset="0.6294" stopColor="#3E3E3E"/>
            <stop offset="0.6916" stopColor="#3E3E3E"/>
            <stop offset="0.7908" stopColor="#0C0C0C"/>
            <stop offset="0.9015" stopColor="#3E3E3E"/>
            <stop offset="0.9334" stopColor="#8F8F8F"/>
            <stop offset="0.9577" stopColor="#3E3E3E"/>
          </linearGradient>
          <linearGradient id="laptopGrad3" x1="33.3894" y1="401.6635" x2="563.3895" y2="401.6635" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#49484D"/>
            <stop offset="0.0121" stopColor="#D3D4D9"/>
            <stop offset="0.0282" stopColor="#D0D1D6"/>
            <stop offset="0.0804" stopColor="#8C8D92"/>
            <stop offset="0.0918" stopColor="#85868B"/>
            <stop offset="0.5113" stopColor="#CBCCD2"/>
            <stop offset="0.9264" stopColor="#85868B"/>
            <stop offset="0.937" stopColor="#8B8C91"/>
            <stop offset="0.979" stopColor="#D0D1D6"/>
            <stop offset="0.994" stopColor="#D3D4D9"/>
            <stop offset="1" stopColor="#454449"/>
          </linearGradient>
          <linearGradient id="laptopGrad4" x1="255.5818" y1="400.1346" x2="341.1971" y2="400.1346" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#161617"/>
            <stop offset="0.0581" stopColor="#84848A"/>
            <stop offset="0.3011" stopColor="#8F8F96"/>
            <stop offset="0.524" stopColor="#ADADB5"/>
            <stop offset="0.7161" stopColor="#8A8B91"/>
            <stop offset="0.9495" stopColor="#7B7C81"/>
            <stop offset="1" stopColor="#0D0C11"/>
          </linearGradient>
          <linearGradient id="laptopGrad5" x1="77.8169" y1="115.3505" x2="170.6365" y2="208.1701" gradientUnits="userSpaceOnUse">
            <stop offset="4.783163e-04" stopColor="#9E9E9E"/>
            <stop offset="1" stopColor="#1D1D1B"/>
          </linearGradient>

          {/* Gradients for smartphone */}
          <linearGradient id="phoneGrad1" x1="462.0303" y1="313.7818" x2="462.0303" y2="343.3899" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0E0E0E"/>
            <stop offset="0.0092" stopColor="#373737"/>
            <stop offset="0.0982" stopColor="#3E3E3E"/>
            <stop offset="0.1202" stopColor="#949494"/>
            <stop offset="0.1722" stopColor="#3E3E3E"/>
            <stop offset="0.2384" stopColor="#1F1F1F"/>
            <stop offset="0.4063" stopColor="#3E3E3E"/>
            <stop offset="0.4336" stopColor="#808080"/>
            <stop offset="0.4621" stopColor="#3E3E3E"/>
            <stop offset="0.5727" stopColor="#3E3E3E"/>
            <stop offset="0.5998" stopColor="#646464"/>
            <stop offset="0.6294" stopColor="#3E3E3E"/>
            <stop offset="0.6916" stopColor="#3E3E3E"/>
            <stop offset="0.7908" stopColor="#0C0C0C"/>
            <stop offset="0.9015" stopColor="#3E3E3E"/>
            <stop offset="0.9334" stopColor="#8F8F8F"/>
            <stop offset="0.9577" stopColor="#3E3E3E"/>
          </linearGradient>
          <linearGradient id="phoneGrad2" x1="513.9979" y1="281.8943" x2="513.9979" y2="492.8942" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0E0E0E"/>
            <stop offset="0.0092" stopColor="#373737"/>
            <stop offset="0.0982" stopColor="#3E3E3E"/>
            <stop offset="0.1202" stopColor="#949494"/>
            <stop offset="0.1722" stopColor="#3E3E3E"/>
            <stop offset="0.2384" stopColor="#1F1F1F"/>
            <stop offset="0.4063" stopColor="#3E3E3E"/>
            <stop offset="0.4336" stopColor="#808080"/>
            <stop offset="0.4621" stopColor="#3E3E3E"/>
            <stop offset="0.5727" stopColor="#3E3E3E"/>
            <stop offset="0.5998" stopColor="#646464"/>
            <stop offset="0.6294" stopColor="#3E3E3E"/>
            <stop offset="0.6916" stopColor="#3E3E3E"/>
            <stop offset="0.7908" stopColor="#0C0C0C"/>
            <stop offset="0.9015" stopColor="#3E3E3E"/>
            <stop offset="0.9334" stopColor="#8F8F8F"/>
            <stop offset="0.9577" stopColor="#3E3E3E"/>
          </linearGradient>
        </defs>

        {/* Background */}
        <rect fill="#FFFFFF" width="600" height="600"/>

        {/* Laptop */}
        <g id="laptop">
          {/* Laptop base shadow */}
          <path fill="url(#laptopGrad1)" d="M563.389,406.76c0,0-16.308,7.135-40.769,7.135c-24.462,0-424,0-448.462,0s-40.769-7.135-40.769-7.135l265-2.038L563.389,406.76z"/>

          {/* Laptop screen outer bezel */}
          <path fill="url(#laptopGrad2)" d="M513.447,396.567H83.332V117.106c0-5.523,4.477-10,10-10h410.115c5.523,0,10,4.477,10,10V396.567z"/>

          {/* Laptop screen inner bezel */}
          <path d="M84.861,396.567V117.298c0-4.777,3.887-8.663,8.663-8.663h409.731c4.777,0,8.663,3.886,8.663,8.663v279.269H84.861z"/>

          {/* Laptop keyboard base */}
          <rect x="33.389" y="396.567" fill="url(#laptopGrad3)" width="530" height="10.192"/>

          {/* Laptop trackpad area */}
          <path fill="url(#laptopGrad4)" d="M335.099,403.702H261.68c-3.368,0-6.098-2.73-6.098-6.098v-1.037h85.615v1.037C341.197,400.972,338.467,403.702,335.099,403.702z"/>

          {/* Laptop screen separator line */}
          <line fill="none" stroke="#000000" strokeWidth="0.5" strokeMiterlimit="10" x1="511.918" y1="387.394" x2="84.861" y2="387.394"/>

          {/* Laptop screen reflection effect */}
          <path fill="url(#laptopGrad5)" d="M271.889,110.163l-185.5,213.019V117.298c0-3.934,3.2-7.135,7.135-7.135H271.889z"/>

          {/* Laptop camera */}
          <circle fill="#232323" cx="298.389" cy="118.317" r="3.058"/>
        </g>

        {/* Smartphone */}
        <g id="smartphone">
          {/* Phone side buttons */}
          <path fill="url(#phoneGrad1)" d="M462.671,324.344v7.907h-0.641c-0.354,0-0.641-0.287-0.641-0.645v-6.617c0-0.358,0.287-0.645,0.641-0.645H462.671z"/>
          <path fill="url(#phoneGrad1)" d="M462.671,340.159v15.398h-0.641c-0.354,0-0.641-0.287-0.641-0.645v-14.108c0-0.358,0.287-0.645,0.641-0.645H462.671z"/>

          {/* Phone power button */}
          <path fill="url(#phoneGrad1)" d="M566.611,345.581v23.51c0,0.287-0.229,0.516-0.516,0.516h-0.907v-24.542h0.907C566.382,345.065,566.611,345.298,566.611,345.581z"/>

          {/* Phone body outer */}
          <path fill="url(#phoneGrad2)" d="M565.603,296.877v181.035c0,8.274-6.705,14.982-14.982,14.982h-73.246c-8.274,0-14.982-6.709-14.982-14.982V296.877c0-8.274,6.709-14.982,14.982-14.982h73.246C558.899,281.894,565.603,288.603,565.603,296.877z"/>

          {/* Phone body inner black frame */}
          <path fill="#010101" d="M563.939,296.877v181.035c0,7.341-5.972,13.318-13.318,13.318h-73.246c-7.341,0-13.318-5.976-13.318-13.318V296.877c0-7.345,5.976-13.318,13.318-13.318h73.246C557.967,283.559,563.939,289.531,563.939,296.877z"/>

          {/* Phone notch area */}
          <path fill="#FFFFFF" d="M560.609,296.877v181.035c0,5.506-4.482,9.988-9.988,9.988h-73.246c-5.506,0-9.988-4.482-9.988-9.988V296.877c0-5.506,4.482-9.988,9.988-9.988h16.231c0.691,0,1.249,0.558,1.249,1.249v1.249c0,2.988,2.422,5.41,5.41,5.41h27.467c2.988,0,5.41-2.422,5.41-5.41v-1.249c0-0.691,0.558-1.249,1.249-1.249h16.231C556.127,286.888,560.609,291.371,560.609,296.877z"/>

          {/* Phone camera */}
          <circle fill="#363636" cx="500.005" cy="289.77" r="1.548"/>

          {/* Phone speaker */}
          <path fill="#363636" d="M518.162,291.319h-8.326c-0.847,0-1.534-0.687-1.534-1.534v-0.029c0-0.847,0.687-1.534,1.534-1.534h8.326c0.847,0,1.534,0.687,1.534,1.534v0.029C519.696,290.632,519.009,291.319,518.162,291.319z"/>
        </g>
      </svg>

      {/* Laptop Screen Image - Positioned over the white screen area */}
      <div
        className="absolute"
        style={{
          left: '15.94%',   // 95.563 / 600 * 100
          top: '21.25%',    // 127.49 / 600 * 100
          width: '67.61%',  // 405.654 / 600 * 100
          height: '42.13%'  // 252.769 / 600 * 100
        }}
      >
        <Image
          src={laptopImageSrc}
          alt={`${alt} - Desktop view`}
          fill
          className="object-cover rounded-sm"
          sizes="(max-width: 768px) 50vw, 40vw"
          priority
        />
      </div>

      {/* Smartphone Screen Image - Positioned over the white phone screen */}
      <div
        className="absolute"
        style={{
          left: '79.48%',   // 477.375 / 600 * 100 (calculated from phone screen white area)
          top: '47.98%',    // 287.9 / 600 * 100
          width: '14.39%',  // 86.35 / 600 * 100 (phone screen width)
          height: '32.35%'  // 194.1 / 600 * 100 (phone screen height)
        }}
      >
        <Image
          src={mobileImageSrc}
          alt={`${alt} - Mobile view`}
          fill
          className="object-cover rounded-sm"
          sizes="(max-width: 768px) 20vw, 10vw"
          priority
        />
      </div>
    </div>
  );
}
