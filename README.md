Asignatura: Ingeniería DevOps (DOY0101)
Institución: Duoc UC

---

🚀 Descripción del Proyecto
Este proyecto implementa un pipeline de Integración y Entrega Continua (CI/CD) completamente automatizado en GitHub Actions para el microservicio web.}
---
🛠️ Estructura y Componentes Integrados
Contenerización (IE1):
Uso de Dockerfile optimizado basado en la imagen ligera nginx:alpine.
Pruebas Automatizadas (IE2):
Suite de pruebas unitarias implementada en test.js ejecutada en la etapa de CI mediante npm test.
Seguridad y Gobernanza (IE3):
Integración con Snyk y Dependabot para análisis estático de código y alerta/bloqueo ante vulnerabilidades críticas.

Despliegue y Trazabilidad (IE4):
Despliegue simulado automatizado a través de workflows de GitHub Actions activados por triggers de push y pull_request a las ramas base (Principal y Desarrollo).

Orquestación y Escalabilidad (IE5):
Definición de servicios mediante docker-compose.yml especificando límites de uso de memoria (256M) y CPU (0.50).
🔀 Estrategia de Ramificación y Trazabilidad
Principal: Rama de producción que contiene el código estable.
Desarrollo: Rama de integración continua.
feature/* / Feature/*: Ramas destinadas al desarrollo de funcionalidades.
hotfix/*: Ramas para corrección rápida de errores.
