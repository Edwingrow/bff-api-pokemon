import { Cache } from 'cache-manager';
import { CacheUtil } from './cache.util';

describe('CacheUtil', () => {
  let cacheUtil: CacheUtil;
  let mockCacheManager: Cache;

  beforeEach(() => {
    mockCacheManager = {
      get: jest.fn(),
      set: jest.fn(),
    } as unknown as Cache;

    cacheUtil = new CacheUtil(mockCacheManager);
  });

  describe('checkCache', () => {
    it('should return the value from the cache if it exists', async () => { 
      const key = 'testKey';
      const cachedValue = { data: 'cached data' };
      (mockCacheManager.get as jest.Mock).mockResolvedValue(JSON.stringify(cachedValue));

      const result = await cacheUtil.checkCache(key, { data: 'new data' });
 
      expect(result).toEqual(cachedValue);
      expect(mockCacheManager.get).toHaveBeenCalledWith(key);
      expect(mockCacheManager.set).not.toHaveBeenCalled();
    });

    it('should cache the value if it does not exist in cache', async () => {
      const key = 'testKey';
      const value = { data: 'new data' };
      (mockCacheManager.get as jest.Mock).mockResolvedValue(null);

      const result = await cacheUtil.checkCache(key, value);

      expect(result).toEqual(value);
      expect(mockCacheManager.get).toHaveBeenCalledWith(key);
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        key,
        JSON.stringify(value),
        60000,
      );
    });

    it('should handle exceptions and return null', async () => {
      const key = 'testKey';
      (mockCacheManager.get as jest.Mock).mockRejectedValue(
        new Error('Cache error'),
      );

      const result = await cacheUtil.checkCache(key, { data: 'new data' });

      expect(result).toBeNull();
      expect(mockCacheManager.get).toHaveBeenCalledWith(key);
    });
  });

  describe('GenerateKey', () => {
    it('should generate a unique hash key for two strings', () => {
      const key = 'baseKey';
      const arg = 'TEST';
      const expectedHash = cacheUtil.GenerateKey(key, arg);

      expect(expectedHash).toEqual(expect.any(String));
      expect(expectedHash.length).toBe(64);
    });
  });
});
