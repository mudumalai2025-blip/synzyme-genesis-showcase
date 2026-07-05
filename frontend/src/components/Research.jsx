import React from 'react';

export default function Research() {
  return (
    <section id="research" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem' }}>
          Research & <span className="gradient-text">Future Directions</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Literature Context */}
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <h3 style={{ color: 'var(--accent-cyan)', fontSize: '2rem', marginBottom: '1.5rem' }}>Literature Context</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              The development of biocatalytic PET degradation has progressed from natural enzyme discovery to generative AI-guided design:
            </p>
            <ul style={{ color: '#b0c4de', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', borderLeft: '3px solid var(--accent-teal)', paddingLeft: '1rem' }}>
                <strong style={{ color: 'white' }}>Yoshida et al. (2016):</strong> Discovered <em>Ideonella sakaiensis</em>, establishing the biological basis for PET mineralization.
              </li>
              <li style={{ marginBottom: '1rem', borderLeft: '3px solid var(--accent-teal)', paddingLeft: '1rem' }}>
                <strong style={{ color: 'white' }}>Austin et al. (2018):</strong> Elucidated the 0.92 Å X-ray crystal structure of PETase, enabling initial rational engineering.
              </li>
              <li style={{ marginBottom: '1rem', borderLeft: '3px solid var(--accent-teal)', paddingLeft: '1rem' }}>
                <strong style={{ color: 'white' }}>Rives et al. (2021) & Madani et al. (2023):</strong> Validated Evolutionary Scale Modeling (ESM) and large language models for generating functional protein sequences across diverse families.
              </li>
              <li style={{ borderLeft: '3px solid var(--accent-teal)', paddingLeft: '1rem' }}>
                <strong style={{ color: 'white' }}>Jumper et al. (2021):</strong> Introduced AlphaFold2, revolutionizing structure prediction and forming the foundation of our structural validation step.
              </li>
            </ul>
          </div>

          {/* Feature Importance */}
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <h3 style={{ color: 'var(--accent-teal)', fontSize: '2rem', marginBottom: '1.5rem' }}>Feature Importance Analysis</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              We analyzed the predictive performance of structural and functional validation modules. The random forest model highlighted that:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '10px' }}>
                <div style={{ color: 'var(--accent-cyan)', fontSize: '2.5rem', fontWeight: 'bold' }}>0.35</div>
                <div style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>Targeted Mutations</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Specific active site substitutions directly correlate with enzyme-ligand stabilization.</div>
              </div>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '10px' }}>
                <div style={{ color: 'var(--accent-cyan)', fontSize: '2.5rem', fontWeight: 'bold' }}>0.25</div>
                <div style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>Text Embeddings (ESM-2)</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Demonstrates the effectiveness of the Transformer architecture in capturing biological grammar.</div>
              </div>
            </div>
          </div>

          {/* Future Enhancement */}
          <div className="glass-panel" style={{ padding: '3rem', border: '1px solid var(--accent-cyan)' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginBottom: '1.5rem' }}>Future Enhancements</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
              To move this computational framework toward industrial scalability and real-world deployment, the following enhancements are proposed:
            </p>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <h4 style={{ color: 'var(--accent-teal)' }}>1. Wet-Lab Integration (DBTL Cycle)</h4>
                <p style={{ color: '#b0c4de', fontSize: '0.95rem' }}>Experimental synthesis of top candidates to confirm hydrolytic activity, integrating results back to create a continuous Design-Build-Test-Learn cycle.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-teal)' }}>2. Multi-Property Optimization</h4>
                <p style={{ color: '#b0c4de', fontSize: '0.95rem' }}>Implementing deeper models to simultaneously target pH-optimum, solvent tolerance, and expression yield.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-teal)' }}>3. Quantum Mechanics (QM/MM)</h4>
                <p style={{ color: '#b0c4de', fontSize: '0.95rem' }}>Integrating localized QM/MM calculations at the active site to refine binding energy scores beyond standard docking.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
