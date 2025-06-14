FROM nginx:1.28.0-alpine

LABEL maintainer="saman-core"

COPY nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY dist/saman-web/browser /usr/share/nginx/html/

# Cambia el propietario de los archivos al usuario nginx
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
