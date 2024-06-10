FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Install Laravel dependencies
COPY composer.json composer.json
COPY composer.lock composer.lock
RUN composer install --no-scripts --no-autoloader

# Copy existing application directory contents
COPY . .

# Remove PHP upload limit
RUN echo "post_max_size = 100M" >> $PHP_INI_DIR/conf.d/upload.ini
RUN echo "upload_max_filesize = 100M" >> $PHP_INI_DIR/conf.d/upload.ini

# Generate autoload files
RUN composer dump-autoload

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
