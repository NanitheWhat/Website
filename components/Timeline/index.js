import React, { useEffect, useState, useRef } from 'react';

const TimelineItem = ({ title, description, date, isRight, isActive }) => {
  return (
    <div className={`relative clear-both mb-10 ${isRight ? 'float-right text-right' : 'float-left text-left'} w-[calc(50%-10px)]`}>
      <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRight ? 'left-[-33px]' : 'right-[-33px]'} w-12 h-12 ${isActive ? 'bg-green-500' : 'bg-[#db4a2b]'} rounded-full border-4 border-[rgba(211,211,211,0.61)] flex items-center justify-center transition-colors duration-300`}>
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <span className="text-sm text-gray-500">{date}</span>
        <h3 className="text-xl font-bold text-[#002535] mt-2">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
    </div>
  );
};

const Timeline = () => {
  const [activeItems, setActiveItems] = useState({});
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  const timelineItems = [
    { title: "Initial Consultation", description: "We begin with a thorough discussion of your project needs and goals.", date: "Week 1", isRight: true },
    { title: "Project Planning", description: "Our team develops a comprehensive plan and timeline for your project.", date: "Week 2", isRight: false },
    { title: "Design Phase", description: "We create initial designs and prototypes for your review and feedback.", date: "Weeks 3-4", isRight: true },
    { title: "Development", description: "Our developers begin building your project based on the approved designs.", date: "Weeks 5-8", isRight: false },
    { title: "Testing and Refinement", description: "We thoroughly test the project and make necessary refinements.", date: "Weeks 9-10", isRight: true },
    { title: "Launch Preparation", description: "Final preparations are made for the launch including marketing strategies.", date: "Week 11", isRight: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const timelineTop = timelineRef.current.offsetTop;
      const scrollPosition = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const activationPoint = scrollPosition + viewportHeight * 0.5;

      const newActiveItems = {};
      itemRefs.current.forEach((item, index) => {
        if (item) {
          const itemTop = item.offsetTop + timelineTop;
          newActiveItems[index] = itemTop < activationPoint;
        }
      });

      setActiveItems(newActiveItems);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={timelineRef} className="max-w-4xl mx-auto px-4 py-12 relative">
      <div className="relative">
        {timelineItems.map((item, index) => (
          <div
            key={index}
            ref={el => itemRefs.current[index] = el}
            className="timeline-item"
          >
            <TimelineItem {...item} isActive={activeItems[index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
