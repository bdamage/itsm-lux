import {html, css, nothing} from 'lit';
import {customElement} from 'lit/decorators.js';
import {AIUXElement, decorators} from '@servicenow/aiux/aiux-components-core';
import {i18n} from '@servicenow/aiux/aiux-services';
import '@servicenow/aiux/aiux-components-visualizations-score';
import '@servicenow/aiux/aiux-components-visualizations-composition';
import '@servicenow/aiux/aiux-components-visualizations-axis';
import {countIncidents, countIncidentsBy} from '../../loaders/incident-stats.js';

const {acl} = decorators;

const LAST_7_DAYS =
  'Last 7 days@javascript:gs.beginningOfLast7Days()@javascript:gs.endOfLast7Days()';

const KPIS = [
  {key: 'open', label: () => i18n.getMessage('Open incidents'), query: 'active=true'},
  {key: 'critical', label: () => i18n.getMessage('Critical (P1) open'), query: 'active=true^priority=1'},
  {
    key: 'unassigned',
    label: () => i18n.getMessage('Unassigned open'),
    query: 'active=true^assigned_toISEMPTY'
  },
  {
    key: 'opened7',
    label: () => i18n.getMessage('Opened last 7 days'),
    query: `opened_atON${LAST_7_DAYS}`
  },
  {
    key: 'resolved7',
    label: () => i18n.getMessage('Resolved last 7 days'),
    query: `resolved_atON${LAST_7_DAYS}`
  }
];

const TOP_N = 8;

/** Single-value DataResponse for <aiux-visualizations-score>. */
function scoreData(label, value) {
  return {
    metadata: {
      columns: {
        value: {
          type: 'numerical',
          meaning: 'metric',
          order: 0,
          dataShape: 'single',
          groupedBy: [],
          label
        }
      }
    },
    data: [[String(value)]],
    rendering: {
      columns: {
        value: {role: 'value', formatting: {type: 'number', options: {}}, rules: []}
      }
    },
    interactions: {}
  };
}

/** One-dimension / one-metric DataResponse for composition and axis charts. */
function groupedData(dimLabel, rows) {
  return {
    metadata: {
      columns: {
        group: {
          type: 'categorical',
          meaning: 'dimension',
          order: 0,
          label: dimLabel,
          elements: rows.map(r => ({id: r.id, label: r.label}))
        },
        count: {
          type: 'numerical',
          meaning: 'metric',
          order: 1,
          dataShape: 'single',
          groupedBy: ['group'],
          label: i18n.getMessage('Incidents')
        }
      }
    },
    data: rows.map(r => [r.id, String(r.count)]),
    rendering: {
      columns: {
        group: {role: 'grouping'},
        count: {role: 'value', formatting: {type: 'number', options: {}}, rules: []}
      }
    },
    interactions: {}
  };
}

function topN(rows, emptyLabel) {
  return [...rows]
    .sort((a, b) => b.count - a.count)
    .slice(0, TOP_N)
    .map(r => (r.id ? r : {...r, id: '__empty__', label: emptyLabel}));
}

function settled(result, fallback) {
  return result.status === 'fulfilled' ? result.value : fallback;
}

@customElement('x-snc-itsm-lux-home-page')
@acl([{decision: 'allow_if', roles: ['itil', 'admin'], id: 'itsm-dashboard-access'}])
export default class DashboardPage extends AIUXElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static async loader() {
    const groupFields = ['priority', 'state', 'category', 'assignment_group'];
    const results = await Promise.allSettled([
      ...KPIS.map(k => countIncidents(k.query)),
      ...groupFields.map(f => countIncidentsBy('active=true', f))
    ]);

    const kpis = KPIS.map((k, i) => ({...k, value: settled(results[i], null)}));
    const [byPriority, byState, byCategory, byGroup] = results
      .slice(KPIS.length)
      .map(r => settled(r, null));
    const failed = results.some(r => r.status === 'rejected');

