import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Factory, TrendingUp, Leaf, Award, Users, Target } from 'lucide-react';
import Section from '@/components/layout/Section';
import { Card, CardContent } from '@/components/ui/card';
import { trackPageView } from '@/lib/analytics';

const timeline = [
  {
    year: '1970',
    title: 'Foundation',
    description: 'Started with a single loom and a vision to transform the textile industry',
    icon: Factory,
    color: 'text-primary',
  },
  {
    year: '1995',
    title: 'Global Expansion',
    description: 'Established partnerships with leading fashion brands across Europe and North America',
    icon: TrendingUp,
    color: 'text-chart-1',
  },
  {
    year: '2020',
    title: 'Sustainability Focus',
    description: 'Pioneered sustainable manufacturing processes, becoming carbon neutral',
    icon: Leaf,
    color: 'text-chart-2',
  },
];

const leadership = [
  {
    name: 'Rahman Ahmed',
    position: 'Chief Executive Officer',
    description: 'Leading innovation and sustainable practices across all operations.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
  },
  {
    name: 'Fatima Khan',
    position: 'Chief Technology Officer',
    description: 'Driving digital transformation and manufacturing excellence.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
  },
  {
    name: 'Hassan Ali',
    position: 'Chief Operations Officer',
    description: 'Ensuring quality and efficiency in global operations.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
  },
];

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering the highest quality products and services',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Environmental responsibility in every aspect of our operations',
  },
  {
    icon: Users,
    title: 'People First',
    description: 'Investing in our workforce and community development',
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'Continuously advancing technology and manufacturing processes',
  },
];

export default function About() {
  useEffect(() => {
    trackPageView('/about');
  }, []);

  return (
    <div className="pt-20" data-testid="about-page">
      {/* Hero Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Crafting Excellence <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">Since 1970</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From humble beginnings to industry leadership, our journey represents five decades of innovation, quality, and sustainable manufacturing practices that have shaped the textile industry.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern office space with executive team"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover hover-lift"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Five decades of continuous growth, innovation, and commitment to excellence in textile manufacturing.
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className="glass-dark rounded-xl p-8 hover-lift"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`timeline-item-${index}`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${item.color === 'text-primary' ? 'bg-primary' : item.color === 'text-chart-1' ? 'bg-chart-1' : 'bg-chart-2'}`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-2">
                      <h3 className="text-2xl font-bold">{item.year}</h3>
                      <h4 className="text-xl font-semibold text-muted-foreground">{item.title}</h4>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Leadership Team */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the visionary leaders driving our company's success and innovation in the textile industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`leader-${index}`}
              >
                <Card className="glass-dark hover-lift card-3d text-center">
                  <CardContent className="p-6">
                    <img
                      src={leader.image}
                      alt={`${leader.name} portrait`}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-2">{leader.name}</h3>
                    <p className="text-primary mb-3 font-medium">{leader.position}</p>
                    <p className="text-sm text-muted-foreground">{leader.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Company Values */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The core principles that guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="glass-dark rounded-xl p-6 text-center hover-lift"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`value-${index}`}
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
