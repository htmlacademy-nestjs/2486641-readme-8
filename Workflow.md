# Как работать над проектом

## Перейти в папку с проектом
```bash
cd ~/readme/project
```
## Установить зависимости
```bash
npm install
```
## Скопировать .env-example -> .env:

```bash
cp apps/account/account.env-example apps/account/account.env
cp apps/api/.env-example apps/api/.env
cp apps/blog/blog.env-example apps/blog/blog.env
cp apps/file-vault/file-vault.env-example apps/file-vault/file-vault.env
cp apps/notify/notify.env-example apps/notify/notify.env
```
## Docker
### Установить docker containers для сервиса аккаунтов (account)
```bash
docker compose --file ./apps/account/docker-compose.dev.yml --project-name "readme-account" --env-file ./apps/account/account.env up -d
```
### Установить docker containers для сервиса блога (blog)
```bash
docker compose --file ./apps/blog/docker-compose.dev.yml --env-file ./apps/blog/blog.env --project-name "readme-blog" up -d
```
### Установить docker containers для сервиса хранения файлов (file-vault)
```bash
docker compose --file ./apps/file-vault/file-vault.compose.dev.yml --env-file ./apps/file-vault/file-vault.env --project-name "readme-file-vault" up -d
```
### Установить docker containers для сервиса уведомлений (notify)
```bash
docker compose --file ./apps/notify/notify.compose.dev.yml --env-file ./apps/notify/notify.env  --project-name "readme-notify" up -d
```
## DB Postgres
### Сгенерировать и выполнить скрипт создания моделей в БД Postgres
```bash
npx nx run blog:db:migrate
```
### Сгенерировать клиент Prisma
```bash
npx nx run blog:db:generate
```
### Загрузить тестовые данные Блога
```bash
npx nx run blog:db:seed
```
## Загрузить тестовые данные Аккаунта
```bash
npx nx run account:db:seed
```
## Запуск сервисов
```bash
npx nx run account:serve
npx nx run blog:serve
npx nx run file-storage:serve
npx nx run notify:serve
npx nx run api:serve
```
