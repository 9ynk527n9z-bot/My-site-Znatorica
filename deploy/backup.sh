#!/bin/bash
# Ежедневный бэкап базы данных PostgreSQL (контейнер db из docker-compose.yml)
# Установка на сервере: crontab -e
#   0 3 * * * /opt/znatorika/deploy/backup.sh >> /var/log/znatorika-backup.log 2>&1
# Хранит бэкапы за последние 14 дней, старые удаляет автоматически.

set -e

BACKUP_DIR="/opt/znatorika/backups"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
KEEP_DAYS=14

mkdir -p "$BACKUP_DIR"

docker compose -f /opt/znatorika/docker-compose.yml exec -T db \
  pg_dump -U znatorika znatorika | gzip > "$BACKUP_DIR/znatorika_$DATE.sql.gz"

find "$BACKUP_DIR" -name "znatorika_*.sql.gz" -mtime +$KEEP_DAYS -delete

echo "[$DATE] Бэкап создан: znatorika_$DATE.sql.gz"
