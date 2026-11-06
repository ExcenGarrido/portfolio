export type ProjectMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster?: string; alt: string }
  | { type: 'youtube'; src: string; title: string };

export type ProjectSection =
  | { id: string; title: string; paragraphs?: string[]; items?: string[]; subsections?: { title: string; paragraphs?: string[]; items?: string[] }[] };

export type ProjectButton = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
};

export type ProjectDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  data: { label: 'TIPO' | 'ROL' | 'PERÍODO' | 'ESTADO'; value: string }[];
  metrics: { value: string; description: string }[];
  media?: ProjectMedia;
  mediaNote?: string;
  stack: string[];
  sections: ProjectSection[];
  buttons: ProjectButton[];
  privateNote?: string;
  nextCase?: { title: string; description?: string; slug: string };
};

// TODO: completar el período, el contexto ampliado y cómo se trabajó.
export const emptyProject: ProjectDetail = {
  slug: 'ejemplo',
  eyebrow: '',
  title: '',
  subtitle: '',
  description: '',
  data: [],
  metrics: [],
  media: undefined,
  stack: [],
  sections: [],
  buttons: [],
  nextCase: undefined,
};

export const projectDetails: Record<string, ProjectDetail> = {};

export const projectDetailsLoaded: Record<string, ProjectDetail> = {
  'automatizacion-facturas-ia': {
    slug: 'automatizacion-facturas-ia',
    eyebrow: 'CASO DE ESTUDIO · PROYECTO PROPIO · IA Y AUTOMATIZACIÓN',
    title: 'Automatización de facturas con IA',
    subtitle: 'Pipeline de extremo a extremo que convierte facturas en PDF y texto en datos estructurados, guardados en PostgreSQL y expuestos en una API REST desplegada en Azure.',
    description: 'Pipeline en Python con FastAPI y LLMs (Groq) que extrae datos de facturas PDF y TXT, los guarda en PostgreSQL y los expone en una API en Azure con CI/CD.',
    data: [
      { label: 'TIPO', value: 'Proyecto propio' },
      { label: 'ROL', value: 'Diseño y desarrollo' },
      // TODO: completar con el período real.
      { label: 'ESTADO', value: 'En producción' },
    ],
    metrics: [
      { value: '5 campos', description: 'extraídos por factura: proveedor, fecha, CUIT, número y total' },
      { value: 'PDF + TXT', description: 'formatos de entrada, también por lotes' },
    ],
    media: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/z05NLlzHVxs',
      title: 'Video de presentación de la automatización de facturas con IA',
    },
    mediaNote: 'Video de presentación del proyecto.',
    stack: ['Python', 'FastAPI', 'Uvicorn', 'Gunicorn', 'Pydantic', 'Groq SDK', 'PostgreSQL (Neon)', 'SQLAlchemy', 'Psycopg2', 'PyPDF', 'n8n', 'Azure App Service', 'GitHub Actions'],
    sections: [
      {
        id: 'contexto',
        title: 'Contexto',
        paragraphs: [
          'Las facturas en PDF y texto son documentos no estructurados. Este sistema automatiza de extremo a extremo la <strong>extracción, validación, persistencia y exposición</strong> de sus datos contables.',
          'El resultado se expone como una API REST documentada con Swagger, lista para integrarse con sistemas externos y con flujos de automatización en n8n.',
        ],
      },
      {
        id: 'lo-que-construi',
        title: 'Lo que construí',
        items: [
          '<strong>Extracción con IA:</strong> usa la API de Groq con el modelo <code>gpt-oss-120b</code> para estructurar proveedor, fecha, CUIT, número y total en JSON validado, a partir de PDF y TXT.',
          'API REST: FastAPI con documentación OpenAPI (Swagger) pública. Endpoints para consultar y filtrar facturas e integrarlas con otros sistemas.',
          'Persistencia: PostgreSQL en Neon con SQLAlchemy y psycopg2 (con SSL), con inserción transaccional y consultas parametrizadas.',
          'Procesamiento por lotes: scripts para ingestar directorios completos de PDF y TXT (pypdf, pathlib), con manejo de excepciones y transacciones por archivo.',
          'Automatización: un flujo de n8n consume la API (HTTP Request), separa la respuesta en facturas individuales (Split Out) y aplica una regla condicional sobre los montos (If). El JSON del flujo está en el repositorio.',
          'Despliegue: Azure App Service (Linux) con integración continua en GitHub Actions.',
        ],
      },
      {
        id: 'como-lo-trabaje',
        title: 'Cómo lo trabajé',
        subsections: [
          {
            title: 'Un problema real: conexiones que se caían',
            paragraphs: ['Neon es PostgreSQL serverless y suspende las conexiones inactivas. Durante el procesamiento de lotes de PDFs y en consultas esporádicas a la API, eso provocaba errores <code>psycopg2.OperationalError: SSL connection has been closed unexpectedly</code> y respuestas HTTP 500 en producción.'],
          },
          {
            title: 'Cómo lo resolví',
            items: [
              '<strong>En la API:</strong> configuré el motor de SQLAlchemy con <code>pool_pre_ping=True</code>, que valida la conexión antes de cada sentencia y reconecta de forma transparente, y <code>pool_recycle=300</code>.',
              '<strong>En el script de lotes:</strong> dejé de mantener una conexión abierta durante la lectura de archivos. Ahora abre una conexión nueva por cada archivo y la cierra en un bloque <code>finally</code>, así un archivo con problemas no frena el resto del lote.',
            ],
          },
          {
            title: 'Cómo verifiqué que funciona',
            items: [
              'Pruebas de integración locales con lotes mixtos de PDFs (válidos, vacíos y con anomalías) para comprobar que los errores quedan aislados por archivo (<code>try/except</code> con rollback).',
              'Validé los endpoints en Swagger UI y confirmé cada despliegue en Azure en los logs de GitHub Actions.',
            ],
          },
          // TODO: mostrar o borrar según el estado de la restricción de unicidad
          // {
          //   title: 'Próximo paso',
          //   paragraphs: ['La tabla todavía no tiene restricción de unicidad. El siguiente paso es un índice único por CUIT y número de factura para evitar ingestas duplicadas en procesamientos masivos.'],
          // },
        ],
      },
    ],
    buttons: [
      { label: 'Ver Swagger en vivo', href: 'https://procesador-facturas-a8aag2exdzgghgb9.brazilsouth-01.azurewebsites.net/docs', variant: 'primary' },
      { label: 'Ver repositorio', href: 'https://github.com/ExcenGarrido/procesador-facturas-ia', variant: 'secondary' },
    ],
    nextCase: { title: 'Procesamiento inteligente de documentos', slug: 'procesamiento-documentos-ia' },
  },
  'procesamiento-documentos-ia': {
    slug: 'procesamiento-documentos-ia',
    eyebrow: 'CASO DE ESTUDIO · PROYECTO PROPIO · IA Y AUTOMATIZACIÓN',
    title: 'Procesamiento inteligente de documentos',
    subtitle: 'Sistema backend que convierte documentos PPTX, PDF y XLSX desordenados en conocimiento estructurado, con agentes de IA encadenados y PostgreSQL.',
    description: 'Backend en Python con FastAPI y Groq que ingiere PPTX, PDF y XLSX, los analiza con agentes de IA en cadena y guarda el resultado estructurado en PostgreSQL (JSONB).',
    data: [
      { label: 'TIPO', value: 'Proyecto propio' },
      { label: 'ROL', value: 'Diseño y desarrollo' },
      { label: 'PERÍODO', value: 'Oct – Nov 2026' },
      { label: 'ESTADO', value: 'Demo en Azure' },
    ],
    metrics: [
      { value: '< 0,10 USD', description: 'por documento con 3 agentes en cadena (unos 0,02 USD en un PDF de 13 páginas, 39 llamadas)' },
      { value: '3 formatos', description: 'PPTX, PDF y XLSX' },
    ],
    media: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/03uyvrJcrjI',
      title: 'Video de presentación del procesamiento inteligente de documentos',
    },
    mediaNote: 'Video de presentación del proyecto.',
    stack: ['Python 3.13', 'FastAPI', 'Uvicorn', 'Groq API', 'PostgreSQL (Neon)', 'psycopg2', 'python-pptx', 'pypdf', 'pandas', 'Docker', 'n8n'],
    sections: [
      {
        id: 'contexto',
        title: 'Contexto',
        paragraphs: [
          'Gran parte de la inteligencia de negocio está atrapada en PPTX, PDFs y Excels desordenados que no se pueden consultar. El problema lo vi hablando con gente de consultoría.',
          'Meter esos archivos en un chat de IA y pedir un resumen no escala: primero hay que <strong>limpiar y estructurar</strong> la información. Este sistema lo hace de extremo a extremo: ingiere el archivo, lo analiza con agentes de IA y guarda el resultado en la base de datos.',
        ],
      },
      {
        id: 'lo-que-construi',
        title: 'Lo que construí',
        subsections: [
          {
            title: 'El flujo, paso a paso',
            items: [
              '<strong>Subida:</strong> el usuario sube un archivo a la API REST.',
              '<strong>Enrutado:</strong> el sistema lo deriva al extractor de su formato: <code>python-pptx</code> para PowerPoint, <code>pypdf</code> para PDF y <code>pandas</code> para Excel.',
              '<strong>Análisis:</strong> la IA limpia el texto y extrae insights en cadena: limpieza genérica, Agente Analista de Mercado y Agente Analista de Marca, con Groq (<code>gpt-oss-120b</code>).',
              '<strong>Persistencia:</strong> el resultado, en JSON estructurado, se guarda en PostgreSQL (Neon) con el tipo <code>JSONB</code>.',
              '<strong>Respuesta:</strong> la API devuelve el JSON limpio.',
            ],
          },
          {
            title: 'Decisiones de diseño',
            items: [
              '<strong>Tres agentes en cadena:</strong> separé la tarea en un limpiador/extractor (JSON base), un Agente de Mercado (tendencias y competidores) y un Agente de Marca (posicionamiento). Cada uno recibe el contexto del anterior. Al probar un único prompt, el modelo tendía a ignorar partes de la tarea; con responsabilidades separadas, cada resultado es acotado y verificable.',
              '<strong>Prompts editables:</strong> viven en archivos Markdown (<code>/prompts</code>), separados del código. Un consultor sin conocimientos de Python puede ajustar las instrucciones de la IA sin tocar el código fuente.',
              '<strong>JSONB en PostgreSQL:</strong> la IA puede devolver propiedades nuevas con el tiempo; con <code>JSONB</code> no hace falta migrar el esquema, se conserva el JSON completo para auditoría y se puede consultar dentro de él (por ejemplo, todos los análisis de un cliente).',
              '<strong>Extractores modulares y API validada:</strong> un extractor por formato, y una API REST con FastAPI que valida los archivos y maneja los errores HTTP.',
            ],
          },
          {
            title: 'Qué queda guardado',
            paragraphs: ['Por cada fragmento del documento, el JSON incluye tema, cliente, sentimiento, análisis de mercado (competidores, tema y tamaño de mercado), insight principal y análisis de marca (valores y percepción).'],
          },
          {
            title: 'Automatización y despliegue',
            items: [
              '<strong>n8n:</strong> orquesta y visualiza. Consume los datos de PostgreSQL y arma tableros con insights (tendencias, competidores, tamaño de mercado) para los consultores.',
              '<strong>Docker y Azure:</strong> la aplicación está contenerizada y desplegada como demo en Azure App Service, con la base de datos en Neon (PostgreSQL serverless).',
            ],
          },
        ],
      },
      {
        id: 'como-lo-trabaje',
        title: 'Cómo lo trabajé',
        subsections: [
          {
            title: 'Un problema real: procesar archivos grandes en la nube',
            paragraphs: ['Al desplegar la API en Azure App Service (plan de 1 GB de RAM), las presentaciones largas fallaban con errores <code>504 Gateway Timeout</code> y <code>502 Bad Gateway</code>. Un PPTX de 29 diapositivas hace 3 llamadas a la IA por cada una, y el proceso superaba el tiempo máximo de espera de Azure (cerca de 4 minutos por petición) y la memoria disponible.'],
          },
          {
            title: 'Qué hice',
            items: [
              '<strong>Ajusté el arranque de Gunicorn:</strong> <code>-w 1 --timeout 1200</code>. Un solo worker evita agotar la RAM, y el timeout alto evita que Gunicorn mate el proceso. El límite de petición de la plataforma sigue vigente.',
              '<strong>Diseñé la solución para producción:</strong> para archivos grandes, el camino es el procesamiento asíncrono (webhooks o colas como Celery), de modo que la petición HTTP no quede bloqueada. Es el próximo paso y todavía no está implementado.',
              '<strong>Hoy:</strong> los archivos pesados los proceso en local con el contenedor Docker y los livianos en la nube.',
            ],
          },
          {
            title: 'Cómo verifiqué que funciona',
            items: [
              'Probé con tres documentos: un PDF real de 13 páginas (un white paper de transformación digital), una presentación académica de 29 diapositivas con tablas y gráficos, y un Excel financiero de prueba.',
              'Comprobé que el modelo no inventa datos: cuando el documento no menciona competidores, devuelve <code>No especificado</code> en lugar de suponerlos. Lo revisé en el JSON final y en la base de datos.',
              'Verifiqué que se extraen las notas del orador de las presentaciones y que el flujo de n8n, conectado a PostgreSQL, muestra la tabla sin errores.',
            ],
          },
          {
            title: 'Costo',
            paragraphs: ['Según el panel de consumo de Groq, procesar un PDF de 13 páginas con 3 agentes (39 llamadas) costó unos 0,02 USD. Por eso estimo que un documento completo con la cadena de 3 agentes cuesta menos de 0,10 USD.'],
          },
          {
            title: 'Uso de asistentes de IA',
            paragraphs: ['Usé Claude y GitHub Copilot como apoyo para acelerar el código base, depurar Docker en Windows (conflicto de versiones de Python) y optimizar expresiones en n8n. La arquitectura, el diseño del pipeline, la estrategia de prompts y la resolución de los problemas de infraestructura las diseñé y ejecuté yo.'],
          },
        ],
      },
    ],
    buttons: [
      { label: 'Ver publicación', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7523731757972582400/', variant: 'primary' },
    ],
    privateNote: 'El código está en un repositorio privado.',
    nextCase: { title: 'Fichero Online', slug: 'fichero-online' },
  },
  'fichero-online': {
    slug: 'fichero-online',
    eyebrow: 'CASO DE ESTUDIO · PROYECTO ACADÉMICO EN EQUIPO · APLICACIÓN WEB',
    title: 'Fichero Online',
    subtitle: 'Sistema web de control de asistencia con fichaje por QR, validación de ubicación y dashboard en vivo. Proyecto de la Práctica Profesional Supervisada (UTN FRH, 2025), desarrollado por un equipo de 5 personas con Scrum.',
    description: 'Fichero Online: sistema web de asistencia con fichaje por QR y geolocalización, desarrollado en equipo (Scrum) en la UTN FRH. PHP, MySQL y JavaScript.',
    data: [
      { label: 'TIPO', value: 'Proyecto académico en equipo' },
      { label: 'ROL', value: 'Business Analyst · roles de usuario · equipo de 5 (Scrum)' },
      { label: 'PERÍODO', value: 'Sep – Nov 2025' },
      { label: 'ESTADO', value: 'Demo con datos ficticios' },
    ],
    metrics: [
      { value: '8 de 10', description: 'historias de usuario del backlog completadas' },
      { value: '14 permisos', description: 'para 3 roles con acceso diferenciado' },
    ],
    media: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/Iy0kJHaUPGI',
      title: 'Video de presentación de Fichero Online',
    },
    mediaNote: 'Video de presentación de Fichero Online.',
    stack: ['PHP 8.2+', 'MySQL/MariaDB', 'PDO', 'JavaScript vanilla', 'Bootstrap', 'Chart.js', 'Composer', 'Dompdf', 'Endroid QR Code'],
    sections: [
      {
        id: 'contexto',
        title: 'Contexto',
        paragraphs: [
          'En comercios, oficinas, talleres, obras y pymes, el control de asistencia todavía se hace con planillas, papel o relojes fichadores. Esos métodos generan errores, fraudes y mucho tiempo administrativo perdido.',
          'Fichero Online propone un control de asistencia web, con fichaje por <strong>código QR</strong> y <strong>validación de ubicación</strong>, pensado para organizaciones con varias sucursales. Fue el proyecto de la Práctica Profesional Supervisada de la UTN FRH (2025): un equipo de 5 personas, con roles de Scrum y 8 semanas de trabajo.',
        ],
      },
      {
        id: 'lo-que-construi',
        title: 'Lo que construimos',
        subsections: [
          {
            title: 'Qué hace el sistema',
            items: [
              '<strong>Acceso por roles:</strong> autenticación con sesiones PHP y tres roles (Administrador, RRHH y Empleado) con permisos diferenciados.',
              '<strong>Fichaje con QR y ubicación:</strong> el empleado escanea el QR de su sucursal y el sistema valida su ubicación contra las coordenadas de la sucursal antes de registrar el ingreso o el egreso.',
              '<strong>Dashboard de asistencia diaria:</strong> indicadores, gráficos, movimientos recientes y detalle del día, con filtros por sucursal, turno y sector, y acciones manuales (fichada manual, justificación y observaciones).',
              '<strong>Administración:</strong> empleados, usuarios, roles, sectores, puestos, turnos y sucursales, con QR por sucursal.',
              '<strong>Reportes:</strong> previsualización con filtros y exportación a PDF, más tendencias trimestrales de presencialidad, horas extra y llegadas tarde.',
              '<strong>Landing pública</strong> con formulario de contacto y modo claro y oscuro.',
            ],
          },
          {
            title: 'Arquitectura',
            paragraphs: ['Aplicación en capas: vistas en PHP y HTML, lógica de interfaz en servicios de JavaScript, un router (<code>api/index.php</code>), controladores, repositorios y base de datos MySQL.'],
          },
        ],
      },
      {
        id: 'como-lo-trabajamos',
        title: 'Cómo trabajamos',
        subsections: [
          {
            title: 'Mi aporte',
            items: [
              '<strong>Análisis y documentación:</strong> escribí la documentación funcional del proyecto: historias de usuario con criterios de aceptación, modelo de negocio (Business Model Canvas), análisis de competidores, prototipos de las pantallas y el plan de pruebas.',
              '<strong>Desarrollo:</strong> programé la gestión de roles de usuario.',
              '<strong>Versión de demostración:</strong> preparé la versión para portafolio: README, landing pública y datos ficticios de prueba.',
              '<strong>Video del producto:</strong> realicé el video publicitario de Fichero Online: <a href="https://www.youtube.com/watch?v=Iy0kJHaUPGI" target="_blank" rel="noopener noreferrer">verlo en YouTube</a>.',
            ],
          },
          {
            title: 'Proceso',
            items: [
              'Scrum durante 8 semanas, con roles definidos (Scrum Master, Product Owner, Business Analyst y Dev Team) y tres retrospectivas: septiembre, octubre y noviembre de 2025.',
              'Backlog de historias de usuario con criterios de aceptación en formato Dado / Cuando / Entonces. Quedaron completadas 8 de las 10 historias.',
              'Seguimiento de fallas en Jira y plan de pruebas con escenarios como fichar fuera de zona o exportar reportes.',
            ],
          },
          {
            title: 'Problemas que aparecieron y qué cambiamos',
            items: [
              '<strong>Entorno local:</strong> hubo demoras para configurar XAMPP y la conexión a la base de datos. Unificamos todo en un único script SQL y un README con los pasos de instalación, así el equipo partía de la misma base.',
              '<strong>Integración backend y frontend:</strong> el frontend esperaba JSON en un formato distinto del que enviaba el backend. Pasamos a definir el contrato de cada endpoint (qué envía y qué recibe) antes de programar la interfaz.',
              '<strong>Documentación:</strong> dejamos el manual de usuario y los anexos para el final y hubo una corrida de último momento. Para el próximo proyecto, los documentamos con una semana de antelación.',
            ],
          },
        ],
      },
    ],
    // TODO: agregar URL del repositorio.
    buttons: [
      { label: 'Ver video del producto', href: 'https://www.youtube.com/watch?v=Iy0kJHaUPGI', variant: 'secondary' },
    ],
    nextCase: { title: 'Automatización de facturas con IA', slug: 'automatizacion-facturas-ia' },
  },
};

Object.assign(projectDetails, projectDetailsLoaded);

export const projectSlugs = [
  'automatizacion-facturas-ia',
  'procesamiento-documentos-ia',
  'fichero-online',
] as const;
