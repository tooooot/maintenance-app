# 🔑 دليل إضافة المفاتيح - Firebase و Google Maps

## 📱 الجزء 1: إعداد Firebase (10 دقائق)

### الخطوة 1: إنشاء مشروع Firebase

1. **افتح Firebase Console:**
   - اذهب إلى: https://console.firebase.google.com
   - سجل دخول بحساب Google

2. **أنشئ مشروع جديد:**
   - اضغط "Add project" أو "إضافة مشروع"
   - اسم المشروع: `maintenance-app` (أو أي اسم تريده)
   - اضغط "Continue"

3. **تعطيل Google Analytics (اختياري):**
   - يمكنك تعطيله لتسريع الإنشاء
   - اضغط "Create project"
   - انتظر 30 ثانية حتى يتم الإنشاء

---

### الخطوة 2: الحصول على مفاتيح Firebase

1. **في صفحة المشروع:**
   - اضغط على أيقونة ⚙️ (Settings) في الأعلى
   - اختر "Project settings"

2. **تسجيل تطبيق ويب:**
   - انزل لقسم "Your apps"
   - اضغط على أيقونة الويب `</>`
   - اسم التطبيق: `Maintenance App`
   - ✅ فعّل "Also set up Firebase Hosting" (اختياري)
   - اضغط "Register app"

3. **انسخ المفاتيح:**
   سترى كود مثل هذا:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "maintenance-app-xxxxx.firebaseapp.com",
     projectId: "maintenance-app-xxxxx",
     storageBucket: "maintenance-app-xxxxx.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:xxxxxxxxxxxxx"
   };
   ```
   **احفظ هذه المفاتيح!**

---

### الخطوة 3: تفعيل خدمات Firebase

#### 3.1 Firestore Database (قاعدة البيانات)
1. في القائمة الجانبية، اختر **Build** > **Firestore Database**
2. اضغط "Create database"
3. اختر **"Start in test mode"** (للتطوير)
4. اختر الموقع الأقرب لك (مثل: `europe-west`)
5. اضغط "Enable"

#### 3.2 Authentication (المصادقة)
1. في القائمة الجانبية، اختر **Build** > **Authentication**
2. اضغط "Get started"
3. اختر **"Phone"** من قائمة Sign-in methods
4. فعّل Phone authentication
5. اضغط "Save"

#### 3.3 Storage (التخزين)
1. في القائمة الجانبية، اختر **Build** > **Storage**
2. اضغط "Get started"
3. اختر **"Start in test mode"**
4. اضغط "Next" ثم "Done"

#### 3.4 Cloud Messaging (الإشعارات)
1. في القائمة الجانبية، اختر **Build** > **Cloud Messaging**
2. في قسم "Web configuration"
3. اضغط "Generate key pair"
4. **انسخ الـ VAPID key** (مثل: `BNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
5. احفظه، سنحتاجه لاحقاً

---

### الخطوة 4: إضافة المفاتيح في الكود

افتح ملف `src/firebase.js` وأضف المفاتيح:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // ضع مفتاحك هنا
    authDomain: "maintenance-app-xxxxx.firebaseapp.com",
    projectId: "maintenance-app-xxxxx",
    storageBucket: "maintenance-app-xxxxx.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:xxxxxxxxxxxxx"
}

// VAPID Key للإشعارات
const vapidKey = "BNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // ضع VAPID key هنا
```

افتح ملف `public/firebase-messaging-sw.js` وأضف نفس المفاتيح:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "maintenance-app-xxxxx.firebaseapp.com",
    projectId: "maintenance-app-xxxxx",
    storageBucket: "maintenance-app-xxxxx.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:xxxxxxxxxxxxx"
}
```

---

## 🗺️ الجزء 2: إعداد Google Maps (5 دقائق)

### الخطوة 1: إنشاء مشروع Google Cloud

1. **افتح Google Cloud Console:**
   - اذهب إلى: https://console.cloud.google.com
   - سجل دخول بحساب Google

2. **أنشئ مشروع جديد:**
   - اضغط على القائمة المنسدلة في الأعلى
   - اضغط "NEW PROJECT"
   - اسم المشروع: `maintenance-app-maps`
   - اضغط "CREATE"
   - انتظر 10 ثوانٍ

---

### الخطوة 2: تفعيل Maps JavaScript API

1. **افتح مكتبة APIs:**
   - في القائمة الجانبية ☰
   - اختر **"APIs & Services"** > **"Library"**

