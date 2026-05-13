const fs = require('fs');
const path = require('path');

const backupFile = 'C:/Users/UniTech-07/Desktop/testing/New folder/db_cluster-31-08-2025@05-11-07.backup';
const outputFile = path.join(__dirname, 'leads.json');

const content = fs.readFileSync(backupFile, 'utf8');
const lines = content.split('\n');

// Extract all_leads_2025_08_18 data (847 leads)
const leads = [];
let inLeadsSection = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes('COPY public.all_leads_2025_08_18')) {
    inLeadsSection = true;
    continue;
  }

  if (inLeadsSection) {
    if (line === '\\.' || line.trim() === '') {
      inLeadsSection = false;
      break;
    }
    if (line.includes('COPY') || line.includes('--')) continue;

    const parts = line.split('\t');
    if (parts.length >= 7) {
      const lead = {
        id: parseInt(parts[0]),
        name: parts[1] !== '\\N' ? parts[1] : null,
        headline: parts[2] !== '\\N' ? parts[2] : null,
        job_title: parts[3] !== '\\N' ? parts[3] : null,
        status: parts[4] !== '\\N' ? parts[4] : null,
        company: parts[5] !== '\\N' ? parts[5] : null,
        campaign_id: parts[6] !== '\\N' ? parts[6] : null
      };
      leads.push(lead);
    }
  }
}

// Stats
const statusCounts = leads.reduce((acc, lead) => {
  const status = lead.status || 'Unknown';
  acc[status] = (acc[status] || 0) + 1;
  return acc;
}, {});

const companyCounts = leads.reduce((acc, lead) => {
  if (lead.company) {
    acc[lead.company] = (acc[lead.company] || 0) + 1;
  }
  return acc;
}, {});

const topCompanies = Object.entries(companyCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([company, count]) => ({ company, count }));

const result = {
  metadata: {
    total_leads: leads.length,
    extraction_date: new Date().toISOString(),
    source: 'all_leads_2025_08_18',
    status_distribution: statusCounts,
    top_companies: topCompanies
  },
  leads: leads
};

fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log(`Extracted ${leads.length} leads to ${outputFile}`);
console.log('Status distribution:', statusCounts);