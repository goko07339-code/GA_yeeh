# AUTO GRANATO

موقع معرض سيارات (Volla, NA): واجهة عامة + لوحة إدارة (`/admin.html`) + Supabase + Cloudflare Worker/R2 لرفع الصور.

## الهيكل
| المسار | الوظيفة |
|---|---|
| `public/` | الموقع كاملاً (هذا ما يُنشر) |
| `scripts/build.mjs` | بناء بلا اعتماديات: ينسخ `public` إلى `dist`، يضبط النطاق، ويتحقق أن كل ملف مذكور موجود |
| `render.yaml` | إعداد Render (Static Site + رؤوس الأمان) |
| `worker/` | Cloudflare Worker لرفع الصور (لا يُنشر على Render) |
| `database/` | سكربتات SQL لـ Supabase |
| `tools/build-config.py` | يعيد توليد الإعدادات العامة المشفّرة داخل `public/assets/img/noise.png` |
| `docs/` | الأدلة |

## تشغيل محلي
```bash
node scripts/build.mjs && npx serve dist
```

## النشر
اتبع [docs/DEPLOY_AR.md](docs/DEPLOY_AR.md).

## أمان
- لا يوجد أي سر في المستودع. `.env` في `.gitignore`.
- `SUPABASE_SECRET_KEY` مكانه أسرار الـ Worker فقط.
