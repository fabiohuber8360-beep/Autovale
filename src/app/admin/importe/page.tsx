import { createServiceClient } from '@/lib/supabase';
import ImporteClient from './importe-client';

export const dynamic = 'force-dynamic';

export default async function AutoHubImportePage() {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('autovale_exports')
      .select('*')
      .order('exported_at', { ascending: false });

    if (error) throw error;
    return <ImporteClient initialExports={data ?? []} />;
  } catch (e) {
    return (
      <div className="p-8">
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          Fehler beim Laden: {e instanceof Error ? e.message : 'Unbekannter Fehler'}
        </div>
      </div>
    );
  }
}