2. **ابحث عن Maps API:**
   - في مربع البحث، اكتب: `Maps JavaScript API`
   - اضغط على النتيجة الأولى
   - اضغط "ENABLE"
   - انتظر 5 ثوانٍ

---

### الخطوة 3: إنشاء API Key

1. **افتح صفحة Credentials:**
   - في القائمة الجانبية
   - اختر **"APIs & Services"** > **"Credentials"**

2. **أنشئ مفتاح جديد:**
   - اضغط "+ CREATE CREDENTIALS"
   - اختر "API key"
   - سيظهر المفتاح (مثل: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
   - **انسخ المفتاح!**

---

### الخطوة 4: تقييد المفتاح (مهم للأمان!)

1. **اضغط على المفتاح الذي أنشأته:**
   - في صفحة Credentials
   - اضغط على اسم المفتاح

2. **تقييد الاستخدام:**
   
   **في "Application restrictions":**
   - اختر **"HTTP referrers (web sites)"**
   - اضغط "+ ADD AN ITEM"
   - أضف:
     ```
     http://localhost:5173/*
     http://localhost:4173/*
     https://maintenance-app*.vercel.app/*
     ```
   - (استبدل `maintenance-app` باسم مشروعك في Vercel)

   **في "API restrictions":**
   - اختر **"Restrict key"**
   - اختر **"Maps JavaScript API"** فقط

3. **احفظ:**
   - اضغط "SAVE" في الأسفل
   - انتظر 5 ثوانٍ

---

### الخطوة 5: إضافة المفتاح في الكود

افتح ملف `src/config/maps.js` وأضف المفتاح:

```javascript
export const GOOGLE_MAPS_API_KEY = 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' // ضع مفتاحك هنا

export const GOOGLE_MAPS_CONFIG = {
    libraries: ['places', 'geometry'],
    language: 'ar',
    region: 'SA'
}
```

---

## ✅ التحقق من الإعداد

### اختبار Firebase:
```bash
npm run dev
```
افتح المتصفح على `http://localhost:5173`
- افتح Console (F12)
- يجب ألا ترى أخطاء Firebase

### اختبار Google Maps:
- اذهب لصفحة "طلب خدمة جديدة"
- في خطوة "تحديد الموقع"
- يجب أن تظهر الخريطة بدون أخطاء

---

## 🚀 النشر على Vercel

بعد إضافة المفاتيح:

```bash
git add .
git commit -m "Add Firebase and Google Maps keys"
git push
```

ثم:
1. اذهب إلى https://vercel.com
2. سجل دخول بـ GitHub
3. اضغط "New Project"
4. اختر `maintenance-app`
5. اضغط "Deploy"
6. ✅ انتظر 2-3 دقائق

---

## 💰 التكلفة

| الخدمة | الخطة المجانية | كافي لـ |
|:---|:---|:---|
| **Firebase** | Spark Plan | 1000+ مستخدم |
| **Google Maps** | $200/شهر مجاناً | 28,000 طلب/شهر |
| **Vercel** | Hobby Plan | غير محدود |

**التكلفة الكلية:** $0/شهر

---

## 🆘 حل المشاكل الشائعة

### مشكلة: "Firebase: Error (auth/invalid-api-key)"
**الحل:** تأكد من نسخ المفاتيح بشكل صحيح بدون مسافات

### مشكلة: "Google Maps: InvalidKeyMapError"
**الحل:** 
1. تأكد من تفعيل Maps JavaScript API
2. تأكد من إضافة النطاق في HTTP referrers
3. انتظر 5 دقائق بعد إنشاء المفتاح

### مشكلة: "This API project is not authorized"
**الحل:** تأكد من اختيار المشروع الصحيح في Google Cloud Console

---

## 📋 قائمة التحقق النهائية

- [ ] إنشاء مشروع Firebase
- [ ] نسخ مفاتيح Firebase
- [ ] تفعيل Firestore
- [ ] تفعيل Authentication
- [ ] تفعيل Storage
- [ ] الحصول على VAPID key
- [ ] إضافة المفاتيح في `src/firebase.js`
- [ ] إضافة المفاتيح في `public/firebase-messaging-sw.js`
- [ ] إنشاء مشروع Google Cloud
- [ ] تفعيل Maps JavaScript API
- [ ] إنشاء API Key
- [ ] تقييد المفتاح
- [ ] إضافة المفتاح في `src/config/maps.js`
- [ ] اختبار محلياً
- [ ] رفع على GitHub
- [ ] نشر على Vercel

---

**🎉 بعد إكمال هذه الخطوات، التطبيق سيعمل بشكل كامل!**
