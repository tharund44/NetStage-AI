import re

with open('dashboard/src/App.jsx', 'r') as f:
    content = f.read()

expanded_row_code = """
const ExpandedRow = ({ row, checklist, setChecklist }) => {
  const toggleChecklist = (step) => {
    setChecklist(prev => ({
      ...prev,
      [row.case_id]: {
        ...(prev[row.case_id] || {}),
        [step]: !(prev[row.case_id]?.[step])
      }
    }));
  };

  const steps = [
    "Packet Tracer topology opened",
    "Broken configuration observed",
    "Diagnostic commands executed",
    "Evidence collected",
    "AI diagnosis generated",
    "Rule checker executed",
    "Human reviewed diagnosis",
    "Fix applied in Packet Tracer",
    "Verification commands executed",
    "Verification output submitted",
    "Network issue resolved"
  ];

  const state = checklist[row.case_id] || {};

  return (
    <td colSpan="6" className="p-0 bg-gray-50/80 border-t border-gray-100">
      <div className="p-6 max-h-[600px] overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-2">Case Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Case ID:</span> <span className="font-medium text-gray-900">{row.case_id}</span></div>
                <div><span className="text-gray-500">Category:</span> <span className="font-medium text-gray-900">{row.concept_tag}</span></div>
                <div><span className="text-gray-500">Severity:</span> <span className="font-medium text-gray-900">{row.severity}</span></div>
                <div><span className="text-gray-500">OSI Layer:</span> <span className="font-medium text-gray-900">{row.osi_layer}</span></div>
              </div>
            </section>

            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-2">Problem</h4>
              <div className="text-sm space-y-3">
                <div><span className="text-gray-500 block mb-1">Symptom:</span> <p className="text-gray-900">{row.symptom}</p></div>
                <div><span className="text-gray-500 block mb-1">Topology Note:</span> <p className="text-gray-900">{row.topology_note}</p></div>
              </div>
            </section>

            <section className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 border-b border-blue-200 pb-2">Packet Tracer Lab</h4>
              <div className="text-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-blue-700 font-semibold">Lab Status:</span> 
                  <span className={`px-2 py-1 rounded text-xs font-bold ${row.packet_tracer_status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {row.packet_tracer_status === 'AVAILABLE' ? 'Packet Tracer Lab Available' : 'Packet Tracer Lab Specification Available'}
                  </span>
                </div>
                {row.packet_tracer_status !== 'AVAILABLE' && (
                  <p className="text-amber-700 text-xs italic">Actual .pkt file must be created in Cisco Packet Tracer.</p>
                )}
                <div><span className="text-blue-700 font-semibold">Packet Tracer File:</span> <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-800">{row.packet_tracer_file}</code></div>
                
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <span className="text-blue-700 font-semibold block mb-2">Packet Tracer Checklist:</span>
                  <div className="space-y-1">
                    {steps.map((step, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer group text-xs text-blue-900">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" checked={!!state[idx]} onChange={() => toggleChecklist(idx)} />
                        <span className="group-hover:text-blue-700 transition-colors">{step}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded text-red-800 text-xs flex gap-2 items-start">
                   <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                   <div>
                     <strong>Packet Tracer Action Required</strong><br/>
                     NetSage does not automatically modify Cisco Packet Tracer configurations. You must apply fixes manually.
                   </div>
                </div>
              </div>
            </section>
            
            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-2">Verification</h4>
              <div className="text-sm space-y-3">
                 <div><span className="text-gray-500 block mb-1">Status:</span> <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-600">NOT VERIFIED</span></div>
                 <p className="text-xs text-gray-400 italic">Apply fix in Packet Tracer and manually verify. Check verification.md for commands.</p>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-2">Evidence</h4>
              <div className="bg-gray-900 text-gray-200 p-3 rounded-lg text-xs font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                {row.show_output || 'No evidence extracted.'}
              </div>
            </section>

            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-2">AI Diagnosis</h4>
              <div className="text-sm space-y-3">
                <div><span className="text-gray-500 block mb-1">Root Cause:</span> <p className="text-gray-900">{row.ai_root_cause || 'N/A'}</p></div>
                <div><span className="text-gray-500 block mb-1">Next Command:</span> <code className="text-xs bg-gray-100 px-1 py-0.5 rounded text-pink-600">{row.ai_next_command || 'N/A'}</code></div>
                <div><span className="text-gray-500 block mb-1">Fix Steps:</span> <div className="bg-gray-50 p-2 rounded text-xs font-mono whitespace-pre-wrap">{row.ai_fix_steps || 'N/A'}</div></div>
              </div>
            </section>

            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-2">Rule Checker</h4>
              <div className="text-sm space-y-3">
                <div><span className="text-gray-500 block mb-1">Findings:</span> <p className="text-gray-900">{row.rule_checker_findings || 'N/A'}</p></div>
              </div>
            </section>

            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-2">Human Review</h4>
              <div className="text-sm space-y-3">
                <div className="flex gap-4">
                  <div><span className="text-gray-500 block mb-1">Decision:</span> 
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.reviewer_decision === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                        row.reviewer_decision === 'Edited' ? 'bg-amber-100 text-amber-700' :
                        row.reviewer_decision === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{row.reviewer_decision || 'Pending'}</span>
                  </div>
                  <div><span className="text-gray-500 block mb-1">Reviewer:</span> <span className="text-gray-900">{row.reviewer_name || 'N/A'}</span></div>
                </div>
                <div><span className="text-gray-500 block mb-1">Correction:</span> <p className="text-gray-900">{row.corrected_diagnosis || 'None'}</p></div>
                <div><span className="text-gray-500 block mb-1">Notes:</span> <p className="text-gray-900">{row.reviewer_notes || 'None'}</p></div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </td>
  );
};
"""

content = content.replace("export default function App() {", expanded_row_code + "\nexport default function App() {\n  const [checklist, setChecklist] = useState({});\n")

pattern = re.compile(r'<td colSpan="6" className="p-0">.*?</td>', re.DOTALL)
content = pattern.sub('<ExpandedRow row={row} checklist={checklist} setChecklist={setChecklist} />', content)

with open('dashboard/src/App.jsx', 'w') as f:
    f.write(content)

print("Updated App.jsx successfully.")
