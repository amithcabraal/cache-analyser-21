import { NetworkRequest, Filter } from '../types';
import { getCacheRank } from '../types/cacheRanking';

export function filterData(data: NetworkRequest[], filters: Filter): NetworkRequest[] {
  return data.filter(item => {
    if (filters.method && filters.method.length > 0) {
      if (!filters.method.includes(item['1.method'])) {
        return false;
      }
    }
    
    if (filters.urlPattern) {
      const pattern = filters.urlPattern.replace(/\*/g, '.*');
      const regex = new RegExp(pattern);
      if (!regex.test(item['2.url'])) {
        return false;
      }
    }

    if (filters.domains && filters.domains.length > 0) {
      try {
        const domain = new URL(item['2.url']).hostname;
        if (!filters.domains.includes(domain)) {
          return false;
        }
      } catch {
        return false;
      }
    }
    
    if (filters.cacheControl && filters.cacheControl.length > 0) {
      const matches = filters.cacheControl.some(control => {
        if (control === 'None') {
          return !item['3.cache-control'];
        }
        return item['3.cache-control'] === control;
      });
      if (!matches) return false;
    }
    
    if (filters.xCache && filters.xCache.length > 0) {
      const matches = filters.xCache.some(cache => {
        if (cache === 'None') {
          return !item['4.x-cache'];
        }
        return item['4.x-cache'] === cache;
      });
      if (!matches) return false;
    }
    
    if (filters.cfPop && item['5.x-amz-cf-pop'] !== filters.cfPop) {
      return false;
    }

    if (filters.cacheRank && filters.cacheRank.length > 0) {
      const rank = getCacheRank(item).rank;
      if (!filters.cacheRank.includes(rank)) {
        return false;
      }
    }
    
    return true;
  });
}