import pg from "pg";

// export 
export function connect() {
    const dbConnectionString = process.env.NEXT_PUBLIC_DATABASE_URL;
    const db = new pg.Pool({
        connectionString: dbConnectionString,
    });
    return db;
    }
//exportimg this to use in other location
    export const db = connect();