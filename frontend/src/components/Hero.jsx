import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1rem', 
            backgroundColor: 'rgba(0, 229, 255, 0.1)', 
            border: '1px solid var(--accent-cyan)', 
            borderRadius: '20px',
            color: 'var(--accent-cyan)',
            fontWeight: '600',
            letterSpacing: '2px',
            fontSize: '0.8rem',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}>
            Computational Discovery of Novel PET-Degrading Synzymes
          </span>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '1px' }}>
            <span className="gradient-text">Synzyme</span> Genesis
          </h1>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', fontWeight: '400', maxWidth: '900px', margin: '0 auto 2rem auto' }}>
            Pioneering a fundamental shift from slow, conventional enzyme discovery to rapid, targeted Generative AI design using Meta's ESM-2 language model.
          </h2>
          
          <div className="glass-panel" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto 3rem auto', textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h3 style={{ color: 'var(--accent-teal)', marginBottom: '1rem' }}>The Global Crisis</h3>
              <p style={{ color: '#b0c4de', fontSize: '1.05rem', lineHeight: '1.7' }}>
                The accumulation of Polyethylene Terephthalate (PET) plastic constitutes one of the most persistent pollution challenges of our time. PET's highly stable aromatic ester backbone grants it exceptional resistance to natural biological breakdown, meaning mechanical recycling and naturally occurring enzymes (like PETase) are thermodynamically insufficient for industrial-scale remediation.
              </p>
            </div>
            <div>
              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>The Synzyme Solution</h3>
              <p style={{ color: '#b0c4de', fontSize: '1.05rem', lineHeight: '1.7' }}>
                Synzyme Genesis replaces iterative trial-and-error with a scalable, <em>in-silico</em> generative pipeline. By treating the "language of biology" as a generative task via Transfer Learning on the ESM-2 Transformer (8M parameters), the system acts as a creative partner—producing thousands of <em>de novo</em> amino acid sequences (synzymes) that explore vast, untapped protein sequence spaces.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/pipeline" className="btn-primary" style={{ display: 'inline-block' }}>Explore the Pipeline</Link>
            <Link to="/results" className="btn-secondary" style={{ display: 'inline-block' }}>View Final Candidates</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
