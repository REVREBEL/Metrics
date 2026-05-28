"use client"

// src/hooks/useDuckDb.ts
import { useState, useEffect, useCallback } from 'react';
import * as duckdb from '@duckdb/duckdb-wasm';

const manualBundles: duckdb.DuckDBBundles = {
    mvp: {
        mainModule: '/duckdb/duckdb-mvp.wasm',
        mainWorker: '/duckdb/duckdb-browser-mvp.worker.js',
    },
    eh: {
        mainModule: '/duckdb/duckdb-eh.wasm',
        mainWorker: '/duckdb/duckdb-browser-eh.worker.js',
    },
};

let dbPromise: Promise<duckdb.AsyncDuckDB> | null = null;

export function useDuckDb() {
    const [db, setDb] = useState<duckdb.AsyncDuckDB | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        let isCancelled = false;

        const initDb = async () => {
            try {
                if (!dbPromise) {
                    dbPromise = (async () => {
                        const logger = new duckdb.ConsoleLogger();
                        const bundle = await duckdb.selectBundle(manualBundles);

                        const worker = new Worker(bundle.mainWorker!);
                        const dbInstance = new duckdb.AsyncDuckDB(logger, worker);
                        await dbInstance.instantiate(bundle.mainModule, bundle.pthreadWorker);

                        // Register Parquet files from public directory
                        await dbInstance.registerFileURL('dashboard_current.parquet', '/data/dashboard_current.parquet', duckdb.DuckDBDataProtocol.HTTP, false);
                        await dbInstance.registerFileURL('dashboard_trend.parquet', '/data/dashboard_trend.parquet', duckdb.DuckDBDataProtocol.HTTP, false);
                        await dbInstance.registerFileURL('dashboard_segments.parquet', '/data/dashboard_segments.parquet', duckdb.DuckDBDataProtocol.HTTP, false);
                        await dbInstance.registerFileURL('dashboard_pickup.parquet', '/data/dashboard_pickup.parquet', duckdb.DuckDBDataProtocol.HTTP, false);

                        // GA4 Parquet files
                        await dbInstance.registerFileURL('ga4_TrafficAcquisition_281286275.parquet', '/data/ga4_TrafficAcquisition_281286275.parquet', duckdb.DuckDBDataProtocol.HTTP, false);
                        await dbInstance.registerFileURL('ga4_UserAcquisition_281286275.parquet', '/data/ga4_UserAcquisition_281286275.parquet', duckdb.DuckDBDataProtocol.HTTP, false);
                        await dbInstance.registerFileURL('ga4_TechDetails_281286275.parquet', '/data/ga4_TechDetails_281286275.parquet', duckdb.DuckDBDataProtocol.HTTP, false);
                        await dbInstance.registerFileURL('ga4_Events_281286275.parquet', '/data/ga4_Events_281286275.parquet', duckdb.DuckDBDataProtocol.HTTP, false);
                        await dbInstance.registerFileURL('ga4_PagesAndScreens_281286275.parquet', '/data/ga4_PagesAndScreens_281286275.parquet', duckdb.DuckDBDataProtocol.HTTP, false);

                        return dbInstance;
                    })();
                }

                const initializedDb = await dbPromise;
                if (!isCancelled) {
                    setDb(initializedDb);
                    setIsInitializing(false);
                }
            } catch (err: unknown) {
                if (!isCancelled) {
                    console.error("Failed to initialize DuckDB:", err);
                    setError(err instanceof Error ? err : new Error(String(err)));
                    setIsInitializing(false);
                }
            }
        };

        initDb();

        return () => {
            isCancelled = true;
        };
    }, []);

    const execute = useCallback(async (query: string) => {
        if (!db) {
            throw new Error("DuckDB is not initialized yet.");
        }

        let connection: duckdb.AsyncDuckDBConnection | null = null;
        try {
            connection = await db.connect();
            const results = await connection.query(query);
            return results.toArray().map((row: { toJSON(): unknown }) => row.toJSON());
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }, [db]);

    return { db, error, isInitializing, execute };
}
