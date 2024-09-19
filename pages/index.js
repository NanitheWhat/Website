import { useRef, useEffect, Fragment } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import { Analytics } from "@vercel/analytics/react";
import projectTypes from '../data/projectTypes.json';
// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

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
    <div className="relative cursor-none">
      <Cursor />
      <Head>        
        <title>Clic Media - Creative Videography & Photography Agency based in Amsterdam</title>
        <meta
          name="description"
          content="Enhance your brand with our professional videography and photography services in Amsterdam. We offer a unique, result-driven approach to capturing stunning visuals for businesses, events, and corporate projects. Partner with our creative Amsterdam-based team for high-quality videos and images tailored to your needs."
        />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header handleWorkScroll={handleWorkScroll} handleAboutScroll={handleAboutScroll} />
        
        <div className="">
          <div className="mt-0">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-5xl laptop:text-5xl laptopl:text-6xl p-2 tablet:p-4 font-extrabold leading-relaxed w-full laptop:w-4/5 transition-opacity duration-500 ease-in-out"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-2 tablet:p-4 font-bold leading-relaxed w-full laptop:w-4/5 transition-opacity duration-500 ease-in-out"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-xl tablet:text-3xl laptop:text-3xl laptopl:text-4xl p-2 tablet:p-4 font-semibold leading-relaxed w-full laptop:w-4/5 transition-opacity duration-500 ease-in-out"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-lg tablet:text-2xl laptop:text-2xl laptopl:text-3xl p-2 tablet:p-4 font-medium leading-relaxed w-full laptop:w-4/5 transition-opacity duration-500 ease-in-out"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h2 className="text-2xl text-bold">Work.</h2>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {projectTypes.projectTypes && projectTypes.projectTypes.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => {
                  if (project && project.url) {
                    window.open(project.url);
                  } else {
                    console.error('Project or URL is undefined for project ID:', project?.id);
                  }
                }}
              />
            ))}
          </div>



        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h2 className="tablet:m-10 text-2xl text-bold">Services.</h2>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}

        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h2 className="tablet:m-10 text-2xl text-bold">About.</h2>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
