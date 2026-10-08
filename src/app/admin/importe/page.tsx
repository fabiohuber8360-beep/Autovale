import ImporteClient from './importe-client';

export const dynamic = 'force-dynamic';

async function loadExports() {
  try {
    const { createServiceClient } = await import('@/lib/supabase');
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('autovale_exports')
      .select('*')
      .order('exported_at', { ascending: false });

    if (error) return { data: null, error: error.message };
    return { data: data ?? [], error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Unbekannter Fehler' };
  }
}

export default async function AutoHubImportePage() {
  const result = await loadExports();

  if (result.error) {
    return (
      <div className="p-8">
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          Fehler beim Laden: {result.error}
        </div>
      </div>
    );
  }

  return <ImporteClient initialExports={result.data ?? []} />;
}
