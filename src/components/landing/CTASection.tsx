import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { ROUTES } from '../../utils/constants';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your College Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of students who are excelling academically while maintaining balance in
            their personal lives. Try StudySync AI free for 14 days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.DEMO}>
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[200px] bg-white text-blue-600 hover:bg-gray-50"
              >
                Try Interactive Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              className="min-w-[200px] bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-2 border-white"
            >
              Start Free Trial
            </Button>
          </div>
          <p className="text-blue-100 mt-6 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
