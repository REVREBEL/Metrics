# GuestBridge Sprint 1 UI/UX Specifications

This specification preserves the high-fidelity UI designs, SVG vector wireframes, OKLCH theme tokens, and React 19 / shadcn components generated during Sprint 1.

---

## 🏨 Surface 1: Guest Portal (Concierge Warm Theme)
*Mobile-first (PWA), lightweight, high-end hospitality editorial aesthetic.*

### 📱 Guest Portal Visual Wireframe (SVG)
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 812" width="100%" style="max-width: 375px; border-radius: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.15); font-family: 'Playfair Display', 'Lora', system-ui, serif; background: #FBF9F6;">
  <rect x="0" y="0" width="375" height="44" fill="#FBF9F6" />
  <rect x="110" y="0" width="155" height="30" rx="15" fill="#000" />
  <text x="32" y="24" fill="#1C1A17" font-size="12" font-weight="600" font-family="sans-serif">9:41</text>
  <path d="M315 14h18v8h-18z" fill="none" stroke="#1C1A17" stroke-width="1.2" />
  <rect x="317" y="16" width="11" height="4" fill="#1C1A17" />
  <g transform="translate(0, 70)">
    <text x="187.5" y="20" font-size="10" letter-spacing="3" fill="#8C7D70" font-weight="600" font-family="sans-serif" text-anchor="middle">EST. 2026</text>
    <text x="187.5" y="48" font-size="24" font-weight="700" fill="#2E251E" text-anchor="middle" font-family="'Playfair Display', serif">The Rebel Pavilion</text>
    <text x="187.5" y="68" font-size="12" letter-spacing="1" fill="#8C7D70" font-style="italic" text-anchor="middle">Welcome, Honored Guest</text>
  </g>
  <g transform="translate(20, 175)">
    <rect x="0" y="0" width="335" height="520" rx="24" fill="#FFFFFF" filter="drop-shadow(0 10px 30px rgba(71, 57, 47, 0.05))" stroke="#EAE4E0" stroke-width="1" />
    <text x="24" y="38" font-size="18" font-weight="700" fill="#2E251E" font-family="'Playfair Display', serif">Verify Your Stay</text>
    <text x="24" y="58" font-size="12" fill="#8C7D70" font-family="sans-serif">Enter your booking details to unlock your guide.</text>
    <g transform="translate(24, 85)">
      <text x="0" y="15" font-size="11" font-weight="600" letter-spacing="0.5" fill="#5C5146" font-family="sans-serif">BOOKING REFERENCE</text>
      <rect x="0" y="24" width="287" height="44" rx="8" fill="#FDFDFD" stroke="#EAE4E0" stroke-width="1.5" />
      <text x="14" y="51" font-size="14" font-weight="600" fill="#2E251E" font-family="monospace">REB-9412A</text>
      <circle cx="260" cy="46" r="8" fill="#5F8A75" />
      <path d="M257 46l2 2 4-4" fill="none" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <g transform="translate(24, 170)">
      <text x="0" y="15" font-size="11" font-weight="600" letter-spacing="0.5" fill="#5C5146" font-family="sans-serif">LAST NAME</text>
      <rect x="0" y="24" width="287" height="44" rx="8" fill="#FDFDFD" stroke="#EAE4E0" stroke-width="1.5" />
      <text x="14" y="51" font-size="14" fill="#2E251E" font-family="sans-serif">Chevron</text>
    </g>
    <g transform="translate(24, 255)">
      <rect x="0" y="0" width="18" height="18" rx="4" fill="#AA5B3F" />
      <path d="M4 9l3 3 7-7" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <text x="28" y="14" font-size="13" font-weight="600" fill="#2E251E" font-family="sans-serif">Send room status updates via SMS</text>
      <g transform="translate(0, 32)">
        <text x="0" y="12" font-size="11" font-weight="600" fill="#5C5146" font-family="sans-serif">MOBILE PHONE NUMBER</text>
        <rect x="0" y="20" width="287" height="44" rx="8" fill="#FDFDFD" stroke="#AA5B3F" stroke-width="1.5" />
        <text x="14" y="47" font-size="14" fill="#2E251E" font-family="sans-serif">+1 (555) 019-2831</text>
        <rect x="-2" y="18" width="291" height="48" rx="10" fill="none" stroke="#AA5B3F" stroke-width="3" stroke-opacity="0.15" />
      </g>
    </g>
    <line x1="24" y1="385" x2="311" y2="385" stroke="#F5F0EC" stroke-width="1" />
    <text x="24" y="405" font-size="11" fill="#8C7D70" font-family="sans-serif">
      <tspan x="24" dy="0">By continuing, you agree to receive digital room-ready</tspan>
      <tspan x="24" dy="14">notices and key details regarding your upcoming stay.</tspan>
    </text>
    <g transform="translate(24, 445)">
      <rect x="0" y="0" width="287" height="48" rx="24" fill="#AA5B3F" />
      <text x="143.5" y="29" font-size="14" font-weight="600" fill="#FFFFFF" font-family="sans-serif" text-anchor="middle">Verify Stay &amp; Open Guide</text>
    </g>
  </g>
  <text x="187.5" y="725" font-size="11" fill="#8C7D70" letter-spacing="1" font-family="sans-serif" text-anchor="middle">🔒 SECURED BY GUESTBRIDGE</text>
  <rect x="121" y="797" width="134" height="5" rx="2.5" fill="#1C1A17" />
