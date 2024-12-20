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
        <div className="container mx-auto mb-10">

          <Header/>
      

            {/* Video Section */}
            <section className="container mx-auto my-10 p-4">
              <h1 className="text-center text-3xl tablet:text-5xl pb-20 laptop:text-6xl font-extrabold mt-5">
                Wij maken{" "}
                <span className="bg-gradient-green text-transparent bg-clip-text">CONTENT</span>{" "}
                dat{" "}
                <span className="bg-gradient-orange text-transparent bg-clip-text">CONVERTEERT!</span>
                
              </h1>
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/sbSP9aiCOBY?autoplay=1&controls=0&mute=0&playsinline=1&rel=0&modestbranding=1"
                  title="Clicmedia Introduction Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <section className="my-10 flex flex-col justify-center items-center">
                <h2 className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-2 tablet:p-4 font-bold leading-relaxed text-center">
                    Kijken wat wij voor jou kunnen betekenen?
                </h2>
                <Link href="https://calendly.com/rickvandenkommer/clic-discovery">
                    <Button2 className="mt-10 mx-auto text-lg tablet:text-2xl laptop:text-3xl px-10 py-4">
                    Schedule nu een meeting!
                    </Button2>
                </Link>
              

            </section>
            <section ref={logoRef} className="my-10 ">
              <h2 className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-2 tablet:p-4 font-bold leading-relaxed text-center mb-20">
              <span className="bg-gradient-orange text-transparent bg-clip-text">Bedrijven</span>{" "} waar wij mee hebben
              {" "}<span className="bg-gradient-green text-transparent bg-clip-text">gewerkt.</span>{" "}
              </h2>
              <LogoSlider logos={logos} className="pt-20 "/>
            </section>

            {/* Image Section */}
            <section className="my-20 flex justify-center items-center p-4">
                  <Image
                      src="/images/Frame 1 (3).png" // Use the actual path to the image you uploaded
                      alt="Sales Prospecting Services"
                      width={1344} // 70% of 1920
                      height={756} // 70% of 1080
                      className="mx-auto"
                      style={{ width: "70%", height: "auto" }} // reduce to 70% width
                  />
            </section>


            {/* Call to Action Button */}
            <section className="my-10 flex flex-col justify-center items-center">
              <h2 className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-2 tablet:p-4 font-bold leading-relaxed text-center">
                Kijken wat wij voor jou kunnen betekenen?
              </h2>
              <Link href="https://calendly.com/rickvandenkommer/clic-discovery">
                  <Button2 className="mt-10 mx-auto text-lg tablet:text-2xl laptop:text-3xl px-10 py-4">
                  Zet een meeting op, of stuur een appje!
                  </Button2>
              </Link>
            </section>
            

              <Footer />
          </section>
          </div>
        
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
