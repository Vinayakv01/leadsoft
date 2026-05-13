const fs = require('fs');
const path = require('path');

const backupFile = 'C:/Users/UniTech-07/Desktop/testing/New folder/db_cluster-31-08-2025@05-11-07.backup';
const outputFile = path.join(__dirname, 'crm_data.json');

const content = fs.readFileSync(backupFile, 'utf8');
const lines = content.split('\n');

// Helper function to parse COPY data
function parseCopyData(lines, startIndex) {
  const data = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    if (line === '\\.' || line.trim() === '') break;
    if (line.includes('COPY') || line.includes('--')) {
      i++;
      continue;
    }
    data.push(line);
    i++;
  }

  return { data, endIndex: i };
}

// Helper to parse tab-separated line into object
function parseLineToObject(line, columns) {
  const values = line.split('\t').map(v => v === '\\N' ? null : v);
  const obj = {};
  columns.forEach((col, idx) => {
    obj[col] = values[idx] || null;
  });
  return obj;
}

// Define schemas for rich data tables
const schemas = {
  'banking_industry_sheet1': [
    'id', 'first_name', 'last_name', 'title', 'company', 'company_name_for_emails',
    'email', 'email_status', 'email_confidence', 'seniority', 'departments', 'first_phone',
    'work_direct_phone', 'mobile_phone', 'corporate_phone', 'stage', 'employees',
    'industry', 'keywords', 'person_linkedin_url', 'website', 'city', 'state', 'country',
    'company_address', 'company_city', 'company_state', 'company_country', 'company_phone',
    'annual_revenue', 'total_funding', 'technologies', 'email_sent', 'email_open',
    'email_bounced', 'replied', 'demoed'
  ],
  'col_50_000_ceo_list_51_200_employee_owner_ceo_presidents_founde': [
    'id', 'first_name', 'last_name', 'title', 'company', 'email', 'email_status',
    'seniority', 'departments', 'first_phone', 'mobile_phone', 'employees', 'industry',
    'keywords', 'person_linkedin_url', 'website', 'city', 'state', 'country',
    'company_phone', 'annual_revenue', 'total_funding', 'email_sent', 'email_open',
    'email_bounced', 'replied', 'demoed', 'stage'
  ],
  'cybersecurity_ceo_founder_uk_eu_scandinavia_mainsheet_ok_only': [
    'id', 'first_name', 'last_name', 'full_name', 'linkedin_link', 'title', 'email',
    'seniority', 'headline', 'city', 'state', 'country', 'company_name', 'company_website_full',
    'company_linkedin_link', 'company_phone_number', 'industry', 'employee_count',
    'technologies', 'is_likely_to_engage'
  ],
  'it_companies_usa_ceo_s_10_mainsheet': [
    'id', 'first_name', 'last_name', 'full_name', 'title', 'headline', 'seniority', 'email',
    'email_status', 'linkedin_link', 'lead_city', 'lead_state', 'lead_country', 'company_name',
    'industry', 'employee_count', 'departments', 'company_website_full', 'company_linkedin_link',
    'company_phone_number', 'company_city', 'company_state', 'company_country',
    'company_annual_revenue', 'company_total_funding'
  ],
  'edtech_7k_systematik_batch_1': [
    'id', 'first_name', 'last_name', 'email', 'organization_name', 'organization_website_url',
    'linkedin_url', 'estimated_num_employees', 'title', 'industry'
  ],
  'medical_manufacturing_14k': [
    'id', 'first_name', 'last_name', 'email', 'organization_website_url', 'organization_name',
    'linkedin_url', 'country', 'seniority', 'headline', 'industry', 'city', 'title',
    'estimated_num_employees'
  ],
  'renewable_fixed2': [
    'id', 'first_name', 'last_name', 'full_name', 'title', 'headline', 'seniority',
    'linkedin_link', 'email', 'millionverifier', 'lead_city', 'lead_state', 'lead_country',
    'company_name', 'industry', 'employee_count', 'company_website_full', 'company_linkedin_link',
    'company_phone_number', 'company_annual_revenue', 'company_total_funding'
  ],
  'saas_11k': [
    'id', 'first_name', 'last_name', 'email', 'company_name', 'job_title', 'industry',
    'seniority', 'phone_number', 'linkedin_url', 'website', 'company_size', 'city', 'country'
  ],
  'real_estate_data': [
    'id', 'email', 'company', 'address', 'city', 'state', 'zipcode', 'phone_number', 'website'
  ]
};

// Parse the backup file
const tables = {};
let currentTable = null;
let currentColumns = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect new table COPY statement
  const copyMatch = line.match(/^COPY public\.(\w+)\s*\((.+?)\)\s*FROM stdin;/);
  if (copyMatch) {
    currentTable = copyMatch[1];
    const columnsStr = copyMatch[2];
    currentColumns = columnsStr.split(',').map(c => c.trim());
    continue;
  }

  // Parse data rows
  if (currentTable && line !== '\\.' && line.trim() && !line.startsWith('--')) {
    if (!tables[currentTable]) {
      tables[currentTable] = { columns: currentColumns, data: [] };
    }
    const values = line.split('\t').map(v => v === '\\N' ? null : v);
    if (values.length >= 2) {
      const row = {};
      currentColumns.forEach((col, idx) => {
        row[col] = values[idx] || null;
      });
      tables[currentTable].data.push(row);
    }
  }

  // End of table data
  if (line === '\\.') {
    currentTable = null;
    currentColumns = [];
  }
}

