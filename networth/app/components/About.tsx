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
    name: "Salesforce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1280px-Salesforce.com_logo.svg.png",
  },
  {
    name: "Atlassian",
    logo: "https://assets.themuse.com/uploaded/companies/741/small_logo.png?v=7f5c1ad7a79da7f23abbb7b3967b320e1fe8f93c2843ce272b4d602e51474423",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// About Component
const About = () => {
  return (
    <div className=" py-12 px-6 sm:px-12">

      {/* Company Logos Section */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
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
            style={{ backgroundColor: "white" }}
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
    </div>
  );
};

export default About;
