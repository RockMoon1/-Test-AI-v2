import { motion } from 'framer-motion';
import {
  Code2, Lightbulb, Users, Rocket, Github, Linkedin, Mail,
  CheckCircle2, Circle, Clock
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { milestones } from '../data/mockData';

export default function PortfolioPage() {
  const techStack = [
    { name: 'React 18', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Framer Motion', category: 'Animation' },
    { name: 'Supabase', category: 'Backend' },
    { name: 'Vite', category: 'Build Tool' },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Student-Centered Innovation',
      description: 'Every feature is designed with real student needs in mind, based on extensive research and feedback.',
    },
    {
      icon: Users,
      title: 'Holistic Approach',
      description: 'We believe success means balancing academics with personal growth, spiritual wellness, and creative pursuits.',
    },
    {
      icon: Rocket,
      title: 'Continuous Improvement',
      description: 'We iterate rapidly based on user feedback, always striving to deliver more value to our community.',
    },
  ];

  const statusIcons = {
    completed: CheckCircle2,
    'in-progress': Clock,
    planned: Circle,
  };

  const statusColors = {
    completed: 'text-green-500',
    'in-progress': 'text-yellow-500',
    planned: 'text-gray-400',
  };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Building the Future of
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Student Success
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              We're creating intelligent tools that help college students achieve their academic goals
              while maintaining balance and well-being in all areas of life.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <a href="https://github.com/RockMoon1/-Test-Ai-" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
              </a>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To empower college students with intelligent tools that foster academic excellence,
              personal growth, and spiritual wellness in a balanced, sustainable way.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="p-6 h-full text-center">
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern, cutting-edge technologies for optimal performance and user experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card hover className="p-6 text-center">
                  <Code2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="font-semibold text-gray-900">{tech.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{tech.category}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Development Roadmap</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our journey from concept to comprehensive platform. Here's what we've built and what's coming next.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const StatusIcon = statusIcons[milestone.status];
                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-20"
                  >
                    <div className="absolute left-6 top-6 transform -translate-x-1/2">
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <StatusIcon className={`w-6 h-6 ${statusColors[milestone.status]}`} />
                      </div>
                    </div>
                    <Card className="p-6">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                        <div className="text-sm text-gray-500">{milestone.date}</div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Let's Build Together</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Interested in partnering, investing, or just want to learn more about what we're building?
              We'd love to hear from you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:contact@studysync.ai">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </Button>
              </a>
              <a href="https://github.com/RockMoon1/-Test-Ai-" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="border-2 border-white text-white hover:bg-white/10">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="border-2 border-white text-white hover:bg-white/10">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
