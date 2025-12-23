// قائمة المهن والخدمات مع الأسعار الثلاثية
export const professions = [
    {
        id: 'electricity',
        nameAr: 'كهرباء',
        nameEn: 'Electricity',
        icon: '⚡',
        color: '#FFC107'
    },
    {
        id: 'plumbing',
        nameAr: 'سباكة',
        nameEn: 'Plumbing',
        icon: '🚰',
        color: '#2196F3'
    },
    {
        id: 'ac',
        nameAr: 'تكييف وتبريد',
        nameEn: 'AC & Cooling',
        icon: '❄️',
        color: '#00BCD4'
    },
    {
        id: 'carpentry',
        nameAr: 'نجارة',
        nameEn: 'Carpentry',
        icon: '🪚',
        color: '#795548'
    },
    {
        id: 'painting',
        nameAr: 'دهان',
        nameEn: 'Painting',
        icon: '🎨',
        color: '#E91E63'
    },
    {
        id: 'appliances',
        nameAr: 'أجهزة منزلية',
        nameEn: 'Home Appliances',
        icon: '🔧',
        color: '#9C27B0'
    },
    {
        id: 'tiles',
        nameAr: 'بلاط وسيراميك',
        nameEn: 'Tiles & Ceramics',
        icon: '🔲',
        color: '#607D8B'
    },
    {
        id: 'aluminum',
        nameAr: 'ألمنيوم وحدادة',
        nameEn: 'Aluminum & Metalwork',
        icon: '🔨',
        color: '#9E9E9E'
    },
    {
        id: 'insulation',
        nameAr: 'عوازل',
        nameEn: 'Insulation',
        icon: '🛡️',
        color: '#FF5722'
    },
    {
        id: 'cleaning',
        nameAr: 'تنظيف وتعقيم',
        nameEn: 'Cleaning',
        icon: '🧹',
        color: '#4CAF50'
    },
    {
        id: 'moving',
        nameAr: 'نقل عفش',
        nameEn: 'Moving',
        icon: '📦',
        color: '#FF9800'
    },
    {
        id: 'furniture',
        nameAr: 'تركيب أثاث',
        nameEn: 'Furniture Assembly',
        icon: '🛋️',
        color: '#8BC34A'
    },
    {
        id: 'curtains',
        nameAr: 'ستائر ومفروشات',
        nameEn: 'Curtains',
        icon: '🪟',
        color: '#673AB7'
    },
    {
        id: 'gardening',
        nameAr: 'حدائق وزراعة',
        nameEn: 'Gardening',
        icon: '🌱',
        color: '#8BC34A'
    },
    {
        id: 'pest',
        nameAr: 'مكافحة حشرات',
        nameEn: 'Pest Control',
        icon: '🦟',
        color: '#F44336'
    },
    {
        id: 'cctv',
        nameAr: 'كاميرات مراقبة',
        nameEn: 'CCTV',
        icon: '📹',
        color: '#3F51B5'
    },
    {
        id: 'locks',
        nameAr: 'أقفال ومفاتيح',
        nameEn: 'Locks & Keys',
        icon: '🔑',
        color: '#FF9800'
    },
    {
        id: 'glass',
        nameAr: 'زجاج ومرايا',
        nameEn: 'Glass & Mirrors',
        icon: '🪞',
        color: '#00BCD4'
    },
    {
        id: 'gypsum',
        nameAr: 'جبس وديكور',
        nameEn: 'Gypsum & Decor',
        icon: '✨',
        color: '#CDDC39'
    },
    {
        id: 'satellite',
        nameAr: 'ستلايت ودش',
        nameEn: 'Satellite',
        icon: '📡',
        color: '#009688'
    }
];

