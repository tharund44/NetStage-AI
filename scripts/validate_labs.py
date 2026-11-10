import pandas as pd
from pathlib import Path

def run():
    cases_df = pd.read_csv('data/cases.csv')
    base_dir = Path('labs')
    
    total_cases = len(cases_df)
    labs_ok = 0
    pkt_found = 0
    pkt_missing = 0
    
    for _, row in cases_df.iterrows():
        cid = str(row.get('case_id'))
        category = cid.split('-')[0]
        
        lab_dir = base_dir / category / cid
        
        # Check files
        files_to_check = ['README.md', 'topology.md', 'configuration.txt', 'fault.md', 'verification.md']
        all_ok = True
        for f in files_to_check:
            if not (lab_dir / f).exists():
                all_ok = False
                break
        
        has_pkt = (lab_dir / f"{cid}.pkt").exists()
        
        if all_ok:
            labs_ok += 1
        
        if has_pkt:
            pkt_found += 1
        else:
            pkt_missing += 1
            
        print(f"{cid:10} Lab specification: {'OK' if all_ok else 'MISSING'}    .pkt: {'AVAILABLE' if has_pkt else 'MISSING'}")
        
    print("\n" + "="*40)
    print(f"Total cases: {total_cases}")
    print(f"Lab specifications: {labs_ok}")
    print(f"Real .pkt files: {pkt_found}")
    print(f"Missing .pkt files: {pkt_missing}")

if __name__ == '__main__':
    run()
