export default function Footer() {
  return (
    <footer className="relative bg-gray-950 border-t border-gray-800 py-16">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo + mission */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Travelus</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Reimagining travel for the modern world.  
            Connecting people, places, and possibilities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#features" className="hover:text-indigo-600 transition">Features</a></li>
            <li><a href="#testimonials" className="hover:text-indigo-600 transition">Testimonials</a></li>
            <li><a href="#faqs" className="hover:text-indigo-600 transition">FAQs</a></li>
            <li><a href="#contact" className="hover:text-indigo-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-indigo-600 transition">Blog</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Guides</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Support</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Want to support?</h4>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-500 border border-gray-700 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Travelus. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-indigo-600 transition">Twitter</a>
          <a href="#" className="hover:text-indigo-600 transition">LinkedIn</a>
          <a href="#" className="hover:text-indigo-600 transition">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
