// assets/js/i18n.js (نسخة آمنة بدون CDN)

const translations = {
    it: {
        loginTitle: "Area Riservata",
        loginSubtitle: "Accedi per gestire il parco auto.",
        email: "Email",
        password: "Password",
        loginBtn: "Accedi",
        loginError: "Credenziali non valide.",
        accessDenied: "Accesso negato.",
        navOverview: "Panoramica",
        navInventory: "Parco Auto",
        navLeads: "Richieste",
        navReviews: "Recensioni",
        logout: "Esci",
        adminRole: "Amministratore",
        language: "Lingua",
        statPublished: "Auto Pubblicate",
        statDrafts: "Bozze",
        statLeads: "Richieste Totali",
        statReviews: "Recensioni da verificare",
        addCar: "+ Aggiungi Vettura",
        newCar: "Nuova Vettura",
        editCar: "Modifica Vettura",
        saveCar: "Salva Vettura",
        brand: "Marca *",
        model: "Modello *",
        year: "Anno *",
        price: "Prezzo (€)",
        mileage: "Chilometraggio",
        fuel: "Alimentazione",
        transmission: "Cambio",
        category: "Categoria",
        bodyType: "Carrozzeria",
        color: "Colore",
        horsepower: "Potenza (CV)",
        status: "Stato",
        description: "Descrizione",
        photos: "Fotografie",
        photosHint: "JPEG, PNG, WebP o AVIF · massimo 10 MB.",
        draft: "Bozza",
        published: "Pubblicata",
        sold: "Venduta",
        modify: "Modifica",
        delete: "Elimina",
        noCars: "Nessuna vettura registrata.",
        loading: "Caricamento...",
        saving: "Salvataggio...",
        saveSuccess: "Vettura salvata.",
        saveSuccessWithImages: "Vettura e {count} immagini salvate.",
        savePartial: "Vettura salvata. {ok} OK, {fail} fallite.",
        confirmDelete: "Sei sicuro di voler eliminare?",
        errorLoad: "Errore nel caricamento.",
        sectionBasic: "Informazioni base",
        sectionTechnical: "Dati tecnici",
        sectionClassification: "Classificazione",
        sectionDetails: "Dettagli",
        searchPlaceholder: "Cerca per marca, modello...",
        searchLabel: "Cerca:",
        lengthMenu: "Mostra _MENU_ vetture",
        infoLabel: "Visualizzate _START_–_END_ di _TOTAL_",
        infoEmpty: "Nessuna vettura",
        first: "Prima",
        last: "Ultima",
        next: "Successiva",
        previous: "Precedente",
        filterAllStatus: "Tutti gli stati",
        filterAllCategories: "Tutte le categorie",
        photo: "Foto",
        brandModel: "Marca / Modello",
        actions: "Azioni",
        recentCars: "Ultime vetture aggiunte",
        recentLeads: "Ultime richieste",
        leadsTitle: "Richieste ricevute",
        reviewsTitle: "Recensioni clienti",
        comingSoon: "Sezione in arrivo.",
        themeLight: "Passa alla modalità chiara",
        themeDark: "Passa alla modalità scura",
        vehicleBrand: "Marca", vehicleModel: "Modello", vehicleYear: "Anno", vehiclePrice: "Prezzo", vehicleMileage: "Chilometraggio", vehicleFuel: "Alimentazione", vehicleTransmission: "Cambio", vehicleHorsepower: "Potenza", vehicleCategory: "Categoria", vehicleBody: "Carrozzeria", vehicleColor: "Colore", vehicleStatus: "Stato", vehicleDescription: "Descrizione", vehicleCreated: "Creato il", vehiclePhotos: "Fotografie", vehicleEdit: "Modifica vettura"
    },
    en: {
        loginTitle: "Restricted Area",
        loginSubtitle: "Sign in to manage the car inventory.",
        email: "Email",
        password: "Password",
        loginBtn: "Sign In",
        loginError: "Invalid credentials.",
        accessDenied: "Access denied.",
        navOverview: "Overview",
        navInventory: "Inventory",
        navLeads: "Inquiries",
        navReviews: "Reviews",
        logout: "Logout",
        adminRole: "Administrator",
        language: "Language",
        statPublished: "Published Cars",
        statDrafts: "Drafts",
        statLeads: "Total Inquiries",
        statReviews: "Pending Reviews",
        addCar: "+ Add Vehicle",
        newCar: "New Vehicle",
        editCar: "Edit Vehicle",
        saveCar: "Save Vehicle",
        brand: "Brand *",
        model: "Model *",
        year: "Year *",
        price: "Price (€)",
        mileage: "Mileage",
        fuel: "Fuel",
        transmission: "Transmission",
        category: "Category",
        bodyType: "Body Type",
        color: "Color",
        horsepower: "Horsepower (HP)",
        status: "Status",
        description: "Description",
        photos: "Photos",
        photosHint: "JPEG, PNG, WebP or AVIF · max 10 MB.",
        draft: "Draft",
        published: "Published",
        sold: "Sold",
        modify: "Edit",
        delete: "Delete",
        noCars: "No vehicles registered.",
        loading: "Loading...",
        saving: "Saving...",
        saveSuccess: "Vehicle saved.",
        saveSuccessWithImages: "Vehicle and {count} images saved.",
        savePartial: "Vehicle saved. {ok} OK, {fail} failed.",
        confirmDelete: "Are you sure you want to delete?",
        errorLoad: "Error loading data.",
        sectionBasic: "Basic Info",
        sectionTechnical: "Technical Data",
        sectionClassification: "Classification",
        sectionDetails: "Details",
        searchPlaceholder: "Search by brand, model...",
        searchLabel: "Search:",
        lengthMenu: "Show _MENU_ vehicles",
        infoLabel: "Showing _START_–_END_ of _TOTAL_",
        infoEmpty: "No vehicles",
        first: "First",
        last: "Last",
        next: "Next",
        previous: "Previous",
        filterAllStatus: "All statuses",
        filterAllCategories: "All categories",
        photo: "Photo",
        brandModel: "Brand / Model",
        actions: "Actions",
        recentCars: "Recently Added Cars",
        recentLeads: "Recent Inquiries",
        leadsTitle: "Received Inquiries",
        reviewsTitle: "Customer Reviews",
        comingSoon: "Coming Soon.",
        themeLight: "Switch to light mode",
        themeDark: "Switch to dark mode",
        vehicleBrand: "Brand", vehicleModel: "Model", vehicleYear: "Year", vehiclePrice: "Price", vehicleMileage: "Mileage", vehicleFuel: "Fuel", vehicleTransmission: "Transmission", vehicleHorsepower: "Horsepower", vehicleCategory: "Category", vehicleBody: "Body type", vehicleColor: "Color", vehicleStatus: "Status", vehicleDescription: "Description", vehicleCreated: "Created", vehiclePhotos: "Photos", vehicleEdit: "Edit vehicle"
    },
    ar: {
        loginTitle: "المنطقة المحظورة",
        loginSubtitle: "سجل الدخول لإدارة معرض السيارات.",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        loginBtn: "تسجيل الدخول",
        loginError: "بيانات الدخول غير صحيحة.",
        accessDenied: "تم رفض الوصول.",
        navOverview: "نظرة عامة",
        navInventory: "السيارات",
        navLeads: "الطلبات",
        navReviews: "التقييمات",
        logout: "تسجيل الخروج",
        adminRole: "مسؤول",
        language: "اللغة",
        statPublished: "السيارات المنشورة",
        statDrafts: "المسودات",
        statLeads: "إجمالي الطلبات",
        statReviews: "تقييمات معلقة",
        addCar: "+ إضافة سيارة",
        newCar: "سيارة جديدة",
        editCar: "تعديل السيارة",
        saveCar: "حفظ السيارة",
        brand: "الماركة *",
        model: "الموديل *",
        year: "السنة *",
        price: "السعر (€)",
        mileage: "المسافة المقطوعة",
        fuel: "الوقود",
        transmission: "ناقل الحركة",
        category: "الفئة",
        bodyType: "نوع الهيكل",
        color: "اللون",
        horsepower: "القوة (حصان)",
        status: "الحالة",
        description: "الوصف",
        photos: "الصور",
        photosHint: "JPEG, PNG, WebP أو AVIF · الحد الأقصى 10 ميغابايت.",
        draft: "مسودة",
        published: "منشورة",
        sold: "مباعة",
        modify: "تعديل",
        delete: "حذف",
        noCars: "لا توجد سيارات مسجلة.",
        loading: "جاري التحميل...",
        saving: "جاري الحفظ...",
        saveSuccess: "تم حفظ السيارة.",
        saveSuccessWithImages: "تم حفظ السيارة و {count} صور.",
        savePartial: "تم حفظ السيارة. {ok} ناجحة، {fail} فاشلة.",
        confirmDelete: "هل أنت متأكد من الحذف؟",
        errorLoad: "خطأ في تحميل البيانات.",
        sectionBasic: "معلومات أساسية",
        sectionTechnical: "بيانات تقنية",
        sectionClassification: "التصنيف",
        sectionDetails: "التفاصيل",
        searchPlaceholder: "ابحث بالماركة أو الموديل...",
        searchLabel: "بحث:",
        lengthMenu: "عرض _MENU_ سيارة",
        infoLabel: "عرض _START_–_END_ من _TOTAL_",
        infoEmpty: "لا توجد سيارات",
        first: "الأولى",
        last: "الأخيرة",
        next: "التالية",
        previous: "السابقة",
        filterAllStatus: "جميع الحالات",
        filterAllCategories: "جميع الفئات",
        photo: "الصورة",
        brandModel: "الماركة / الموديل",
        actions: "الإجراءات",
        recentCars: "أحدث السيارات المضافة",
        recentLeads: "أحدث الطلبات",
        leadsTitle: "الطلبات الواردة",
        reviewsTitle: "تقييمات العملاء",
        comingSoon: "قريباً.",
        themeLight: "التبديل إلى الوضع الفاتح",
        themeDark: "التبديل إلى الوضع الداكن",
        vehicleBrand: "الماركة", vehicleModel: "الموديل", vehicleYear: "السنة", vehiclePrice: "السعر", vehicleMileage: "المسافة المقطوعة", vehicleFuel: "الوقود", vehicleTransmission: "ناقل الحركة", vehicleHorsepower: "القوة", vehicleCategory: "الفئة", vehicleBody: "نوع الهيكل", vehicleColor: "اللون", vehicleStatus: "الحالة", vehicleDescription: "الوصف", vehicleCreated: "تاريخ الإضافة", vehiclePhotos: "الصور", vehicleEdit: "تعديل السيارة"
    }
};

