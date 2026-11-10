import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ShieldAlert, CheckCircle, Activity, Search, ChevronDown, ChevronUp, FileText, AlertTriangle, X } from 'lucide-react';
import rawData from './data.json';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

const StatCard = ({ title, value, icon: Icon, color, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) return;
    
    const duration = 1000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center gap-4"
    >
      <div className={`p-4 rounded-lg bg-${color}-50 text-${color}-600`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">
          {Number.isInteger(count) ? count : count.toFixed(1)}{suffix}
        </h3>
      </div>
    </motion.div>
  );
};


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

export default function App() {
  const [checklist, setChecklist] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);

  // Computed metrics
  const totalCases = rawData.length;
  const agreed = rawData.filter(d => d.matches_expected === true || d.matches_expected === "True").length;
  const accepted = rawData.filter(d => d.reviewer_decision === 'Accepted').length;
  const editedRejected = rawData.filter(d => ['Edited', 'Rejected'].includes(d.reviewer_decision));
  
  const agreementRate = (agreed / totalCases) * 100;
  const humanAcceptedRate = (accepted / totalCases) * 100;

  // Chart data: Issues by Concept
  const conceptData = useMemo(() => {
    const counts = {};
    rawData.forEach(d => {
      counts[d.concept_tag] = (counts[d.concept_tag] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  // Chart data: AI vs Human Split
  const decisionData = useMemo(() => {
    const counts = { Accepted: 0, Edited: 0, Rejected: 0 };
    rawData.forEach(d => {
      if (d.reviewer_decision) {
        counts[d.reviewer_decision] = (counts[d.reviewer_decision] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const filteredData = rawData.filter(d => 
    d.case_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (d.concept_tag && d.concept_tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.expected_fault && d.expected_fault.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <Activity className="text-blue-600" size={32}/>
              NetSage AI <span className="font-light text-gray-400">|</span> Dashboard
            </h1>
            <p className="text-gray-500 mt-2">Packet Tracer Troubleshooting Assistant Telemetry</p>
          </div>
          <div className="flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogModal(true)}
              className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50"
            >
              <FileText size={16} className="text-gray-500"/>
              Responsible AI Log
            </motion.button>
            <div className="px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg flex items-center gap-2 font-medium shadow-sm">
              <ShieldAlert size={18} />
              Human Review Required
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Cases Processed" value={totalCases} icon={Activity} color="blue" />
          <StatCard title="AI Base Agreement" value={agreementRate} suffix="%" icon={CheckCircle} color="green" />
          <StatCard title="Human Accepted" value={humanAcceptedRate} suffix="%" icon={CheckCircle} color="emerald" />
          <StatCard title="Edited / Rejected" value={editedRejected.length} icon={AlertTriangle} color="red" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6 text-gray-800">Issues by Concept Tag</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conceptData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={180} axisLine={false} tickLine={false} tick={{ fontSize: 12, textAnchor: 'end' }} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6 text-gray-800">Human Review Decisions</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={decisionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {decisionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Diagnosis Telemetry</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search cases..." 
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Case ID</th>
                  <th className="p-4 font-semibold">Concept</th>
                  <th className="p-4 font-semibold">AI Confidence</th>
                  <th className="p-4 font-semibold">Rule Checker</th>
                  <th className="p-4 font-semibold">Review Decision</th>
                  <th className="p-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredData.map((row) => (
                  <React.Fragment key={row.case_id}>
                    <tr 
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${expandedRow === row.case_id ? 'bg-blue-50/30' : ''}`}
                      onClick={() => setExpandedRow(expandedRow === row.case_id ? null : row.case_id)}
                    >
                      <td className="p-4 font-medium text-gray-900">{row.case_id}</td>
                      <td className="p-4 text-gray-600">{row.concept_tag}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.ai_confidence?.toLowerCase() === 'high' ? 'bg-green-100 text-green-700' :
                          row.ai_confidence?.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {row.ai_confidence || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 truncate max-w-xs">{row.rule_checker_findings}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.reviewer_decision === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                          row.reviewer_decision === 'Edited' ? 'bg-amber-100 text-amber-700' :
                          row.reviewer_decision === 'Rejected' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {row.reviewer_decision || 'Pending'}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 text-right">
                        {expandedRow === row.case_id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </td>
                    </tr>
                    
                    {/* Expandable Row */}
                    <AnimatePresence>
                      {expandedRow === row.case_id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50/50"
                        >
                          <ExpandedRow row={row} checklist={checklist} setChecklist={setChecklist} />
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Responsible AI Log Modal */}
      <AnimatePresence>
        {showLogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="text-blue-600"/>
                  Responsible AI Review Log
                </h2>
                <button onClick={() => setShowLogModal(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto bg-white flex-1">
                <div className="prose prose-sm md:prose-base max-w-none prose-blue">
                  <h3>Cases Requiring Correction</h3>
                  <p className="text-gray-500">The following cases were marked as Edited or Rejected during the human review process.</p>
                  
                  <div className="space-y-6 mt-6">
                    {editedRejected.map(r => (
                      <div key={r.case_id} className="border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="m-0 text-lg font-bold text-gray-900">{r.case_id}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.reviewer_decision === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                            {r.reviewer_decision}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <strong className="block text-xs text-gray-500 uppercase tracking-wider mb-1">AI Said</strong>
                            <span className="text-gray-800">{r.ai_root_cause || 'No response'}</span>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <strong className="block text-xs text-blue-500 uppercase tracking-wider mb-1">Correct Diagnosis</strong>
                            <span className="text-gray-800">{r.corrected_diagnosis}</span>
                          </div>
                        </div>
                        
                        <div>
                          <strong className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Why the AI likely got it wrong:</strong>
                          <p className="text-gray-700 m-0">{r.reviewer_notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
