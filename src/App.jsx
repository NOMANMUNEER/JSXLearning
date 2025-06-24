import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure GSAP knows about the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Import the Apple component you already have
import { Apple } from '../Apple'; 

// The 3D Scene component
function Scene() {
  const appleRef = useRef();

  // This is where the magic happens!
  useGSAP(() => {
    // Create a GSAP timeline
    const tl = gsap.timeline({
      // The ScrollTrigger configuration links the animation to the scrollbar
      scrollTrigger: {
        trigger: ".story-container", // The element that triggers the scroll
        start: "top top",         // Animation starts when the top of the trigger hits the top of the viewport
        end: "bottom bottom",     // Animation ends when the bottom of the trigger hits the bottom of the viewport
        scrub: 1,                 // Smoothly scrubs the animation in sync with the scroll (1-second lag)
      },
    });

    // --- Define the animation sequence for the apple based on the diagram ---

    // Section 1: Apple at the top-center
    tl.set(appleRef.current.position, { x: 0, y: -11 });
    tl.set(appleRef.current.scale, { x: 300, y: 300, z: 300 });
    tl.set(appleRef.current.rotation, { x: 0, y: 0, z: 0 });
    
    // Section 2: Apple on the right
    tl.to(appleRef.current.position, { x: 20, y: -11 }, "section2");
    tl.to(appleRef.current.rotation, { y: Math.PI }, "section2");
    tl.to(appleRef.current.scale, { x: 300, y: 300, z: 300 }, "section2");

    // Section 3: Apple on the left
    tl.to(appleRef.current.position, { x: -15, y: -11 }, "section3");
    tl.to(appleRef.current.rotation, { y: Math.PI * 2 }, "section3");
    tl.to(appleRef.current.scale, { x: 300, y: 300, z: 300 }, "section3");

    // Section 4: Apple at the bottom, partially visible
    tl.to(appleRef.current.position, { x: 0, y: -35 }, "section4");
    tl.to(appleRef.current.rotation, { y: Math.PI * 2.5 }, "section4");
    tl.to(appleRef.current.scale, { x: 400, y: 400, z: 400 }, "section4");

  

  }, []);

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 7]} intensity={2.5} />
      <group ref={appleRef}>
        <Apple />
      </group>
      {/* We add OrbitControls for debugging, but they won't interfere with the scroll animation */}
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
}


// The main App component with HTML structure
function App() {
  return (
    <>
      {/* Added overflowX: 'hidden' to prevent horizontal scrollbars */}
      <div style={{ position: 'relative', width: '100%', height: '100%', overflowX: 'hidden' }}>
        {/* The 3D Canvas, fixed to the background */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh' }}>
          {/* Adjusted camera position to see the larger model */}
          <Canvas camera={{ position: [0, 5, 40], fov: 60 }}>
            <Scene />
          </Canvas>
        </div>

        {/* The HTML story content, layered on top */}
        <div className="story-container" style={{ position: 'relative', zIndex: 1 }}>
          <section className="story-section">
            <h1>Chapter 1: Above It All</h1>
            <p>Our story begins with a single apple, centered and prominent.</p>
          </section>
          <section className="story-section" style={{alignItems: 'flex-start', marginLeft: '5vw'}}>
            <h2>Chapter 2: A Shift in Focus</h2>
            <p>As we delve deeper, the narrative shifts, and our subject moves aside.</p>
          </section>
          <section className="story-section" style={{alignItems: 'flex-end', marginRight: '5vw'}}>
            <h2>Chapter 3: The Other Side</h2>
            <p>Presenting a new point of view from the opposite perspective.</p>
          </section>
          <section className="story-section" style={{justifyContent: 'flex-start', paddingTop: '10vh'}}>
            <h2>Chapter 4: A New Horizon</h2>
            <p>Finally, the apple settles into a new foundation, ready for what's next.</p>
          </section>
        
        </div>
      </div>
    </>
  );
}

export default App;
