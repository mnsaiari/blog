# مدونتي - Personal Arabic Blog

مدونة شخصية باللغة العربية مبنية بـ Next.js وSupabase.

## الإعداد

### 1. متطلبات البيئة

انسخ ملف `.env.local.example` إلى `.env.local` وأضف متغيرات البيئة:

```bash
cp .env.local.example .env.local
```

أضف قيم Supabase من Dashboard → Settings → API:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. إعداد Supabase

#### إنشاء الجداول
في Supabase Dashboard → SQL Editor، شغّل:

```sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users full access" ON posts
  FOR ALL USING (auth.role() = 'authenticated');
```

#### إنشاء Storage Bucket
في Supabase Dashboard → Storage:
1. أنشئ bucket جديد اسمه: `post-images`
2. اجعله Public
3. أضف policy: Allow authenticated users to upload

#### إنشاء حساب المدير
في Supabase Dashboard → Authentication → Users:
أضف مستخدماً جديداً بإيميل وكلمة مرور.

### 3. تشغيل المشروع

```bash
npm install
npm run dev
```

افتح http://localhost:3000

لوحة التحكم: http://localhost:3000/admin

## النشر على Vercel

1. ادفع الكود إلى GitHub
2. اربط المستودع بـ Vercel
3. أضف متغيرات البيئة في Vercel Dashboard
