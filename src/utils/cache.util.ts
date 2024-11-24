import { Cache } from 'cache-manager';
import { createHash } from 'crypto';
type KeyArg = string | number | boolean;
export class CacheUtil {
    constructor(private readonly cacheManager: Cache) { }
    
    async checkCache<T>(key: string, value: T, ttl: number = 60000): Promise<T | null> {
        try {
            const cachedValue = await this.cacheManager.get<T>(key);
            if (cachedValue) return cachedValue;

            const ValueSerialized = JSON.stringify(value);
            await this.cacheManager.set(key, ValueSerialized, ttl);
            return value;
        } catch {
            return null;
        }

    }
    GenerateKey(key:string, args:KeyArg): string {
        const hash = createHash('sha256');
        hash.update(key);
        hash.update(JSON.stringify(args));
        return hash.digest('hex');
    }
}
