import React, { useEffect, useRef, useState } from 'react';
import * as NGL from 'ngl';

export default function MolecularViewer({ pdbId = '/Synzyme_v2_021.pdb', title = 'Molecular Structure' }) {
  const containerRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState('Hover over a residue or substrate to see AI design insights.');
  const stageRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Cleanup any existing inner HTML (important for React 18 Strict Mode)
    containerRef.current.innerHTML = '';
    
    // Initialize NGL Stage with a premium White background
    const stage = new NGL.Stage(containerRef.current, { backgroundColor: "#ffffff" });
    stageRef.current = stage;
    
    // Handle window resize
    const handleResize = () => stage.handleResize();
    window.addEventListener('resize', handleResize);

    // Load Protein (Local PDB file)
    stage.loadFile(pdbId, { defaultRepresentation: false })
      .then(function(comp) {
        console.log("Successfully loaded protein:", pdbId);
        
        // Add cartoon representation for backbone - using a vivid blue on white background
        comp.addRepresentation("cartoon", {
          color: "#0055ff",
          opacity: 0.9
        });
        
        // Highlight Catalytic Triad (PETase: Ser160, Asp206, His237) - red/orange sticks
        comp.addRepresentation("ball+stick", {
          sele: "160 or 206 or 237",
          color: "#ff3300",
          name: "catalytic_triad"
        });

        // Highlight flexible Trp185 - green sticks
        comp.addRepresentation("ball+stick", {
          sele: "185",
          color: "#00aa55",
          name: "trp185"
        });

        comp.autoView();

        // Load Substrate (BHET plastic) into the SAME stage to show the docked complex!
        stage.loadFile("/BHET_Plastic_Model.pdb", { defaultRepresentation: false })
          .then(function(substrateComp) {
            console.log("Successfully loaded docked substrate ligand");
            // Render the plastic molecule as thick dark licorice sticks to contrast against white
            substrateComp.addRepresentation("licorice", {
              color: "#333333",
              scale: 2.0,
              name: "bhet_substrate"
            });
            stage.autoView();
          })
          .catch(err => {
            console.warn("Could not load BHET_Plastic_Model.pdb, showing protein only.", err);
          });
      })
      .catch((err) => {
        console.error("Failed to load local PDB:", pdbId, err);
      });

    // Tooltip logic for hovering over residues/ligands
    stage.signals.hovered.add(function(pickingProxy) {
      if (pickingProxy && pickingProxy.atom) {
        const atom = pickingProxy.atom;
        const resno = atom.resno;
        const resname = atom.resname;
        
        let info = `Residue: ${resname} ${resno}`;
        
        // Handle hovering over the BHET substrate plastic molecule
        if (resname === 'UNK' || resname === 'BHET' || resname === 'LIG') {
          info = "Substrate: BHET (PET plastic monomer) docked inside the catalytic pocket.";
        } else if (resno === 160 || resno === 206 || resno === 237) {
          info += " — 🎯 Catalytic Triad: Essential for hydrolyzing the plastic ester bond.";
        } else if (resno === 185) {
          info += " — ⚡ Trp185: Flexible loop residue regulating substrate binding geometry.";
        } else if (resno === 238 || resno === 159) {
          info += " — 🧬 Active Site Cleft: Key mutations here optimize binding energy (ΔG).";
        } else {
          info += " — Structural protein backbone.";
        }
        
        setHoverInfo(info);
      } else {
        setHoverInfo('Hover over a residue or substrate to see AI design insights.');
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (stageRef.current) {
        stageRef.current.dispose();
      }
    };
  }, [pdbId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e1e4e8', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      {/* Top Bar - Clean Light Mode style */}
      <div style={{ backgroundColor: '#f6f8fa', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e1e4e8' }}>
        <span style={{ fontWeight: 'bold', color: '#1f2328' }}>{title}</span>
        <span style={{ fontSize: '0.8rem', color: '#57606a' }}>Powered by NGL Viewer</span>
      </div>
      
      {/* 3D Canvas Container */}
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '350px', backgroundColor: '#ffffff', position: 'relative' }}
      >
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#57606a', fontSize: '0.8rem', pointerEvents: 'none', zIndex: 10 }}>
          Left-click & drag to rotate • Right-click to pan • Scroll to zoom
        </div>
      </div>
      
      {/* Hover Info Panel - clean grey styling with dark text */}
      <div style={{ backgroundColor: '#f6f8fa', padding: '15px', fontSize: '0.9rem', color: '#1f2328', minHeight: '60px', display: 'flex', alignItems: 'center', borderTop: '1px solid #e1e4e8' }}>
        {hoverInfo}
      </div>
    </div>
  );
}
