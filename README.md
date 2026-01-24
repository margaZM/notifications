<!-- wsl.exe --shutdown -->

docker logs auth-service

docker logs auth-service --tail 20

docker exec -it api-gateway ping auth-service

docker ps -a

docker network inspect notifications-shared-network

docker-compose run --rm auth-service ls -R

-Revisar url de la database:
DATABASE_URL="postgresql://postgres:123456@postgres-db:5432/postgres_db?schema=public"

-Agregar el host dinamico en .env en libreria y proyectos > volver a hacer build y probar
-Actualizar componente input del front con validaciones -> FALTAN PRUEBAS
-Actualizar validator en notificaciones de front
-Configurar lo demas de acuerdo al modeulo 8 -> Agregar readme y demas
