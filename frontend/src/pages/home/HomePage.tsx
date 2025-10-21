import React from 'react'
import Layout from '../../components/layout/Layout'
import heroImage from '../../assets/hero.jpg'
import YouTubeIcon from '@mui/icons-material/YouTube';
import oilimage from '../../assets/oil-image1.jpg'
import oilimage2 from '../../assets/oil-image2.jpg'

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
            <span className="text-red-600 text-[80PX] mr-2"><YouTubeIcon/></span>
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
          <button className=' text-white font-semibold py-3 px-8 uppercase tracking-wider text-sm hover:bg-red-700 transition duration-300'>
            Read More
          </button>
        </div>
      </section>

      {/* third section */}
     
     <section className='py-16 px-4 md:px-16 '>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bring in the cable car with optimal strategies to ensure proactive domination. In the current cloud situation, any third party is a great way to start your investment. But at the end of the day, going forward, a new normal that has evolved from here is on the runway heading towards a streamlined cloud solution.
          </p>
        </div>

        {/* Services Grid */}
        
      </section>
      
      <section></section>
      <section></section>
      <section></section>
      <section></section>
    </Layout>
  )
}