// الخدمات لكل مهنة مع الأسعار الثلاثية
export const services = {
    electricity: [
        {
            id: 'elec_1',
            nameAr: 'فحص كهرباء شامل',
            prices: { economy: 80, standard: 120, premium: 180 }
        },
        {
            id: 'elec_2',
            nameAr: 'إصلاح قاطع كهرباء',
            prices: { economy: 50, standard: 80, premium: 120 }
        },
        {
            id: 'elec_3',
            nameAr: 'تركيب لمبات ومفاتيح',
            prices: { economy: 40, standard: 60, premium: 90 }
        },
        {
            id: 'elec_4',
            nameAr: 'تمديد أسلاك كهربائية',
            prices: { economy: 100, standard: 150, premium: 220 }
        },
        {
            id: 'elec_5',
            nameAr: 'تركيب ثريا',
            prices: { economy: 60, standard: 100, premium: 150 }
        },
        {
            id: 'elec_6',
            nameAr: 'إصلاح كهرباء مطبخ',
            prices: { economy: 80, standard: 120, premium: 180 }
        },
        {
            id: 'elec_7',
            nameAr: 'تركيب لوحة كهرباء',
            prices: { economy: 150, standard: 250, premium: 400 }
        },
        {
            id: 'elec_8',
            nameAr: 'إصلاح دائرة كهربائية',
            prices: { economy: 70, standard: 110, premium: 160 }
        },
        {
            id: 'elec_9',
            nameAr: 'تركيب جرس باب',
            prices: { economy: 30, standard: 50, premium: 80 }
        },
        {
            id: 'elec_10',
            nameAr: 'تركيب كشافات خارجية',
            prices: { economy: 80, standard: 130, premium: 200 }
        },
        {
            id: 'elec_11',
            nameAr: 'إصلاح ماس كهربائي',
            prices: { economy: 100, standard: 160, premium: 250 }
        },
        {
            id: 'elec_12',
            nameAr: 'تركيب مروحة سقف',
            prices: { economy: 60, standard: 100, premium: 150 }
        },
        {
            id: 'elec_13',
            nameAr: 'فحص عداد كهرباء',
            prices: { economy: 50, standard: 80, premium: 120 }
        },
        {
            id: 'elec_14',
            nameAr: 'تركيب بريزة أرضية',
            prices: { economy: 40, standard: 70, premium: 110 }
        },
        {
            id: 'elec_15',
            nameAr: 'صيانة دورية',
            prices: { economy: 90, standard: 140, premium: 210 }
        }
    ],

    plumbing: [
        {
            id: 'plumb_1',
            nameAr: 'تسليك مجاري',
            prices: { economy: 80, standard: 120, premium: 180 }
        },
        {
            id: 'plumb_2',
            nameAr: 'إصلاح تسريب حنفية',
            prices: { economy: 50, standard: 80, premium: 120 }
        },
        {
            id: 'plumb_3',
            nameAr: 'تركيب خلاط جديد',
            prices: { economy: 100, standard: 150, premium: 220 }
        },
        {
            id: 'plumb_4',
            nameAr: 'إصلاح سيفون حمام',
            prices: { economy: 60, standard: 90, premium: 140 }
        },
        {
            id: 'plumb_5',
            nameAr: 'تركيب مغسلة',
            prices: { economy: 80, standard: 130, premium: 200 }
        },
        {
            id: 'plumb_6',
            nameAr: 'إصلاح خزان ماء',
            prices: { economy: 100, standard: 160, premium: 250 }
        },
        {
            id: 'plumb_7',
            nameAr: 'تركيب سخان ماء',
            prices: { economy: 120, standard: 180, premium: 280 }
        },
        {
            id: 'plumb_8',
            nameAr: 'فحص تسريب مياه',
            prices: { economy: 70, standard: 110, premium: 170 }
        },
        {
            id: 'plumb_9',
            nameAr: 'تركيب فلتر ماء',
            prices: { economy: 90, standard: 140, premium: 210 }
        },
        {
            id: 'plumb_10',
            nameAr: 'إصلاح مضخة ماء',
            prices: { economy: 100, standard: 150, premium: 230 }
        },
        {
            id: 'plumb_11',
            nameAr: 'تركيب شطاف',
            prices: { economy: 40, standard: 70, premium: 110 }
        },
        {
            id: 'plumb_12',
            nameAr: 'تنظيف بيارة',
            prices: { economy: 150, standard: 250, premium: 400 }
        },
        {
            id: 'plumb_13',
            nameAr: 'تركيب مرحاض',
            prices: { economy: 100, standard: 160, premium: 250 }
        },
        {
            id: 'plumb_14',
            nameAr: 'إصلاح صمام ماء',
            prices: { economy: 50, standard: 80, premium: 130 }
        },
        {
            id: 'plumb_15',
            nameAr: 'تمديد مواسير',
            prices: { economy: 120, standard: 200, premium: 320 }
        }
    ],

    ac: [
        {
            id: 'ac_1',
            nameAr: 'صيانة مكيف سبليت',
            prices: { economy: 80, standard: 120, premium: 180 }
        },
        {
            id: 'ac_2',
            nameAr: 'تعبئة فريون',
            prices: { economy: 100, standard: 150, premium: 230 }
        },
        {
            id: 'ac_3',
            nameAr: 'تنظيف مكيف شامل',
            prices: { economy: 60, standard: 100, premium: 150 }
        },
        {
            id: 'ac_4',
            nameAr: 'إصلاح تسريب مكيف',
            prices: { economy: 90, standard: 140, premium: 210 }
        },
        {
            id: 'ac_5',
            nameAr: 'تركيب مكيف جديد',
            prices: { economy: 150, standard: 250, premium: 400 }
        },
        {
            id: 'ac_6',
            nameAr: 'فك ونقل مكيف',
            prices: { economy: 100, standard: 160, premium: 250 }
        },
        {
            id: 'ac_7',
            nameAr: 'إصلاح ريموت مكيف',
            prices: { economy: 40, standard: 70, premium: 110 }
        },
        {
            id: 'ac_8',
            nameAr: 'تنظيف فلاتر',
            prices: { economy: 40, standard: 60, premium: 90 }
        },
        {
            id: 'ac_9',
            nameAr: 'فحص شامل للمكيف',
            prices: { economy: 70, standard: 110, premium: 170 }
        },
        {
            id: 'ac_10',
            nameAr: 'إصلاح كمبروسر',
            prices: { economy: 150, standard: 250, premium: 400 }
        },
        {
            id: 'ac_11',
            nameAr: 'تركيب مكيف شباك',
            prices: { economy: 80, standard: 130, premium: 200 }
        },
        {
            id: 'ac_12',
            nameAr: 'صيانة مكيف مركزي',
            prices: { economy: 200, standard: 350, premium: 550 }
        },
        {
            id: 'ac_13',
            nameAr: 'إصلاح مروحة داخلية',
            prices: { economy: 80, standard: 130, premium: 200 }
        },
        {
            id: 'ac_14',
            nameAr: 'تبديل ثرموستات',
            prices: { economy: 60, standard: 100, premium: 150 }
        },
        {
            id: 'ac_15',
            nameAr: 'عقد صيانة سنوي',
            prices: { economy: 400, standard: 650, premium: 1000 }
        }
    ],

    // سأضيف باقي المهن بنفس الطريقة...
    carpentry: [
        {
            id: 'carp_1',
            nameAr: 'تركيب باب خشبي',
            prices: { economy: 100, standard: 160, premium: 250 }
        },
        {
            id: 'carp_2',
            nameAr: 'إصلاح خزانة ملابس',
            prices: { economy: 80, standard: 130, premium: 200 }
        },
        {
            id: 'carp_3',
            nameAr: 'تركيب رفوف خشبية',
            prices: { economy: 60, standard: 100, premium: 150 }
        },
        {
            id: 'carp_4',
            nameAr: 'صنع مكتبة خشبية',
            prices: { economy: 200, standard: 350, premium: 550 }
        },
        {
            id: 'carp_5',
            nameAr: 'إصلاح باب معطل',
            prices: { economy: 70, standard: 110, premium: 170 }
        },
        {
            id: 'carp_6',
            nameAr: 'تركيب أرضية باركيه',
            prices: { economy: 150, standard: 250, premium: 400 }
        },
        {
            id: 'carp_7',
            nameAr: 'صنع طاولة خشبية',
            prices: { economy: 180, standard: 300, premium: 480 }
        },
        {
            id: 'carp_8',
            nameAr: 'تركيب كورنيش خشبي',
            prices: { economy: 80, standard: 130, premium: 200 }
        },
        {
            id: 'carp_9',
            nameAr: 'إصلاح درج خشبي',
            prices: { economy: 120, standard: 200, premium: 320 }
        },
        {
            id: 'carp_10',
            nameAr: 'تركيب مطبخ خشبي',
            prices: { economy: 300, standard: 500, premium: 800 }
        },
        {
            id: 'carp_11',
            nameAr: 'صنع سرير خشبي',
            prices: { economy: 250, standard: 400, premium: 650 }
        },
        {
            id: 'carp_12',
            nameAr: 'تركيب نافذة خشبية',
            prices: { economy: 90, standard: 150, premium: 240 }
        },
        {
            id: 'carp_13',
            nameAr: 'إصلاح كرسي',
            prices: { economy: 50, standard: 80, premium: 130 }
        },
        {
            id: 'carp_14',
            nameAr: 'تركيب بانوهات خشبية',
            prices: { economy: 150, standard: 250, premium: 400 }
        },
        {
            id: 'carp_15',
            nameAr: 'صيانة دورية للأثاث',
            prices: { economy: 100, standard: 160, premium: 250 }
        }
    ],

    painting: [
        {
            id: 'paint_1',
            nameAr: 'دهان غرفة كاملة',
            prices: { economy: 200, standard: 350, premium: 550 }
        },
        {
            id: 'paint_2',
            nameAr: 'دهان شقة كاملة',
            prices: { economy: 800, standard: 1300, premium: 2000 }
        },
        {
            id: 'paint_3',
            nameAr: 'دهان واجهة خارجية',
            prices: { economy: 300, standard: 500, premium: 800 }
        },
        {
            id: 'paint_4',
            nameAr: 'إصلاح تشققات جدران',
            prices: { economy: 80, standard: 130, premium: 200 }
        },
        {
            id: 'paint_5',
            nameAr: 'دهان باب وشباك',
            prices: { economy: 60, standard: 100, premium: 150 }
        },
        {
            id: 'paint_6',
            nameAr: 'ورق جدران',
            prices: { economy: 150, standard: 250, premium: 400 }
        },
        {
            id: 'paint_7',
            nameAr: 'دهان سقف',
            prices: { economy: 120, standard: 200, premium: 320 }
        },
        {
            id: 'paint_8',
            nameAr: 'دهان مطبخ',
            prices: { economy: 150, standard: 250, premium: 400 }
        },
        {
            id: 'paint_9',
            nameAr: 'دهان حمام',
            prices: { economy: 100, standard: 160, premium: 250 }
        },
        {
            id: 'paint_10',
            nameAr: 'إزالة دهان قديم',
            prices: { economy: 80, standard: 130, premium: 200 }
        },
        {
            id: 'paint_11',
            nameAr: 'دهان ديكوري',
            prices: { economy: 200, standard: 350, premium: 550 }
        },
        {
            id: 'paint_12',
            nameAr: 'عزل رطوبة ودهان',
            prices: { economy: 150, standard: 250, premium: 400 }
        },
        {
            id: 'paint_13',
            nameAr: 'دهان حديد وألمنيوم',
            prices: { economy: 80, standard: 130, premium: 200 }
        },
        {
            id: 'paint_14',
            nameAr: 'دهان أثاث خشبي',
            prices: { economy: 100, standard: 160, premium: 250 }
        },
        {
            id: 'paint_15',
            nameAr: 'تجديد دهان كامل',
            prices: { economy: 600, standard: 1000, premium: 1600 }
        }
    ]
};

// دالة للحصول على خدمات مهنة معينة
export const getServicesByProfession = (professionId) => {
    return services[professionId] || [];
};

// دالة للحصول على معلومات مهنة
export const getProfessionById = (professionId) => {
    return professions.find(p => p.id === professionId);
};

// دالة للحصول على خدمة محددة
export const getServiceById = (professionId, serviceId) => {
    const professionServices = services[professionId] || [];
    return professionServices.find(s => s.id === serviceId);
};

// أسماء مستويات الأسعار
export const priceTiers = {
    economy: {
        id: 'economy',
        nameAr: 'اقتصادي',
        icon: '💰',
        description: 'السعر الأقل - عمال مبتدئين'
    },
    standard: {
        id: 'standard',
        nameAr: 'وسط',
        icon: '💰💰',
        description: 'السعر المتوسط - عمال ذوي خبرة'
    },
    premium: {
        id: 'premium',
        nameAr: 'ممتاز',
        icon: '💰💰💰',
        description: 'السعر الأعلى - عمال محترفين'
    }
};
