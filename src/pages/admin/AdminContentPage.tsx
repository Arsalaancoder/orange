import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Image as ImageIcon, Loader2, Save, RefreshCw, X } from 'lucide-react';
import { api, type MediaAsset } from '@/services/api';
import { mergeSiteContent, siteContentFields, type SiteContentDocument } from '@/data/siteContent';
import type { Program } from '@/data/programs';
import { useSiteContent } from '@/context/SiteContentContext';

type MediaTarget = { type: 'text'; key: string } | { type: 'program' };

export const AdminContentPage: React.FC = () => {
  const { getToken } = useAuth();
  const { refresh } = useSiteContent();
  const [draft, setDraft] = useState<SiteContentDocument>(() => mergeSiteContent(null));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [selectedProgramId, setSelectedProgramId] = useState(draft.programs[0]?.id || '');
  const [mediaTarget, setMediaTarget] = useState<MediaTarget | null>(null);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [mediaCursor, setMediaCursor] = useState<string | null>(null);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaError, setMediaError] = useState('');

  const selectedProgram = draft.programs.find((program) => program.id === selectedProgramId) || draft.programs[0];
  const fieldGroups = useMemo(() => [...new Set(siteContentFields.map((field) => field.group))], []);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error('Your Clerk session is unavailable. Sign in again.');
        const saved = await api.getAdminSiteContent(token);
        if (active) {
          const next = mergeSiteContent(saved);
          setDraft(next);
          setSelectedProgramId(next.programs[0]?.id || '');
        }
      } catch (error) {
        if (active) setLoadError(error instanceof Error ? error.message : 'Could not load website content.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [getToken]);

  const setText = (key: string, value: string) => {
    setDraft((current) => ({ ...current, text: { ...current.text, [key]: value } }));
    setSaveMessage('');
  };

  const updateProgram = (key: keyof Program, value: unknown) => {
    if (!selectedProgram) return;
    setDraft((current) => ({
      ...current,
      programs: current.programs.map((program) => program.id === selectedProgram.id
        ? { ...program, [key]: value }
        : program),
    }));
    setSaveMessage('');
  };

  const openMediaPicker = async (target: MediaTarget) => {
    setMediaTarget(target);
    setMediaAssets([]);
    setMediaCursor(null);
    setMediaError('');
    setMediaLoading(true);
    try {
      const token = await getToken();
      if (!token) throw new Error('Your Clerk session is unavailable. Sign in again.');
      const result = await api.getAdminMedia(token);
      setMediaAssets(result.assets);
      setMediaCursor(result.cursor);
    } catch (error) {
      setMediaError(error instanceof Error ? error.message : 'Could not load R2 media.');
    } finally {
      setMediaLoading(false);
    }
  };

  const loadMoreMedia = async () => {
    if (!mediaCursor) return;
    setMediaLoading(true);
    setMediaError('');
    try {
      const token = await getToken();
      if (!token) throw new Error('Your Clerk session is unavailable. Sign in again.');
      const result = await api.getAdminMedia(token, mediaCursor);
      setMediaAssets((current) => [...current, ...result.assets]);
      setMediaCursor(result.cursor);
    } catch (error) {
      setMediaError(error instanceof Error ? error.message : 'Could not load more R2 media.');
    } finally {
      setMediaLoading(false);
    }
  };

  const chooseMedia = (asset: MediaAsset) => {
    if (mediaTarget?.type === 'text') setText(mediaTarget.key, asset.url);
    if (mediaTarget?.type === 'program') updateProgram('imageUrl', asset.url);
    setMediaTarget(null);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaveMessage('');
    setLoadError('');

    const missing = siteContentFields.find((field) => !field.optional && !draft.text[field.key]?.trim());
    if (missing) {
      setLoadError(`${missing.label} is required (${missing.group}).`);
      document.getElementById(`content-${missing.key}`)?.focus();
      return;
    }
    if (!draft.programs.length || draft.programs.some((program) => !program.fullTitle.trim() || !program.code.trim() || !program.slug.trim())) {
      setLoadError('Every program must have a title, code, and URL slug.');
      return;
    }
    const slugs = draft.programs.map((program) => program.slug);
    if (new Set(slugs).size !== slugs.length) {
      setLoadError('Program URL slugs must be unique.');
      return;
    }
    const email = draft.text['contact.email'].trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLoadError('Enter a valid contact email address.');
      document.getElementById('content-contact.email')?.focus();
      return;
    }

    setSaving(true);
    try {
      const token = await getToken();
      if (!token) throw new Error('Your Clerk session is unavailable. Sign in again.');
      await api.saveAdminSiteContent(draft, token);
      await refresh();
      setSaveMessage('Website content saved. Public pages will show the changes on their next load.');
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Could not save website content.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex min-h-64 items-center justify-center gap-3 text-sm font-medium text-slate-600"><Loader2 className="h-5 w-5 animate-spin" />Loading website content…</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F26A21]">Website CMS</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">Website content</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Edit the existing homepage, About Us, program catalog, and contact information. Changes save to D1 and appear on public pages.</p>
        </div>
        <button type="button" onClick={() => { setLoading(true); setLoadError(''); void (async () => { try { const token = await getToken(); if (!token) throw new Error('Sign in again to reload content.'); setDraft(mergeSiteContent(await api.getAdminSiteContent(token))); } catch (error) { setLoadError(error instanceof Error ? error.message : 'Could not reload content.'); } finally { setLoading(false); } })(); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          <RefreshCw className="h-4 w-4" /> Reload saved content
        </button>
      </div>

      {loadError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{loadError}</div>}
      {saveMessage && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{saveMessage}</div>}

      <form onSubmit={handleSave} className="space-y-6">
        {fieldGroups.map((group) => (
          <section key={group} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 border-b border-slate-100 pb-3 text-base font-bold text-slate-900">{group}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {siteContentFields.filter((field) => field.group === group).map((field) => (
                <label key={field.key} className="block text-sm font-semibold text-slate-700">
                  <span>{field.label}{field.optional && <span className="ml-1 text-xs font-normal text-slate-400">(optional)</span>}</span>
                  <div className="mt-1.5 flex gap-2">
                    {field.multiline ? (
                      <textarea id={`content-${field.key}`} value={draft.text[field.key] ?? ''} onChange={(event) => setText(field.key, event.target.value)} rows={3} maxLength={10_000} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-[#F26A21] focus:ring-2 focus:ring-orange-100" />
                    ) : (
                      <input id={`content-${field.key}`} value={draft.text[field.key] ?? ''} onChange={(event) => setText(field.key, event.target.value)} maxLength={field.image ? 2048 : 1000} type={field.key === 'contact.email' ? 'email' : 'text'} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-[#F26A21] focus:ring-2 focus:ring-orange-100" />
                    )}
                    {field.image && <button type="button" aria-label={`Choose ${field.label} from media`} onClick={() => void openMediaPicker({ type: 'text', key: field.key })} className="shrink-0 rounded-xl border border-slate-200 px-3 text-slate-600 hover:border-[#F26A21] hover:text-[#F26A21]"><ImageIcon className="h-4 w-4" /></button>}
                  </div>
                </label>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Programs and courses</h2>
              <p className="mt-1 text-sm text-slate-600">Edit the existing course records used by program listings, detail pages, menus, and enquiry forms.</p>
            </div>
            <select aria-label="Select a program" value={selectedProgramId} onChange={(event) => setSelectedProgramId(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold">
              {draft.programs.map((program) => <option key={program.id} value={program.id}>{program.code} — {program.fullTitle}</option>)}
            </select>
          </div>

          {selectedProgram && <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Course code<input value={selectedProgram.code} onChange={(event) => updateProgram('code', event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" maxLength={100} /></label>
            <label className="text-sm font-semibold text-slate-700">Full title<input value={selectedProgram.fullTitle} onChange={(event) => updateProgram('fullTitle', event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" maxLength={300} /></label>
            <label className="text-sm font-semibold text-slate-700">Category<select value={selectedProgram.category} onChange={(event) => updateProgram('category', event.target.value as Program['category'])} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-normal"><option>Nursing</option><option>Paramedical</option></select></label>
            <label className="text-sm font-semibold text-slate-700">Duration<input value={selectedProgram.duration ?? ''} onChange={(event) => updateProgram('duration', event.target.value || null)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" maxLength={100} /></label>
            <label className="text-sm font-semibold text-slate-700">Eligibility<input value={selectedProgram.eligibility ?? ''} onChange={(event) => updateProgram('eligibility', event.target.value || null)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" maxLength={200} /></label>
            <label className="text-sm font-semibold text-slate-700">URL slug<input value={selectedProgram.slug} readOnly className="mt-1.5 w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 font-normal text-slate-500" /></label>
            <label className="text-sm font-semibold text-slate-700 md:col-span-2">Overview<textarea value={selectedProgram.overview} onChange={(event) => updateProgram('overview', event.target.value)} rows={3} maxLength={5000} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label>
            <label className="text-sm font-semibold text-slate-700 md:col-span-2">Description<textarea value={selectedProgram.description} onChange={(event) => updateProgram('description', event.target.value)} rows={3} maxLength={5000} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label>
            <label className="text-sm font-semibold text-slate-700 md:col-span-2">Training statement<textarea value={selectedProgram.trainingStatement ?? ''} onChange={(event) => updateProgram('trainingStatement', event.target.value)} rows={2} maxLength={2000} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label>
            {(['learningAreas', 'trainingAreas', 'careerOpportunities'] as const).map((key) => <label key={key} className="text-sm font-semibold capitalize text-slate-700">{key.replace(/([A-Z])/g, ' $1')}<textarea value={(selectedProgram[key] || []).join('\n')} onChange={(event) => updateProgram(key, event.target.value.split('\n').map((item) => item.trim()).filter(Boolean))} rows={4} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label>)}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700">Course image URL</label>
              <div className="mt-1.5 flex gap-2"><input value={selectedProgram.imageUrl ?? ''} onChange={(event) => updateProgram('imageUrl', event.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /><button type="button" onClick={() => void openMediaPicker({ type: 'program' })} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm hover:border-[#F26A21]"><ImageIcon className="h-4 w-4" />Choose image</button></div>
              {selectedProgram.imageUrl && <img src={selectedProgram.imageUrl} alt="Selected course" className="mt-3 h-28 rounded-lg border border-slate-200 object-cover" />}
            </div>
            <label className="text-sm font-semibold text-slate-700 md:col-span-2">Image label<input value={selectedProgram.imageLabel} onChange={(event) => updateProgram('imageLabel', event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" maxLength={300} /></label>
            <label className="text-sm font-semibold text-slate-700">SEO title<input value={selectedProgram.seoTitle} onChange={(event) => updateProgram('seoTitle', event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" maxLength={300} /></label>
            <label className="text-sm font-semibold text-slate-700">SEO description<textarea value={selectedProgram.seoDescription} onChange={(event) => updateProgram('seoDescription', event.target.value)} rows={2} maxLength={1000} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={selectedProgram.isPrimary} onChange={(event) => updateProgram('isPrimary', event.target.checked)} />Show in primary program catalog</label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={!!selectedProgram.isSubjectToApproval} onChange={(event) => updateProgram('isSubjectToApproval', event.target.checked)} />Subject to approval notice</label>
          </div>}
        </section>

        <div className="sticky bottom-4 flex justify-end rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#F26A21] px-5 py-3 text-sm font-bold text-white hover:bg-[#D95412] disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{saving ? 'Saving…' : 'Save website content'}
          </button>
        </div>
      </form>

      {mediaTarget && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setMediaTarget(null); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="media-picker-title" className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
          <div className="mb-5 flex items-center justify-between"><div><h2 id="media-picker-title" className="text-lg font-bold text-slate-900">Choose from R2 media</h2><p className="mt-1 text-sm text-slate-500">Select an image already stored in the site media bucket.</p></div><button type="button" onClick={() => setMediaTarget(null)} aria-label="Close media picker" className="rounded-lg p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button></div>
          {mediaError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{mediaError}</p>}
          {mediaLoading && <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-[#F26A21]" /></div>}
          {!mediaLoading && mediaAssets.length === 0 && !mediaError && <p className="py-8 text-center text-sm text-slate-500">No images were found in R2.</p>}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{mediaAssets.map((asset) => <button key={asset.key} type="button" onClick={() => chooseMedia(asset)} className="overflow-hidden rounded-xl border border-slate-200 text-left hover:border-[#F26A21] hover:ring-2 hover:ring-orange-100"><img src={asset.url} alt={asset.key} loading="lazy" className="h-32 w-full bg-slate-100 object-cover" /><span className="block truncate px-2 py-2 text-xs font-medium text-slate-700" title={asset.key}>{asset.key}</span></button>)}</div>
          {mediaCursor && <div className="mt-5 text-center"><button type="button" disabled={mediaLoading} onClick={() => void loadMoreMedia()} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold disabled:opacity-50">Load more images</button></div>}
        </section>
      </div>}
    </div>
  );
};