// Unified leads with rich data
function createUnifiedLead(row, source) {
  return {
    id: row.id || `${source}_${Math.random().toString(36).substr(2, 9)}`,
    firstName: row.first_name || row.firstName || row.first || null,
    lastName: row.last_name || row.lastName || row.last || null,
    fullName: row.full_name || row.name || `${row.first_name || ''} ${row.last_name || ''}`.trim() || null,
    email: row.email || row.work_email || null,
    emailStatus: row.email_status || row.verification || row.millionverifier_status || null,
    phone: row.first_phone || row.phone || row.mobile_phone || row.phone_number || null,
    company: row.company || row.company_name || row.organization_name || null,
    title: row.title || row.job_title || row.position || row.headline || null,
    seniority: row.seniority || null,
    industry: row.industry || null,
    city: row.city || row.lead_city || row.company_city || null,
    state: row.state || row.lead_state || row.company_state || null,
    country: row.country || row.lead_country || row.company_country || null,
    website: row.website || row.company_website_full || row.organization_website_url || null,
    linkedin: row.person_linkedin_url || row.linkedin_link || row.linkedin_url || null,
    companyLinkedin: row.company_linkedin_url || row.company_linkedin_link || null,
    employees: row.employees || row.employee_count || row.estimated_num_employees || null,
    revenue: row.annual_revenue || row.company_annual_revenue || null,
    funding: row.total_funding || row.company_total_funding || null,
    technologies: row.technologies || row.company_technologies || null,
    keywords: row.keywords || row.company_keywords || null,
    stage: row.stage || row.verification_status || 'new',
    source: source,
    createdAt: new Date().toISOString(),
    notes: [],
    activities: [],
    tasks: []
  };
}

// Build unified leads array
const unifiedLeads = [];

// Process banking industry data
if (tables.banking_industry_sheet1) {
  tables.banking_industry_sheet1.data.slice(0, 500).forEach(row => {
    unifiedLeads.push(createUnifiedLead(row, 'Banking'));
  });
}

// Process CEO list data
if (tables.col_50_000_ceo_list_51_200_employee_owner_ceo_presidents_founde) {
  tables.col_50_000_ceo_list_51_200_employee_owner_ceo_presidents_founde.data.slice(0, 500).forEach(row => {
    unifiedLeads.push(createUnifiedLead(row, 'CEO'));
  });
}

// Process cybersecurity data
if (tables.cybersecurity_ceo_founder_uk_eu_scandinavia_mainsheet_ok_only) {
  tables.cybersecurity_ceo_founder_uk_eu_scandinavia_mainsheet_ok_only.data.slice(0, 300).forEach(row => {
    unifiedLeads.push(createUnifiedLead(row, 'Cybersecurity'));
  });
}

// Process IT companies data
if (tables.it_companies_usa_ceo_s_10_mainsheet) {
  tables.it_companies_usa_ceo_s_10_mainsheet.data.slice(0, 500).forEach(row => {
    unifiedLeads.push(createUnifiedLead(row, 'IT'));
  });
}

// Process edtech data
if (tables.edtech_7k_systematik_batch_1) {
  tables.edtech_7k_systematik_batch_1.data.slice(0, 200).forEach(row => {
    unifiedLeads.push(createUnifiedLead(row, 'EdTech'));
  });
}

// Process medical manufacturing
if (tables.medical_manufacturing_14k) {
  tables.medical_manufacturing_14k.data.slice(0, 300).forEach(row => {
    unifiedLeads.push(createUnifiedLead(row, 'Medical'));
  });
}

// Process renewable energy
if (tables.renewable_fixed2) {
  tables.renewable_fixed2.data.slice(0, 300).forEach(row => {
    unifiedLeads.push(createUnifiedLead(row, 'Renewable'));
  });
}

// Extract unique industries
const industries = [...new Set(unifiedLeads.map(l => l.industry).filter(Boolean))].sort();

// Extract unique companies
const companies = [...new Set(unifiedLeads.map(l => l.company).filter(Boolean))];

// Build stats
const statusCounts = unifiedLeads.reduce((acc, lead) => {
  const status = lead.stage || 'new';
  acc[status] = (acc[status] || 0) + 1;
  return acc;
}, {});

const industryCounts = unifiedLeads.reduce((acc, lead) => {
  if (lead.industry) {
    acc[lead.industry] = (acc[lead.industry] || 0) + 1;
  }
  return acc;
}, {});

const sourceCounts = unifiedLeads.reduce((acc, lead) => {
  const source = lead.source || 'unknown';
  acc[source] = (acc[source] || 0) + 1;
  return acc;
}, {});

// Create final output
const result = {
  metadata: {
    total_leads: unifiedLeads.length,
    extraction_date: new Date().toISOString(),
    unique_industries: industries.length,
    unique_companies: companies.length,
    status_distribution: statusCounts,
    industry_distribution: Object.entries(industryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}),
    source_distribution: sourceCounts
  },
  industries: industries,
  leads: unifiedLeads
};

fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log(`Extracted ${unifiedLeads.length} unified leads`);
console.log('Industries found:', industries.length);
console.log('Top industries:', Object.entries(industryCounts).sort((a,b) => b[1]-a[1]).slice(0, 10));