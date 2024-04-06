import os
from datetime import datetime


# Function to create the specific migration directory with the current timestamp
def create_migration_directory():
    # Generate the current timestamp in the format YYYYMMDDHHMMSS
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    # Define the path for the new migration directory
    migration_dir_path = f"prisma/migrations/{timestamp}_create_message_store_table"
    # Create the directory if it doesn't exist
    if not os.path.exists(migration_dir_path):
        os.makedirs(migration_dir_path)
        print(f"Created migration directory: {migration_dir_path}")
        return migration_dir_path
    else:
        print(f"Migration directory already exists: {migration_dir_path}")
        return None


# Function to write the migration.sql file inside the specific migration directory
def write_migration_sql(migration_dir_path):
    if migration_dir_path:
        # Define the path for the migration.sql file
        migration_file_path = os.path.join(migration_dir_path, "migration.sql")
        # SQL command to create the table
        create_table_sql = """
CREATE TABLE IF NOT EXISTS message_store (
    id SERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    message JSONB NOT NULL
);
"""
        # Write the SQL command to the migration.sql file
        with open(migration_file_path, "w") as migration_file:
            migration_file.write(create_table_sql)
            print(f"Written migration file: {migration_file_path}")


# Function to run the Prisma migrate command
def run_prisma_migrate():
    os.system("npx prisma migrate dev")
    print("Ran Prisma migrate")


# Main function to execute the script
def main():
    migration_dir_path = create_migration_directory()
    write_migration_sql(migration_dir_path)
    run_prisma_migrate()


pp

# Execute the main function
if __name__ == "__main__":
    main()
