
FROM valian/docker-nginx-auto-ssl

COPY template.nginx.conf /etc/nginx/conf.d/nginx.conf

RUN mkdir -p /usr/share/nginx/html/
COPY app/public/app /usr/share/nginx/html/app