export function addTranslations(extra){for(const l in extra)translations[l]={...(translations[l]||{}),...extra[l]};}

let currentLang = localStorage.getItem('ag-language') || 'it';

export function t(key, options) {
    const dict = translations[currentLang] || translations['it'];
    let text = dict[key] || key;
    if (options) {
        Object.keys(options).forEach(k => {
            text = text.replace(`{${k}}`, options[k]);
        });
    }
    return text;
}

export async function initI18n() {
    // No external library needed
    applyLanguage(currentLang);
    console.log('[AG i18n] Ready (internal). Language:', currentLang);
}

export function applyLanguage(lang) {
    currentLang = ['it', 'en', 'ar'].includes(lang) ? lang : 'it';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('ag-language', currentLang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const txt = t(key);
        if (txt !== key) {
            if (txt.includes('<')) el.innerHTML = txt;
            else el.textContent = txt;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const txt = t(key);
        if (txt !== key) el.placeholder = txt;
    });

    document.querySelectorAll('[data-i18n-label]').forEach(el => {
        const key = el.getAttribute('data-i18n-label');
        const txt = t(key);
        if (txt !== key) el.setAttribute('aria-label', txt);
    });

    updateThemeLabel();
    console.log('[AG i18n] Applied:', currentLang);
}

export function updateThemeLabel() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const key = currentTheme === 'dark' ? 'themeLight' : 'themeDark';
    const label = t(key);
    btn.setAttribute('aria-label', label);
    btn.title = label;
}