    return {kpis, byPriority, byState, byCategory, byGroup, failed};
  }

  _renderKpi(kpi) {
    const label = kpi.label();
    const href = `./incidents?sysparm_query=${encodeURIComponent(kpi.query)}`;
    return html`
      <li class="aiux-card border border-base-300 bg-base-100 shadow-sm">
        <div class="aiux-card-body gap-2 p-4">
          ${kpi.value === null
            ? html`<p class="text-sm text-text-secondary">${label}: —</p>`
            : html`<aiux-visualizations-score
                .data=${scoreData(label, kpi.value)}
                size="sm"
              ></aiux-visualizations-score>`}
          <a class="aiux-link aiux-link-primary text-sm" href=${href}>
            ${i18n.getMessage('View list')}
            <span class="sr-only">: ${label}</span>
          </a>
        </div>
      </li>
    `;
  }

  _renderChartCard(title, rows, chart) {
    return html`
      <section
        class="aiux-card border border-base-300 bg-base-100 shadow-sm"
        aria-label=${title}
      >
        <div class="aiux-card-body p-4">
          <h2 class="aiux-card-title text-base text-text-primary">${title}</h2>
          ${rows === null
            ? html`<p class="text-sm text-text-secondary">
                ${i18n.getMessage('Data unavailable')}
              </p>`
            : rows.length === 0
              ? html`<p class="text-sm text-text-secondary">
                  ${i18n.getMessage('No active incidents')}
                </p>`
              : html`<div class="h-72">${chart}</div>`}
        </div>
      </section>
    `;
  }

  render() {
    const {kpis = [], byPriority, byState, byCategory, byGroup, failed} =
      this.loaderData || {};
    const priorityTitle = i18n.getMessage('Open incidents by priority');
    const stateTitle = i18n.getMessage('Open incidents by state');
    const categoryTitle = i18n.getMessage('Top categories (open)');
    const groupTitle = i18n.getMessage('Top assignment groups (open)');
    const category = byCategory ? topN(byCategory, i18n.getMessage('(No category)')) : null;
    const group = byGroup ? topN(byGroup, i18n.getMessage('(Unassigned)')) : null;

    return html`
      <div class="mx-auto flex max-w-7xl flex-col gap-6 p-4 lg:p-8">
        <header class="flex flex-col gap-1">
          <h1 class="text-3xl font-bold tracking-tight text-text-primary">
            ${i18n.getMessage('ITSM Dashboard')}
          </h1>
          <p class="text-sm text-text-secondary">
            ${i18n.getMessage('Live incident metrics from this instance.')}
          </p>
        </header>

        ${failed
          ? html`<div class="aiux-alert aiux-alert-warning aiux-alert-soft" role="status">
              ${i18n.getMessage('Some metrics could not be loaded.')}
            </div>`
          : nothing}

        <ul
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          aria-label=${i18n.getMessage('Key metrics')}
        >
          ${kpis.map(k => this._renderKpi(k))}
        </ul>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          ${this._renderChartCard(
            priorityTitle,
            byPriority,
            html`<aiux-visualizations-composition
              type="donut"
              .data=${groupedData(i18n.getMessage('Priority'), byPriority || [])}
              .legend=${{position: 'right'}}
              .centerContent=${{mode: 'data', size: 'small'}}
            ></aiux-visualizations-composition>`
          )}
          ${this._renderChartCard(
            stateTitle,
            byState,
            html`<aiux-visualizations-axis
              type="column"
              .data=${groupedData(i18n.getMessage('State'), byState || [])}
            ></aiux-visualizations-axis>`
          )}
          ${this._renderChartCard(
            categoryTitle,
            category,
            html`<aiux-visualizations-axis
              type="bar"
              .data=${groupedData(i18n.getMessage('Category'), category || [])}
            ></aiux-visualizations-axis>`
          )}
          ${this._renderChartCard(
            groupTitle,
            group,
            html`<aiux-visualizations-axis
              type="bar"
              .data=${groupedData(i18n.getMessage('Assignment group'), group || [])}
            ></aiux-visualizations-axis>`
          )}
        </div>
      </div>
    `;
  }
}
