import React from "react";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white text-sm mb-0">
      {/* Top Contact Info Section */}
      <div className="flex flex-wrap justify-around items-center border-b border-gray-600 py-4 px-6 text-center md:text-left">
        <div className="flex items-center gap-2 mb-3 md:mb-0">
          <PlaceOutlinedIcon className="text-red-500" />
          <p>
            54B, Tailstoi Town 5238 MT,
            <br />
            La city, IA 522364
          </p>
        </div>

        <div className="flex items-center gap-2 mb-3 md:mb-0">
          <EmailOutlinedIcon className="text-red-500" />
          <p>
            Email us :
            <br />
            contact@autorex.com
          </p>
        </div>

        <div className="flex items-center gap-2">
          <PhoneOutlinedIcon className="text-red-500" />
          <p>
            Call us on :
            <br />
            <span className="font-bold">+1800 456 7890</span>
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 py-10">
        {/* About Text */}
        <div>
          <p className="text-gray-300 leading-relaxed">
            Capitalize on low hanging fruit to identify a ballpark value-added
            activity to beta test. Override the digital divide with additional
            clickthroughs.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Home</li>
            <li>About Us</li>
            <li>Appointment</li>
            <li>Testimonials</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Performance Upgrade</li>
            <li>Transmission Service</li>
            <li>Break Repair & Service</li>
            <li>Engine Service & Repair</li>
            <li>Tyre & Wheels</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-300 mb-4">
            Get latest updates and offers.
          </p>
          <div className="flex gap-3">
            <a href="#" className="border border-gray-400 p-2 rounded-full hover:bg-red-500">
              <FacebookRoundedIcon fontSize="small" />
            </a>
            <a href="#" className="border border-gray-400 p-2 rounded-full hover:bg-red-500">
              <LinkedInIcon fontSize="small" />
            </a>
            <a href="#" className="border border-gray-400 p-2 rounded-full hover:bg-red-500">
              <TwitterIcon fontSize="small" />
            </a>
            <a href="#" className="border border-gray-400 p-2 rounded-full hover:bg-red-500">
              <GoogleIcon fontSize="small" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-xs">
        © {new Date().getFullYear()} Abe Garage. All rights reserved.
      </div>
    </footer>
  );
}
