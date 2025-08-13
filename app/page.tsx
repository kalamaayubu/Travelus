import Image from "next/image";

export default function HomePage() {
 return (
 <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-4 pb-10 sm:p-8 sm:pb-16 md:p-12 md:pb-20 gap-10 sm:gap-16">
 {/* Header (Placeholder - Ideally in layout.tsx) */}
      {/* Hero Section - Modern and Intuitive */}
      <main className="flex flex-col md:flex-row gap-16 items-center justify-center row-start-2 text-center md:text-left min-h-[60vh]">
 <div className="flex flex-col gap-4 sm:gap-8 max-w-2xl">
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-500 leading-tight">Ride the Future of Transport in <span className="text-red-500">Kenya</span></h1>
  <p className="text-lg sm:text-xl md:text-2xl text-gray-300">Safe, reliable, and affordable rides at your fingertips. Connect with drivers across Kenya for your daily commute or next adventure.</p>

  <div className="flex gap-4 sm:gap-6 items-center flex-col sm:flex-row mt-4">
    <a className="rounded-full bg-green-500 text-white px-8 py-3 text-lg font-semibold hover:bg-green-600 transition duration-300" href="#">
      Get Started
    </a>
    <a className="rounded-full border border-solid border-green-500 text-green-500 px-8 py-3 text-lg font-semibold hover:bg-green-500 hover:text-white transition duration-300" href="#how-it-works" target="_blank"
            rel="noopener noreferrer"
          >
    Learn More
 </a>
 </div>
 </div>
</main>
 {/* Placeholder for subtle animation or 3D graphics */} {/* You would integrate a library like Three.js or a CSS animation here */} 
 <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
  <p className="text-gray-400">Placeholder for Hero Graphic/Animation</p>
    </div>

 {/* Features Section */}
 <section id="features" className="flex flex-col gap-8 items-center text-center">
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
 <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
 <h3 className="text-2xl font-semibold text-green-400 mb-4">Safe & Secure</h3>
 <p className="text-gray-300">Your safety is our priority. All drivers are vetted and rides are tracked.</p>
 </div>
 <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
 <h3 className="text-2xl font-semibold text-green-400 mb-4">Affordable Fares</h3>
 <p className="text-gray-300">Competitive pricing with transparent fare estimates.</p>
 </div>
 <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
 <h3 className="text-2xl font-semibold text-green-400 mb-4">Available 24/7</h3>
 <p className="text-gray-300">Ride anytime, anywhere in our service areas.</p>
 </div>
 </div>
 </section>
 
 {/* How it Works Section */}
 <section id="how-it-works" className="flex flex-col gap-8 items-center text-center">
 <h2 className="text-4xl font-bold text-green-500 mb-8">How It Works</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
 <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
 <h3 className="text-2xl font-semibold text-green-400 mb-4">1. Book Your Ride</h3>
 <p className="text-gray-300">Use our app to enter your destination and request a ride.</p>
 </div>
 <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
 <h3 className="text-2xl font-semibold text-green-400 mb-4">2. Get Picked Up</h3>
 <p className="text-gray-300">A nearby driver will accept your request and pick you up.</p>
 </div>
 <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
 <h3 className="text-2xl font-semibold text-green-400 mb-4">3. Enjoy Your Trip</h3>
 <p className="text-gray-300">Relax and enjoy a comfortable ride to your destination.</p>
 </div>
 </div>
 </section>

 {/* Call to Action Section (Download) */}
 <section id="download" className="flex flex-col gap-8 items-center text-center bg-green-700 p-10 rounded-lg shadow-lg">
 <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Ride?</h2>
 <p className="text-xl text-green-200">Download the RideShare Kenya app today and experience the difference.</p>
 <div className="flex gap-4 flex-col sm:flex-row items-center justify-center">
 {/* Replace with actual app store links */}
 <a href="#" className="bg-white text-green-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">Download on the App Store</a>
 <a href="#" className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300">Get it on Google Play</a>
 </div>
 </section>

 {/* Footer */}
 <footer className="flex gap-[24px] flex-wrap items-center justify-center text-gray-400 text-sm mt-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
 src="/privacy.svg" // Assuming you have icons for these
 alt="Privacy Policy icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
 src="/terms.svg" // Assuming you have icons for these
 alt="Terms of Service icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
 src="/contact.svg" // Assuming you have icons for these
 alt="Contact Us icon"
            width={16}
            height={16}
          />
 Contact Us
        </a>
      </footer>
    </div>
  );
}