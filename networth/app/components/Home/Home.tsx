import Img from '../../../public/assets/girl.png';
import Image from 'next/image';

const Home = () => {
  return (
    <section className="flex flex-col md:flex-row h-[calc(100vh-80px)]">

      <div className="flex-1 md:flex-[0.7] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect with Top Referrers in Your Industry</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">Find your next opportunity or help others advance their careers</p>
        <button className="bg-teal-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-teal-700">Get Started</button>
      </div>


      <div className="flex-1 md:flex-[0.3] flex items-center justify-center">
        <Image 
          src={Img} 
          alt="Hero Image"
          layout="intrinsic"
          width={500}
          height={500} 
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Home;
