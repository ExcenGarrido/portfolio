export type Project = {
  title: string; kicker: string; summary: string; description: string;
  role: string; stack: string[]; outcomes: string[]; repoUrl?: string;
  demoUrl?: string; visibility: 'público' | 'privado'; editableNotes?: string;
};

export const projects: Project[] = [
  {
    title: 'Fichero Online', kicker: 'Control de asistencia',
    summary: 'Sistema web para organizar asistencia y fichajes mediante códigos QR.',
    description: 'Una experiencia completa con landing pública, panel autenticado y herramientas para administrar equipos, sucursales y turnos.',
    role: 'Desarrollo full-stack', stack: ['PHP 8.2+', 'MySQL / MariaDB', 'JavaScript', 'Bootstrap', 'Dompdf', 'QR Code'],
    outcomes: ['Fichaje manual y por QR', 'Roles, sectores y sucursales', 'Reportes exportables a PDF', 'Validación de ubicación'],
    repoUrl: 'https://github.com/ExcenGarrido/Fichero-Online', visibility: 'público'
  },
  {
    title: 'Pipeline de Documentos IA', kicker: 'Proyecto privado · plataforma de análisis',
    summary: 'Pipeline multi-agente para convertir documentos heterogéneos en información accionable.',
    description: 'Backend que ingiere PPTX, PDF y XLSX, extrae contenido con LLMs y coordina agentes para limpieza, análisis de mercado y análisis de marca.',
    role: 'Backend & AI engineering', stack: ['Python 3.13', 'FastAPI', 'Groq gpt-oss-120b', 'PostgreSQL / Neon', 'JSONB', 'Docker'],
    outcomes: ['Prompts editables en Markdown', 'Persistencia estructurada en JSONB', 'API REST con Uvicorn', 'Procesamiento de múltiples formatos'],
    repoUrl: 'https://github.com/ExcenGarrido/pipeline-docs-ia', visibility: 'privado',
    editableNotes: 'Descripción basada en datos confirmados por el usuario; ajustar resultados o demo si se publica información adicional.'
  },
  {
    title: 'Procesador de Facturas IA', kicker: 'Automatización contable',
    summary: 'API y pipeline end-to-end para extraer, validar, persistir y consultar facturas.',
    description: 'Servicio que transforma PDFs y texto no estructurado en datos contables JSON validados, con persistencia SQL y automatizaciones operativas.',
    role: 'Backend, datos & cloud', stack: ['Python', 'FastAPI', 'Groq', 'PostgreSQL', 'SQLAlchemy', 'PyPDF', 'n8n', 'Azure App Service'],
    outcomes: ['Extracción de proveedor, CUIT, fecha y totales', 'Procesamiento por lotes', 'Endpoints OpenAPI / Swagger', 'CI/CD con GitHub Actions'],
    repoUrl: 'https://github.com/ExcenGarrido/procesador-facturas-ia',
    demoUrl: 'https://procesador-facturas-a8aag2exdzgghgb9.brazilsouth-01.azurewebsites.net/docs',
    visibility: 'público'
  }
];
