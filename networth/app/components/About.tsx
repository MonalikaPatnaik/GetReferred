import { motion } from "framer-motion";

// Company logo data
const companyData = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
  },
  {
    name: "Amazon",
    logo: "https://cdn.logojoy.com/wp-content/uploads/20230629132639/current-logo-600x338.png",
  },
  {
    name: "Microsoft",
    logo: "https://pngimg.com/uploads/microsoft/microsoft_PNG4.png",
  },
  {
    name: "Apple",
    logo: "https://cdn.icon-icons.com/icons2/2699/PNG/512/apple_logo_icon_168588.png",
  },
  {
    name: "Facebook",
    logo: "https://banner2.cleanpng.com/20180806/xqr/b88519fb9b5d5ce25c0f2a73eab7810d.webp",
  },
  {
    name: "Netflix",
    logo: "https://cdn.prod.website-files.com/5ee732bebd9839b494ff27cd/5ee732bebd98393d75ff281d_580b57fcd9996e24bc43c529.png",
  },
  {
    name: "American Express",
    logo: "https://w7.pngwing.com/pngs/382/146/png-transparent-american-express-logo-icons-logos-emojis-iconic-brands.png",
  },
  {
    name: "IBM",
    logo: "https://animationvisarts.com/wp-content/uploads/2021/01/IBM-Logo-Design-1972-present.png",
  },
  {
    name: "Intel",
    logo: "https://logos-world.net/wp-content/uploads/2021/09/Intel-Logo-2006-2020-700x394.png",
  },
  {
    name: "Oracle",
    logo: "https://banner2.cleanpng.com/20180816/pqy/474842f9870048b1c2b5eb21e3b8515d.webp",
  },
  {
    name: "Salesforce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1280px-Salesforce.com_logo.svg.png",
  },
  {
    name: "Adobe",
    logo: "https://logos-world.net/wp-content/uploads/2020/06/Adobe-Logo.png",
  },
  {
    name: "Intuit",
    logo: "https://banner2.cleanpng.com/20180413/ijq/kisspng-intuit-logo-chief-executive-management-id-5ad051d2658c12.600728071523601874416.jpg",
  },
  {
    name: "Uber",
    logo: "https://download.logo.wine/logo/Uber/Uber-Logo.wine.png",
  },
  {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png",
  },
  {
    name: "Cisco",
    logo: "https://1000logos.net/wp-content/uploads/2016/11/Cisco-logo.png",
  },
  {
    name: "Pwc",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Logo-pwc.png",
  },
  {
    name: "Atlassian",
    logo: "https://assets.themuse.com/uploaded/companies/741/small_logo.png?v=7f5c1ad7a79da7f23abbb7b3967b320e1fe8f93c2843ce272b4d602e51474423",
  },
  {
    name: "Sprinklr",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/Sprinklr_Logo.png",
  },
  {
    name: "Visa",
    logo: "https://purepng.com/public/uploads/large/purepng.com-visa-logologobrand-logoiconslogos-251519938794uqvcz.png",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Team member data
const teamData = [
  {
    name: "Saloni Gupta",
    role: "Founder",
    bio: "Upcoming SDE at Wells Fargo",
  },
  {
    name: "Monalika Patnaik",
    role: "Tech Lead",
    image: "https://example.com/jane.jpg",
    bio: "Upcoming SDE at Citi Bank",
  },
  {
    name: "Nitya Singhal",
    role: "Tech Lead",
    image: "https://example.com/michael.jpg",
    bio: "Upcoming SDE at Oracle",
  },
  {
    name: "Riya Agarwal",
    role: "Founder",
    image: "https://example.com/sara.jpg",
    bio: "Upcoming SWE at Microsoft",
  },
];



// About Component
const About = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header Section */}
      <motion.h1
        className="text-5xl font-bold text-center mb-12 text-gray-800"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Get Referred in <span className="text-teal-600">Top Companies</span>🚀
      </motion.h1>

      {/* Company Logos Section */}
      <motion.div
        className="grid grid-cols-3 md:grid-cols-5 gap-8 max-w-6xl mx-auto mb-12"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {companyData.map((company, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{ backgroundColor: "#ebf9ff" }}
            variants={fadeInUp}
          >
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="max-w-full max-h-12 object-contain"
            />
          </motion.div>
        ))}
      </motion.div>

      <section id="who-are-we" className="mt-12">
        <motion.h2
          className="text-4xl font-semibold text-center mb-8 text-gray-800"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Who Are We
        </motion.h2>
      </section>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {teamData.map((member, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            variants={fadeInUp}
          >
            {/* <img
              src={member.image}
              alt={`${member.name}'s profile`}
              className="w-24 h-24 rounded-full object-cover mb-4"
            /> */}
            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
            <p className="text-teal-600 font-semibold">{member.role}</p>
            <p className="text-gray-600 text-center mt-2">{member.bio}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default About;
