import React from "react";
import ContactUs from '../../assets/CardsImages/ContactUs.png'

export default function ContactPage() {
  return (
    <section id="contact" className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10">

            <span className="text-sm font-semibold tracking-widest text-slate-500 uppercase">
              Contact Us
            </span>

            <h1 className="text-4xl font-bold text-slate-900 mt-3">
              Get In Touch
            </h1>

            <p className="text-slate-600 mt-4 mb-8">
              Have questions about our services? We'd love to hear from you.
              Send us a message and our team will respond as soon as possible.
            </p>

            <form action={"https://formspree.io/f/mnqebbdo"} method="POST" onSubmit={(e) => {
              setTimeout(() => e.target.reset(), 100);
            }} className="space-y-5">

              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Subject</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Message</span>
                </label>
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Write your message..."
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn w-full bg-slate-700 hover:bg-slate-800 text-white border-none"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <img
              src={ContactUs}
              alt="Contact Us"
              className="w-full max-w-lg object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}