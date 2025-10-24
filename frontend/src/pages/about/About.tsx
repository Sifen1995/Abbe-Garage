import React from 'react'
import Layout from '../../components/layout/Layout'
import carDashboard from '../../assets/watch.jpg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import oilimage from '../../assets/oil-image1.jpg'
import mechanicimg from '../../assets/about mechanic.png'
import oilimage2 from '../../assets/oil-image2.jpg'
import mechanic from '../../assets/mechanic.png'
import pinsa from '../../assets/pinsa.png'
import award from '../../assets/award.png'
import tag from '../../assets/tag.png'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';

export default function About() {
    const navigate=useNavigate()
    const handelContact=()=>{
    navigate('/contact')
  }
  return (
   <Layout >
    <div >
     <section 
      // Set relative, dark grey background, good top/bottom padding
      className="relative bg-gray-800 text-white pt-24 pb-12" 
      style={{ 
        backgroundImage: `url(${carDashboard})`, 
        backgroundBlendMode: 'overlay', // Blend the image with the background color
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      {/* Optional: Add a subtle overlay to darken the image if needed */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Content Container (Center Aligned) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          About Us
        </h1>
        
        {/* Breadcrumbs */}
        <div className="mt-4 flex items-center space-x-2 text-sm">
          <span className=" text-red-500">Home</span>
          <span className="max-w-5" ><ArrowForwardIosIcon/></span>
          <span className="font-medium">About Us</span>
        </div>
      </div>
    </section>

    {/* second section */}

    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Layout for Text and Image */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* Left Column: Text Content */}
          <div className="w-full lg:w-1/2">
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6 leading-tight">
              We are highly skilled mechanics <br /> for your car repair
            </h2>

            {/* Paragraph 1 */}
            <p className="text-gray-600 mb-4">
              Bring to the table win-win survival strategies to ensure proactive domination. 
              At the end of the day, going forward, a new normal that has evolved from 
              generation X is on the runway heading towards a streamlined cloud solution. 
              User generated content in real-time will have multiple touchpoints for offshoring.
            </p>
            
            {/* Paragraph 2 */}
            <p className="text-gray-600">
              Capitalize on low hanging fruit to identify a ballpark value added to beta test. 
              Override the digital divide with additional clickthroughs from DevOps. 
              Nanotechnology immersion along the information heading towards a streamlined 
              cloud solution. User generated content in real-time will have multiple.
            </p>
          </div>
          
          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <img 
                src={mechanicimg} 
                alt="Highly skilled mechanic holding a car tire" 
                className="w-full h-auto object-cover max-h-[450px]" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 px-4 md:px-16 flex flex-wrap mr-[11%]  items-center">
        {/* Left Column (Images) */}
        <div className="w-full md:w-1/2 lg:w-5/12 relative h-96 md:h-auto mb-8 md:mb-0">
          <div className="flex justify-center md:justify-end space-x-2">
    
    <img 
        src={oilimage2}
        alt="Car Maintenance" 
        className="w-1/2 md:w-3/12 h-64 object-cover shadow-2xl"
    />
    
    
    <img 
        src={oilimage}
        alt="Engine Details" 
        
        className="w-1/2 md:w-3/12 h-64 object-cover shadow-2xl hidden sm:block" 
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
{/* 2nd  */}
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
      <button className="bg-white text-red-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition flex items-center gap-2" onClick={handelContact}>
        Contact Us →
      </button>
    </div>
  </div>
</section>
    </div> 
   </Layout>
  )
}
