import { Link } from '../components/Router';
import { Button } from '../components/ui/Button';
import {
  Link as LinkIcon,
  Zap,
  BarChart3,
  Shield,
  Globe,
  QrCode,
  Users,
  TrendingUp,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <LinkIcon className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LinkBoost VIP
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
                Pricing
              </Link>
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>The Ultimate Link Management Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Shorten, Track & Boost
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Your Links
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Professional URL shortener with advanced analytics, custom domains, bio pages, and
            landing page hosting. Everything you need to manage your online presence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">No credit card required • Free forever plan</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Create short links in seconds with our blazing fast infrastructure',
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                description: 'Track clicks, locations, devices, and more with real-time analytics',
              },
              {
                icon: Shield,
                title: 'Secure & Reliable',
                description: 'Enterprise-grade security with 99.9% uptime guarantee',
              },
              {
                icon: Globe,
                title: 'Custom Domains',
                description: 'Use your own branded domain for professional short links',
              },
              {
                icon: QrCode,
                title: 'QR Codes',
                description: 'Generate beautiful QR codes for your links instantly',
              },
              {
                icon: Users,
                title: 'Bio Pages',
                description: 'Create stunning bio pages with drag & drop builder',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Every Need
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your links professionally
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-blue-600 font-medium mb-4">
                <TrendingUp className="w-4 h-4" />
                Analytics Dashboard
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Track Every Click in Real-Time
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Get detailed insights into your link performance with our comprehensive analytics
                dashboard. Track clicks by country, device, browser, and more.
              </p>
              <ul className="space-y-3">
                {[
                  'Real-time click tracking',
                  'Geographic analytics',
                  'Device & browser breakdown',
                  'Referrer tracking',
                  'Custom time ranges',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 h-96 flex items-center justify-center">
              <BarChart3 className="w-32 h-32 text-blue-600 opacity-50" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 h-96 flex items-center justify-center">
              <Users className="w-32 h-32 text-purple-600 opacity-50" />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full text-purple-600 font-medium mb-4">
                <Users className="w-4 h-4" />
                Bio Pages
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Create Beautiful Bio Pages
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Build stunning bio pages with our drag & drop builder. Add buttons, social links,
                videos, and more. Perfect for Instagram, TikTok, and other social platforms.
              </p>
              <ul className="space-y-3">
                {[
                  'Drag & drop builder',
                  'Custom themes & colors',
                  'Social media integration',
                  'Analytics included',
                  'Mobile optimized',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Boost Your Links?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Join thousands of professionals using LinkBoost VIP to manage their online presence
          </p>
          <Link to="/signup">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LinkIcon className="w-6 h-6 text-blue-500" />
                <span className="text-lg font-bold text-white">LinkBoost VIP</span>
              </div>
              <p className="text-sm text-gray-400">
                Professional link management platform for modern marketers
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2024 LinkBoost VIP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
