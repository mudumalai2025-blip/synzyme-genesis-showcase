import React from 'react';
import Tilt from 'react-parallax-tilt';

export default function BusinessCase() {
  return (
    <section id="roi" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          The <span className="gradient-text">Business & Economics</span> Case
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 4rem auto', fontSize: '1.1rem' }}>
          Solving the plastic crisis isn't just about environmental impact—it must be economically viable. Here is why in-silico generative design fundamentally disrupts the traditional R&D cost structure.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'stretch' }}>
          
          {/* Traditional Wet-Lab Card */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} transitionSpeed={1000} scale={1.02} glareEnable={true} glareMaxOpacity={0.1} glareColor="#ff4b4b" glarePosition="all" style={{ height: '100%' }}>
            <div className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(255, 50, 50, 0.2)', position: 'relative', overflow: 'hidden', height: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #ff4b4b, #ff9090)', transform: 'translateZ(0)' }}></div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: '0.8' }}>📉</div>
              <h3 style={{ color: '#ff9090', fontSize: '1.8rem', marginBottom: '2rem' }}>Traditional Wet-Lab</h3>
              
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#ff4b4b' }}>⏳</span>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '0.2rem' }}>6–12 Months Minimum</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Iterative rational design and directed evolution requires slow biological growth cycles.</span>
                  </div>
                </li>
                <li style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#ff4b4b' }}>💸</span>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '0.2rem' }}>Tens of Thousands of Dollars</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>High costs for physical synthesis, reagents, HPLC assays, and lab resources.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#ff4b4b' }}>❌</span>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '0.2rem' }}>High Failure Rate</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Without predictive AI, researchers often spend months testing non-functional candidates in blind screens.</span>
                  </div>
                </li>
              </ul>
            </div>
          </Tilt>

          {/* Synzyme Genesis Card */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} transitionSpeed={1000} scale={1.02} glareEnable={true} glareMaxOpacity={0.15} glareColor="#00f0ff" glarePosition="all" style={{ height: '100%' }}>
            <div className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(0, 255, 179, 0.3)', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0, 255, 179, 0.05)', height: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, var(--accent-teal), var(--accent-cyan))', transform: 'translateZ(0)' }}></div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
              <h3 style={{ color: 'var(--accent-teal)', fontSize: '1.8rem', marginBottom: '2rem' }}>Synzyme Genesis AI</h3>
              
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>⚡</span>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '0.2rem' }}>Hours to Days</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Once the model is fine-tuned, generating and validating 1,250 novel candidates takes a fraction of the time.</span>
                  </div>
                </li>
                <li style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>☁️</span>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '0.2rem' }}>Cost-Efficient Cloud Compute</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Runs on highly scalable, inexpensive cloud GPUs (like Colab Pro A100s) requiring zero physical lab space.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>🎯</span>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '0.2rem' }}>80% Waste Reduction</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>AlphaFold2 structural filtering automatically discards 80% of guaranteed misfolds before a single dollar is spent on wet-lab synthesis.</span>
                  </div>
                </li>
              </ul>
            </div>
          </Tilt>

        </div>

      </div>
    </section>
  );
}
