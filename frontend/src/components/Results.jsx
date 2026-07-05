import React, { useState } from 'react';
import MolecularViewer from './MolecularViewer';
import candidatesData from '../data/candidates.json';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar 
} from 'recharts';

export default function Results() {
  const [searchTerm, setSearchTerm] = useState('');
  // Set the default selected candidate to Synzyme_v2_021 (top candidate)
  const defaultCandidate = candidatesData.find(c => c.id === 'Synzyme_v2_021') || candidatesData[0];
  const [selectedCandidate, setSelectedCandidate] = useState(defaultCandidate);

  // Filter candidates based on search
  const filteredCandidates = candidatesData.filter(cand => 
    cand.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Recharts Loss Data (from training runs)
  const lossData = [
    { epoch: 1, trainingLoss: 2.15, validationLoss: 2.25 },
    { epoch: 2, trainingLoss: 1.82, validationLoss: 1.95 },
    { epoch: 3, trainingLoss: 1.43, validationLoss: 1.62 },
    { epoch: 4, trainingLoss: 1.12, validationLoss: 1.35 },
    { epoch: 5, trainingLoss: 0.88, validationLoss: 1.12 },
    { epoch: 6, trainingLoss: 0.71, validationLoss: 0.95 },
    { epoch: 7, trainingLoss: 0.58, validationLoss: 0.82 },
    { epoch: 8, trainingLoss: 0.49, validationLoss: 0.74 },
    { epoch: 9, trainingLoss: 0.42, validationLoss: 0.69 },
    { epoch: 10, trainingLoss: 0.36, validationLoss: 0.65 }
  ];

  // Recharts pLDDT Score Distribution Data
  const plddtData = [
    { range: "< 50", count: 15 },
    { range: "50-60", count: 42 },
    { range: "60-70", count: 138 },
    { range: "70-80", count: 312 },
    { range: "80-90", count: 512 },
    { range: "90-100", count: 231 }
  ];

  // Helper to trigger FASTA download for selected candidate
  const downloadFasta = (cand) => {
    const element = document.createElement("a");
    const file = new Blob([`>${cand.id} | pLDDT: ${cand.plddt} | ΔG: ${cand.deltaG} kcal/mol | mutations: ${cand.mutations}\n${cand.sequence}\n`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${cand.id}.fasta`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="results" style={{ padding: '6rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          Functional <span className="gradient-text">Validation Results</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 4rem auto', fontSize: '1.1rem' }}>
          From an initial pool of 1,250 candidates, 231 passed the structural validation threshold (pLDDT &gt;= 70). The top-performing candidates were then subjected to AutoDock Vina simulations against the PET monomer (BHET), resulting in 68 candidates outperforming the natural Wild-Type IsPETase baseline (-6.2 kcal/mol).
        </p>

        {/* Searchable Database Table */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-teal)', fontSize: '1.6rem' }}>Synzyme Candidate Database ({candidatesData.length} variants)</h3>
            <input 
              type="text" 
              placeholder="Search Design ID (e.g. 021)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '0.6rem 1.5rem',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                width: '300px',
                outline: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}
            />
          </div>

          <div style={{ maxHeight: '350px', overflowY: 'auto', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--bg-secondary)', zIndex: 10 }}>
                <tr style={{ borderBottom: '2px solid var(--accent-cyan)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-primary)' }}>Variant</th>
                  <th style={{ padding: '1rem', color: 'var(--text-primary)' }}>ΔG (kcal/mol)</th>
                  <th style={{ padding: '1rem', color: 'var(--text-primary)' }}>pLDDT Score</th>
                  <th style={{ padding: '1rem', color: 'var(--text-primary)' }}>Mutations</th>
                  <th style={{ padding: '1rem', color: 'var(--text-primary)' }}>% Identity</th>
                  <th style={{ padding: '1rem', color: 'var(--text-primary)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Baseline Row */}
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Wild-Type (IsPETase)</td>
                  <td style={{ padding: '1rem' }}>-6.200</td>
                  <td style={{ padding: '1rem' }}>92.0</td>
                  <td style={{ padding: '1rem' }}>0</td>
                  <td style={{ padding: '1rem' }}>100%</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Baseline Reference</td>
                </tr>
                {/* Dynamically Filtered Rows */}
                {filteredCandidates.map((cand, idx) => {
                  const isSelected = selectedCandidate.id === cand.id;
                  const isTop = cand.id === 'Synzyme_v2_021';
                  return (
                    <tr 
                      key={idx} 
                      onClick={() => setSelectedCandidate(cand)}
                      style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        backgroundColor: isSelected ? 'rgba(0, 240, 255, 0.06)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      <td style={{ padding: '1rem', fontWeight: 'bold', color: isTop ? 'var(--accent-teal)' : 'inherit' }}>
                        {cand.id} {isTop && '🏆'}
                      </td>
                      <td style={{ padding: '1rem', color: isTop ? 'var(--accent-teal)' : 'inherit' }}>{cand.deltaG}</td>
                      <td style={{ padding: '1rem' }}>{cand.plddt}</td>
                      <td style={{ padding: '1rem' }}>{cand.mutations}</td>
                      <td style={{ padding: '1rem' }}>{cand.identity}</td>
                      <td style={{ padding: '1rem', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>
                        {isSelected ? 'Active Explorer' : 'Click to Load PDB'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3D Structure & Annotation Explorer Dashboard */}
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '2.5rem', textAlign: 'center', fontSize: '2rem' }}>
          Interactive Structure Explorer
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '2.5rem',
          marginBottom: '5rem'
        }}>
          {/* Left Column: 3D WebGL protein viewer */}
          <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <MolecularViewer 
              pdbId={selectedCandidate.pdbPath} 
              title={`${selectedCandidate.id} Docked Complex`}
            />
          </div>

          {/* Right Column: Dynamic Candidate details card */}
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>
                  {selectedCandidate.id}
                  {selectedCandidate.id === 'Synzyme_v2_021' && <span style={{ fontSize: '1rem', marginLeft: '10px', color: 'var(--accent-teal)', border: '1px solid var(--accent-teal)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Top Candidate (Synzyme-001)</span>}
                </h4>
                <button 
                  onClick={() => downloadFasta(selectedCandidate)}
                  className="btn-secondary"
                  style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                >
                  📥 Export FASTA
                </button>
              </div>

              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Binding Energy (ΔG)</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: parseFloat(selectedCandidate.deltaG) <= -7.0 ? 'var(--accent-teal)' : 'var(--accent-cyan)' }}>
                    {selectedCandidate.deltaG} kcal/mol
                  </div>
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>AlphaFold pLDDT</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: selectedCandidate.plddt >= 90 ? 'var(--accent-teal)' : 'var(--accent-cyan)' }}>
                    {selectedCandidate.plddt}
                  </div>
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Mutations</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'white' }}>
                    {selectedCandidate.mutations} residues
                  </div>
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Sequence Identity</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'white' }}>
                    {selectedCandidate.identity}
                  </div>
                </div>
              </div>

              {/* FASTA sequence box */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>FASTA Sequence Map:</span>
                <div style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '0.8rem', 
                  lineHeight: '1.5',
                  backgroundColor: '#050508', 
                  padding: '1.2rem', 
                  borderRadius: '8px', 
                  border: '1px solid var(--glass-border)',
                  maxHeight: '120px',
                  overflowY: 'auto',
                  wordBreak: 'break-all',
                  color: '#8a9bb0'
                }}>
                  {selectedCandidate.sequence}
                </div>
              </div>
            </div>

            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', borderTop: '1px solid var(--glass-border)', paddingTop: '1.2rem' }}>
              💡 Hovering over the active cleft coordinates in the 3D model shows the substrate interaction layout.
            </div>
          </div>
        </div>

        {/* Recharts Analytics Section */}
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '2rem', textAlign: 'center', fontSize: '2rem' }}>Performance Analytics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          {/* ESM-2 Loss Line Chart */}
          <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '1.5rem', textAlign: 'center' }}>ESM-2 Loss Convergence</h4>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lossData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="epoch" stroke="#8a8f98" />
                  <YAxis stroke="#8a8f98" />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid var(--accent-blue)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="trainingLoss" stroke="var(--accent-cyan)" activeDot={{ r: 8 }} name="Training Loss" />
                  <Line type="monotone" dataKey="validationLoss" stroke="var(--accent-teal)" name="Val Loss" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* pLDDT Distribution Bar Chart */}
          <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <h4 style={{ color: 'var(--accent-teal)', marginBottom: '1.5rem', textAlign: 'center' }}>pLDDT Distribution (1,250 runs)</h4>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={plddtData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="range" stroke="#8a8f98" />
                  <YAxis stroke="#8a8f98" />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid var(--accent-blue)' }} />
                  <Legend />
                  <Bar dataKey="count" fill="var(--accent-teal)" name="Sequence Count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
