import * as promBundle from 'express-prom-bundle';

export function metricsMiddleware(appName: string) {
    const metrics = promBundle({
        includeMethod: true,
        includeStatusCode: true,
        includePath: true,
        includeUp: true,
        customLabels: { project_name: appName },
        promClient: {
            collectDefaultMetrics: {
            }
        }
    });
    return metrics;
}
