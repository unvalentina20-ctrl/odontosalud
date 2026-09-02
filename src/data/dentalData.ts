import { Treatment, Doctor, ToothInfo, Review } from '../types';

export const CLINIC_INFO = {
  name: "OdontoSalud Centro Odontológico Especializado",
  shortName: "OdontoSalud",
  tagline: "Odontología integral de alta precisión y cuidado cálido",
  address: "Av. Corrientes 1450, Piso 3, Buenos Aires",
  phone: "+54 11 4822-9900",
  whatsapp: "+54 9 11 5500-8822",
  emergencyPhone: "+54 11 4822-9999",
  email: "contacto@odontosalud.com",
  rating: 4.9,
  totalReviews: 1280,
  yearsExperience: 18,
  patientsTreated: 18500,
  openingHours: {
    weekdays: "08:00 - 20:00 hs",
    saturday: "09:00 - 14:00 hs",
    sunday: "Urgencias telefónicas 24/7",
  },
  insuranceAccepted: [
    "OSDE", "Swiss Medical", "Galeno", "Medifé", "Omint", "Particular / Reembolso"
  ]
};

export const TREATMENTS: Treatment[] = [
  {
    id: "limpieza-profunda",
    title: "Limpieza Ultrasónica y Profilaxis",
    category: "prevencion",
    shortDesc: "Eliminación de placa, sarro profundo y pulido dental suave con ultrasonido de alta precisión.",
    fullDesc: "Tratamiento higiénico preventivo fundamental para mantener encías sanas y prevenir gingivitis y periodontitis. Utiliza tecnología de ultrasonido indolora y aeropulido para remover manchas de café, té o tabaco.",
    estimatedPrice: 35000,
    duration: "45 min",
    recommendedFrequency: "Cada 6 meses",
    iconName: "Sparkles",
    beforeAfterImage: {
      before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
      after: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80"
    },
    benefits: [
      "Elimina el 100% del sarro visible y subgingival",
      "Previene la inflamación de encías y sangrado",
      "Proporciona aliento fresco y pulido libre de manchas",
      "Proceso indoloro con ultrasonido térmico controlado"
    ],
    faqs: [
      { question: "¿Duele la limpieza por ultrasonido?", answer: "No, la tecnología ultrasónica emite vibraciones microscópicas con irrigación de agua templada, haciéndola muy confortable." },
      { question: "¿Con qué frecuencia debo realizármela?", answer: "Se recomienda cada 6 meses, o cada 3 a 4 meses en pacientes con propensión a la placa o encías sensibles." }
    ]
  },
  {
    id: "blanqueamiento-led",
    title: "Blanqueamiento Dental Láser / LED",
    category: "estetica",
    shortDesc: "Aclara hasta 6 tonos el color de tus dientes en una sola sesión de 60 minutos.",
    fullDesc: "Sistema de blanqueamiento foto-activado que combina gel purificado de peróxido de carbamida con luz LED de alta intensidad. Protege el esmalte mientras elimina pigmentaciones profundas.",
    estimatedPrice: 110000,
    duration: "60 min",
    iconName: "Sun",
    beforeAfterImage: {
      before: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80",
      after: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80"
    },
    benefits: [
      "Resultados visibles e inmediatos al salir del consultorio",
      "Fórmula especial desensibilizante para encías sensibles",
      "Involucra protector gingival de gel frío",
      "Incluye kit de mantenimiento domiciliario de regalo"
    ],
    faqs: [
      { question: "¿Daña el esmalte dental?", answer: "Para nada. El gel actúa únicamente en los pigmentos orgánicos internos de la dentina sin alterar la matriz mineral del esmalte." }
    ]
  },
  {
    id: "ortodoncia-invisible",
    title: "Ortodoncia Invisible (Alineadores Transparentes)",
    category: "ortodoncia",
    shortDesc: "Corrige la alineación de tus dientes de forma 100% estética, removible y casi imperceptible.",
    fullDesc: "Placas alineadoras transparentes hechas a medida mediante escáner intraoral 3D iTero. Podrás comer lo que quieras al quitártelos y cepillarte con total comodidad.",
    estimatedPrice: 420000,
    duration: "Tratamiento de 6 a 18 meses",
    iconName: "Smile",
    beforeAfterImage: {
      before: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=600&q=80",
      after: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80"
    },
    benefits: [
      "Placas 100% transparentes e invisibles a simple vista",
      "Removibles para comer, beber y realizar higiene bucal",
      "Sin alambres ni molestias de rozaduras metálicas",
      "Visualización 3D del resultado antes de comenzar"
    ]
  },
  {
    id: "implante-titanio",
    title: "Implantes Dentales de Titanio o Circonio",
    category: "implantes",
    shortDesc: "Reemplazo permanente de pieza faltante con raíz de titanio biocompatible y corona estética.",
    fullDesc: "La solución más segura y duradera ante la pérdida de uno o más dientes. Permite recuperar la fuerza de masticación idéntica a un diente natural con acabado estético perfecto.",
    estimatedPrice: 280000,
    duration: "45 min (cirugía guiada 3D)",
    iconName: "ShieldCheck",
    benefits: [
      "Integración ósea garantizada con biomateriales certificados",
      "Cirugía guiada por computadora mínimamente invasiva",
      "Corona de porcelana Zirconio esculpida digitalmente",
      "Durabilidad superior a 25 años con higiene adecuada"
    ]
  },
  {
    id: "endodoncia-microscopio",
    title: "Endodoncia Mecanizada (Tratamiento de Conducto)",
    category: "endodoncia",
    shortDesc: "Salva tu diente afectado por caries profundas o infección sin sentir dolor.",
    fullDesc: "Limpieza y sellado tridimensional de los conductos radiculares mediante limas rotatorias de níquel-titanio y magnificación óptica. Elimina la infección de raíz preservando el diente original.",
    estimatedPrice: 95000,
    duration: "60-90 min (1 sola sesión en el 90% de casos)",
    iconName: "Activity",
    benefits: [
      "Anestesia computarizada localizada sin dolor",
      "Procedimiento en 1 sola cita en la mayoría de los casos",
      "Evita la extracción y pérdida del diente natural",
      "Localizador apical electrónico de máxima exactitud"
    ]
  },
  {
    id: "odontopediatria",
    title: "Odontopediatría y Muelas de Leche",
    category: "pediatria",
    shortDesc: "Atención dental amigable, divertida y especializada para niños y adolescentes.",
    fullDesc: "Ambiente adaptado para los más pequeños, con técnicas de manejo conductual positivas, selladores de fosas, aplicación de flúor en gel saborizado y prevención de caries temprano.",
    estimatedPrice: 38000,
    duration: "30-40 min",
    iconName: "Heart",
    benefits: [
      "Profesionales formados en psicología infantil",
      "Previene fobias al dentista desde la infancia",
      "Protección con selladores de caries duraderos",
      "Guía de crecimiento maxilar y hábitos de higiene"
    ]
  },
  {
    id: "carillas-esteticas",
    title: "Carillas de Porcelana / Disilicato de Litio",
    category: "estetica",
    shortDesc: "Diseño de sonrisa perfecto: corrige forma, color, tamaño y pequeñas desalineaciones.",
    fullDesc: "Láminas ultra-delgadas de porcelana biocompatible que se adhieren a la cara frontal de los dientes. Resistencia extrema a manchas y aspecto 100% natural.",
    estimatedPrice: 190000,
    duration: "2 sesiones",
    iconName: "Gem",
    benefits: [
      "Sonrisa de revista con translucidez natural",
      "No cambian de color ni se manchan con café ni vino",
      "Mínimo desgaste del diente natural",
      "Garantía estética personalizada por computadora"
    ]
  },
  {
    id: "muelas-del-juicio",
    title: "Cirugía de Muelas del Juicio (Terceros Molares)",
    category: "cirugia",
    shortDesc: "Extracción quirúrgica indolora de muelas retenidas o desviadas.",
    fullDesc: "Intervención realizada por cirujanos maxilofaciales experimentados bajo sedación consciente o anestesia local avanzada. Planificación previa con tomografía CBCT 3D.",
    estimatedPrice: 115000,
    duration: "45 min",
    iconName: "Scissors",
    benefits: [
      "Planificación 3D para preservar nervios maxilares",
      "Recuperación acelerada con protocolo de plasma rico en plaquetas",
      "Monitoreo constante durante el procedimiento",
      "Suturas absorbibles de alta calidad"
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-carlos-mendoza",
    name: "Dr. Carlos Mendoza",
    role: "Director Médico & Cirujano Maxilofacial",
    specialty: "Implantes Dentales y Cirugía Compleja",
    copLicense: "M.N. 34.892",
    experienceYears: 18,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    rating: 4.98,
    reviewCount: 340,
    bio: "Especialista en implantología de carga inmediata y reconstrucción estética. Miembro activo de la Sociedad Argentina de Implantología.",
    availableDays: ["Lunes", "Miércoles", "Viernes"]
  },
  {
    id: "dra-valeria-torres",
    name: "Dra. Valeria Torres",
    role: "Especialista en Ortodoncia & Estética",
    specialty: "Invisalign Master Provider & Carillas",
    copLicense: "M.N. 41.205",
    experienceYears: 12,
    avatar: "https://images.unsplash.com/photo-1594824813566-788092706346?auto=format&fit=crop&w=400&q=80",
    rating: 4.95,
    reviewCount: 290,
    bio: "Apasionada por la creación de sonrisas armónicas y naturales. Más de 800 casos exitosos de ortodoncia invisible Invisalign.",
    availableDays: ["Lunes", "Martes", "Jueves", "Sábado"]
  },
  {
    id: "dr-martin-perez",
    name: "Dr. Martín Pérez",
    role: "Especialista en Endodoncia Microscópica",
    specialty: "Endodoncia y Tratamientos de Conducto",
    copLicense: "M.N. 48.910",
    experienceYears: 10,
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    rating: 4.92,
    reviewCount: 215,
    bio: "Experto en salvamento de piezas dentales comprometidas mediante endodoncia guiada por microscopio quirúrgico de alta magnificación.",
    availableDays: ["Martes", "Miércoles", "Jueves"]
  },
  {
    id: "dra-sofia-gomez",
    name: "Dra. Sofía Gómez",
    role: "Odontopediatra",
    specialty: "Odontología Infantil y Prevención",
    copLicense: "M.N. 52.114",
    experienceYears: 8,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    rating: 4.99,
    reviewCount: 410,
    bio: "Dedicada al cuidado bucal de niños con técnicas lúdicas e indoloras que transforman la visita al dentista en una experiencia alegre.",
    availableDays: ["Lunes", "Martes", "Viernes", "Sábado"]
  }
];

export const TEETH_DATA: ToothInfo[] = [
  // Upper Arch (1-16)
  {
    number: 11,
    name: "Incisivo Central Superior Derecho",
    type: "Incisivo",
    arch: "superior",
    side: "derecho",
    commonIssues: [
      { issue: "Cambio de color / Manchas", description: "Pigmentación superficial o desgaste.", recommendedTreatment: "Blanqueamiento LED o Carilla de Porcelana", estimatedCost: 110000 },
      { issue: "Fractura por golpe", description: "Borde astillado por traumatismo.", recommendedTreatment: "Reconstrucción Estética con Resina 3M", estimatedCost: 45000 }
    ]
  },
  {
    number: 12,
    name: "Incisivo Lateral Superior Derecho",
    type: "Incisivo",
    arch: "superior",
    side: "derecho",
    commonIssues: [
      { issue: "Incisivo Conoide / Desalineado", description: "Tamaño más pequeño o posición inclinada.", recommendedTreatment: "Ortodoncia Invisible o Carilla", estimatedCost: 190000 }
    ]
  },
  {
    number: 13,
    name: "Canino Superior Derecho (Colmillo)",
    type: "Canino",
    arch: "superior",
    side: "derecho",
    commonIssues: [
      { issue: "Desgaste por Bruxismo", description: "Pérdida de la punta por rechinar dientes de noche.", recommendedTreatment: "Placa Miorrelajante y Reconstrucción", estimatedCost: 55000 }
    ]
  },
  {
    number: 14,
    name: "Primer Premolar Superior Derecho",
    type: "Premolar",
    arch: "superior",
    side: "derecho",
    commonIssues: [
      { issue: "Caries Interdental", description: "Caries oculta entre dientes por acumulación de placa.", recommendedTreatment: "Obturación de Resina Estética", estimatedCost: 38000 }
    ]
  },
  {
    number: 16,
    name: "Primer Molar Superior Derecho",
    type: "Molar",
    arch: "superior",
    side: "derecho",
    commonIssues: [
      { issue: "Caries Profunda con Dolor", description: "Inflamación del nervio dental (pulpitis).", recommendedTreatment: "Endodoncia Mecanizada + Corona", estimatedCost: 95000 },
      { issue: "Sarro subgingival", description: "Acumulación en la línea de la encía.", recommendedTreatment: "Limpieza Ultrasónica", estimatedCost: 35000 }
    ]
  },
  {
    number: 18,
    name: "Tercer Molar Superior Derecho (Muela del Juicio)",
    type: "Molar",
    arch: "superior",
    side: "derecho",
    commonIssues: [
      { issue: "Muela Retenida / Inflamación", description: "Falta de espacio para erupcionar correctamente.", recommendedTreatment: "Cirugía de Extracción Maxilofacial", estimatedCost: 115000 }
    ]
  },
  // Upper Left Central
  {
    number: 21,
    name: "Incisivo Central Superior Izquierdo",
    type: "Incisivo",
    arch: "superior",
    side: "izquierdo",
    commonIssues: [
      { issue: "Diastema (Espacio abierto)", description: "Separación visible entre dientes frontales.", recommendedTreatment: "Diseño de Sonrisa / Ortodoncia", estimatedCost: 190000 }
    ]
  },
  {
    number: 26,
    name: "Primer Molar Superior Izquierdo",
    type: "Molar",
    arch: "superior",
    side: "izquierdo",
    commonIssues: [
      { issue: "Pieza ausente", description: "Espacio por pérdida previa de la muela.", recommendedTreatment: "Implante Dental de Titanio", estimatedCost: 280000 }
    ]
  },
  // Lower Arch
  {
    number: 31,
    name: "Incisivo Central Inferior Izquierdo",
    type: "Incisivo",
    arch: "inferior",
    side: "izquierdo",
    commonIssues: [
      { issue: "Apiñamiento inferior", description: "Dientes montados por arcada estrecha.", recommendedTreatment: "Ortodoncia Invisible Invisalign", estimatedCost: 420000 }
    ]
  },
  {
    number: 36,
    name: "Primer Molar Inferior Izquierdo",
    type: "Molar",
    arch: "inferior",
    side: "izquierdo",
    commonIssues: [
      { issue: "Sensibilidad al frío/calor", description: "Cuello del diente expuesto por cepillado fuerte.", recommendedTreatment: "Desensibilización + Sellado", estimatedCost: 28000 }
    ]
  },
  {
    number: 46,
    name: "Primer Molar Inferior Derecho",
    type: "Molar",
    arch: "inferior",
    side: "derecho",
    commonIssues: [
      { issue: "Empaste antiguo desgastado", description: "Amalgama de plata antigua filtrada.", recommendedTreatment: "Incrustación de Cerámica CAD-CAM", estimatedCost: 85000 }
    ]
  },
  {
    number: 48,
    name: "Tercer Molar Inferior Derecho (Muela del Juicio)",
    type: "Molar",
    arch: "inferior",
    side: "derecho",
    commonIssues: [
      { issue: "Pericoronaritis / Dolor de Mandíbula", description: "Infección e hinchazón de encía sobre la muela.", recommendedTreatment: "Limpieza antibiótica urgente / Extracción", estimatedCost: 115000 }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Mariana R.",
    rating: 5,
    date: "Hace 3 días",
    treatmentName: "Ortodoncia Invisible",
    comment: "Increíble la atención de la Dra. Valeria. Tenía mucho miedo a los brackets metálicos tradicionales y con Invisalign nadie notó que los llevaba puestos. En 9 meses mi sonrisa cambió por completo.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "r2",
    author: "Fernando G.",
    rating: 5,
    date: "Hace 1 semana",
    treatmentName: "Implante Dental",
    comment: "Excelente profesionalismo del Dr. Mendoza. Me colocó un implante molar y no sentí absolutamente nada de dolor ni durante la cirugía ni en la recuperación. Calidad humana de 10.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "r3",
    author: "Lucía P.",
    rating: 5,
    date: "Hace 2 semanas",
    treatmentName: "Blanqueamiento LED",
    comment: "Fui por un blanqueamiento antes de mi casamiento. Los dientes me quedaron super blancos, súper brillantes y cero sensibilidad. La instalación del consultorio es impecable.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "r4",
    author: "Gustavo B.",
    rating: 5,
    date: "Hace 1 mes",
    treatmentName: "Odontopediatría",
    comment: "Llevé a mi hijo de 6 años que le tenía pánico al dentista. La Dra. Sofía tiene un carisma mágico, lo hizo jugar mientras lo revisaba y se fue feliz con su regalo. 100% recomendado para familias.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  }
];

export const GENERAL_FAQS = [
  {
    q: "¿Cómo es el proceso de primera consulta?",
    a: "En tu primera visita realizamos un diagnóstico digital 360°, incluyendo revisión clínica visual, fotografías intraorales y radiografía digital panorámica. Te entregamos un plan de tratamiento personalizado con presupuesto transparente sin compromiso."
  },
  {
    q: "¿Ofrecen atención de urgencias dentales el mismo día?",
    a: "Sí. Contamos con turnos prioritarios de guardia diariamente para dolores agudos, infecciones, traumatismos dentales o desprendimiento de restauraciones. Puedes llamarnos o agendar de inmediato."
  },
  {
    q: "¿Qué medios de pago y financiación aceptan?",
    a: "Aceptamos efectivo, transferencias bancarias, tarjetas de débito y crédito. Disponemos de planes de 3, 6 y 12 cuotas sin interés con las principales tarjetas, además de convenios de reembolso con prepagas y obras sociales."
  },
  {
    q: "¿Atienden con Obras Sociales o Prepagas?",
    a: "Trabajamos por sistema de reintegro directo o mediante planes de cobertura autorizados. Emitimos factura médica oficial para presentar en OSDE, Swiss Medical, Galeno, Medifé, Omint y otras prepagas."
  }
];

export const EMERGENCY_GUIDE = [
  {
    title: "Dolor intenso o punzante de muela",
    steps: [
      "Realiza buches con agua tibia salada para limpiar el área.",
      "Aplica una compresa fría sobre la mejilla exterior (nunca hielo directo).",
      "No coloques aspirinas ni analgésicos sobre la encía.",
      "Llama de inmediato a nuestra línea de guardia urgente."
    ]
  },
  {
    title: "Rotura o fractura de un diente",
    steps: [
      "Busca y conserva el fragmento de diente roto si es posible.",
      "Enjuaga tu boca suavemente con agua limpia.",
      "Si hay sangrado, presiona con una gasa estéril limpia.",
      "Acude a la clínica en las primeras 2 horas para intentar la adhesión."
    ]
  },
  {
    title: "Diente desplazado o expulsado por golpe (Avulsión)",
    steps: [
      "Toma el diente por la corona (la parte blanca), nunca por la raíz.",
      "Sumerge el diente en un vaso con leche fresca o solución salina.",
      "No cepilles ni desinfectes la raíz con alcohol.",
      "Dirígete a la clínica de inmediato (reimplante con éxito dentro de los 60 min)."
    ]
  }
];
