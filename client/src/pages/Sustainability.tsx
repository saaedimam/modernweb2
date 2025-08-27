import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Recycle, Zap, Users, Target, Droplets, Leaf, Check } from 'lucide-react';
import Section from '@/components/layout/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { trackPageView } from '@/lib/analytics';

const pillars = [
  {
    icon: Recycle,
    title: 'Circular Economy',
    description: 'Implementing closed-loop production systems that minimize waste and maximize resource efficiency through innovative recycling technologies.',
    achievements: [
      '95% waste reduction achieved',
      'Water recycling systems',
      'Material recovery programs',
    ],
    color: 'bg-chart-2',
  },
  {
    icon: Zap,
    title: 'Clean Energy',
    description: 'Transitioning to 100% renewable energy sources including solar, wind, and biomass to power our manufacturing operations sustainably.',
    achievements: [
      '80% renewable energy usage',
      'Solar panel installations',
      'Carbon footprint reduction',
    ],
    color: 'bg-chart-4',
  },
  {
    icon: Users,
    title: 'Social Impact',
    description: 'Creating positive social impact through fair labor practices, community development, and educational initiatives for sustainable growth.',
    achievements: [
      'Fair trade certified',
      'Employee welfare programs',
      'Community development',
    ],
    color: 'bg-chart-1',
  },
];

const metrics = [
  { label: 'Water Usage Reduction', value: 40, color: 'bg-chart-2' },
  { label: 'Carbon Footprint Reduction', value: 60, color: 'bg-chart-4' },
  { label: 'Renewable Energy', value: 85, color: 'bg-primary' },
  { label: 'Waste Reduction', value: 95, color: 'bg-chart-1' },
];

const goals = [
  {
    icon: Target,
    title: 'Carbon Neutral Operations',
    description: 'Achieve net-zero carbon emissions across all manufacturing facilities through renewable energy and carbon offset programs.',
    timeline: '2030',
  },
  {
    icon: Droplets,
    title: 'Water Positive Impact',
    description: 'Return more clean water to communities than we use in our production processes through advanced treatment systems.',
    timeline: '2028',
  },
  {
    icon: Leaf,
    title: '100% Sustainable Materials',
    description: 'Source all raw materials from certified sustainable suppliers and implement regenerative agriculture practices.',
    timeline: '2032',
  },
];

const initiatives = [
  {
    title: 'Solar Power Installation',
    description: '5MW solar farm reducing carbon emissions by 3,000 tons annually',
    status: 'Completed',
    progress: 100,
  },
  {
    title: 'Water Treatment Plant',
    description: 'Advanced wastewater treatment facility with 99.5% water recovery',
    status: 'In Progress',
    progress: 75,
  },
  {
    title: 'Community Education Program',
    description: 'Training 1,000+ local workers in sustainable practices',
    status: 'Ongoing',
    progress: 60,
  },
];

export default function Sustainability() {
  useEffect(() => {
    trackPageView('/sustainability');
  }, []);

  return (
    <div className="pt-20" data-testid="sustainability-page">
      {/* Hero Section */}
      <Section>
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sustainable <span className="bg-gradient-to-r from-chart-2 to-chart-4 bg-clip-text text-transparent">Future</span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Leading the textile industry towards a sustainable future through innovative practices, renewable energy, and circular economy principles.
          </motion.p>

          {/* Hero Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
              alt="Sustainable manufacturing facility with solar panels"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover hover-lift"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl flex items-end">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Green Manufacturing Hub</h3>
                <p className="text-white/80">Solar-powered facility with zero-waste production</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Sustainability Pillars */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Sustainability Pillars</h2>
            <p className="text-xl text-muted-foreground">
              Three core areas driving our commitment to environmental and social responsibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`pillar-${index}`}
              >
                <Card className="glass-dark hover-lift card-3d h-full">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${pillar.color} rounded-full flex items-center justify-center mb-6`}>
                      <pillar.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                    <p className="text-muted-foreground mb-6">{pillar.description}</p>
                    <ul className="space-y-2 text-sm">
                      {pillar.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-center">
                          <Check className="w-4 h-4 text-chart-2 mr-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Impact Metrics */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Environmental Impact Metrics</h2>
            <p className="text-xl text-muted-foreground">
              Measurable progress toward our sustainability goals
            </p>
          </div>

          <Card className="glass-dark">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    data-testid={`metric-${index}`}
                  >
                    <div className="text-4xl font-bold text-chart-2 mb-2">{metric.value}%</div>
                    <div className="text-muted-foreground mb-3">{metric.label}</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${metric.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Current Initiatives */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Current Initiatives</h2>
            <p className="text-xl text-muted-foreground">
              Active projects driving sustainable transformation
            </p>
          </div>

          <div className="space-y-6">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`initiative-${index}`}
              >
                <Card className="glass-dark hover-lift">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                        <p className="text-muted-foreground">{initiative.description}</p>
                      </div>
                      <div className="text-right mt-4 md:mt-0">
                        <div className="text-sm text-muted-foreground">{initiative.status}</div>
                        <div className="text-2xl font-bold text-primary">{initiative.progress}%</div>
                      </div>
                    </div>
                    <Progress value={initiative.progress} className="h-2" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Future Goals */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">2030 Sustainability Goals</h2>
            <p className="text-xl text-muted-foreground">
              Ambitious targets for the next decade of sustainable innovation
            </p>
          </div>

          <div className="space-y-8">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                className="glass-dark rounded-xl p-8 hover-lift"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`goal-${index}`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <goal.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-2xl font-bold">{goal.title}</h3>
                      <div className="text-lg font-semibold text-primary">Target: {goal.timeline}</div>
                    </div>
                    <p className="text-muted-foreground">{goal.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section background="muted">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Sustainable Journey</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Partner with us to create a more sustainable future for the textile industry. Together, we can make a meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Partnership Opportunities
              </button>
              <button className="glass px-8 py-3 rounded-lg hover:bg-primary/10 transition-colors font-medium">
                Sustainability Report
              </button>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
