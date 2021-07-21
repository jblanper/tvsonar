FROM php:7.4

RUN apt-get update && apt-get install -y git nano zip unzip curl \
    libzip-dev libcurl4-openssl-dev libxml2-dev libonig-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install zip curl xml mbstring 

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/html

ENV PATH=/var/www/html/vendor/bin:$PATH

RUN useradd -m -u 1000 artisan
WORKDIR /var/www/html
EXPOSE 8000

ENTRYPOINT ["./build-script.sh"]