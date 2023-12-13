DO $$
BEGIN
    -- Cria usuário se ele ainda não existe
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_roles 
        WHERE rolname = 'brain-agriculture-api') THEN

        CREATE USER "brain-agriculture-api" WITH PASSWORD 'q1w2e3r4t5';
    END IF;

    -- Cria banco de dados se ele ainda não existe
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_database 
        WHERE datname = 'brain-agriculture') THEN

        CREATE DATABASE "brain-agriculture";
    END IF;
    
    -- Concede privilégios
    GRANT ALL PRIVILEGES ON DATABASE "brain-agriculture" TO "brain-agriculture-api";
END
$$;
