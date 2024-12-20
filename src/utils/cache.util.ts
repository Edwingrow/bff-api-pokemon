import { Cache } from 'cache-manager';
import { createHash } from 'crypto';
export class CacheUtil {
    constructor(private readonly cacheManager: Cache) { }
    
    async checkCache<T>(key: string, value: T, ttl: number = 60000): Promise<T | null> {
        try {
            const cachedValue = await this.cacheManager.get<string>(key);  
            if (cachedValue) return JSON.parse(cachedValue);

            const ValueSerialized = JSON.stringify(value);
            await this.cacheManager.set(key, ValueSerialized, ttl);
            return value;
        } catch {
            return null;
        }

    }
    GenerateKey(key:string, args:string): string {
        const hash = createHash('sha256');
        hash.update(key);
        hash.update(JSON.stringify(args));
        return hash.digest('hex');
    }
}
