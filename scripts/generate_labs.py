import os
import pandas as pd
from pathlib import Path

def generate_labs():
    csv_path = Path('data/cases.csv')
    if not csv_path.exists():
        print(f"Error: {csv_path} not found.")
        return

    df = pd.read_csv(csv_path)
    base_dir = Path('labs')
    base_dir.mkdir(exist_ok=True)

    for _, row in df.iterrows():
        case_id = str(row.get('case_id', ''))
        if not case_id:
            continue
            
        category = case_id.split('-')[0]
        
        lab_dir = base_dir / category / case_id
        lab_dir.mkdir(parents=True, exist_ok=True)
        
        # 1. README.md
        readme_content = f"""# {case_id} Lab Specification

## Category: {category}
## Concept: {row.get('concept_tag', 'N/A')}
## OSI Layer: {row.get('osi_layer', 'N/A')}
## Severity: {row.get('severity', 'N/A')}

> **IMPORTANT:** Actual .pkt file must be created/opened using Cisco Packet Tracer.

This directory contains the lab specification for case {case_id}.
If a real `{case_id}.pkt` file is placed in this folder, the dashboard will automatically detect it.
"""
        with open(lab_dir / 'README.md', 'w') as f:
            f.write(readme_content)
            
        # 2. topology.md
        topology_content = f"""# Topology Documentation

{row.get('topology_note', 'No topology note provided.')}

*Note: Please consult the .pkt file for exact device names and interfaces.*
"""
        with open(lab_dir / 'topology.md', 'w') as f:
            f.write(topology_content)
            
        # 3. configuration.txt
        config_content = f"""# Captured Configuration / Evidence

{row.get('show_output', 'No output captured.')}
"""
        with open(lab_dir / 'configuration.txt', 'w') as f:
            f.write(config_content)
            
        # 4. fault.md
        fault_content = f"""# Intentional Fault

## Symptom
{row.get('symptom', 'N/A')}

## Expected Fault
{row.get('expected_fault', 'N/A')}
"""
        with open(lab_dir / 'fault.md', 'w') as f:
            f.write(fault_content)
            
        # 5. verification.md
        verification_content = f"""# Verification Documentation

After applying the recommended fix in Cisco Packet Tracer, run verification commands to confirm the network issue is resolved.

Expected Verification:
- Verify that the symptom no longer exists.
- Check relevant `show` commands related to {row.get('concept_tag', 'the concept')}.
"""
        with open(lab_dir / 'verification.md', 'w') as f:
            f.write(verification_content)

    print(f"Successfully generated lab specifications for {len(df)} cases.")

if __name__ == '__main__':
    generate_labs()
