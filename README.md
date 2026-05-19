# 🚀 Guía para ejecutar el sistema en Linux/Ubuntu

# 📋 Requisitos Previos

Antes de ejecutar el proyecto debes instalar:

- PHP
- Composer
- MySQL
- Node.js y npm
- Git

---

# 🛠️ 1. Instalar Git

## Verificar si Git está instalado

```bash
git --version
```

---

## Instalar Git

```bash
sudo apt update
sudo apt install git -y
```

---

## Verificar instalación

```bash
git --version
```

---

# 🐘 2. Instalar PHP y Extensiones Necesarias

Laravel está desarrollado en PHP, por lo tanto es necesario instalar PHP junto con varias extensiones requeridas por el framework.

---

## Actualizar paquetes del sistema

```bash
sudo apt update
```

---

## Instalar PHP y extensiones

```bash
sudo apt install php php-cli php-mysql php-mbstring php-xml php-bcmath php-curl php-zip unzip curl composer -y
```

---

## ¿Qué instala este comando?

| Paquete | Descripción |
|---|---|
| `php` | Instala PHP |
| `php-cli` | Permite ejecutar PHP desde terminal |
| `php-mbstring` | Manejo de caracteres UTF-8 |
| `php-xml` | Soporte para XML |
| `php-bcmath` | Operaciones matemáticas |
| `php-curl` | Permite consumir APIs |
| `php-zip` | Manejo de archivos ZIP |
| `unzip` | Descompresión de archivos |
| `curl` | Descarga de contenido desde internet |
| `-y` | Acepta automáticamente la instalación |

---

## Verificar instalación

```bash
php -v
```

Si todo salió correctamente, aparecerá la versión instalada de PHP.

---

# 📦 3. Instalar Composer

Composer es el administrador de dependencias de PHP.

---

## Instalar Composer

```bash
sudo apt install composer -y
```

---

## Verificar instalación

```bash
composer --version
```

---

# 🗄️ 4. Instalar MySQL

## Instalar MySQL Server

```bash
sudo apt install mysql-server -y
```

---

## Verificar estado del servicio

```bash
sudo systemctl status mysql
```

---

## Entrar a MySQL

```bash
sudo mysql
```

---

## Crear contraseña para root

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
EXIT;
```

---

## Iniciar sesión con contraseña

```bash
mysql -u root -p
```

---

# 🟢 5. Instalar Node.js y npm

Laravel utiliza Node.js para manejar herramientas frontend como:

- Vite
- Tailwind CSS
- Bootstrap
- JavaScript moderno
- Dependencias npm

Ubuntu normalmente instala versiones antiguas de Node.js usando `apt`, por eso se recomienda usar `nvm`.

---

## Paso 1: Instalar nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Este comando descarga e instala `nvm` (Node Version Manager).

---

## Paso 2: Reiniciar terminal

Cerrar y volver a abrir la terminal.

O ejecutar:

```bash
source ~/.bashrc
```

---

## Paso 3: Instalar Node.js

```bash
nvm install --lts
```

Instala la versión estable recomendada de Node.js.

---

## Paso 4: Verificar instalación

```bash
node -v
npm -v
```

Si todo salió bien aparecerán las versiones instaladas de Node.js y npm.

---

# 📥 6. Clonar el Proyecto

## Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

---

## Entrar a la carpeta del proyecto

```bash
cd nombre_del_proyecto
```

---

# 📚 7. Instalar Dependencias PHP

```bash
composer install
```

Este comando instala todas las dependencias de Laravel.

---

# 🎨 8. Instalar Dependencias Frontend

```bash
npm install
```

Este comando instala las dependencias frontend del proyecto.

---

# ⚙️ 9. Configurar Variables de Entorno

## Copiar archivo `.env`

```bash
cp .env.example .env
```

---

## Generar clave de Laravel

```bash
php artisan key:generate
```

---

# 🗃️ 10. Configurar Base de Datos

## Entrar a MySQL

```bash
mysql -u root -p
```

---

## Crear base de datos

```sql
CREATE DATABASE nombre_basedatos;
EXIT;
```

---

## Configurar archivo `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_basedatos
DB_USERNAME=root
DB_PASSWORD=root
```

---

# 🧱 11. Ejecutar Migraciones

## Ejecutar migraciones

```bash
php artisan migrate
```

---

## Ejecutar seeders

```bash
php artisan db:seed
```

---

## Ejecutar todo desde cero

```bash
php artisan migrate:fresh --seed
```

---

# ▶️ 12. Ejecutar el Proyecto

## Iniciar servidor Laravel

```bash
php artisan serve
```

---

## Iniciar Vite

```bash
npm run dev
```

---

## Abrir proyecto en navegador

```text
http://127.0.0.1:8000
```

---

# 🧰 Comandos Útiles

## Limpiar caché

```bash
php artisan optimize:clear
```

---

## Ver rutas

```bash
php artisan route:list
```

---

## Crear controlador

```bash
php artisan make:controller NombreController
```

---

# 💻 Tecnologías Utilizadas

- Laravel
- PHP
- MySQL
- Node.js
- Vite
- Bootstrap / Tailwind CSS

---

# 👨‍💻 Autor

Manuel Alejandro Escalante Valdivieso
