# Dockerfile — devops-wisdom
# Servidor web estático liviano y seguro basado en NGINX Alpine no-root
FROM nginxinc/nginx-unprivileged:1.31-alpine

# Etiqueta de metadatos y trazabilidad
LABEL maintainer="Equipo DevOps <DOY0101>" \
      project="devops-wisdom" \
      description="Generador retro de frases DevOps (Vanilla HTML5/CSS3/JS)"

# Directorio estándar de documentos HTML para nginx-unprivileged
WORKDIR /usr/share/nginx/html

# Copia de archivos estáticos de la aplicación
COPY --chown=nginx:nginx index.html ./
COPY --chown=nginx:nginx style.css ./
COPY --chown=nginx:nginx script.js ./
COPY --chown=nginx:nginx phrases.js ./

# Exposición del puerto no privilegiado por defecto de nginx-unprivileged
EXPOSE 8080

# Verificación de salud (Healthcheck) integrada en el contenedor
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/ || exit 1

# Comando de inicio del servidor en primer plano
CMD ["nginx", "-g", "daemon off;"]
