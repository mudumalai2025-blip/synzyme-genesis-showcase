import React from 'react';
import Tilt from 'react-parallax-tilt';

export default function RealWorld() {
  const steps = [
    {
      id: "01",
      title: "Wet-Lab Synthesis & Cloning",
      desc: "The in-silico designs (like Synzyme_v2_021) are synthesized via codon-optimized gene synthesis. They are cloned into E. coli expression vectors and purified, crossing the boundary from digital data into physical biological catalysts.",
      icon: "🧪"
    },
    {
      id: "02",
      title: "Industrial Bioreactor Deployment",
      desc: "Purified Synzymes are deployed in large-scale, high-temperature bioreactors. Thanks to surface stiffening mutations, these enzymes can operate near PET's glass transition temperature (Tm ≥ 70°C), drastically accelerating the hydrolysis of plastic waste.",
      icon: "🏭"
    },
    {
      id: "03",
      title: "The Circular Economy",
      desc: "The Synzymes rapidly depolymerize post-consumer PET bottles down to their fundamental monomers: TPA and EG. These purified monomers are then reused to manufacture virgin-quality PET, eliminating the need for new petroleum extraction.",
      icon: "♻️"
    }
  ];

  return (
    <section id="real-world" style={{ padding: '6rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          From Code to <span className="gradient-text">Real-World Impact</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 4rem auto', fontSize: '1.1rem' }}>
          Synzyme Genesis isn't just a computational exercise. Here is how our AI-generated biocatalysts will be deployed to solve the global plastic crisis in physical industrial settings.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          position: 'relative'
        }}>
          {steps.map((step, idx) => (
            <Tilt key={idx} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} transitionSpeed={1000} scale={1.05} glareEnable={true} glareMaxOpacity={0.15} glareColor="#00f0ff" glarePosition="all" style={{ height: '100%' }}>
              <div className="glass-panel" style={{ 
                padding: '2.5rem', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '3px solid var(--accent-cyan)',
                height: '100%'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '-15px', 
                  right: '10px', 
                  fontSize: '8rem', 
                  opacity: '0.03', 
                  fontWeight: '900',
                  fontFamily: 'monospace',
                  transform: 'translateZ(0)'
                }}>
                  {step.id}
                </div>
                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{step.icon}</div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.4rem' }}>
                  {step.title}
                </h3>
                <p style={{ color: '#8a9bb0', lineHeight: '1.7' }}>
                  {step.desc}
                </p>
              </div>
            </Tilt>
          ))}
        </div>

        {/* Mutation highlight section */}
        <div className="glass-panel" style={{ marginTop: '4rem', padding: '3rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ color: 'var(--accent-teal)', fontSize: '2rem', marginBottom: '1rem' }}>Why Target Specific Mutations?</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              The generative AI model discovered candidates like <strong>Synzyme_v2_021</strong> (7 mutations) and <strong>Synzyme_v2_025</strong> (13 mutations). These aren't random changes—they represent highly specific <em>aliphatic swaps</em> and <em>loop stabilizations</em>. 
              <br/><br/>
              In the real world, these specific structural modifications ensure the enzyme's active-site cleft remains geometrically stable when binding to bulky PET polymers, even amidst the intense thermal stress of a commercial bioreactor.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '12px', border: '1px dashed var(--accent-blue)', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧬</div>
            <div style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', letterSpacing: '1px' }}>AI-DRIVEN STABILIZATION</div>
          </div>
        </div>

      </div>
    </section>
  );
}
