import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure GSAP knows about the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Corrected the import path for the Apple component.
import { Apple } from '../Apple'; 

// The 3D Scene component (No changes needed here)
function Scene() {
  const appleRef = useRef();
  const containerRef = useRef();

  useGSAP(() => {
    if (!appleRef.current) {
      return; 
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".story-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
    // Section 1: Apple at the top-center
    tl.set(appleRef.current.position, { x: 0, y: -40 });
    tl.set(appleRef.current.scale, { x: 400, y: 400, z: 400 });
    tl.set(appleRef.current.rotation, { x: 0, y: 0, z: 0 });
    // Section 2: Apple on the right
    tl.to(appleRef.current.position, { x: -15, y: -11 }, "section2");
    tl.to(appleRef.current.rotation, { y: Math.PI }, "section2");
    tl.to(appleRef.current.scale, { x: 300, y: 300, z: 300 }, "section2");
    // Section 3: Apple on the left
    tl.to(appleRef.current.position, { x: 20, y: -5 }, "section3");
    tl.to(appleRef.current.rotation, { y: Math.PI * 2 }, "section3");
    tl.to(appleRef.current.scale, { x: 300, y: 300, z: 300 }, "section3");
    // Section 4: Apple at the bottom, partially visible
    tl.to(appleRef.current.position, { x: 0, y: -50 }, "section4");
    tl.to(appleRef.current.rotation, { y: Math.PI  }, "section4");
    tl.to(appleRef.current.scale, { x: 400, y: 400, z: 400 }, "section4");
  }, []);

  return (
    <group ref={containerRef}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 7]} intensity={2.5} />
      {/* Added a subtle purple backlight for depth */}
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#4f46e5" />
      <group ref={appleRef}>
        <Apple />
      </group>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </group>
  );
}


// Main Portfolio Component with new advanced styling
function App() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="relative w-full h-full overflow-x-hidden">
        {/* Fixed 3D Background */}
        <div className="fixed top-0 left-0 w-full h-screen">
          <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
            <Scene />
          </Canvas>
        </div>

        {/* Floating Navigation */}
        <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="px-8 py-4 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
            <div className="flex space-x-8 text-sm font-medium">
              <a href="#home" className="hover:text-purple-300 transition-all duration-300 hover:scale-105">Home</a>
              <a href="#about" className="hover:text-purple-300 transition-all duration-300 hover:scale-105">About</a>
              <a href="#work" className="hover:text-purple-300 transition-all duration-300 hover:scale-105">Work</a>
              <a href="#contact" className="hover:text-purple-300 transition-all duration-300 hover:scale-105">Contact</a>
            </div>
          </div>
        </nav>

        <div className="story-container relative z-10 w-full">
          {/* Hero Section */}
          <section id="home" className="h-screen w-full flex justify-center items-center px-8">
            <div className="w-full max-w-6xl mx-auto text-center">
              <div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight">
                  Noman Munir
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                  I craft seamless digital experiences from concept to launch, blending creative vision with technical excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                   {/* You can add custom styled buttons here later */}
                </div>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section id="about" className="h-screen w-full flex justify-center items-center p-8">
            <div className="relative w-full max-w-lg ml-auto p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-500 rounded-full opacity-20"></div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                My Philosophy
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                I believe that the best digital products are born from a blend of creative vision and technical excellence. My passion lies in translating complex ideas into intuitive, beautiful, and highly functional web applications that users love to interact with.
              </p>
            </div>
          </section>

          {/* Process Section */}
           <section className="h-screen w-full flex justify-center items-center p-8">
            <div className="relative w-full max-w-lg mr-auto p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
               <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full opacity-20"></div>
               <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-yellow-500 rounded-full opacity-20"></div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                The Process
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                From the initial discovery and strategy, through design and development with modern tools like React and Three.js, to the final launch—every step is handled with precision and care.
              </p>
            </div>
          </section>
          
          {/* Featured Projects Section */}
          <section id="work" className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A collection of projects that showcase my expertise in creating exceptional digital experiences.
              </p>
            </div>
            
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Card 1 */}
              <div className="bg-white/5 rounded-2xl border border-white/10 shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <img src="https://placehold.co/600x400/1a1a1a/ffffff?text=Project+One" alt="Project One" className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-white">E-Commerce Platform</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">A full-featured online store built with React and a headless CMS, designed for performance and scalability.</p>
                  <a href="#" className="font-bold text-purple-400 hover:text-purple-300">View Project →</a>
                </div>
              </div>
              {/* Project Card 2 */}
               <div className="bg-white/5 rounded-2xl border border-white/10 shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <img src="https://placehold.co/600x400/4a4a4a/ffffff?text=Project+Two" alt="Project Two" className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-white">Interactive Data Viz</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">A web-based tool for visualizing complex data sets using D3.js, providing intuitive and interactive charts.</p>
                  <a href="#" className="font-bold text-purple-400 hover:text-purple-300">View Project →</a>
                </div>
              </div>
              {/* Project Card 3 */}
              <div className="bg-white/5 rounded-2xl border border-white/10 shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <img src="https://placehold.co/600x400/7a7a7a/ffffff?text=Project+Three" alt="Project Three" className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-white">This Portfolio Site</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">A personal portfolio built with React, Three.js, and GSAP to demonstrate advanced animation techniques.</p>
                  <a href="#" className="font-bold text-purple-400 hover:text-purple-300">View Project →</a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="h-screen w-full flex justify-center items-center px-8">
            <div className="relative text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl max-w-2xl mx-auto">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                Let's Create Together
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Have an idea for a project? I'd love to hear about it and help bring your vision to life.
              </p>
              <div className="mt-12 flex justify-center space-x-8">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
