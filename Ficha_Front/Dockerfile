# Stage 1
FROM nginx:alpine

RUN rm -rf /var/cache/apk/*
# && \
    #pip install --upgrade pip && \
    #pip install docker jsondiff && \
   # ansible-galaxy collection install community.docker && \
   # mkdir -vp /usr/ansible

COPY /dist/cw-template-19 /usr/share/nginx/html

#RUN apk add --update ansible python3 py-pip && \
 #   rm -rf /var/cache/apk/* && \
 #   pip install --upgrade pip && \
 #   pip install docker jsondiff && \
 #   ansible-galaxy collection install community.docker && \
 #   mkdir -vp /usr/ansible
