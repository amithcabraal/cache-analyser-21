export interface NetworkRequest {
  "1.method": string;
  "2.url": string;
  "3.cache-control": string | null;
  "4.x-cache": string;
  "5.x-amz-cf-pop": string | null;
  "5.time": number;
  "6.size": number;
  "7.status": number;
  "8.fulfilledBy": string | null;
  "parsed.cache-control": {
    public: boolean;
    private: boolean;
    "max-age": number | null;
    "s-max-age": number | null;
    "no-cache": boolean;
    "no-store": boolean;
  };
  "parsed.cache-used": string;
}

export interface Filter {
  method?: string | string[];
  urlPattern?: string;
  domains?: string[];
  cacheControl?: string | string[];
  xCache?: string | string[];
  cfPop?: string;
  cacheUsed?: string;
  cacheRank?: string | string[];
}