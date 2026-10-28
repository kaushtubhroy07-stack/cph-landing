/**
 * Complete Player Hub (CPH) Digital Concierge
 * Version: 4.1.0 — Living Ambient Guidance, Controlled Token Streaming & Player Diagnostic Engine
 * 
 * Features:
 * 1. Proactive Ambient Guidance: Glides in on scroll with dynamic insider notes & quick action pills.
 * 2. Token-by-Token Live Streaming: Readable, paced typing generation with instant tap-to-complete.
 * 3. 30-Second Player Development Diagnostic: Interactive tool to assess player needs, generate a 6-pillar protocol, and match DMV coaches.
 * 4. Dynamic Live Telemetry Ticker: Ambient rotating platform metrics across the DMV ecosystem.
 * 5. Pre-Launch Waitlist Intake Engine with multi-turn conversation memory.
 */

(function () {
    // ─── CONFIGURATION ───
    const CONFIG = {
        API_ENDPOINTS: [
            "/api/chat/cph",
            "http://localhost:8080/api/chat/cph",
            "http://127.0.0.1:8080/api/chat/cph"
        ],
        INGEST_URL: "/api/cph/waitlist",
        THEME_COLOR: "#ff5a00", // Mercurial Orange
        THEME_GRADIENT: "linear-gradient(135deg, #ff8c00 0%, #ff5a00 50%, #ff2a00 100%)",
        BG_COLOR: "rgba(7, 11, 19, 0.95)",
        BORDER_COLOR: "rgba(255, 255, 255, 0.12)"
    };

    // ─── LIVE TELEMETRY METRICS ───
    const TELEMETRY_FEED = [
        "🟢 Founding Provider Cohort: 4 Months Free Trial Open for Coaches & Businesses",
        "📍 Servicing the DMV: Local In-Person Hubs & Nationwide Virtual Specialists",
        "⚡ 1,200+ Touches/Hr Protocol & 6 Core Pillars + Recruiting, NIL & Global Tours",
        "📰 Substack: 'The Science of Compression' & 'The Sleep Advantage' Live",
        "🤝 Dual Booking Model: Direct Coach Booking & Academy Discovery Calls",
        "⏳ Pre-Launch Phase: Launching Fall 2026 — Priority Waitlist Open"
    ];

    // ─── SEGMENT STORYLINES & AMBIENT CAPSULES (FORCE AUDIENCE PERSPECTIVE) ───
    const STORYLINES = {
        "hero-segment": {
            badge: "THE CPH VISION",
            title: "Beyond The Directory Listing",
            ambientNote: "💡 Founder's Perspective: Most sports apps are just directories. We built CPH as an integrated development system for serious DMV soccer families.",
            narrative: "Most sports apps are just booking directories. What Sol and Heather realized after years navigating the DMV youth circuit is that parents don't need another list—they need an integrated development system connecting high-repetition technical mastery, injury prevention, mental resilience, and academic pathways in one trusted place.",
            userPrompt: "What is the vision behind The Complete Player Hub in the DMV?",
            topic: "thesis",
            chips: [
                { label: "🎯 30s Player Diagnostic", action: "start_diagnostic" },
                { label: "💡 Why build CPH in the DMV?", query: "Why did Sol and Heather build CPH specifically for the DMV youth soccer ecosystem?" },
                { label: "⚽ What are the 6 Pillars?", query: "What is the real insight behind the 6 development pillars?" },
                { label: "🚀 Join Pre-Launch Waitlist", action: "start_waitlist" }
            ]
        },
        "device-segment": {
            badge: "360° DEVELOPMENT MODEL",
            title: "Closed-Loop Development Architecture",
            ambientNote: "💡 Core Truth: High skills mean nothing if tryout anxiety locks decision speed or fatigue leads to preventable injury.",
            narrative: "A player can have world-class footwork, but if their deceleration biomechanics cause an ACL tear or tryout anxiety locks their decision speed, their ceiling collapses. CPH makes holistic development systematic, not accidental.",
            userPrompt: "How does the 360° closed-loop development model work?",
            topic: "pillars",
            chips: [
                { label: "🔄 How does the closed-loop work?", query: "Explain how the 6 pillars function as a closed-loop performance system." },
                { label: "🛡️ Youth ACL Prevention?", query: "How does CPH address youth ACL and hamstring injury prevention?" },
                { label: "🎯 30s Player Diagnostic", action: "start_diagnostic" },
                { label: "📺 Watch Video Intro", action: "video_modal" }
            ]
        },
        "gateway": {
            badge: "DMV SOCCER ECOSYSTEM",
            title: "Individual Coaches & Training Businesses",
            ambientNote: "💡 Curated Marketplace: Individual coaches, performance specialists, and training businesses servicing DMV families in-person and virtually.",
            narrative: "Half of our provider network consists of individual coaches and specialists, and half are established training businesses and academies—servicing the DMV both in-person locally and virtually nationwide. Parents can book and pay individual coaches directly on CPH, or schedule discovery calls and connect directly with partner academies.",
            userPrompt: "How does CPH work for individual coaches, training businesses, and DMV parents?",
            topic: "coaches",
            chips: [
                { label: "🔍 Coaches vs. Academies?", query: "How does booking work for individual coaches versus training businesses and academies?" },
                { label: "🎁 Founding Provider Offer", query: "What is the Founding Provider offer and 4-month free trial?" },
                { label: "👨‍👩‍👧 Parent Portal & Transparency", query: "How does CPH help busy soccer parents in DC, Maryland, and Virginia?" },
                { label: "🛡️ Join as Coach / Provider", action: "start_waitlist" }
            ]
        },
        "pillars": {
            badge: "THE 6 DEVELOPMENT PILLARS",
            title: "Stress-Test Performance Ecosystem",
            ambientNote: "💡 Core Benchmarks: 1,200+ touches/hr, 0.5+ cognitive scans/sec, and 70%+ daily HGH release during deep sleep.",
            narrative: "The 6 pillars aren’t a checklist—they’re a stress-tested feedback loop: 1,200+ touches/hr, 0.5+ cognitive scans/sec, deceleration bio-mechanics, sports psychology with Jenn Ireland, matchday fueling, and deep sleep HGH release.",
            userPrompt: "Why is 1,200+ touches per hour the technical benchmark?",
            topic: "technical",
            chips: [
                { label: "⚡ Why 1,200+ Touches/hr?", query: "Why is 1,200+ touches per hour the technical benchmark?" },
                { label: "🧠 Scanning IQ (0.5/sec)", query: "How do you train tactical cognitive scanning speed in youth athletes?" },
                { label: "🧘 Mental Game (Jenn Ireland)", query: "Tell me about the mental performance pillar and Jenn Ireland's approach." },
                { label: "😴 Deep Sleep & HGH Release", query: "What is the science behind sleep and human growth hormone release in youth players?" }
            ]
        },
        "our-story": {
            badge: "BUILT BY DMV SOCCER PARENTS",
            title: "Built by DMV Soccer Parents",
            ambientNote: "💡 Built by Parents: Sol & Heather created CPH after experiencing the fragmented travel soccer grind firsthand.",
            narrative: "Sol and Heather didn't start CPH as software executives—they built it as parents of Morgan, watching the trial-and-error frustration every DMV family endures. This platform is the unified playbook they wished existed 7 years ago.",
            userPrompt: "What advice does Sol have for parents navigating the DMV soccer system?",
            topic: "mistake",
            chips: [
                { label: "📖 Sol & Heather's Journey", query: "Tell me the story behind Sol and Heather Salinas and why they built CPH." },
                { label: "⚠️ Biggest Parent Mistake?", query: "What was the biggest mistake you made as travel soccer parents navigating the DMV system?" },
                { label: "💡 Sol's Advice for Parents", query: "What advice does Sol have for parents navigating the DMV soccer system?" },
                { label: "✉️ Message Sol & Heather", query: "How do I contact Sol and Heather directly?" }
            ]
        },
        "insights": {
            badge: "SPORTS SCIENCE & RESEARCH",
            title: "Evidence-Based Player Development",
            ambientNote: "💡 Sports Science: Weekly research-backed essays on sleep physiology, tryout psychology, and youth athletic longevity.",
            narrative: "Weekly deep dives into sleep physiology (70%+ youth HGH released in deep sleep), tryout anxiety mitigation, and proven player development benchmarks for competitive athletes.",
            userPrompt: "What does sports science say about youth sleep and recovery?",
            topic: "sleep",
            chips: [
                { label: "😴 Sleep & Youth Injury Science", query: "Summarize the Substack article on sleep and athlete growth hormone." },
                { label: "🧠 Managing Tryout Pressure", query: "How does CPH help athletes build mental resilience and handle tryout pressure?" },
                { label: "📰 Open Substack Publication", action: "open_substack" }
            ]
        },
        "waitlist": {
            badge: "FALL 2026 PRE-LAUNCH",
            title: "Fall 2026 Pre-Launch Cohort",
            ambientNote: "💡 Launching Fall 2026: Founding Provider onboarding (4 months free) and priority parent waitlist now open.",
            narrative: "We are onboarding our Founding Provider cohort of coaches, specialists, and training businesses servicing the DMV, and reserving priority access for registered families this Fall. Let's get your spot secured.",
            userPrompt: "How do I register for the Fall 2026 pre-launch waitlist?",
            topic: "waitlist",
            chips: [
                { label: "🚀 Join Pre-Launch Waitlist", action: "start_waitlist" },
                { label: "🎁 Founding Provider Offer", query: "What is the Founding Provider offer and 4-month free trial?" },
                { label: "💰 Is Registration Free?", query: "Is pre-launch registration free for parents, coaches, and service providers?" },
                { label: "📋 Join as Coach / Provider", action: "start_waitlist" }
            ]
        },
        "contact": {
            badge: "CONNECT WITH SOL & HEATHER",
            title: "Direct Connect with Sol & Heather",
            ambientNote: "💡 Direct Access: Sol and Heather personally review all inquiries, custom partnership proposals, and clinic requests.",
            narrative: "Have questions about youth development, Founding Provider onboarding, or training business partnerships? Sol and Heather read and respond to every note personally.",
            userPrompt: "How do I contact Sol and Heather directly?",
            topic: "contact",
            chips: [
                { label: "✉️ How to Message Founders", query: "How do I contact Sol and Heather directly?" },
                { label: "🤝 Academy & Business Partnerships", query: "Can CPH partner with our youth soccer club, academy, or training business?" },
                { label: "📍 Servicing the DMV", query: "Where are your active training locations and virtual services for the DMV?" },
                { label: "🚀 Join Pre-Launch Waitlist", action: "start_waitlist" }
            ]
        }
    };

    // ─── DEEP REASONING LOCAL KNOWLEDGE BASE ───
    const REASONING_FALLBACKS = {
        thesis: `### The Complete Player Hub (CPH) Vision in the DMV

Most sports apps are just fragmented booking calendars. Sol and Heather Salinas saw the real breakdown: **the DMV youth soccer circuit is one of the most competitive yet hyper-fragmented in the country**.

*   **The Parent Pain**: Families spend \$6,000–\$12,000+/yr on club fees, private trainers, and travel showcases without a unified roadmap connecting technical mastery, cognitive speed, and physical health.
*   **The Coach & Provider Pain**: Independent coaches spend 40% of their week managing schedules and chasing payments, while established training businesses struggle to reach targeted soccer families without massive ad spend.
*   **The CPH Solution**: A curated ecosystem where all **6 developmental pillars**—plus **college recruitment specialists**, **NIL & branding coaches**, and **international tournament & training opportunities**—are united in one trusted hub servicing DMV families both in-person locally and virtually nationwide.`,

        pillars: `### The 6 Pillars + Specialized Pathways

Our **6 Core Pillars** function as an integrated physiological and neural feedback loop:

1.  **Technical Ball Mastery**: High-frequency micro-skills (1,200+ touches/hour), weak-foot striking fluency, and contact finishing under defensive pressure.
2.  **Tactical Cognitive IQ**: Developing high-speed visual scanning (0.5+ scans/sec) and off-ball spatial anticipation.
3.  **Physical & Speed Biomechanics**: Multi-directional deceleration training and core stability to prevent youth ACL/hamstring tears.
4.  **Mental Performance**: Sports psychology with specialists like Jenn Ireland (tryout composure, penalty composure, resilience).
5.  **Sports Nutrition**: Matchday fueling windows, tournament weekend glycogen replenishment, and hydration protocols.
6.  **Recovery & Injury Prevention**: Prioritizing mobility, sports physical therapy, and deep slow-wave sleep—which triggers **70%+ of daily human growth hormone (HGH) release** in youth athletes.

**Beyond the 6 Pillars**, CPH also connects families with **College Recruitment Specialists**, **NIL & Branding Coaches**, **Futsal & Domestic Showcases**, and **International Tournament & Training Opportunities**.`,

        technical: `### Technical Ball Mastery (1,200+ Touches/Hour)

In traditional team training, a youth player touches the ball an average of 40–70 times per session. CPH’s technical coaches and academies shift this radically:

*   **Micro-Touch Density**: Structured individual and small-group training engineered to deliver **1,200+ touches per hour**.
*   **Two-Foot Striking Fluency**: Developing equal balance, first touch, and shooting mechanics off both dominant and non-dominant feet.
*   **Pressure Finishing**: Finishing under tight spatial constraints and physical contact, simulating real game speed.`,

        scanning: `### Tactical Cognitive IQ & Visual Scanning (0.5+ Scans/Sec)

Elite players don't just run faster—they process the pitch faster. European and top collegiate benchmarks show that top midfielders scan the field **0.5 times or more per second before receiving the ball**:

*   **Visual Field Mapping**: Training athletes to orient their head and shoulders constantly to map passing lanes, defenders, and space.
*   **Cognitive Anticipation**: Reducing the time between perceiving a tactical change and executing the physical pass or movement.
*   **Game IQ Video Review**: Structured match film breakdowns to help young players analyze their positioning and decision speed.`,

        injury: `### Youth ACL & Hamstring Injury Prevention

During adolescent growth spurts, rapid bone growth often outpaces muscular control and tendon elasticity, significantly spiking non-contact injury rates:

*   **Deceleration Biomechanics**: Most non-contact ACL tears occur during sudden stopping or cutting. We train knee-hip alignment, foot plant mechanics, and force absorption.
*   **Posterior Chain Strength**: Eccentric hamstring loading and glute activation to balance quad dominance.
*   **Core & Rotational Stability**: Building pelvic stability to withstand high-impact physical challenges on the pitch.`,

        mental: `### Mental Performance & Sports Psychology (Jenn Ireland)

High athletic skill means little if tryout anxiety or fear of mistakes freezes an athlete's decision-making:

*   **Tryout & Tournament Anxiety**: Proven cognitive tools to manage pre-match nervousness, performance pressure, and parental expectations.
*   **In-Game Reset Protocols**: Teaching players how to instantly recover focus after a missed shot, turnover, or referee call.
*   **Expand Your Game Partnership**: Working closely with certified sports psychology specialists like **Jenn Ireland** to cultivate self-belief and composure under pressure.`,

        nutrition: `### Sports Nutrition & Matchday Fueling

Proper fueling is the foundation of peak energy and injury resistance for competitive youth soccer players:

*   **Pre-Match Fueling Windows**: What to eat 3–4 hours before kickoff (complex carbohydrates) and 45–60 minutes prior (easily digestible carbs).
*   **Tournament Weekend Glycogen Replenishment**: Rapid recovery fueling between multi-game tournament showcases to prevent 2nd-half fatigue.
*   **Hydration & Electrolytes**: Specific fluid replacement targets to combat cramps, cognitive fatigue, and heat exhaustion.`,

        sleep: `### The Science of Sleep & Growth Hormone in Youth Athletes

In their Substack editorial (*"The Sleep Advantage"*), Sol highlights a critical biological reality often ignored by intense travel schedules:

*   **70%+ of Daily HGH Release**: Occurs during Stage 3 and Stage 4 deep slow-wave sleep in developing teenagers.
*   **Cognitive Decay**: A loss of just 90 minutes of sleep reduces visual scanning accuracy and decision speed on the pitch by up to 25%.
*   **Injury Risk**: Chronic sleep debt increases the likelihood of soft-tissue and musculoskeletal injuries by over 1.7x in competitive adolescent athletes.`,

        founders: `### Sol & Heather Salinas: Why CPH Was Born

Sol and Heather aren’t detached corporate operators—they are authentic DMV soccer parents who lived the grind:

*   **Sol Salinas**: Former Division I collegiate soccer player, youth coach, and executive leadership consultant. He understands both elite athletic rigor and modern enterprise technology.
*   **Heather Salinas**: Experienced the day-to-day logistical chaos, fragmented word-of-mouth searches, and emotional toll of competitive youth soccer with their daughter **Morgan**.
*   **The Mission**: After navigating the trial-and-error path with Morgan, they created CPH to ensure no DMV family has to navigate player development blindly again.`,

        coaches: `### How CPH Works for Coaches, Specialists & Training Businesses

CPH is built for a **50/50 mix of independent coaches and established training businesses** servicing DMV soccer families (both in-person locally and virtually nationwide/internationally):

*   **For Individual Coaches & Trainers**: Parents discover your profile (featuring your licenses, background, and training philosophy) and **book and pay for sessions directly on the CPH platform**.
*   **For Training Businesses & Academies**: Parents can **schedule a discovery call or click straight through to your business website** to book services.
*   **Founding Provider Offer**: Joining as a Founding Provider is **100% free for the first 4 full months** after the platform opens to parents, then transitions to a simple monthly subscription that you can opt out of at any time.`,

        automation: `### Seamless Booking for Coaches & Training Businesses

CPH supports two flexible operational models tailored to how you run your practice:

*   **Direct Platform Booking (Individual Coaches)**: Automated scheduling, calendar sync, and direct Stripe payments eliminate awkward Venmo/Zelle chasing so you can focus 100% on coaching.
*   **Discovery Calls & Website Routing (Established Businesses)**: If your academy or practice already has an established booking website, parents can schedule a discovery call or route directly to your site.
*   **Transparent Bio & Philosophy**: Highlight your coaching licenses, certifications, and training methodology clearly for serious soccer families.`,

        parents: `### How CPH Empowers DMV Soccer Families

CPH is designed to eliminate the guesswork for busy parents across DC, Maryland, and Virginia:

*   **Curated Network Servicing the DMV**: Access local in-person coaches and academies in your neighborhood alongside top nationwide and international virtual specialists (nutrition, mental performance, college recruiting, NIL).
*   **Transparent Credentials & Reviews**: View coaching licenses, qualifications, and training philosophies upfront, plus verified parent reviews from completed bookings.
*   **One Unified Hub**: Book and pay independent coaches directly on CPH, or schedule discovery calls and connect with established training academies in a few taps.`,

        mistake: `### Sol's Perspective: The Biggest Mistakes DMV Soccer Parents Make

Having navigated competitive travel soccer with Morgan, Sol highlights three major traps parents fall into:

1.  **Chasing Badges Over Touches**: Paying \$5,000+ for elite club letters where players touch the ball 40 times in 90 minutes, rather than investing in high-frequency micro-skills (1,200+ touches/hr).
2.  **Treating Development as Piecemeal**: Hiring an isolated speed trainer who doesn't understand the player's weekend club load, leading to chronic overuse and growth-plate flare-ups.
3.  **Ignoring Sleep & Cognitive Load**: Letting teenagers run on 6 hours of sleep during showcase weekends, cutting HGH release by 70% and increasing non-contact ACL/hamstring injury risks by 1.7x.`,

        partnerships: `### CPH Club, Academy & Training Business Partnerships

CPH collaborates with youth soccer clubs, training academies, and performance businesses servicing DC, Maryland, and Virginia (as well as nationwide virtual specialists):

*   **Complementary Ecosystem**: CPH does not compete with clubs—we augment them by giving their players curated off-field resources (mental performance, nutrition, physical therapy, college recruiting, NIL, and supplemental ball mastery).
*   **Built for Businesses Too**: Established businesses can receive discovery call bookings or direct traffic straight to their existing website.
*   **Direct Inquiries**: Contact Sol and Heather Salinas via the contact form below or at **sol@thecompleteplayerhub.com**.`,

        pricing: `### Pricing & Founding Provider Offer

*   **For Parents & Families**: Pre-launch waitlist registration is **completely free**. Session rates are set transparently by individual coaches and service providers on the platform.
*   **For Founding Coaches & Service Providers**: Onboarding is **100% free for four full months** after the platform opens to parents! After the 4-month complimentary period, it transitions to a simple monthly subscription with no long-term lock-in (opt out anytime).
*   **Early-Bird Perks**: Waitlist members receive priority access for our **Fall 2026 launch** and invitations to Sol & Heather's Substack community.`,

        locations: `### Servicing the DMV: Local In-Person & Virtual Nationwide

CPH connects DMV families with both hyper-local in-person providers and premier virtual specialists:

*   **Northern Virginia (In-Person)**: Arlington, Alexandria, McLean, Vienna, Fairfax, and Loudoun County.
*   **Suburban Maryland (In-Person)**: Bethesda, Chevy Chase, Potomac, Rockville, and Silver Spring.
*   **Washington D.C. (In-Person)**: Northwest D.C., Capitol Hill, and surrounding athletic facilities.
*   **Nationwide & International (Virtual & Tours)**: Virtual specialists in sports nutrition, mental performance, college recruiting, and NIL—plus international tournament and academy training programs.`,

        ageGroups: `### Age Brackets & Development Stages

CPH supports competitive soccer players from youth grassroots through collegiate preparation:

*   **U8–U11 (Foundational Mastery)**: Micro-touches, balance, joy of the game, and foundational coordination.
*   **U12–U14 (Travel & Academy Transition)**: Tactical scanning, deceleration biomechanics, position-specific skills, and tryout composure.
*   **U15–U18 (High School, NCAA Recruitment & NIL)**: Game tempo mastery, physical conditioning, matchday nutrition, college recruitment guidance, and NIL branding.`,

        pathways: `### Beyond the 6 Pillars: Specialized Pathways

In addition to the 6 core development pillars, CPH connects families with three high-impact specialized categories plus year-round competition:

*   **1. College Recruitment Specialists**: NCAA eligibility roadmaps, showcase targeting, highlight reel standards, and direct college coach communication strategies.
*   **2. NIL & Branding Coaches**: Personal brand strategy, social media compliance, and Name, Image & Likeness guidance for student-athletes.
*   **3. International Tournament & Training Opportunities**: Overseas academy immersion (such as Scandinavian/European tours) and international showcase tournaments.
*   **Futsal & Domestic Showcases**: High-speed indoor winter futsal and premier regional/national tournament selection support.`,

        diagnostic: `### 30-Second Player Development Diagnostic

Our interactive diagnostic tool helps parents pinpoint their athlete's immediate priority:

*   **Fast Assessment**: Select your athlete's age bracket, primary development bottleneck (technical, speed/injury, mental composure, or college/international pathways), and your DMV sub-region.
*   **Custom Protocol**: Instantly generates a customized 6-pillar action plan tailored to their stage.
*   **Provider Matching**: Recommends curated coaches and specialists servicing your area. Click **"30s Diagnostic 🎯"** below to try it!`,

        waitlist: `### Fall 2026 Launch & Pre-Launch Waitlist

*   **Launch Window**: **Fall 2026** across Washington D.C., Maryland, and Virginia.
*   **Founding Coaches & Service Providers**: Receive **4 full months free** after the platform opens to parents, then a simple monthly subscription (opt out anytime).
*   **Family Waitlist**: Registering now guarantees priority access to book curated coaches, specialists, and academies when doors open.`,

        contact: `### Connect with Sol & Heather Salinas

We love hearing directly from DMV soccer parents, coaches, service providers, and club directors:

*   **Founders**: Sol & Heather Salinas
*   **Email**: Email Sol directly at **sol@thecompleteplayerhub.com** or use the **Connect With The Hub** form right on this page.
*   **Substack**: Follow *"The Complete Player Hub"* on Substack for weekly research, training insights, and founder stories.`,

        speedAgility: `### Speed, Agility & Deceleration Biomechanics

At CPH, speed and agility is engineered around **game-specific deceleration and injury resilience**, not generic straight-line sprinting:

*   **Deceleration Mechanics**: Over 70% of youth ACL and hamstring tears happen during sudden stops or sharp cuts. We train athletes on proper hip-knee alignment and force absorption.
*   **Multi-Directional Explosiveness**: First-step acceleration, hip fluidity, and rapid change-of-direction drills that translate directly to creating on-ball separation under defensive pressure.
*   **Dedicated DMV Specialists**: CPH connects families with certified strength & conditioning coaches and performance academies across Northern Virginia, DC, and Maryland who understand adolescent growth-plate dynamics.`,

        physicalTherapy: `### Physical Therapy & Sports Medicine Network

Youth physical therapy should not just be reactive after an injury—it is an essential ongoing safeguard for competitive athletes:

*   **Pediatric & Sports PTs**: CPH connects families with dedicated sports physical therapy practices and recovery specialists servicing the DMV.
*   **Movement Screenings & Load Management**: Baseline mobility assessments, gait analysis, and Osgood-Schlatter / Sever's disease management during rapid growth spurts.
*   **Coordinated Return to Play**: Helping physical therapists, parents, and technical coaches stay aligned on a safe return to full match tempo.`
    };

    // ─── STATE MANAGEMENT ───
    const STATE = {
        isOpen: false,
        ttsEnabled: false,
        activeSegmentId: "hero-segment",
        isWaitlistFlow: false,
        waitlistStep: "idle", // 'idle' | 'role' | 'name' | 'email' | 'phone' | 'location' | 'complete'
        leadData: { role: "", name: "", email: "", phone: "", location: "" },
        diagnosticActive: false,
        diagnosticData: { ageGroup: "", focusArea: "", region: "", name: "", email: "" },
        diagnosticStep: "idle", // 'age' | 'focus' | 'region' | 'generating' | 'result'
        history: [], // [{role: 'user'|'assistant', content: string}]
        capsuleTimer: null,
        telemetryIndex: 0
    };

    // ─── STYLES INJECTION ───
    function injectStyles() {
        const style = document.createElement("style");
        style.id = "cph-concierge-styles";
        style.innerHTML = `
            /* Floating Ambient Capsule (Pitch Deck Model) */
            #cph-ambient-capsule {
                position: fixed;
                bottom: 96px;
                right: 24px;
                max-width: 380px;
                background: rgba(7, 11, 19, 0.94);
                backdrop-filter: blur(28px);
                -webkit-backdrop-filter: blur(28px);
                border: 1px solid rgba(255, 90, 0, 0.4);
                border-radius: 20px;
                padding: 14px 18px;
                box-shadow: 0 15px 40px rgba(0,0,0,0.85), 0 0 25px rgba(255,90,0,0.25);
                z-index: 999997;
                display: flex;
                flex-direction: column;
                gap: 8px;
                opacity: 0;
                transform: translateX(30px) scale(0.95);
                pointer-events: none;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            #cph-ambient-capsule.visible {
                opacity: 1;
                transform: translateX(0) scale(1);
                pointer-events: auto;
            }
            .cph-capsule-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .cph-capsule-meta {
                display: flex;
                align-items: center;
                gap: 6px;
                font-family: monospace;
                font-size: 8.5px;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                color: ${CONFIG.THEME_COLOR};
                font-weight: 700;
            }
            .cph-capsule-close {
                background: none;
                border: none;
                color: rgba(255,255,255,0.4);
                cursor: pointer;
                padding: 0;
                display: flex;
                align-items: center;
                transition: color 0.2s;
            }
            .cph-capsule-close:hover { color: #FFFFFF; }
            .cph-capsule-text {
                font-size: 11.5px;
                color: #FFFFFF;
                line-height: 1.45;
                font-weight: 300;
                margin: 0;
            }
            .cph-capsule-actions {
                display: flex;
                gap: 6px;
                margin-top: 2px;
            }
            .cph-capsule-btn {
                background: rgba(255, 90, 0, 0.15);
                border: 1px solid rgba(255, 90, 0, 0.4);
                color: #FFFFFF;
                border-radius: 9999px;
                padding: 4px 10px;
                font-size: 9.5px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                font-family: inherit;
            }
            .cph-capsule-btn:hover {
                background: ${CONFIG.THEME_COLOR};
                color: #000000;
                transform: translateY(-1px);
            }
            .cph-capsule-btn.secondary {
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(255, 255, 255, 0.12);
                color: rgba(255,255,255,0.7);
            }
            .cph-capsule-btn.secondary:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #FFFFFF;
            }

            /* Floating Launcher */
            #cph-bot-launcher {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 62px;
                height: 62px;
                border-radius: 50%;
                background: #000000;
                border: 1px solid ${CONFIG.BORDER_COLOR};
                box-shadow: 0 0 25px rgba(255, 90, 0, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 999999;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            #cph-bot-launcher:hover {
                transform: scale(1.08);
                box-shadow: 0 0 35px rgba(255, 90, 0, 0.7);
                border-color: rgba(255, 90, 0, 0.8);
            }
            #cph-bot-launcher svg {
                width: 26px;
                height: 26px;
                fill: none;
                stroke: ${CONFIG.THEME_COLOR};
                stroke-width: 2.2;
            }

            /* Digital Concierge Window */
            #cph-bot-container {
                position: fixed;
                bottom: 96px;
                right: 24px;
                width: 420px;
                height: 630px;
                max-width: calc(100vw - 32px);
                max-height: calc(100vh - 120px);
                border-radius: 28px;
                background: ${CONFIG.BG_COLOR};
                backdrop-filter: blur(32px);
                -webkit-backdrop-filter: blur(32px);
                border: 1px solid ${CONFIG.BORDER_COLOR};
                box-shadow: 0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 90, 0, 0.2);
                display: flex;
                flex-direction: column;
                z-index: 999998;
                opacity: 0;
                transform: translateY(20px) scale(0.96);
                pointer-events: none;
                transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                overflow: hidden;
            }
            #cph-bot-container.open {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: auto;
            }
            #cph-bot-container.cph-pulse-active {
                animation: cph-highlight-pulse 2s ease-in-out infinite;
                border-color: rgba(255, 90, 0, 0.9);
            }
            @keyframes cph-highlight-pulse {
                0% { box-shadow: 0 25px 70px rgba(0, 0, 0, 0.95), 0 0 20px rgba(255, 90, 0, 0.3); }
                50% { box-shadow: 0 25px 70px rgba(0, 0, 0, 0.95), 0 0 55px rgba(255, 90, 0, 0.8); }
                100% { box-shadow: 0 25px 70px rgba(0, 0, 0, 0.95), 0 0 25px rgba(255, 90, 0, 0.3); }
            }

            /* Live Telemetry Ticker */
            #cph-telemetry-ticker {
                background: rgba(255, 90, 0, 0.1);
                border-bottom: 1px solid rgba(255, 90, 0, 0.2);
                padding: 6px 16px;
                font-family: monospace;
                font-size: 9px;
                color: #FFFFFF;
                display: flex;
                align-items: center;
                justify-content: space-between;
                letter-spacing: 0.05em;
                overflow: hidden;
                white-space: nowrap;
            }
            #cph-telemetry-text {
                overflow: hidden;
                text-overflow: ellipsis;
                transition: opacity 0.3s ease;
            }

            /* Header */
            .cph-header {
                padding: 14px 20px;
                background: rgba(0, 0, 0, 0.75);
                border-bottom: 1px solid ${CONFIG.BORDER_COLOR};
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                z-index: 20;
            }
            .cph-header-left {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .cph-pulse-beacon {
                width: 9px;
                height: 9px;
                border-radius: 50%;
                background: ${CONFIG.THEME_COLOR};
                box-shadow: 0 0 12px ${CONFIG.THEME_COLOR};
                animation: cph-pulse 1.8s infinite;
            }
            .cph-header-title {
                color: #FFFFFF;
                font-weight: 700;
                font-size: 14px;
                letter-spacing: 0.03em;
                margin: 0;
            }
            .cph-header-subtitle {
                color: rgba(255, 90, 0, 0.85);
                font-size: 9px;
                margin: 2px 0 0 0;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                font-family: monospace;
                font-weight: bold;
            }
            .cph-header-actions {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .cph-btn-icon {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            .cph-btn-icon:hover {
                color: #FFFFFF;
                border-color: ${CONFIG.THEME_COLOR};
                background: rgba(255, 90, 0, 0.15);
            }
            .cph-btn-icon.active {
                background: rgba(255, 90, 0, 0.3);
                border-color: ${CONFIG.THEME_COLOR};
                color: ${CONFIG.THEME_COLOR};
            }

            /* Platform Insight Banner */
            #cph-storyline-banner {
                background: rgba(0, 0, 0, 0.55);
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding: 10px 18px;
                display: flex;
                flex-direction: column;
                gap: 5px;
                position: relative;
                z-index: 10;
                transition: all 0.3s ease;
            }
            #cph-bot-container.in-waitlist-mode #cph-storyline-banner,
            #cph-bot-container.in-diagnostic-mode #cph-storyline-banner {
                display: none !important;
            }
            .cph-narrative-meta {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-family: monospace;
                font-size: 8.5px;
                text-transform: uppercase;
                letter-spacing: 0.12em;
            }
            .cph-narrative-badge {
                color: ${CONFIG.THEME_COLOR};
                font-weight: 700;
            }
            .cph-narrative-title {
                color: #FFFFFF;
                font-size: 12px;
                font-weight: 600;
            }
            .cph-narrative-text {
                color: rgba(255, 255, 255, 0.75);
                font-size: 11px;
                line-height: 1.45;
                font-weight: 300;
                margin: 0;
            }
            #cph-storyline-chips {
                display: flex;
                gap: 6px;
                overflow-x: auto;
                padding-top: 3px;
                padding-bottom: 2px;
                scrollbar-width: none;
            }
            #cph-storyline-chips::-webkit-scrollbar { display: none; }
            .cph-story-chip {
                padding: 3px 9px;
                border-radius: 9999px;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: rgba(255, 255, 255, 0.85);
                font-size: 9.5px;
                font-family: inherit;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.2s;
                font-weight: 500;
            }
            .cph-story-chip:hover {
                background: ${CONFIG.THEME_COLOR};
                border-color: ${CONFIG.THEME_COLOR};
                color: #000000;
                transform: translateY(-1px);
            }

            /* Messages Feed */
            .cph-feed {
                flex: 1;
                padding: 14px 18px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 10px;
                scrollbar-width: none;
            }
            .cph-feed::-webkit-scrollbar { display: none; }
            .cph-bubble {
                max-width: 88%;
                padding: 11px 15px;
                border-radius: 18px;
                font-size: 12px;
                line-height: 1.55;
                font-weight: 300;
                color: #F1F5F9;
                word-wrap: break-word;
            }
            .cph-bubble.assistant {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.08);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            .cph-bubble.user {
                background: rgba(255, 90, 0, 0.18);
                border: 1px solid rgba(255, 90, 0, 0.38);
                align-self: flex-end;
                border-bottom-right-radius: 4px;
                color: #FFFFFF;
            }
            .cph-bubble strong {
                color: ${CONFIG.THEME_COLOR};
                font-weight: 600;
            }
            .cph-bubble h3, .cph-bubble h4 {
                color: #FFFFFF;
                font-size: 12.5px;
                margin: 4px 0 6px 0;
                font-weight: 600;
            }
            .cph-bubble ul {
                margin: 4px 0 4px 14px;
                padding: 0;
            }
            .cph-bubble li {
                margin-bottom: 3px;
            }

            /* Dynamic Typing Cursor */
            .cph-cursor {
                display: inline-block;
                width: 6px;
                height: 12px;
                background: ${CONFIG.THEME_COLOR};
                margin-left: 3px;
                vertical-align: middle;
                animation: cph-blink 0.8s infinite;
            }

            /* Buttons & Diagnostic Grids */
            .cph-options-grid {
                display: flex;
                flex-direction: column;
                gap: 7px;
                margin-top: 4px;
                align-self: flex-start;
                width: 92%;
            }
            .cph-option-btn {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #FFFFFF;
                padding: 9px 13px;
                border-radius: 14px;
                font-size: 11px;
                font-family: inherit;
                cursor: pointer;
                text-align: left;
                transition: all 0.2s;
                font-weight: 400;
            }
            .cph-option-btn:hover {
                background: rgba(255, 90, 0, 0.15);
                border-color: ${CONFIG.THEME_COLOR};
                transform: translateX(3px);
            }

            /* Typing Indicator */
            .cph-typing {
                align-self: flex-start;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.05);
                padding: 10px 16px;
                border-radius: 18px;
                border-bottom-left-radius: 4px;
                display: flex;
                gap: 4px;
            }
            .cph-dot {
                width: 5px;
                height: 5px;
                background: ${CONFIG.THEME_COLOR};
                border-radius: 50%;
                animation: cph-bounce 1.4s infinite ease-in-out both;
            }
            .cph-dot:nth-child(1) { animation-delay: -0.32s; }
            .cph-dot:nth-child(2) { animation-delay: -0.16s; }

            /* Input Bar */
            .cph-input-bar {
                padding: 12px 16px;
                background: rgba(0, 0, 0, 0.75);
                border-top: 1px solid ${CONFIG.BORDER_COLOR};
                display: flex;
                gap: 10px;
                align-items: center;
            }
            .cph-input-field {
                flex: 1;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 14px;
                padding: 9px 13px;
                color: #FFFFFF;
                font-size: 11.5px;
                font-family: inherit;
                outline: none;
                transition: all 0.2s;
                font-weight: 300;
            }
            .cph-input-field::placeholder { color: rgba(255, 255, 255, 0.3); }
            .cph-input-field:focus {
                border-color: rgba(255, 90, 0, 0.6);
                background: rgba(255, 255, 255, 0.06);
            }
            .cph-send-btn {
                width: 34px;
                height: 34px;
                border-radius: 12px;
                background: ${CONFIG.THEME_GRADIENT};
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 4px 14px rgba(255, 90, 0, 0.4);
            }
            .cph-send-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 20px rgba(255, 90, 0, 0.6);
            }
            .cph-send-btn svg {
                width: 13px;
                height: 13px;
                fill: none;
                stroke: #000000;
                stroke-width: 2.5;
            }

            @keyframes cph-pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 90, 0, 0.5); }
                70% { box-shadow: 0 0 0 10px rgba(255, 90, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 90, 0, 0); }
            }
            @keyframes cph-bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
            @keyframes cph-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }

            @media (max-width: 480px) {
                #cph-bot-container {
                    bottom: 0;
                    right: 0;
                    width: 100vw;
                    height: 92vh;
                    max-width: 100vw;
                    max-height: 92vh;
                    border-radius: 24px 24px 0 0;
                }
                #cph-ambient-capsule {
                    right: 16px;
                    bottom: 88px;
                    max-width: calc(100vw - 32px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ─── MARKUP INJECTION ───
    function createMarkup() {
        // 1. Proactive Ambient Guidance Capsule
        const capsule = document.createElement("div");
        capsule.id = "cph-ambient-capsule";
        capsule.innerHTML = `
            <div class="cph-capsule-header">
                <div class="cph-capsule-meta">
                    <span class="cph-pulse-beacon" style="width:6px;height:6px;"></span>
                    <span id="cph-capsule-badge">CPH CONCIERGE</span>
                </div>
                <button class="cph-capsule-close" id="cph-capsule-dismiss" title="Dismiss">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <p class="cph-capsule-text" id="cph-capsule-body">
                💡 Founder's Perspective: Most sports apps are just directories. We built CPH as an integrated development system for serious DMV soccer families.
            </p>
            <div class="cph-capsule-actions">
                <button class="cph-capsule-btn" id="cph-capsule-expand">Ask Sol ✨</button>
                <button class="cph-capsule-btn secondary" id="cph-capsule-diag">30s Diagnostic 🎯</button>
            </div>
        `;

        // 2. Floating Launcher
        const launcher = document.createElement("div");
        launcher.id = "cph-bot-launcher";
        launcher.setAttribute("aria-label", "Toggle CPH Digital Concierge");
        launcher.innerHTML = `
            <svg id="cph-icon-chat" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <svg id="cph-icon-close" viewBox="0 0 24 24" style="display:none; transform: rotate(-90deg);">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;

        // 3. Digital Concierge Container
        const container = document.createElement("div");
        container.id = "cph-bot-container";
        container.innerHTML = `
            <!-- Live DMV Telemetry Ticker -->
            <div id="cph-telemetry-ticker">
                <span id="cph-telemetry-text">🟢 Founding Provider Cohort: 4 Months Free Trial Open for Coaches &amp; Businesses</span>
                <div style="display:flex; align-items:center; gap:5px; opacity:0.85; font-size:8.5px; font-weight:600; letter-spacing:0.08em; color:#ffffff;">
                    <span style="width:5px; height:5px; border-radius:50%; background:#22c55e; box-shadow:0 0 6px #22c55e; display:inline-block;"></span>
                    <span>DMV NETWORK</span>
                </div>
            </div>

            <!-- Header -->
            <div class="cph-header">
                <div class="cph-header-left">
                    <div class="cph-pulse-beacon"></div>
                    <div>
                        <h4 class="cph-header-title">CPH Digital Concierge</h4>
                        <p class="cph-header-subtitle">DIGITAL CONCIERGE // DMV SOCCER HUB</p>
                    </div>
                </div>
                <div class="cph-header-actions">
                    <button class="cph-btn-icon" id="cph-tts-toggle" title="Toggle Voice Narration">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                    </button>
                    <button class="cph-btn-icon cph-close-btn" aria-label="Close">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Platform Insight Banner -->
            <div id="cph-storyline-banner">
                <div class="cph-narrative-meta">
                    <span class="cph-narrative-badge" id="cph-badge-text">PLATFORM VISION // THE CPH THESIS</span>
                    <span style="color: rgba(255,255,255,0.4)">DMV ECOSYSTEM GUIDE</span>
                </div>
                <div class="cph-narrative-title" id="cph-story-title">Beyond The Directory Listing</div>
                <p class="cph-narrative-text" id="cph-story-body">
                    Most sports apps are just booking directories. What Sol and Heather realized after years navigating the DMV youth circuit is that parents don't need another list—they need an integrated roadmap.
                </p>
                <div id="cph-storyline-chips"></div>
            </div>

            <!-- Messages Feed -->
            <div class="cph-feed" id="cph-feed-list"></div>

            <!-- Input Bar -->
            <div class="cph-input-bar">
                <input class="cph-input-field" id="cph-chat-input" type="text" placeholder="Ask anything about CPH or request waitlist invite..." autocomplete="off">
                <button class="cph-send-btn" id="cph-send-btn" aria-label="Send">
                    <svg viewBox="0 0 24 24">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(capsule);
        document.body.appendChild(launcher);
        document.body.appendChild(container);
    }

    // ─── MARKDOWN FORMATTING HELPER ───
    function renderMarkdown(text) {
        if (!text) return "";
        return text
            .replace(/### (.*?)\n/g, "<h3>$1</h3>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\* (.*?)\n/g, "<li>$1</li>")
            .replace(/\n\n/g, "<br><br>")
            .replace(/\n/g, "<br>");
    }

    // ─── READABLE TOKEN STREAMING HELPER ───
    function appendStreamingMessage(fullText, role = "assistant", onComplete = null) {
        const list = document.getElementById("cph-feed-list");
        if (!list) return;

        const bubble = document.createElement("div");
        bubble.className = `cph-bubble ${role}`;
        list.appendChild(bubble);

        // Pre-parse tokens by whitespace
        const tokens = fullText.split(/(\s+)/);
        let currentIndex = 0;
        let accumulated = "";

        const cursor = document.createElement("span");
        cursor.className = "cph-cursor";
        bubble.appendChild(cursor);

        let isCompleted = false;
        function completeStream() {
            if (isCompleted) return;
            isCompleted = true;
            clearInterval(streamInterval);
            if (cursor.parentNode) cursor.remove();
            bubble.innerHTML = renderMarkdown(fullText);
            bubble.style.cursor = "default";
            bubble.removeAttribute("title");
            STATE.history.push({ role: role === "assistant" ? "assistant" : "user", content: fullText });
            if (STATE.ttsEnabled && role === "assistant") {
                speakText(fullText);
            }
            if (onComplete) onComplete();
        }

        // Tap/click bubble to instantly reveal full text if reader doesn't want to wait
        bubble.style.cursor = "pointer";
        bubble.title = "Click to display immediately";
        bubble.addEventListener("click", completeStream, { once: true });

        // Natural, comfortable reading pace (~65ms per token)
        const streamInterval = setInterval(() => {
            if (currentIndex < tokens.length) {
                accumulated += tokens[currentIndex];
                currentIndex++;

                bubble.innerHTML = renderMarkdown(accumulated);
                bubble.appendChild(cursor);
                list.scrollTop = list.scrollHeight;
            } else {
                completeStream();
            }
        }, 65);
    }

    function appendMessageSync(text, role = "assistant") {
        const list = document.getElementById("cph-feed-list");
        if (!list) return;

        const bubble = document.createElement("div");
        bubble.className = `cph-bubble ${role}`;
        bubble.innerHTML = renderMarkdown(text);
        list.appendChild(bubble);
        list.scrollTop = list.scrollHeight;
        STATE.history.push({ role: role === "assistant" ? "assistant" : "user", content: text });
    }

    function showTypingIndicator() {
        const list = document.getElementById("cph-feed-list");
        if (!list) return;

        const typing = document.createElement("div");
        typing.className = "cph-typing";
        typing.id = "cph-typing-dot";
        typing.innerHTML = `<div class="cph-dot"></div><div class="cph-dot"></div><div class="cph-dot"></div>`;
        list.appendChild(typing);
        list.scrollTop = list.scrollHeight;
    }

    function removeTypingIndicator() {
        const dot = document.getElementById("cph-typing-dot");
        if (dot) dot.remove();
    }

    function speakText(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const clean = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').replace(/###/g, '');
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.rate = 1.05;
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
        if (preferredVoice) utterance.voice = preferredVoice;
        window.speechSynthesis.speak(utterance);
    }

    // ─── AMBIENT CAPSULE CONTROLLER ───
    function showAmbientCapsule(text) {
        if (STATE.isOpen) return; // Don't show capsule if chat is already open

        const capsule = document.getElementById("cph-ambient-capsule");
        const body = document.getElementById("cph-capsule-body");
        if (!capsule || !body) return;

        body.innerText = text;
        capsule.classList.add("visible");

        if (STATE.capsuleTimer) clearTimeout(STATE.capsuleTimer);
        STATE.capsuleTimer = setTimeout(() => {
            capsule.classList.remove("visible");
        }, 10000);
    }

    function dismissAmbientCapsule() {
        const capsule = document.getElementById("cph-ambient-capsule");
        if (capsule) capsule.classList.remove("visible");
        if (STATE.capsuleTimer) clearTimeout(STATE.capsuleTimer);
    }

    // ─── STORYLINE SEGMENT CONTROLLER ───
    function updateSegmentStoryline(segmentId) {
        const data = STORYLINES[segmentId] || STORYLINES["hero-segment"];
        STATE.activeSegmentId = segmentId;

        const badgeEl = document.getElementById("cph-badge-text");
        const titleEl = document.getElementById("cph-story-title");
        const bodyEl = document.getElementById("cph-story-body");
        const chipsEl = document.getElementById("cph-storyline-chips");

        if (badgeEl) badgeEl.innerText = data.badge;
        if (titleEl) titleEl.innerText = data.title;
        if (bodyEl) bodyEl.innerText = data.narrative;

        if (chipsEl) {
            chipsEl.innerHTML = "";
            (data.chips || []).forEach(chip => {
                const btn = document.createElement("button");
                btn.className = "cph-story-chip";
                btn.innerText = chip.label;
                btn.onclick = (e) => {
                    e.stopPropagation();
                    handleChipClick(chip);
                };
                chipsEl.appendChild(btn);
            });
        }

        // Proactively surface ambient capsule on scroll
        if (data.ambientNote) {
            showAmbientCapsule(data.ambientNote);
        }
    }

    function handleChipClick(chip) {
        if (chip.action === "start_diagnostic") {
            startPlayerDiagnostic();
            return;
        }
        if (chip.action === "start_waitlist") {
            startWaitlistFlow();
            return;
        }
        if (chip.action === "open_substack") {
            window.open("https://thecompleteplayerhub.substack.com", "_blank");
            return;
        }
        if (chip.action === "video_modal") {
            const canvas = document.getElementById("device-canvas");
            if (canvas) {
                canvas.scrollIntoView({ behavior: "smooth" });
                canvas.click();
            }
            return;
        }

        if (!STATE.isOpen) toggleChat();
        appendMessageSync(chip.label, "user");
        processAIQuery(chip.query || chip.label);
    }

    // ─── 30-SECOND PLAYER DEVELOPMENT DIAGNOSTIC ───
    function startPlayerDiagnostic() {
        if (!STATE.isOpen) toggleChat();
        dismissAmbientCapsule();

        const container = document.getElementById("cph-bot-container");
        if (container) container.classList.add("in-diagnostic-mode");

        STATE.diagnosticActive = true;
        STATE.diagnosticStep = "age";

        appendStreamingMessage(
            "🎯 **CPH 30-Second Player Diagnostic & Coach Matcher**\n\nLet's build a personalized 6-pillar training recommendation for your player.\n\n**Step 1:** What is your athlete's **Age Bracket**?",
            "assistant",
            () => renderDiagnosticAgeOptions()
        );
    }

    function renderDiagnosticAgeOptions() {
        const list = document.getElementById("cph-feed-list");
        if (!list) return;

        const options = document.createElement("div");
        options.className = "cph-options-grid";

        const ages = [
            { label: "1. U9–U12 Foundations (Micro-Touch & Cognitive Fun)", val: "U9–U12" },
            { label: "2. U13–U15 Academy / ECNL (Deceleration & Tactical Scanning)", val: "U13–U15" },
            { label: "3. U16–U19 High School & College Prep (NCAA / Showcase / NIL)", val: "U16–U19" }
        ];

        ages.forEach(a => {
            const btn = document.createElement("button");
            btn.className = "cph-option-btn";
            btn.innerText = a.label;
            btn.onclick = () => {
                options.remove();
                STATE.diagnosticData.ageGroup = a.val;
                appendMessageSync(a.label, "user");
                advanceDiagnosticToFocus();
            };
            options.appendChild(btn);
        });

        list.appendChild(options);
        list.scrollTop = list.scrollHeight;
    }

    function advanceDiagnosticToFocus() {
        STATE.diagnosticStep = "focus";
        appendStreamingMessage(
            `Got it (**${STATE.diagnosticData.ageGroup}**).\n\n**Step 2:** What is their **Primary Development Priority** right now?`,
            "assistant",
            () => renderDiagnosticFocusOptions()
        );
    }

    function renderDiagnosticFocusOptions() {
        const list = document.getElementById("cph-feed-list");
        if (!list) return;

        const options = document.createElement("div");
        options.className = "cph-options-grid";

        const focuses = [
            { label: "⚡ Technical Ball Mastery (1,200+ touches/hr, 1v1 moves)", val: "Technical Ball Mastery" },
            { label: "🏃 Speed Biomechanics & ACL Deceleration Prevention", val: "Physical Biomechanics" },
            { label: "🧘 Mental Composure & Tryout Anxiety (Jenn Ireland)", val: "Mental Performance" },
            { label: "🎓 College NCAA Recruiting & European Tour (Sweden)", val: "Pathways & Recruiting" }
        ];

        focuses.forEach(f => {
            const btn = document.createElement("button");
            btn.className = "cph-option-btn";
            btn.innerText = f.label;
            btn.onclick = () => {
                options.remove();
                STATE.diagnosticData.focusArea = f.val;
                appendMessageSync(f.label, "user");
                advanceDiagnosticToRegion();
            };
            options.appendChild(btn);
        });

        list.appendChild(options);
        list.scrollTop = list.scrollHeight;
    }

    function advanceDiagnosticToRegion() {
        STATE.diagnosticStep = "region";
        appendStreamingMessage(
            `Understood (**${STATE.diagnosticData.focusArea}**).\n\n**Step 3:** What is your **DMV Sub-Region** so we can pair you with curated coaches and specialists servicing your area?`,
            "assistant",
            () => renderDiagnosticRegionOptions()
        );
    }

    function renderDiagnosticRegionOptions() {
        const list = document.getElementById("cph-feed-list");
        if (!list) return;

        const options = document.createElement("div");
        options.className = "cph-options-grid";

        const regions = [
            { label: "📍 Northern Virginia (Arlington, Alexandria, McLean, Fairfax)", val: "Northern Virginia" },
            { label: "📍 Montgomery County (Bethesda, Potomac, Rockville, Silver Spring)", val: "Montgomery County" },
            { label: "📍 Washington D.C. Metro Area", val: "Washington D.C." },
            { label: "📍 Loudoun / Prince William County", val: "Loudoun / Prince William" }
        ];

        regions.forEach(r => {
            const btn = document.createElement("button");
            btn.className = "cph-option-btn";
            btn.innerText = r.label;
            btn.onclick = () => {
                options.remove();
                STATE.diagnosticData.region = r.val;
                appendMessageSync(r.label, "user");
                generateDiagnosticProtocol();
            };
            options.appendChild(btn);
        });

        list.appendChild(options);
        list.scrollTop = list.scrollHeight;
    }

    function generateDiagnosticProtocol() {
        STATE.diagnosticStep = "generating";
        showTypingIndicator();

        const { ageGroup, focusArea, region } = STATE.diagnosticData;

        setTimeout(() => {
            removeTypingIndicator();
            const protocolText = `### 📋 Personalized 360° Player Growth Protocol
**Athlete Bracket:** ${ageGroup} | **Focus:** ${focusArea} | **Hub:** ${region}

**Recommended Weekly Allocation:**
*   **Technical Ball Mastery**: 2x weekly micro-skills sessions (targeting 1,200+ touches/hr, weak-foot striking).
*   **Physical Biomechanics**: 1x weekly deceleration & multi-directional agility to safeguard ACL/hamstring tendons.
*   **Cognitive & Mental IQ**: Pre-match visualization + 15 min weekly session reviewing scanning speed (0.5+ scans/sec).
*   **Recovery Protocol**: Non-negotiable 8.5+ hours sleep (triggering 70%+ daily HGH release).

**Matched DMV Network:**
We have curated coaches, specialists, and training academies servicing **${region}** in **${focusArea}** ready for our **Fall 2026 launch cohort**.

Would you like to lock in priority pre-launch access? Enter your **Full Name** below to begin:`;

            appendStreamingMessage(protocolText, "assistant");
            STATE.diagnosticStep = "waitlist_capture";
            STATE.isWaitlistFlow = true;
            STATE.leadData.role = "Parent";
            STATE.waitlistStep = "name";
        }, 800);
    }

    // ─── QUERY PROCESSOR WITH DYNAMIC REASONING & FOUNDER ESCALATION ───
    async function processAIQuery(userText) {
        const lower = userText.toLowerCase().trim();

        // 1. Check for explicit waitlist registration intent (not questions about the waitlist)
        const isExplicitJoin = /^(join|sign up|register|get on waitlist|join waitlist)$/i.test(lower) ||
            ((lower.includes("sign up") || lower.includes("join") || lower.includes("register")) && !lower.includes("?") && !lower.includes("what") && !lower.includes("how") && !lower.includes("when"));

        if (isExplicitJoin) {
            startWaitlistFlow();
            return;
        }

        showTypingIndicator();

        // Deterministic dynamic response from Sol's knowledge base
        setTimeout(() => {
            removeTypingIndicator();
            const responseText = matchLocalReasoning(userText);
            const isContactRedirect = responseText.includes("sol@thecompleteplayerhub.com") &&
                                      responseText.includes("great question");

            if (isContactRedirect) {
                setTimeout(() => {
                    const contactSec = document.getElementById("contact");
                    if (contactSec) {
                        contactSec.scrollIntoView({ behavior: "smooth" });
                    }
                    const contactMsg = document.getElementById("contact-message");
                    if (contactMsg && !contactMsg.value) {
                        contactMsg.value = userText;
                    }
                }, 300);
            }

            appendStreamingMessage(responseText, "assistant", () => {
                if (isContactRedirect) {
                    renderContactScrollButton(userText);
                }
            });
        }, 350);
    }

    function renderContactScrollButton(originalQuery = "") {
        const list = document.getElementById("cph-feed-list");
        if (!list) return;

        const wrapper = document.createElement("div");
        wrapper.className = "cph-options-grid";
        wrapper.style.marginTop = "8px";
        wrapper.style.marginBottom = "4px";

        const emailBtn = document.createElement("a");
        emailBtn.className = "cph-option-btn";
        emailBtn.style.width = "100%";
        emailBtn.style.textAlign = "center";
        emailBtn.style.justifyContent = "center";
        emailBtn.style.display = "block";
        emailBtn.style.textDecoration = "none";
        emailBtn.style.background = "linear-gradient(135deg, rgba(255, 90, 0, 0.28) 0%, rgba(255, 120, 40, 0.16) 100%)";
        emailBtn.style.borderColor = "#ff5a00";
        emailBtn.style.fontWeight = "600";
        const subj = encodeURIComponent("Question for Sol — The Complete Player Hub");
        const body = encodeURIComponent(originalQuery ? `Hi Sol,\n\nI had a question while visiting The Complete Player Hub:\n"${originalQuery}"\n\nBest,` : "Hi Sol,\n\n");
        emailBtn.href = `mailto:sol@thecompleteplayerhub.com?subject=${subj}&body=${body}`;
        emailBtn.innerHTML = "✉️ Email Sol Directly (sol@thecompleteplayerhub.com)";

        const formBtn = document.createElement("button");
        formBtn.className = "cph-option-btn";
        formBtn.style.width = "100%";
        formBtn.style.textAlign = "center";
        formBtn.style.justifyContent = "center";
        formBtn.style.fontWeight = "500";
        formBtn.innerHTML = "📝 Or Use the Contact Form Below";
        formBtn.onclick = () => {
            const contactSec = document.getElementById("contact");
            if (contactSec) {
                contactSec.scrollIntoView({ behavior: "smooth" });
                const nameInput = document.getElementById("contact-name");
                if (nameInput) setTimeout(() => nameInput.focus(), 500);
            }
        };

        wrapper.appendChild(emailBtn);
        wrapper.appendChild(formBtn);
        list.appendChild(wrapper);
        list.scrollTop = list.scrollHeight;
    }

    // ─── COMPREHENSIVE LOCAL REASONING ENGINE ───
    let lastFallbackTopic = "";

    function matchLocalReasoning(rawQuery) {
        const q = String(rawQuery || "");
        const normalized = q.replace(/(\d),(\d)/g, "$1$2");
        const clean = normalized.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();

        // 1. Generic Greetings
        if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy)\b/i.test(clean)) {
            return `Hello! Welcome to **The Complete Player Hub (CPH)**. How can I help you explore our 6 development pillars, our specialized pathways (college recruiting, NIL & international tours), our Founding Provider offer, or our **Fall 2026** pre-launch waitlist?`;
        }

        // 1b. Priority Guard for Specific Operational / Policy / Edge-Case Questions
        // Ensures questions about refunds, cancellations, rain/weather policies, buses/travel logistics,
        // commissions, insurance, or jobs are never hijacked by broad keywords like "tournament" or "training".
        const isSpecificOperationalEdgeCase = /\b(refund|refunds|cancel|cancellation|rain|weather|bus|buses|charter|hotel|flight|airline|uniform|jersey|gear|equipment|insurance|liability|tax|commission|cut|percentage|hiring|job|career|invest|investor)\b/i.test(clean);
        if (isSpecificOperationalEdgeCase) {
            return escalateToSol(q);
        }

        // 2. Founding Provider Offer & 4-Month Free Trial
        if (clean.includes("founding provider") || clean.includes("4 month") || clean.includes("four month") || clean.includes("free trial") || clean.includes("subscription") || clean.includes("opt out")) {
            lastFallbackTopic = "pricing";
            return REASONING_FALLBACKS.pricing;
        }

        // 3. Coaches vs. Businesses / Academies & Dual Booking Flow
        if (clean.includes("business") || clean.includes("businesses") || clean.includes("discovery call") || clean.includes("how booking works") || clean.includes("coaches vs") || clean.includes("individual coach") || clean.includes("safesport") || clean.includes("vetting") || clean.includes("screen") || clean.includes("credential") || clean.includes("background check") || clean.includes("verify") || clean.includes("licensed coach")) {
            lastFallbackTopic = "coaches";
            return REASONING_FALLBACKS.coaches;
        }

        // 4. Youth ACL & Hamstring Injury Prevention / Biomechanics
        if (clean.includes("injury") || clean.includes("acl") || clean.includes("hamstring") || clean.includes("tear") || clean.includes("knee") || clean.includes("prevent injury")) {
            lastFallbackTopic = "injury";
            return REASONING_FALLBACKS.injury;
        }

        // 4b. Speed, Agility & Deceleration Training
        if (clean.includes("speed") || clean.includes("agility") || clean.includes("acceleration") || clean.includes("sprint") || clean.includes("quickness") || clean.includes("first step") || clean.includes("change of direction") || clean.includes("deceleration") || clean.includes("biomechanic")) {
            lastFallbackTopic = "speedAgility";
            return REASONING_FALLBACKS.speedAgility;
        }

        // 4c. Physical Therapy, Sports Medicine, Compression & Yoga
        if (clean.includes("physical therapy") || clean.includes("physio") || clean.includes("rehab") || clean.includes("sports medicine") || clean.includes("osgood") || clean.includes("sever") || clean.includes("growth spurt") || clean.includes("compression") || clean.includes("yoga") || clean.includes("stretch") || clean.includes("mobility")) {
            lastFallbackTopic = "physicalTherapy";
            return REASONING_FALLBACKS.physicalTherapy;
        }

        // 4d. Intelligent Provider Matching & Search
        if (clean.includes("search") || clean.includes("find trainer") || clean.includes("find coach") || clean.includes("find provider") || clean.includes("browse") || clean.includes("filter by") || clean.includes("directory") || clean.includes("goalkeeper") || clean.includes("goalie") || clean.includes("striker")) {
            lastFallbackTopic = "coaches";
            return `### Intelligent Provider Matching Servicing the DMV

CPH connects families with a curated network of individual coaches, performance specialists, and established training academies tailored to your athlete's stage:

*   **6 Core Pillars + 3 Specialized Pathways**: Technical (including position-specific & goalkeeper coaching), Tactical, Physical, Mental, Nutrition, and Recovery—plus **College Recruitment Specialists**, **NIL & Branding Coaches**, and **International Tournament & Training Opportunities**.
*   **In-Person & Virtual Servicing the DMV**: Filter by local hubs across Northern Virginia, Suburban Maryland, and Washington D.C., or connect with nationwide virtual specialists.
*   **Flexible Booking**: Book and pay independent coaches directly on CPH, or schedule discovery calls and visit partner academy websites.

Join our **Fall 2026 pre-launch waitlist** to get priority access when doors open!`;
        }

        // 5. Mental Performance, Sports Psychology & Jenn Ireland
        if (clean.includes("mental") || clean.includes("psychology") || clean.includes("jenn ireland") || clean.includes("anxiety") || clean.includes("composure") || clean.includes("resilience")) {
            lastFallbackTopic = "mental";
            return REASONING_FALLBACKS.mental;
        }

        // 6. Sports Nutrition & Matchday Fueling
        if (clean.includes("nutrition") || clean.includes("fuel") || clean.includes("hydration") || clean.includes("glycogen") || clean.includes("electrolyte") || clean.includes("athlete diet") || clean.includes("matchday food") || clean.includes("meal plan")) {
            lastFallbackTopic = "nutrition";
            return REASONING_FALLBACKS.nutrition;
        }

        // 7. Sleep Physiology, HGH Release & Recovery
        if (clean.includes("sleep") || clean.includes("growth hormone") || clean.includes("hgh") || clean.includes("recovery") || clean.includes("circadian")) {
            lastFallbackTopic = "sleep";
            return REASONING_FALLBACKS.sleep;
        }

        // 8. Technical Ball Mastery & Touches Benchmark
        if (clean.includes("1200") || clean.includes("touch") || clean.includes("ball mastery") || clean.includes("weak foot") || clean.includes("first touch") || clean.includes("dribbling") || clean.includes("striking") || clean.includes("finishing") || clean.includes("technical") || clean.includes("pillar 1")) {
            lastFallbackTopic = "technical";
            return REASONING_FALLBACKS.technical;
        }

        // 9. Tactical Cognitive IQ & Visual Scanning
        if (clean.includes("scanning") || clean.includes("visual scan") || clean.includes("tactical") || clean.includes("game iq") || clean.includes("video analysis") || clean.includes("cognitive") || clean.includes("spatial") || clean.includes("head check") || clean.includes("0 5") || clean.includes("05") || clean.includes("pillar 2")) {
            lastFallbackTopic = "scanning";
            return REASONING_FALLBACKS.scanning;
        }

        // 10. The 6 Development Pillars Architecture
        if (clean.includes("closed loop") || clean.includes("6 pillar") || clean.includes("six pillar") || clean.includes("pillars") || clean.includes("development model") || clean.includes("development architecture") || clean.includes("pillar")) {
            lastFallbackTopic = "pillars";
            return REASONING_FALLBACKS.pillars;
        }

        // 11. Sol & Heather Salinas / Founding Story
        if (clean.includes("sol") || clean.includes("heather") || clean.includes("morgan") || clean.includes("founder") || clean.includes("who built cph") || clean.includes("origin story") || clean.includes("salinas") || clean.includes("mom") || clean.includes("dad")) {
            if (clean.includes("contact") || clean.includes("email") || clean.includes("reach") || clean.includes("message")) {
                lastFallbackTopic = "contact";
                return REASONING_FALLBACKS.contact;
            }
            if (clean.includes("advice") || clean.includes("mistake")) {
                lastFallbackTopic = "mistake";
                return REASONING_FALLBACKS.mistake;
            }
            lastFallbackTopic = "founders";
            return REASONING_FALLBACKS.founders;
        }

        // 12. Parent Portal, Guidance & Family Support
        if (clean.includes("parent portal") || clean.includes("parents") || clean.includes("family") || clean.includes("parent feature") || clean.includes("book a coach")) {
            lastFallbackTopic = "parents";
            return REASONING_FALLBACKS.parents;
        }

        // 13. Coaches Cohort & Trainer Business Model
        if (clean.includes("join as coach") || clean.includes("coach cohort") || clean.includes("apply as coach") || clean.includes("trainer cohort") || clean.includes("private trainer") || clean.includes("service provider")) {
            lastFallbackTopic = "coaches";
            return REASONING_FALLBACKS.coaches;
        }

        // 14. Pricing, Cost & Free Pre-Launch Rates
        if (clean.includes("free") || clean.includes("price") || clean.includes("pricing") || clean.includes("how much") || clean.includes("cost") || clean.includes("membership fee") || clean.includes("is it free") || clean.includes("rates")) {
            lastFallbackTopic = "pricing";
            return REASONING_FALLBACKS.pricing;
        }

        // 15. Geographic Locations, Virtual Services & Training Hubs
        if (clean.includes("where are you located") || clean.includes("training location") || clean.includes("training hub") || clean.includes("arlington") || clean.includes("bethesda") || clean.includes("mclean") || clean.includes("alexandria") || clean.includes("fairfax") || clean.includes("loudoun") || clean.includes("potomac") || clean.includes("silver spring") || clean.includes("rockville") || clean.includes("vienna") || clean.includes("dmv area") || clean.includes("venues") || clean.includes("virtual") || clean.includes("service the dmv") || clean.includes("servicing the dmv")) {
            lastFallbackTopic = "locations";
            return REASONING_FALLBACKS.locations;
        }

        // 16. Age Brackets & Youth Levels
        if (clean.includes("age bracket") || clean.includes("age group") || clean.includes("what age") || clean.includes("u8") || clean.includes("u9") || clean.includes("u10") || clean.includes("u11") || clean.includes("u12") || clean.includes("u13") || clean.includes("u14") || clean.includes("u15") || clean.includes("u16") || clean.includes("u17") || clean.includes("u18") || clean.includes("high school prep") || clean.includes("varsity")) {
            lastFallbackTopic = "ageGroups";
            return REASONING_FALLBACKS.ageGroups;
        }

        // 17. College Recruiting, NIL, International Tours & Futsal
        if (clean.includes("college") || clean.includes("recruiting") || clean.includes("ncaa") || clean.includes("showcase") || clean.includes("futsal") || clean.includes("scholarship") || clean.includes("pathway") || clean.includes("nil") || clean.includes("branding") || clean.includes("international") || clean.includes("sweden") || clean.includes("fcne") || clean.includes("europe") || clean.includes("tournament") || clean.includes("guest play")) {
            lastFallbackTopic = "pathways";
            return REASONING_FALLBACKS.pathways;
        }

        // 18. 30-Second Diagnostic
        if (clean.includes("diagnostic") || clean.includes("assessment") || clean.includes("quiz") || clean.includes("30 second") || clean.includes("30s")) {
            lastFallbackTopic = "diagnostic";
            return REASONING_FALLBACKS.diagnostic;
        }

        // 19. Launch Date, Milestones & Waitlist Info
        if (clean.includes("launch") || clean.includes("when do you open") || clean.includes("october") || clean.includes("november") || clean.includes("fall 2026") || clean.includes("pre launch") || clean.includes("open date") || clean.includes("milestone") || clean.includes("waitlist")) {
            lastFallbackTopic = "waitlist";
            return REASONING_FALLBACKS.waitlist;
        }

        // 20. Sol's Perspective: Biggest Mistakes Parents Make
        if (clean.includes("biggest mistake") || clean.includes("mistake") || clean.includes("traps parents") || clean.includes("parent mistake") || clean.includes("advice for parent")) {
            lastFallbackTopic = "mistake";
            return REASONING_FALLBACKS.mistake;
        }

        // 21. Academy & Club Partnerships
        if (clean.includes("academy partnership") || clean.includes("club partnership") || clean.includes("partner with") || clean.includes("partnership") || clean.includes("collaborate")) {
            lastFallbackTopic = "partnerships";
            return REASONING_FALLBACKS.partnerships;
        }

        // 22. Coach Business Automation
        if (clean.includes("automation") || clean.includes("zelle") || clean.includes("payment chasing") || clean.includes("calendar sync") || clean.includes("business backend") || clean.includes("coach business") || clean.includes("stripe")) {
            lastFallbackTopic = "automation";
            return REASONING_FALLBACKS.automation;
        }

        // 23. Contact & Team Reachout
        if (clean.includes("contact") || clean.includes("email") || clean.includes("reach") || clean.includes("talk to") || clean.includes("phone number") || clean.includes("message")) {
            lastFallbackTopic = "contact";
            return REASONING_FALLBACKS.contact;
        }

        // 24. Mission & CPH Thesis
        if (clean.includes("why build") || clean.includes("specifically for the dmv") || clean.includes("thesis") || clean.includes("mission") || clean.includes("why cph") || clean.includes("what is cph") || clean.includes("about cph") || clean.includes("what does cph do")) {
            lastFallbackTopic = "thesis";
            return REASONING_FALLBACKS.thesis;
        }

        // 25. Out-of-Bounds / Unhandled Query Handler (Per Sol's Oct 16 Feedback:
        // Acknowledge that it is a great question and invite them to email Sol directly for details)
        function escalateToSol(queryText) {
            try {
                const unhandled = JSON.parse(localStorage.getItem("cph_escalated_questions") || "[]");
                unhandled.push({
                    query: queryText,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem("cph_escalated_questions", JSON.stringify(unhandled));

                const cfg = window.CPH_CONFIG || window.CPH_SUPABASE_CONFIG || {};
                const sbUrl = (cfg.supabaseUrl || window.CPH_SUPABASE_URL || "").replace(/\/+$/, "");
                const sbKey = cfg.supabaseAnonKey || window.CPH_SUPABASE_ANON_KEY || "";
                if (sbUrl && sbKey) {
                    fetch(`${sbUrl}/rest/v1/cph_inquiries`, {
                        method: "POST",
                        headers: {
                            "apikey": sbKey,
                            "Authorization": `Bearer ${sbKey}`,
                            "Content-Type": "application/json",
                            "Prefer": "return=minimal"
                        },
                        body: JSON.stringify({
                            role: "Other",
                            name: "Concierge Visitor",
                            email: "sol@thecompleteplayerhub.com",
                            message: `[Concierge Escalation] ${queryText}`,
                            source: "concierge_escalation"
                        })
                    }).catch(() => {});
                }
            } catch (e) {}

            return `That's a great question! To make sure you get the most accurate details on that, please email Sol directly at **sol@thecompleteplayerhub.com** (or use the contact form right below) and he'll be happy to help you personally.`;
        }

        return escalateToSol(q);
    }

    // ─── PROGRESSIVE PRE-LAUNCH WAITLIST INTAKE ───
    function startWaitlistFlow(customPrompt = null, preselectedRole = null) {
        if (!STATE.isOpen) toggleChat();
        dismissAmbientCapsule();

        const container = document.getElementById("cph-bot-container");
        if (container) {
            container.classList.add("in-waitlist-mode");
            container.classList.add("cph-pulse-active");
            setTimeout(() => container.classList.remove("cph-pulse-active"), 4000);
        }

        STATE.isWaitlistFlow = true;
        STATE.waitlistStep = "role";

        // If the only message is the initial default greeting, clear it so the waitlist intake is the clear hero
        const list = document.getElementById("cph-feed-list");
        if (list) {
            const bubbles = list.querySelectorAll(".cph-bubble");
            if (bubbles.length <= 1) {
                list.innerHTML = "";
            }
        }

        if (preselectedRole) {
            appendMessageSync("🚀 **Launching Fall 2026!** Joining our **Pre-Launch Cohort** for priority access and updates.", "assistant");
            handleWaitlistStep(preselectedRole);
            return;
        }

        const defaultPrompt = "🚀 **Launching Fall 2026!** Join our **Pre-Launch Cohort** for priority access, Founding Provider perks (4 months free), and curated matches across the DMV.\n\n**I am a...**";
        const promptText = customPrompt || defaultPrompt;

        // Render prompt and 4 standardized role buttons immediately (Parent | Coach | Service Provider | Other)
        appendMessageSync(promptText, "assistant");
        renderRoleButtons();
    }

    function renderRoleButtons() {
        const list = document.getElementById("cph-feed-list");
        if (!list) return;

        const oldRoles = document.getElementById("cph-waitlist-roles");
        if (oldRoles) oldRoles.remove();

        const options = document.createElement("div");
        options.className = "cph-options-grid";
        options.id = "cph-waitlist-roles";
        options.style.marginTop = "6px";
        options.style.marginBottom = "8px";

        const roles = [
            {
                role: "Parent",
                title: "1. Parent",
                desc: "Seeking elite coaching, development & pathways for my player"
            },
            {
                role: "Coach",
                title: "2. Coach",
                desc: "Individual technical, tactical, or performance coach"
            },
            {
                role: "Service Provider",
                title: "3. Service Provider",
                desc: "Training academy, sports PT, nutrition, mental, recruiting or NIL business"
            },
            {
                role: "Other",
                title: "4. Other",
                desc: "Club director, partner, tournament organizer, or community member"
            }
        ];

        roles.forEach(r => {
            const btn = document.createElement("button");
            btn.className = "cph-option-btn";
            btn.innerHTML = `<span style="font-weight:700; color:#ff5a00;">${r.title}</span> <span style="opacity:0.8; font-size:10.5px;">— ${r.desc}</span>`;
            btn.onclick = () => {
                options.remove();
                handleWaitlistStep(r.role);
            };
            options.appendChild(btn);
        });

        list.appendChild(options);

        // Immediate and post-frame scroll to guarantee 100% full view
        list.scrollTop = list.scrollHeight;
        requestAnimationFrame(() => {
            list.scrollTop = list.scrollHeight;
        });
        setTimeout(() => {
            list.scrollTop = list.scrollHeight;
        }, 50);
    }

    function handleWaitlistStep(input) {
        const text = input.trim();
        const lower = text.toLowerCase();

        if (lower === "cancel" || lower === "exit") {
            STATE.isWaitlistFlow = false;
            STATE.waitlistStep = "idle";
            const container = document.getElementById("cph-bot-container");
            if (container) container.classList.remove("in-waitlist-mode");
            appendMessageSync("Waitlist intake paused. Feel free to ask any other questions about CPH!", "assistant");
            return;
        }

        if (STATE.waitlistStep === "role") {
            if (lower.includes("parent") || lower === "1" || lower.includes("1.")) {
                STATE.leadData.role = "Parent";
                appendMessageSync("Parent", "user");
                STATE.waitlistStep = "name";
                appendStreamingMessage("Understood! What is your **Full Name**?", "assistant");
            } else if (lower.includes("coach") || lower.includes("trainer") || lower === "2" || lower.includes("2.")) {
                STATE.leadData.role = "Coach";
                appendMessageSync("Coach", "user");
                STATE.waitlistStep = "name";
                appendStreamingMessage("Welcome, Coach! (Founding Providers receive **4 full months free** after launch.) What is your **Full Name**?", "assistant");
            } else if (lower.includes("service") || lower.includes("provider") || lower.includes("academy") || lower.includes("business") || lower.includes("specialist") || lower === "3" || lower.includes("3.")) {
                STATE.leadData.role = "Service Provider";
                appendMessageSync("Service Provider", "user");
                STATE.waitlistStep = "name";
                appendStreamingMessage("Great to have you! (Founding Providers receive **4 full months free** after launch.) What is your **Full Name** or Business Name?", "assistant");
            } else if (lower.includes("other") || lower === "4" || lower.includes("4.")) {
                STATE.leadData.role = "Other";
                appendMessageSync("Other", "user");
                STATE.waitlistStep = "name";
                appendStreamingMessage("Welcome! What is your **Full Name**?", "assistant");
            } else {
                processAIQuery(text);
            }
            return;
        }

        if (STATE.waitlistStep === "name") {
            STATE.leadData.name = text;
            appendMessageSync(text, "user");
            STATE.waitlistStep = "email";
            appendStreamingMessage(`Great to meet you, **${STATE.leadData.name}**! What **Email Address** should we send your welcome letter from Sol & pre-launch invitation to?`, "assistant");
            return;
        }

        if (STATE.waitlistStep === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(text)) {
                if (text.includes("?") || text.length > 28) {
                    processAIQuery(text);
                    setTimeout(() => {
                        appendStreamingMessage(`(To complete your registration, enter your **Email Address** when ready.)`, "assistant");
                    }, 1200);
                    return;
                }
                appendMessageSync(text, "user");
                appendStreamingMessage("Please enter a valid **Email Address** (e.g. name@domain.com) to proceed.", "assistant");
                return;
            }
            STATE.leadData.email = text;
            appendMessageSync(text, "user");
            STATE.waitlistStep = "phone";
            appendStreamingMessage("Got it. What **Mobile Phone Number** can we use for priority launch updates?", "assistant");
            return;
        }

        if (STATE.waitlistStep === "phone") {
            const cleanPhone = text.replace(/[^0-9+]/g, "");
            if (cleanPhone.length < 7) {
                appendMessageSync(text, "user");
                appendStreamingMessage("Please enter a valid phone number (at least 7 digits) to continue.", "assistant");
                return;
            }
            STATE.leadData.phone = text;
            appendMessageSync(text, "user");
            STATE.waitlistStep = "location";
            appendStreamingMessage("Almost done! What is your **City / County** (e.g. Arlington, Bethesda, Washington D.C., Fairfax, or Virtual/National)?", "assistant");
            return;
        }

        if (STATE.waitlistStep === "location") {
            STATE.leadData.location = text;
            appendMessageSync(text, "user");
            STATE.waitlistStep = "complete";
            STATE.isWaitlistFlow = false;

            showTypingIndicator();
            const payload = {
                crm_source: "cph_digital_concierge",
                role: STATE.leadData.role || (STATE.diagnosticActive ? "Parent" : "Parent"),
                name: STATE.leadData.name,
                email: STATE.leadData.email,
                phone: STATE.leadData.phone,
                location: STATE.leadData.location,
                diagnostic_meta: STATE.diagnosticActive ? STATE.diagnosticData : null,
                timestamp: new Date().toISOString()
            };

            // 1. Persistent client-side storage (Zero data loss in static mode)
            try {
                const existingLeads = JSON.parse(localStorage.getItem("cph_waitlist_leads") || "[]");
                existingLeads.push(payload);
                localStorage.setItem("cph_waitlist_leads", JSON.stringify(existingLeads));
            } catch (err) {
                console.warn("[CPH Concierge] LocalStorage write failed:", err);
            }

            // 2. Direct Supabase Ingestion (Isolated CPH Database)
            try {
                const cfg = window.CPH_CONFIG || window.CPH_SUPABASE_CONFIG || {};
                const sbUrl = (cfg.supabaseUrl || window.CPH_SUPABASE_URL || "").replace(/\/+$/, "");
                const sbKey = cfg.supabaseAnonKey || window.CPH_SUPABASE_ANON_KEY || "";
                if (sbUrl && sbKey) {
                    fetch(`${sbUrl}/rest/v1/cph_waitlist`, {
                        method: "POST",
                        headers: {
                            "apikey": sbKey,
                            "Authorization": `Bearer ${sbKey}`,
                            "Content-Type": "application/json",
                            "Prefer": "return=minimal"
                        },
                        body: JSON.stringify({
                            role: payload.role || "Parent",
                            name: payload.name || null,
                            email: payload.email,
                            phone: payload.phone || null,
                            location: payload.location || null,
                            diagnostic_meta: payload.diagnostic_meta || {},
                            crm_source: payload.crm_source || "cph_digital_concierge"
                        })
                    }).then(r => {
                        if (r.ok) {
                            console.log("[CPH Concierge] Lead recorded in Supabase cph_waitlist");
                            payload.synced_to_supabase = true;
                        }
                    }).catch(err => console.warn("[CPH Concierge] Supabase direct sync error:", err));
                }
            } catch (err) {
                console.warn("[CPH Concierge] Supabase ingestion handler exception:", err);
            }

            // 3. Synchronize to Backend API if online (triggers automated Welcome Letter from Sol)
            (async () => {
                for (const endpoint of ["/api/cph/waitlist", "https://engine.m3sh.in/api/cph/waitlist", "http://127.0.0.1:8000/api/cph/waitlist"]) {
                    try {
                        const r = await fetch(endpoint, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload)
                        });
                        if (r.ok) {
                            console.log("[CPH Concierge] Lead synced to backend:", endpoint);
                            break;
                        }
                    } catch (e) {}
                }
            })();

            // 4. Dispatch DOM CustomEvent for integrations
            try {
                window.dispatchEvent(new CustomEvent("cph:waitlist_lead", { detail: payload }));
            } catch (e) {}

            setTimeout(() => {
                removeTypingIndicator();
                const container = document.getElementById("cph-bot-container");
                if (container) container.classList.remove("in-waitlist-mode");
                appendStreamingMessage(
                    `🎉 **Registration Confirmed, ${STATE.leadData.name}!**\n\nYou are locked into priority pre-launch access for our **Fall 2026** launch as a **${payload.role}**.\n\nA personal welcome letter from **Sol & Heather Salinas** (along with your pre-launch onboarding details and Substack invite) is on its way to **${STATE.leadData.email}**!`,
                    "assistant"
                );
                console.log("[CPH Concierge] Waitlist Lead Captured:", payload);
            }, 900);
        }
    }

    // ─── USER INPUT HANDLER ───
    function handleSend() {
        const input = document.getElementById("cph-chat-input");
        if (!input) return;

        const text = input.value.trim();
        if (!text) return;
        input.value = "";

        if (STATE.isWaitlistFlow && STATE.waitlistStep !== "idle" && STATE.waitlistStep !== "complete") {
            handleWaitlistStep(text);
            return;
        }

        appendMessageSync(text, "user");
        processAIQuery(text);
    }

    // ─── TOGGLE CHAT ───
    function toggleChat() {
        STATE.isOpen = !STATE.isOpen;
        const container = document.getElementById("cph-bot-container");
        const iconChat = document.getElementById("cph-icon-chat");
        const iconClose = document.getElementById("cph-icon-close");

        if (STATE.isOpen) {
            dismissAmbientCapsule();
            container.classList.add("open");
            if (iconChat) iconChat.style.display = "none";
            if (iconClose) iconClose.style.display = "block";

            if (window.innerWidth > 480) {
                setTimeout(() => {
                    const input = document.getElementById("cph-chat-input");
                    if (input) input.focus();
                }, 100);
            }
        } else {
            container.classList.remove("open");
            if (iconChat) iconChat.style.display = "block";
            if (iconClose) iconClose.style.display = "none";
        }
    }

    // ─── TELEMETRY TICKER LOOP ───
    function startTelemetryLoop() {
        const ticker = document.getElementById("cph-telemetry-text");
        if (!ticker) return;

        setInterval(() => {
            STATE.telemetryIndex = (STATE.telemetryIndex + 1) % TELEMETRY_FEED.length;
            ticker.style.opacity = "0";
            setTimeout(() => {
                ticker.innerText = TELEMETRY_FEED[STATE.telemetryIndex];
                ticker.style.opacity = "1";
            }, 300);
        }, 6000);
    }

    // ─── EVENT ATTACHMENTS ───
    function bindEvents() {
        const launcher = document.getElementById("cph-bot-launcher");
        const customBubble = document.getElementById("chatbot-bubble");
        const closeBtn = document.querySelector(".cph-close-btn");
        const ttsBtn = document.getElementById("cph-tts-toggle");
        const sendBtn = document.getElementById("cph-send-btn");
        const chatInput = document.getElementById("cph-chat-input");

        // Capsule buttons
        const capDismiss = document.getElementById("cph-capsule-dismiss");
        const capExpand = document.getElementById("cph-capsule-expand");
        const capDiag = document.getElementById("cph-capsule-diag");

        if (capDismiss) capDismiss.addEventListener("click", dismissAmbientCapsule);
        if (capExpand) {
            capExpand.addEventListener("click", () => {
                dismissAmbientCapsule();
                if (!STATE.isOpen) toggleChat();
                const sec = STORYLINES[STATE.activeSegmentId] || STORYLINES["hero-segment"];
                const prompt = sec.userPrompt || "Tell me more about this section.";
                appendMessageSync(prompt, "user");
                if (sec.topic === "waitlist") {
                    startWaitlistFlow();
                } else if (sec.topic && REASONING_FALLBACKS[sec.topic]) {
                    showTypingIndicator();
                    setTimeout(() => {
                        removeTypingIndicator();
                        appendStreamingMessage(REASONING_FALLBACKS[sec.topic], "assistant");
                    }, 300);
                } else {
                    processAIQuery(prompt);
                }
            });
        }
        if (capDiag) {
            capDiag.addEventListener("click", () => {
                startPlayerDiagnostic();
            });
        }

        if (launcher) launcher.addEventListener("click", toggleChat);

        if (customBubble) {
            if (launcher) launcher.style.display = "none";
            customBubble.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleChat();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                userClosedBotManually = true;
                if (autoWaitlistDwellTimer) {
                    clearTimeout(autoWaitlistDwellTimer);
                    autoWaitlistDwellTimer = null;
                }
                toggleChat();
            });
        }

        // Wire all #waitlist anchor links (Navbar Login, CTA buttons) to trigger waitlist flow instantly
        document.querySelectorAll('a[href="#waitlist"]').forEach(anchor => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                userClosedBotManually = false;
                autoWaitlistTriggered = false;
                const wl = document.getElementById("waitlist");
                if (wl) wl.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                    startWaitlistFlow();
                }, 250);
            });
        });

        // Wire the 4 Direct Role Selection Buttons inside #waitlist section (Parent | Coach | Service Provider | Other)
        document.querySelectorAll(".cph-waitlist-role-trigger").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const selectedRole = btn.getAttribute("data-waitlist-role") || "Parent";
                userClosedBotManually = false;
                autoWaitlistTriggered = true;
                startWaitlistFlow(null, selectedRole);
            });
        });

        // Hero Search Bar Integration
        const heroSearchForm = document.getElementById("cph-hero-search-form");
        const heroSearchInput = document.getElementById("cph-hero-search-input");

        function executeHeroSearch(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const text = (heroSearchInput ? heroSearchInput.value : "").trim();
            if (!STATE.isOpen) toggleChat();
            if (text) {
                appendMessageSync(text, "user");
                processAIQuery(text);
                if (heroSearchInput) heroSearchInput.value = "";
            } else {
                appendMessageSync("What coaches, training academies, and performance specialists are available servicing the DMV?", "user");
                processAIQuery("search coaches across the dmv");
            }
        }

        if (heroSearchForm && !heroSearchForm.dataset.bound) {
            heroSearchForm.dataset.bound = "true";
            heroSearchForm.addEventListener("submit", executeHeroSearch);
        }

        if (ttsBtn) {
            ttsBtn.addEventListener("click", () => {
                STATE.ttsEnabled = !STATE.ttsEnabled;
                ttsBtn.classList.toggle("active", STATE.ttsEnabled);
                if (STATE.ttsEnabled) {
                    speakText("Voice narration active.");
                } else if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                }
            });
        }

        if (sendBtn) sendBtn.addEventListener("click", handleSend);
        if (chatInput) {
            chatInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") handleSend();
            });
        }
    }

    // ─── SCROLL INTERSECTION STORYLINE OBSERVER & AUTO-WAITLIST TRIGGER ───
    let autoWaitlistTriggered = false;
    let userClosedBotManually = false;
    let autoWaitlistDwellTimer = null;

    function triggerAutoWaitlistPrompt(secId) {
        if (autoWaitlistTriggered || userClosedBotManually) return;

        // Do not interrupt if already completed, currently in waitlist flow, or running diagnostic
        if (STATE.waitlistStep === "complete" || STATE.isWaitlistFlow || STATE.diagnosticActive) {
            return;
        }

        autoWaitlistTriggered = true;

        const promptText = secId === "contact"
            ? "👋 **Reaching out to Sol & Heather?** Join our **Fall 2026 Pre-Launch Cohort** for priority family access or **4 months free** as a Founding Coach / Service Provider!\n\n**I am a...**"
            : "🚀 **Launching Fall 2026!** Join our **Pre-Launch Cohort** for priority family access or **4 months free** as a Founding Coach / Service Provider.\n\n**I am a...**";

        startWaitlistFlow(promptText);
    }

    function initScrollStorylineObserver() {
        const sectionIds = ["hero-segment", "device-segment", "gateway", "pillars", "our-story", "insights", "waitlist", "contact"];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const secId = entry.target.id;
                    updateSegmentStoryline(secId);

                    // If user navigated away from waitlist/contact back up to content, reset userClosedBotManually
                    if (secId !== "waitlist" && secId !== "contact") {
                        userClosedBotManually = false;
                        if (autoWaitlistDwellTimer) {
                            clearTimeout(autoWaitlistDwellTimer);
                            autoWaitlistDwellTimer = null;
                        }
                    }

                    // Auto-open bot and prompt for waitlist when reaching Coming Soon poster or Contact Us
                    if (secId === "waitlist" || secId === "contact") {
                        if (!autoWaitlistTriggered && !userClosedBotManually && !STATE.isOpen) {
                            if (autoWaitlistDwellTimer) clearTimeout(autoWaitlistDwellTimer);
                            autoWaitlistDwellTimer = setTimeout(() => {
                                triggerAutoWaitlistPrompt(secId);
                            }, 250);
                        }
                    }
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // Also observe the guide-target card inside waitlist for ultra-responsive trigger
        const waitlistCard = document.querySelector("#waitlist .guide-target");
        if (waitlistCard) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!autoWaitlistTriggered && !userClosedBotManually && !STATE.isOpen) {
                            if (autoWaitlistDwellTimer) clearTimeout(autoWaitlistDwellTimer);
                            autoWaitlistDwellTimer = setTimeout(() => {
                                triggerAutoWaitlistPrompt("waitlist");
                            }, 200);
                        }
                    }
                });
            }, { threshold: 0.15 });
            cardObserver.observe(waitlistCard);
        }
    }

    // ─── PUBLIC API & DATA ACCESS ───
    window.CPHConcierge = {
        open: () => { if (!STATE.isOpen) toggleChat(); },
        close: () => { if (STATE.isOpen) toggleChat(); },
        setSegment: (segmentId) => updateSegmentStoryline(segmentId),
        startDiagnostic: () => startPlayerDiagnostic(),
        ask: (question) => {
            if (!STATE.isOpen) toggleChat();
            appendMessageSync(question, "user");
            processAIQuery(question);
        },
        getLeads: () => {
            try {
                return JSON.parse(localStorage.getItem("cph_waitlist_leads") || "[]");
            } catch (e) { return []; }
        },
        getInquiries: () => {
            try {
                return JSON.parse(localStorage.getItem("cph_contact_inquiries") || "[]");
            } catch (e) { return []; }
        },
        exportLeadsCSV: () => {
            try {
                const leads = JSON.parse(localStorage.getItem("cph_waitlist_leads") || "[]");
                if (!leads.length) {
                    alert("No waitlist leads stored in browser yet.");
                    return;
                }
                const headers = ["Timestamp", "Role", "Name", "Email", "Phone", "Location", "Source", "Diagnostic"];
                const rows = leads.map(l => [
                    `"${l.timestamp || ''}"`,
                    `"${l.role || ''}"`,
                    `"${(l.name || '').replace(/"/g, '""')}"`,
                    `"${l.email || ''}"`,
                    `"${l.phone || ''}"`,
                    `"${(l.location || '').replace(/"/g, '""')}"`,
                    `"${l.crm_source || ''}"`,
                    `"${l.diagnostic_meta ? JSON.stringify(l.diagnostic_meta).replace(/"/g, '""') : ''}"`
                ]);
                const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `cph_waitlist_leads_${new Date().toISOString().slice(0, 10)}.csv`;
                a.click();
            } catch (e) {
                console.error("Export error:", e);
            }
        },
        exportInquiriesCSV: () => {
            try {
                const inqs = JSON.parse(localStorage.getItem("cph_contact_inquiries") || "[]");
                if (!inqs.length) {
                    alert("No contact inquiries stored in browser yet.");
                    return;
                }
                const headers = ["Timestamp", "Role", "Name", "Email", "Message"];
                const rows = inqs.map(i => [
                    `"${i.timestamp || ''}"`,
                    `"${i.role || ''}"`,
                    `"${(i.name || '').replace(/"/g, '""')}"`,
                    `"${i.email || ''}"`,
                    `"${(i.message || '').replace(/"/g, '""')}"`
                ]);
                const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `cph_contact_inquiries_${new Date().toISOString().slice(0, 10)}.csv`;
                a.click();
            } catch (e) {
                console.error("Export error:", e);
            }
        },
        getEscalatedQuestions: () => {
            try {
                return JSON.parse(localStorage.getItem("cph_escalated_questions") || "[]");
            } catch (e) { return []; }
        },
        exportEscalatedQuestionsCSV: () => {
            try {
                const questions = JSON.parse(localStorage.getItem("cph_escalated_questions") || "[]");
                if (!questions.length) {
                    alert("No escalated questions stored in browser yet.");
                    return;
                }
                const headers = ["Timestamp", "Query"];
                const rows = questions.map(q => [
                    `"${q.timestamp || ''}"`,
                    `"${(q.query || '').replace(/"/g, '""')}"`
                ]);
                const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `cph_escalated_questions_${new Date().toISOString().slice(0, 10)}.csv`;
                a.click();
            } catch (e) {
                console.error("Export error:", e);
            }
        },
        syncAllToSupabase: async () => {
            const cfg = window.CPH_CONFIG || window.CPH_SUPABASE_CONFIG || {};
            const sbUrl = (cfg.supabaseUrl || window.CPH_SUPABASE_URL || "").replace(/\/+$/, "");
            const sbKey = cfg.supabaseAnonKey || window.CPH_SUPABASE_ANON_KEY || "";
            if (!sbUrl || !sbKey) {
                console.warn("[CPH Concierge] Cannot sync to Supabase: credentials missing in window.CPH_CONFIG");
                alert("Please configure window.CPH_CONFIG with supabaseUrl and supabaseAnonKey first.");
                return { success: false, error: "Missing Supabase credentials" };
            }
            let waitlistSynced = 0, inquiriesSynced = 0;
            try {
                const leads = JSON.parse(localStorage.getItem("cph_waitlist_leads") || "[]");
                for (const l of leads) {
                    const res = await fetch(`${sbUrl}/rest/v1/cph_waitlist`, {
                        method: "POST",
                        headers: {
                            "apikey": sbKey,
                            "Authorization": `Bearer ${sbKey}`,
                            "Content-Type": "application/json",
                            "Prefer": "return=minimal"
                        },
                        body: JSON.stringify({
                            role: l.role || "Parent",
                            name: l.name || null,
                            email: l.email,
                            phone: l.phone || null,
                            location: l.location || null,
                            diagnostic_meta: l.diagnostic_meta || {},
                            crm_source: l.crm_source || "cph_digital_concierge"
                        })
                    });
                    if (res.ok) waitlistSynced++;
                }

                const inqs = JSON.parse(localStorage.getItem("cph_contact_inquiries") || "[]");
                for (const i of inqs) {
                    const res = await fetch(`${sbUrl}/rest/v1/cph_inquiries`, {
                        method: "POST",
                        headers: {
                            "apikey": sbKey,
                            "Authorization": `Bearer ${sbKey}`,
                            "Content-Type": "application/json",
                            "Prefer": "return=minimal"
                        },
                        body: JSON.stringify({
                            role: i.role || "General",
                            name: i.name || "Inquirer",
                            email: i.email,
                            phone: i.phone || null,
                            message: i.message,
                            source: i.source || "contact_form"
                        })
                    });
                    if (res.ok) inquiriesSynced++;
                }
                console.log(`[CPH Concierge] Synced ${waitlistSynced} leads and ${inquiriesSynced} inquiries to Supabase.`);
                return { success: true, waitlistSynced, inquiriesSynced };
            } catch (err) {
                console.error("[CPH Concierge] Sync error:", err);
                return { success: false, error: err.message };
            }
        },
        resetAutoOpen: () => {
            autoWaitlistTriggered = false;
            userClosedBotManually = false;
            if (autoWaitlistDwellTimer) {
                clearTimeout(autoWaitlistDwellTimer);
                autoWaitlistDwellTimer = null;
            }
            sessionStorage.removeItem("cph_waitlist_auto_opened");
            console.log("[CPH Concierge] Auto-waitlist trigger reset.");
        },
        startWaitlist: (role = null) => {
            userClosedBotManually = false;
            autoWaitlistTriggered = false;
            startWaitlistFlow(null, role);
        }
    };

    // ─── INIT ───
    function init() {
        injectStyles();
        createMarkup();
        bindEvents();
        initScrollStorylineObserver();
        startTelemetryLoop();

        // Initial Greeting & Clean Guidance
        appendMessageSync("Welcome to **The Complete Player Hub (CPH)**! I am your **CPH Digital Concierge**.\n\nSol & Heather Salinas are launching the DMV's premier youth soccer development ecosystem in **Fall 2026**—connecting families with a curated network of coaches, performance specialists, and training academies across all 6 core pillars plus college recruiting, NIL, and international tours.\n\nHow can I assist you today?", "assistant");

        updateSegmentStoryline("hero-segment");
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }
})();
