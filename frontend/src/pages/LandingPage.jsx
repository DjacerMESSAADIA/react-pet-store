import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import CountUp from "react-countup";
import { Typewriter } from "react-simple-typewriter";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-900/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <Typewriter
                words={["Every Pet Deserves a"]}
                loop={1}
                cursorBlinking
              />{" "}
              <span className="text-indigo-400">Loving Home</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Find your perfect companion among our carefully selected pets. We
              believe in creating perfect matches between pets and their future
              families.
            </p>
            <div className="mt-10 group flex gap-4">
              <Link
                to="/pets"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Find Your Pet
                <ArrowRightIcon className="ml-2 group-hover:translate-x-2 transition-all duration-300 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">
                {<CountUp duration={5} end={500} />}+
              </div>
              <div className="mt-2 text-lg font-medium text-gray-600">
                Pets Adopted
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">
                <CountUp duration={10} useEasing={true} delay={2} end={98} />%
              </div>
              <div className="mt-2 text-lg font-medium text-gray-600">
                Happy Families
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">24/7</div>
              <div className="mt-2 text-lg font-medium text-gray-600">
                Support Available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose Our Pet Store?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              We're committed to making pet adoption a joyful journey.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500 text-white mb-4">
                  <HeartIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Carefully Vetted
                </h3>
                <p className="mt-2 text-gray-600">
                  Every pet receives thorough health checks and behavioral
                  assessments to ensure they're ready for their new home.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500 text-white mb-4">
                  <UserGroupIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Expert Support
                </h3>
                <p className="mt-2 text-gray-600">
                  Our experienced team provides ongoing support and guidance
                  throughout your adoption journey.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500 text-white mb-4">
                  <ShieldCheckIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Perfect Match
                </h3>
                <p className="mt-2 text-gray-600">
                  We use our expertise to help match you with a pet that fits
                  perfectly with your lifestyle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
