# ศูนย์ข้อมูลสนับสนุนการตัดสินใจ PM2.5
## PM2.5 Crisis Decision Support Dashboard — Prototype v1.0

> ⚠️ **ต้นแบบระบบ (Prototype)** — ข้อมูลทั้งหมดเป็นข้อมูลจำลองเพื่อสาธิตโครงสร้าง ไม่ใช่ข้อมูลทางการ

---

## วัตถุประสงค์

ต้นแบบระบบนำเสนอข้อมูลวิกฤต PM2.5 แบบ end-to-end สำหรับผู้บริหารภาครัฐ นักวิเคราะห์นโยบาย และผู้จัดการแผนวิจัย ออกแบบให้รองรับการตัดสินใจเชิงนโยบายด้วยหลักฐานข้อมูล (Evidence-based Decision Support)

---

## วิธีเปิดใช้งาน

### ข้อกำหนด
- Node.js 18+ (แนะนำ Node.js 20)
- npm 8+

### ขั้นตอน

```bash
# 1. เข้าไปยังโฟลเดอร์โปรเจค
cd pm25-crisis-dashboard

# 2. ติดตั้ง dependencies
npm install

# 3. เปิด development server
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ที่ `http://localhost:5173`

### Build สำหรับ production

```bash
npm run build
npm run preview
```

---

## โครงสร้างโปรเจค

```
pm25-crisis-dashboard/
├── src/
│   ├── types.ts                    ← TypeScript interfaces ทั้งหมด
│   ├── data/
│   │   ├── overview.ts             ← KPI cards, trend data, executive summary
│   │   ├── severity.ts             ← Province/region severity data
│   │   ├── causes.ts               ← Area-type cause profiles + cause matrix
│   │   ├── measures.ts             ← Measures library (13 measures)
│   │   ├── evidence.ts             ← Research evidence registry (12 projects)
│   │   └── sti.ts                  ← STI plan alignment + priority matrix
│   ├── components/
│   │   ├── TopNav.tsx              ← Navigation bar
│   │   └── SectionHeader.tsx      ← Reusable section header
│   ├── sections/
│   │   ├── OverviewSection.tsx     ← Section 1: ภาพรวม
│   │   ├── SeveritySection.tsx     ← Section 2: พื้นที่และความรุนแรง
│   │   ├── CausesSection.tsx       ← Section 3: แหล่งกำเนิดและสาเหตุ
│   │   ├── MeasuresSection.tsx     ← Section 4: มาตรการ
│   │   ├── EvidenceSection.tsx     ← Section 5: หลักฐานวิจัย
│   │   ├── STIAlignmentSection.tsx ← Section 6: แผน ววน.
│   │   └── ConclusionSection.tsx   ← Section 7: ข้อสรุปเชิงนโยบาย
│   ├── App.tsx                     ← Main app with navigation logic
│   ├── main.tsx                    ← Entry point
│   └── index.css                   ← Global styles + Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## สิ่งที่แต่ละ Section นำเสนอ

| # | Section | วัตถุประสงค์ | Visual หลัก |
|---|---------|-------------|-------------|
| 01 | ภาพรวม | สรุปวิกฤตใน 60 วินาที | KPI cards, trend chart, bar chart, exec summary |
| 02 | พื้นที่และความรุนแรง | ระบุจุดเสี่ยง | Stylized region map, province bar, data table |
| 03 | แหล่งกำเนิดและสาเหตุ | สาเหตุต่างกันตามพื้นที่ | Cause profile, pie chart, cause matrix |
| 04 | มาตรการ | เลือกมาตรการตรงเหตุ | Accordion cards, decision table |
| 05 | หลักฐานวิจัย | ตรวจสอบหลักฐานก่อนตัดสินใจ | Evidence cards, gap analysis charts |
| 06 | แผน ววน. | เชื่อมโยงกับ STI plan | Logic chain, alignment board, priority matrix |
| 07 | ข้อสรุป | Decision takeaways | Policy conclusions, gap list, next phases |

---

## Stack เทคโนโลยี

- **React 18** + **TypeScript**
- **Vite 5** — build tool
- **Tailwind CSS 3** — styling
- **Recharts 2** — charts (Line, Bar, Pie, etc.)
- **Lucide React** — icons
- ไม่ต้องการ backend — ข้อมูลทั้งหมดอยู่ใน TypeScript modules

---

## การปรับแต่ง

### เปลี่ยนข้อมูล
แก้ไขไฟล์ใน `src/data/` — ทุกไฟล์มี comments อธิบายโครงสร้าง

### เพิ่มจังหวัด
เพิ่มใน `src/data/severity.ts` ตาม interface `ProvinceSeverity`

### เพิ่มมาตรการ
เพิ่มใน `src/data/measures.ts` ตาม interface `Measure`

### เพิ่มโครงการวิจัย
เพิ่มใน `src/data/evidence.ts` ตาม interface `ResearchProject`

---

## คุณสมบัติ UX

- **Keyboard navigation**: ↑↓ หรือ ←→ เพื่อเปลี่ยน section
- **Mode toggle**: สลับมุมมอง Story/Data
- **Progress bar**: แสดงตำแหน่งใน presentation flow
- **Section dots**: navigation จาก footer
- **Filters**: กรองข้อมูลเชิงโต้ตอบในทุก section
- **Responsive**: ออกแบบสำหรับ desktop ก่อน

---

## ขั้นตอนพัฒนาต่อ

1. เชื่อมต่อ NRIIS API แทน mock data
2. นำเข้าข้อมูล PCD real-time PM2.5
3. เพิ่ม GISTDA hotspot map layer
4. บูรณาการกับระบบติดตามแผน ววน.

---

*สร้างด้วย React + TypeScript · ต้นแบบ v1.0 · สกสว./ววน. 2567*
