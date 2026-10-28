-- ============================================================================
-- THE COMPLETE PLAYER HUB (CPH) — DEDICATED SUPABASE DATABASE SCHEMA
-- ============================================================================
-- Independent database schema isolated from M3SH internal CRM infrastructure.
-- Run this script in the Supabase SQL Editor for the CPH project.
-- Targets: thecompleteplayerhub.com
-- ============================================================================

-- Ensure uuid-ossp extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. TABLE: cph_waitlist
-- Captures priority launch waitlist submissions from the CPH Landing Page &
-- Digital Concierge (October 1, 2026 launch cohort).
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.cph_waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    role TEXT NOT NULL DEFAULT 'Parent' CHECK (role IN ('Parent', 'Trainer', 'Service Provider', 'Athlete', 'Coach', 'Academy/Partner', 'General')),
    name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    diagnostic_meta JSONB DEFAULT '{}'::jsonb,
    crm_source TEXT DEFAULT 'cph_digital_concierge',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'onboarded', 'archived')),
    notes TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 2. TABLE: cph_inquiries
-- Captures inbound contact form submissions, academy partner inquiries, and
-- Concierge escalated questions for Sol & Heather Salinas.
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.cph_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    role TEXT DEFAULT 'General',
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'contact_form' CHECK (source IN ('contact_form', 'concierge_escalation', 'direct_email', 'partner_portal')),
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'in_progress', 'responded', 'closed')),
    notes TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- 3. AUTOMATIC UPDATED_AT TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_cph_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_cph_waitlist_updated_at ON public.cph_waitlist;
CREATE TRIGGER trigger_cph_waitlist_updated_at
    BEFORE UPDATE ON public.cph_waitlist
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_cph_updated_at();

DROP TRIGGER IF EXISTS trigger_cph_inquiries_updated_at ON public.cph_inquiries;
CREATE TRIGGER trigger_cph_inquiries_updated_at
    BEFORE UPDATE ON public.cph_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_cph_updated_at();

-- ============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- Web visitors submit leads anonymously without login.
-- Admins (authenticated) or Backend Service Role have full read/write access.
-- ============================================================================
ALTER TABLE public.cph_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cph_inquiries ENABLE ROW LEVEL SECURITY;

-- 4.1 cph_waitlist policies
DROP POLICY IF EXISTS "cph_waitlist_public_insert" ON public.cph_waitlist;
CREATE POLICY "cph_waitlist_public_insert"
    ON public.cph_waitlist
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "cph_waitlist_admin_select" ON public.cph_waitlist;
CREATE POLICY "cph_waitlist_admin_select"
    ON public.cph_waitlist
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "cph_waitlist_admin_update" ON public.cph_waitlist;
CREATE POLICY "cph_waitlist_admin_update"
    ON public.cph_waitlist
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "cph_waitlist_service_all" ON public.cph_waitlist;
CREATE POLICY "cph_waitlist_service_all"
    ON public.cph_waitlist
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 4.2 cph_inquiries policies
DROP POLICY IF EXISTS "cph_inquiries_public_insert" ON public.cph_inquiries;
CREATE POLICY "cph_inquiries_public_insert"
    ON public.cph_inquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "cph_inquiries_admin_select" ON public.cph_inquiries;
CREATE POLICY "cph_inquiries_admin_select"
    ON public.cph_inquiries
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "cph_inquiries_admin_update" ON public.cph_inquiries;
CREATE POLICY "cph_inquiries_admin_update"
    ON public.cph_inquiries
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "cph_inquiries_service_all" ON public.cph_inquiries;
CREATE POLICY "cph_inquiries_service_all"
    ON public.cph_inquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- 5. PERFORMANCE INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_cph_waitlist_created ON public.cph_waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cph_waitlist_email ON public.cph_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_cph_waitlist_role ON public.cph_waitlist(role);
CREATE INDEX IF NOT EXISTS idx_cph_waitlist_status ON public.cph_waitlist(status);

CREATE INDEX IF NOT EXISTS idx_cph_inquiries_created ON public.cph_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cph_inquiries_email ON public.cph_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_cph_inquiries_status ON public.cph_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_cph_inquiries_source ON public.cph_inquiries(source);

-- ============================================================================
-- 6. REALTIME REPLICATION (OPTIONAL)
-- Enables instant live updates in Sol's intake dashboard whenever a lead arrives
-- ============================================================================
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.cph_waitlist;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.cph_inquiries;
    END IF;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
