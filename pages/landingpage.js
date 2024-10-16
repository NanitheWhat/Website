import { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LogoSlider from "../components/LogoSlider/logoslider";
import { GetLogos } from '../utils/GetLogos';
import Head from "next/head";
import Button2 from "../components/Button2";
import Image from 'next/image';
import { Analytics } from "@vercel/analytics/react";
import Link from 'next/link';
import Cursor from "../components/Cursor";



export default function LandingPage({ logos }) {
  // Ref for scrolling to the logo section
  const logoRef = useRef();
  
  useEffect(() => {
    // Google Analytics and Tag Manager script
    const gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z3VTDKXJ7Z';
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    const gtagConfigScript = document.createElement('script');
    gtagConfigScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Z3VTDKXJ7Z');
    `;
    document.head.appendChild(gtagConfigScript);
  }, []);

  return (
    
    <div className="relative overflow-x-hidden overflow-y-hidden">
        <Cursor />
        <Head>
            <title>Clicmedia - Landing Page</title>
            <meta
            name="description"
            content="Learn more about Clicmedia, a creative videography and marketing agency. Schedule a call to see how we can help your brand!"
            />
        </Head>
        <div className="gradient-circle"></div>
        <div className="gradient-circle-bottom"></div>

      <Header />

      {/* Video Section */}
      <section className="container mx-auto my-10 p-4">
      <h1 className="text-center text-3xl tablet:text-5xl pb-20 laptop:text-6xl font-extrabold mt-5">
        We create <span style={{ color: '#0A5234' }}>CONTENT</span> that <span style={{ color: '#DB4A2B' }}>CONVERTS</span>.
        </h1>
        <div className="aspect-w-16 aspect-h-9">
          <video
            controls
            className="w-full"
            src="/path-to-your-video.mp4" // Replace with the actual video file path
            alt="Clicmedia Intro Video"
          />
        </div>
        
      </section>

      {/* Logo Slider */}
      <section ref={logoRef} className="my-10 ">
        <h2 className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-2 tablet:p-4 font-bold leading-relaxed text-center">
          Brands We've Worked With
        </h2>
        <LogoSlider logos={logos} className="pt-20 "/>
      </section>

      {/* Image Section */}
      <section className="my-20 flex justify-center items-center p-4">
        <Image
            src="/images/Frame 1 (3).png" // Use the actual path to the image you uploaded
            alt="Sales Prospecting Services"
            width={854}
            height={480}
            className="mx-auto"
        />
        </section>

      {/* Call to Action Button */}
      <section className="my-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-2 tablet:p-4 font-bold leading-relaxed text-center">
            Ready to Grow Your Brand?
        </h2>
        <Link href="https://calendly.com/rickvandenkommer/clic-discovery">
            <Button2 className="mt-10 mx-auto text-lg tablet:text-2xl laptop:text-3xl px-10 py-4">
            Schedule a Call with Us
            </Button2>
        </Link>
        </section>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const logos = GetLogos();
  return {
    props: {
      logos,
    },
  };
}
