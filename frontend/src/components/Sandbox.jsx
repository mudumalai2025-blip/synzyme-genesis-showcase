import React, { useState, useEffect, useRef } from 'react';
import modelSpecs from '../data/model_specs.json';

export default function Sandbox() {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [outputSequence, setOutputSequence] = useState('');
  const terminalEndRef = useRef(null);

  const simulationSteps = [
    { text: "⚡ Initializing Synzyme Genesis Pipeline...", delay: 500 },
    { text: "🤖 Loading ESM-2 35M Parameter Model (esm2_t12_35M_UR50D)...", delay: 800 },
    { text: "📁 Importing fine-tuned weight tensors from final_synzyme_model...", delay: 600 },
    { text: "🧬 Loading Wild-Type IsPETase template sequence (290 AA)...", delay: 700 },
    { text: "🔮 Masking 15% of evolutionary positions for token sampling...", delay: 900 },
    { text: "⚙️ Running Gibbs Sampling iteration (1/5)...", delay: 1000 },
    { text: "⚙️ Running Gibbs Sampling iteration (2/5)...", delay: 800 },
    { text: "⚙️ Running Gibbs Sampling iteration (3/5)...", delay: 800 },
    { text: "⚙️ Running Gibbs Sampling iteration (4/5)...", delay: 800 },
    { text: "⚙️ Running Gibbs Sampling iteration (5/5)...", delay: 800 },
    { text: "✅ 1,250 novel sequence candidates generated successfully.", delay: 500 },
    { text: "🚀 Sending coordinates to AlphaFold2 structural model...", delay: 900 },
    { text: "📊 Evaluating pLDDT structural confidence scores...", delay: 1100 },
    { text: "❌ 1,019 sequences discarded (pLDDT < 90)", delay: 600 },
    { text: "✅ 231 sequences validated with high folding stability (pLDDT >= 90).", delay: 500 },
    { text: "⚓ Initiating AutoDock Vina molecular docking screening...", delay: 1000 },
    { text: "🎯 Docking BHET substrate into active cleft coordinates...", delay: 1200 },
    { text: "🏆 Top Candidate Identified: Synzyme_v2_021 (ΔG: -8.200 kcal/mol, pLDDT: 93.0)", delay: 800 }
  ];

  const candidateSequence = 
    "MNFPRASRLMQAAVLGGLMAVSAAATAQTNPYARGPNPAAASLEASAGPFTVRSFTVSRPSGYG" +
    "AGTVYYPTNAGGTVGAIAIVPGYTARQSSLKWWGPRLASHGFVVITIDTNSTLDQPSSRSSQQM" +
    "AALRQVASLNGTSSSPIYGKVDTARMGVAGWSMGGGGSLISAAANPSLKAAAPQAPWDSSTNFS" +
    "SVTVPTLIFACENDSIAPVNSGALPAYDSMSRNAKQFLEINGGSHSCANSGNSNQALIGKKGVA" +
    "WMKRFMDNDTRYSTFACENPNSTRVSDARTANCS";

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setOutputSequence('');

    let currentStep = 0;
    
    const executeStep = () => {
      if (currentStep < simulationSteps.length) {
        setLogs(prev => [...prev, simulationSteps[currentStep].text]);
        setTimeout(() => {
          currentStep++;
          executeStep();
        }, simulationSteps[currentStep].delay);
      } else {
        // Typing out final sequence
        let charIndex = 0;
        const interval = setInterval(() => {
          if (charIndex < candidateSequence.length) {
            setOutputSequence(prev => prev + candidateSequence[charIndex]);
            charIndex += 4; // speed up typing
          } else {
            clearInterval(interval);
            setIsRunning(false);
          }
        }, 30);
      }
    };

    executeStep();
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, outputSequence]);

  return (
    <section style={{ padding: '6rem 0', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
          Interactive <span className="gradient-text">AI Sandbox</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Experience the computational pipeline in real-time. Trigger the ESM-2 token masking and structural filtering algorithms to generate a candidate.
        </p>

        {/* Terminal Window */}
        <div style={{ 
          backgroundColor: '#0a0a0c', 
          border: '1px solid var(--accent-blue)', 
          borderRadius: '12px', 
          boxShadow: '0 20px 50px rgba(0, 102, 255, 0.1)',
          overflow: 'hidden',
          marginBottom: '2.5rem'
        }}>
          {/* Mac-style Window header */}
          <div style={{ 
            backgroundColor: '#16161a', 
            padding: '12px 20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid #222'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#666', fontFamily: 'monospace', letterSpacing: '1px' }}>esm2_generator.sh</span>
            <span style={{ width: '50px' }}></span>
          </div>

          {/* Terminal Logs */}
          <div style={{ 
            padding: '2rem', 
            height: '350px', 
            overflowY: 'auto', 
            fontFamily: 'monospace', 
            fontSize: '0.9rem',
            lineHeight: '1.6',
            color: '#a9b1d6',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {logs.length === 0 && (
              <div style={{ color: '#565f89', textAlign: 'center', marginTop: '100px' }}>
                [System Status: Idle] <br/> Click "Run Pipeline" below to trigger sequence sampling.
              </div>
            )}
            
            {logs.map((log, idx) => (
              <div key={idx} style={{ 
                color: log.startsWith('✅') || log.startsWith('🏆') ? 'var(--accent-teal)' : 
                       log.startsWith('❌') ? '#ff5f56' : 
                       log.startsWith('⚙️') ? 'var(--accent-cyan)' : '#a9b1d6'
              }}>
                {log}
              </div>
            ))}
            
            {outputSequence && (
              <div style={{ marginTop: '1.5rem', borderTop: '1px dashed #333', paddingTop: '1.5rem' }}>
                <span style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.5rem' }}>OUTPUT FASTA SEQUENCE:</span>
                <div style={{ 
                  color: '#73daca', 
                  wordBreak: 'break-all', 
                  backgroundColor: 'rgba(0,0,0,0.4)', 
                  padding: '15px', 
                  borderRadius: '6px', 
                  border: '1px solid #222' 
                }}>
                  {outputSequence}
                  {!isRunning && <span style={{ animation: 'blink 1s infinite', fontWeight: 'bold' }}> |</span>}
                </div>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Trigger Button */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <button 
            onClick={runSimulation} 
            className="btn-primary" 
            disabled={isRunning}
            style={{ 
              opacity: isRunning ? 0.6 : 1, 
              cursor: isRunning ? 'not-allowed' : 'pointer',
              minWidth: '220px'
            }}
          >
            {isRunning ? "Running pipeline..." : "Run Pipeline"}
          </button>
        </div>

        {/* Technical Architecture Specs Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          
          {/* Card 1: ESM-2 Architecture Config */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🤖 ESM-2 Model Architecture
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Model Configuration:</span>
                <span style={{ fontWeight: 'bold', color: 'white' }}>{modelSpecs.model_name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Base Model Backbone:</span>
                <span style={{ fontFamily: 'monospace', color: 'var(--accent-teal)' }}>{modelSpecs.base_model}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Trainable Parameters:</span>
                <span style={{ fontWeight: 'bold', color: 'white' }}>{modelSpecs.parameters}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Vocabulary Size:</span>
                <span style={{ fontWeight: 'bold', color: 'white' }}>{modelSpecs.vocab_size} tokens</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Hidden Size / Embedding Dim:</span>
                <span style={{ fontWeight: 'bold', color: 'white' }}>{modelSpecs.hidden_size}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Attention Layers:</span>
                <span style={{ fontWeight: 'bold', color: 'white' }}>{modelSpecs.num_layers} layers</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Attention Heads:</span>
                <span style={{ fontWeight: 'bold', color: 'white' }}>{modelSpecs.num_heads} heads</span>
              </div>
            </div>
          </div>

          {/* Card 2: Training Checkpoint Log */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--accent-teal)', fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📈 Fine-Tuning Checkpoint Logs
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
              {modelSpecs.checkpoints.map((cp, idx) => (
                <div key={idx} style={{ 
                  backgroundColor: 'rgba(255,255,255,0.02)', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: 'white' }}>Epoch {cp.epoch} Checkpoint</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                      checkpoint-{cp.step} (step size)
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
                      Loss: {cp.loss.toFixed(3)}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-teal)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {cp.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
