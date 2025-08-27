import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Settings, Eye, Truck, Cpu, Camera, Database, Award, Shield, Globe, Leaf } from 'lucide-react';
import Section from '@/components/layout/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trackPageView } from '@/lib/analytics';

const processSteps = [
  {
    icon: Package,
    title: 'Raw Material',
    description: 'Premium fiber selection with rigorous quality testing and sustainable sourcing.',
    color: 'bg-primary',
  },
  {
    icon: Settings,
    title: 'Processing',
    description: 'Advanced spinning and weaving with computer-controlled precision machinery.',
    color: 'bg-chart-1',
  },
  {
    icon: Eye,
    title: 'Quality Control',
    description: 'AI-powered inspection systems ensuring zero-defect production standards.',
    color: 'bg-chart-2',
  },
  {
    icon: Truck,
    title: 'Delivery',
    description: 'Global logistics network with real-time tracking and sustainable packaging.',
    color: 'bg-chart-4',
  },
];

const equipment = [
  {
    icon: Cpu,
    title: 'Smart Looms',
    description: 'IoT-enabled weaving machines with predictive maintenance',
  },
  {
    icon: Camera,
    title: 'Vision Systems',
    description: 'Computer vision for real-time defect detection',
  },
  {
    icon: Database,
    title: 'Data Analytics',
    description: 'Big data processing for production optimization',
  },
];

const certifications = [
  {
    icon: Award,
    title: 'ISO 9001',
    description: 'Quality Management',
    color: 'bg-primary',
  },
  {
    icon: Leaf,
    title: 'OEKO-TEX',
    description: 'Eco-Friendly Standards',
    color: 'bg-chart-2',
  },
  {
    icon: Shield,
    title: 'WRAP',
    description: 'Workplace Standards',
    color: 'bg-chart-1',
  },
  {
    icon: Globe,
    title: 'GOTS',
    description: 'Global Organic Textiles',
    color: 'bg-chart-4',
  },
];

const stats = [
  { value: '500K+', label: 'Daily Production Capacity (meters)', color: 'text-primary' },
  { value: '99.8%', label: 'Quality Pass Rate', color: 'text-chart-1' },
  { value: '24/7', label: 'Continuous Operations', color: 'text-chart-2' },
  { value: '95%', label: 'Waste Reduction', color: 'text-chart-4' },
];

export default function Manufacturing() {
  useEffect(() => {
    trackPageView('/manufacturing');
  }, []);

  return (
    <div className="pt-20" data-testid="manufacturing-page">
      {/* Hero Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Advanced <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">Manufacturing</span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              State-of-the-art facilities powered by Industry 4.0 technologies, ensuring precision, quality, and efficiency at every step.
            </motion.p>
          </div>

          {/* Manufacturing Hero Image */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
              alt="Futuristic textile factory with automated machinery"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl flex items-end">
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-2">Smart Manufacturing Hub</h3>
                <p className="text-white/80">AI-powered production lines with real-time quality monitoring</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Production Statistics */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Production Excellence</h2>
            <p className="text-xl text-muted-foreground">
              Numbers that showcase our manufacturing capabilities and quality standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-dark rounded-xl p-6 text-center hover-lift"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`stat-${index}`}
              >
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Process Steps */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Manufacturing Process</h2>
            <p className="text-xl text-muted-foreground">
              From raw materials to finished products, our streamlined process ensures consistent quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="glass-dark rounded-xl p-6 text-center hover-lift"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`process-step-${index}`}
              >
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Equipment Showcase */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Cutting-Edge Equipment</h3>
              <p className="text-xl text-muted-foreground">
                Our manufacturing facility houses the latest in textile technology, from automated looms to AI-powered quality control systems.
              </p>
              
              <div className="space-y-4">
                {equipment.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    data-testid={`equipment-${index}`}
                  >
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                alt="High-tech manufacturing equipment"
                className="rounded-xl shadow-lg hover-lift"
              />
              <img
                src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                alt="Advanced textile machinery in modern factory"
                className="rounded-xl shadow-lg hover-lift"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Quality Certifications */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Quality Certifications</h2>
            <p className="text-xl text-muted-foreground">
              International standards and certifications that validate our commitment to quality
            </p>
          </div>

          <Card className="glass-dark">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    data-testid={`certification-${index}`}
                  >
                    <div className={`w-16 h-16 ${cert.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <cert.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Innovation Showcase */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Innovation in Action</h2>
            <p className="text-xl text-muted-foreground">
              Pioneering technologies that set new standards in textile manufacturing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-dark hover-lift">
              <CardContent className="p-6">
                <Badge className="mb-4">AI Technology</Badge>
                <h3 className="text-xl font-semibold mb-3">Predictive Maintenance</h3>
                <p className="text-muted-foreground">
                  Machine learning algorithms predict equipment failures before they occur, reducing downtime by 90%.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-dark hover-lift">
              <CardContent className="p-6">
                <Badge className="mb-4">IoT Integration</Badge>
                <h3 className="text-xl font-semibold mb-3">Smart Monitoring</h3>
                <p className="text-muted-foreground">
                  Real-time monitoring of production parameters with automatic adjustments for optimal quality.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-dark hover-lift">
              <CardContent className="p-6">
                <Badge className="mb-4">Automation</Badge>
                <h3 className="text-xl font-semibold mb-3">Robotic Systems</h3>
                <p className="text-muted-foreground">
                  Automated material handling and quality inspection systems ensuring consistent production.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
