// Shared incident aggregate loaders backed by the ServiceNow Aggregate (Stats)
// REST API via aiuxFetch (SSR auth/tracing handled by the platform).
// Plain data in, plain data out — no DOM or Lit objects.
import {aiuxFetch} from '@servicenow/aiux/aiux-components-core';

const STATS_PATH = '/api/now/stats/incident';

async function getStats(params) {
  const qs = new URLSearchParams({sysparm_count: 'true', ...params});
  const resp = await aiuxFetch(`${STATS_PATH}?${qs}`);
  if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
  const json = await resp.json();
  return json?.result;
}

/** Count incidents matching an encoded query. */
export async function countIncidents(query) {
  const result = await getStats({sysparm_query: query});
  return Number(result?.stats?.count ?? 0);
}

/**
 * Count incidents matching `query`, grouped by `field`.
 * Returns [{id, label, count}] where `id` is the raw value and `label` the
 * display value.
 */
export async function countIncidentsBy(query, field) {
  const [raw, display] = await Promise.all([
    getStats({
      sysparm_query: query,
      sysparm_group_by: field,
      sysparm_order_by: field
    }),
    getStats({
      sysparm_query: query,
      sysparm_group_by: field,
      sysparm_order_by: field,
      sysparm_display_value: 'true'
    })
  ]);
  const rows = Array.isArray(raw) ? raw : [];
  const labels = Array.isArray(display) ? display : [];
  return rows.map((row, i) => {
    const id = row?.groupby_fields?.[0]?.value ?? '';
    const label = labels[i]?.groupby_fields?.[0]?.value || id;
    return {id, label, count: Number(row?.stats?.count ?? 0)};
  });
}
