#!/bin/sh

# Wait for PostgreSQL to be ready
until pg_isready -h db -p 5432 -U taskmanager; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 1
done

echo "PostgreSQL is ready!"