</svg>
```

### 🎨 OKLCH Theme Tokens (Guest Portal)
```css
--color-background: oklch(0.98 0.01 45);              /* Linen warm beige */
--color-foreground: oklch(0.20 0.02 30);              /* Charcoal Espresso */
--color-card: oklch(1.00 0.00 0);                     /* Pure crystalline white */
--color-primary: oklch(0.48 0.14 28);                 /* Clay Terracotta */
```

---

## 💬 Surface 2: Guest Messaging Center (Operator Slate Theme)
*High-density desktop application, cool slate dark UI for operator clarity.*

### 🖥️ Messaging Center Visual Wireframe (SVG)
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" width="100%" style="border-radius: 12px; box-shadow: 0 30px 70px rgba(0,0,0,0.4); font-family: 'Inter', system-ui, sans-serif; background: #0E1116;">
  <!-- App Window Sidebar (Left) -->
  <rect x="0" y="0" width="64" height="600" fill="#090B0F" />
  <rect x="17" y="20" width="30" height="30" rx="8" fill="#4F46E5" />
  <circle cx="32" cy="35" r="5" fill="#FFF" />
  <g transform="translate(17, 80)">
    <rect x="0" y="0" width="30" height="30" rx="6" fill="transparent" />
    <path d="M5 5h8v8H5zm12 0h8v8h-8zM5 17h8v8H5zm12 0h8v8h-8z" fill="#4B5563" />
    <rect x="0" y="44" width="30" height="30" rx="6" fill="#1E233D" />
    <circle cx="15" cy="59" r="6" stroke="#6366F1" stroke-width="1.8" fill="none" />
    <circle cx="21" cy="53" r="3" fill="#EF4444" />
    <path d="M11 115a4 4 0 118 0 4 4 0 01-8 0z" fill="#4B5563" />
  </g>
  <!-- COLUMN 1: Conversation Queue List (Width: 260px) -->
  <g transform="translate(64, 0)">
    <rect x="0" y="0" width="260" height="600" fill="#11141A" stroke="#1E232D" stroke-width="0.5" />
    <text x="16" y="32" font-size="14" font-weight="700" fill="#F3F4F6">Conversations</text>
    <rect x="180" y="18" width="64" height="18" rx="10" fill="#1E1E2F" />
    <text x="212" y="31" font-size="10" font-weight="600" fill="#6366F1" text-anchor="middle">38 Active</text>
    <g transform="translate(8, 55)">
      <rect x="0" y="0" width="244" height="96" rx="10" fill="#1C181E" stroke="#EA580C" stroke-width="1.5" />
      <text x="12" y="24" font-size="13" font-weight="700" fill="#FFFFFF">Alex Chevron</text>
      <rect x="180" y="12" width="52" height="16" rx="4" fill="#FFEAE5" />
      <text x="206" y="24" font-size="9" font-weight="700" fill="#E11D48" text-anchor="middle">Expedia</text>
      <text x="12" y="48" font-size="12" fill="#9CA3AF">Are early checkout options...</text>
      <rect x="12" y="65" width="80" height="18" rx="4" fill="#7C2D12" />
      <circle cx="22" cy="74" r="3.5" fill="#EF4444" />
      <text x="32" y="77" font-size="10" font-weight="700" fill="#FDBA74">04:52 SLA</text>
      <circle cx="224" cy="74" r="10" fill="#4B5563" />
      <text x="224" y="77" font-size="9" fill="#FFF" font-weight="700" text-anchor="middle">GS</text>
    </g>
    <g transform="translate(8, 160)">
      <rect x="0" y="0" width="244" height="96" rx="10" fill="#1A1F26" stroke="#1E232D" stroke-width="1" />
      <text x="12" y="24" font-size="13" font-weight="600" fill="#E5E7EB">Julianne Ross</text>
      <rect x="195" y="12" width="37" height="16" rx="4" fill="#E0F2FE" />
      <text x="213.5" y="24" font-size="9" font-weight="700" fill="#0369A1" text-anchor="middle">SMS</text>
      <text x="12" y="48" font-size="12" fill="#9CA3AF">Room ready status request</text>
      <rect x="12" y="65" width="74" height="18" rx="4" fill="#1E293B" />
      <text x="20" y="77" font-size="10" font-weight="600" fill="#94A3B8">Draft Ready</text>
    </g>
  </g>
  <!-- COLUMN 2: Message Thread Canvas (Width: 420px) -->
  <g transform="translate(324, 0)">
    <rect x="0" y="0" width="420" height="600" fill="#0E1116" />
    <rect x="0" y="0" width="420" height="55" fill="#11141A" stroke="#1E232D" stroke-width="0.5" />
    <text x="20" y="32" font-size="14" font-weight="700" fill="#F3F4F6">Active Thread: Alex Chevron</text>
    <g transform="translate(20, 80)">
      <circle cx="16" cy="16" r="16" fill="#374151" />
      <text x="16" y="20" font-size="11" font-weight="700" fill="#F3F4F6" text-anchor="middle">AC</text>
      <path d="M44 0h240v64H44z" fill="#1F2937" rx="8" />
      <text x="56" y="24" font-size="13" fill="#F3F4F6">Is it possible to check out around 1:00 PM?</text>
      <text x="56" y="46" font-size="13" fill="#F3F4F6">My flight isn't until later in the evening.</text>
      <text x="240" y="52" font-size="10" fill="#6B7280">9:40 AM</text>
    </g>
    <g transform="translate(20, 180)">
      <rect x="44" y="0" width="336" height="190" rx="12" fill="#131522" stroke="#6366F1" stroke-width="1.5" />
      <rect x="44" y="0" width="336" height="32" fill="#1E203B" rx="12" />
      <text x="60" y="20" font-size="11" font-weight="700" fill="#818CF8">🤖 AI RECOMMENDED ASSISTANT</text>
      <text x="315" y="20" font-size="10" fill="#818CF8">94% Confidence</text>
      <text x="60" y="58" font-size="13" fill="#E0E7FF">"Hi Alex, late checkout can be accommodated for</text>
      <text x="60" y="78" font-size="13" fill="#E0E7FF">your stay until 1:00 PM today for a nominal fee.</text>
      <text x="60" y="98" font-size="13" fill="#E0E7FF">I have provisionally scheduled this on your room."</text>
      <g transform="translate(60, 135)">
        <rect x="0" y="0" width="160" height="34" rx="6" fill="#4F46E5" />
        <text x="80" y="21" font-size="11" font-weight="700" fill="#FFF" text-anchor="middle">Approve &amp; Send (⌥A)</text>
        <rect x="170" y="0" width="70" height="34" rx="6" fill="transparent" stroke="#4B5563" stroke-width="1" />
        <text x="205" y="21" font-size="11" font-weight="600" fill="#D1D5DB" text-anchor="middle">Edit (⌥E)</text>
      </g>
    </g>
    <g transform="translate(20, 480)">
      <rect x="0" y="0" width="380" height="100" rx="10" fill="#11141A" stroke="#1E232D" stroke-width="1" />
      <text x="16" y="26" font-size="13" fill="#4B5563">Type message... (Press CMD+Enter to dispatch)</text>
      <circle cx="346" cy="74" r="14" fill="#1F2937" />
      <path d="M341 74h10M346 69v10" fill="none" stroke="#D1D5DB" stroke-width="2" />
    </g>
  </g>
  <!-- COLUMN 3: Context Panel (Right - Width: 216px) -->
  <g transform="translate(744, 0)">
    <rect x="0" y="0" width="216" height="600" fill="#11141A" stroke="#1E232D" stroke-width="0.5" />
    <rect x="0" y="0" width="216" height="55" fill="#11141A" stroke="#1E232D" stroke-width="0.5" />
    <text x="16" y="32" font-size="13" font-weight="700" fill="#9CA3AF">GUEST PROFILE Context</text>
    <g transform="translate(16, 75)">
      <circle cx="40" cy="40" r="40" fill="#1F2937" />
      <text x="40" y="47" font-size="20" font-weight="700" fill="#F3F4F6" text-anchor="middle">AC</text>
      <text x="96" y="35" font-size="15" font-weight="700" fill="#FFFFFF">Alex Chevron</text>
      <text x="96" y="55" font-size="12" fill="#EF4444">VIP Tier Gold</text>
    </g>
    <g transform="translate(16, 175)">
      <rect x="0" y="0" width="184" height="135" rx="8" fill="#1E232D" />
      <text x="16" y="24" font-size="11" font-weight="600" fill="#9CA3AF">PMS RESERVATION STATUS</text>
      <text x="16" y="54" font-size="13" font-weight="700" fill="#FFFFFF">Room 402</text>
      <text x="16" y="74" font-size="13" fill="#D1D5DB">Checked In: Jun 10</text>
      <text x="16" y="94" font-size="13" fill="#D1D5DB">Checkout: Jun 14</text>
      <text x="16" y="114" font-size="13" fill="#6EE7B7">Direct Billing Verified</text>
    </g>
    <g transform="translate(16, 330)">
      <text x="0" y="12" font-size="11" font-weight="600" fill="#9CA3AF">CURATOR INTENT SURVEY</text>
      <g transform="translate(0, 24)">
        <rect x="0" y="0" width="110" height="20" rx="10" fill="#2E251E" stroke="#AA5B3F" stroke-width="1"/>
        <text x="55" y="13" font-size="10" font-weight="700" fill="#FDBA74" text-anchor="middle">🍸 Local Mixology</text>
        <rect x="0" y="28" width="100" height="20" rx="10" fill="#1F2937" />
        <text x="50" y="41" font-size="10" font-weight="600" fill="#9CA3AF" text-anchor="middle">🏃 Modern Gym</text>
      </g>
    </g>
  </g>
</svg>
