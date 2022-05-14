FROM node

# RUN apk add --update curl && \
#   curl -Lo /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
#   curl -Lo glibc.apk "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk" && \
#   curl -Lo glibc-bin.apk "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk" && \
#   apk add glibc-bin.apk glibc.apk && \
#   /usr/glibc-compat/sbin/ldconfig /lib /usr/glibc-compat/lib && \
#   echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf && \
#   apk del curl && \
#   rm -rf glibc.apk glibc-bin.apk /var/cache/apk/*
  
WORKDIR /usr/app

#Instalando as dependências
COPY package*.json ./
RUN npm install

#Copiando outros arquivos
COPY . .

EXPOSE 3000
RUN npx prisma generate
CMD ["npm", "run", "dev"]