import React from 'react'
import Layout from '../../components/layout/Layout'
import carDashboard from '../../assets/watch.jpg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
export default function Contact() {
  return (
    <Layout>
       <section 
      className="relative bg-gray-800 text-white pt-24 pb-12" // Increased padding for height
      style={{ backgroundImage: `url(${carDashboard})`, backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay to darken the image slightly, making text more readable */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Contact Us
        </h1>
        
        {/* Breadcrumbs */}
        <div className="mt-4 flex items-center space-x-2 text-sm">
          <span className=" text-red-500">Home</span>
          <span className="max-w-5" ><ArrowForwardIosIcon/></span>
          <span className="font-medium">About Us</span>
        </div>
      </div>
    </section>

    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column: Map/Business Card */}
          <div className="w-full lg:w-1/2">
            {/* Placeholder for the Map - Use an iframe or a React component like react-google-maps */}
            <div className="border border-gray-200 shadow-xl rounded-lg overflow-hidden h-[400px]">
                {/* NOTE: You should replace this div with an actual map component 
                  or an iframe pointing to Google Maps. 
                  This is just a visual placeholder matching the image's dimensions.
                */}
                <iframe
                    title="Google Map Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5752.411031443982!2d38.773984100781824!3d9.013657495786116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b859e260e7aa5%3A0xc3f851c8a4166767!2sKazanchis%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1761219361396!5m2!1sen!2set" 
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                ></iframe>
            </div>
          </div>
          
          {/* Right Column: Address and Contact Info */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Address
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Completely synergize resource taxing relationships via premier niche 
              markets. Professionally cultivate one-to-one customer service.
            </p>

            {/* Address Item */}
            <div className="flex items-start mb-6">
              <PlaceOutlinedIcon name="location" className='text-red-600' />
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Address:</p>
                <p className="text-gray-600">54B, Tailstor Town 5238 MT. Ia city, IA 5224</p>
              </div>
            </div>

            {/* Email Item */}
            <div className="flex items-start mb-6">
              <EmailOutlinedIcon name="email" className='text-red-600' />
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Email:</p>
                <p className="text-gray-600">contact@buildtruck.com</p>
              </div>
            </div>

            {/* Phone Item */}
            <div className="flex items-start">
              <PhoneOutlinedIcon name="phone" className='text-red-600' />
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Phone:</p>
                <p className="text-gray-600">1800 456 7890 / 1254 897 3654</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    </Layout>
  )
}
