# 🗺️ خطوات Google Maps API

![Google Cloud Console](file:///C:/Users/HP/.gemini/antigravity/brain/4d27574f-5368-4a18-b1cb-ad997603062c/uploaded_image_1766531773855.png)

## ✅ أنت الآن في Google Cloud Console

### الخطوة 1: تفعيل Maps JavaScript API

1. **في شريط البحث في الأعلى:**
   - اكتب: `Maps JavaScript API`
   - اضغط Enter

2. **اضغط على النتيجة الأولى:** "Maps JavaScript API"

3. **اضغط على زر "ENABLE"**

---

### الخطوة 2: إنشاء API Key

بعد تفعيل API:

1. **اذهب إلى:** APIs & Services > Credentials
   - من القائمة الجانبية ☰

2. **اضغط:** "+ CREATE CREDENTIALS"

3. **اختر:** "API key"

4. **انسخ المفتاح** الذي سيظهر

---

### الخطوة 3: تقييد المفتاح (مهم!)

1. **اضغط على المفتاح** الذي أنشأته

2. **في "Application restrictions":**
   - اختر "HTTP referrers (web sites)"
   - أضف:
     ```
     http://localhost:5173/*
     http://localhost:4173/*
     https://*.vercel.app/*
     ```

3. **في "API restrictions":**
   - اختر "Restrict key"
   - اختر "Maps JavaScript API"

4. **احفظ**

---

## 🔍 ابدأ الآن:

**ابحث عن "Maps JavaScript API" في شريط البحث في الأعلى** 📸
