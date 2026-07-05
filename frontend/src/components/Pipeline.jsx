import React from 'react';
import datasetAnalytics from '../data/dataset_analytics.json';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell
} from 'recharts';

export default function Pipeline() {
  const phases = [
    {
      id: "1",
      title: "Strategic Data Curation",
      desc: "Programmatically established a high-quality training corpus of 64,496 bacterial sequences. Applied rigorous filtering to enforce a strict length constraint of 200–500 amino acids and purged invalid characters.",
      icon: "🗄️"
    },
    {
      id: "2",
      title: "ESM-2 Fine-Tuning",
      desc: "Specialized Meta's ESM-2 (8M) via Transfer Learning. Using Masked Language Modeling (15% tokens masked), the model achieved a final loss of 1.993 and perplexity of 6.95 over 3 epochs, mastering ester-hydrolase sequence grammar.",
      icon: "🤖"
    },
    {
      id: "3",
      title: "Generative Inference",
      desc: "Sampled the learned latent space using a directed-evolution strategy. By applying a stochastic 5% token masking rate to a natural IsPETase seed scaffold, the system generated over 1,250 novel synzyme candidates.",
      icon: "🧬"
    },
    {
      id: "4",
      title: "Structural Validation",
      desc: "Utilized ESMFold API (and AlphaFold2 concepts) to predict 3D coordinates. Enforced a strict reliability threshold, retaining only candidates with a high structural confidence score (pLDDT >= 70).",
      icon: "🧊"
    },
    {
      id: "5",
      title: "Molecular Docking & Ranking",
      desc: "Calculated binding free energy (ΔG) against the PET monomer (BHET) using AutoDock Vina. Candidates were objectively ranked against the natural PETase baseline (-6.2 kcal/mol) to deliver a definitive shortlist.",
      icon: "⚖️"
    }
  ];

  // Colors for taxonomic bar charts
  const colors = ['#00f0ff', '#00ffb3', '#0066ff', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <section id="pipeline" style={{ padding: '6rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
          The <span className="gradient-text">5-Phase</span> Pipeline
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 4rem auto', fontSize: '1.1rem' }}>
          A fully integrated, AI-driven molecular engineering framework designed to transform raw biological sequence data into validated, high-performance synthetic enzyme designs.
        </p>
        
        {/* Phase Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '5rem'
        }}>
          {phases.map((phase, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: '10px', 
                fontSize: '8rem', 
                opacity: '0.04', 
                fontWeight: '900',
                fontFamily: 'monospace'
              }}>
                {phase.id}
              </div>
              <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{phase.icon}</div>
              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', fontSize: '1.4rem' }}>
                Phase {phase.id}: {phase.title}
              </h3>
              <p style={{ color: '#8a9bb0', lineHeight: '1.7' }}>
                {phase.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Phase 1 Curation Dashboard */}
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '2.5rem', textAlign: 'center', fontSize: '2rem' }}>
          Phase 1: Dataset Curation Analytics
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Taxonomic Phylum Distribution (Horizontal Bar Chart) */}
          <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', textAlign: 'center' }}>Taxonomic Diversity (Phylum counts)</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              Extracted via OS descriptors in the curated sequence database
            </p>
            <div style={{ width: '100%', height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={datasetAnalytics.taxonomy} 
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis type="number" stroke="#8a8f98" />
                  <YAxis dataKey="phylum" type="category" stroke="#8a8f98" width={110} style={{ fontSize: '0.8rem' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid var(--accent-blue)', color: 'white' }} />
                  <Bar dataKey="count" name="Sequences" radius={[0, 4, 4, 0]}>
                    {datasetAnalytics.taxonomy.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sequence Length Distribution (Vertical Bar Chart) */}
          <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <h4 style={{ color: 'var(--accent-teal)', marginBottom: '1rem', textAlign: 'center' }}>Sequence Length Distribution</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              Strict length constraint filter applied to discard partial fragments
            </p>
            <div style={{ width: '100%', height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={datasetAnalytics.lengthDistribution} 
                  margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="range" stroke="#8a8f98" />
                  <YAxis stroke="#8a8f98" />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid var(--accent-blue)', color: 'white' }} />
                  <Bar dataKey="count" fill="var(--accent-teal)" name="Sequence Count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Data Curation Stats Summary */}
        <div className="glass-panel" style={{ marginTop: '2.5rem', padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Curated Corpus Size</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{datasetAnalytics.totalSequences} sequences</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Average Residue Length</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{datasetAnalytics.avgLength} AA</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Residue Span Range</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{datasetAnalytics.minLength} – {datasetAnalytics.maxLength} AA</div>
          </div>
        </div>

      </div>
    </section>
  );
}
