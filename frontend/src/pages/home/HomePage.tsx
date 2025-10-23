import React from 'react'
import Layout from '../../components/layout/Layout'
import heroImage from '../../assets/hero.jpg'
import YouTubeIcon from '@mui/icons-material/YouTube';
import oilimage from '../../assets/oil-image1.jpg'
import oilimage2 from '../../assets/oil-image2.jpg'
import s1 from '../../assets/s1.png'
import s2 from '../../assets/s2.png'
import s3 from '../../assets/s3.png'
import s4 from '../../assets/s5.png'
import s5 from '../../assets/s5.png'
import s6 from '../../assets/s6.png'
import carDashboard from '../../assets/watch.jpg';
import mechanic from '../../assets/mechanic.png'
import pinsa from '../../assets/pinsa.png'
import award from '../../assets/award.png'
import tag from '../../assets/tag.png'

export default function HomePage() {
  return (
    <Layout>
      {/* hero */}
      <section className="h-[80vh]  bg-cover bg-center bg-no-repeat text-white flex items-center p-8 md:p-16 relative"
        style={{ 
         backgroundImage: `url('${heroImage}')`, // Replace with your image path
          // Overlay to darken the background image
          // backgroundBlendMode: 'multiply',         
        }}>
         <div className="absolute inset-0 "></div>
        <div className="relative z-10">
          <p className="text-red-600 uppercase font-medium">Working since 1982</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-2 leading-tight">
            Tuneup Your Car <br /> to Next Level
          </h1>
          <div className="flex items-center mt-6 cursor-pointer">
            <button className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 shadow-lg">
        <YouTubeIcon/>
      </button>
            <span className="uppercase tracking-widest text-sm font-semibold hover:text-red-400">
              About us
            </span>
          </div>
        </div>
      </section>
      {/* hero */}
      
      {/* second section */}

      <section className="py-16 px-4 md:px-16 flex flex-wrap items-center">
        {/* Left Column (Images) */}
        <div className="w-full md:w-1/2 lg:w-5/12 relative h-96 md:h-auto mb-8 md:mb-0">
          <div className="flex justify-center md:justify-end space-x-2">
    {/* Image 1: Adjust width, remove full width on mobile for better thinness */}
    <img 
        src={oilimage2}
        alt="Car Maintenance" 
        className="w-4/12 md:w-3/12 h-64 object-cover shadow-2xl"
    />
    
    {/* Image 2: Adjust width AND remove mt-16 to align tops */}
    <img 
        src={oilimage}
        alt="Engine Details" 
        // W-4/12 makes it thin on ALL screen sizes (sm:block means it's still hidden on small screens)
        // REMOVED: mt-16
        className="w-4/12 md:w-3/12 h-64 object-cover shadow-2xl hidden sm:block" 
    />
</div>
          {/* Badge */}
          <div className="absolute bottom-[-1rem] left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 bg-red-600 text-white p-3 rounded-full text-center font-bold text-lg shadow-xl">
              <span className='text-3xl'>24</span> <br/> Years
          </div>
        </div>

        {/* Right Column (Text) */}
        <div className="w-full md:w-1/2 lg:w-7/12 md:pl-16">
          <p className="text-red-600 uppercase font-medium text-sm">Working since 1982</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            We have 24 years experience
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Bring in the cable car with optimal strategies to ensure proactive domination. In the current cloud situation, any third party is a great way to start your investment. But at the end of the day, going forward, a new normal that has evolved from here is on the runway heading towards a streamlined cloud solution. We have multiple blueprints for attracting. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse deserunt voluptatum iusto qui, tenetur dolorem eum quod quo soluta obcaecati ullam vero doloremque enim aperiam eveniet aspernatur ipsam quia quas!
          </p>
          <button className=' text-white font-semibold py-3 px-8 uppercase tracking-wider text-sm hover:bg-red-700 transition duration-300 '>
            Read More
          </button>
        </div>
      </section>

      {/* third section */}
     
     <section className='py-16 px-4 md:px-16 bg-[repeating-linear-gradient(45deg,#f9f9fb_0px,#f9f9fb_2px,#ffffff_2px,#ffffff_4px)] '>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bring in the cable car with optimal strategies to ensure proactive domination. In the current cloud situation, any third party is a great way to start your investment. But at the end of the day, going forward, a new normal that has evolved from here is on the runway heading towards a streamlined cloud solution.
          </p>
        </div>
        
        <div className='ml-[20%]'>
          <div className='flex flex-row gap-8 mb-9'>

            <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 min-w-[300px]">
  <div>
    <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
      Service and Repairs
    </p>
    <h3 className="text-xl font-bold text-[#002060] leading-snug">
      Performance Upgrade
    </h3>
  </div>

  <div className="flex justify-between items-end mt-6">
    <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
      READ MORE +
    </p>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
      <img src={s1} alt="icon" className="w-8 h-8 opacity-70" />
    </div>
  </div>
</div>

            <div>
              <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 min-w-[300px]">
  <div>
    <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
      Service and Repairs
    </p>
    <h3 className="text-xl font-bold text-[#002060] leading-snug">
      Transmisstion Service
    </h3>
  </div>

  <div className="flex justify-between items-end mt-6">
    <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
      READ MORE +
    </p>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
      <img src={s2} alt="icon" className="w-8 h-8 opacity-70" />
    </div>
  </div>
</div>

            </div>
            <div>
              <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 min-w-[300px]">
  <div>
    <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
      Service and Repairs
    </p>
    <h3 className="text-xl font-bold text-[#002060] leading-snug">
      Break Repair & Service
    </h3>
  </div>

  <div className="flex justify-between items-end mt-6">
    <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
      READ MORE +
    </p>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
      <img src={s3} alt="icon" className="w-8 h-8 opacity-70" />
    </div>
  </div>
</div>

            </div>
          </div>
        {/* end of first row */}
        
          <div className='flex flex-row gap-8'>
             <div>
               <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 min-w-[300px]">
  <div>
    <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
      Service and Repairs
    </p>
    <h3 className="text-xl font-bold text-[#002060] leading-snug">
      Engine Service & Repair
    </h3>
  </div>

  <div className="flex justify-between items-end mt-6">
    <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
      READ MORE +
    </p>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
      <img src={s4} alt="icon" className="w-8 h-8 opacity-70" />
    </div>
  </div>
</div>

             </div>
             {/* second row second item */}
             <div>
               
               <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 min-w-[300px]">
  <div>
    <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
      Service and Repairs
    </p>
    <h3 className="text-xl font-bold text-[#002060] leading-snug">
     Tyre & Wheels
    </h3>
  </div>

  <div className="flex justify-between items-end mt-6">
    <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
      READ MORE +
    </p>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
      <img src={s5} alt="icon" className="w-8 h-8 opacity-70" />
    </div>
  </div>
</div>

             </div>
             {/* second row third item */}
             <div>
              <div className="relative bg-white border-b-4 border-red-600 p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 min-w-[300px]">
  <div>
    <p className="text-xs uppercase tracking-wide text-[#4d5b7c] font-semibold mb-2">
      Service and Repairs
    </p>
    <h3 className="text-xl font-bold text-[#002060] leading-snug">
      Denting & Painting
    </h3>
  </div>

  <div className="flex justify-between items-end mt-6">
    <p className="text-sm font-semibold text-red-600 cursor-pointer hover:underline">
      READ MORE +
    </p>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
      <img src={s6} alt="icon" className="w-8 h-8 opacity-70" />
    </div>
  </div>
</div>

             </div>
          </div>
        </div>
        {/* Services Grid */}
        
      </section>
      {/* 4th section */}
      <section className="flex flex-col md:flex-row min-h-[400px]"> 
      {/* Left Column - Red Background with Text */}
      <div className="flex-1 bg-red-600 p-8 md:p-16 flex items-center justify-center">
        <div className="max-w-xl text-white text-center md:text-left">
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Quality Service And <br /> Customer Satisfaction !!
          </h2>

          {/* Description */}
          <p className="text-[20px] md:text-xl leading-relaxed">
            We utilize the most recent symptomatic gear to ensure your vehicle is fixed
            or adjusted appropriately and in an opportune manner. We are an individual
            from Professional Auto Service, a first-class execution arrange, where free
            assistance offices share shared objectives of being world-class car
            administration focuses.
          </p>
        </div>
      </div>

      {/* Right Column - Image Background */}
      <div 
        className="flex-1 bg-cover bg-center" 
        style={{ backgroundImage: `url(${carDashboard})` }}
      >
        {/* This div is intentionally left empty. The image is set as a background. */}
      </div>
    </section>

    {/* 5th section */}

      <section className="py-16 px-6 md:px-16 bg-white">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    {/* Left Column – Why Choose Us */}
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#002060] mb-2">
        Why Choose Us <span className="border-b-2 border-red-600 inline-block w-8 ml-2"></span>
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-md">
        Bring to the table win-win survival strategies to ensure proactive domination.
        At the end of the day, going forward, a new normal that has evolved from
        generation heading towards.
      </p>

      <div className="space-y-5">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <img src={mechanic} alt="" className="w-6 h-6 text-red-600" />
          <p className="text-[#002060] font-semibold">Certified Expert Mechanics</p>
        </div>

        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <img src={pinsa} alt="" className="w-6 h-6 text-red-600 font-bold" />
          <p className="text-[#002060] font-semibold">Fast And Quality Service</p>
        </div>

        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <img src={tag} alt="" className="w-6 h-6 text-red-600 font-bold" />
          <p className="text-[#002060] font-semibold">Best Prices in Town</p>
        </div>

        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <img src={award} alt="" className="w-6 h-6 text-red-600" />
          <p className="text-[#002060] font-semibold">Awarded Workshop</p>
        </div>
      </div>
    </div>

    {/* Right Column – Additional Services */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#002060] mb-4">
          Additional Services <span className="border-b-2 border-red-600 inline-block w-8 ml-2"></span>
        </h2>

        <ul className="space-y-2 text-gray-700 text-sm">
          {[
            'General Auto Repair & Maintenance',
            'Transmission Repair & Replacement',
            'Tire Repair and Replacement',
            'State Emissions Inspection',
            'Break Job / Break Services',
            'Electrical Diagnostics',
            'Fuel System Repairs',
            'Starting and Charging Repair',
            'Steering and Suspension Work',
            'Emission Repair Facility',
            'Wheel Alignment',
            'Computer Diagnostic Testing',
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-red-600 font-bold">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden md:block h-[5%]">
        <img
          src={oilimage}
          alt="Additional Services"
          className="rounded-lg shadow-md"
          
        />
      </div>
    </div>
  </div>
</section>
{/* 6th */}

     <section
  className="relative bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white py-24 px-6 md:px-16 overflow-hidden"
  style={{
    backgroundImage: `url(${carDashboard})`,
    backgroundSize: 'cover',
    backgroundPosition: 'right center',
  }}
>
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 max-w-3xl">
    <p className="uppercase tracking-wide text-sm text-red-500 mb-2">Working since 1992</p>
    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
      We are leader <br /> in <span className="text-red-500">Car Mechanical Work</span>
    </h1>

    <div className="flex items-center gap-5">
      <button className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 shadow-lg">
        <YouTubeIcon/>
      </button>
      <div>
        <p className="uppercase text-xs text-gray-300">Watch intro video</p>
        <p className="text-sm font-medium">About Us</p>
      </div>
    </div>
  </div>
</section>
    {/* 7th */}
    <section className="bg-gray-50 py-12 px-6 md:px-16 flex justify-center">
  <div className="bg-red-600 text-white w-full md:w-4/5 lg:w-3/4 rounded-md shadow-lg flex flex-col md:flex-row items-center justify-between p-8">
    <div className="text-center md:text-left mb-4 md:mb-0">
      <h3 className="text-xl md:text-2xl font-bold">Schedule Your Appointment Today</h3>
      <p className="text-sm text-gray-100 mt-1">
        Your Automotive Repair & Maintenance Service Specialist
      </p>
    </div>

    <div className="flex flex-col md:flex-row items-center gap-5">
      <p className="text-2xl font-bold tracking-wide">1800.456.7890</p>
      <button className="bg-white text-red-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition flex items-center gap-2">
        Contact Us →
      </button>
    </div>
  </div>
</section>

    </Layout>
  )
}
