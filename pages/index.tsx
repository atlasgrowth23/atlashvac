import React from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Atlas HVAC | Digital Platform for HVAC Businesses</title>
        <meta name="description" content="Atlas HVAC helps local HVAC businesses get more leads with custom websites, marketing tools, and automated communication." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white border-b shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-2xl text-blue-700">Atlas<span className="text-gray-600">HVAC</span></div>
            <div>
              <Button variant="outline" className="mr-2">Login</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Solutions for HVAC Businesses</h1>
            <p className="text-xl text-gray-600 mb-8">Custom websites, marketing tools, and customer communication platforms built specifically for HVAC contractors.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button size="lg" className="text-lg px-8">Get Demo</Button>
              <Button size="lg" variant="outline" className="text-lg px-8">Learn More</Button>
            </div>
          </div>
        </section>

        {/* SMS Consent Section - This is what Twilio needs to see */}
        <section id="sms-consent" className="py-12 bg-gray-50 rounded-lg">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Stay Connected with SMS Updates</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">How to Opt-In for SMS Messages</h3>
              <p className="mb-4">
                When you schedule service through our platform, you can choose to receive text message updates about your appointment.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex mb-3">
                  <input type="checkbox" id="sms-consent-checkbox" className="mr-3 mt-1" />
                  <label htmlFor="sms-consent-checkbox" className="text-gray-700">
                    I agree to receive transactional and marketing text messages from Atlas HVAC and its service providers. 
                    Message frequency varies. Message and data rates may apply. 
                    Reply STOP to opt-out or HELP for help.
                  </label>
                </div>
                <p className="text-sm text-gray-500">
                  By checking this box, you consent to receiving automated text messages about your service appointments, 
                  special offers, and important updates from Atlas HVAC and the service providers in our network.
                </p>
              </div>
              
              <h4 className="font-medium mb-2">You can also opt-in by:</h4>
              <ul className="list-disc pl-5 mb-4">
                <li className="mb-1">Texting START to (888) 123-4567</li>
                <li className="mb-1">Responding YES to an invitation text</li>
                <li className="mb-1">Creating an account and enabling SMS notifications</li>
              </ul>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-4">
                <p className="font-medium mb-1">Sample opt-in confirmation:</p>
                <p className="text-gray-700 italic">
                  "Atlas HVAC: You are now subscribed to receive updates about your service appointments and special offers. 
                  For help, reply HELP. To stop receiving messages, reply STOP."
                </p>
              </div>
              
              <p className="text-sm text-gray-500">
                You can opt-out at any time by replying STOP to any message, 
                updating your communication preferences in your account settings,
                or contacting our support team.
              </p>
            </div>

            <div className="text-center">
              <Button size="lg" className="px-8">Schedule a Demo</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Atlas HVAC</h3>
              <p className="mb-4">Digital tools for HVAC businesses to grow their customer base and improve operational efficiency.</p>
              <p>© {new Date().getFullYear()} Atlas Growth. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <p className="mb-2">Email: info@atlasgrowth.ai</p>
              <p className="mb-2">Phone: (888) 123-4567</p>
              <p className="mb-2">SMS Support: Text HELP to (888) 123-4567</p>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/sms-terms" className="hover:text-white">SMS Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}