# Lead Database SQL Queries

This document contains SQL queries for working with the lead data extracted from the PostgreSQL backup file.

## Database Schema

### Main Tables

#### all_leads_2025_08_18
```sql
CREATE TABLE public.all_leads_2025_08_18 (
    id integer NOT NULL,
    name text,
    headline text,
    job_title text,
    status text,
    company text,
    campaign_id text
);
```

#### banking_industry_sheet1
```sql
CREATE TABLE public.banking_industry_sheet1 (
    id integer NOT NULL,
    first_name text,
    last_name text,
    title text,
    company text,
    company_name_for_emails text,
    email text,
    email_status text,
    email_confidence double precision,
    seniority text,
    departments text,
    first_phone text,
    work_direct_phone double precision,
    home_phone double precision,
    mobile_phone double precision,
    corporate_phone text,
    other_phone double precision,
    stage text,
    last_contacted double precision,
    employees bigint,
    industry text,
    keywords text,
    person_linkedin_url text,
    website text,
    company_linkedin_url text,
    facebook_url text,
    twitter_url text,
    city text,
    state text,
    country text,
    company_address text,
    company_city text,
    company_state text,
    company_country text,
    company_phone text,
    seo_description text,
    technologies text,
    annual_revenue double precision,
    total_funding double precision,
    latest_funding text,
    latest_funding_amount double precision,
    last_raised_at text,
    email_sent double precision,
    email_open boolean,
    email_bounced boolean,
    replied boolean,
    demoed boolean,
    number_of_retail_locations double precision,
    apollo_contact_id text,
    apollo_account_id text,
    person_contact double precision
);
```

---

## Query Examples

### 1. Select All Leads
```sql
SELECT * FROM public.all_leads_2025_08_18;
```

### 2. Filter by Status
```sql
-- Get leads by specific status
SELECT * FROM public.all_leads_2025_08_18
WHERE status = 'pending';

-- Get all contacted leads
SELECT * FROM public.all_leads_2025_08_18
WHERE status IN ('pending', 'replied');
```

### 3. Search by Name or Company
```sql
-- Search leads by name containing keyword
SELECT * FROM public.all_leads_2025_08_18
WHERE name ILIKE '%john%';

-- Search by company name
SELECT * FROM public.all_leads_2025_08_18
WHERE company ILIKE '%tech%';
```

### 4. Get Lead Statistics
```sql
-- Count leads by status
SELECT status, COUNT(*) as count
FROM public.all_leads_2025_08_18
GROUP BY status
ORDER BY count DESC;

-- Count leads by company
SELECT company, COUNT(*) as lead_count
FROM public.all_leads_2025_08_18
GROUP BY company
HAVING COUNT(*) > 1
ORDER BY lead_count DESC;
```

### 5. Banking Industry Leads
```sql
-- Get verified banking industry contacts
SELECT first_name, last_name, title, company, email, seniority
FROM public.banking_industry_sheet1
WHERE email_status = 'Verified'
ORDER BY seniority;

-- Get C-suite executives in banking
SELECT first_name, last_name, title, company, email, city, state
FROM public.banking_industry_sheet1
WHERE seniority = 'C suite'
ORDER BY company;
```

### 6. Lead Funnel Analysis
```sql
-- Email campaign performance
SELECT
    email_status,
    COUNT(*) as total,
    SUM(CASE WHEN email_open = true THEN 1 ELSE 0 END) as opened,
    SUM(CASE WHEN email_bounced = true THEN 1 ELSE 0 END) as bounced,
    SUM(CASE WHEN replied = true THEN 1 ELSE 0 END) as replied,
    SUM(CASE WHEN demoed = true THEN 1 ELSE 0 END) as demoed
FROM public.banking_industry_sheet1
GROUP BY email_status;
```

### 7. Filter by Industry
```sql
-- Get leads by industry keyword
SELECT first_name, last_name, title, company, email, industry
FROM public.banking_industry_sheet1
WHERE keywords ILIKE '%saas%' OR industry ILIKE '%saas%';
```

### 8. Pagination Queries
```sql
-- Get first 50 leads
SELECT * FROM public.all_leads_2025_08_18
ORDER BY id
LIMIT 50 OFFSET 0;

-- Get next 50 leads (page 2)
SELECT * FROM public.all_leads_2025_08_18
ORDER BY id
LIMIT 50 OFFSET 50;
```

### 9. Advanced Filtering
```sql
-- Find leads with both email and phone
SELECT
    first_name, last_name, email, first_phone, company
FROM public.banking_industry_sheet1
WHERE email IS NOT NULL
    AND email != '\\N'
    AND first_phone IS NOT NULL
    AND first_phone != '\\N';
```

### 10. Export Query
```sql
-- Export leads as CSV
COPY (
    SELECT name, headline, job_title, status, company
    FROM public.all_leads_2025_08_18
    WHERE status = 'pending'
    ORDER BY company
) TO '/tmp/pending_leads.csv' WITH (FORMAT CSV, HEADER);
```

---

## Useful Views

### Active Leads View
```sql
CREATE VIEW active_leads AS
SELECT
    id,
    name,
    job_title,
    company,
    status,
    CASE
        WHEN status = 'pending' THEN 'Hot'
        WHEN status = 'Not Contacted' THEN 'New'
        WHEN status = 'replied' THEN 'Warm'
        ELSE 'Unknown'
    END as lead_priority
FROM public.all_leads_2025_08_18
WHERE status IS NOT NULL;
```

### Contact Rate Summary
```sql
CREATE VIEW contact_rate_summary AS
SELECT
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status != 'Not Contacted') as contacted,
    ROUND(
        COUNT(*) FILTER (WHERE status != 'Not Contacted') * 100.0 / COUNT(*),
        2
    ) as contact_rate_percent
FROM public.all_leads_2025_08_18;
```

---

## Indexes for Performance

```sql
-- Create indexes for faster queries
CREATE INDEX idx_leads_status ON public.all_leads_2025_08_18(status);
CREATE INDEX idx_leads_company ON public.all_leads_2025_08_18(company);
CREATE INDEX idx_leads_name ON public.all_leads_2025_08_18(name);

-- Banking table indexes
CREATE INDEX idx_banking_email ON public.banking_industry_sheet1(email);
CREATE INDEX idx_banking_seniority ON public.banking_industry_sheet1(seniority);
CREATE INDEX idx_banking_industry ON public.banking_industry_sheet1(industry);
```