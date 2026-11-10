import pandas as pd
import json

def export_data():
    cases = pd.read_csv('data/cases.csv')
    diag = pd.read_csv('runner/diagnosis_results.csv')
    review = pd.read_csv('review/review_template.csv')
    
    # Merge cases and diagnosis
    df = cases.merge(diag, on='case_id', how='left')
    
    # review_template has case_id, ai_root_cause, expected_fault, reviewer_decision, corrected_diagnosis, reviewer_notes, reviewer_name, review_date
    review_cols = ['case_id', 'reviewer_decision', 'corrected_diagnosis', 'reviewer_notes', 'reviewer_name', 'review_date']
    df = df.merge(review[review_cols], on='case_id', how='left')
    
    records = df.fillna("").to_dict(orient='records')
    
    import os
    for record in records:
        cid = str(record.get('case_id'))
        category = cid.split('-')[0]
        
        lab_dir = f"labs/{category}/{cid}"
        pkt_file = f"{lab_dir}/{cid}.pkt"
        
        record['lab_directory'] = lab_dir
        record['packet_tracer_file'] = pkt_file
        
        if os.path.exists(pkt_file):
            record['packet_tracer_status'] = 'AVAILABLE'
        else:
            record['packet_tracer_status'] = 'REQUIRES_CREATION'

    with open('dashboard/src/data.json', 'w') as f:
        json.dump(records, f, indent=2)
    print("Exported dashboard/src/data.json")

if __name__ == '__main__':
    export_data()
