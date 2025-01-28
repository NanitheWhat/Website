import React, { useEffect, useState, useRef } from 'react';

const Phase = ({ number, title, description, isRight, isActive }) => {
  return (
    <div className={`group relative mb-32 w-[calc(50%-10px)] ${isRight ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
      {/* Checkmark */}
      <div 
        className={`absolute top-1/2 transform -translate-y-1/2 
          ${isRight ? 'left-[-33px]' : 'right-[-33px]'} 
          w-12 h-12 rounded-full border-4 border-[rgba(211,211,211,0.61)] 
          ${isActive ? 'bg-green-500' : 'bg-[#db4a2b]'}
          flex items-center justify-center transition-colors duration-500`}
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <span className="text-sm text-gray-500">Phase {number}</span>
        <h3 className="text-xl font-bold text-[#002535] mt-2">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
    </div>
  );
};

const Timeline = () => {
  const timelineRef = useRef(null);
  const [activePhases, setActivePhases] = useState([]);
  const [lineHeight, setLineHeight] = useState(0);

  const phases = [
    { title: "Discovery call", description: "We begin with a thorough discussion of your project needs and goals." },
    { title: "Project Planning", description: "Our team develops a comprehensive plan and timeline for your project." },
    { title: "Design Phase", description: "We create initial designs and prototypes for your review and feedback." },
    { title: "Video shoot", description: "We create and film your video's based on our previous designs." },
    { title: "Launch of Advertisements", description: "Launch of the fully edited video advertisement campaigns." },
    { title: "Analytics and improvement of Ads", description: "Constant analysis and testing of multiple advertisements." },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const viewportMiddle = window.innerHeight / 2;
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;

      // Calculate line height relative to the section
      const progress = (viewportMiddle - timelineTop) / timelineHeight;
      const newLineHeight = Math.max(0, Math.min(timelineHeight, progress * timelineHeight));
      setLineHeight(newLineHeight);

      // Calculate which phases should be active
      const phaseElements = timelineRef.current.querySelectorAll('.timeline-phase');
      const newActivePhases = Array.from(phaseElements).map((phase) => {
        const phaseRect = phase.getBoundingClientRect();
        const phaseMiddle = phaseRect.top + phaseRect.height / 2;
        return phaseMiddle < viewportMiddle;
      });

      setActivePhases(newActivePhases);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div ref={timelineRef} className="max-w-4xl mx-auto px-4 py-24 relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gray-200">
        <div 
          className="absolute top-0 left-0 w-full bg-green-500 transition-all duration-200 ease-out"
          style={{ height: `${lineHeight}px` }}
        />
      </div>

      {/* Phases */}
      <div className="relative">
        {phases.map((phase, index) => (
          <div key={index} className="timeline-phase">
            <Phase
              number={index + 1}
              title={phase.title}
              description={phase.description}
              isRight={index % 2 === 0}
              isActive={activePhases[index]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
