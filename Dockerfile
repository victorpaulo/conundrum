FROM centos:7
#FROM debian:jessie-slim 

WORKDIR /usr

#install MQ client
COPY 9.0.0.0-IBM-MQC-Redist-LinuxX64.tar.gz .
RUN gunzip 9.0.0.0-IBM-MQC-Redist-LinuxX64.tar.gz \
    && tar xvf 9.0.0.0-IBM-MQC-Redist-LinuxX64.tar \
    && rm 9.0.0.0-IBM-MQC-Redist-LinuxX64.tar  \

#Create group mqm
    && groupadd --system --gid 888 mqm \

#Create user mqm and add the user to the group mqm
    && useradd --system --uid 888 --gid mqm mqm  \

#Add user=morten to group=mqm:
    && usermod -aG mqm root   \
 

WORKDIR /app

#install nodejs, make and gcc-c++
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash - \
    && yum -y install nodejs make gcc-c++  \

#create directories for my application
    && mkdir controllers  \
    && mkdir api
 
#copy the application into the image
COPY package.json index.js /app/
COPY controllers/ /app/controllers/
COPY api/ /app/api/

RUN npm install \
   && yum -y remove make \
   && yum -y remove gcc-c++  \
   && yum -y remove cpp gcc kernal-headers\
   && yum clean all
EXPOSE 8080
CMD npm start

