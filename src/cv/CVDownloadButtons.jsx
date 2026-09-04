import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Download, FileText, Loader2 } from 'lucide-react';
import EuropassCV from './EuropassCV.jsx';
import GulfCV from './GulfCV.jsx';
import ATSCV from './ATSCV.jsx';

const FORMATS = [
  { id: 'ats', label: 'ATS-Friendly', hint: 'Plain, parser-safe — best for online applications', Doc: ATSCV, filenameSuffix: 'ATS-CV' },
  { id: 'europass', label: 'Europass', hint: 'Standard EU format', Doc: EuropassCV, filenameSuffix: 'Europass-CV' },
  { id: 'gulf', label: 'Gulf / GCC', hint: 'Includes photo and personal details', Doc: GulfCV, filenameSuffix: 'CV' },
];

function slugForFile(name) {
  return (name || 'portfolio').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'cv';
}

export default function CVDownloadButtons({ profile, skills, experience, projects }) {
  const [generating, setGenerating] = useState('');

  const download = async (format) => {
    setGenerating(format.id);
    try {
      const data = { profile, skills, experience, projects };
      const blob = await pdf(<format.Doc data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${slugForFile(profile?.name)}-${format.filenameSuffix}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('CV generation failed', err);
      window.alert('Something went wrong generating that CV. Please try again.');
    }
    setGenerating('');
  };

  return (
    <div className="panel-2 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-1">
        <FileText size={15} />
        <span className="font-display font-semibold" style={{ fontSize: 15 }}>Download your CV</span>
      </div>
      <p className="text-muted mb-4" style={{ fontSize: 12, lineHeight: 1.6 }}>
        Generated from your portfolio content. Pick the format that fits where you're applying.
      </p>
      <div className="grid md:grid-cols-3 gap-3">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            className="btn btn-outline"
            style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4, height: 'auto', padding: '12px 14px', textAlign: 'left' }}
            onClick={() => download(f)}
            disabled={!!generating}
          >
            <span className="flex items-center gap-2" style={{ fontSize: 13, fontWeight: 600 }}>
              {generating === f.id ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
              {f.label}
            </span>
            <span className="text-muted" style={{ fontSize: 10.5, fontWeight: 400, whiteSpace: 'normal' }}>{f.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
